$(window).on("load", function() { //when window is loaded

    //handle loader
    $('.loader .inner').fadeOut(500, function() {
        $(".loader").fadeOut(750);
    });

    //render initial filter category that contains all elements
    $('.items').isotope({
        filter: '*',
        animationOptions: {
            duration: 1500,
            easing: 'linear',
            queue: false
        }
    });
});


$(document).ready(function() {

    //call the slider plugin
    $('#slides').superslides({
        animation: 'fade',
        play: 5000,
        pagination: false
    });

    //call the plugin that makes the typing effect on top of the slider
    var typed = new Typed('.sub', {
        strings: ['Front End Developer', 'Radiographer'],
        typeSpeed: 70,
        loop: true,
        startDelay: 1000,
        showCursor: false
    });

    //owl carousel plugin used for showcasing the skills
    $('.owl-carousel').owlCarousel({
        loop:true,
        items: 4,
        responsive:{
            0:{
                items:1
            },
            480:{
                items:2
            },
            768:{
                items:3
            },
            938:{
                items:4
            }
        }
    });


    //get element position
    var skillsTopOffset = $('.skills-section').offset().top;
    var statsTopOffset = $('.statistics-section').offset().top;

    //counter used to control number of times the countup plugin is called
    // (responsible for the count up effect of numbers)
    var countUpFinished = false;

    $(window).scroll(function() {
       if(window.pageYOffset > skillsTopOffset - $(window).height() + 200) {
            //when the window is scrolled to a certain position, trigger the easyPieChart  plugin and play animation
           $('.chart').easyPieChart({
               easing: 'easeInOut',
               barColor: '#fff',
               trackColor: false,
               scaleColor: false,
               lineWidth: 4,
               size: 152,
               onStep: function(from, to, percent) {
                   $(this.el).find('.percent').text(Math.round(percent));
               }
           });

       }

        if(!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200) {
            //if window position is on element run the countup plugin and play counting effect
            $('.counter').each(function(){
                var el = $(this);
                var endVal = parseInt(el.text());
                el.countup(endVal)
            });
            //counter value changed so it stops replaying the effect
            countUpFinished = true;
        }
    });

    //execute fancybox plugin that is responsible for showing the images
    $('[data-fancybox]').fancybox();

    //on click of any filter button execute isotope plugin to filter through categories
    $('#filters a').click(function() {

        $('#filters .current').removeClass("current");//remove 'current' clas from 'all' category
        $(this).addClass("current"); //add 'current' class to current category that has been clicked

        var selector = $(this).attr("data-filter"); //get 'data-filter' attribute from current selection

        //call isotope plugin and filter the appropriate category
        $('.items').isotope({
            filter: selector, //add 'selector' as current category
            animationOptions: {
                duration: 1500,
                easing: 'linear',
                queue: false
            }
        });

        return false;
    });

    //control window scroll when a button is clicked from the navigation menu
    $("#navigation li a").click(function(e) {
       e.preventDefault();

       var targetElement = $(this).attr("href");
       var targetPosition = $(targetElement).offset().top;
       //animate scrolling effect to target element
       $('html, body').animate({scrollTop: targetPosition - 50}, 'slow');
    });

    const nav = $("#navigation"); //get navigation element
    const navTop = nav.offset().top; //get navigation element position

    //on window scroll execute stickyNavigation function
    $(window).on('scroll', stickyNavigation);

    //Removes navigation bar from the normal flow and make it sticky
    function stickyNavigation() {
        var body = $('body');

        if($(window).scrollTop() >= navTop) { //trigger function when the window passes the navigation elements position
            body.css("padding-top", nav.outerHeight() + 'px');
            body.addClass('fixedNav');
        } else {
            body.css("padding-top", 0);
            body.removeClass('fixedNav');
        }
    }

});