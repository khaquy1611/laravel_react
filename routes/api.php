<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;


Route::group([
    'middleware' => 'jwt',
    'prefix' => 'v1/auth'
], function ($router) {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
});

Route::post('v1/auth/login', [AuthController::class, 'login']);
Route::post('v1/auth/refresh',  [AuthController::class, 'refresh']);