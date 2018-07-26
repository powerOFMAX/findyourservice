$(document).ready(function() {
    searchServices();

    // Populate the DataTable
    function searchServices() {
        $('#tableServices').DataTable({
            serverSide: true,
            ajax: {
                url: 'http://findyourservice.com.devel/api/services',
                type: 'GET'
            },
            columns: [{
                    defaultContent: "<tr><button type='button' class='Edit btn btn-default-xs' title='Edit'><i class='fa fa-pencil-square-o'></i></button></tr>",
                    searchable: false,
                    sortable: false
                },
                { data: 'id' },
                { data: 'title' },
                { data: 'description' },
                { data: 'route' },
                { data: 'street_number' },
                { data: 'city' },
                { data: 'state' },
                { data: 'zipcode' }
            ]
        });
    }

    // Submit Action From Delete Button
    $('#delete').submit(function(e) {
        e.preventDefault();
        var deleteID = $('#idDelete').val();
        console.log(deleteID);
        deleteServices(deleteID);
    });

    //Delete Services 
    function deleteServices(id) {
        var id = id;
        //  Call the DELETE Method
        $.ajax({
            url: 'http://findyourservice.com.devel/api/services/' + id,
            type: 'DELETE',
            success: function(result) {
                alert('Service Deleted successfully');

                // Refresh the table
                searchServices();
                $('#idDelete').val('');
            }
        });
    }

});