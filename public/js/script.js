var map;
var myLatLng;
$(document).ready(function(){
	//llamo a la funcion creada para iniciar la geobubicacion
	geoLocationInit();

	function geoLocationInit(){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(success,fail);
		}else{
			alert("Browser not supported");
		}
	}

	function success(position){
		console.log(position);
		var latval=position.coords.latitude;
		var lngval=position.coords.longitude;
		console.log([latval,lngval]);
		//coloco mi posicion segun lo que obtuve
		myLatLng=new google.maps.LatLng(latval,lngval);
		//creo el objeto mapa con la direccion correspondiente
		createMap(myLatLng,12,true);
		//nearbySearch(myLatLng,"school");
		searchServices(latval,lngval);
	}

	function fail(){
		alert("The distance ll'be Everywhere");
		//seteo una posicion default en la mitad del mundo aproximadamente
		myLatLng=new google.maps.LatLng(23.6844179,-55.2470404);
		//hice una marca aproposito en rosario para testear
		var nuevamark=new google.maps.LatLng(-32.927606,-60.700304);
		
		createMap(myLatLng,1,false);
		createMarker(nuevamark,'https://s33.postimg.cc/5agxxznmn/if_Map_-_Location_Solid_Style_24_2216359_1.png','Av cabildo 42134/n productos');
	}

	//Create Map - myLatLng(latitude longitude) - zm(the zoom) - withmark (if i want a mark)
	function createMap(myLatLng,zm,withmark){
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
			      radius: 5000
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
			info.open(map,marker);
		});
    }

	function createMarker(latlng,icn,title,description, address, city, state, zipcode){
		var marker = new google.maps.Marker({
			    position: latlng,
			    map: map,
			    icon:icn,
			    title: title

			});

		var info= new google.maps.InfoWindow({
			content: '<h2>'+title+'</h2><h3>'+description+'</h3>'+' '+city+', '+state+'<br/>'+address+' - '+zipcode
		});
		marker.addListener('click',function(){
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

	function searchServices (lat,lng){
		$.post('http://localhost/maps/mapas/public/api/searchServices',{lat:lat,lng:lng},function(match){
			//console.log(match);
			$.each(match,function (i,val){
				var glatval=val.lat;
				var glngval=val.lng;
				var gname=val.title;
				var gicn='https://s33.postimg.cc/5agxxznmn/if_Map_-_Location_Solid_Style_24_2216359_1.png';
				var gdesc=val.description;
				var gaddress=val.address;
				var gstate=val.state;
				var gzipcode=val.zipcode;
				var gcity=val.city;

				var GLatLng=new google.maps.LatLng(glatval,glngval);
				//createMarker(GLatLng,gicn,gname);

				createMarker(GLatLng,gicn,gname,gdesc, gaddress,gcity, gstate, gzipcode);
			});

		});
	}
		 	
});