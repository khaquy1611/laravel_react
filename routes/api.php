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
  Route::get('users', [UserController::class, 'index'])->name('user.index');
  Route::put('users/{id}/status', [UserController::class, 'updateStatusByField'])->name('user.update');
  Route::delete('records/delete/batch', [DashboardController::class, 'deleteBatch'])->name('batch.delete');
  Route::put('records/update/batch', [DashboardController::class, 'updateBatch'])->name('batch.update');
});

Route::post('v1/auth/login', [AuthController::class, 'login']);
Route::post('v1/auth/refresh',  [AuthController::class, 'refresh']);