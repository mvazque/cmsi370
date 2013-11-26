/*
  A sample jQuery plug-in: this one converts the selected elements into a 3D
  “roller” control.

  This plugin's options object can include:

    change: function () { }
    - Callback for whenever the control has been manipulated.
*/
/*Create multiple elements that remain hidden and called based on order and relationship to current element. When current
element reaches 90 degrees(or whatever element makes it invisible) it stays that way and the current element is replaced
by the element next to it which begins to string the element next to it and repeats the cycle this is to be done*/
(function ($) {
    // Private plugin helpers.
	var setRollerValues = function ($element,angle){
		var newCss = "perspective(500px) rotateY(" + angle + "deg) /*rotate(180deg)*/",
		    offset = $element.offset(),
		    left = offset.left,
		    right = $element.width() + left,
		    top = offset.top;
		$element.css({
			'-moz-transform':newCss,
			'-webkit-transform':newCss
		}).data({
			'roller-angle':angle
		});

		$element.offset({
						left: left,
						top: top
					})
	};
    $.fn.roller = function (options) {
        var $this = this,
            $current = null,
            anchorX = 0,
	    back = 'Muffins',
	    front = options.values ?
		(options.values.front || 'front') : 'front';

        $this.addClass("roller")
	    .text(front)
            .mousedown(function (event) {
                $current = $(this);
                anchorX = event.screenX - ($current.data('roller-angle') || 0);
		
            });

        // Other mouse events go at the level of the document because
        // they might leave the element's bounding box.
        $(document)
            .mousemove(function (event) {
                if ($current) {
                    var currentAngle = $current.data('roller-angle') || 0,
                        newAngle = event.screenX - anchorX,
			newPosition,
			angleSign = 1;
			
					setRollerValues($current, newAngle);

					var clippedAngle = Math.abs(newAngle % 360);
				
					$current.text(clippedAngle < 270 && clippedAngle > 90 ? back : front);
                    // Invoke the callback.
                    if ($.isFunction(options.change)) {
                        options.change.call($current, currentAngle, newAngle);
                    }
                }
            })
            .mouseup(function (event) {
				if($current){
					var clippedAngle = Math.abs(($current.data('roller-angle') || 0) % 360);
					setRollerValues($current, (clippedAngle < 270 && clippedAngle > 90) ? -180 : 0);
				}
                $current = null;
            });
    };
}(jQuery));
