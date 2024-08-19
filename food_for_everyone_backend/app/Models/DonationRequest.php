<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonationRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'req_id',
        'donation_id',
        'donee_id',
        'time',
        'receive_location',
        'rider_id',
        'run_status',
        'accept_status',
        // other fields in your donation_request table
    ];

    public function donationPost()
    {
        return $this->belongsTo(DonationPost::class, 'donation_id');
    }
}

