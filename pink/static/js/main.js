$(document).ready(function () {
    svg4everybody({});

  $('.toggle').click(function(){
    $(this).toggleClass('js-toggle--open');
    $('.page-header__top').toggleClass('js-page-header__top--open-toggle');
    $('.main-nav').toggleClass('js-main-nav--open-toggle');
  });

 /*   sticky navigation  */
  $(window).on("scroll", function() {
    var position = $("#information").offset();

    // If the top of the screen is greater than the #begin element.
    if ($(window).scrollTop() > position.top - 66) { // 80 pixels is the height of my navigation.
      // activate your class.
      $(".page-header__top").addClass("page-header__top--fixed");
    } else {
      // otherwise remove it.
      $(".page-header__top").removeClass("page-header__top--fixed");
    };
  });

  /*   navigation scroll */
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('.toggle').trigger('click');
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });

  $(".reviews__list").owlCarousel({
    loop:true,
    items:1,
    smartSpeed:1000,
    responsive : {
      0 : {
        dots:true
      },
      700 : {
        dots:true
       },
      1200 : {
        nav:true,
        dots:false
      }
    }
  });

  $(".price__list").owlCarousel({
    smartSpeed:1000,
    responsive : {
      0 : {
        items:1,
        stagePadding: 24,
        startPosition: 1,
        dots:true
      },
      700 : {
        items:3,
        nav:false,
        dots:false
       },
      1200 : {
        items:3,
        nav:false,
        dots:false
      }
    }
    
  });

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: -28.643387, lng: 153.612224},
      mapTypeControl: true,
      mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_CENTER
      },
      zoomControl: true,
      zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
      },
      scaleControl: true,
      streetViewControl: true,
      streetViewControlOptions: {
          position: google.maps.ControlPosition.LEFT_TOP
      },
      fullscreenControl: true
    });
  }

   map = new GMaps({
    div: '#map',
    lat: 59.9360843,
    lng: 30.319755,
    mapTypeControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER
    },
    zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    fullscreenControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
    }
  });

  map.addMarker({
    lat: 59.9360843,
    lng: 30.319755,
    title: 'Pink'
  });

});


    