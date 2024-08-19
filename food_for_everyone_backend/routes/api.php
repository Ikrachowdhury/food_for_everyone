<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserApiController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/add-user',[userApiController::class,'adduser']);
Route::post('/add-organization',[userApiController::class,'addOrganization']);
Route::post('/newdonation',[userApiController::class,'newDonation']);
Route::post('/login',[userApiController::class,'login']);
Route::post('/requestdonation', [userApiController::class, 'requestDonation']);
Route::post('/accept-DonationRequest', [userApiController::class, 'acceptDonationRequest']);
Route::post('/approveOrganizationRequest', [userApiController::class, 'approveOrganizationRequest']);
Route::post('/doneeDeliveredDonation', [userApiController::class, 'deliveredDonation']);
Route::post('/rating', [userApiController::class, 'ratingDonation']);
Route::post('/reject-DonationRequest', [userApiController::class, 'rejectDonationRequest']);
Route::post('/reject-DonorOnRun', [userApiController::class, 'rejectDonorOnRunDonation']);
Route::post('/rejectOrganizationRequest', [userApiController::class, 'rejectOrganizationRequest']);
Route::post('/delete-donation', [userApiController::class, 'deleteDonationPost']);

Route::get('/get-total-delivered-donations', [userApiController::class, 'getTotalDeliveredDonations']);
Route::get('/send-verify-mail/{email}',[userApiController::class,'sendVerifymail']);
Route::get('/send-adminApproval-mail/{email}',[userApiController::class,'sendAdminApprovalmail']);
Route::get('/logout',[userApiController::class,'logout']);
Route::get('/dashboardDonations/{donation_id}',[userApiController::class,'getDonationById']);
Route::get('/donorOnRunPost/{user_id}',[userApiController::class,'getAcceptedPost']);
Route::get('/doneeOnRunPost/{user_id}',[userApiController::class,'getDoneeAcceptedPost']);
Route::get('/donation-posts/{user_id}',[userApiController::class,'getDonationIdsWithUserIds']);
Route::get('/donee-dashboard',[userApiController::class,'getDonationIdsPosts']);
Route::get('/doneeRequestedPost/{user_id}', [userApiController::class, 'getPendingDonations']);
Route::get('/donorsideRequestedPost/{user_id}', [userApiController::class, 'getRequestDonations']);
Route::get('/doneeHistory/{user_id}', [userApiController::class, 'getDoneeHistory']);
Route::get('/organizationList', [userApiController::class, 'getOrganizationList']);
Route::get('/doneeListAdmin', [userApiController::class, 'doneeList']);
Route::get('/riderListAdmin', [userApiController::class, 'riderList']);
// Route::get('/getrating/{donation_id}', [userApiController::class, 'getRating']);