<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\UserCatalogueController;


Route::group([
    'middleware' => 'jwt',
    'prefix' => 'v1/auth'
], function ($router) {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

  /* User */
  /* User */
  Route::get('users', [UserController::class, 'index']);
  Route::get('users/{id}', [UserController::class, 'show']);
  Route::delete('users/{id}', [UserController::class, 'destroy']);
  Route::post('users', [UserController::class, 'create']);
  Route::put('users/{id}', [UserController::class, 'update']);


  Route::put('users/{id}/reset-password', [UserController::class, 'resetPassword']);
  Route::put('users/{id}/status', [UserController::class, 'updateStatusByField']);
  Route::post('check-email', [UserController::class, 'updateStatusByField']);

  /* Users Catalogues */
  Route::get('user_catalogues', [UserCatalogueController::class, 'index']);
  Route::get('user_catalogues/{id}', [UserCatalogueController::class, 'show']);
  Route::delete('user_catalogues/{id}', [UserCatalogueController::class, 'destroy']);
  Route::post('user_catalogues', [UserCatalogueController::class, 'create']);
  Route::put('user_catalogues/{id}', [UserCatalogueController::class, 'update']);
  Route::put('user_catalogues/{id}/status', [UserCatalogueController::class, 'updateStatusByField']);
  
  /* Dashboard */
  Route::delete('records/delete/batch', [DashboardController::class, 'deleteBatch']);
  Route::put('records/update/batch', [DashboardController::class, 'updateBatch']);

  
  /* Location */
  Route::get('location', [DashboardController::class, 'location']);
});
Route::get('v1/auth/pass', [AuthController::class, 'abc']);
Route::post('v1/auth/login', [AuthController::class, 'login']);
Route::post('v1/auth/refresh',  [AuthController::class, 'refresh']);
Route::post('v1/auth/logout',  [AuthController::class, 'logout']);