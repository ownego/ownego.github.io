(function(window, $){
    var $doc = $(document);
    var $body = $('body');

    var config = {
        firstScreen: 1,
        screenCount: $('.main-screen').size()
    }

    // Common functions
    var oe = {
        switchActions: function() {
            $doc.on('click', '.nav-items', function(e) {
                oe.switchScreens($(this).attr('data-screen-go'));
            });

            $doc.on('DOMMouseScroll mousewheel', function(e) {

            });
        },

        switchScreens: function(targetScreen) {
            $body.attr('data-active-screen', targetScreen);
            $('.main-screen.active').removeClass('active');
            $('.main-screen[data-screen-no=' + targetScreen + ']').addClass('active');

            // Draw a SVG per page
            if(targetScreen == 1) {
                // Logo draw effect
                $('#oeLogo').oeSvgDrawing({
                    colorCurrent: [255, 255, 255]
                });

                // Logo name effect
                $('.texttl').textillate({
                    initialDelay: 500
                });
            } else if(targetScreen == 2) {
                // Founders signature effect
                setTimeout(function() {
                    $('#foundersSign').oeSvgDrawing({
                        framesTotal: 200,
                        colorCurrent: [51, 51, 51],
                        colorTarget: [255, 255, 255],
                        colorStroke: [255, 255, 255]
                    });
                }, 1000);
            }

            // Special chain
            var $rect = $('.rectangle');
            if(targetScreen == 3) {
                setTimeout(function() {
                    $rect.addClass('eff-chain');
                }, 800);
            } else {
                $rect.removeClass('eff-chain');
            }
        }
    };

    // Make it global
    window.oe = oe;
})(window, jQuery);

$(function() {
    // Some elements must fit the screen height
    //  so I create a specific class for all of 'em
    var screenHeight = $(window).outerHeight();
    $('.fitscreen').height(screenHeight);

    // Navigation button
    $('.btn-nav').click(function(e) {
        e.stopPropagation();
        $('.lines-button').toggleClass('close');
        $('.site-nav-wrapper, .first-half-page').toggleClass('active');
    });

    $('body, html').click(function() {
        $navBtn = $('.lines-button');
        if($navBtn.hasClass('close')) {
            $navBtn.removeClass('close');
            $('.site-nav-wrapper, .first-half-page').removeClass('active');
        }
    });

    $('[data-toggle="tooltip"]').tooltip();

    // functions call
    oe.switchActions();
    
    // Form Validation
    $('#messageForm').validate({
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
                required: "Caution*: Please enter your name"
            },
            email: {
                required: "Caution*: Please enter your email",
                email: "Caution*: Please enter a valid email"
            },
            message: "Caution*: Please enter your message"
        },
        errorPlacement: function(error, element) {
            error.appendTo($('#errorContainer'));
        },
        // Focus the last active or first invalid element on submit
        focusInvalid: true,
        // If nothing is entered, all rules are skipped
        onfocusout: true,
        onkeyup: false,
        
        // Show only one error at a time
        showErrors: function(errorMap, errorList) {
            $('#messageForm').find('input, textarea').each(function() {
                $(this).removeClass('error');
            });
            if(errorList.length) {
                $('#errorContainer').html(errorList[0]['message']);
                $(errorList[0]['element']).addClass('error');
                $('#errorContainer').css('color', '#f00');
            }
        }, // end
        
        submitHandler: function(form) {
             $('#modalSendForm').modal('show');
        }
    });
    
    $('#submitConfirm').click(function() {
        if (!($('#g-recaptcha-response').val())) {
            $('#submitAlert').html('Please check the captcha');
            $('#submitAlert').css('color', '#f00');
        } else {
            // AJAX
            $.ajax({
                url: 'ajax.php',
                type: 'post',
                data: {
                       'name': $('#name').val(),
                       'email': $('#email').val(),
                       'message': $('#message').val(),
                       'g-recaptcha-response': $('#g-recaptcha-response').val()
                },
                success: function(res) {
                    $('#cautionWrapper').html(res);
                    $('#modalSendForm').modal('hide');
                },
                error: function(xhr, desc, err) {
                    $('#errorContainer').html("Caution*: There are some problems sending your message. Please try again later.");
                    $('#errorContainer').css('color', '#f00');
                    console.log(xhr);
                    console.log("Details: " + desc + "\nError:" + err);
                }
            }); // end ajax call
        }
    })
});
