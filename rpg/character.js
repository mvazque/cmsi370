$(function () {
    // JD: Decent mock random item functionality here.
    $("#inventory_Add").click(function () {
        console.log("New Item!!!!!");
		var ranks = new Array(),
			items = new Array(),
			random_rank,
			random_item,
			item_String;
		ranks[0] = "Legen, wait for it, dary";
		ranks[1] = "Australian";
		ranks[2] = "Generic";
		ranks[3] = "Face-Melting";
		ranks[4] = "20% Cooler";
		
		items[0] = "Mace";
		items[1] = "Double-edged Sword";
		items[2] = "Lockpick";
		items[3] = "Fairy";
		items[4] = "Water Pouch";
		items[5] = "Boomerang";
		items[6] = "Bow";
		items[7] = "Rope";
		items[8] = "Gauntlets";
		items[9] = "Helmet";
		
		random_rank = Math.floor(Math.random()*ranks.length);
		random_item = Math.floor(Math.random()*items.length);
		item_String = ranks[random_rank]+ ' ' + items[random_item];
		
		jQuery("#inventory").append('<option value="' + item_String + '">' + item_String + '</option>');
    });
});

// JD: Unnecessary top-level function block again.  Plus this function
//     has an unnecessary name (character_update).
$(function character_update(){
	var	string_URL = document.URL,
		split_URL = string_URL.split("#"),
		id = split_URL[1];
	$.getJSON(
    "http://lmu-diabolical.appspot.com/characters/" + id,
    function (character) {
        // Do something with the character.
		var	name = character.name,
			type = character.classType,
			gender = character.gender,
			level = character.level,
			money = character.money;
        // JD: Ditto question in rpg.js about getElementById vs. $("#....").
        //     Plus you should surround your "=" with spaces for readability.
		document.getElementById("character_name").innerHTML = name;	
		document.getElementById("character_type").innerHTML = type;	
		document.getElementById("character_gender").innerHTML = gender;	
		document.getElementById("character_level").innerHTML = level;	
		document.getElementById("character_money").innerHTML = money;	
        console.log(character);
    });

});

$(function () {
    $("#confirm-delete-button").click(function () {
        console.log("Delete confirmed!!!!!");
		var	string_URL = document.URL,
			split_URL = string_URL.split("#"),
			id = split_URL[1];	
		
		$.ajax({
			type: 'DELETE',
			url: "http://lmu-diabolical.appspot.com/characters/" + id,
			success: function (data, textStatus, jqXHR) {
                // JD: The code below should be indented to this level.
				console.log("Gone baby gone.");
			}
			// JD: This reload is in the wrong place: remember that the Ajax
			//     call is *asynchronous*---you may end up reloading before the
			//     DELETE actually takes place.
			window.location.href = "index.html";
		});
        
	});
});

// JD: For user convenience, you need some dialog pre-fill code here.
$(function () {
    $("confirm-edit-button").click(function () {
        console.log("Edit confirmed!!!!!");
		var	string_URL = document.URL,
			split_URL = string_URL.split("#"),
			id = split_URL[1];	
		
		var character_name = document.getElementById("char_name").value,
			character_level = document.getElementById("char_level").value,
			character_money = document.getElementById("char_money").value,
			character_class = document.getElementById("char_class").value,
			character_gender = document.getElementById("char_gender").value; // All uppercase.
			
		$.ajax({
			type: 'PUT',
			url: "http://lmu-diabolical.appspot.com/characters/" + id,
			data: JSON.stringify({
				id: id,
				name: character_name,
				classType: character_class ,
				gender: character_gender,
				level: character_level,
				money: character_money
			}),
            // JD: More indentation inappropriateness here...
			contentType: "application/json",
			dataType: "json",
			accept: "application/json",
			success: function (data, textStatus, jqXHR) {
			console.log("Done: no news is good news.");
            // JD: How about updating the page?
			window.location.href = "index.html";
			}
		});
		
	});
});

