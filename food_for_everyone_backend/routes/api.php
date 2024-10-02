<?php

use App\Http\Controllers\InboxController;
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
Route::post('/approveRiderRequest', [userApiController::class, 'approveRiderRequest']);
Route::post('/doneeDeliveredDonation', [userApiController::class, 'deliveredDonation']);
Route::post('/rating', [userApiController::class, 'ratingDonation']);
Route::post('/reject-DonationRequest', [userApiController::class, 'rejectDonationRequest']);
Route::post('/reject-DonorOnRun', [userApiController::class, 'rejectDonorOnRunDonation']);
Route::post('/cancelDoneeRequest', [userApiController::class, 'cancelDoneeRequest']);
Route::post('/rejectOrganizationRequest', [userApiController::class, 'rejectOrganizationRequest']);
Route::post('/delete-donation', [userApiController::class, 'deleteDonationPost']);
Route::post('/resetPassword', [userApiController::class, 'resetPassword']);
Route::post('/changePassword', [userApiController::class, 'changePassword']);
Route::post('/changeNumber', [userApiController::class, 'changeNumber']);
Route::post('/changeAddress', [userApiController::class, 'changeAddress']);
Route::post('/riderDelivery', [userApiController::class, 'riderDelivery']);
Route::post('/riderAvailability', [userApiController::class, 'riderAvailability']);
Route::post('/selectRider', [userApiController::class, 'selectRider']);
Route::post('/riderAcceptRequest', [userApiController::class, 'riderAcceptRequest']);
Route::post('/rejectDelivery', [userApiController::class, 'rejectDelivery']);
Route::post('/userImageUpload', [userApiController::class, 'userImageUpload']);
Route::post('/riderPickedFood', [userApiController::class, 'riderPickedFood']);
Route::post('/donorDeliveredDonation', [userApiController::class, 'donorDeliveredDonation']);
Route::post('/payment', [userApiController::class, 'payment']);
Route::post('/otp', [userApiController::class, 'otp']);
Route::post('/bkashNumberCheck', [userApiController::class, 'bkashNumberCheck']);
Route::post('/bkashPasswordCheck', [userApiController::class, 'bkashPasswordCheck']);


// Route::get('/get-total-delivered-donations', [userApiController::class, 'getTotalDeliveredDonations']);
Route::get('/send-verify-mail/{email}',[userApiController::class,'sendVerifymail']);
Route::get('/send-adminApproval-mail/{email}',[userApiController::class,'sendAdminApprovalmail']);
Route::get('/send-forgotPass-mail/{email}',[userApiController::class,'sendForgotPasswordmail']);
Route::get('/logout',[userApiController::class,'logout']);
Route::get('/dashboardDonations/{donation_id}',[userApiController::class,'getDonationById']);
Route::get('/donorOnRunPost/{user_id}',[userApiController::class,'getAcceptedPost']);
Route::get('/doneeOnRunPost/{user_id}',[userApiController::class,'getDoneeAcceptedPost']);
Route::get('/donation-posts/{user_id}',[userApiController::class,'getDonationIdsWithUserIds']);
Route::get('/donee-dashboard/{user_id}',[userApiController::class,'getDonationIdsPosts']);
Route::get('/doneeRequestedPost/{user_id}', [userApiController::class, 'getPendingDonations']);
Route::get('/donorsideRequestedPost/{user_id}', [userApiController::class, 'getRequestDonations']);
Route::get('/doneeHistory/{user_id}', [userApiController::class, 'getDoneeHistory']);
Route::get('/organizationList', [userApiController::class, 'getOrganizationList']);
Route::get('/doneeListAdmin', [userApiController::class, 'doneeList']);
Route::get('/riderListAdmin', [userApiController::class, 'riderList']);
Route::get('/profile/{user_id}', [userApiController::class, 'userProfile']);
Route::get('/riderRunningDetails/{rider_id}', [userApiController::class, 'riderRunningDetails']);
Route::get('/riderRequestedPostDetails/{rider_id}', [userApiController::class, 'riderRequestedPostDetails']);
Route::get('/riderTotalDelivery/{rider_id}', [userApiController::class, 'riderTotalDelivery']);
Route::get('/findNearestRider/{donation_id}', [userApiController::class, 'findNearestRider']);
Route::get('/donorProfileRating/{user_id}', [userApiController::class, 'getDonorProfileRating']);
Route::get('/getNotification/{user_id}', [userApiController::class, 'getNotification']);
Route::get('/donorHistory/{user_id}', [userApiController::class, 'donorHistory']);
Route::get('/totalServes/{user_id}', [userApiController::class, 'totalServes']);
Route::get('/totalDonatedPeople/{user_id}', [userApiController::class, 'totalDonatedPeople']);
Route::get('/getAllRatingDetails/{user_id}', [userApiController::class, 'getAllRatingDetails']);

Route::post('/setDeliveryType', [userApiController::class,'setDeliveryType']);

//_____________________________msg section_______________________________________
Route::post('/createInbox',[InboxController::class,'createInbox']);
Route::get('/getAllInboxes/{user_id}',[InboxController::class,'getAllInboxes']);
Route::get('/getChatHeaadInfo/{donation_id}/{reciever_id}',[InboxController::class,'getChatHeaadInfo']);
Route::post('/sendMsg',[InboxController::class,'sendMsg']);
Route::get('/getMsghistory/{inbox_id}',[InboxController::class,'getMsghistory']);
Route::get('/deleteInboxes/{donation_id}/{reciever_id}',[InboxController::class,'deleteInboxes']);