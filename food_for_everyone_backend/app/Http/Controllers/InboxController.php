<?php

namespace App\Http\Controllers;

use App\Models\DonationPost;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Inbox;
use App\Models\User;
use App\Models\Messeges;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Validator;
 

class InboxController extends Controller
{
    
    public function createInbox(Request $request) 
{
    $data = $request->all();   
    try {
        if ($request->isMethod('post')) {
            $rules = [
                'doner_id' => 'required|integer|exists:users,id',
                'reciever_id' => 'required|integer|exists:users,id', 
                'donation_id' => 'required|integer', 
                'masg_type' => 'required|string',  
            ];

            $validator = Validator::make($data, $rules);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            } 
              
            $inbox = new Inbox();
            $inbox->doner_id = $data['doner_id']; 
            $inbox->reciever_id = $data['reciever_id']; 
            $inbox->donation_id = $data['donation_id']; 
            $inbox->masg_type = $data['masg_type']; 
            $inbox->save();

            return response()->json(['message' => 'Chat inbox created successfully'], 200);
        }
    } catch (\Exception $e) {
        Log::error('Error in createInbox method: ' . $e->getMessage());
        return response()->json(['error' => 'An error occurred while creating the chat inbox.'], 500);
    }
}
 
public function getAllInboxes($user_id)
{
    try {
        // Fetch all inboxes where the 'doner_id' matches the given user ID
        $allInboxes = Inbox::where('doner_id', $user_id)
        ->orWhere('reciever_id', $user_id)
        ->get();

        // Check if there are no inboxes found
        if ($allInboxes->isEmpty()) {
            return response()->json(['message' => 'No inboxes found for this user'], 404);
        }

        // Return the fetched inboxes in the response as JSON
        return response()->json([
            'inboxes' => $allInboxes
        ], 200);

    } catch (\Exception $e) {
        // Log the error and return an error response
        Log::error('Error in getAllInboxes method: ' . $e->getMessage());
        return response()->json(['error' => 'Failed to fetch inboxes'], 500);
    }
}
public function getChatHeaadInfo($donation_id,$reciever_id)
{ 
    try{
        $reciever_info = User::where('id', $reciever_id)->get(); 

        if(!$donation_id){ 
        return response()->json([
            'reciever_info' => $reciever_info, 
        ], 200);
        }else{
            $donation_info= DonationPost::where('donation_id',$donation_id)->get();
            return response()->json([
                'reciever_info' => $reciever_info,
                'donation_info' => $donation_info
            ], 200);
        }
          

    } catch (\Exception $e) {
        // Log the error and return an error response
        Log::error('Error in getChatHeaadInfo  method: ' . $e->getMessage());
        return response()->json(['error' => 'Failed to fetch getChatHeaadInfo'], 500);
    }
}

public function sendMsg(Request $request) 
{
    $data = $request->all();   
    try {
        if ($request->isMethod('post')) {
            $rules = [
                'inbox_id' => 'required|integer',
                'reply_id' => 'required|integer', 
                'user_id'=> 'required|integer',
                'msg' => 'required|string',  
            ];

            $validator = Validator::make($data, $rules);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }  
            $current_datetime = date('Y-m-d H:i:s');
            $messeges = new Messeges();
            $messeges->inbox_id = $data['inbox_id']; 
            $messeges->reply_id = $data['reply_id']; 
            $messeges->msg = $data['msg']; 
            $messeges->msg_sender_id= $data['user_id'];
            $messeges->msg_time	=$current_datetime;
            $messeges->save();


            return response()->json(['message' => 'msg inserted succesfully'], 200);
        }
    } catch (\Exception $e) {
        Log::error('Error in createInbox method: ' . $e->getMessage());
        return response()->json(['error' => 'An error occurred whileintering msg'], 500);
    }
}

public function getMsghistory($inbox_id)
{
    try {
         
        $inbox_msges = Messeges::where('inbox_id', $inbox_id)->get();

        // Check if there are no inboxes found
        if ($inbox_msges ->isEmpty()) {
            return response()->json(['message' => 'No $inbox_msges  found for this user'], 404);
        }

        // Return the fetched inboxes in the response as JSON
        return response()->json([
            'msg_history' => $inbox_msges
        ], 200);

    } catch (\Exception $e) {
        // Log the error and return an error response
        Log::error('Error in getAllInboxes method: ' . $e->getMessage());
        return response()->json(['error' => 'Failed to fetch inbox_msges'], 500);
    }
}

}
