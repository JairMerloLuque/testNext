
"use strict";

//
// Tabs Toggler
//
(function ($) {
    // Variables
    const $tabLink = $('#tabs-section .tab-link');
    const $tabBody = $('#tabs-section .tab-body');
    let timerOpacity; // Toggle Class

    const init = () => {
        // Menu Click
        $tabLink.off('click').on('click', function (e) {
            // Prevent Default
            e.preventDefault();
            e.stopPropagation(); // Clear Timers

            window.clearTimeout(timerOpacity); // Toggle Class Logic
            // Remove Active Classes

            $tabLink.removeClass('active ');
            $tabBody.removeClass('active ');
            $tabBody.removeClass('active-content'); // Add Active Classes

            $(this).addClass('active');
            $($(this).attr('href')).addClass('active'); // Opacity Transition Class

            let url = window.location.href;
            if (url.toLowerCase().indexOf("#") >= 0){
                url = url.split('#')[0];
                window.history.pushState('', '', url + $(this).attr('href'));
            }else{
                window.history.pushState('', '', url + $(this).attr('href'));
            }

            timerOpacity = setTimeout(() => {
                $($(this).attr('href')).addClass('active-content');
            }, 50);
        });
    }; // Document Ready


    $(function () {
        init();
    });
})(jQuery);

function detectMob() {
    return ( ( window.innerWidth <= 997 )  );
}
//scroll to element phone just in phone
function scrollFunction(value) {
    // let e = document.getElementById("phone_expo");
    // if( detectMob()){
    //     e.scrollIntoView({ behavior: 'smooth', block: 'start',inline: "start" });
    // }
}
function scrollFunction_down() {
    // let e = document.getElementById("phone_expo");
    // if( detectMob()){
    //     e.scrollIntoView({ behavior: 'smooth', block: 'start',inline:'start'});
    // }
}


$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    // $("#tabs-section ul a").on("click", function (e) {
    //     // 1
    //     e.preventDefault();
    //     // 2
    //     const href = $(this).attr("href");
    //     // 3
    //     $("html, body").animate({ scrollTop: $(href).offset().top -100}, 800);
    // });
    // $('#scroll').click(function(){
    //     let e = document.getElementById("blog_head");
    //     e.scrollIntoView({
    //         block: 'start',
    //         behavior: 'smooth',
    //         inline: 'center'
    //     });
    // });

    jQuery(function () {
        var url = window.location.href;
        if (document.querySelector('.tab-head li a.active') !== null) {
            // document.querySelector('.tab-head li a.active').classList.remove('active');
        }
        jQuery(".tab-head li a").each(function (index,value) {
            if (url == (value.href)) {
                jQuery(this).addClass("active");
                $(".tab-head li a.active").trigger("click");
            }
        });
    });

});


