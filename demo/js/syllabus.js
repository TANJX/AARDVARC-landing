let snackbar_module = (function () {
    let snackbar_element = null;
    let snackbar_complete = true;
    let snackbar_timeout_function;

    function warn(msg) {
        prompt(msg, 5000, '#fa4f2f');
    }

    function prompt(msg, time, color) {
        $p = $('<div class="mdc-snackbar">' +
            '<div class="mdc-snackbar__surface">' +
            '<div class="mdc-snackbar__label"' +
            ' role="status"' +
            ' aria-live="polite">' +
            'Prompt Message' +
            '</div>' +
            '</div>' +
            '</div>');
        $('body').append($p);
        if (typeof color !== "undefined") {
            $p.find('.mdc-snackbar__surface').css('backgroundColor', color);
        }
        if (typeof time === "undefined") {
            time = 4000;
        }
        if (!snackbar_complete) {
            clearTimeout(snackbar_timeout_function);
            snackbar_element.remove();
        }
        snackbar_element = $p;
        snackbar_complete = false;
        let snackbar = new mdc.snackbar.MDCSnackbar($p[0]);
        snackbar.timeoutMs = time;
        snackbar.labelText = msg;
        setTimeout(function () {
            snackbar.open();
        }, 100);
        snackbar_timeout_function = setTimeout(function () {
            snackbar_element.remove();
            snackbar_complete = true;
        }, time + 1000);
    }

    return {warn: warn, prompt: prompt};
})();


function updateField() {
    $('.ripple').each(function () {
        mdc.ripple.MDCRipple.attachTo($(this)[0]);
    });

    $('.mdc-icon-button').each(function () {
        const iconButtonRipple = new mdc.ripple.MDCRipple($(this)[0]);
        iconButtonRipple.unbounded = true;
    });
    $('.mdc-form-field').each(function () {
        var formField = new mdc.formField.MDCFormField($(this)[0]);
        var e = $(this).children(".mdc-checkbox");
        if (typeof e[0] !== "undefined") {
            formField.input = new mdc.checkbox.MDCCheckbox(e[0]);
        } else {
            e = $(this).children(".mdc-radio");
            if (typeof e[0] !== "undefined") {
                formField.input = new mdc.radio.MDCRadio(e[0]);
            }
        }
    });
}

updateField();

$('.left-col .mdc-list-item[href="' + current_page + '"]').addClass('active');

$("#save-btn").click(function () {
    snackbar_module.warn('Saving is disabled in the demo')
});

$("#back-btn").click(function () {
    // todo
});

$("#continue-btn").click(function () {
    const next = $('#menu-links a[href="' + current_page + '"]').next().attr('href');
    if (typeof next !== "undefined") {
        window.location = next;
    } else {
        window.location = 'basic';
    }
});

$('#gen-btn').click(function () {
    snackbar_module.warn('Syllabus generation is simulated in the demo');
    $(this).attr('disabled', true);
    $('#pdf-status').show();
    setTimeout(function () {
        $('#pdf-status').hide();
        $('#gen-result').show();
    }, 3000);
});

$('.left-col .ripple').each(function () {
    mdc.ripple.MDCRipple.attachTo($(this)[0]);
});

// cookie
function getCookie(key) {
    const allcookies = document.cookie.split(';');
    for (let i = 0; i < allcookies.length; i++) {
        const name = allcookies[i].split('=')[0];
        if (name === key)
            return allcookies[i].split('=')[1];
    }
    return -1;
}

if (getCookie('visited') === -1) {
    // first visit
    let expires = new Date(Date.now() + 60 * 60 * 1000);
    document.cookie = "visited=true; expires=" + expires.toUTCString() + "; path= /aardvarc/demo/";
    const dialog = new mdc.dialog.MDCDialog($('#dialog')[0]);
    dialog.open();
    dialog.listen('MDCDialog:closed', function (e) {
        $('.request').addClass("enter-screen")
    });
} else {
    $('.request').addClass("enter-screen")
}
