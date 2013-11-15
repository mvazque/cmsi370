var	cache = {};
$(function(){
	
	
	window.BoxesTouch = {
		/**
		 * Sets up the given jQuery collection as the drawing area(s).
		 */
		setDrawingArea: function (jQueryElements) {
			// Set up any pre-existing box elements for touch behavior.
			jQueryElements
				.addClass("drawing-area")
				
				// Event handler setup must be low-level because jQuery
				// doesn't relay touch-specific event properties.
				.each(function (index, element) {
					element.addEventListener("touchstart", BoxesTouch.startCreate, false);
					element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
					element.addEventListener("touchend", BoxesTouch.endDrag, false);
				})

				.find("div.box").each(function (index, element) {
					element.addEventListener("touchstart", BoxesTouch.startMove, false);
					element.addEventListener("touchend", BoxesTouch.unhighlight, false);
				});
		},
		
		startCreate: function (event){
			$.each(event.changedTouches, function(index,touch){
				var	cacheEntry = new Object(),
					touchIndex = touch.identifier;
				cacheEntry.initialX = touch.pageX;
				cacheEntry.initialY = touch.pageY;
				cache[touchIndex] = cacheEntry;
				var	createdBox = '<div class="box"style="width: 0px; height: 0px; left: '+ touch.pageX +'px; top: '+ touch.pageY + 'px">' + 
					'</div>';
				$("#drawing-area").append(createdBox);
				(cache[touchIndex].creatingbox) = $( "div div:last-child" );
				//cache[touchIndex].creatingbox.addClass("box-createHighlight");
				$("#drawing-area").find("div.box").each(function (index, element) {
					element.addEventListener("touchstart",BoxesTouch.startMove, false);
					element.addEventListener("touchend", BoxesTouch.unhighlight, false);
				});
			})
			event.stopPropogation;
		},
		
		/**
		 * Tracks a box as it is rubberbanded or moved across the drawing area.
		 */
		trackDrag: function (event) {
			$.each(event.changedTouches, function (index, touch) {
				// Don't bother if we aren't tracking anything.
				var target = touch.target,
					touchIndex = touch.identifier;
				if (target.movingBox) {
					// Reposition the object.
					target.movingBox.offset({
						left: touch.pageX - target.deltaX,
						top: touch.pageY - target.deltaY
					});
				
					area = $(target.movingBox).parent();
					boxWidth = target.movingBox.width();
					boxHeight = target.movingBox.height();
					areaOff = area.offset();
					areaRight = areaOff.left + area.width();
					areaBottom = areaOff.top + area.height();
					off = $(target).offset();
				
					if(off.left > areaRight || off.top > areaBottom || 
						off.left < areaOff.left - boxWidth || off.top < areaOff.top - boxHeight) {
						$(target).removeClass("box-highlight");
						$(target).addClass("box-deleteHighlight");
					} else{
						$(target).removeClass("box-deleteHighlight");
						$(target).addClass("box-highlight");
					}
				}
				else {
					var	newLeft, newTop, newWidth, newHeight;
					if (touch.pageX < cache[touchIndex].initialX) {
						newLeft = touch.pageX;
						newWidth = cache[touchIndex].initialX-touch.pageX;
						if (touch.pageY < cache[touchIndex].initialY){
							newTop = touch.pageY;
							newHeight = cache[touchIndex].initialY - touch.pageY;
						} else{
							newTop = cache[touchIndex].initialY;
							newHeight = touch.pageY - cache[touchIndex].initialY;
						}
					} else {
						newLeft = cache[touchIndex].initialX;
						newWidth = touch.pageX-cache[touchIndex].initialX;
						if (touch.pageY < cache[touchIndex].initialY){
							newTop = touch.pageY;
							newHeight = cache[touchIndex].initialY - touch.pageY;
						} else{
							newTop = cache[touchIndex].initialY;
							newHeight = touch.pageY - cache[touchIndex].initialY;
						}
					}
					cache[touchIndex].creatingbox
						.offset({
							left: newLeft,
							top: newTop
						})
						.width(newWidth)
						.height(newHeight);
				}
			// Don't do any touch scrolling.
			event.preventDefault();
			});
		},

		/**
		 * Concludes a drawing or moving sequence.
		 */
		endDrag: function (event) {
			$.each(event.changedTouches, function (index, touch) {
				if (touch.target.movingBox) {
					// Change state to "not-moving-anything" by clearing out
					// touch.target.movingBox.
					touch.target.movingBox = null;
				}
				else{
					var touchIndex = touch.identifier;
					if(cache[touchIndex].creatingbox.hasClass("box-deleteHighlight")){
						alert('chimicherrychanga');
					}
					cache[touchIndex].creatingbox.removeClass("create-highlight");
					cache[touchIndex].creatingbox = null;
					delete cache[touchIndex];
				}
				alert(cache[touchIndex]);

			});
		},

		/**
		 * Indicates that an element is unhighlighted.
		 */
		unhighlight: function () {
			$(this).removeClass("box-highlight");
			if($(this).hasClass("box-deleteHighlight")){
				$(this).remove();
			}
		},

		/**
		 * Begins a box move sequence.
		 */
		startMove: function (event) {
			$.each(event.changedTouches, function (index, touch) {
				// Highlight the element.
				
				$(this).removeClass("box-deleteHighlight");
				$(touch.target).addClass("box-highlight");
				// Take note of the box's current (global) location.
				var jThis = $(touch.target),
					startOffset = jThis.offset();

				// Set the drawing area's state to indicate that it is
				// in the middle of a move.
				touch.target.movingBox = jThis;
				touch.target.deltaX = touch.pageX - startOffset.left;
				touch.target.deltaY = touch.pageY - startOffset.top;
			});

			// Eat up the event so that the drawing area does not
			// deal with it.
			event.stopPropagation();
		}

	};
});	