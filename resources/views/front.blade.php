@extends('layouts.master')

@section('content')
    <div class="container">
        <div id=title> Find Your Service
        </div>
        <div class="row" id="searchBox">
            <div class="col-lg-6">
                <div class="input-group"> 
                    <input type="text" class="form-control" placeholder="Search by title..." id="searchText">
                    <button class="btn btn-default" type="button" id="searchServices">Search</button>
                </div>
            </div>
        </div><br/>
            <label for="distance">Distance </label>
                {!! Form::select('distance', ['1' => '1 Kilometer',
                                              '2' => '2 Kilometers',
                                              '5' => '5 Kilometers',
                                              '10' => '10 Kilometers',
                                              '25' => '25 Kilometers',
                                              '50' => '50 Kilometers',
                                              '100' => '100 Kilometers',
                                              '0' => 'Anywhere'],'0',['id'=>'distance']) !!} 

            {{-- Services List / Map  --}}
            <br/><br/>
            <div class="form-row">
                <div>
                    <h3>Services Near</h3> <br/>
                    <ul class="list-group" id="servicesResult">
                    </ul> 
                </div>
                <div id="map"></div>
            </div>
                <br/>
          
    </div>
@endsection

