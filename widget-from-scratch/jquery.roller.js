/*
  A sample jQuery plug-in: this one converts the selected elements into a 3D
  “roller” control.

  This plugin's options object can include:

    change: function () { }
    - Callback for whenever the control has been manipulated.
*/
// JD: ^^^Oops, didn't quite update this with your value and values properties.
(function ($) {
    // Private plugin helpers.
	var setRollerValues = function ($element, displacement, position, sliceCount) {
		var height = $element.height(),
            estCircumference = height * sliceCount*1.5, // JD: Need space around the second *.
            estRadius = estCircumference / (2 * Math.PI),
            // JD: You can break this up at the +'s to span multiple lines, for better readability.
            newCss = "perspective(500px) rotateX(" + displacement + "deg) rotateX(" + position + "deg) translateZ(" + estRadius + "px)";
			
		$element.css({
			'-moz-transform': newCss,
			'-webkit-transform': newCss
		}).data({
			'roller-angle': displacement
		});
	};

    $.fn.roller = function (options) {
        var $this = this,
            $current = null,
            anchorY = 0,
            values = options.values || [ "1", "2", "3", "4" ];

        // Initial selection index.
        // JD: See, we do store the selection index and value; this should have gone in your
        //     callback parameters too.
        $this
            .data('selectionIndex', 0)
            .data('selection', values[0]);
        // JD: ^^^No big deal, but just so you know, .data() has a shortcut when you are
        //     setting multiple values.  It looks like this:
        //
        //     $this.data({
        //         selectionIndex: 0,
        //         selection: values[0]
        //     });
        //
        //     i.e., jQuery can take an object instead of individual key-value.

        // For each element in the value array, create a new div.
        var increment = 360 / values.length;
        values.forEach(function (value, index) {
            var $choice = $("<div value = "+ value + "></div>").text(value).addClass("roller")
                .mousedown(function (event) {
                    // JD: There is some "noise" between the data you are storing in mousedown
                    //     and the way these are used in mousemove, indicated by the "jump" that
                    //     takes place in the displayed selections.  Real-world usage-wise, this
                    //     is a showstopper, but for this assignment, because you took on something
                    //     with a greater level of difficulty, I can let this one pass.
                    $current = $(this);
                    anchorY = 360 - (event.screenY - ($current.data('roller-angle') || 0)) % 360;
                });
            $this.append($choice);
            setRollerValues($choice, 0, index * increment, values.length);
			if(index * increment > 90 && index * increment < 270){
				$choice.css({
					opacity : 0
				});
			}
        });

        //Other mouse events go at the level of the document because
        //they might leave the element's bounding box.
		$(document)
            // JD: As I play with your roller more, I think in the end the best user event
            //     to process is scroll wheel movement.  I didn't do that in class, but the
            //     information is certainly available on the web.  Would have been a nice
            //     self-teaching exercise for you.
			.mousemove(function (event) {
				if ($current) {
					var currentAngle = $current.data('roller-angle') || 0,
						newAngle = (360 - (event.screenY - anchorY)) % 360,
						increment = 360 / values.length,
						addedAngle;

					//Cant get the individual elements.
                    // JD: ^^^Wait, we solved this, right?  At least from below it looks
                    //     like we did.
					$this.find("div").each(function (index, element) {
						var $choice = $(element);
						setRollerValues($choice, newAngle, index * increment, values.length);
						addedAngle = (index * increment + newAngle)%360;
						if(addedAngle > 90 && addedAngle < 270){
							$choice.css({
								opacity : 0
							});
						}
						else{
							$choice.css({
								opacity : 1
							});
						}
					});

                    // JD: So here, after finalizing the angle, the plugin should determine
                    //     the resulting selection then use that for the callback instead.
                    //     You will use this computation again, so it's worthwhile to make
                    //     it a function (e.g., "getSelectionFromAngle" or something like
                    //     that).
					if ($.isFunction(options.change)) {
						options.change.call($current, currentAngle, newAngle);
					}
				}
			})
			.mouseup(function (event) {
                // JD: Oops, missed some spacing here.
				if($current){
                    // JD: So there is some overlap here with the mousemove logic.
                    //     You'll want to study these and find points of consolidation,
                    //     so that future adjustments wouldn't need to be made in more
                    //     than one place.
					var increment = 360 / values.length,
						addedAngle,
						displacementAngle,
						indexOffset = 0,
						newAngle = (360 - (event.screenY - anchorY)) % 360,
						indexOffset = Math.round((newAngle % 360) /increment);

					$this.find("div").each(function (index, element) {
						var $choice = $(element);
						displacementAngle = ((indexOffset) * increment) % 360;
						setRollerValues($choice, displacementAngle, index * increment, values.length);
						addedAngle = (index*increment + displacementAngle)%360;
						if(addedAngle > 90 && addedAngle < 270){
							$choice.css({
								opacity : 0
							});
						}
						else{ // JD: This is more conventionally done in one line: } else {
							$choice.css({
								opacity : 1
							});
						}
                        // JD: So here, more or less, is your "getSelectionFromAngle" :)
						if(addedAngle == 0){
							$this
								.data('selectionIndex', index)
								.data('selection', $choice.text());
						}
					});
                    
                    // JD: It's useful to invoke the callback here also, to give
                    //     a final-final value to the caller.
				}
				$current = null;
			});
    };
}(jQuery));
