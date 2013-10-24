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

    $("#confirm-create-button").click(function () {
        console.log("Create confirmed!!!!!");
		var character_name = document.getElementById("char_name").value,
			character_level = document.getElementById("char_level").value,
			character_money = document.getElementById("char_money").value,
			character_class = document.getElementById("char_class").value,
			character_gender = document.getElementById("char_gender").value;

		console.log(character_name + ' ' + character_level + ' ' + character_money + ' ' + character_class + ' ' + character_gender);
		
		
		$.ajax({
		type: 'POST',
		url: "http://lmu-diabolical.appspot.com/characters",
		data: JSON.stringify({
        name: character_nsme,
        classType: character_class,
        gender: character_gender,
        level: character_level,
        bits: character_money
    }),
    contentType: "application/json",
    dataType: "json",
    accept: "application/json",
    complete: function (jqXHR, textStatus) {
        // The new character can be accessed from the Location header.
        console.log("You may access the new character at:" +
            jqXHR.getResponseHeader("Location"));
    }
});

});
		
		
		
    });
	var characterRowTemplate = '<tr>' +
          '<td><a href="character.html#11111"></a></td>' +
          '<td></td>' +
          '<td></td>' +
          '<td></td>' +
          '<td></td>' +
        '</tr>';
	
	$.getJSON(
			"http://lmu-diabolical.appspot.com/characters",
			function (characters) {
				// Do something with the character list.
				characters.forEach(function (character) {
					var $characterRow = $(characterRowTemplate);
					$characterRow.find("td:nth-child(1) > a")
						.attr({ href: "character.html#" + character.id })
						.text(character.name);
					$characterRow.find("td:nth-child(2)").text(character.classType);
					$characterRow.find("td:nth-child(3)").text(character.gender.substr(0, 1));
					$characterRow.find("td:nth-child(4)").text(character.level);
					$characterRow.find("td:nth-child(5)").text(character.money);
					$("#characters > tbody").append($characterRow);
				});
			}
		);
