@extends('layouts.master')

@section('content')
    <div class="container ">
        <div id=title> Find Your Service</div>
            <div class="form-row">
                <div>
                    <h3>Services Near</h3> <br/>
                    <ul class="list-group" id="servicesResult">
                    </ul> 
                </div>
                <div id="map"></div>
            </div>
                <br/>
                    {!! Form::open(['id'=>'searchServices']) !!}
                    
                    {!! Form::label('distanceText','Distance') !!}

                	{!! Form::select('distance', ['1' => '1 Kilometer',
                    							  '2' => '2 Kilometers',
                    							  '5' => '5 Kilometers',
                    							  '10' => '10 Kilometers',
                    							  '25' => '25 Kilometers',
                    							  '50' => '50 Kilometers',
                    							  '100' => '100 Kilometers',
                    							  '0' => 'Anywhere'],'5',['id'=>'distance']) !!} 

                    {!! Form::submit('Search',['class'=>'btn btn-success']) !!}

                    {!! Form::close() !!}

                   
    </div>
@endsection

