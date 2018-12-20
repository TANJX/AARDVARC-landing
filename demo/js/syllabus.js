let snackbar_element = null;
let snackbar_complete = true;
let snackbar_timeout_function;

function warn(msg) {
    popupPrompt(msg, 5000, '#fa4f2f');
}

function popupPrompt(msg, time, color) {
    $p = $('<div class="mdc-snackbar mdc-snackbar--align-start"' +
        ' aria-live="assertive"' +
        ' aria-atomic="true"' +
        ' aria-hidden="true">' +
        '<div class="mdc-snackbar__text"></div>' +
        '<div class="mdc-snackbar__action-wrapper">' +
        '<button type="button" class="mdc-snackbar__action-button"></button>' +
        '</div>' +
        '</div>');
    $('body').append($p);
    if (typeof color !== "undefined") {
        $p.css('backgroundColor', color);
    }
    if (typeof time === "undefined") {
        time = 2750;
    }
    if (!snackbar_complete) {
        clearTimeout(snackbar_timeout_function);
        snackbar_element.remove();
    }
    snackbar_element = $p;
    snackbar_complete = false;
    let snackbar = new mdc.snackbar.MDCSnackbar($p[0]);
    setTimeout(function () {
        snackbar.show({
            message: msg,
            timeout: time
        });
    }, 100);
    snackbar_timeout_function = setTimeout(function () {
        snackbar_element.remove();
        snackbar_complete = true;
    }, time + 300);
}

function updateField() {
    $('.main-wrapper .ripple').each(function () {
        mdc.ripple.MDCRipple.attachTo($(this)[0]);
    });

    $('.main-wrapper .mdc-icon-button').each(function () {
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
    warn('Saving is disabled in the demo')
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
    warn('Syllabus generation is simulated in the demo');
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
    dialog.open()
}