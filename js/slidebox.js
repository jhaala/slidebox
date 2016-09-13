var slideboxElement = '.slidebox', // The class of the slidebox element(s). This element will wrap around an inner element.
    slideboxInnerElement = '.slidebox-content', // The class of the above inner slidebox element. This is the moving piece of the slidebox.
    swipeDistanceDefault = 100, // distance the box needs to slide
    swipeDistanceType = 'px', // units for swipe distance (px or %)
    swipeRDistance = swipeDistanceDefault, // distance that the slidebox element will be swiped to the right
    swipeLDistance = swipeDistanceDefault, // distance that the slidebox element will be swiped to the left
    swipeDelay = 200, // Delay in ms
    swipeActionClass = 'swiped'; // Class prefix used to append left/right swipes for. Used mainly for styling purposes.

$(document).ready(function() {
    $(slideboxElement).on('swipeleft', function(event) {
        var slideboxId = getSlideboxId($(this));

        slideboxSwipe(event, 'left', slideboxId);
    });

    $(slideboxElement).on('swiperight', function(event) {
        var slideboxId = getSlideboxId($(this));
        
        slideboxSwipe(event, 'right', slideboxId);
    });

    $(slideboxInnerElement).click(function(event) {
        var swipeEvent = false; // Default value

        $(slideboxElement).on('swipe', function(event) {
            swipeEvent = true;
            event.stopImmediatePropagation();
            return false;
        });
        if (! swipeEvent) {
            var parentElement = $(this).closest(slideboxElement);
            if (parentElement.hasClass(swipeActionClass+'-left') || parentElement.hasClass(swipeActionClass+'-right')) {
                // Reset slidebox on-click
                resetSlideboxes();
                event.stopImmediatePropagation();
                return false;
            } else {
                // Link click
            }
        }
    });
})

function slideboxSwipe(event, swipeDirection, slideboxId) {
    var slidebox = getSlidebox(slideboxId),
        slideboxContent = getSlideboxSlider(slideboxId),
        newSwipeClass = swipeActionClass+'-'+swipeDirection;

    if (swipeDirection === 'left') {
        var swipeDistance = swipeLDistance + swipeDistanceType,
            swipeDistanceL = "-"+ swipeDistance,
            swipeDistanceR = swipeDistance,
            swipeReveal = 'r'; // Swipe left will reveal right element
    } else {
        var swipeDistance = swipeRDistance + swipeDistanceType,
            swipeDistanceL = swipeDistance,
            swipeDistanceR = "-"+ swipeDistance,
            swipeReveal = 'l'; // Swipe right will reveal left element
    }

    console.log(swipeReveal);
    // Slide element if it a reveal element exists
    if ($('[data-slidebox-reveal-'+swipeReveal+'="'+slideboxId+'"]').length) {
        resetSlideboxes();

        if (! slidebox.hasClass(newSwipeClass)) {
            slidebox.addClass(newSwipeClass);
            slideboxContent.animate({
                left:  swipeDistanceL,
                right: swipeDistanceR
            }, swipeDelay);
        }
    }

    event.stopImmediatePropagation();
}

function getSlideboxId(activeElement) {
    return activeElement.attr('data-slidebox-id');
}

function getSlidebox(slideboxId) {
    return $('[data-slidebox-id="'+slideboxId+'"]');
}

function getSlideboxSlider(slideboxId) {
    return $('[data-slidebox-content="'+ slideboxId +'"]');
}

function resetSlideboxes() {
    // Remove any active classes
    $(slideboxElement).removeClass(swipeActionClass+'-left').removeClass(swipeActionClass+'-right');

    // Reset to default positioning
    $(slideboxInnerElement).animate({
        left:  0,
        right: 0
    }, swipeDelay);
}
