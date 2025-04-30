<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'amount'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
