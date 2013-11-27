$(function () {
    $(".roller-this").roller({
        values: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],

        change: function (oldAngle, newAngle) {
            console.log("Rolled from " + oldAngle + " to " + newAngle);
        }
    });
});
