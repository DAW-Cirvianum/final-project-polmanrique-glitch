<?php

use App\Http\Controllers\courseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;
use App\Http\Controllers\moduleController;
use App\Http\Controllers\registrationController;
use App\Http\Controllers\populationController;
use App\Http\Controllers\porfileController;
use App\Http\Controllers\scopeController;
use App\Http\Controllers\teacherController;
use App\Http\Controllers\studentController;
use App\Http\Controllers\viewController;



Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});

Route::middleware(["auth:sanctum"])->group(function () {
    Route::get('/userLoggedModules/{user_id}', [porfileController::class, 'getUserLoggedModules']);
    Route::post('/course', [courseController::class, 'addCourse']);
    Route::post('/module', [moduleController::class, 'addModule'])->name('add.module');
    Route::post('/makeRegistration', [registrationController::class, 'makeRegistration']);

});


// Modules routes

Route::delete('/module/{id}', [moduleController::class, 'deleteModule']);
Route::get('/modules', [moduleController::class, 'getModules'])->name('get.modules');

// Population routes

Route::get('/populations', [populationController::class, 'getPopulations']);

// Teacher Routes

Route::middleware(["auth:sanctum"])->group(function () {
    Route::get("/marksById/{id}", [teacherController::class, "getMarkById"]);
    Route::get("/incidencesById/{id}", [teacherController::class, "getIncidenceById"]);
    Route::put("/marks/{id}", [teacherController::class, "editMark"]);
    Route::put("/incidences/{id}", [teacherController::class, "editIncidence"]);
    Route::delete("/marks/{id}", [teacherController::class, "deleteMark"]);
    Route::delete("/incidences/{id}", [teacherController::class, "deleteIncidence"]);
    Route::post('/marks', [teacherController::class, 'addMark']);

    Route::get('/tutor/students/{id}', [teacherController::class, 'getTeacherStudents']);

    Route::post('/tutor', [teacherController::class, 'addTutor']);

    Route::get('/teachers', [teacherController::class, 'getTeachers']);

    Route::get('/tutors/{course_id}', [teacherController::class, 'getTutors']);

    Route::post('/incidence', [teacherController::class, 'addIncidence']);

});


// user Routes

Route::middleware(["auth:sanctum"])->group(function () {
    Route::put('/updateAdminRol/{id}', [userController::class, 'updateAdminRol']);
    Route::put('/updatePassword/{id}', [userController::class, 'updatePasswordWithId']);
    Route::put('/updateMail/{id}', [userController::class, 'updateMail']);
    Route::put('/updateUsername/{id}', [userController::class, 'updateUsername']);

    Route::post('/userByEmail', [userController::class, 'getUserByEmail']);

    Route::delete('/user/{id}', [userController::class, 'deleteUser']);



    Route::post('/user', [userController::class, 'store'])->name('register.user');
    Route::get('/user', [userController::class, 'getUser']);
});

Route::get('/users', [userController::class, 'getUsers'])->name('get.users');


// Courses routes

Route::get('/courses', [courseController::class, 'getCourses']);

Route::get('/courseModules/{course_id}', [courseController::class, 'getCourseModules']);

Route::delete('/course/{id}', [courseController::class, 'deleteCourse']);

// Scope routes

Route::get('/filterByScope/{scope_id}', [moduleController::class, 'filterByScope']);

Route::get('/scopes', [scopeController::class, 'show']);

// Student routes

Route::middleware(["auth:sanctum"])->group(function () {
    Route::get('/incidences', [studentController::class, 'getIncidents']);
    Route::get('/incidentsByStudent/{student_id}', [studentController::class, 'getIncidentsByStudent']);
    Route::get('/marks', [studentController::class, 'getMarks']);
    Route::get('/marksByStudent/{student_id}', [studentController::class, 'getMarksByStudent']);
    Route::get("/student/{id}", [studentController::class, "getStudentById"]);
});

Route::get('/students', [studentController::class, 'getStudents']);

// Registration Routes

Route::middleware(["auth:sanctum"])->group(function () {
    Route::get("/courses/{id}", [studentController::class, "getCoursesWithRegistrations"]);

    Route::post('/registrationByCourse', [registrationController::class, 'registrationByCourse']);

    Route::get('/modulesByRegistration/{module_id}', [registrationController::class, 'getModulesByRegistration']);

    Route::get('/registrations', [registrationController::class, 'getRegistrations']);

    Route::delete("/registrations/student/{userId}/course/{courseId}", [registrationController::class, "deleteRegistration"]);
});


//views routes

Route::get('/assignTutor', [viewController::class, 'showAssignTutorForm']);

//Auth routes

Route::post('/login', [userController::class, 'log'])->name('login');
Route::post('/send-reset-password', [UserController::class, 'sendResetPassword']);


