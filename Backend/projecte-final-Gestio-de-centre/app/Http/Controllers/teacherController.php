<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator as ValidatorFacade;
use Illuminate\Support\Facades\Auth;
use App\Models\Tutor;
use Illuminate\Support\Facades\DB;
use App\Models\Mark;
use App\Models\Incidence;

class teacherController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/professors",
     *     summary="Obtenir tots els professors",
     *     tags={"Professors"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Llista de professors",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="Anna"),
     *                 @OA\Property(property="email", type="string", example="anna@example.com"),
     *                 @OA\Property(property="rol", type="string", example="teacher")
     *             )
     *         )
     *     )
     * )
     */
    public function getTeachers()
    {
        $teacher = User::where('rol', 'teacher')->get();
        return response()->json($teacher);
    }

    /**
     * @OA\Post(
     *     path="/api/tutors",
     *     summary="Afegir un tutor a un curs",
     *     tags={"Tutors"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"user_id", "course_id"},
     *             @OA\Property(property="user_id", type="integer", example=1, description="ID del professor"),
     *             @OA\Property(property="course_id", type="integer", example=1, description="ID del curs")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Tutor afegit correctament",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Tutor added succesfuly"),
     *             @OA\Property(property="Tutor", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validació",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function addTutor(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'course_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $tutor = Tutor::create($validator->validated());

        return response()->json([
            'message' => "Tutor added succesfuly",
            'Tutor' => $tutor
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/tutors/curs/{course_id}",
     *     summary="Obtenir tutors d'un curs",
     *     tags={"Tutors"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="course_id",
     *         in="path",
     *         required=true,
     *         description="ID del curs",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Llista de tutors del curs",
     *         @OA\JsonContent(type="array")
     *     )
     * )
     */
    public function getTutors($course_id)
    {
        // Obtener todos los tutores del curso
        $tutors = Tutor::where('course_id', $course_id)->get();

        // Verificar si hay tutores
        if ($tutors->isEmpty()) {
            return response()->json(['message' => 'No tutors found for this course'], 404);
        }

        // Obtener los IDs de usuario de los tutores
        $userIds = $tutors->pluck('user_id');

        // Obtener los usuarios correspondientes
        $users = User::whereIn('id', $userIds)->get();

        return response()->json($users);
    }

    /**
     * @OA\Get(
     *     path="/api/professors/{id}/alumnes",
     *     summary="Obtenir alumnes d'un professor tutor",
     *     tags={"Professors"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del professor",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Llista d'alumnes del professor",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="Maria"),
     *                 @OA\Property(property="course_name", type="string", example="1r DAM")
     *             )
     *         )
     *     )
     * )
     */
    public function getTeacherStudents($id)
    {
        $students = User::select('users.*', 'courses.name as course_name')
            ->distinct()
            ->join('registrations', 'users.id', '=', 'registrations.user_id')
            ->join('courses', 'courses.id', '=', 'registrations.course_id')
            ->join('tutors', 'tutors.course_id', '=', 'registrations.course_id')
            ->where('tutors.user_id', $id)
            ->get();

        return response()->json($students);
    }

    /**
     * @OA\Post(
     *     path="/api/notes",
     *     summary="Afegir una nota",
     *     tags={"Notes"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"student_id", "module_id", "mark"},
     *             @OA\Property(property="student_id", type="integer", example=1, description="ID de l'alumne"),
     *             @OA\Property(property="module_id", type="integer", example=1, description="ID del mòdul"),
     *             @OA\Property(property="mark", type="number", format="float", example=7.5, description="Nota (0-10)")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nota afegida correctament",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Mark added succesfuly"),
     *             @OA\Property(property="Mark", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validació",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function addMark(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required',
            'module_id' => 'required',
            'mark' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $mark = Mark::create($validator->validated());

        return response()->json([
            'message' => "Mark added succesfuly",
            'Mark' => $mark
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/incidencies",
     *     summary="Afegir una incidència",
     *     tags={"Incidències"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"student_id", "description", "grade"},
     *             @OA\Property(property="student_id", type="integer", example=1, description="ID de l'alumne"),
     *             @OA\Property(property="description", type="string", example="Retard injustificat"),
     *             @OA\Property(property="grade", type="string", enum={"low", "medium", "high"}, example="medium")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Incidència afegida correctament",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Incidence added succesfuly"),
     *             @OA\Property(property="Incidence", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validació",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function addIncidence(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required',
            'description' => 'required',
            'grade' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $incidence = Incidence::create($validator->validated());

        return response()->json([
            'message' => "Incidence added succesfuly",
            'Incidence' => $incidence
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/incidencies/{id}",
     *     summary="Obtenir una incidència per ID",
     *     tags={"Incidències"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la incidència",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Incidència trobada",
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Incidència no trobada"
     *     )
     * )
     */
    public function getIncidenceById($id)
    {
        $incidence = Incidence::find($id);
        return response()->json($incidence);
    }

    /**
     * @OA\Get(
     *     path="/api/notes/{id}",
     *     summary="Obtenir una nota per ID",
     *     tags={"Notes"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la nota",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nota trobada",
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nota no trobada"
     *     )
     * )
     */
    public function getMarkById($id)
    {
        $mark = Mark::find($id);
        return response()->json($mark);
    }

    /**
     * @OA\Put(
     *     path="/api/notes/{id}",
     *     summary="Editar una nota",
     *     tags={"Notes"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la nota a editar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="student_id", type="integer", example=1),
     *             @OA\Property(property="module_id", type="integer", example=1),
     *             @OA\Property(property="mark", type="number", format="float", example=8.5)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nota actualitzada correctament",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Mark updated successfully"),
     *             @OA\Property(property="Mark", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nota no trobada",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Mark not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validació"
     *     )
     * )
     */
    public function editMark(Request $request, $id)
    {
        $mark = Mark::find($id);

        if (!$mark) {
            return response()->json([
                'message' => 'Mark not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'student_id' => 'sometimes|required',
            'module_id' => 'sometimes|required',
            'mark' => 'sometimes|required|numeric|min:0|max:10',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $mark->update($validator->validated());

        return response()->json([
            'message' => "Mark updated successfully",
            'Mark' => $mark
        ]);
    }

    /**
     * @OA\Put(
     *     path="/api/incidencies/{id}",
     *     summary="Editar una incidència",
     *     tags={"Incidències"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la incidència a editar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="student_id", type="integer", example=1),
     *             @OA\Property(property="description", type="string", example="Retard justificat"),
     *             @OA\Property(property="grade", type="string", enum={"low", "medium", "high"}, example="low")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Incidència actualitzada correctament",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Incidence updated successfully"),
     *             @OA\Property(property="Incidence", type="object")
     *         )
     *     ),
     *     @OfA\Response(
     *         response=404,
     *         description="Incidència no trobada"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validació"
     *     )
     * )
     */
    public function editIncidence(Request $request, $id)
    {
        $incidence = Incidence::find($id);

        if (!$incidence) {
            return response()->json([
                'message' => 'Incidence not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'student_id' => 'sometimes|required',
            'module_id' => 'sometimes|required',
            'grade' => 'sometimes|required|in:low,medium,high',
            'description' => 'sometimes|nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $incidence->update($validator->validated());

        return response()->json([
            'message' => "Incidence updated successfully",
            'Incidence' => $incidence
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/api/notes/{id}",
     *     summary="Eliminar una nota",
     *     tags={"Notes"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la nota a eliminar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nota eliminada correctament",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Mark deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nota no trobada"
     *     )
     * )
     */
    public function deleteMark($id)
    {
        $mark = Mark::find($id);

        if (!$mark) {
            return response()->json([
                'message' => 'Mark not found'
            ], 404);
        }

        $mark->delete();

        return response()->json([
            'message' => "Mark deleted successfully"
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/api/incidencies/{id}",
     *     summary="Eliminar una incidència",
     *     tags={"Incidències"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la incidència a eliminar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Incidència eliminada correctament",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Incidence deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Incidència no trobada"
     *     )
     * )
     */
    public function deleteIncidence($id)
    {
        $incidence = Incidence::find($id);

        if (!$incidence) {
            return response()->json([
                'message' => 'Incidence not found'
            ], 404);
        }

        $incidence->delete();

        return response()->json([
            'message' => "Incidence deleted successfully"
        ]);
    }
}