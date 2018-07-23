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

Route::get('searchServices', 'SearchServicesController@searchServices');

// NUEVO Cuidado con el parentesis del final
Route::get('services', 'SearchServicesController@index');

// Get a specific Service by ID
Route::get('services/{service}', 'SearchServicesController@showService');

// Insert a service
Route::post('services', 'SearchServicesController@insertServices');

//Update a service
Route::put('services/{service}', 'SearchServicesController@updateServices');

// Delete a service
Route::delete('services/{service}', 'SearchServicesController@deleteServices');
