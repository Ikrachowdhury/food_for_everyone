<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class  Inbox extends Model
{
    use HasFactory;
    protected $table = 'inbox';
    protected $primaryKey = 'inbox_id';

    public $incrementing = true; 
    protected $keyType = 'int'; 

    public $timestamps = false;


    protected $fillable = [
        'inbox_id',
        'doner_id',
        'reciever_id',
        'donation_id',
        'masg_type', 
        // other fields in your donation_request table
    ];

}