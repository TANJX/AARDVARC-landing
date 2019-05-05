function jumpto(div) {
  const target = $(div);
  const distance = Math.abs(target.offset().top - $(document).scrollTop()) / screen.height;
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

// HERO PREVIEW
(function () {
  const TEXT = [
    'Departmental administrator provides a personal link for faculty/course coordinators to create their syllabi.',
    'Faculty complete their syllabi through the portal web-based with general course information already pre-populated (course prefix, number, title, section number, and units).',
    'After filling in all sections of the syllabus template, the syllabus is automatically generated within the University&rsquo;s standard syllabus template, with most up-to-date policies/ procedures and USC branding.',
    'Administrators have a copy of the syllabus (.doc and .pdf) in one centralized area. Administrators can easily monitor the progress of syllabi and send reminders, to faculty as needed.',
    'Administrators have a copy of the syllabus (.doc and .pdf) in one centralized area. Administrators can easily monitor the progress of syllabi and send reminders, to faculty as needed.',
    'Administrators manage department faculties and assign them as course instructors.',
    'Administrators manage department faculties and assign them as course instructors.',
    'All data produced from the syllabi are directly connected to a &ldquo;live&rdquo; database. Any updates to syllabi will immediately appear in reports viewed by administrators.',
  ];

  let hero_preview_img = document.getElementsByClassName('hero-preview-img')[0];
  hero_preview_img.onload = function () {
    $('.browser').addClass('fadeInUp');
    $('.browser-controller').addClass('fadeIn');
  };
  hero_preview_img.src = 'img/preview-1.png';

  const $cards = $('.control-card');
  const $text = $('.preview-info > p');
  const $demo = $('.preview-info > a');

  $cards.click(function () {
    const i = parseInt($(this).find('.index').html());
    hero_preview_img.src = `img/preview-${i}.png`;
    $text.html(TEXT[i - 1]);
    $cards.removeClass('selected');
    this.classList.add('selected');
    i <= 3 ? $demo.removeClass('hide') : $demo.addClass('hide');
  })
})();

// news
(function () {
  const NEWS = [
    {
      date: 'February 8, 2019',
      content: 'Presented at Center for Excellence in Teaching (CET) Instructional Design Advisory Group'
    },
    {
      date: 'February 11, 2019',
      content: 'Presented to the USC Annenberg School for Communication and Journalism'
    },
    {
      date: 'February 27, 2019',
      content: 'Presented at a Teaching Deans meeting with Ginger Clark, Assistant Vice Provost for Academic and Faculty Affairs and other faculty involved with implementing the new excellence in teaching initiative'
    },
    {
      date: 'March 5, 2019',
      content: 'Presented to the USC Rossier School of Education'
    },
    {
      date: 'March 6, 2019',
      content: 'Meeting with Ingrid Steiner, Instructional Designer at the Center for Excellence in Teaching, focused on making AARDVARC© WCAG (Web Content Accessibility Guidelines) compatible.'
    },
    {
      date: 'April 11, 2019',
      content: 'Meeting with Mark Todd, Vice Provost for Academic Operations, Greg Condell, Vice President of Finance, and USC’s Academic Senior Business Officers to discuss how AARDVARC can be used to help inform financial/business operations'
    },
    {
      date: 'July 13, 2019 - July 17, 2019',
      content: 'Selected to present at 2019 <a href="https://www.aacp.org/events/annual-meetings" target="_blank">AACP Annual Meeting</a> in Chicago, IL'
    },
  ];

  NEWS.reverse();

  let current = 0;
  const $content = $('.news-content');
  const $date = $('.news-date');
  const $prev = $('.prev-news');
  const $next = $('.next-news');

  update();

  $prev.click(() => {
    if (current === 0) return;
    current--;
    update();
  });

  $next.click(() => {
    if (current === NEWS.length - 1) return;
    current++;
    update();
  });

  function update() {
    if (current === 0) {
      $prev.addClass('hide');
    } else if (current === NEWS.length - 1) {
      $next.addClass('hide');
    } else {
      $next.removeClass('hide');
      $prev.removeClass('hide');
    }
    $content.html(NEWS[current].content);
    $date.html(NEWS[current].date);
  }
})();

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
