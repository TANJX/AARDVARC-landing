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
    return $recaptcha.val() !== '';
  }

  function submit(event) {
    console.log(event);
    event.preventDefault();
    console.log('on submit');
    if (!form.checkValidity()) {
      return;
    }
    console.log('yes');
    if (!validate()) {
      return;
    }
    console.log('yes2');
    console.log('pass');

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
