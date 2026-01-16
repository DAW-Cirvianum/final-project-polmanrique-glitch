<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="API Gestió de Centre",
 *     description="Documentación de la API del proyecto"
 * )
 *
 * @OA\Server(
 *     url=L5_SWAGGER_CONST_HOST,
 *     description="Servidor local"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
class SwaggerBase
{
    // Clase base vacía, solo sirve para anotaciones generales
}
