<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                
                // Guardar la imagen en el directorio public del backend
                $file->move(public_path('images'), $filename);
                
                Log::info('Imagen subida exitosamente: ' . $filename);
                
                return response()->json([
                    'success' => true,
                    'filename' => $filename
                ]);
            }

            Log::error('No se proporcionó ninguna imagen en la solicitud');
            return response()->json([
                'success' => false,
                'message' => 'No se ha proporcionado ninguna imagen'
            ], 400);
            
        } catch (\Exception $e) {
            Log::error('Error al subir la imagen: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Error al subir la imagen: ' . $e->getMessage()
            ], 500);
        }
    }
} 