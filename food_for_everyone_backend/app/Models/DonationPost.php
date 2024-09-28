<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonationPost extends Model
{
    use HasFactory;
    protected $table = 'donation_posts';
    protected $primaryKey = 'donation_id';

    public $incrementing = true; 
    protected $keyType = 'int'; 

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'post_name',
        'post_description',
        'serves',
        'expiredate',
        'last_receive_date',
        'receive_time',
        'donee_type',
        'pickup_location',
        'categories',
        'location_lat',
        'location_lon'
    ];

    public function donationRequests()
    {
        return $this->hasMany(DonationRequest::class, 'donation_id');
    }
}
