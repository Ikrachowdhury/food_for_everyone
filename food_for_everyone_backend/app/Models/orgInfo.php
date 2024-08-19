<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class orgInfo extends Model
{
    use HasFactory;
    protected $table = 'organization_information';
    protected $primaryKey = 'org_id';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'org_id',
        'org_name',
        'office_time',
        'org_about',
        'admin_approval',
    ];
}
