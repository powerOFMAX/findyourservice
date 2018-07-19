<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<title> FindYourService </title>

		
		<!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
		
		<!-- CSS Style -->


		<!-- Estilo boton CSS -->
		 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous">

        <link rel="stylesheet" href="{{asset('css/main.css')}}">

	</head>
	<body>
		@yield('content')

	        	{{-- Google map API  --}}
	            <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC24xalbzXKTR_d48BUFn5Le9xeXKhRK-w&libraries=places">
			    </script>

				{{-- JQuery  --}}
				<script src="https://code.jquery.com/jquery-3.3.1.min.js"
					  	integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
					 	crossorigin="anonymous">
				</script>

			   <!-- Js Files -->
		        <script src="{{asset('js/script.js')}}"></script>
		        <script src="{{asset('js/distance.js')}}"></script>
	       
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" 
						integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" 
						crossorigin="anonymous">
				</script>
				<!-- Estilo boton -->
				
				<!-- Select JS -->
				 <!--script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script-->
				 	<script src=https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/js/select2.min.js></script>

				 @if (Route::has('login'))
	                <div class="top-right links">
	                    @auth
	                        <a href="{{ url('/admin') }}">Dashboard</a>
	                    @else
	                        <a href="{{ route('login') }}">Login</a>

	                    @endauth
	                </div>
            	@endif

		@yield('js')
	</body>
</html>