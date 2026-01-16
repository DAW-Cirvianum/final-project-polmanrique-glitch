<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Mark;
use App\Models\Course;
use App\Models\Incidence;
use Illuminate\Support\Facades\DB;

class studentController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/students",
     *     summary="Obtener todos los estudiantes",
     *     tags={"Students"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de estudiantes",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(type="object")
     *         )
     *     )
     * )
     */
    public function getStudents()
    {
        $students = User::where('rol', 'student')->get();
        return response()->json($students);
    }

    /**
     * @OA\Get(
     *     path="/api/students/{id}",
     *     summary="Obtener estudiante por ID",
     *     tags={"Students"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del estudiante",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Estudiante encontrado",
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Estudiante no encontrado"
     *     )
     * )
     */
    public function getStudentById($id)
    {
        $student = User::find($id);
        return response()->json($student);
    }

    /**
     * @OA\Get(
     *     path="/api/students/{student_id}/marks",
     *     summary="Obtener notas de un estudiante",
     *     tags={"Marks"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="student_id",
     *         in="path",
     *         required=true,
     *         description="ID del estudiante",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de notas del estudiante",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(type="object")
     *         )
     *     )
     * )
     */
    public function getMarksByStudent($student_id)
    {
        $marks = Mark::where('student_id', $student_id)->get();
        return response()->json($marks);
    }

    /**
     * @OA\Get(
     *     path="/api/marks",
     *     summary="Obtener todas las notas con el nombre del módulo",
     *     tags={"Marks"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de todas las notas con módulo",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="mark", type="number", example=8.5),
     *                 @OA\Property(property="module_id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="Matemáticas")
     *             )
     *         )
     *     )
     * )
     */
    public function getMarks()
    {
        $marks = Mark::join('modules as mo', 'mo.id', '=', 'marks.module_id')
            ->select('marks.mark', 'marks.module_id', 'mo.name')
            ->get();

        return response()->json($marks);
    }

    /**
     * @OA\Get(
     *     path="/api/students/{student_id}/incidents",
     *     summary="Obtener incidencias de un estudiante",
     *     tags={"Incidents"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="student_id",
     *         in="path",
     *         required=true,
     *         description="ID del estudiante",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de incidencias del estudiante",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(type="object")
     *         )
     *     )
     * )
     */
    public function getIncidentsByStudent($student_id)
    {
        $incidents = Incidence::where('student_id', $student_id)->get();
        return response()->json($incidents);
    }

    /**
     * @OA\Get(
     *     path="/api/incidents",
     *     summary="Obtener todas las incidencias",
     *     tags={"Incidents"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de todas las incidencias",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(type="object")
     *         )
     *     )
     * )
     */
    public function getIncidents()
    {
        $incidents = Incidence::all();
        return response()->json($incidents);
    }

    /**
     * @OA\Get(
     *     path="/api/students/{id}/courses",
     *     summary="Obtener cursos en los que está registrado un estudiante",
     *     tags={"Courses"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del estudiante",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de cursos con registros del estudiante",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(type="object")
     *         )
     *     )
     * )
     */
    public function getCoursesWithRegistrations($id)
    {
        $results = DB::table('courses as c')
            ->join('registrations as r', 'c.id', '=', 'r.course_id')
            ->where('r.user_id', $id)
            ->select('c.*', 'r.user_id')
            ->distinct()
            ->get();

        return response()->json($results);
    }
}
