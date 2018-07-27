var searchBox;
var myLatLng, latval, lngval;
var map;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    postal_code: 'short_name'
};

$(document).ready(function() {

    geoLocationInit();

    function initAutocomplete() {
        // Create the marker
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            draggable: false
        });
        searchBox = new google.maps.places.SearchBox(document.getElementById('autocomplete'));

        placesChanged(marker);
        markerChanged(marker);
    }

    function placesChanged(marker) {
        google.maps.event.addListener(searchBox, 'places_changed', function() {
            var places = searchBox.getPlaces();
            var bounds = new google.maps.LatLngBounds();
            console.log(places);

            bounds.extend(places[0].geometry.location);
            marker.setPosition(places[0].geometry.location);
            latval = (places[0].geometry.location.lat);
            lngval = (places[0].geometry.location.lng);

            for (var component in componentForm) {
                document.getElementById(component).value = '';
                document.getElementById(component).disabled = false;
            }

            // For each address component get the place information
            for (var i = 0; i < places[0].address_components.length; i++) {
                var addressType = places[0].address_components[i].types[0];
                // ConponentForm is the array of address Fields
                if (componentForm[addressType]) {
                    // Put the information in the correct Field
                    var val = places[0].address_components[i][componentForm[addressType]];
                    document.getElementById(addressType).value = val;
                }
            }

            // Change the zoom
            map.fitBounds(bounds);
            map.setZoom(17);
        });
    }

    function markerChanged(marker) {
        google.maps.event.addListener(marker, 'position_changed', function() {
            latval = marker.getPosition().lat();
            lngval = marker.getPosition().lng();
            $('#lat').val(latval);
            $('#lng').val(lngval);
        });
    }
    // Init the Geolocation
    function geoLocationInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, fail);
        } else {
            alert("Browser not supported");
        }
    }

    function success(position) {
        //Set the latitude and longitud
        latval = position.coords.latitude;
        lngval = position.coords.longitude;

        //Create a array of my lat and lng
        myLatLng = new google.maps.LatLng(latval, lngval);
        createMap(myLatLng);
        initAutocomplete();
    }

    function fail() {
        // I set a default position in the middle of the world aprox
        latval = 23.6844179;
        lngval = -55.2470404;
        myLatLng = new google.maps.LatLng(latval, lngval);
        createMap(myLatLng);
        initAutocomplete();
    }

    // Create Map
    function createMap() {
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: myLatLng,
            zoom: 1,
            draggable: false
        });
    }

    //Insert Submit Action 
    $(document).on("click", "#insert", function(e) {
        e.preventDefault();
        var title = $('#title').val();
        var description = $('#description').val();
        var route = $('#route').val();
        var street_number = $('#street_number').val();
        var city = $('#locality').val();
        var state = $('#administrative_area_level_1').val();
        var zipcode = $('#postal_code').val();
        var lat = latval;
        var lng = lngval;
        addService(title, description, route, street_number, city, state, zipcode, lat, lng);
    });

    // Add a Service
    function addService(title, description, route, street_number, city, state, zipcode, lat, lng) {
        $.post('http://findyourservice.com.devel/api/services', {
                title: title,
                description: description,
                route: route,
                street_number: street_number,
                city: city,
                state: state,
                zipcode: zipcode,
                lat: lat,
                lng: lng
            },
            function(match) {
                //  Make the Alert Message
                $('#alert_message').html('<div class="alert alert-success">' + 'Service Added Succesfully' + '</div>');
                for (var component in componentForm) {
                    document.getElementById(component).value = '';
                    document.getElementById(component).disabled = false;
                }
                $('#title').val('');
                $('#description').val('');
                $('autocomplete').val('');
            });
        //  Remove the Alert Message
        setInterval(function() {
            $('#alert_message').html('');
        }, 1500);
        //  Will redirect to the ShowServices Page
        setTimeout(function() {
            window.location.href = "http://findyourservice.com.devel/show";
        }, 2000);
    }
});