
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

function updateField(div) {
    if (typeof div === "undefined") {
        div = ' ';
    } else {
        div += ' ';
    }
    console.log("updating " + div);
    $('.main-wrapper .ripple').each(function () {
        mdc.ripple.MDCRipple.attachTo($(this)[0]);
    });

    $('.main-wrapper .mdc-icon-button').each(function () {
        const iconButtonRipple = new mdc.ripple.MDCRipple($(this)[0]);
        iconButtonRipple.unbounded = true;
    });
    $(div + "select, " + div + "input, " + div + "textarea").change(function () {
        console.log("changed!");
        changed = true;
    });
    $("#main-form " + div + "button").click(function () {
        if (!$(this).hasClass("save-btn")) {
            console.log("clicked!");
            changed = true;
        }
    });
    $(div + '.mdc-form-field').each(function () {
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

const classCode = '3I7j5VHfPiFOPP70sWQc';
var headerClassData = {
    "Title": "Pharmacology",
    "Semester": "Fall 2018",
    "AccessCode": "3I7j5VHfPiFOPP70sWQc",
    "AskCopy": false,
    "PriorCourse": "GM5MP2oYIE6AO591g8eQ"
};
let changed = false;

/*
  let currentPage = 'CourseBasics';
  switchTo(currentPage);
  //getHeader();

  $("#continue-btn").click(function () {
      save();
      const next = $('#menu-links a[id="' + currentPage + '"]').next().attr('id');
      if (typeof next !== "undefined") {
          switchTo(next);
      } else if (typeof backToEditor === 'function') {
          // current page is limited engagement form
          backToEditor();
      } else {
          window.location = AbsUrlPath + "/coord/index/" + classCode;
      }
  });


  $("#back-btn").click(function () {
      window.location = AbsUrlPath + "/coord/index/" + classCode;
  });

  $("#save-btn").click(function () {
      save();
  });

  $("#menu-links a").click(function () {
      const id = $(this).attr('id');
      if (currentPage === id) return;
      if (changed) {
          if (confirm('Are you sure you want to leave the page WITHOUT saving'))
              switchTo(id);
      } else {
          switchTo(id);
      }
      return false;
  });

  $('#gen-btn').click(function () {
      window.location = 'MakeDocument.html?ClassCode=' + classCode;
  });

  function switchTo(page) {
      const urlVars = classCode + "/" + page.replace("_", "/");
      const loadURL = AbsUrlPath + "/coord/pages/" + urlVars;
      const endURL = AbsUrlPath + "/coord/portal/" + urlVars;
      $("#main-form").load(loadURL, function (responseTxt, statusTxt, xhr) {
          if (statusTxt === "success") {
              $("#menu-links a").removeClass('active');
              $("#menu-links a[id='" + page + "']").addClass('active');
              history.pushState(null, null, endURL);
              currentPage = page;
              changed = false;
              if (page === $('#menu-links :last-child').attr('id')) {
                  $('#nav-btns').hide();
              } else {
                  $('#nav-btns').show();
              }
              window.scrollTo(0, 0);
          }
          if (statusTxt === "error") {

              alert("Error: " + xhr.status + ": " + xhr.statusText);
          }
      });
  }

  window.onbeforeunload = function () {
      if (changed) {
          return "";
      }
  };

  $('.left-col .ripple').each(function () {
      mdc.ripple.MDCRipple.attachTo($(this)[0]);
  });
*/