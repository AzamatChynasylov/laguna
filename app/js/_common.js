$( document ).ready(function () {

	var mql = window.matchMedia('all and (max-width: 576px)');
	if (mql.matches) {
		$('.top-nav nav').addClass("mmenu").attr('id', 'mmenu');
		var $menu = $('#mmenu').mmenu({
		extensions: ['widescreen','effect-menu-slide','pagedim-black','position-right'],
		navbar: {
			title: '<img src="assets/img/logo.png" class="img-responsive"  alt="Логотип "/>'
		}
	});
	var $icon = $(".hamburger ");
		var API = $menu.data( "mmenu" );

		$icon.on( "click", function() {
			API.open();
		});

		API.bind( "open:finish", function() {
			setTimeout(function() {
					$icon.addClass( "is-active" );
			}, 100);
		});
		API.bind( "close:finish", function() {
			setTimeout(function() {
					$icon.removeClass( "is-active" );
			}, 100);
		});
	var apiMmenu = $('#mmenu').data('mmenu');
	console.log(apiMmenu);
	apiMmenu.bind('open:finish', function(){
		$('.humburger').addClass('is-active');
	});
	} else {
			
	}

	AOS.init();
	// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
$('.litle-about > .circle-big').paroller({ factor: 0.2, factorXs: 0.2, type: 'foreground', direction: 'vertical' , transition:'transform .2s linear'});
$('.header-promo-img > img').paroller({ factor: 0.2, factorXs: 0.2, type: 'foreground', direction: 'horizontal' , transition:'transform .2s linear'});
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

	// //owl
	$(".partners-slider").owlCarousel({
		loop:true,
		margin:10,
		autoplay:true,
    autoplayTimeout:1500,
    //nav:true,
	});
	$(".teacher-review-slider").owlCarousel({
		loop:true,
		margin:10,
		navText : ["<img clas='img-svg' src='assets/img/SVG/back.svg'>","<img  clas='img-svg'  src='assets/img/SVG/next.svg'>"],
		items: 1,
    nav:true,
	});
	// // $('#menu').slicknav({
	// // 	label: '',
	// // 	appendTo: '.men-d'
	// // });
	
	
	// $('.faq li .question').click(function () {
	// 	$(this).find('.plus-minus-toggle').toggleClass('collapsed');
	// 	$(this).parent().toggleClass('active-question');
	// });

	// window.onscroll = function () {
	// 	myFunction()
	// };

	// // Get the header
	// var header = document.getElementById("top-nav");

	// // Get the offset position of the navbar
	// var sticky = header.offsetTop;

	// // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
	// function myFunction() {
	// 	if (window.pageYOffset > sticky) {
	// 		header.classList.add("sticky");
	// 	} else {
	// 		header.classList.remove("sticky");
	// 	}
	// }
	
	function heightses() {
		//$(".cause-items").height('auto').equalHeights();
		$(".main-direct-item p").height('auto').equalHeights();
		$(".about-school-img p").height('auto').equalHeights();
	}

	$(window).resize(function () {
		heightses();
	});

	heightses();

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



});
