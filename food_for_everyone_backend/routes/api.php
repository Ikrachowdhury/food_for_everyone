<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserApiController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::get('/users/{id?}',[userApiController::class,'showUser']);
Route::post('/add-user',[userApiController::class,'adduser']);
Route::post('/newdonation',[userApiController::class,'newDonation']);
// Route::post('/{userId}/delivered-donations',[userApiController::class,'countDeliveredDonations']);
Route::get('/get-total-delivered-donations', [userApiController::class, 'getTotalDeliveredDonations']);
Route::post('/login',[userApiController::class,'login']);
// Route::post('/add-multiple-user',[userApiController::class,'addMultipleUser']);
// Route::post('/register',[userApiController::class,'register']);
Route::get('/send-verify-mail/{email}',[userApiController::class,'sendVerifymail']);
Route::get('/logout',[userApiController::class,'logout']);
Route::get('/dashboardDonations/{donation_id}',[userApiController::class,'getDonationById']);
Route::get('/donation-posts/{user_id}',[userApiController::class,'getDonationIdsWithUserIds']);
Route::get('/donee-dashboard',[userApiController::class,'getDonationIdsPosts']);
Route::post('/requestdonation', [userApiController::class, 'requestDonation']);
Route::get('/doneeRequestedPost/{user_id}', [userApiController::class, 'getPendingDonations']);
Route::get('/donorsideRequestedPost/{user_id}', [userApiController::class, 'getRequestDonations']);
// Route::get('/requestedUserInfo/{donation_id}', [userApiController::class, 'getRequestedUser']);
