<?php

use app\location;

// Main Page
Route::view('/', 'front');

// Authentication Routes..
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Registration Routes..
Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('register', 'Auth\RegisterController@register');

//  Administrator Routes.. Admin Required
Route::get('/admin', 'AdminController@index')->name('admin');
Route::get('/show', 'AdminController@showDelete')->name('admin');
Route::get('/add', 'AdminController@showInsert')->name('admin');
Route::get('/modify/{id}', 'AdminController@showUpdate')->name('admin');
