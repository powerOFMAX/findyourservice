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
