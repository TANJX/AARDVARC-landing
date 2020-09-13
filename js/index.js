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

/*

// menu scroll

(function () {
  const $logo = $('header .logo-div');
  const $header = $('header.logo-header');
  const $preview = $('.preview');

  function update() {
    let scroll = $(window).scrollTop();
    let offset = $preview.offset();
    let pos = offset.top - scroll;
    if (pos < -110) {
      $logo.css('opacity', '1');
      $header.addClass('fixed');
      setTimeout(function () {
        $header.addClass('show');
      }, 10);
    } else {
      $logo.css('opacity', '0');
      $header.removeClass('show');
      setTimeout(function () {
        $header.removeClass('fixed');
      }, 400);
    }
  }

  // update();

  // $(document).scroll(update);
})();

*/

// Redirected from Contact

(function () {
  const url = window.location.href;
  if (url.match('/success')) {
    // correct url
    history.replaceState(null, null, url.replace('/success', ''));

    const $card_wrapper = $('.card-wrapper');
    const $card = $card_wrapper.find('.contact-success-card');
    $card_wrapper.show();
    const $body = $('body');
    $body.addClass('body-lock');

    // click handler to return to index page
    $(document).click(function (e) {
      const target = e.target;
      console.log(target);
      if (!$(target).is('.contact-success-card') && !$(target).parents().is('.contact-success-card')) {
        hide();
      }
    });
    $card_wrapper.find('button').click(() => hide());

    function hide() {
      $body.removeClass('body-lock');
      $card_wrapper.addClass('fadeOut');
      $card.addClass('cardDrop');
      setTimeout(function () {
        $card_wrapper.hide();
      }, 1200);
    }
  }
})();


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
    $('.browser:not(.pdf-browser)').addClass('fadeInUp');
    $('.browser-controller').addClass('fadeIn');
    $('.preview-info').addClass('fadeIn');
    loadImages();
  };

  hero_preview_img.src = 'img/preview-1.png';
  hero_preview_img.style.zIndex = '2';

  const $cards = $('.control-card');
  const $text = $('.preview-info > p');
  const $demo = $('.preview-info > a');
  const $img_div = $('.content-pane');
  const $pdf = $('.pdf-browser');

  $text.html(TEXT[0]);

  function loadImages() {
    for (let i = 2; i <= 8; i++) {
      const img = new Image();
      img.src = `img/preview-${i}.png`;
      img.classList.add('hidden');
      // $img_div.append(img);
    }
  }

  let in_transition_img = null;
  let current = 1;

  function switchTo(i) {
    if (!in_transition_img) {
      const $old_img = $('.content-pane img:first-of-type');
      in_transition_img = $old_img;
      $old_img.fadeOut(300, function () {
        $(this).remove();
        img.style.zIndex = '2';
        in_transition_img = null;
      });
    } else {
      $('.content-pane img:not(:first-of-type)').remove();
    }

    // image
    const img = new Image();
    img.src = `img/preview-${i}.png`;
    $img_div.append(img);

    // text
    $text.html(TEXT[i - 1]);
    i <= 3 ? $demo.removeClass('hide') : $demo.addClass('hide');

    // card
    $cards.removeClass('selected');
    $cards[i - 1].classList.add('selected');

    // pdf preview
    if (i === 3) {
      setTimeout(function () {
        if (current === 3) {
          $pdf.addClass('fadeInUp');
        }
      }, 1500);
    } else {
      $pdf.removeClass('fadeInUp');
    }
    current = i;
  }

  $cards.click(function () {
    const i = parseInt($(this).find('.index').html());
    switchTo(i);
  });

  $('.browser .link-bar img.prev').click(function () {
    if (current > 1) {
      switchTo(current - 1);
    }
  });

  $('.browser .link-bar img.next').click(function () {
    if (current < 8) {
      switchTo(current + 1);
    }
  });

  $('.pdf-browser .red-btn').click(function () {
    $pdf.removeClass('fadeInUp');
  });


})();


// news
(function () {
  const NEWS = [
    {
      date: 'February 8, 2019',
      content: 'Presented to the Center for Excellence in Teaching (CET) Instructional Design Advisory Group'
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
      content: 'Met with Ingrid Steiner, Instructional Designer at the Center for Excellence in Teaching, focused on making AARDVARC© WCAG (Web Content Accessibility Guidelines) compatible.'
    },
    {
      date: 'April 11, 2019',
      content: 'Met with Mark Todd, Vice Provost for Academic Operations, Greg Condell, Vice President of Finance, and USC’s Academic Senior Business Officers to discuss how AARDVARC can be used to help inform financial/business operations'
    },
    {
      date: 'July 13, 2019 - July 17, 2019',
      content: 'Presented at the 2019 <a rel="noreferrer" href="https://www.aacp.org/events/annual-meetings" target="_blank">AACP Annual Meeting</a> in Chicago, IL'
    },
    {
      date: 'February 12, 2020',
      content: 'Received AARDVARC<sup>&copy;</sup> copyright'
    },
    {
      date: 'February 28, 2020',
      content: 'Presented at the International Association of Medical Science Educators (IAMSE) in Kuala Lumpur, Malaysia'
    },
    {
      date: 'July 14, 2020',
      content: 'Presented at the 2020 AACP Virtual Annual Meeting'
    },
    {
      date: 'July 13, 2020 - July 31, 2020',
      content: 'Received Honorable Mention for the 2020 AACP Award for Excellence in Assessment'
    },
  ];

  NEWS.reverse();

  let current = 0;
  const $content = $('.news-content');
  const $date = $('.news-date');
  const $prev = $('.prev-news');
  const $next = $('.next-news');

  update();

  $prev.click(prev);
  $next.click(next);

  let startPos;
  let time = -1;
  let currentPos;

  let $el = $('.news');

  // swiping
  $el.on('touchstart', function (e) {
    time = Date.now();
    startPos = e.originalEvent.touches[0].pageX;
  });
  $el.on('touchend', function (e) {
    const now = Date.now();
    if (time > 0 && now - time < 1000) {
      if (currentPos - startPos > 50) {
        console.log('Swipe Right!!!');
        prev();
      } else if (startPos - currentPos > 50) {
        console.log('Swipe Left!!!');
        next();
      }
    }
    time = -1;
  });
  $el.on('touchmove', function (e) {
    currentPos = e.originalEvent.touches[0].pageX;
  });


  function prev() {
    if (current === 0) return;
    current--;
    update();
  }

  function next() {
    if (current === NEWS.length - 1) return;
    current++;
    update();
  }

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
