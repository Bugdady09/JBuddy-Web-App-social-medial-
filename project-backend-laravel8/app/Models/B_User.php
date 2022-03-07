<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class B_User extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'city',
        'id'
    ];

    protected $hidden = [
        'password'
    ];

    public $timestamps = false;
}