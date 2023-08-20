(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

})(jQuery);

// added script new


// Validation functions
function validateName(name) {
    return /^[a-zA-Z]+$/.test(name); // Only alphabets allowed
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email format validation
  }
  
    // Toggle submit button based on validation
    function toggleSubmitButton() {
      const nameValid = validateName($("#name").val());
      const emailValid = validateEmail($("#email").val());
      const submitButton = $("#submit-button"); // Cache the submit button element
  
      if (nameValid && emailValid) {
        submitButton.prop("disabled", false);
        submitButton.removeClass("disabled-button"); // Remove the disabled button style
        $("#validation-message").text(""); // Clear validation message
      } else {
        submitButton.prop("disabled", true);
        submitButton.addClass("disabled-button"); // Add the disabled button style
        $("#validation-message").text("Please fill in valid name and email.");
      }
    }
  
    // Name field validation on blur
    $("#name").blur(function () {
      const nameInput = $(this);
      const name = nameInput.val();
  
      if (name === "") {
        nameInput.addClass("invalid");
        $("#validation-name").text("Name is required.");
      } else if (!validateName(name)) {
        nameInput.addClass("invalid");
        $("#validation-name").text("Name can only contain alphabets.");
      } else {
        nameInput.removeClass("invalid");
        $("#validation-name").text("");
        $("#email").prop("disabled", false);
      }
  
      toggleSubmitButton();
    });
  
    // Email field validation on blur
    $("#email").blur(function () {
      const emailInput = $(this);
      const email = emailInput.val();
  
      if (validateEmail(email)) {
        emailInput.removeClass("invalid");
        $("#validation-email").text("");
      } else {
        emailInput.addClass("invalid");
        $("#validation-email").text("Please enter a valid email.");
      }
  
      toggleSubmitButton();
    });
  
    // Form submission
    $("#submit-form").submit(function (e) {
      e.preventDefault();
  
      $.ajax({
        url: "https://script.google.com/macros/s/AKfycbyJ3YAtEl6MZQg-_IGIUgqVK83H4dkLNoRoA6EI-zUyUslAuOqAQqFcal1Ms7UxlCk/exec",
        data: $("#submit-form").serialize(),
        method: "post",
        success: function (response) {
          alert("Form submitted successfully");
          window.location.reload();
          window.location.href = "index.html";
        },
        error: function (err) {
          alert("Something Error");
        }
      });
    });
