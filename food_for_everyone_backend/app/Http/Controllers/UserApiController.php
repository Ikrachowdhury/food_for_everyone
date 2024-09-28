<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\DonationPost;
use App\Models\PostImage;
use App\Models\RiderAvailability;
use App\Models\Notification;
use App\Models\RiderApproval;
use App\Models\User;
use App\Models\orgInfo;
use App\Models\Rating;
use App\Models\Inbox;  
// use Carbon\Carbon;
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
use Psy\Readline\Hoa\Console;

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
                'password' => [
                    'required',
                    'same:confirmPassword',
                    'min:6',
                    'regex:/[A-Z]/'
                ],
                'confirmPassword' => 'required',
                'value' => 'nullable|string',
                'placeInfo' => 'nullable|string',
                'LocationLon' => 'nullable|string',
                'LocationLat' => 'nullable|string',
                'phone' => [
                    'required',
                    'digits:11',
                    'regex:/^01[0-9]{9}$/'
                ],
            ];

            $customMessage = [
                'name.required' => "Name is required",
                'email.required' => "Email is required",
                'email.email' => "Email must be a valid email",
                'email.unique' => "Email already exists",
                'password.required' => "Password is required",
                'password.same' => "Password and Confirm Password must match",
                'password.min' => "Password must be atleast 6 character",
                'password.regex' => "Password must contain a Uppercase character",
                'confirmPassword.required' => "Confirm Password is required",
                'phone.required' => "Phone is required",
                'phone.digits' => 'The phone number must be exactly 11 digits.',
                'phone.regex' => 'The phone number must start with "01".',
                'placeInfo.required' => "Address is required"
            ];

            $validator = Validator::make($data, $rules, $customMessage);
            if ($validator->fails()) {
                // Return the first custom error message for each field
                $errors = $validator->errors()->all();
                return response()->json(['errors' => $errors], 422);
            }

            $user = new User();
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->password = bcrypt($data['password']);
            $user->phone = $data['phone'];
            $user->profile_img = "https://res-console.cloudinary.com/de0xjzms6/thumbnails/v1/image/upload/v1725364995/c3pldjZ6NnhkcGdlbGM3dXNvNjY=/drilldown";
            $user->user_type = $data['value'] ?? null;
            $user->address = $data['placeInfo'] ?? null;
            $user->address_lat = $data['locationLat'] ?? null;
            $user->address_lon = $data['locationLon'] ?? null;
            $user->save();
            $message = "User Successfully Added";

            if ($data['value'] === 'rider') {
                $riderApproval = new RiderApproval();
                $riderApproval->rider_id = $user->id;
                $riderApproval->admin_approval = 'pending';
                $riderApproval->save();
            }
            return response()->json(['message' => $message], 201);
        }
    }

    public function resetPassword(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->all();
            $rules = [
                'email' => 'required|email',
                'password' => 'required|confirmed',
                'password_confirmation' => 'required',
            ];
            $customMessages = [
                'email.required' => "Email is required",
                'email.email' => "Email must be a valid email",
                'password.required' => "Password is required",
                'password.confirmed' => "Password and Confirm Password must match",
                'password_confirmation.required' => "Confirm Password is required",
            ];
            $validator = Validator::make($data, $rules, $customMessages);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $user = User::where('email', $data['email'])->first();

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $user->password = bcrypt($data['password']);
            $user->save();

            return response()->json(['message' => 'Password successfully reset'], 200);
        }
    }

    public function changePassword(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->all();

            $rules = [
                'email' => 'required|email',
                'oldPassword' => 'required',
                'newPassword' => [
                    'required',
                    'min:6',
                    'regex:/[A-Z]/'
                ],
            ];
            $customMessages = [
                'email.required' => "Email is required",
                'email.email' => "Email must be a valid email",
                'oldPassword.required' => "Old password is required",
                'newPassword.required' => "New Password is required",
                'newPassword.min' => "New Password must be atleast 6 character",
                'newPassword.regex' => "New Password must contain a Uppercase character",
            ];

            $validator = Validator::make($data, $rules, $customMessages);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }
            $user = User::where('email', $data['email'])->first();
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }
            if (!Hash::check($data['oldPassword'], $user->password)) {
                return response()->json(['message' => 'Old password does not match'], 400);
            }
            $user->password = bcrypt($data['newPassword']);
            $user->save();
            return response()->json(['message' => 'Password successfully updated'], 200);
        }
        return response()->json(['message' => 'Method not allowed'], 405);
    }

    public function changeNumber(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->all();
            $rules = [
                'user_id' => 'required|exists:users,id',
                'newNumber' => [
                    'required',
                    'digits:11',          // Ensure exactly 11 digits
                    'regex:/^01[0-9]{9}$/' // Ensure it starts with '01' followed by 9 digits
                ],
            ];

            $customMessages = [
                'newNumber.digits' => 'The phone number must be exactly 11 digits.',
                'newNumber.regex' => 'The phone number must start with "01".',
            ];

            // Validate the request
            $validator = Validator::make($request->all(), $rules, $customMessages);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                ], 422);
            }

            $user = User::where('id', $data['user_id'])->first();

            if ($user) {
                $user->phone = $data['newNumber'];

                if ($user->save()) {
                    return response()->json([
                        'success' => true,
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                    ], 500);
                }
            } else {
                return response()->json([
                    'success' => false,
                ], 404);
            }
        }
    }
    public function changeAddress(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->all();
            $rules = [
                'user_id' => 'required|exists:users,id',
                'location' => 'required',
                'locationLat' => 'required',
                'locationLon' => 'required',
            ];
            $customMessages = [
                'location.required' => "Location is required",
                'user_id.required' => "User ID is not found",
                'locationLat.required' => "locationLat is not found",
                'locationLon.required' => "locationLon is not found",
            ];

            // Validate the request
            $validator = Validator::make($request->all(), $rules, $customMessages);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                ], 422);
            }

            $user = User::where('id', $data['user_id'])->first();

            if ($user) {
                $user->address = $data['location'];
                $user->address_lon = $data['locationLon'];
                $user->address_lat = $data['locationLat'];

                if ($user->save()) {
                    return response()->json([
                        'success' => true,
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                    ], 500);
                }
            } else {
                return response()->json([
                    'success' => false,
                ], 404);
            }
        }
    }

    public function addOrganization(Request $request)
    {

        if ($request->isMethod('post')) {
            $data = $request->all();

            $rules = [
                'name' => 'required',
                'location' => 'required',
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
            $user->profile_img = "https://res-console.cloudinary.com/de0xjzms6/thumbnails/v1/image/upload/v1725364995/c3pldjZ6NnhkcGdlbGM3dXNvNjY=/drilldown";
            $user->user_type = $data['value'] ?? null;
            $user->address = $data['location'] ?? null;
            $user->address_lat = $data['locationLat'] ?? null;
            $user->address_lon = $data['locationLon'] ?? null;
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
            return redirect()->to('http://localhost:5173/');
            // return "<h1>Email Verified Successfully</h1>";
        } else {
            return view('404');
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
                // $domain = "http://localhost:5173/";
                $url = $domain . '/verify-mail/' . $random;
                // $url = $domain . '/verify-mail/' ;
                // $url = "http://localhost:5173/";
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


    public function sendForgotPasswordmail($email)
    {
        $user = User::where('email', $email)->first();

        if ($user) {
            $domain = "http://localhost:5173/forgetPassword/";
            $url = $domain . '?email=' . $email;
            $data['url'] = $url;
            $data['email'] = $email;
            $data['title'] = "Forgot Password";
            $data['body'] = "Please click here to verify your email and change the password";
            Mail::send('verifyMail', ['data' => $data], function ($message) use ($data) {
                $message->to($data['email'])->subject($data['title']);
            });

            return response()->json(['success' => true, 'msg' => 'Mail sent successfully.']);
        } else {
            return response()->json(['success' => false, 'msg' => 'User not found.']);
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
                    // 'expiredate' => 'required|string',
                    // 'last_receive_date' => 'required|string',
                    // 'expiredate' => 'required|date_format:d-m-Y',
                    // 'last_receive_date' => 'required|date_format:d-m-Y',
                    'expiredate' => 'required|string|date_format:d/m/Y',
                    'last_receive_date' => 'required|string|date_format:d/m/Y',

                    'receive_time' => 'required|string',
                    'donee_type' => 'required|string|in:Organization,Individual Person,Anyone',
                    'pickup_location' => 'required|string|max:255',
                    'categories' => 'required|string',
                    'urlArray' => 'required',
                    'donation_id' => 'nullable|integer',
                    'location_lat' => 'required',
                    'location_lon' => 'required',
                ];

                $validator = Validator::make($data, $rules);
                if ($validator->fails()) {
                    return response()->json($validator->errors(), 422);
                }

                $urlArray = json_decode($data['urlArray'], true);
                // $urlArray = $data['urlArray'];

                if (json_last_error() !== JSON_ERROR_NONE) {
                    return response()->json(['error' => 'Invalid JSON format for urlArray'], 400);
                }

                $donationPost = null;

                if (isset($data['donation_id']) && $data['donation_id'] != 0) {
                    $donationPost = DonationPost::find($data['donation_id']);
                } else {
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
                $donationPost->location_lat = $data['location_lat'];
                $donationPost->location_lon = $data['location_lon'];
                $donationPost->save();

                $donation_id = $donationPost->donation_id;

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
                ->where('run_status', 'running')
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

    public function getNotification($user_id)
    {
        try {
            $notifications = Notification::where('user_id', $user_id)
                ->orderBy('noti_id', 'desc')
                ->get();

            return response()->json([
                'notifications' => $notifications
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch notifications'], 500);
        }
    }

    public function getDonorProfileRating($user_id)
    {
        try {
            $donationIds = DonationPost::select('donation_id')
                ->where('user_id', $user_id)
                ->pluck('donation_id'); // Extract only the donation_id values

            $reqIds = RequestDonation::whereIn('donation_id', $donationIds)
                ->pluck('req_id'); // Extract the req_id values where donation_id matches

            $reqIdsArray = $reqIds->toArray();

            $ratings = Rating::whereIn('req_id', $reqIdsArray)
                ->pluck('rating');

            $averageRating = $ratings->average();

            return response()->json([
                'rating' => $averageRating,
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
            $riderIds = RiderApproval::where('admin_approval', '!=', 'accepted')->pluck('rider_id');
            $users = User::whereIn('id', $riderIds)->get();
            return response()->json(['rider' => $users], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch data'], 500);
        }
    }

    //Donor Dashboard Donation API
    public function getDonationIdsWithUserIds($user_id)
    {
        try {
            $totalDonationIds = DonationPost::where('user_id', $user_id)->count();
            // $donationIdsWithUserIds = DonationPost::select('donation_id', 'user_id')
            //     ->where('user_id', $user_id)
            //     ->get();
            // $donationIdsWithUserIds = DonationPost::select('donation_id', 'user_id')
            //     ->where('user_id', $user_id)
            //     ->join('RequestDonation', function ($join) {
            //         $join->on('DonationPost.donation_id', '=', 'RequestDonation.donation_id')
            //             ->where('RequestDonation.accept_status', '!=', 'delivered')
            //             ->where('RequestDonation.accept_status', '!=', 'accepted');
            //     })
            //     ->get();
   
            $filteredDonationIds = RequestDonation::select('donation_id')
            ->whereIn('accept_status', ['delivered', 'accepted'])
            ->pluck('donation_id');

            
            $donationIdsWithUserIds = DonationPost::select('donation_id', 'user_id')
                ->where('user_id', $user_id)
                ->whereNotIn('donation_id', $filteredDonationIds)
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
    public function getDonationIdsPosts($user_id)
    {
        try {
            // $now = now()->format('d/m/Y');
            $now = now()->format('d/m/Y');
            $user_type = User::where('id', $user_id)->pluck('user_type')->first();
            $requestDonationIds = RequestDonation::where('user_id', $user_id)->pluck('donation_id')->toArray();
            if ($user_type == 'donee') {
                $donationIdsWithUserIds = DonationPost::select('donation_id', 'user_id')
                    ->where(function ($query) {
                        $query->where('donee_type', 'Individual Person')
                            ->orWhere('donee_type', 'Anyone');
                    })
                    ->whereRaw("STR_TO_DATE(expiredate, '%d/%m/%Y') >= STR_TO_DATE(?, '%d/%m/%Y')", [$now])
                    ->get();
            } else if ($user_type == 'organization') {
                $donationIdsWithUserIds = DonationPost::select('donation_id', 'user_id')
                    ->where(function ($query) {
                        $query->where('donee_type', 'Organization')
                            ->orWhere('donee_type', 'Anyone');
                    })
                    ->whereRaw("STR_TO_DATE(expiredate, '%d/%m/%Y') >= STR_TO_DATE(?, '%d/%m/%Y')", [$now])

                    // ->whereDate('expiredate', '>=', now())
                    ->get();
            }

            $filteredDonationIdsWithUserIds = $donationIdsWithUserIds->filter(function ($donationPost) use ($requestDonationIds) {
                return !in_array($donationPost->donation_id, $requestDonationIds);
            })->values();

            // Get the total count of donation IDs

            return response()->json([
                'donation_ids_with_user_ids' => $filteredDonationIdsWithUserIds,
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
            'accept_status' => 'required|string',
            'run_status' => 'required|string',
            'delivery' => 'required|string',
        ]);
        $validatedData['donation_id'] = (int) $validatedData['donation_id'];
        $validatedData['user_id'] = (int) $validatedData['user_id'];
        $requestDonation = RequestDonation::create($validatedData);

        $donation_id = $request->input('donation_id');
        $user_id = DonationPost::where('donation_id', $donation_id)
            ->pluck('user_id')
            ->first();

        $post_title = DonationPost::where('donation_id', $donation_id)
            ->pluck('post_name')
            ->first();

        $notification = new Notification();
        $notification->user_id = $user_id;
        $notification->description = "A New request for {$post_title}.";
        $notification->status = 'success';
        $notification->save();

        return response()->json([
            'message' => 'Request donation created successfully!',
            'data' => $requestDonation
        ], 200);
    }

    public function riderRunningDetails($rider_id)
    {
        try {
            $pendingDonations = RequestDonation::where('rider_id', $rider_id)
                ->where('rider_status', 'pending')
                ->where('rider_allocation', "yes")
                ->get(['donation_id', 'user_id', 'req_id']);

            $donationIds = $pendingDonations->pluck('donation_id');
            $req_ids = $pendingDonations->pluck('req_id')->unique();
            $userIDs = $pendingDonations->pluck('user_id');

            $doneeInfoCollection = User::whereIn('id', $userIDs)->get();
            $doneeInfo = $pendingDonations->mapWithKeys(function ($donation) use ($doneeInfoCollection) {
                $donee = $doneeInfoCollection->firstWhere('id', $donation->user_id);
                return $donee ? [$donation->req_id => $donee->toArray()] : [];
            });

            $donationPosts = DonationPost::whereIn('donation_id', $donationIds)
                ->get(['user_id', 'donation_id']);
            $relatedUserIDs = $donationPosts->pluck('user_id');

            $donorInfoCollection = User::whereIn('id', $relatedUserIDs)->get();
            $donorInfo = $donationPosts->mapWithKeys(function ($post) use ($donorInfoCollection) {
                $donor = $donorInfoCollection->firstWhere('id', $post->user_id);
                return $donor ? [$post->donation_id => $donor->toArray()] : [];
            });

            $response = [];
            foreach ($pendingDonations as $donation) {
                $response[] = [
                    'doneeInfo' => $doneeInfo->get($donation->req_id, null),
                    'donorInfo' => $donorInfo->get($donation->donation_id, []),
                    'req_id' => $donation->req_id,
                ];
            }

            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch information'], 500);
        }
    }
    public function riderRequestedPostDetails($rider_id)
    {
        try {
            $pendingDonations = RequestDonation::where('rider_id', $rider_id)
                ->where('rider_status', 'Pending')
                ->where('rider_allocation', "no")
                ->get(['donation_id', 'user_id', 'req_id']);

            $donationIds = $pendingDonations->pluck('donation_id');
            $req_ids = $pendingDonations->pluck('req_id')->unique();
            $userIDs = $pendingDonations->pluck('user_id');

            $doneeInfoCollection = User::whereIn('id', $userIDs)->get();
            $doneeInfo = $pendingDonations->mapWithKeys(function ($donation) use ($doneeInfoCollection) {
                $donee = $doneeInfoCollection->firstWhere('id', $donation->user_id);
                return $donee ? [$donation->req_id => $donee->toArray()] : [];
            });

            $donationPosts = DonationPost::whereIn('donation_id', $donationIds)
                ->get(['user_id', 'donation_id']);
            $relatedUserIDs = $donationPosts->pluck('user_id');

            $donorInfoCollection = User::whereIn('id', $relatedUserIDs)->get();
            $donorInfo = $donationPosts->mapWithKeys(function ($post) use ($donorInfoCollection) {
                $donor = $donorInfoCollection->firstWhere('id', $post->user_id);
                return $donor ? [$post->donation_id => $donor->toArray()] : [];
            });

            $response = [];
            foreach ($pendingDonations as $donation) {
                $response[] = [
                    'doneeInfo' => $doneeInfo->get($donation->req_id, null),
                    'donorInfo' => $donorInfo->get($donation->donation_id, []),
                    'req_id' => $donation->req_id,
                    'donation_id' => $donation->donation_id,
                ];
            }

            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch information'], 500);
        }
    }


    public function userProfile($user_id)
    {
        try {
            $user = User::where('id', $user_id)->first();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            if ($user->user_type === 'organization') {
                $org_info = OrgInfo::where('org_id', $user->id)->first();

                if ($org_info) {
                    // Merge user data and org_info data into a single array
                    $user = array_merge($user->toArray(), $org_info->toArray());
                }
            }

            return response()->json(['user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch user information'], 500);
        }
    }
    public function findNearestRider($donation_id)
    {
        try {
            // Get the post location for the given donation_id
            $post_location = DonationPost::where('donation_id', $donation_id)
                ->get(['location_lon', 'location_lat']);

            if ($post_location->isEmpty()) {
                return response()->json(['error' => 'Post not found'], 404);
            }

            // Get available rider IDs
            $availableRiderIds = RiderAvailability::where('availability', 'yes')
                ->pluck('rider_id');

            // Get the locations of available riders
            $riderLocations = User::whereIn('id', $availableRiderIds)
                ->get(['id', 'address_lon', 'address_lat']);

            return response()->json([
                'post_location' => $post_location,
                'rider_locations' => $riderLocations,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
        }
    }

    public function riderTotalDelivery($rider_id)
    {
        try {
            $delivered_count = RequestDonation::where('rider_id', $rider_id)
                ->where('rider_status', 'delivered')
                ->where('rider_allocation', "yes")
                ->count();

            $pending_count = RequestDonation::where('rider_id', $rider_id)
                ->where('rider_status', 'pending')
                ->where('rider_allocation', "yes")
                ->count();

            $canceled_count = RequestDonation::where('rider_id', $rider_id)
                ->where('rider_status', 'canceled')
                ->where('rider_allocation', "yes")
                ->count();

            if (!$delivered_count) {
                return response()->json(['delivered_count' => 0, 'pending_count' => $pending_count, 'canceled_count' => $canceled_count], 200);
            }
            if (!$pending_count) {
                return response()->json(['delivered_count' => $delivered_count, 'pending_count' => 0, 'canceled_count' => $canceled_count], 200);
            }
            if (!$canceled_count) {
                return response()->json(['delivered_count' => $delivered_count, 'pending_count' => $pending_count, 'canceled_count' => 0], 200);
            }
            return response()->json([
                'delevered_count' => $delivered_count,
                'pending_count' => $pending_count,
                'canceled_count' => $canceled_count,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch user information'], 500);
        }
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

    public function selectRider(Request $request)
    {
        try {
            $data = $request->all();
            $donation = RequestDonation::where('donation_id', $data['donationID'])->first();

            if ($donation) {
                $donation->rider_id = $data['minRiderId'];
                $donation->rider_status = 'pending';
                $donation->rider_allocation = 'no';
                $donation->save();

                return response()->json(['success' => 'Rider updated successfully'], 200);
            } else {
                return response()->json(['error' => 'Donation ID not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update rider information'], 500);
        }
    }


    public function acceptDonationRequest(Request $request)
    {
        try {
            $donation_id = $request->input('donationID');
            $donee_id = $request->input('donee_id');
            $delivery_type = $request->input('deliveryType');
            $result_type = 'pickup_result';
            $donation = RequestDonation::where('donation_id', $donation_id)
                                        ->where('user_id', $donee_id)
                                        ->first();
            if ($donation) {
                $donation->accept_status = 'accepted';
                $donation->run_status = 'running';
                $donation->save();
            }
            
            $post_location = DonationPost::where('donation_id', $donation_id)
                ->get(['location_lon', 'location_lat']); 

            $post_title = DonationPost::where('donation_id', $donation_id)
                ->pluck('post_name')
                ->first();
            
            $notification = new Notification();
            $notification->user_id = $donee_id ;
            $notification->description = "Your request for {$post_title} has been accepted.";
            $notification->status = 'success';
            $notification->save();


            if ($delivery_type === 'Rider'){

                $availableRiderIds = RiderAvailability::where('availability', 'yes')->pluck('rider_id');

                if (!$availableRiderIds->isEmpty()) {  
                    $riderLocations = User::whereIn('id', $availableRiderIds)
                    ->get(['id', 'address_lon', 'address_lat']);
                    $result_type = 'delivery_result';
                }else{
                    if ($donation) {
                        $donation->delivery = 'Pickup'; 
                        $donation->save();
                    }

                    $notification = new Notification();
                    $notification->user_id = $donee_id ;
                    $notification->description = "There are no rider available for  {$post_title} now you have to pickup";
                    $notification->status = 'success';
                    $notification->save();
                }

            }   

            if($result_type === 'delivery_result'){
                return response()->json([
                    'result_type'=>$result_type,
                    'post_location' => $post_location,
                    'rider_locations' => $riderLocations, 
                ], 200);
            }else{
                return response()->json([
                    'result_type'=>$result_type,
                    'post_location' => $post_location,  
                ], 200);
            }

         
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch  information'], 500);
        }
    }
    public function riderPickedFood(Request $request)
    {
        try {
            $req_id = $request->input('req_id');
            $requestDonation = RequestDonation::where('req_id', $req_id)
                ->select('user_id', 'donation_id')
                ->firstOrFail(); // This will throw a ModelNotFoundException if no result is found

            $post_title = DonationPost::where('donation_id', $requestDonation->donation_id)
                ->pluck('post_name')
                ->first();

            $notification = new Notification();
            $notification->user_id = $requestDonation->user_id;
            $notification->description = "The rider has picked up the food for {$post_title} ";
            $notification->status = 'success';
            $notification->save();

            return response()->json(['success' => 'Notification sent successfully.']);
        } catch (\Exception $e) {
            // Handle any other exceptions
            return response()->json(['error' => 'Request or donation not found.'], 500);
        }
    }


    public function rejectDelivery(Request $request)
    {
        try {
            $donation_id = $request->input('donationID');
            // $donation = RequestDonation::where('donation_id', $donation_id)->first();
            // if ($donation) {
            //     $donation->accept_status = 'accepted';
            //     $donation->save();
            // }

            $post_location = DonationPost::where('donation_id', $donation_id)
                ->get(['location_lon', 'location_lat']);

            $availableRiderIds = RiderAvailability::where('availability', 'yes')
                ->pluck('rider_id');

            $riderLocations = User::whereIn('id', $availableRiderIds)
                ->get(['id', 'address_lon', 'address_lat']);

            return response()->json([
                'post_location' => $post_location,
                'rider_locations' => $riderLocations,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch  information'], 500);
        }
    }

    public function riderAvailability(Request $request)
    {
        $rider_id = $request->input('user_id');
        $availability = $request->input('active');
        $rider = RiderAvailability::where('rider_id', $rider_id)->first();

        if (!$rider) {
            // Create a new instance of RiderAvailability
            $riderAvailability = new RiderAvailability();
            $riderAvailability->rider_id = $rider_id;
            $riderAvailability->availability = $availability;
            $riderAvailability->save();

            return response()->json([
                'success' => true,
            ], 200);
        } else if ($rider) {
            $rider->availability = $availability;
            $rider->save();

            return response()->json([
                'success' => true,
                'data' => $rider
            ], 200);
        } else {
            return response()->json([
                'success' => false,
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
    public function approveRiderRequest(Request $request)
    {
        $rider_id = $request->input('org_id');
        $rider = RiderApproval::where('rider_id', $rider_id)->first();

        if (!$rider) {
            $riderApproval = new RiderApproval();
            $riderApproval->rider_id = $rider_id;
            $riderApproval->admin_approval = 'accepted';
            $riderApproval->save();

            return response()->json([
                'success' => true,
            ], 200);
        }

        if ($rider) {
            $rider->admin_approval = 'accepted';
            $rider->save();

            return response()->json([
                'success' => true,
                'message' => 'Rider Request is approved successfully!',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Rider Request approval failed!'
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

        $donor_id = DonationPost::where('donation_id', $donation_id)
            ->pluck('user_id')
            ->first();

        $post_title = DonationPost::where('donation_id', $donation_id)
            ->pluck('post_name')
            ->first();

        if ($donor_id) {
            $notification = new Notification();
            $notification->user_id = $donor_id;
            $notification->description = "The donee has received {$post_title} ";
            $notification->status = 'success';
            $notification->save();
        }

        if ($donation) {
            // $donation->accept_status = 'delivered';
            $donation->run_status = 'delivered';
            $donation->save();

            return response()->json([
                'success' => true,
                'message' => 'Donation delivered successfully!',
                'data' => $donation
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found!'
            ], 404);
        }
    }
    public function donorDeliveredDonation(Request $request)
    {
        $donation_id = $request->input('donationID');
        $donation = RequestDonation::where('donation_id', $donation_id)->first();

        // $donor_id = DonationPost::where('donation_id', $donation_id)
        //     ->pluck('user_id')
        //     ->first();

        // $post_title = DonationPost::where('donation_id', $donation_id)
        //     ->pluck('post_name')
        //     ->first();

        // if ($donor_id) {
        //     $notification = new Notification();
        //     $notification->user_id = $donor_id;
        //     $notification->description = "The donee has received {$post_title} ";
        //     $notification->status = 'success';
        //     $notification->save();
        // }

        if ($donation) {
            $donation->accept_status = 'delivered';
            // $donation->run_status = 'delivered';
            $donation->save();

            return response()->json([
                'success' => true,
                'message' => 'Donation delivered successfully!',
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

            $user_id = RequestDonation::where('donation_id', $donation_id)
                ->pluck('user_id')
                ->first();

            $post_title = DonationPost::where('donation_id', $donation_id)
                ->pluck('post_name')
                ->first();

            $notification = new Notification();
            $notification->user_id = $user_id;
            $notification->description = "Your request for {$post_title} has been rejected.";
            $notification->status = 'danger';
            $notification->save();

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
    public function userImageUpload(Request $request)
    {
        $image_url = $request->input('imageURL');
        $user_id = $request->input('user_id');
        $user = User::where('id', $user_id)->first();

        if ($user) {
            $user->profile_img = $image_url;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Image Uploaded successfully!',
                // 'data' => $donation
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found!'
            ], 404);
        }
    }
    public function riderDelivery(Request $request)
    {
        $req_id = $request->input('req_id');
        $req_id = RequestDonation::where('req_id', $req_id)->first();

        if ($req_id) {
            $req_id->rider_status = 'delivered';
            $req_id->save();

            return response()->json([
                'success' => true,
                'message' => 'Delevered successfully!',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found!'
            ], 404);
        }
    }
    public function riderAcceptRequest(Request $request)
    {
        $req_id = $request->input('req_id');
        $donation_id = $request->input('donationID');
        $req_id = RequestDonation::where('req_id', $req_id)->first();

        $donee_id = RequestDonation::where('donation_id', $donation_id)
            ->pluck('user_id')
            ->first();

        $donor_id = DonationPost::where('donation_id', $donation_id)
            ->pluck('user_id')
            ->first();

        $post_title = DonationPost::where('donation_id', $donation_id)
            ->pluck('post_name')
            ->first();



        if ($donor_id) {
            $notification = new Notification();
            $notification->user_id = $donor_id;
            $notification->description = "The rider has accepted your delivery for {$post_title} ";
            $notification->status = 'success';
            $notification->save();
        }
        if ($donee_id) {
            $notification = new Notification();
            $notification->user_id = $donee_id;
            $notification->description = "The rider has accepted your delivery for {$post_title} ";
            $notification->status = 'success';
            $notification->save();
        }

        if ($req_id) {
            $req_id->rider_allocation = 'yes';
            $req_id->save();

            return response()->json([
                'success' => true,
                'message' => 'Request accepted!',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Request not found!'
            ], 404);
        }
    }

    public function rejectDonorOnRunDonation(Request $request)
    {
        $donation_id = $request->input('donationID');
        $user_type = $request->input('user_type');
        $donation = RequestDonation::where('donation_id', $donation_id)->first();

        if ($donation) {
            $rider_id = $donation->rider_id;
            $rider_allocation = $donation->rider_allocation;

            // Update donation status
            $donation->accept_status = 'canceled';
            $donation->rider_id = null;
            $donation->rider_status = null;
            $donation->rider_allocation = null;
            $donation->save();

            // Determine the user_id based on the user_type
            $user_id = null;
            if ($user_type === 'donor') {
                $user_id = RequestDonation::where('donation_id', $donation_id)
                    ->pluck('user_id')
                    ->first();
            } elseif ($user_type === 'donee' || $user_type === 'organization') {
                $user_id = DonationPost::where('donation_id', $donation_id)
                    ->pluck('user_id')
                    ->first();
            }

            if ($user_id) {
                $post_title = DonationPost::where('donation_id', $donation_id)
                    ->pluck('post_name')
                    ->first();

                if ($post_title) {
                    // Create a notification for the user
                    $notification = new Notification();
                    $notification->user_id = $user_id;
                    $notification->description = "The running request for {$post_title} has been canceled.";
                    $notification->status = 'danger';
                    $notification->save();

                    // Create a notification for the rider
                    if ($rider_allocation === 'yes') {
                        $riderNotification = new Notification();
                        $riderNotification->user_id = $rider_id;
                        $riderNotification->description = "The running request for {$post_title} that you were assigned to has been canceled.";
                        $riderNotification->status = 'danger';
                        $riderNotification->save();
                    }

                    return response()->json([
                        'success' => true,
                        'message' => 'Donation request canceled successfully!',
                        'data' => $donation
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Post title not found!'
                    ], 404);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found!'
                ], 404);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found!'
            ], 404);
        }
    }

    public function cancelDoneeRequest(Request $request)
    {
        $donation_id = $request->input('donationID');
        $donation = RequestDonation::where('donation_id', $donation_id)->first();

        if ($donation) {
            $donation->accept_status = 'canceled';
            $donation->save();
            return response()->json([
                'success' => true,
                'message' => $donation_id
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => $donation_id
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

    public function setDeliveryType(Request $request)
    {
        try {
            $donation_id = $request->input('donationID');
            $donee_id = $request->input('donee_id');  

            
            $donation = RequestDonation::where('donation_id', $donation_id)
                                        ->where('user_id', $donee_id)
                                        ->first();
                                        if ($donation) {
                                            $donation->delivery = 'Pickup'; 
                                            $donation->save();
                                        }
             
            
            $notification = new Notification();
            $notification->user_id = $donee_id ;
            $notification->description = "No rider available You have to pickup food for yourself";
            $notification->status = 'success';
            $notification->save();
 
         
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch  information'], 500);
        }
    }
 
}
