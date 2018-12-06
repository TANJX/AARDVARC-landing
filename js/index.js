
function jumpto(div) {
    var target = $(div);
    var distance = Math.abs(target.offset().top - $(document).scrollTop()) / screen.height;
    $('html, body').animate({
        scrollTop: target.offset().top
    }, 1200, "easeOutExpo", function () {
        // Callback after animation
        // Must change focus!
        target.focus();
        if (target.is(":focus")) { // Checking if the target was focused
            return false;
        } else {
            target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            target.focus(); // Set focus again
        }
    });
}
