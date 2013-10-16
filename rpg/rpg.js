$(function(){

	$('#configure-delete-button').click(function(){
		console.log("Delete will Happen");
	});
	
});

$(function(){

	$('#edit-button').click(function(){
		var link = document.getElementById("edit-button").href;
		document.getElementById("edit-button").href = link + document.getElementById("characters").value;
	});
	
});

$(function () {

    $("#confirm-delete-button").click(function () {
        console.log("Delete confirmed!!!!!");

        // Now we dismiss the dialog.
        $('#deleteModal').modal('hide');
    });

});
