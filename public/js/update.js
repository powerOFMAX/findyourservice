var searchBox;
var myLatLng, latval, lngval, idService;

var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    postal_code: 'short_name'
};

initAutocomplete();

function initAutocomplete() {

    latval = 23.6844179;
    lngval = -55.2470404;
    myLatLng = new google.maps.LatLng(latval, lngval);

    // Create the marker
    searchBox = new google.maps.places.SearchBox(document.getElementById('autocomplete'));
    placesChanged();
}

function placesChanged() {
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();
        var bounds = new google.maps.LatLngBounds();
        console.log(places);

        bounds.extend(places[0].geometry.location);
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

    });
}

$(document).ready(function() {

    // Get Service Button 
    $('#getService').submit(function(e) {
        e.preventDefault();

        // Get the selected service
        idService = $('#idGet').val();
        getService(idService);
    });

    // Get Service Button 
    $('#update').submit(function(e) {
        e.preventDefault();

        // Get the selected service
        // idService= $('#idGet').val();
        // getService(idService);

        var title = $('#title').val();
        var description = $('#description').val();
        var route = $('#route').val();
        var street_number = $(' #street_number').val();
        var city = $('#locality').val();
        var state = $('#administrative_area_level_1').val();
        var zipcode = $('#postal_code').val();
        var lat = latval;
        var lng = lngval;

        updateService(idService, title, description, route, street_number, city, state, zipcode, lat, lng);
    });

    function updateService(id, title, description, route, street_number, city, state, zipcode, lat, lng) {
        // var id=id;
        //	Call the DELETE method
        $.ajax({
            url: 'http://findyourservice.com.devel/api/services/' + id,
            type: 'PUT',
            data: {
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
            success: function(result) {
                alert('Service Updated successfully');

                // Refresh the table
            }
        });

    }

    function getService(id) {
        $.get('http://findyourservice.com.devel/api/services/' + id, function(match) {
            // Get the information - Set variables
            var title = match.title;
            var description = match.description;
            var route = match.route;
            var street_number = match.street_number;
            var city = match.city;
            var state = match.state;
            var zipcode = match.zipcode;
            latval = match.lat;
            lngval = match.lng;

            // Set fields with the DB information
            $('#title').val(title);
            $('#description').val(description);
            $('#route').val(route);
            $('#street_number').val(street_number);
            $('#locality').val(city);
            $('#administrative_area_level_1').val(state);
            $('#postal_code').val(zipcode);

            // Enable Fields to edit
            for (var component in componentForm) {
                document.getElementById(component).disabled = false;
            }
        });
    }
});