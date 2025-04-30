<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::create([
            'name' => 'Curso de Cocina Italiana',
            'description' => 'Aprende a cocinar platos italianos clásicos.',
            'price' => 50.00,
            'details' => 'Incluye recetas de pasta, pizza y postres.',
            'image' => 'italian_cooking.jpg',
        ]);
    
        Course::create([
            'name' => 'Curso de Pastelería',
            'description' => 'Domina las técnicas de pastelería.',
            'price' => 70.00,
            'details' => 'Incluye recetas de tartas, galletas y más.',
            'image' => 'baking.jpg',
        ]);
    }
}
