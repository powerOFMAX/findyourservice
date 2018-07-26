<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Get a Service searching by title
Route::get('searchServices', 'SearchServicesController@searchServices');

// Get All the Services for Table
Route::get('services', 'SearchServicesController@index');

// Get a specific Service by ID
Route::get('services/{service}', 'SearchServicesController@showService');

// Insert a service
Route::post('services', 'SearchServicesController@insertServices');

//Update a service
Route::put('services/{service}', 'SearchServicesController@updateServices');

// Delete a service
Route::delete('services/{service}', 'SearchServicesController@deleteServices');
