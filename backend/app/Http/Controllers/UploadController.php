<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            
            // Guardar en el directorio public/images
            $file->move(public_path('images'), $filename);
            
            return response()->json([
                'success' => true,
                'filename' => $filename
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'No se ha proporcionado ninguna imagen'
        ], 400);
    }
} 