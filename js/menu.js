// mobile menu bar
(function () {
  let state = false;

  // cache DOM
  let $menu = $('.menu--btn');
  let $menu_bar1 = $menu.find('.menu--btn__line:nth-of-type(1)');
  let $menu_bar2 = $menu.find('.menu--btn__line:nth-of-type(2)');
  let $menu_bar3 = $menu.find('.menu--btn__line:nth-of-type(3)');
  let $menu_items = $('.menu--items');

  // bind events
  $menu.click(() => state ? close() : open());

  $('body > div').click(() => close());
  $('footer').click(() => close());
  $menu_items.find('a').click(() => close());
  $(window).resize(() => {
    if (document.documentElement.clientWidth >= 991) {
      close();
    }
  });

  function open() {
    console.log('open');
    state = true;
    $menu_bar1.removeClass('menu--btn__line__exit_1').addClass('menu--btn__line__select_1');
    $menu_bar2.removeClass('menu--btn__line__exit_2').addClass('menu--btn__line__select_2');
    $menu_bar3.removeClass('menu--btn__line__exit_3').addClass('menu--btn__line__select_3');
    $menu_items.css('display', 'block');
  }

  function close() {
    if (!state) return;
    console.log('close');
    state = false;
    $menu_bar1.removeClass('menu--btn__line__select_1').addClass('menu--btn__line__exit_1');
    $menu_bar2.removeClass('menu--btn__line__select_2').addClass('menu--btn__line__exit_2');
    $menu_bar3.removeClass('menu--btn__line__select_3').addClass('menu--btn__line__exit_3');
    $menu_items.css('display', 'none');
  }

})();