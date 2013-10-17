$(function () {

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