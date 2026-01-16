<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Registration;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Models\Course;

class registrationController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/registrations",
     *     summary="Crear una inscripción",
     *     tags={"Registrations"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"user_id","module_id","course_id"},
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="module_id", type="integer", example=2),
     *             @OA\Property(property="course_id", type="integer", example=3)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Inscripción creada exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Registration created"),
     *             @OA\Property(property="registration", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Usuario no permitido",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not allowed to register")
     *         )
     *     )
     * )
     */
    public function makeRegistration(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'user_id' => 'required',
            'module_id' => 'required',
            'course_id' => 'required',
        ]);

        $student = User::find($request->user_id);

        if ($student->rol == 'teacher') {
            return response()->json([
                'message' => 'You are not allowed to register'
            ], 401);
        }

        if ($validate->fails()) {
            return response()->json($validate->errors(), 400);
        }

        $registration = Registration::create([
            'user_id' => $request->user_id,
            'module_id' => $request->module_id,
            'course_id' => $request->course_id,
        ]);

        return response()->json([
            'message' => 'Registration created',
            'registration' => $registration
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/registrations",
     *     summary="Obtener todas las inscripciones",
     *     tags={"Registrations"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de inscripciones",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(type="object")
     *         )
     *     )
     * )
     */
    public function getRegistrations()
    {
        $registrations = Registration::all();
        return response()->json($registrations);
    }

    /**
     * @OA\Get(
     *     path="/api/registrations/module/{module_id}",
     *     summary="Obtener inscripciones por módulo",
     *     tags={"Registrations"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="module_id",
     *         in="path",
     *         required=true,
     *         description="ID del módulo",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de inscripciones para el módulo",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="user_id", type="integer"),
     *                 @OA\Property(property="module_id", type="integer"),
     *                 @OA\Property(property="course_id", type="integer"),
     *                 @OA\Property(property="student_name", type="string")
     *             )
     *         )
     *     )
     * )
     */
    public function getModulesByRegistration($module_id)
    {
        $registrations = Registration::join('users', 'registrations.user_id', '=', 'users.id')
            ->where('registrations.module_id', $module_id)
            ->select(
                'registrations.*',
                'users.name as student_name'
            )
            ->get();
        return response()->json($registrations);
    }

    /**
     * @OA\Post(
     *     path="/api/registrations/course",
     *     summary="Inscribir un estudiante a un curso completo (todos los módulos)",
     *     tags={"Registrations"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"user_id","course_id"},
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="course_id", type="integer", example=2)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Estudiante inscrito al curso con todos los módulos",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Usuari matriculat al curs amb tots els seus mòduls")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function registrationByCourse(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
        ]);

        $courseId = $request->course_id;
        $userId = $request->user_id;
        DB::transaction(function () use ($courseId, $userId) {

            $course = Course::with('modules')->findOrFail($courseId);

            foreach ($course->modules as $module) {
                Registration::firstOrCreate([
                    'user_id' => $userId,
                    'module_id' => $module->id,
                    'course_id' => $course->id,
                ]);
            }
        });

        return response()->json([
            'message' => 'Usuari matriculat al curs amb tots els seus mòduls'
        ], 201);
    }

    /**
     * @OA\Delete(
     *     path="/api/registrations/{userId}/{courseId}",
     *     summary="Eliminar una inscripción",
     *     tags={"Registrations"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="userId",
     *         in="path",
     *         required=true,
     *         description="ID del usuario",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         description="ID del curso",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Inscripción eliminada exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Registration deleted successfully"),
     *             @OA\Property(property="deleted", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Inscripción no encontrada"
     *     )
     * )
     */
    public function deleteRegistration($userId, $courseId)
    {
        $deleted = Registration::where('user_id', $userId)
            ->where('course_id', $courseId)
            ->delete();

        return response()->json([
            'message' => 'Registration deleted',
            'deleted' => $deleted
        ], 200);
    }
}
