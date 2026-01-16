<?php

return [
    'title' => 'Gestió de Centre API',
    'version' => '1.0.0',
    'description' => 'API per a la gestió del centre educatiu',
    'host' => env('APP_URL', 'http://localhost'),
    'base_path' => '/api',

    'paths' => [
        'annotations' => [
            app_path('Http/Controllers'),
            app_path('Models'),
            app_path(),
        ],
        'docs' => storage_path('api-docs'),
        'json' => 'api-docs.json',
    ],

    'security' => [
        'bearerAuth' => [
            'type' => 'http',
            'scheme' => 'bearer',
            'bearerFormat' => 'JWT',
        ],
    ],

    'generate_on_request' => env('APP_DEBUG', true),
];