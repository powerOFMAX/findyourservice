	
	var placeSearch, autocomplete;
	var myLatLng,latval,lngval,map;

    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

geoLocationInit();

	function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')),
        					{types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);
        createMarker();
      }

      function fillInAddress() {
        // Get the place details from the autocomplete object.
        placeSearch = autocomplete.getPlace();
        console.log(placeSearch);

        for (var component in componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < placeSearch.address_components.length; i++) {
          var addressType = placeSearch.address_components[i].types[0];
          if (componentForm[addressType]) {
            var val = placeSearch.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
          }
        }
      }

	function geoLocationInit(){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(success,fail);
		}else{
			alert("Browser not supported");
		}
	}
	
	function success(position){
		//Set the latitude and longitud
		latval=position.coords.latitude;
		lngval=position.coords.longitude;

		//Create a array of my lat and lng
		myLatLng=new google.maps.LatLng(23.6844179,-55.2470404);
		
		createMap(myLatLng);
		initAutocomplete();
	}

	function fail(){
		// I set a default position in the middle of the world aprox
		myLatLng=new google.maps.LatLng(23.6844179,-55.2470404);
		// Because are not distance y set the distance in 0
		createMap(myLatLng);
	}
	

	function createMap(myLatLng){
		map = new google.maps.Map(document.getElementById('map-canvas'),{
			center:myLatLng,
			zoom:1
		});
	}

	function createMarker(){
		var marker= new google.maps.Marker({
		 position:myLatLng,
		 map:map,
		 draggable:false
		});

		//var searchBox = new google.maps.places.SearchBox(document.getElementById('autocomplete'));
		var searchBox = new google.maps.places.SearchBox(document.getElementById('autocomplete'));

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
		  latval = marker.getPosition().lat();
		  lngvalg = marker.getPosition().lng();
		 $('#lat').val(latval);
		 $('#lng').val(lngval);
		});
	}
	
	function positionChange(){
		google.maps.event.addListener(marker,'position_changed',function(){
			  latval = marker.getPosition().lat();
			  lngvalg = marker.getPosition().lng();
			 $('#lat').val(latval);
			 $('#lng').val(lngval);
		});
		
	}