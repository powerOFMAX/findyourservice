<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('searchServices', 'SearchServicesController@searchServices');

// NUEVO Cuidado con el parentesis del final
Route::get('services', 'SearchServicesController@index');

Route::get('services/{service}', 'SearchServicesController@showService');

//cuidado con el parentesis del final inserto ok
Route::post('services', 'SearchServicesController@insertServices');

Route::put('services/{service}', 'SearchServicesController@updateServices');

Route::delete('services/{service}', 'SearchServicesController@deleteServices');