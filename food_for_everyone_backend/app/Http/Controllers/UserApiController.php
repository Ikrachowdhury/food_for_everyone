<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\DonationPost;
use App\Models\PostImage;
use App\Models\User;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\RequestDonation;
// use Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Mail as FacadesMail;

class UserApiController extends Controller
{
    //Registration API
    public function addUser(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->all();

            $rules = [
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|same:confirmPassword',
                'confirmPassword' => 'required',
                'phone' => 'required',
                'value' => 'nullable|string'
            ];

            $customMessage = [
                'name.required' => "Name is required",
                'email.required' => "Email is required",
                'email.email' => "Email must be a valid email",
                'email.unique' => "Email already exists",
                'password.required' => "Password is required",
                'password.same' => "Password and Confirm Password must match",
                'confirmPassword.required' => "Confirm Password is required",
                'phone.required' => "Phone is required",
            ];

            $validator = Validator::make($data, $rules, $customMessage);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $user = new User();
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->password = bcrypt($data['password']);
            $user->phone = $data['phone'];
            $user->user_type = $data['value'] ?? null;
            $user->save();
            $message = "User Successfully Added";
            return response()->json(['message' => $message], 201);
        }
    }
    //Verification Mail Send API
    public function sendVerifymail($email)
    {
        $user = User::where('email', $email)->get();
        if (count($user) > 0) {
            if ($user[0]['is_verified'] == 1) {
                return response()->json(['success' => false, 'msg' => 'This email is already verified']);
            } else {
                $random = Str::random(40);
                $domain = URL::to('/');
                $url = $domain . '/verify-mail/' . $random;
                $data['url'] = $url;
                $data['email'] = $email;
                $data['title'] = "Email Verification";
                $data['body'] = "Please Click here to verify your account";
                Mail::send('verifyMail', ['data' => $data], function ($message) use ($data) {
                    $message->to($data['email'])->subject($data['title']);
                });
                $user = User::find($user[0]['id']);
                $user->remember_token = $random;
                $user->save();
                return response()->json(['success' => true, 'msg' => 'Mail sent successfully.']);
            }
        } else {
            return response()->json(['success' => false, 'msg' => 'user is not found']);
        }
    }

    //Mail Verification API
    public function verificationMail($token)
    {
        $user = User::where('remember_token', $token)->get();
        if (count($user) > 0) {
            $datetime = Carbon::now()->format('Y-m-d H:i:s');
            $user = User::find($user[0]['id']);
            $user->remember_token = '';
            $user->is_verified = 1;
            $user->email_verified_at = $datetime;
            $user->save();
            return "<h1>Email Verified Successfully</h1>";
        } else {
            return view('404');
        }
    }

    //Login API
    public function login(Request $request)
    {
        $validator = validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['success' => false, 'msg' => 'Email or password is incorrect']);
        }
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return ["error" => "Email or password is not matched"];
        }
        return $this->respondWithToken($token, $user);
    }
    protected function respondWithToken($token, $user)
    {
        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user_id' => $user->id,
            'user_type' => $user->user_type,
        ]);
    }

    public function logout()
    {
        try {
            auth()->logout();
            return response()->json(['success' => true, 'msg' => 'User logged out']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'msg' => $e->getMessage()]);
        }
    }


    //New Donation Form API
    public function newDonation(Request $request)
    {
        try {
            if ($request->isMethod('post')) {
                $data = $request->all();
                Log::info('Received data from frontend:', $data);

                $rules = [
                    'user_id' => 'required|integer|exists:users,id',
                    'post_name' => 'required|string|max:255',
                    'post_description' => 'required|string',
                    'serves' => 'required|integer',
                    'expiredate' => 'required',
                    'last_receive_date' => 'required',
                    'receive_time' => 'required|string',
                    'donee_type' => 'required|string|in:Organization,Individual Person,Anyone',
                    'pickup_location' => 'required|string|max:255',
                    'categories' => 'required|string',
                    'urlArray' => 'required',
                ];

                $validator = Validator::make($data, $rules);
                if ($validator->fails()) {
                    return response()->json($validator->errors(), 422);
                }

                $urlArray = json_decode($data['urlArray'], true);

                if (json_last_error() !== JSON_ERROR_NONE) {
                    return response()->json(['error' => 'Invalid JSON format for urlArray'], 400);
                }

                $donationPost = new DonationPost();
                $donationPost->user_id = $data['user_id'];
                $donationPost->post_name = $data['post_name'];
                $donationPost->post_description = $data['post_description'];
                $donationPost->serves = $data['serves'];
                $donationPost->expiredate = $data['expiredate'];
                $donationPost->last_receive_date = $data['last_receive_date'];
                $donationPost->receive_time = $data['receive_time'];
                $donationPost->donee_type = $data['donee_type'];
                $donationPost->pickup_location = $data['pickup_location'];
                $donationPost->categories = $data['categories'];
                $donationPost->save();

                $donation_id = $donationPost->donation_id;

                foreach ($urlArray as $url) {
                    $postImage = new PostImage();
                    $postImage->donation_id = $donation_id;
                    $postImage->image_path = $url;
                    $postImage->save();
                }

                return response()->json(['message' => 'User and Donation Successfully Added', 'donation_id' => $donation_id], 201);
            }
        } catch (\Exception $e) {
            Log::error('Error in newDonation method: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function getDonationById($donation_id)
    {
        $donationPost = DonationPost::find($donation_id);
        if (!$donationPost) {
            return response()->json(['error' => 'Donation not found'], 404);
        }
        $imagePaths = DB::table('post_images')->where('donation_id', $donation_id)->pluck('image_path');
        return response()->json([
            'donationPost' => $donationPost,
            'imagePaths' => $imagePaths
        ], 200);
    }

    //Donor Dashboard Donation API
    public function getDonationIdsWithUserIds($user_id)
    {
        try {
            $totalDonationIds = DonationPost::where('user_id', $user_id)->count();
            $donationIdsWithUserIds = DonationPost::select('donation_id', 'user_id')
                ->where('user_id', $user_id)
                ->get();

            return response()->json([
                'total_donation_ids' => $totalDonationIds,
                'donation_ids_with_user_ids' => $donationIdsWithUserIds,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch donation IDs'], 500);
        }
    }

    // Donee Dashboard API
    public function getDonationIdsPosts(Request $request)
    {
        try {
            $totalDonationIds = DonationPost::count();
            $donationIdsWithUserIds = DonationPost::select('donation_id', 'user_id')->get();

            return response()->json([
                'total_donation_ids' => $totalDonationIds,
                'donation_ids_with_user_ids' => $donationIdsWithUserIds,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch donation IDs'], 500);
        }
    }

    // request donation API
    public function requestDonation(Request $request)
    {
        $validatedData = $request->validate([
            'donation_id' => 'required|integer',
            'user_id' => 'required|integer',
            'location' => 'required|string|max:255',
            'accept_status' => 'required|string',
            'run_status' => 'required|string',
            'delivery' => 'required|string',
        ]);
        $validatedData['donation_id'] = (int) $validatedData['donation_id'];
        $validatedData['user_id'] = (int) $validatedData['user_id'];
        $requestDonation = RequestDonation::create($validatedData);
        return response()->json([
            'message' => 'Request donation created successfully!',
            'data' => $requestDonation
        ], 201);
    }

    //Donee Requested Donetion List API
    public function getPendingDonations($user_id)
    {
        $pendingDonationIds = RequestDonation::where('user_id', $user_id)
            ->where('accept_status', 'Pending')
            ->pluck('donation_id');
    
        $pendingDonations = DonationPost::whereIn('donation_id', $pendingDonationIds)->get();
        $images = PostImage::whereIn('donation_id', $pendingDonationIds)->get(['donation_id', 'image_path']);
        foreach ($pendingDonations as $donation) {
            $donation->image_paths = $images->where('donation_id', $donation->donation_id)->pluck('image_path');
        }
    
        return response()->json($pendingDonations);
    }

// Donor side Requested Post API
public function getRequestDonations($user_id)
    {
        // Fetch the donation IDs from donation_posts for the given user_id
        $donationIds = DonationPost::where('user_id', $user_id)->pluck('donation_id');

        // Fetch all pending requests
        $pendingRequests = RequestDonation::whereIn('donation_id', $donationIds)
            ->where('accept_status', 'Pending')
            ->get();

        // Group pending requests by donation_id and count req_id
        $pendingRequestCounts = $pendingRequests->groupBy('donation_id')->map->count();

        // Fetch all the information of the unique pending donation IDs from donation_posts
        $pendingDonations = DonationPost::whereIn('donation_id', $pendingRequestCounts->keys())->get();

        // Fetch the image paths for the unique pending donation IDs from post_images
        $images = PostImage::whereIn('donation_id', $pendingRequestCounts->keys())->get(['donation_id', 'image_path']);

        // Fetch the user information for the unique user_ids in pending requests
        $userIds = $pendingRequests->pluck('user_id')->unique();
        $users = User::whereIn('id', $userIds)->get();

        // Combine the information and ensure each donation_id appears only once
        $result = $pendingRequestCounts->map(function($count, $donation_id) use ($pendingRequests, $pendingDonations, $images, $users) {
            $requestDetails = $pendingRequests->where('donation_id', $donation_id)->first();
            $donation = $pendingDonations->firstWhere('donation_id', $donation_id);
            $imagePaths = $images->where('donation_id', $donation_id)->pluck('image_path');
            $user = $users->firstWhere('id', $requestDetails->user_id);

            return [
                'req_id' => $requestDetails->req_id,
                'donation_id' => $donation_id,
                'user_id' => $requestDetails->user_id,
                'location' => $requestDetails->location,
                'accept_status' => $requestDetails->accept_status,
                'run_status' => $requestDetails->run_status,
                'delivery' => $requestDetails->delivery,
                'user' => $user,
                'donation_post' => $donation,
                'image_paths' => $imagePaths,
                'pending_count' => $count
            ];
        });

        return response()->json($result->values());
    }
    // // Requested User Info API
    //  public function getRequestedUser($donation_id)
    // {
    //     // Fetch the information from the requestdonation table for the given donation_id
    //     $requestDonations = RequestDonation::where('donation_id', $donation_id)->get();

    //     // Fetch the user information for the unique user_ids in the pending requests
    //     $userIds = $requestDonations->pluck('user_id')->unique();
    //     $users = User::whereIn('id', $userIds)->get()->keyBy('id');

    //     // Combine the information and ensure each request donation has the corresponding user info
    //     $result = $requestDonations->map(function($requestDonation) use ($users) {
    //         $userId = $requestDonation->user_id;
    //         return [
    //             'req_id' => $requestDonation->req_id,
    //             'donation_id' => $requestDonation->donation_id,
    //             'user_id' => $requestDonation->user_id,
    //             'location' => $requestDonation->location,
    //             'accept_status' => $requestDonation->accept_status,
    //             'run_status' => $requestDonation->run_status,
    //             'delivery' => $requestDonation->delivery,
    //             'user' => $users->has($userId) ? $users[$userId] : null
    //         ];
    //     });

    //     // Return the data as a JSON response
    //     return response()->json($result);
    // }

    //Acheivements' Total Donation API
    public function getTotalDeliveredDonations()
    { {
            $deliveredDonations = DonationPost::selectRaw('user_id, COUNT(*) as delivered_count, SUM(serves) as total_serves')
                ->join('donation_requests', 'donation_posts.donation_id', '=', 'donation_requests.donation_id')
                ->where('donation_requests.run_status', 'delivered')
                ->groupBy('user_id')
                ->get();

            return response()->json($deliveredDonations);
        }
    }
}
