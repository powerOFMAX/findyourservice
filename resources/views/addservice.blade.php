@extends('layouts.app')

@section('content')
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
                        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
                        crossorigin="anonymous">
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBYG5g2aJ9TjMlbYk7E_VuFYKSvHC1Ee6Y&libraries=places" type="text/javascript"></script>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-header"> <h4>Add a New Service</h4></div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <div class="container">
                        {{-- Alert Message --}}
                        <div id="alert_message"></div>

                        <div class="row">
                            <div class="col-sm">
                                {{-- Title Field --}}
                                <div class="form-group">
                                    <label form="">Title</label>
                                    <div class="form-group">
                                        <input type="text" class="form-control"  id="title"  placeholder="Enter a Title..">
                                    </div>
                                </div>
                                {{-- Description Field --}}
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <div class="form-group">
                                         <textarea type="text" class="form-control" rows="2" id="description"  placeholder="Enter a Description.."></textarea> 
                                    </div>
                                </div>
                                {{-- Table --}}
                                <table id="address" class="form-group">
                                    {{-- Street Direction / Street_Number / Route --}}
                                    <tr>
                                        <td class="label">Street address</td>
                                        <td class="slimField">
                                            <div class="form-group">
                                                <input class="form-control" id="street_number"
                                                    disabled="true"
                                                     placeholder="Street Number..">
                                            </div>
                                        </td>
                                        <td class="wideField" colspan="2">
                                            <div class="form-group">
                                                <input class="form-control" id="route"
                                                        disabled="true"
                                                        placeholder="Enter the Route..">
                                            </div>
                                        </td>
                                    </tr>
                                    {{-- City Field --}}
                                    <tr>
                                        <td class="label">City</td>
                                        <td class="wideField" colspan="3">
                                            <div class="form-group">
                                                <input class="form-control" id="locality"
                                                   disabled="true"
                                                   placeholder="Enter the City..">
                                            </div>
                                        </td>
                                    </tr>
                                    {{-- State Field --}}
                                    <tr>
                                        <td class="label">State</td>
                                        <td class="slimField">
                                            <div class="form-group">
                                                <input class="form-control" id="administrative_area_level_1"
                                                   disabled="true"
                                                   placeholder="Enter the State..">
                                            </div>
                                        </td>
                                    {{-- Zip Code --}}
                                        <td class="label"> Zip code</td>
                                        <td class="wideField">
                                            <div class="form-group">
                                                <input class="form-control" id="postal_code"
                                                       disabled="true"
                                                       placeholder="Enter the Zip Code..">
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            {{-- Search input with Map --}}
                            <div class="col-sm" ><br/>
                                <div id="map-canvas"></div><br/>
                                <div class="form-group">
                                    <input type="text" id="autocomplete" placeholder="Search a location">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            {{-- Create the Insert Button --}}
                            <div class="col-sm-2" >
                                <button class="btn btn-danger btn-block" type="button" id="insert">Insert</button>
                            </div>
                        </div>       
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    <script src="{{asset('js/autocomplete.js')}}"></script>
    <script src="{{mix('js/app.js')}}" ></script>

@endsection
