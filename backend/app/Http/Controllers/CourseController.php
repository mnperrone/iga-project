<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    public function index()
    {
        // Lógica para listar todos los cursos
        $courses = Course::all();
        return response()->json($courses);
    }

    public function show($id)
    {
        // Lógica para mostrar un curso específico
        $course = Course::findOrFail($id);
        return response()->json($course);
    }
}