<?php
use app\location;

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
    //$distance=['Anywhere','2 Kilometer','5 Kilometer','10 Kilometer','25 Kilometer','50 Kilometer','100 Kilometer'];

    //return view('front',compact('distance'));
    return view('front');
});

//Auth::routes();

// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Registration Routes...
Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('register', 'Auth\RegisterController@register');

// Password Reset Routes...
// Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
// Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
// Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
// Route::post('password/reset', 'Auth\ResetPasswordController@reset');
//
//
//  Administrator Route
Route::get('/admin', 'AdminController@index')->name('admin');
Route::get('/show', 'AdminController@showDelete')->name('admin');
Route::get('/add', 'AdminController@showInsert')->name('admin');
Route::get('/modify', 'AdminController@showUpdate')->name('admin');


Route::get('/autocomplete', function () {
    return view('autocomplete');
});


// Route::get('/search', function () {
//     return view('addservice');
// });


//	Return the view and is better because save the cache
Route::view('/example','example');
