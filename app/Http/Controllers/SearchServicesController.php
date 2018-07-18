<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;


class SearchServicesController extends Controller
{
    public function searchServices(Request $request){
    	//i access the lat and lng from the script.js
    	$lat=$request->lat;
    	$lng=$request->lng;

    	$services=Service::whereBetween('lat',[$lat-0.1,$lat+0.1])->whereBetween ('lng',[$lng-0.1,$lng+0.1])->get();

    	return $services;
    }
}
