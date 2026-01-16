<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Registration;
use App\Models\Module;

class porfileController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/profile/{id}/modules",
     *     summary="Obtener los módulos de un usuario logueado",
     *     tags={"Profile"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del usuario logueado",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de módulos del usuario",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="name", type="string", example="Matemáticas"),
     *                 @OA\Property(property="code", type="string", example="MAT101"),
     *                 @OA\Property(property="hours", type="integer", example=40),
     *                 @OA\Property(property="teacher_id", type="integer", example=3),
     *                 @OA\Property(property="scope_id", type="integer", example=1),
     *                 @OA\Property(property="course_id", type="integer", example=2)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado o sin módulos",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No modules found for this user")
     *         )
     *     )
     * )
     */
    public function getUserLoggedModules($id)
    {
        $modules = Registration::join('modules', 'registrations.module_id', '=', 'modules.id')
            ->where('registrations.user_id', $id)
            ->select(
                'modules.name',
                'modules.code',
                'modules.hours',
                'modules.teacher_id',
                'modules.scope_id',
                'modules.course_id'
            )
            ->get();

        if ($modules->isEmpty()) {
            return response()->json([
                'message' => 'No modules found for this user'
            ], 404);
        }

        return response()->json($modules);
    }
}
