<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Purchase;
use App\Models\Course;

class PurchaseController extends Controller
{
    
    public function index()
    {
        try {
            $purchases = Purchase::with('course')->orderBy('created_at', 'desc')->get();
            \Log::info('Purchases found: ' . $purchases->count());
            return response()->json(['success' => true, 'data' => $purchases]);
        } catch (\Exception $e) {
            \Log::error('Error fetching purchases: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'customer_name' => 'required|string',
            'customer_email' => 'required|email',
            'customer_phone' => 'required|string'
        ]);

        $course = Course::findOrFail($request->course_id);
        
        $purchase = Purchase::create([
            'course_id' => $request->course_id,
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'customer_phone' => $request->customer_phone,
            'amount' => $course->price
        ]);

        return response()->json($purchase, 201);
    }

    public function getCustomerPurchases($email)
    {
        $purchases = Purchase::where('customer_email', $email)
            ->with('course')
            ->get();
        
        return response()->json($purchases);
    }

    public function getAdminPurchases()
    {
        $purchases = Purchase::with('course')
            ->get()
            ->groupBy('course_id')
            ->map(function ($group) {
                return [
                    'course' => $group->first()->course,
                    'total_purchases' => $group->count(),
                    'total_amount' => $group->sum('amount')
                ];
            });
        
        return response()->json($purchases);
    }

    public function adminIndex()
    {
        // Obtener todas las compras agrupadas por curso
        $purchases = Purchase::with('course')
            ->selectRaw('course_id, COUNT(*) as total')
            ->groupBy('course_id')
            ->get();

        return response()->json($purchases);
    }

    public function adminShow($id)
    {
        // Obtener detalles de una compra específica
        $purchase = Purchase::with('course')->findOrFail($id);
        return response()->json($purchase);
    }
}