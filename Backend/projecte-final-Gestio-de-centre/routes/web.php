<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ViewController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;


Route::get('/login', [AuthController::class, 'showLogin'])->name('login.form');
Route::post('/login', [AuthController::class, 'loginWeb'])->name('login.web');

Route::get("/", [ViewController::class, "index"])->name("index");

Route::get('/passwordRecovery', [ViewController::class, 'passwordRecovery'])->name('passwordRecovery');
Route::post('/send-reset-password', [AuthController::class, 'sendResetPassword'])->name('password.send');


Route::middleware(['auth'])->group(function () {

    Route::get('/asignar-admin', [ViewController::class, 'showAssignAdminRolForm'])
        ->name('assign.admin.form');

    Route::post('/asignar-admin', [ViewController::class, 'assignAdminRole'])
        ->name('assign.admin');

});