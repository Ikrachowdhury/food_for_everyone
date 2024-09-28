<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiderAvailability extends Model
{
    protected $table = 'rider_availability';
    protected $primaryKey = 'rider_id';
    protected $keyType = 'int';
    public $timestamps = false;
    protected $fillable = ['rider_id', 'availability'];
}
