(function () {
  var $errorContainer = $('#errorContainer');
  var $cautionWrapper = $('#cautionWrapper');

  var $messageForm = $('#messageForm');
  var $modalForm = $('#modalSendForm');
  var $alertSubmit = $('#submitAlert');

  // Form Validation
  $messageForm.validate({
    rules: {
      name: "required",
      email: {
        required: true,
        email: true
      },
      message: "required"
    },

    messages: {
      name: {
        required: "Please enter your name"
      },
      email: {
        required: "Please enter your email",
        email: "Please enter a valid email"
      },
      message: "Please enter your message"
    },
    errorPlacement: function (error, element) {
      error.appendTo($errorContainer);
    },
    // Focus the last active or first invalid element on submit
    focusInvalid: true,
    // If nothing is entered, all rules are skipped
    onfocusout: true,
    onkeyup: false,

    // Show only one error at a time
    showErrors: function (errorMap, errorList) {
      $messageForm.find('input, textarea').each(function () {
        $(this).removeClass('error');
      });
      if (errorList.length) {
        $errorContainer.html(errorList[0]['message']).addClass('red');
        $(errorList[0]['element']).addClass('error');
      }
    }, // end

    submitHandler: function (form) {
      $modalForm.modal('show');
    }
  });



  $('#submitConfirm').click(function () {
    var $inputName = $('#msgName');
    var $inputEmail = $('#msgEmail');
    var $inputMessage = $('#msgMessage');
    var $inputCaptcha = $('#g-recaptcha-response');

    if (!($inputCaptcha.val())) {
      $alertSubmit
        .addClass('red')
        .html('Please check the captcha');
    } else {
      // AJAX
      $.ajax({
        url: 'http://api.ownego.com/API/validation',
        type: 'post',
        data: {
          'name': $inputName.val(),
          'email': $inputEmail.val(),
          'message': $inputMessage.val(),
          'g-recaptcha-response': $inputCaptcha.val()
        },
        success: function (res) {
          $cautionWrapper.html(res);
          $modalForm.modal('hide');
        },
        error: function (xhr, desc, err) {
          $errorContainer
            .addClass('red')
            .html('Error*: There are some problems sending your message. Please try again later.');
          console.log(xhr);
          console.log('Details: ' + desc + '\nError:' + err);
        }
      }); // end ajax call
    }
  });
})();
