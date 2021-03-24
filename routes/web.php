<?php

use App\Http\Controllers\User;
use App\Http\Controllers\Dashboard;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/Login', function () {
    return view('welcome');
});


Route::get('/admin/dashboard', function () {
    return view('welcome');
});

Route::get('/admin', function () {
    return view('welcome');
});
Route::get('/admin/members', function () {
    return view('welcome');
});
Route::get('/admin/brunches', function () {
    return view('welcome');
});
Route::get('/viewer/dashboard', function () {
    return view('welcome');
});

Route::get('/BrunchAdmin/dashboard', function () {
    return view('welcome');
});

Route::get('/BrunchMember/dashboard', function () {
    return view('welcome');
});
Route::get('/BrunchMember/createRequest', function () {
    return view('welcome');
});
Route::get('/BrunchMember/createRequest', function () {
    return view('welcome');
});
Route::get('/helper/print', function () {
    return view('welcome');
});
Route::get('/helper/Export', function () {
    return view('welcome');
});














Route::post('/api/export/excel',[\App\Http\Controllers\RequestsController::class , 'ExportExcel']);




Route::post('/api/IsLogIn', [User::class, "isLogIn"]);

Route::post('/api/Login', [User::class, "login"]);
Route::post('/api/logOut', [User::class, "logOut"]);



Route::post('/api/get/DashBoardSimpleData', [Dashboard::class , 'ShortInfo']);
Route::post('/api/show/requests', [\App\Http\Controllers\RequestsController::class , 'show']);
Route::post('/api/approve/request', [\App\Http\Controllers\RequestsController::class , 'approve']);
Route::post('/api/add/request', [\App\Http\Controllers\RequestsController::class , 'addRequest']);
Route::post('/api/cancel/request', [\App\Http\Controllers\RequestsController::class , 'cancel']);
Route::post('/api/show/Users', [\App\Http\Controllers\User::class , 'show']);
Route::post('/api/show/Brunches', [\App\Http\Controllers\BranchsController::class , 'show']);
Route::post('/api/delete/Users', [\App\Http\Controllers\User::class , 'deleteUser']);
Route::post('/api/update/Users', [\App\Http\Controllers\User::class , 'UpdateUserInfo']);
Route::post('/api/add/Users', [\App\Http\Controllers\User::class , 'AddUserInfo']);









