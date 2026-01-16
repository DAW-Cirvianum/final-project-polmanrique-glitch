<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Incidence extends Model
{
    protected $fillable = [
        'student_id',
        'description',
        'grade',
    ];
}
