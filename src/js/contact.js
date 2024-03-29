/**
 * This script in UNUSED!
 */


(function () {
  const post_url = 'http://localhost/api/email';

  // const post_url = 'http://app.acadoinformatics.com/api/email';

  const $msg = $('#msg');
  const $wait = $('#wait');
  const $form = $('form');
  const form = $form[0];
  const $recaptcha = $('#g-recaptcha-response');
  const $btn = $('#submit');

  function validate() {
    if ($msg.val().includes('http')) {
      return false;
    }
    // if there is a cyrillic alphabet, return false
    if (/[а-яА-ЯЁё]/.test($msg.val())) {
      return false;
    }
    return false;
    return $recaptcha.val() !== '';
  }

  function submit(event) {
    console.log(event);
    event.preventDefault();
    if (!form.checkValidity()) {
      return;
    }
    if (!validate()) {
      return;
    }

    $btn.attr('disabled', true);
    $form.fadeOut(function () {
      $wait.fadeIn();
    });

    const obj = {};
    for (let i = 0; i < form.length; i++) {
      const field = form[i];
      if (field.name)
        obj[field.name] = field.value;
    }

    $.post(post_url, obj, function (data) {
      const res = JSON.parse(data);
      switch (res.status) {
        case 'error':
          $wait.html(res.msg);
          break;
        case 'success':
          $wait.html(res.msg);
          break;
      }
    });

    return false;
  }

  $btn.click(submit);
})();
