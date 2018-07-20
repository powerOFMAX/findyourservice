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
                <div class="card-header"> Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in!, <br/> Here you can administrate your services <br/> 
                    
                    <div class="container">
                        {{-- <div id="locationField">
                            <input id="autocomplete" placeholder="Enter your address"
                                   onFocus="geoLocationInit()" 
                                   type="text">
                        </div> --}}

                        <h1>Agregar cliente</h1>

                        <div class="form-group">
                            <label form="">Titulo</label>
                            <input type="text" class="form-control input-sm" name="title">
                        </div>
                        <div class="form-group">
                            <label form="">Búsqueda</label>

                            <input type="text" id="autocomplete" placeholder="Enter your address">

                            <div id="map-canvas"></div>
                        </div>

                        <table id="address">
                            {{-- Street Direction  --}}
                            <tr>
                                <td class="label">Street address</td>
                                <td class="slimField">
                                    <input class="field" id="street_number"
                                           disabled="true">
                                </td>
                                <td class="wideField" colspan="2">
                                    <input class="field" id="route"
                                           disabled="true">
                                </td>
                            </tr>

                            {{--  --}}
                            <tr>
                                <td class="label">City</td>
                                <td class="wideField" colspan="3">.
                                    <input class="field" id="locality"
                                           disabled="true">
                                </td>
                            </tr>

                            {{--  --}}
                            <tr>
                                <td class="label">State</td>
                                <td class="slimField">
                                    <input class="field" id="administrative_area_level_1"
                                           disabled="true">
                                </td>

                                {{-- Zip Code --}}
                                <td class="label">Zip code</td>
                                <td class="wideField">
                                    <input class="field" id="postal_code"
                                           disabled="true">
                                </td>
                            </tr>

                            {{--  --}}
                            <tr>
                                <td class="label">Country</td>
                                <td class="wideField" colspan="3">
                                    <input class="field"
                                           id="country" 
                                           disabled="true">
                                </td>
                            </tr>
                    </table>

                        <div class="form-group">
                            <label form="">Latitud</label>
                            <input type="text" class="form-control input-sm" name="lat" id="lat">
                        </div>
                        <div class="form-group">
                            <label form="">Longitu</label>
                            <input type="text" class="form-control input-sm" name="lng" id="lng">
                        </div>

                            <button class="btn btn-sm btn-danger" type="submit">Guardar</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

    <script src="{{asset('js/autocomplete.js')}}"></script>
    <script src="{{ asset('js/app.js') }}" defer></script>

@endsection
