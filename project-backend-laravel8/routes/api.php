<?php

use App\Http\Controllers\BCommentController;
use App\Http\Controllers\BLikeController;
use App\Http\Controllers\BPostController;
use App\Http\Controllers\BUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('b_users', BUserController::class);

Route::apiResource('b_posts', BPostController::class);
Route::apiResource('b_comments', BCommentController::class);
Route::apiResource('b_like', BLikeController::class);

// login controller
Route::post('/login', [BUserController::class, 'login']);
//for profile pic upload
Route::post('/profilePic', [BPostController::class, 'ProfilePic']);
Route::post('/coverPic', [BPostController::class, 'CoverPic']);

//update post
Route::post('/postUpdate', [BPostController::class, 'UpdatePost']);
//delete post
Route::delete('/postUpdate/{id}', [BPostController::class, 'DeletePost']);
//share post 
Route::post('/postShare', [BPostController::class, 'SharePost']);

//get all likes
Route::get('/getLikes', [BLikeController::class, 'getAllLikes']);