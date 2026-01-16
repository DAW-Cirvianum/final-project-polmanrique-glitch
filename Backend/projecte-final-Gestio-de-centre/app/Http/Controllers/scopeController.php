<?php

namespace App\Http\Controllers;

use App\Models\Scope;
use Illuminate\Http\Request;

class scopeController extends Controller
{
    /**
     * @OA\Post(
     *     path="/scopes",
     *     summary="Crear un nou scope",
     *     description="Crea un nou àmbit (scope) al sistema",
     *     tags={"Scopes"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"name"},
     *                 @OA\Property(
     *                     property="name",
     *                     type="string",
     *                     description="Nom del scope",
     *                     example="lectura-usuaris"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Scope creat amb èxit",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Scope created"),
     *             @OA\Property(
     *                 property="scope",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="lectura-usuaris"),
     *                 @OA\Property(property="created_at", type="string", format="date-time"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error de validació",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 additionalProperties={
     *                     @OA\Property(type="array", @OA\Items(type="string"))
     *                 },
     *                 example={"name": {"El camp name és obligatori"}}
     *             )
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $scope = Scope::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Scope created',
            'scope' => $scope
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/scopes",
     *     summary="Llistar tots els scopes",
     *     description="Retorna una llista de tots els àmbits (scopes) disponibles",
     *     tags={"Scopes"},
     *     @OA\Response(
     *         response=200,
     *         description="Llista de scopes obtinguda amb èxit",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="lectura-usuaris"),
     *                 @OA\Property(property="created_at", type="string", format="date-time"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time")
     *             ),
     *             example={
     *                 {
     *                     "id": 1,
     *                     "name": "lectura-usuaris",
     *                     "created_at": "2024-01-15T10:30:00Z",
     *                     "updated_at": "2024-01-15T10:30:00Z"
     *                 },
     *                 {
     *                     "id": 2,
     *                     "name": "escriptura-usuaris",
     *                     "created_at": "2024-01-15T11:00:00Z",
     *                     "updated_at": "2024-01-15T11:00:00Z"
     *                 }
     *             }
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function show()
    {
        $scopes = Scope::all();
        return response()->json($scopes, 200);
    }

    /**
     * @OA\Put(
     *     path="/scopes/{id}",
     *     summary="Actualitzar un scope existent",
     *     description="Actualitza les dades d'un àmbit (scope) existent",
     *     tags={"Scopes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del scope",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"name"},
     *                 @OA\Property(
     *                     property="name",
     *                     type="string",
     *                     description="Nou nom del scope",
     *                     example="lectura-perfils"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Scope actualitzat amb èxit",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Scope updated"),
     *             @OA\Property(
     *                 property="scope",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="lectura-perfils"),
     *                 @OA\Property(property="created_at", type="string", format="date-time"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error de validació",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 additionalProperties={
     *                     @OA\Property(type="array", @OA\Items(type="string"))
     *                 },
     *                 example={"name": {"El camp name és obligatori"}}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Scope no trobat",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Scope no trobat"),
     *             @OA\Property(property="error", type="string", example="Not Found")
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function update(Request $request, Scope $scope)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $scope->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Scope updated',
            'scope' => $scope
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/scopes/{id}",
     *     summary="Eliminar un scope",
     *     description="Elimina un àmbit (scope) del sistema",
     *     tags={"Scopes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del scope",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Scope eliminat amb èxit",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Scope deleted"),
     *             @OA\Property(
     *                 property="scope",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="lectura-usuaris"),
     *                 @OA\Property(property="created_at", type="string", format="date-time"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Scope no trobat",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Scope no trobat"),
     *             @OA\Property(property="error", type="string", example="Not Found")
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function destroy(Scope $scope)
    {
        $scope->delete();
        return response()->json([
            'message' => 'Scope deleted',
            'scope' => $scope
        ], 200);
    }
}