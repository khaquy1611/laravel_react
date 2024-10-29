<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\User\UserController;
use App\Http\Controllers\Api\V1\User\UserCatalogueController;
use App\Http\Controllers\Api\V1\Post\PostCatalogueController;
use App\Http\Controllers\Api\V1\Post\PostController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\UploadController;
use App\Http\Controllers\Api\V1\TagController;
use App\Http\Controllers\Api\V1\RealEstate\RealEstateTypeController;



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
  /* -------------------------- END USER ROUTE ----------------------------------------*/
  /* Users Catalogues */
  Route::get('user_catalogues', [UserCatalogueController::class, 'index']);
  Route::get('user_catalogues/{id}', [UserCatalogueController::class, 'show']);
  Route::delete('user_catalogues/{id}', [UserCatalogueController::class, 'destroy']);
  Route::post('user_catalogues', [UserCatalogueController::class, 'create']);
  Route::put('user_catalogues/{id}', [UserCatalogueController::class, 'update']);
  Route::put('user_catalogues/{id}/status', [UserCatalogueController::class, 'updateStatusByField']);
  /* -------------------------- END USER CATALOGUE ROUTE ----------------------------------------*/
  /* POST CATALOGUE */
   Route::get('post_catalogues', [PostCatalogueController::class, 'index']);
   Route::get('post_catalogues/{id}', [PostCatalogueController::class, 'show']);
   Route::delete('post_catalogues/{id}', [PostCatalogueController::class, 'destroy']);
   Route::post('post_catalogues', [PostCatalogueController::class, 'create']);
   Route::put('post_catalogues/{id}', [PostCatalogueController::class, 'update']);
   Route::put('post_catalogues/{id}/status', [PostCatalogueController::class, 'updateStatusByField']);
  /* -------------------------- END POST CATALOGUE ROUTE ----------------------------------------*/
  /* POST  */
   Route::get('posts', [PostController::class, 'index']);
   Route::get('posts/{id}', [PostController::class, 'show']);
   Route::delete('posts/{id}', [PostController::class, 'destroy']);
   Route::post('posts', [PostController::class, 'create']);
   Route::put('posts/{id}', [PostController::class, 'update']);
  /* -------------------------- END POST ROUTE ----------------------------------------*/

   /* TAGS */
   Route::get('tags', [TagController::class, 'index']);
   Route::get('tags/{id}', [TagController::class, 'show']);
   Route::delete('tags/{id}', [TagController::class, 'destroy']);
   Route::post('tags', [TagController::class, 'create']);
   Route::put('tags/{id}', [TagController::class, 'update']);
   /* -------------------------- END TAGS ROUTE ----------------------------------------*/

   /* REAL ESTATE TYPE */
   Route::get('real_estate_types', [RealEstateTypeController::class, 'index']);
   Route::get('real_estate_types/{id}', [RealEstateTypeController::class, 'show']);
   Route::delete('real_estate_types/{id}', [RealEstateTypeController::class, 'destroy']);
   Route::post('real_estate_types', [RealEstateTypeController::class, 'create']);
   Route::put('real_estate_types/{id}', [RealEstateTypeController::class, 'update']);


   Route::put('real_estate_types/{id}/status', [RealEstateTypeController::class, 'updateStatusByField']);
    /* -------------------------- END REAL ESTATE TYPE ROUTE ----------------------------------------*/

  /* Dashboard */
  Route::delete('records/delete/batch', [DashboardController::class, 'deleteBatch']);
  Route::put('records/update/batch', [DashboardController::class, 'updateBatch']);

   /* UPLOAD */
  Route::post('upload/tempotary', [UploadController::class, 'uploadToTempotary']);
  Route::post('upload/ckeditor', [UploadController::class, 'uploadCkeditor']);
  Route::post('delete/ckeditor', [UploadController::class, 'deleteCkeditor']);
  /* -------------------------- END UPLOAD ----------------------------------------*/
  
  /* Location */
  Route::get('location', [DashboardController::class, 'location']);
});
Route::get('v1/auth/pass', [AuthController::class, 'abc']);
Route::post('v1/auth/login', [AuthController::class, 'login']);
Route::post('v1/auth/refresh',  [AuthController::class, 'refresh']);
Route::post('v1/auth/logout',  [AuthController::class, 'logout']);