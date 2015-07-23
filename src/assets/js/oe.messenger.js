(function () {
  var $errorContainer = $('#errorContainer');
  var $errorMes = $('#errorMes');

  var $messageForm = $('#messageForm');
  var $smBtn = $('#submitbtn');

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
        required: "Oops, could you let us know your name?"
      },
      email: {
        required: "We need your email to reply, we prefer dialogue to monologue :)",
        email: "Sike, that's the wrong email!"
      },
      message: "Don't be shy! Tell us anything that is bothering you."
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
      $errorMes.html('');

      messenger();
    }
  });

  function messenger() {
    $smBtn.addClass('sending').attr('disabled', 'disabled');

    var $inputName = $('#msgName');
    var $inputEmail = $('#msgEmail');
    var $inputMessage = $('#msgMessage');

    // AJAX
    $.ajax({
      url: 'http://api.ownego.com/API/validation',
      type: 'post',
      data: {
        'name': $inputName.val(),
        'email': $inputEmail.val(),
        'message': $inputMessage.val()
      },
      success: function (res) {
        if(res.success) {
          $errorContainer.removeClass('red').addClass('success');
          $errorMes.html('Your message has been flown to us! We will reply your message ASAP.');
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
        $errorMes.html('Oops, sorry. Something went wrong when we try to receive your message. Could you try again later or contact us via contact@ownego.com');
      },
      complete: function() {
        $smBtn.removeClass('sending').removeAttr('disabled');
      }
    }); // end ajax call
  }
})();
