<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;

class SearchServicesController extends Controller
{
    public function searchServices(Request $request)
    {
        $lat=$request->lat;
        $lng=$request->lng;

        $title=$request->title;
        $services=Service::where('title', 'LIKE', '%'.$title.'%')->get();
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
        'route' => 'max:80',
        'street_number' => 'max:80',
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
