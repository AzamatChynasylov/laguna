$(function () {

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

	});

});