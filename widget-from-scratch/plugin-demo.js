$(function () {
    $(".roller-this").roller({
	values: {
		front: 'val1',
	},
        change: function (oldAngle, newAngle) {
            console.log("Rolled from " + oldAngle + " to " + newAngle);
        }
    });
});
