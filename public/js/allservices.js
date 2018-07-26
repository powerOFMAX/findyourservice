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
                data: 'id'
            }, {
                data: 'title'
            }, {
                data: 'description'
            }, {
                data: 'route'
            }, {
                data: 'street_number'
            }, {
                data: 'city'
            }, {
                data: 'state'
            }, {
                data: 'zipcode'
            }, {
                data: 'action',
                name: "action",
                searchable: false,
                sortable: false
            }]
        });
    }

    // Delete Button from Table On Click Event
    $(document).on('click', '.del', function(e) {
        e.preventDefault();
        var id = $(this).attr("id");
        deleteServices(id);
    });

    //Delete Services 
    function deleteServices(id) {
        if (confirm("Are you sure you want to remove this?")) {
            $.ajax({
                url: 'http://findyourservice.com.devel/api/services/' + id,
                type: 'DELETE',
                success: function() {
                    $('#alert_message').html('<div class="alert alert-success">' + 'Service Deleted Successfully' + '</div>');
                    $('#tableServices').DataTable().destroy();
                    searchServices();
                }
            });
            setInterval(function() {
                $('#alert_message').html('');
            }, 5000);
        }
    }
});