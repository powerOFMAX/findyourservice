@extends('layouts.app')

@section('content')
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
                        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
                        crossorigin="anonymous">
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBYG5g2aJ9TjMlbYk7E_VuFYKSvHC1Ee6Y&libraries=places" type="text/javascript"></script>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header"> Add a New Service  ( Make sure that you fill all the fields ) </div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <div class="container">
      
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label form="">Title</label>
                                <input type="text" class="form-control"  id="title" >
                            </div>
                            <div class="form-group col-md-6">
                                <label for="description">Description</label>
                                <textarea type="text" class="form-control" rows="2" id="description"></textarea> 
                            </div>
                        </div>

                        <div class="form-group">
                            <label form="">Search</label>
                            <input type="text" id="autocomplete" placeholder="Enter your address" >
                            <div id="map-canvas"></div>
                        </div>

                        <table id="address">
                            {{-- Street Direction  --}}
                            <tr>
                                <td class="label">Street address</td>
                                <td class="slimField"><input class="form-control" id="street_number"
                                      disabled="true"></td>
                                <td class="wideField" colspan="2"><input class="form-control" id="route"
                                      disabled="true"></td>
                            </tr>

                            {{--  --}}
                            <tr>
                                <td class="label">City</td>
                                <td class="wideField" colspan="3">.
                                    <input class="form-control" id="locality"
                                           disabled="true">
                                </td>
                            </tr>

                            {{--  --}}
                            <tr>
                                <td class="label">State</td>
                                <td class="slimField">
                                    <input class="form-control" id="administrative_area_level_1"
                                           disabled="true">
                                </td>

                                {{-- Zip Code --}}
                                <td class="label">Zip code</td>
                                <td class="wideField">
                                    <input class="form-control" id="postal_code"
                                           disabled="true">
                                </td>
                            </tr>

                            {{--  --}}
                            <tr>
                                <td class="label">Country</td>
                                <td class="wideField" colspan="3">
                                    <input class="form-control"
                                           id="country" 
                                           disabled="true">
                                </td>
                            </tr>
                    </table>
                            
                            {{-- Create the Insert Button --}}
                            {!! Form::open(['id'=>'insert']) !!}
                            {!! Form::submit('Insert',['class'=>'btn btn-danger']) !!}
                            {!! Form::close() !!}

                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

    <script src="{{asset('js/autocomplete.js')}}"></script>
    <script src="{{mix('js/app.js')}}" ></script>

@endsection
