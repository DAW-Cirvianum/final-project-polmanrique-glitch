<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Population;

class populationController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/populations",
     *     summary="Obtener todas las poblaciones",
     *     tags={"Populations"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de poblaciones",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="Barcelona"),
     *                 @OA\Property(property="province", type="string", example="Barcelona"),
     *                 @OA\Property(property="country", type="string", example="España")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No se encontraron poblaciones",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No populations found")
     *         )
     *     )
     * )
     */
    public function getPopulations()
    {
        $populations = Population::all();

        if ($populations->isEmpty()) {
            return response()->json([
                'message' => 'No populations found'
            ], 404);
        }

        return response()->json($populations);
    }
}
