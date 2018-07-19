var map;
//var myLatLng;
var distval;
var latval;
var lngval;

$(document).ready(function(){
	//Call this function to init the GeoLocation
	geoLocationInit();

	function geoLocationInit(){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(success,fail);
		}else{
			alert("Browser not supported");
		}
	}

	function success(position){
		//Test Console log
		console.log(position);
		//Set the latitude and longitud
		latval=position.coords.latitude;
		lngval=position.coords.longitude;
		//Set the distance
		//var dist=1;
		distval=5;
		console.log([latval,lngval]);
		//Create a array of my lat and lng
		myLatLng=new google.maps.LatLng(latval,lngval);
		//Create the map Object with the default zoom (12) - with Marks (of my start position)
		createMap(myLatLng,12,true,distval);
		//Call to search services
		searchServices(latval,lngval,distval);

		//nearbySearch(myLatLng,"school");
	}

	function fail(){
		alert("The distance ll'be Everywhere");
		// I set a default position in the middle of the world aprox
		myLatLng=new google.maps.LatLng(23.6844179,-55.2470404);
		// Because are not distance y set the distance in 0
		createMap(myLatLng,1,false,0);
		searchServices(myLatLng[0],myLatLng[1],0);
	}

	//Create Map - myLatLng(latitude longitude) - zm(the zoom) - withmark (if i want a mark)
	function createMap(myLatLng,zm,withmark,dist){
			  map = new google.maps.Map(document.getElementById('map'), {
	          center: myLatLng,
	          scrollwheel: false,
	          //le paso el zoom
	          zoom: zm
	        });
			if(withmark){
			  var marker=new google.maps.Marker({
			  	position: myLatLng,
			    map: map,
			  })
			  var cityCircle= new google.maps.Circle({
			  	strokeColor: '#58ACFA',
			      strokeOpacity: 0.8,
			      strokeWeight: 2,
			      fillColor: '#81BEF7',
			      fillOpacity: 0.35,
			      map: map,
			      center: myLatLng,
			      radius: dist*1000
			  });
			}
			  
	}  

	//Create Marker
	function createMarker(latlng,icn,name){
		var marker = new google.maps.Marker({
			    position: latlng,
			    map: map,
			    icon:icn,
			    title: name
			});

		var info= new google.maps.InfoWindow({
			content: '<h1>'+name+'</h1>'+'Descripcion '+' direccion '+'codigo postal'
		});
		marker.addListener('click',function(){
			info.setContent()
			info.open(map,marker);
		});
    }
    //Create the infoWindow
	var info= new google.maps.InfoWindow;
	function createMarker(latlng,icn,title,description, address, city, state, zipcode){
		var marker = new google.maps.Marker({
			    position: latlng,
			    map: map,
			    icon:icn,
			    title: title

			});
		//Set the infoWindow content and where it has to be open
		marker.addListener('click',function(){
			info.setContent('<h2>'+title+'</h2><h3>'+description+'</h3>'+' '+city+', '+state+'<br/>'+address+' - '+zipcode)
			info.open(map,marker);
		});
	}

	//Nearby Search
	/*function nearbySearch(myLatLng,type){
		var request = {
		    location: myLatLng,
		    radius: '5000',
		    type: [type]
		 };	 	

	service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);

	function callback(results, status) {
		  if (status == google.maps.places.PlacesServiceStatus.OK) {
		    for (var i = 0; i < results.length; i++) {
		      var place = results[i];
		      //obtengo la ubicacion de los lugares cerca
		      latlng= place.geometry.location;
		      //obtengo los iconos de los lugares cerca
		      //icn=place.icon;
		      icn='https://s33.postimg.cc/5agxxznmn/if_Map_-_Location_Solid_Style_24_2216359_1.png';
		      name=place.name;
		      createMarker(latlng,icn,name);
		    }
		  }
	}
	}   */

	$('#searchServices').submit(function(e){
		 e.preventDefault();
		//distval=$('#distanceDD').val();
		if(distval==0){
			fail();
		}else{
			myLatLng=new google.maps.LatLng(latval,lngval);
			createMap(myLatLng,12,true,distval);
			searchServices(latval,lngval,distval);
		}
		

	});

	function searchServices (lat,lng,di){
		//when i get a Post at this direction it matches the DB information
		$.post('http://localhost/maps/mapas/public/api/searchServices',{lat:lat,lng:lng},function(match){
			//console.log(match);
			$.each(match,function (i,val){
				//Create a variable for Each field that i want
				var glatval=val.lat;
				var glngval=val.lng;
				var gtitle=val.title;
				var gicn='https://s33.postimg.cc/5agxxznmn/if_Map_-_Location_Solid_Style_24_2216359_1.png';
				var gdesc=val.description;
				var gaddress=val.address;
				var gstate=val.state;
				var gzipcode=val.zipcode;
				var gcity=val.city;


				//Create an array of the service location
				var GLatLng=new google.maps.LatLng(glatval,glngval);
				//I calculate the distance in km for every service and if is lower than my distance i'll create his marker
				if((getDistance(lat,lng,glatval,glngval))<di){
					createMarker(GLatLng,gicn,gtitle,gdesc, gaddress,gcity, gstate, gzipcode);
				}
				//If the distance is 0 (GeolocationFailed) It'll create all of the markers
				if(di==0){
					createMarker(GLatLng,gicn,gtitle,gdesc, gaddress,gcity, gstate, gzipcode);
				}
				console.log(di);
			});

		});
	}
	//Haversine Formula to calculate lat-lng distance in kilometer
	function getDistance(lat1, lon1, lat2, lon2){ 
	    var R = 6371; // km  
		var dLat = (lat2-lat1)*Math.PI/180;  
		var dLon = (lon2-lon1)*Math.PI/180;   
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *   
		        Math.sin(dLon/2) * Math.sin(dLon/2);   
		var c = 2 * Math.asin(Math.sqrt(a));   
		var d = R * c;
		return d;
	}
	

});