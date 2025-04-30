<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Purchase;

class PurchaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Purchase::create([
            'client_id' => 1,
            'course_id' => 1,
        ]);
    
        Purchase::create([
            'client_id' => 1,
            'course_id' => 2,
        ]);
    }
}
