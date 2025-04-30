<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// Ensure the Purchase model exists in the specified namespace
use App\Models\Purchase;
use App\Models\Course;

class Client extends Model
{
    use HasFactory;
    
    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

        public function courses()
    {
        return $this->belongsToMany(Course::class, 'purchases');
    }
}