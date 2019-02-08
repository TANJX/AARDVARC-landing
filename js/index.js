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

// carousel
(function () {
    let $el = $('#carouselControls');
    $el.on('slid.bs.carousel', function () {
        let group = $('.carousel-item.active').attr('group');
        $('.preview .controls div button').removeClass('selected');
        $('.preview .controls div button[group="' + group + '"]').addClass('selected');
    });
    $('.preview .controls div button').click(function () {
        let group = $(this).attr('group');
        let index = $('.preview .carousel-inner [group="' + group + '"]').index();
        console.log(group + " " + index);
        $el.carousel(index);
    });
    $el.carousel('pause');
})();


// swiping for the carousel
(function () {
    let startPos;
    let time = -1;
    let currentPos;

    let $el = $('.show');
    let $carousel = $('#carouselControls');

    $el.on('touchstart', function (e) {
        time = Date.now();
        startPos = e.originalEvent.touches[0].pageX;
    });
    $el.on('touchend', function (e) {
        console.log('touchend');
        let now = Date.now();
        if (time > 0 && now - time < 1000) {
            if (currentPos - startPos > 50) {
                console.log('Swipe Right!!!');
                $carousel.carousel('prev');
            } else if (startPos - currentPos > 50) {
                console.log('Swipe Left!!!');
                $carousel.carousel('next');
            }
        }
        time = -1;
    });
    $el.on('touchmove', function (e) {
        currentPos = e.originalEvent.touches[0].pageX;
    });

})();
