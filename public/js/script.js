var map, titleSearch;
var myLatLng;
var distval;
var latval, lngval;
var markerArray = [];
var idmark = 0;

$(document).ready(function() {
    //Call this function to init the GeoLocation
    geoLocationInit();

    //Create the information Window
    var info = new google.maps.InfoWindow;

    // Search Button
    $(document).on("click", "#searchServices", function(e) {
        e.preventDefault();
        titleSearch = $("#searchText").val();

        // Reset Markers Values
        idmark = 0;
        markerArray = [];
        // According to the distance Change the Map values
        if (distval == 0) {
            myLatLng = new google.maps.LatLng(20.507137, 10);
            createMap(myLatLng, false, 0);
            searchServices(myLatLng[0], myLatLng[1], 0, titleSearch)
        } else {
            myLatLng = new google.maps.LatLng(latval, lngval);
            createMap(myLatLng, true, distval);
            searchServices(latval, lngval, distval, titleSearch);
        }
    });

    // Change the distance at the event click
    $(document).on("click", "#distance", function(e) {
        e.preventDefault();
        distval = $("#distance").val();
    });

    // Change the InfoWindow
    $(document).on("click", '.custom-select', function(e) {
        e.preventDefault();
        var idTabla = $("#servicesResult").val();
        google.maps.event.trigger(markerArray[idTabla], 'click');
    });

    // Geolocation Question
    function geoLocationInit() {
        if (navigator.geolocation) {
            titleSearch = $("#searchText").val();
            navigator.geolocation.getCurrentPosition(success, fail);
        } else {
            alert("Browser not supported");
        }
    }

    // On Success Geolocation
    function success(position) {
        // Set the latitude and longitud
        latval = position.coords.latitude;
        lngval = position.coords.longitude;

        // Set the distance
        distval = 5;
        //Disable the distance selector
        document.getElementById("distance").value = 5;

        //Create an array of the actual Lat and Lng
        myLatLng = new google.maps.LatLng(latval, lngval);

        //Create the Map Object - with Mark (of my start position)
        createMap(myLatLng, true, distval);
        searchServices(latval, lngval, distval, titleSearch);
    }

    // On Fail Geolocation
    function fail() {
        // Set the latitude and longitud in the middle of the world aprox
        latval = 20.507137;
        lngval = 10;

        // Because are not Geolocation - Set the distance in 0
        distval = 0;
        //Disable the distance selector
        document.getElementById("distance").disabled = true;

        // Create Object LatLng
        myLatLng = new google.maps.LatLng(latval, lngval);

        // Create the Map Object - without Mark
        createMap(myLatLng, false, distval);
        searchServices(latval, lngval, distval, titleSearch);
    }

    //Change the zoom taking the distance as reference
    function selectZoom(dist) {
        var zoom = 12;
        if (dist == 1 || dist == 2) {
            zoom = 14;
        }
        if (dist == 5 || dist == 10) {
            zoom = 12;
        }
        if (dist == 25 || dist == 50) {
            zoom = 10;
        }
        if (dist == 100) {
            zoom = 8;
        }
        if (dist == 0) {
            zoom = 2;
        }
        return zoom;
    }

    //Create Map
    function createMap(myLatLng, withmark, dist) {
        var zoom = selectZoom(dist);
        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            scrollwheel: true,
            zoom: zoom
        });
        if (withmark) {
            createMainMarker(myLatLng, dist);
        }
    }

    // Create Marker for Geolocation Position
    function createMainMarker(myLatLng, dist) {
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
        })
        createCircle(myLatLng, dist);
    }

    // Create Circle In the Map
    function createCircle(myLatLng, dist) {
        var cityCircle = new google.maps.Circle({
            strokeColor: '#58ACFA',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#81BEF7',
            fillOpacity: 0.35,
            map: map,
            center: myLatLng,
            radius: dist * 1000
        });
    }

    //  Create Marker
    function createMarker(latlng, icn, title, description, route, street_number, city, state, zipcode) {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: icn,
            title: title
        });
        markerArray.push(marker);
        createInfoWindow(marker, title, description, city, state, route, street_number, zipcode);
    }

    //Set the infoWindow content and where it has to be open
    function createInfoWindow(marker, title, description, city, state, route, street_number, zipcode) {
        marker.addListener('click', function() {
            info.setContent('<h4>' + title + '</h4><h6>' + description + '</h6>' + ' ' + city + ', ' + state + '<br/>' + route + street_number + zipcode)
            info.open(map, marker);
        });
    }

    // Search The Services
    function searchServices(lat, lng, dist, title) {
        $.get('http://findyourservice.com.devel/api/searchServices', {
            lat: lat,
            lng: lng,
            title: title,
            dist: dist
        }, function(match) {
            $('#servicesResult').html('');
            var html;
            $.each(match, function(i, val) {
                //Create a variable for Each field that i want
                var glatval = val.lat;
                var glngval = val.lng;
                var gtitle = val.title;
                var gicn = 'https://s33.postimg.cc/th7cie5z3/if_country_37960.png';
                var gdesc = val.description;
                var groute = val.route;
                var gstreet_number = val.street_number;
                var gstate = val.state;
                var gzipcode = val.zipcode;
                var gcity = val.city;
                //Create an array of the service location
                var GLatLng = new google.maps.LatLng(glatval, glngval);

                //Create marker for each service
                createMarker(GLatLng, gicn, gtitle, gdesc, groute, gstreet_number, gcity, gstate, gzipcode);
                html = '<option value="' + idmark + '" lat="' + glatval + '" lng="' + glngval + '">' + gtitle + '</option>';
                idmark += 1;
                $('#servicesResult').append(html);
            });
        });
    }
});