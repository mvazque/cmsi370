// Big things have small beginnings...
<<<<<<< HEAD
//$(function () {
//    $("#delete-button").popover({ placement: 'left' });
//});

$(function(){

	$('#configure-delete-button').click(function(){
		console.log("Delete will Happen");
	});
	
});
=======
$(function () {

    $("#confirm-delete-button").click(function () {
        console.log("Delete confirmed!!!!!");

        // Now we dismiss the dialog.
        $('#deleteModal').modal('hide');
    });

});
>>>>>>> 7bfe4bd00b9b9df98b44009658ed2f200488bc74
