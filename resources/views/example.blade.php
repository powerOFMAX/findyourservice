<style>
	#map-canvas{
	 width:500px;
	 height:370px;
	}
</style>

<html>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBYG5g2aJ9TjMlbYk7E_VuFYKSvHC1Ee6Y&libraries=places" type="text/javascript"></script>
	<div class="container">
		<h1>Agregar cliente</h1>
		<div class="form-group">
			<label form="">Titulo</label>
			<input type="text" class="form-control input-sm" name="title">
		</div>
		<div class="form-group">
			<label form="">Mapa</label>
			<input type="text" id="searchmap">
			<div id="map-canvas"></div>
		</div>
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

	<script>
		var map = new google.maps.Map(document.getElementById('map-canvas'),{
		center:{
		 lat:19.369358750851443,
		 lng:-99.5783453061905
		 },
		 zoom:17
		});

		var marker= new google.maps.Marker({
		 position:{
		  lat:19.369358750851443,
		  lng:-99.5783453061905
		 },
		 map:map,
		 draggable:true
		});

		var searchBox = new google.maps.places.SearchBox(document.getElementById('searchmap'));
		google.maps.event.addListener(searchBox,'places_changed',function(){
		var places = searchBox.getPlaces();
		var bounds = new google.maps.LatLngBounds();
		var i , place;
		for(i=0;place=places[i];i++){
		 bounds.extend(place.geometry.location);
		 marker.setPosition(place.geometry.location);
		}
		map.fitBounds(bounds);
		map.setZoom(17);
		});
		
		google.maps.event.addListener(marker,'position_changed',function(){
		 var lat = marker.getPosition().lat();
		 var lng = marker.getPosition().lng();
		 $('#lat').val(lat);
		 $('#lng').val(lng);
		});
	</script>
</html>﻿
 

