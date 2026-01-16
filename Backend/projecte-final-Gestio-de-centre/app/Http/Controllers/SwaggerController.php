<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use OpenApi\Annotations as OA;

/**
 * @OA\OpenApi(
 *     @OA\Info(
 *         version="1.0.0",
 *         title="Gestió de Centre API",
 *         description="API para gestión de centro educativo",
 *         @OA\Contact(
 *             email="pol.manrique@cirvianum.cat"
 *         )
 *     ),
 *     @OA\Server(
 *         url="http://localhost",
 *         description="Servidor local"
 *     ),
 *     @OA\Server(
 *         url=L5_SWAGGER_CONST_HOST,
 *         description="Servidor API"
 *     )
 * )
 * 
 * @OA\Tag(
 *     name="API",
 *     description="Endpoints principales"
 * )
 * 
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
class SwaggerController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/status",
     *     operationId="getApiStatus",
     *     tags={"API"},
     *     summary="Estado del API",
     *     description="Verifica que el API está funcionando",
     *     @OA\Response(
     *         response=200,
     *         description="API funcionando",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="ok"),
     *             @OA\Property(property="message", type="string", example="API funcionando"),
     *             @OA\Property(property="timestamp", type="string", format="date-time")
     *         )
     *     )
     * )
     */
    public function status(): JsonResponse
    {
        return response()->json([
            'status' => 'ok',
            'message' => 'API funcionando',
            'timestamp' => now()->toDateTimeString()
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/ping",
     *     operationId="ping",
     *     tags={"API"},
     *     summary="Ping del servidor",
     *     description="Responde con pong para verificar conectividad",
     *     @OA\Response(
     *         response=200,
     *         description="Pong",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="pong"),
     *             @OA\Property(property="timestamp", type="string", format="date-time")
     *         )
     *     )
     * )
     */
    public function ping(): JsonResponse
    {
        return response()->json([
            'message' => 'pong',
            'timestamp' => now()->toDateTimeString()
        ]);
    }
}