

$(function () {

    $("#confirm-create-button").click(function () {
        console.log("Create confirmed!!!!!");
		var character_name = $("#char_name").val(),
			character_level = $("#char_level").val(),
			character_money = $("#char_money").val(),
            // JD: Nice that you integrated your roller in here.
			character_class = $("#char_class").data('selection'),
			character_gender = $("#char_gender").val();
		console.log(character_name + ' ' + character_level + ' ' + character_money + ' ' + character_class + ' ' + character_gender);
		
		$.ajax({
            // JD: These options should be indented one more level.
			type: 'POST',
			url: "http://lmu-diabolical.appspot.com/characters",
			data: JSON.stringify({
				name: character_name,
				classType: character_class,
				gender: character_gender,
				level: character_level,
				money: character_money
			}),
			contentType: "application/json",
			dataType: "json",
			accept: "application/json",
			complete: function (jqXHR, textStatus) {
			// The new character can be accessed from the Location header.
			console.log("You may access the new character at:" +
            jqXHR.getResponseHeader("Location"));
        // JD: Need some refresh code here.
			location.reload();
			}
		});

	});
	
	$('#edit-button').click(function(){
		var link = document.getElementById("edit-button").href;
		document.getElementById("edit-button").href = link + document.getElementById("characters").value;
	});

    // JD: Nice integration here, though oddly when it first gets displayed things are
    //     a bit off.  There might be some initial CSS that gets in the way, because
    //     your demo page does not show this problem.
    //     Also, this is an application-specific use of the plugin now, so you can
    //     come up with a better selector than "roller-this" :)
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

    
	
$.getJSON(
	"http://lmu-diabolical.appspot.com/characters",
	function (characters) {
		var characterRowTemplate = '<tr>' +
          '<td><a href="character.html#11111"></a></td>' +
          '<td></td>' +
          '<td></td>' +
          '<td></td>' +
          '<td></td>' +
        '</tr>';
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
