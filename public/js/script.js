var map, titleSearch;
var myLatLng;
var distval;
var latval, lngval;

$(document).ready(function() {
    //Call this function to init the GeoLocation
    geoLocationInit();

    $(document).on("click", "#searchServices", function(e) {
        e.preventDefault();
        if (distval == 0) {
            titleSearch = $("#searchText").val();
            myLatLng = new google.maps.LatLng(23.6844179, -55.2470404);

            createMap(myLatLng, false, 0);
            searchServices(myLatLng[0], myLatLng[1], 0, titleSearch)
        } else {

            titleSearch = $("#searchText").val();
            myLatLng = new google.maps.LatLng(latval, lngval);

            createMap(myLatLng, true, distval);
            searchServices(latval, lngval, distval, titleSearch);
        }
    });

    // Change the distance at the event click
    $("#distance").click(function() {
        distval = $("#distance").val();
    });

    //Functions
    function geoLocationInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, fail);
        } else {
            alert("Browser not supported");
        }
    }

    function success(position) {
        // Set the latitude and longitud
        latval = position.coords.latitude;
        lngval = position.coords.longitude;

        // Set the distance
        distval = 5;
        document.getElementById("distance").value = 5;
        titleSearch = $("#searchText").val();

        //Create an array of the actual Lat and Lng
        myLatLng = new google.maps.LatLng(latval, lngval);

        //Create the map Object with the default zoom (5) - with Marks (of my start position)
        createMap(myLatLng, true, distval);

        //Call to search services
        searchServices(latval, lngval, distval, titleSearch);

    }

    function fail() {
        distval = 0;
        titleSearch = $("#searchText").val();

        // I set a default position in the middle of the world aprox
        myLatLng = new google.maps.LatLng(23.6844179, -55.2470404);

        //Disable the distance selector
        document.getElementById("distance").disabled = true;

        // Because are not Geolocation - Set the distance in 0
        createMap(myLatLng, false, distval);
        searchServices(myLatLng[0], myLatLng[1], distval, titleSearch);
    }

    //Create Map - myLatLng(latitude longitude) - zm(the zoom) - withmark (if i want a mark)
    function createMap(myLatLng, withmark, dist) {
        var zoomv = 12;
        //Change the zoom taking the distance as reference
        if (dist == 1 || dist == 2) {
            zoomv = 14;
        }
        if (dist == 5 || dist == 10) {
            zoomv = 12;
        }
        if (dist == 25 || dist == 50) {
            zoomv = 10;
        }
        if (dist == 100) {
            zoomv = 8;
        }
        if (dist == 0) {
            zoomv = 1;
        }

        //Create the map
        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            scrollwheel: false,
            //le paso el zoom
            zoom: zoomv
        });

        if (withmark) {
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
            })
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
    }

    //Create the infrmation Window
    var info = new google.maps.InfoWindow;

    function createMarker(latlng, icn, title, description, route, street_number, city, state, zipcode) {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: icn,
            title: title
        });

        //Set the infoWindow content and where it has to be open
        marker.addListener('click', function() {
            info.setContent('<h4>' + title + '</h4><h6>' + description + '</h6>' + ' ' + city + ', ' + state + '<br/>' + route + street_number + zipcode)
            info.open(map, marker);
        });
    }

    function searchServices(lat, lng, dist, title) {
        //when i get a Post at this direction it matches the DB information
        $.get('http://findyourservice.com.devel/api/searchServices', {
            lat: lat,
            lng: lng,
            title: title
        }, function(match) {
            $('#servicesResult').html('');
            var html;
            console.log(match);
            $.each(match, function(i, val) {
                //Create a variable for Each field that i want
                var glatval = val.lat;
                var glngval = val.lng;
                var gtitle = val.title;
                var gicn = 'https://s33.postimg.cc/5agxxznmn/if_Map_-_Location_Solid_Style_24_2216359_1.png';
                var gdesc = val.description;
                var groute = val.route;
                var gstreet_number = val.street_number;
                var gstate = val.state;
                var gzipcode = val.zipcode;
                var gcity = val.city;

                //Create an array of the service location
                var GLatLng = new google.maps.LatLng(glatval, glngval);

                //I calculate the distance in km for every service and if is lower than my distance i'll create his marker
                if ((getDistance(lat, lng, glatval, glngval)) < dist) {
                    createMarker(GLatLng, gicn, gtitle, gdesc, groute, gstreet_number, gcity, gstate, gzipcode);
                    html = '<li class="list-group-item">' + gtitle + '</li>';
                    $('#servicesResult').append(html);
                }
                //If the distance is 0 (GeolocationFailed) It'll create all of the markers
                if (dist == 0) {
                    createMarker(GLatLng, gicn, gtitle, gdesc, groute, gstreet_number, gcity, gstate, gzipcode);
                    html = '<li class="list-group-item">' + gtitle + '</li>';
                    $('#servicesResult').append(html);
                }

            });

        });
    }
    //Haversine Formula to calculate lat-lng distance in kilometer
    function getDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km  
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.asin(Math.sqrt(a));
        var d = R * c;
        return d;
    }
});