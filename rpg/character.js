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


$(function (){
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
			console.log(name + ' ' + type + ' ' + gender + ' ' + level + ' ' + money);
			$("#character_name").html(name);
            // JD: This is where we have a slight disconnect, because characters
            //     might not always have your selected classes.  But, even if they
            //     do, your plugin is missing that programmatic connection to set
            //     its value from outside.  You can always accommodate the "outside"
            //     class by resetting the plugin with those choices.
			$("#character_type").html(type);	
			$("#character_gender").html(gender);	
			$("#character_level").html(level);	
			$("#character_money").html(money);
			
			$("#char_name").val(name);
			$("#char_gender").val(gender);
			$("#char_level").val(level);
			$("#char_money").val(money);
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
			
			//For some reason this next line breaks the updating of the HTML
			//window.location.href = "index.html";
		});
        
	});

    $("#confirm-edit-button").click(function () {
        console.log("Edit confirmed!!!!!");
		
		var	string_URL = document.URL,
			split_URL = string_URL.split("#"),
			id = split_URL[1]
			character_name = $("#char_name").val(),
			character_level = $("#char_level").val(),
			character_money = $("#char_money").val(),
            // JD: Another integration, nice.
			character_class = $("#char_class").data('selection'),
			character_gender = $("#char_gender").val(); // All uppercase.
			
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
				location.reload();
			}
		});
		console.log(character_name + ' ' + character_level + ' ' + character_money + ' ' + character_class + ' ' + character_gender);	
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

