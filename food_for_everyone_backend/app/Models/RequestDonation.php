<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestDonation extends Model
{
    use HasFactory;
    protected $table = 'requestdonation';
    protected $primaryKey = 'req_id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'donation_id',
        'user_id',
        'location',
        'accept_status',
        'run_status',
        'delivery',
    ];
}
