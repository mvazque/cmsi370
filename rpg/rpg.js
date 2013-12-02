
// JD: Why are these broken up into different functions?
//     They can all go in the same one.

$(function () {

    $("#confirm-create-button").click(function () {
        console.log("Create confirmed!!!!!");
        // JD: Why are you using getElementById instead of $("#.....")?
		var character_name = document.getElementById("char_name").value,
			character_level = document.getElementById("char_level").value,
			character_money = document.getElementById("char_money").value,
			character_class = document.getElementById("char_class").value,
			character_gender = document.getElementById("char_gender").value;
		//console.log(character_name + ' ' + character_level + ' ' + character_money + ' ' + character_class + ' ' + character_gender);
		
		
		/*$.ajax({
            // JD: These options should be indented one more level.
			type: 'POST',
			url: "http://lmu-diabolical.appspot.com/characters",
			data: JSON.stringify({
				name: character_name, // JD: Watch out!!!  This typo alone ruins your Ajax call.
				classType: character_class,
				gender: character_gender, // JD: Well, this too: gender must be all uppercase.
				level: character_level,
				money: character_money
			}), // JD: Indent goes from bad to worse here.
			contentType: "application/json",
			dataType: "json",
			accept: "application/json",
			complete: function (jqXHR, textStatus) {
			// The new character can be accessed from the Location header.
			console.log("You may access the new character at:" +
            jqXHR.getResponseHeader("Location"));
        // JD: Need some refresh code here.
			}
		});*/

	});
	
	$('#edit-button').click(function(){
		var link = document.getElementById("edit-button").href;
		document.getElementById("edit-button").href = link + document.getElementById("characters").value;
	});
	
	$(".roller-this").roller({
        values: [
            "Brawler",
            "Wizard",
            "Assassin",
            "Sword Wielder",
            "Recon"
        ],

    });
		
		
});

    // JD: This block is orphaned---it should be inside a $(function () { }); block too.
    //     The effect is subtle, so it is not super bad, but if you follow along the
    //     sample code more closely you would have seen that all of our JavaScript has
    //     been placed in such a function.
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
