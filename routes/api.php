<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\DashboardController;


Route::group([
    'middleware' => 'jwt',
    'prefix' => 'v1/auth'
], function ($router) {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

  /* User */
  Route::get('users', [UserController::class, 'index']);
  Route::get('users/{id}', [UserController::class, 'show']);
  Route::delete('users/{id}', [UserController::class, 'destroy']);
  Route::post('users', [UserController::class, 'create']);
  Route::put('users/{id}', [UserController::class, 'update']);


  Route::put('users/{id}/reset-password', [UserController::class, 'resetPassword']);
  Route::put('users/{id}/status', [UserController::class, 'updateStatusByField']);
  Route::post('check-email', [UserController::class, 'updateStatusByField']);


  Route::put('users/{id}/status', [UserController::class, 'updateStatusByField'])->name('user.update');
  Route::delete('records/delete/batch', [DashboardController::class, 'deleteBatch'])->name('batch.delete');
  Route::put('records/update/batch', [DashboardController::class, 'updateBatch'])->name('batch.update');
   /* Location */
   Route::get('location', [DashboardController::class, 'location']);
});

Route::post('v1/auth/login', [AuthController::class, 'login']);
Route::post('v1/auth/refresh',  [AuthController::class, 'refresh']);
Route::post('v1/auth/logout',  [AuthController::class, 'logout']);