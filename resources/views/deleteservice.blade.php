@extends('layouts.app')

@section('content')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBYG5g2aJ9TjMlbYk7E_VuFYKSvHC1Ee6Y&libraries=places" type="text/javascript"></script>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header"> Show All Services </div>

                 <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                        <h3>All the services</h3> 
                     Here you can see or delete services only putting the number <br/> 
                    <br/> 

                    <div>
                      <table class="table" id="tableServices">
                            <thead>
                              <tr>  
                                    <th scope="col">Default</th>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Route</th>
                                    <th scope="col">Street Number</th>
                                    <th scope="col">City</th>
                                    <th scope="col">State</th>
                                    <th scope="col">Zip Code</th>
                              </tr>
                            </thead>
                            <tbody>
                              {{-- Here the table Populated --}}
                            </tbody>
                      </table>
                    </div>    

                    {{-- Create the Delete Button / Description --}}
                            <br/>
                            <label for="delete">Enter de # Number for delete a service</label>
                            <div class="form-row">
                              <div>
                                {!! Form::open(['id'=>'delete']) !!}
                                {!! Form::submit('Delete',['class'=>'btn btn-danger']) !!}
                                {!! Form::close() !!} 
                              </div>
                              <div>
                                <input type="text" class="form-control"  id="idDelete">
                              </div>
                            </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <script src="//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
    {{-- <script src="{{mix('js/app.js')}}" ></script> --}}
    <script src="{{asset('js/allservices.js')}}" ></script>

@endsection
