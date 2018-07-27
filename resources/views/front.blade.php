@extends('layouts.master')

@section('content')
  <div class="container">
    <div id=title> Find Your Service</div>
      {{-- Search Input --}}
      <div class="row" id="searchBox">
          <div class="col-lg-6">
              <div class="input-group"> 
                  <div class="form-group col-lg-8">
                    <input type="text" class="form-control" placeholder="Search by title..." id="searchText">
                  </div>
                  <div class="form-group">
                    <button class="btn btn-default" type="button" id="searchServices">Search</button>
                  </div>
              </div>
              <div class="container">
                <div class="row">
                  {{-- Distance Title --}}
                  <div class="col-lg-3">
                    <label for="distance" id="distLabel">Distance </label>
                  </div>
                  {{-- Select Box --}}
                  <div class="col-lg-5">
                    <select class="form-control" id="distance" >
                      <option value="1">1 Kilometer</option>
                      <option value="2">2 Kilometers</option>
                      <option value="5">5 Kilometers</option>
                      <option value="10">10 Kilometers</option>
                      <option value="25">25 Kilometers</option>
                      <option value="50">50 Kilometers</option>
                      <option value="100">100 Kilometers</option>
                      <option selected="selected" value="0">Anywhere</option>
                    </select>
                  </div>
                </div>
              </div>
          </div>
      </div><br/>
      <div class="row" id="servicesNear">
          {{-- List Of Services --}}
          <div class="col-sm-3">
              <div>
                  <h3>Services Near</h3> <br/>
                  <ul class="list-group" id="servicesResult">
                  </ul> 
              </div>
          </div>
          {{--  Map  --}}
          <div class="col">
            <div id="map"></div>
          </div>
      </div>
  </div>
@endsection

