<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Module;
use Illuminate\Support\Facades\Auth;
use App\Models\Tutor;

class courseController extends Controller
{
    /**
     * @OA\Get(
     *     path="/courses",
     *     summary="Obtenir tots els cursos",
     *     description="Retorna una llista de tots els cursos disponibles al sistema",
     *     tags={"Courses"},
     *     @OA\Response(
     *         response=200,
     *         description="Llista de cursos obtinguda amb èxit",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="Matemàtiques"),
     *                 @OA\Property(property="year", type="integer", example=2024),
     *                 @OA\Property(property="created_at", type="string", format="date-time"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time")
     *             ),
     *             example={
     *                 {
     *                     "id": 1,
     *                     "name": "Matemàtiques",
     *                     "year": 2024,
     *                     "created_at": "2024-01-15T10:30:00Z",
     *                     "updated_at": "2024-01-15T10:30:00Z"
     *                 },
     *                 {
     *                     "id": 2,
     *                     "name": "Història",
     *                     "year": 2024,
     *                     "created_at": "2024-01-15T11:00:00Z",
     *                     "updated_at": "2024-01-15T11:00:00Z"
     *                 }
     *             }
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autoritzat",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Unauthenticated")
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function getCourses()
    {
        $courses = Course::all();
        return response()->json($courses);
    }

    /**
     * @OA\Delete(
     *     path="/courses/{id}",
     *     summary="Eliminar un curs",
     *     description="Elimina un curs del sistema mitjançant el seu ID",
     *     tags={"Courses"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del curs a eliminar",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Curs eliminat amb èxit",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Course deleted")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Curs no trobat",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Course not found"),
     *             @OA\Property(property="error", type="string", example="Not Found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autoritzat",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Unauthenticated")
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function deleteCourse($id)
    {
        $course = Course::find($id);
        $course->delete();
        return response()->json([
            'message' => 'Course deleted',
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/courses",
     *     summary="Afegir un nou curs",
     *     description="Crea un nou curs al sistema",
     *     tags={"Courses"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Dades del nou curs",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"name", "year"},
     *                 @OA\Property(
     *                     property="name",
     *                     type="string",
     *                     description="Nom del curs",
     *                     example="Matemàtiques Avançades"
     *                 ),
     *                 @OA\Property(
     *                     property="year",
     *                     type="integer",
     *                     description="Any acadèmic del curs",
     *                     example=2024
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Curs afegit amb èxit",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Course added succesfuly"),
     *             @OA\Property(
     *                 property="Course",
     *                 type="object",
     *                 description="Dades del curs creat",
     *                 @OA\Property(property="name", type="string", example="Matemàtiques Avançades"),
     *                 @OA\Property(property="year", type="integer", example=2024)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validació",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 description="Errors de validació per camp",
     *                 additionalProperties={
     *                     @OA\Property(type="array", @OA\Items(type="string"))
     *                 },
     *                 example={
     *                     "name": {"El camp name és obligatori"},
     *                     "year": {"El camp year és obligatori"}
     *                 }
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autoritzat",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Unauthenticated")
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function addCourse(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'year' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        Course::create($validator->validated());

        return response()->json([
            'message' => "Course added succesfuly",
            'Course' => $request
        ]);
    }

    /**
     * @OA\Get(
     *     path="/courses/{course_id}/modules",
     *     summary="Obtenir mòduls d'un curs",
     *     description="Retorna tots els mòduls associats a un curs específic",
     *     tags={"Courses"},
     *     @OA\Parameter(
     *         name="course_id",
     *         in="path",
     *         required=true,
     *         description="ID del curs del qual obtenir els mòduls",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Llista de mòduls obtinguda amb èxit",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="Àlgebra"),
     *                 @OA\Property(property="course_id", type="integer", example=1),
     *                 @OA\Property(property="created_at", type="string", format="date-time"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time")
     *             ),
     *             example={
     *                 {
     *                     "id": 1,
     *                     "name": "Àlgebra",
     *                     "course_id": 1,
     *                     "created_at": "2024-01-15T10:30:00Z",
     *                     "updated_at": "2024-01-15T10:30:00Z"
     *                 },
     *                 {
     *                     "id": 2,
     *                     "name": "Geometria",
     *                     "course_id": 1,
     *                     "created_at": "2024-01-15T11:00:00Z",
     *                     "updated_at": "2024-01-15T11:00:00Z"
     *                 }
     *             }
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Curs no trobat",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Course not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autoritzat",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Unauthenticated")
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function getCourseModules($course_id)
    {
        $modules = Module::where('course_id', $course_id)->get();
        return response()->json($modules);
    }
}