@extends('layouts.master')

@section('content')
<div class="container ">
    <div id=title> Find Your Service</div>
    	<div id="map"></div> 
    <br/>

    {!! Form::open(['id'=>'searchServices']) !!}
    
    {!! Form::label('distanceText','Distance') !!}

	{!! Form::select('distanceDD', ['1' => '1 Kilometer',
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

