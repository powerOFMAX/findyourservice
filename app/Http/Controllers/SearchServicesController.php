<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;

class SearchServicesController extends Controller
{
    public function searchServices(Request $request)
    {
        //i access the lat and lng
        $lat=$request->lat;
        $lng=$request->lng;
        // i set a distance of location to get it
        //$services=Service::whereBetween('lat',[$lat-0.1,$lat+0.1])->whereBetween ('lng',[$lng-0.1,$lng+0.1])->get();
        $services=Service::get();
        return $services;
    }

    public function index()
    {
        return Service::all();
    }

    public function showService(Service $service)
    {
        return $service;
    }

    
 
    public function insertServices(Request $request)
    {
        $this->validate($request, [
        'title' => 'required | max:300',
        'description' => 'required',
        'address' => 'max:80',
        'city' => 'max:191',
        'state' => 'max:191',
        'zipcode'=> 'max:191',
        'lat'=> 'required',
        'lng' => 'required'
        ]);
        
        $service = Service::create($request->all());
 
        return response()->json($service, 201);
    }
 
    public function updateServices(Request $request, Service $service)
    {
        $service->update($request->all());
 
        return response()->json($service, 200);
    }
 
    public function deleteServices(Service $service)
    {
        $service->delete();
 
        return response()->json(null, 204);
    }
}
