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
	var setRollerValues = function ($element, displacement, position, sliceCount) {
		var height = $element.height(),
            estCircumference = height * sliceCount*1.5,
            estRadius = estCircumference / (2 * Math.PI),
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
        $this
            .data('selectionIndex', 0)
            .data('selection', values[0]);

        // For each element in the value array, create a new div.
        var increment = 360 / values.length;
        values.forEach(function (value, index) {
            var $choice = $("<div id = option" + index + "></div>").text(value).addClass("roller")
                .mousedown(function (event) {
                    $current = $(this);
                    anchorY = event.screenY - ($current.data('roller-angle') || 0);
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
			.mousemove(function (event) {
				if ($current) {
					var currentAngle = $current.data('roller-angle') || 0,
						newAngle = event.screenY - anchorY,
						newPosition,
						increment = 360 / values.length,
						addedAngle,
						area = ($current).parent();
					children = $this.find("div");
					numberOfChildren = children.length;

					//Cant get the individual elements.
					$this.find("div").each(function (index, element) {
						var $choice = element;
						alert($choice.textContent);
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

					if ($.isFunction(options.change)) {
						options.change.call($current, currentAngle, newAngle);
					}
				}
			})
			.mouseup(function (event) {
				/*if($current){
					var clippedAngle = Math.abs(($current.data('roller-angle') || 0) % 360);
					
					values.forEach(function (value, index) {
						var $choice = $("<div></div>").text(value).addClass("roller")
						.mousedown(function (event) {
							$current = $(this);
							anchorY = event.screenY - ($current.data('roller-angle') || 0);
						});
						$this.append($choice);
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
					
					setRollerValues($current, (clippedAngle < 270 && clippedAngle > 90) ? -180 : 0, 0 , values.length);
				}*/
				$current = null;
			});
    };
}(jQuery));
