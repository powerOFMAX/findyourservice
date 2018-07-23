$(document).ready(function(){
	searchServices();

	function searchServices (){
		$('#servicesResult').html('');

		$.get('http://findyourservice.com.devel/api/services',{},function(match){
			$.each(match,function (i,val){
				
				//Create a variable for Each field that i want
				var gid=val.id;
				var gtitle=val.title;
				var gdesc=val.description;
				var gaddress=val.address;
				var gcity=val.city;
				var gstate=val.state;
				var gzipcode=val.zipcode;

					// Create the columns for each row
				var html='<tr> <th scope="row">'+gid+
						'</th><td>'+gtitle+'</td><td>'
						+gdesc+'</td><td>'+gaddress+
						'</td><td>'+gcity
						+'</td><td>'+gstate+'</td><td>'+gzipcode+'</td></tr>';

					// Put the new row with the others rows
                    $('#servicesResult').append(html);
						
			});
		});
	}

	$('#delete').submit(function(e){
		e.preventDefault();
		var deleteID=$('#idDelete').val();
		console.log(deleteID);
		deleteServices(deleteID);

	});

	function deleteServices(id){
		var id=id;
				//	Call the DELETE method
				$.ajax({
					url: 'http://findyourservice.com.devel/api/services/'+id,
				    type: 'DELETE',
				    success: function(result) {
				       console.log('wiiiasdasd');
				       alert('Service Deleted successfully');

				       // Refresh the table
				       searchServices();
				    }
				});
	}

});