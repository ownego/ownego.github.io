(function(window, $){
    var $doc = $(document);

    var config = {
        authUrl: ''
    }

    // Common functions
    var oe = {
        // The screens will be switched on click event via a miracle
        screenSwitcher: function() {
            // init
            MultiScreen.init();

            // set the default options
            //      you can find it here: https://github.com/ian-de-vries/Multi-Screen.js
            MultiScreen.set_defaults({
                default_enter_animation: 'bottom',
                default_exit_animation: 'top',
                default_distance: 0
            });
        },

        // The nav disappears on home screen
        //      It's still there but faded,
        //      addClass 'in' if you want it to show.
        navDebut: function() {
            $doc.on('click', '.ms-nav-link[data-ms-target!="screenHome"]', function() {
                $('.sub-elems').addClass('in');
            });
            $doc.on('click', '.ms-nav-link[data-ms-target="screenHome"]', function() {
                $('.sub-elems').removeClass('in');
            });
        },

        // After debut, the nav will be useful as it does.
        //      The idea is: detect the click event (switch screens) then change status of nav items
        navSwitcher: function() {
            var $nav = $('#mainNav');
            $doc.on('click', '.ms-nav-link', function() {
                $nav.find('li').removeClass('active');
                $nav.find('[data-ms-target="'+ MultiScreen.get_current_screen() +'"]')
                    .parents('li')
                    .addClass('active available');

                $('#'+ MultiScreen.get_current_screen()).addClass('shown');
            });
        },

        // You only can go to next screen when you picked up an option
        //      Shhh... just hide the ways that you can click on to go next screen
        //      Ez, hah?
        pickSwitcher: function() {
            $('[data-pick]').each(function() {
                var $nextBtn = $(this);
                var inputName = $nextBtn.attr('data-pick');

                $doc.on('change', 'input[name="'+ inputName +'"]', function() {
                    var val = $(this).val();
                    val ? $nextBtn.addClass('in') : $nextBtn.removeClass('in');

                    $nextBtn.find('a').trigger('click');
                });
            });
        },

        loginRequire: function() {
            $doc.on('click', '#loginRequire', function() {
                // to open the login box
                 $('#modalLogin').modal('show');
            });
        },

        goToDownload: function() {
            $doc.on('click', '#goToDownload', function() {
                // to go to download screen
                MultiScreen.switch_screens({
                    target_id: 'screenCat4'
                });

                var $nav = $('#mainNav');
                $nav.find('li').removeClass('active');
                $nav.find('[data-ms-target="'+ MultiScreen.get_current_screen() +'"]')
                    .parents('li')
                    .addClass('active available');
                $('#screenCat4').addClass('shown');
            });
        },

        sharing: function() {
            var currentUrl = window.location.href;

            // facebook
            var shareFb = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(currentUrl);

            // google
            var shareGg = 'https://plus.google.com/share?url=' + encodeURIComponent(currentUrl);

            // tweet
            var desc = "Hãy cùng tôi sử dụng #wowcv Template từ @vietnamworks",
                shareTw = "http://twitter.com/share?url=" + encodeURIComponent(currentUrl);
                shareTw += ("&text=" + encodeURIComponent(desc));

            $doc.on('click', '#shareFacebook', function() {
                shareFb && oe.loadwindow(shareFb);
            });

            $doc.on('click', '#shareGoogle', function() {
                shareGg && oe.loadwindow(shareGg);
            });

            $doc.on('click', '#shareTweet', function() {
                shareTw && oe.loadwindow(shareTw);
            });
        },

        loadwindow: function(url, options) {
            try {
                options = options || {};
                var w = options.width || 600,
                h = options.height || 550,
                s = options.scrollbars || 1,
                r = options.resizable || 1,
                l = options.left || screen.width / 2 - w / 2,
                t = options.top || screen.height / 2 - h / 2,
                f = options.focus ? true : false,
                name = "",
                feats = "toolbar=0,scrollbars=" + s + ",location=0,statusbar=0,menubar=0,resizable=" + r + ",width=" + w + ",height=" + h + ",left=" + l + ",top=" + t;
            } catch (e) {
                alert(e);
            }
            try {
                var win = window.open(url, name, feats);
            } catch (e) {
                alert("Oops, we could not open a new window. Are you using a popup blocker?")
            }
            win || alert("Oops, we could not open a new window. Are you using a popup blocker?");
            try {
                window.focus && f && win.focus();
            } catch (e) {}
        }
    };

    // Make it global
    window.oe = oe;
})(window, jQuery);

$(function() {
    // Run'em
    oe.screenSwitcher();
    oe.navDebut();
    oe.navSwitcher();
    oe.pickSwitcher();
    oe.loginRequire();
    oe.goToDownload();
    oe.sharing();

    $(document).on('click', '#backToHome', function() {
        $('.sub-elems').removeClass('in');
        $('#modalDownload').modal('hide');

        MultiScreen.switch_screens({
            target_id: 'screenHome',
            enter_animation_command: 'fade',
            exit_animation_command: 'fade'
        });
    });

    $('#screenHome').addClass('shown');
});
