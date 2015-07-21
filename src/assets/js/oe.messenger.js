(function () {
  var $errorContainer = $('#errorContainer');
  var $errorMes = $('#errorMes');

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
        $errorContainer.addClass('red')
        $errorMes.html(errorList[0]['message']);
        $(errorList[0]['element']).addClass('error');
      }
    }, // end

    submitHandler: function (form) {
      $('.input-normal').removeClass('error');
      $errorContainer.removeClass('success');
      $alertSubmit.removeClass('red').html('Are you sure to send this message?')
      $errorMes.html('');
      $modalForm.modal('show');
    }
  });

  $('#submitConfirm').click(function () {
    var $smbtn = $(this);
    $smbtn.addClass('sending').attr('disabled', 'disabled');

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
          if(res.success) {
            $errorContainer.removeClass('red').addClass('success');
            $errorMes.html('Your message has been sent successfully! We will reply your message very soon.');
            $('.input-normal').val('');
          } else {
            var errors = '';
            for(var i in res.errors) {
              $('.input-normal[name=' + res.errors[i].field + ']').addClass('error');
              errors += res.errors[i].message + '<br/>';
            }
            $errorContainer.addClass('red');
            $errorMes.html(errors);
          }
        },
        error: function (xhr, desc, err) {
          $errorContainer.addClass('red');
          $errorMes.html('Error*: There are some problems sending your message. Please try again later.');
        },
        complete: function() {
          $smbtn.removeClass('sending').removeAttr('disabled');
          $modalForm.modal('hide');
        }
      }); // end ajax call
    }
  });
})();
