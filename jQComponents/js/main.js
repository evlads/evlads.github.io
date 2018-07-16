$(document).ready(function () {

    // tabs

    $('.tabs').on('click', 'li', function (e) {
        e.stopPropagation();
        e.preventDefault();

        var myTabs_list = $(this).closest('.tabs').next().find('.tabs_list');

        if (!$(this).hasClass('is-active')) {

            $(this).addClass('is-active')
                .siblings()
                .removeClass('is-active');
            //  $(this).parent().children().removeClass('is-active');


            myTabs_list.children()
                .stop(true, true)
                .fadeOut(0);
            //removeClass('is-active');

            myTabs_list.children()
                .eq($(this).index())
                .stop(true, true)
                .fadeIn(600);
            //.addClass('is-active')
            //.animate({'display': 'block'}, 200);
        }
    });

    // accordeon
    $('.accordeon').on('click', '.accordeon_trigger', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var myAccordeon = $(this).closest('.accordeon');

        // debugger;

        if (!$(this).siblings(".accordeon_inner").is(':visible')) {

            myAccordeon.find('.accordeon_trigger.is-active').removeClass('is-active');

            myAccordeon.find('.accordeon_inner')
                .stop(true, true)
                .hide(400);

            $(this).addClass('is-active');

            $(this).siblings(".accordeon_inner")
                .stop(true, true)
                .show(400);
            // .addClass('is-active');
        } else {
            myAccordeon.find('.accordeon_inner')
                .stop(true, true)
                .hide(400);
            myAccordeon.find('.accordeon_trigger.is-active').removeClass('is-active');
        }
    });

    // slideshow alert('asdf');  debugger;

    $('.card').on('mouseenter', '.media-left', function (e) {

        e.stopPropagation();
        e.preventDefault();

        var myThumbnail = $(this).closest('.media-left');
        myImgLink = 'img/business_470x470_' + (myThumbnail.index() + 1) + '.jpg',
            myImg = $(this).closest('.card').find('.card-image img');

        if (!$(myThumbnail).hasClass('active')) {
            myThumbnail.siblings().removeClass('active');
            myThumbnail.addClass('active');
            myImg.fadeOut(function () {
                myImg.attr({ 'src': myImgLink }).fadeIn();
            }
            );
        }
    });

    $('.slider').children('.slider_controls').on('click', 'li', function (e) {

        e.stopPropagation();
        e.preventDefault();

        var $this = $(this),
            sliderList = $this.closest('.slider').children('.slider_list'),
            sliderItems = sliderList.find('li'),
            activSlider = sliderList.find('li.active'),
            firstSlider = sliderItems.first(),
            lastSlider = sliderItems.last();

        function myFadeIn(item) {
            activSlider
                .removeClass('active')
                .fadeOut(function () {
                    item.addClass('active').fadeIn();
                });
        }

        if ($(this).hasClass('next')) {
            if (!activSlider.next().length < 1) {
                myFadeIn(activSlider.next());
            } else {
                myFadeIn(firstSlider);
            }
        } else {
            if (!activSlider.prev().length < 1) {
                myFadeIn(activSlider.prev());
            } else {
                myFadeIn(lastSlider);
            }
        }
    });

    // "slide__slider

    $('.slide__slider').find('.slider__controls').on('click', 'li', function (e) {

        e.stopPropagation();
        e.preventDefault();

        

        var $this = $(this),
            container = $this.closest('.slide__slider'),
            list = container.find('.slider__list'),
            items = container.find('.slider__item'),
            activeSlide = items.filter('.active');
            nextSlide = activeSlide.next();
            prevSlide = activeSlide.prev();
            firstSlide = items.first();
            lastSlide = items.last();
            sliderOffset = container.offset().left,
            reqPos = 0;

        function slide(item) {   
            item.addClass('active').siblings().removeClass('active');
            return reqPos = item.offset().left - sliderOffset;
        }

        if ( $this.hasClass('next') ) {
            if (nextSlide.length > 0) {
                 slide(nextSlide);
            } else {                 
                 slide(firstSlide);
            }
        } else {
            if (prevSlide.length > 0) {                    
                  slide(prevSlide);
            } else { 
                  slide(lastSlide);
            }
        }

        list.css('left', '-=' + reqPos + 'px');
    });
});
