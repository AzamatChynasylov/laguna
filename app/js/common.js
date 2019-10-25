$(document).ready(function ($) {

	//Replace all SVG images with inline SVG
	$('img.img-svg').each(function () {
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg');

			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');

	});

	$("a[href='#top']").click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, "slow");
		return false;
	});
	$("a[href='#our-family']").click(function () {
		$("html, body").animate({scrollTop: $('#our-family').offset().top }, 2000);
		return false;
	});
	$("a[href='#why-we']").click(function () {
		$("html, body").animate({scrollTop: $('#why-we').offset().top }, 2000);
		return false;
	});
	
	$(window).scroll(function () {

		var height = $(document).scrollTop();
		if (height > 300) {
			$(".sroll-up").fadeIn(5);
		} else {
			$(".sroll-up").fadeOut(5);
		}
	});

	function heightses() {
		//$(".cause-items").height('auto').equalHeights();
		$(".why-we-content-text p").height('auto').equalHeights();
		$(".our-mission-count-text p").height('auto').equalHeights();
	}

	$(window).resize(function () {
		heightses();
	});

	$('.our-family-items').slick({
		lazyLoad: 'ondemand',
		centerMode: true,
		slidesToShow: 3,
		autoplay: true,
		autoplaySpeed: 2000,
		infinite: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]

	});

	$(".sf-menu").after("<div id='my-menu'>");
	$(".sf-menu").clone().appendTo("#my-menu");
	$("#my-menu").find("*").attr("style", "");
	$("#my-menu").find("ul").removeClass("sf-menu");
	$("#my-menu").mmenu({
		extensions : [ 'widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black' ],
		navbar: {
			title: "Меню"
		}
	});

	var api = $("#my-menu").data("mmenu");
	api.bind("closed", function () {
		$(".toggle-mnu").removeClass("on");
	});

	$(".mobile-mnu").click(function() {
		var mmAPI = $("#my-menu").data( "mmenu" );
		mmAPI.open();
		var thiss = $(this).find(".toggle-mnu");
		thiss.toggleClass("on");
		$(".main-mnu").slideToggle();
		return false;
	});

	$('nav li a[href="/' + location.pathname.split("/")[1] + '"]').addClass('active');


	$('.open-popup-link').magnificPopup({
		type:'inline',
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});

	$('a[href="#callback"]').click(function() {
		$("#callback .formname").val($(this).data("form"));
	});

	$(".callback").submit(function() { //Change
	
		var th = $(this);
	//	console.log(th.serialize());
		$.ajax({
			type: "POST",
			url: "/main/sendEmail", //Change
			data: th.serialize(),
			
		}).done(function() {
		
			$(".success1").addClass("visible");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
				$(".success1").removeClass("visible");
				$.magnificPopup.close();
			}, 3000);
		});
		return false;
	});
	
	$(".individual h2, .banner-text h2").animated("fadeInDown");
	$(".individual-button a").animated("fadeInRight");


});