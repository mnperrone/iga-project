<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;
use Illuminate\Support\Facades\Log;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Log::info('Iniciando CourseSeeder');
        
        try {
            Course::create([
                'name' => 'Curso de Cocina Italiana',
                'description' => 'Aprende a cocinar platos italianos clásicos. Incluye recetas de pasta, pizza y postres.',
                'price' => 50.00,
                'image' => 'italian-cooking.jpg',
            ]);
            Log::info('Primer curso creado exitosamente');
        
            Course::create([
                'name' => 'Curso de Pastelería',
                'description' => 'Domina las técnicas de pastelería. Incluye recetas de tartas, galletas y más.',
                'price' => 70.00,
                'image' => 'baking.jpg',
            ]);
            Log::info('Segundo curso creado exitosamente');
        } catch (\Exception $e) {
            Log::error('Error en CourseSeeder: ' . $e->getMessage());
            throw $e;
        }
    }
}
