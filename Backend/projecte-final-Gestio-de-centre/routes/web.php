<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ViewController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\userController;

Route::get("/", [ViewController::class, "index"])->name("index");

Route::get('/passwordRecovery', [ViewController::class, 'passwordRecovery'])->name('passwordRecovery');
Route::get('/forgot-password', [ViewController::class, 'showAssignTutorForm'])->name('password.request');
Route::post('/send-reset-password', [AuthController::class, 'sendResetPassword'])->name('password.send');

Route::get('/reset-password/{user_id}', [userController::class, 'showResetForm'])->name('password.form');
Route::post('/reset-password', [userController::class, 'updatePassword'])->name('password.update');

Route::get('/asignar-admin', [ViewController::class, 'showAssignAdminRolForm'])
    ->name('assign.admin.form');

Route::post('/asignar-admin', [ViewController::class, 'assignAdminRole'])
    ->name('assign.admin');