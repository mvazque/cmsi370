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
		value:"Sunday",

        // JD: Here's where you could have used a little more of an adjustment---
        //     with this widget, you are no longer concerned as much about the
        //     angle as you are about the actual selected *value* (in this
        //     particular instance, this would be Sunday, Monday, etc.).
        change: function (oldAngle, newAngle) {
            console.log("Rolled from " + oldAngle + " to " + newAngle);
        }
    });
});
