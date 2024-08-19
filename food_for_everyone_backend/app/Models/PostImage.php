<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostImage extends Model
{
    use HasFactory;

    protected $table = 'post_images';
    protected $primaryKey = 'image_id';
    public $timestamps = false;

    protected $fillable = [
        'donation_id',
        'image_path',
    ];
}
