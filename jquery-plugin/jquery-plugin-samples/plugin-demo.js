$(function () {
    $(".swivel-this").swivel({
        change: function (oldAngle, newAngle) {
            console.log("Swiveled from " + oldAngle + " to " + newAngle);
        }
    });
});
