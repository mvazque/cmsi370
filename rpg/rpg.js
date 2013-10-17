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
		
		var element=document.getElementById("characters");
			element.remove(element.selectedIndex);
		
        // Now we dismiss the dialog.
        $('#deleteModal').modal('hide');
    });

});

$(function () {

    $("#confirm-create-button").click(function () {
        console.log("Create confirmed!!!!!");
		var character_name = document.getElementById("char_name").value;
		jQuery("#characters").append('<option value="' + character_name + '">' + character_name + '</option>');
		console.log(character_name);
		$('#createModal').modal('hide');
    });

});
