<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator as ValidatorFacade;
use Illuminate\Support\Facades\Auth;
use App\Models\Tutor;

class userController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/users",
     *     summary="Crear un nuevo usuario",
     *     tags={"Users"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "surname", "email", "password", "rol"},
     *             @OA\Property(property="name", type="string", example="Juan"),
     *             @OA\Property(property="surname", type="string", example="Pérez"),
     *             @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123"),
     *             @OA\Property(property="rol", type="string", example="admin"),
     *             @OA\Property(property="population_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Usuario creado exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="User created"),
     *             @OA\Property(property="user", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = ValidatorFacade::make($request->all(), [
            'name' => 'string',
            'surname' => 'string',
            'email' => 'string',
            'rol' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rol' => $request->rol,
            'population_id' => $request->population_id,
        ]);

        return (response()->json([
            'message' => 'User created',
            'user' => $user
        ], 200));
    }

    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Iniciar sesión",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login exitoso",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="User logged in"),
     *             @OA\Property(property="user", type="object", 
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="Juan"),
     *                 @OA\Property(property="email", type="string", example="juan@example.com"),
     *                 @OA\Property(property="rol", type="string", example="admin")
     *             ),
     *             @OA\Property(property="token", type="string", example="1|abcdefghijklmnopqrstuvwxyz")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Credenciales inválidas",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Invalid credentials")
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
    public function log(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User logged in',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'rol' => $user->rol
            ],
            'token' => $token
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/users",
     *     summary="Obtener todos los usuarios",
     *     tags={"Users"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de usuarios",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(type="object")
     *         )
     *     )
     * )
     */
    public function getUsers()
    {
        $users = User::all();
        return (response()->json($users, 200));
    }

    /**
     * @OA\Get(
     *     path="/api/reset-password/{user_id}",
     *     summary="Mostrar formulario de reseteo de contraseña",
     *     tags={"Password"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         required=true,
     *         description="ID del usuario",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Formulario HTML"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado"
     *     )
     * )
     */
    public function showResetForm($user_id)
    {
        $user = User::findOrFail($user_id);
        return view('passwordResetForm', compact('user'));
    }

    /**
     * @OA\Put(
     *     path="/api/users/password",
     *     summary="Actualizar contraseña de usuario",
     *     tags={"Password"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"user_id", "password"},
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="password", type="string", format="password", example="nuevaPassword123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Contraseña actualizada exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Password updated successfully")
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
    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::find($request->user_id);
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'message' => 'Password updated successfully'
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/users/by-email",
     *     summary="Obtener usuario por email",
     *     tags={"Users"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="email",
     *         in="query",
     *         required=true,
     *         description="Email del usuario",
     *         @OA\Schema(type="string", format="email")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Usuario encontrado",
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado"
     *     )
     * )
     */
    public function getUserByEmail(Request $request)
    {
        $validator = ValidatorFacade::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();
        return (response()->json($user, 200));
    }

    /**
     * @OA\Delete(
     *     path="/api/users/{id}",
     *     summary="Eliminar usuario",
     *     tags={"Users"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del usuario a eliminar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Usuario eliminado exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="User deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado"
     *     )
     * )
     */
    public function deleteUser($id)
    {
        $user = User::find($id);
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ], 200);
    }

    /**
     * @OA\Put(
     *     path="/api/users/{id}/role",
     *     summary="Actualizar rol a admin",
     *     tags={"Users"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del usuario",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Rol actualizado exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="User updated successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado"
     *     )
     * )
     */
    public function updateAdminRol($id)
    {
        $user = User::find($id);
        $user->rol = 'admin';
        $user->save();

        return response()->json([
            'message' => 'User updated successfully'
        ], 200);
    }

    public function updateMail($id, Request $request)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email,' . $user->id
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user->email = $request->email;
        $user->save();

        return response()->json([
            'message' => 'Email updated successfully'
        ], 200);
    }

    /**
     * @OA\Put(
     *     path="/api/users/{id}/username",
     *     summary="Actualizar nombre de usuario",
     *     tags={"Users"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del usuario",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Juan")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nombre de usuario actualizado exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Username updated successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado"
     *     )
     * )
     */
    public function updateUsername($id, Request $request)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user->name = $request->name;
        $user->save();

        return response()->json([
            'message' => 'Username updated successfully'
        ], 200);
    }

    /**
     * @OA\Put(
     *     path="/api/users/{id}/password",
     *     summary="Actualizar contraseña de usuario por ID",
     *     tags={"Password"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del usuario",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"password"},
     *             @OA\Property(property="password", type="string", format="password", example="nuevaPassword123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Contraseña actualizada exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Password updated successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado"
     *     )
     * )
     */
    public function updatePasswordWithId($id, Request $request)
    {
        $user = User::find($id);
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'message' => 'Password updated successfully'
        ], 200);
    }

}