//scroll to top on refresh
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

$(document).ready(function() {
    $('a').last().hide();
    //slow down page scrolling
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 900);
                    return false;
                }
            }
        });
    });

    //caching some variables
    var navSel = $('.sticky-container');
    var stickyClass = 'sticky-container-scrolled';
    var navDistance = $('.image-title').offset().top;
    var titleSel = $('.nav-bar-title');
    var leftClass = 'pull-left';
    var aboutSel = $('#about');
    var parallaxSel = $('.parallax-image');
    var stickyParallClass = 'sticky-parallax';
    var transCoverSel = $('#transparency-cover');
    var whiteBackClass = 'white-background';

    function updatePage() {
        //opacity linear function
        var opa = 0.55 + ($(this).scrollTop() * ((0.15 - 0.55) / 454));
        //parallax rate
        var yPos = -($(this).scrollTop() / 1.75);
        if (yPos < -250) yPos = -250; //limits parallax image displacing
        var coords = '75% ' + yPos + 'px';

        //letting the browser take care of the frame updates
        requestAnimationFrame(function() {
            //makes nav bar sticky
            if ($(this).scrollTop() >= navDistance) {
                navSel.addClass(stickyClass);
            } else {
                navSel.removeClass(stickyClass);
            }

            //moves title to the left
            if ($(this).scrollTop() > 0) {
                titleSel.addClass(leftClass);
            } else {
                titleSel.removeClass(leftClass);
            }

            //makes parallax div sticky
            var aboutDistance = aboutSel.offset().top - $(this).scrollTop();
            if (aboutDistance <= 125) {
                parallaxSel.addClass(stickyParallClass);
                transCoverSel.addClass(whiteBackClass);
            } else {
                parallaxSel.removeClass(stickyParallClass);
                transCoverSel.removeClass(whiteBackClass);

                parallaxSel.css({
                    backgroundPosition: coords
                });

                //adjust parallax opacity
                if (opa > 0) {
                    parallaxSel.css({
                        opacity: opa
                    });
                } else {
                    parallaxSel.css({
                        opacity: 0
                    });
                }
            }
        });



    }

    //parallax effect / sticky nav bar
    $(window).scroll(updatePage);

});
