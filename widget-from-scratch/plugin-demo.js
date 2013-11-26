$(function () {
    $(".roller-this").roller({
	values: {
		front: 'female',
		back: 'male'
	},
        change: function (oldAngle, newAngle) {
            //console.log("Rolled from " + oldAngle + " to " + newAngle);
        }
    });
});
