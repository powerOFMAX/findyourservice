<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;
use yajra\Datatables\Datatables;


class SearchServicesController extends Controller
{
    public function searchServices(Request $request)
    {
        $lat = $request->lat;
        $lng = $request->lng;
        $title = $request ->title;
        $dist = $request->dist;
        
        //If the Distance is Anywhere
        if ($dist==0) {
            return $this->searchText($title);
        } else {
            return $this->haversineFormula($lat, $lng, $dist, $title);
        }
    }

    public function index()
    {
        $services = Service::select(['id', 'title', 'description', 'route', 'street_number', 'city', 'state','zipcode']);
        return Datatables::of($services)
            ->addColumn('action', function ($services) {
                return '<a href="modify/'.$services->id.'" class="btn btn-xs btn-primary edit">Edit</a>
                        <a href="" class="btn btn-danger del" id="'.$services->id.'"">Delete</a>';
            })
            ->editColumn('id', 'ID: {{$id}}')
            ->make(true);
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

    //  Search Text Query
    private function searchText($title)
    {
        $services=Service::where('title', 'LIKE', '%'.$title.'%')->get();
        return $services;
    }

    // Haversine Formula to calculate lat-lng distance in kilometers
    private function haversineFormula($lat, $lng, $dist, $title)
    {
        $services = Service::select('services.*')
        ->selectRaw('( 6371 * acos( cos( radians(?) ) *
                               cos( radians( lat ) )
                               * cos( radians( lng ) - radians(?)
                               ) + sin( radians(?) ) *
                               sin( radians( lat ) ) )
                             ) AS distance', [$lat, $lng, $lat])
        ->havingRaw("distance < ?", [$dist])
        ->where('title', 'LIKE', '%'.$title.'%')
        ->get();
        return $services;
    }
}
