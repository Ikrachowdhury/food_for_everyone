<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class  Messeges extends Model
{
    use HasFactory;
    protected $table = 'messeges';
    protected $primaryKey = 'msg_id';

    public $incrementing = true; 
    protected $keyType = 'int'; 

    public $timestamps = false;


    protected $fillable = [
        'msg_id',
        'inbox_id',
        'msg',
        'msg_sender_id',
        'reply_id', 
        'msg_time',
       
    ];

}