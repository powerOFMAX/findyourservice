<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
			<title> FindYourService </title>
		</meta>

		<link rel="stylesheet" href="{{asset('css/main.css')}}">

	</head>
	<body>
		@yield('content')

	        <script crossorigin="anonymous" integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s=" src="https://code.jquery.com/jquery-3.1.0.min.js">
	        </script>

	        {{-- Google map API  --}}
	            <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC24xalbzXKTR_d48BUFn5Le9xeXKhRK-w&libraries=places">
			    </script>

	        <script src="{{asset('js/script.js')}}"></script>
	        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js">
	        </script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>

	@yield('js')
	<button>mostrar</button>
</body>
</html>