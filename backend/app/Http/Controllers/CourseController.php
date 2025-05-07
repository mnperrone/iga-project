<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;

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

    public function store(StoreCourseRequest $request)
    {
        $course = Course::create($request->validated());

        return response()->json($course, 201);
    }
}