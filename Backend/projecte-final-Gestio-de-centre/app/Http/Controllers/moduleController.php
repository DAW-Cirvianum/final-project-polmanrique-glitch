<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;



/**
 * @OA\Info(title="API de Mòduls", version="1.0.0")
 * @OA\Tag(
 *     name="Mòduls",
 *     description="Operacions relacionades amb mòduls acadèmics"
 * )
 */
class moduleController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/modules",
     *     tags={"Mòduls"},
     *     summary="Afegeix un nou mòdul",
     *     description="Crea un nou mòdul acadèmic al sistema",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","code","hours","teacher_id","scope_id","course_id"},
     *             @OA\Property(property="name", type="string", example="Programació Web"),
     *             @OA\Property(property="code", type="string", example="MPW001"),
     *             @OA\Property(property="hours", type="integer", example=150),
     *             @OA\Property(property="teacher_id", type="integer", example=5),
     *             @OA\Property(property="scope_id", type="integer", example=2),
     *             @OA\Property(property="course_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Mòdul creat correctament",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Module created"),
     *             @OA\Property(property="module", ref="#/components/schemas/Module")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error de validació"
     *     )
     * )
     */
    public function addModule(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'code' => 'required|string',
            'hours' => 'required|integer',
            'teacher_id' => 'required|integer',
            'scope_id' => 'required|integer',
            'course_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $module = Module::create([
            'name' => $request->name,
            'code' => $request->code,
            'hours' => $request->hours,
            'teacher_id' => $request->teacher_id,
            'scope_id' => $request->scope_id,
            'course_id' => $request->course_id,
        ]);

        return response()->json([
            'message' => 'Module created',
            'module' => $module
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/modules",
     *     tags={"Mòduls"},
     *     summary="Obteix tots els mòduls",
     *     description="Retorna una llista de tots els mòduls acadèmics",
     *     @OA\Response(
     *         response=200,
     *         description="Llista de mòduls retornada correctament",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Module")
     *         )
     *     )
     * )
     */
    public function getModules()
    {
        $modules = Module::all();
        return response()->json($modules, 200);
    }

    /**
     * @OA\Get(
     *     path="/api/modules/{scope_id}",
     *     tags={"Mòduls"},
     *     summary="Obteix tots els mòduls d'un scope",
     *     description="Retorna una llista de tots els mòduls acadèmics d'un scope",
     *     @OA\Parameter(
     *         name="scope_id",
     *         in="path",
     *         required=true,
     *         description="ID del scope",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Llista de mòduls retornada correctament",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Module")
     *         )
     *     )
     * )
     */
    public function filterByScope($scope_id)
    {
        $modules = Module::where('scope_id', $scope_id)->get();
        return response()->json($modules, 200);
    }


    /**
     * @OA\Delete(
     *     path="/api/modules/{id}",
     *     tags={"Mòduls"},
     *     summary="Elimina un mòdul",
     *     description="Elimina un mòdul acadèmic pel seu ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del mòdul a eliminar",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Mòdul eliminat correctament",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Module deleted")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Mòdul no trobat"
     *     )
     * )
     */
    public function deleteModule($id)
    {
        $module = Module::find($id);
        $module->delete();
        return response()->json([
            'message' => 'Module deleted',
        ], 200);
    }


}

/**
 * @OA\Schema(
 *     schema="Module",
 *     type="object",
 *     title="Mòdul",
 *     description="Model de mòdul acadèmic",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Programació Web"),
 *     @OA\Property(property="code", type="string", example="MPW001"),
 *     @OA\Property(property="hours", type="integer", example=150),
 *     @OA\Property(property="teacher_id", type="integer", example=5),
 *     @OA\Property(property="scope_id", type="integer", example=2),
 *     @OA\Property(property="course_id", type="integer", example=1),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */