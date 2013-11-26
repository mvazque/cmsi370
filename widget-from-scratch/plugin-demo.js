$(function () {
    $(".roller-this").roller({
        change: function (oldAngle, newAngle) {
            console.log("Rolled from " + oldAngle + " to " + newAngle);
        }
    });
});
