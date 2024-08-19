<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\DonationPost;
use App\Models\PostImage;
use App\Models\User;
use App\Models\orgInfo;
use App\Models\Rating;
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

    // Organization Registration 
    public function addOrganization(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->all();

            $rules = [
                'name' => 'required',
                'address' => 'required',
                'time' => 'required',
                'about' => 'required',
                'userName' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|same:confirmPassword',
                'confirmPassword' => 'required',
                'phone' =>  'required|max:15',
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
            $user->name = $data['userName'];
            $user->email = $data['email'];
            $user->password = bcrypt($data['password']);
            $user->phone = $data['phone'];
            $user->address = $data['address'];
            $user->user_type = $data['value'] ?? null;
            $user->save();
            $user_id = $user->id;

            $orgInfo = new orgInfo();
            $orgInfo->org_id = $user_id;
            $orgInfo->org_name =  $data['name'];
            $orgInfo->office_time =  $data['time'];
            $orgInfo->org_about =  $data['about'];
            $orgInfo->admin_approval = "pending";
            $orgInfo->save();

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
    public function sendAdminApprovalmail($email)
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
                $data['title'] = "Admin Approval";
                $data['body'] = "Your account is verified. Please Click here to verify your email and logging into your account";
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
                    'donation_id' => 'nullable|integer|exists:donation_posts,donation_id',
                ];

                $validator = Validator::make($data, $rules);
                if ($validator->fails()) {
                    return response()->json($validator->errors(), 422);
                }

                $urlArray = json_decode($data['urlArray'], true);

                if (json_last_error() !== JSON_ERROR_NONE) {
                    return response()->json(['error' => 'Invalid JSON format for urlArray'], 400);
                }

                $donationPost = null;

                if (isset($data['donation_id']) && $data['donation_id'] != 0) {
                    // Update existing DonationPost
                    $donationPost = DonationPost::find($data['donation_id']);
                    // if (!$donationPost) {
                    //     return response()->json(['error' => 'Donation post not found'], 404);
                    // }
                } else {
                    // Create new DonationPost
                    $donationPost = new DonationPost();
                }

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

                // Clear existing images if updating
                if (isset($data['donation_id']) && $data['donation_id'] != 0) {
                    PostImage::where('donation_id', $donation_id)->delete();
                }

                foreach ($urlArray as $url) {
                    $postImage = new PostImage();
                    $postImage->donation_id = $donation_id;
                    $postImage->image_path = $url;
                    $postImage->save();
                }

                return response()->json(['message' => 'Donation Post Successfully ' . (isset($data['donation_id']) && $data['donation_id'] != 0 ? 'Updated' : 'Created'), 'donation_id' => $donation_id], 201);
            }
        } catch (\Exception $e) {
            Log::error('Error in newDonation method: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    // public function newDonation(Request $request)
    // {
    //     try {
    //         if ($request->isMethod('post')) {
    //             $data = $request->all();
    //             Log::info('Received data from frontend:', $data);

    //             $rules = [
    //                 'user_id' => 'required|integer|exists:users,id',
    //                 'post_name' => 'required|string|max:255',
    //                 'post_description' => 'required|string',
    //                 'serves' => 'required|integer',
    //                 'expiredate' => 'required',
    //                 'last_receive_date' => 'required',
    //                 'receive_time' => 'required|string',
    //                 'donee_type' => 'required|string|in:Organization,Individual Person,Anyone',
    //                 'pickup_location' => 'required|string|max:255',
    //                 'categories' => 'required|string',
    //                 'urlArray' => 'required',
    //             ];

    //             $validator = Validator::make($data, $rules);
    //             if ($validator->fails()) {
    //                 return response()->json($validator->errors(), 422);
    //             }

    //             $urlArray = json_decode($data['urlArray'], true);

    //             if (json_last_error() !== JSON_ERROR_NONE) {
    //                 return response()->json(['error' => 'Invalid JSON format for urlArray'], 400);
    //             }

    //             $donationPost = new DonationPost();
    //             $donationPost->user_id = $data['user_id'];
    //             $donationPost->post_name = $data['post_name'];
    //             $donationPost->post_description = $data['post_description'];
    //             $donationPost->serves = $data['serves'];
    //             $donationPost->expiredate = $data['expiredate'];
    //             $donationPost->last_receive_date = $data['last_receive_date'];
    //             $donationPost->receive_time = $data['receive_time'];
    //             $donationPost->donee_type = $data['donee_type'];
    //             $donationPost->pickup_location = $data['pickup_location'];
    //             $donationPost->categories = $data['categories'];
    //             $donationPost->save();

    //             $donation_id = $donationPost->donation_id;

    //             foreach ($urlArray as $url) {
    //                 $postImage = new PostImage();
    //                 $postImage->donation_id = $donation_id;
    //                 $postImage->image_path = $url;
    //                 $postImage->save();
    //             }

    //             return response()->json(['message' => 'User and Donation Successfully Added', 'donation_id' => $donation_id], 201);
    //         }
    //     } catch (\Exception $e) {
    //         Log::error('Error in newDonation method: ' . $e->getMessage());
    //         return response()->json(['error' => 'Internal Server Error'], 500);
    //     }
    // }

    public function getAcceptedPost($user_id)
    {
        try {
            $donationIdsWithUserIds = DonationPost::select('donation_id', 'user_id')
                ->where('user_id', $user_id)
                ->get();

            $acceptedDonations = [];

            foreach ($donationIdsWithUserIds as $donation) {
                $donation_id = $donation->donation_id;

                $requestDonation = RequestDonation::where('donation_id', $donation_id)
                    ->first(['user_id', 'accept_status', 'delivery']);

                if ($requestDonation && $requestDonation->accept_status === 'accepted') {
                    $doneeName = User::where('id', $requestDonation->user_id)
                        ->value('name');
                    $donationPost = DonationPost::find($donation_id);

                    if ($donationPost) {
                        $imagePaths = DB::table('post_images')->where('donation_id', $donation_id)->pluck('image_path');

                        $acceptedDonations[] = [
                            'donationPost' => $donationPost,
                            'imagePaths' => $imagePaths,
                            'delivery' => $requestDonation->delivery,
                            'doneeName' => $doneeName
                        ];
                    }
                }
            }

            return response()->json([
                'accepted_donations' => $acceptedDonations,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch donation details'], 500);
        }
    }

    public function getDoneeAcceptedPost($user_id)
    {
        try {
            $donationIds = RequestDonation::select('donation_id', 'delivery')
                ->where('user_id', $user_id)
                ->where('accept_status', 'accepted')
                ->get();

            $acceptedDonations = [];

            foreach ($donationIds as $donation) {
                $delivery = $donation->delivery;
                $donationId = $donation->donation_id;

                $donationPost = DonationPost::find($donationId);
                $donar_id = $donationPost->user_id;

                $UserInfo = User::find($donar_id);
                $name = $UserInfo->name;

                if ($donationPost) {
                    $imagePaths = DB::table('post_images')
                        ->where('donation_id', $donationId)
                        ->pluck('image_path');

                    $acceptedDonations[] = [
                        'donationPost' => $donationPost,
                        'imagePaths' => $imagePaths,
                        'delivery' => $delivery,
                        'donorName' => $name,
                    ];
                }
            }

            return response()->json([
                'accepted_donations' => $acceptedDonations,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch donation details'], 500);
        }
    }

    public function getDoneeHistory($user_id)
    {
        try {
            $donationIds = RequestDonation::select('donation_id', 'run_status', 'req_id')
                ->where('user_id', $user_id)
                ->where('run_status', 'delivered')
                ->get();

            $acceptedDonations = [];

            foreach ($donationIds as $donation) {
                // $delivery = $donation->delivery;
                $donationId = $donation->donation_id;
                $req_id = $donation->req_id;

                $donationPost = DonationPost::find($donationId);
                $donar_id = $donationPost->user_id;

                $UserInfo = User::find($donar_id);
                $name = $UserInfo->name;

                $ratingInfo = Rating::where('req_id', $req_id)->first();
                if ($ratingInfo) {
                    $rating = $ratingInfo->rating;
                } else {
                    $rating = 0;
                }

                if ($donationPost) {
                    $imagePaths = DB::table('post_images')
                        ->where('donation_id', $donationId)
                        ->pluck('image_path');

                    $acceptedDonations[] = [
                        'donationPost' => $donationPost,
                        'imagePaths' => $imagePaths,
                        'rating' => $rating,
                        'donorName' => $name,
                    ];
                }
            }

            return response()->json([
                'accepted_donations' => $acceptedDonations,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch donation details'], 500);
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

    public function getOrganizationList()
    {
        try {
            $orgInfos = orgInfo::where('admin_approval', 'pending')->get();
            $orgIds = $orgInfos->pluck('org_id');
            $users = User::whereIn('id', $orgIds)->get();
            $usersDict = $users->keyBy('id');

            $combinedData = $orgInfos->map(function ($orgInfo) use ($usersDict) {
                $userId = $orgInfo->org_id;
                return [
                    'org_id' => $orgInfo->org_id,
                    'org_name' => $orgInfo->org_name,
                    'office_time' => $orgInfo->office_time,
                    'org_about' => $orgInfo->org_about,
                    'admin_approval' => $orgInfo->admin_approval,
                    'user' => $usersDict->get($userId)
                ];
            });

            return response()->json(['combinedData' => $combinedData], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch data'], 500);
        }
    }

    public function doneeList()
    {
        try {
            $orgInfos = orgInfo::where('admin_approval', 'accepted')->get();
    $orgIds = $orgInfos->pluck('org_id');
    $users = User::whereIn('id', $orgIds)->where('is_verified', 1)->get();
    $usersDict = $users->keyBy('id');

    $combinedData = $orgInfos->map(function ($orgInfo) use ($usersDict) {
        $userId = $orgInfo->org_id;
        $user = $usersDict->get($userId);

        if ($user) {  // Only include if user is found
            return [
                'org_id' => $orgInfo->org_id,
                'org_name' => $orgInfo->org_name,
                'office_time' => $orgInfo->office_time,
                'org_about' => $orgInfo->org_about,
                'admin_approval' => $orgInfo->admin_approval,
                'user' => $user
            ];
        }
    })->filter()->values();  // This will reindex the array

    return response()->json(['combinedData' => $combinedData], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch data'], 500);
        }
    }
    public function riderList()
    {
        try {
            $rider = User::where('user_type', 'rider')->where('is_verified','1')->get();
            return response()->json(['rider' => $rider], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch data'], 500);
        }
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
        $donationIds = DonationPost::where('user_id', $user_id)->pluck('donation_id');
        $pendingRequests = RequestDonation::whereIn('donation_id', $donationIds)
            ->where('accept_status', 'Pending')
            ->get();

        $pendingRequestCounts = $pendingRequests->groupBy('donation_id')->map->count();
        $pendingDonations = DonationPost::whereIn('donation_id', $pendingRequestCounts->keys())->get();
        $images = PostImage::whereIn('donation_id', $pendingRequestCounts->keys())->get(['donation_id', 'image_path']);
        $userIds = $pendingRequests->pluck('user_id')->unique();
        $users = User::whereIn('id', $userIds)->get();

        $result = $pendingRequestCounts->map(function ($count, $donation_id) use ($pendingRequests, $pendingDonations, $images, $users) {
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

    public function acceptDonationRequest(Request $request)
    {
        $donation_id = $request->input('donationID');
        $donation = RequestDonation::where('donation_id', $donation_id)->first();

        if ($donation) {
            $donation->accept_status = 'accepted';
            $donation->save();

            return response()->json([
                'success' => true,
                'message' => 'Donation request accepted successfully!',
                'data' => $donation
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found!'
            ], 404);
        }
    }

    public function approveOrganizationRequest(Request $request)
    {
        $org_id = $request->input('org_id');
        $organization = orgInfo::where('org_id', $org_id)->first();

        if ($organization) {
            $organization->admin_approval = 'accepted';
            $organization->save();

            return response()->json([
                'success' => true,
                'message' => 'Organization Request is approved successfully!',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Organization Request approval failed!'
            ], 404);
        }
    }

    public function rejectOrganizationRequest(Request $request)
    {
        $org_id = $request->input('org_id');
        $organization = orgInfo::where('org_id', $org_id)->first();

        if ($organization) {
            $organization->admin_approval = 'rejected';
            $organization->save();

            return response()->json([
                'success' => true,
                'message' => 'Organization Request is rejected successfully!',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Organization Request rejection failed!'
            ], 404);
        }
    }

    public function ratingDonation(Request $request)
    {
        $donation_id = $request->input('donationID');
        $rating = $request->input('rating');
        $donation = RequestDonation::where('donation_id', $donation_id)->first();

        if ($donation) {
            $req_id = $donation->req_id;
            DB::table('rating')->insert([
                'req_id' => $req_id,
                'rating' => $rating,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Rating saved successfully',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found!'
            ], 404);
        }
    }




    public function deliveredDonation(Request $request)
    {
        $donation_id = $request->input('donationID');
        $donation = RequestDonation::where('donation_id', $donation_id)->first();

        if ($donation) {
            $donation->accept_status = 'delivered';
            $donation->run_status = 'delivered';
            $donation->save();

            return response()->json([
                'success' => true,
                'message' => 'Donation request accepted successfully!',
                'data' => $donation
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found!'
            ], 404);
        }
    }

    public function rejectDonationRequest(Request $request)
    {
        $donation_id = $request->input('donationID');
        $donation = RequestDonation::where('donation_id', $donation_id)->first();

        if ($donation) {
            $donation->accept_status = 'rejected';
            $donation->save();

            return response()->json([
                'success' => true,
                'message' => 'Donation request rejected successfully!',
                'data' => $donation
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found!'
            ], 404);
        }
    }

    public function rejectDonorOnRunDonation(Request $request)
    {
        $donation_id = $request->input('donationID');
        $donation = RequestDonation::where('donation_id', $donation_id)->first();

        if ($donation) {
            $donation->accept_status = 'canceled';
            $donation->save();

            return response()->json([
                'success' => true,
                'message' => 'Donation request canceled successfully!',
                'data' => $donation
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found!'
            ], 404);
        }
    }

    public function deleteDonationPost(Request $request)
    {
        $donation_id = $request->input('donationID');

        DB::beginTransaction();

        try {
            $deletedFromRequestDonation = RequestDonation::where('donation_id', $donation_id)->delete();
            $deletedFromPostImage = PostImage::where('donation_id', $donation_id)->delete();
            $deletedFromDonationPost = DonationPost::where('donation_id', $donation_id)->delete();
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Donation request and related data canceled successfully!',
                'data' => [
                    'request_donation_deleted' => $deletedFromRequestDonation,
                    'donation_post_deleted' => $deletedFromDonationPost,
                    'post_image_deleted' => $deletedFromPostImage
                ]
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while deleting the donation request.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

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
