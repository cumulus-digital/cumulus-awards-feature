(function($, window, undefined){
	
	// Deconstruct existing gallery and rebuild it as Slick
	$('.module-gallery').each(function(){
		var $originalGal = $(this),
			$newGal = $('<div class="cmls-gallery" />');
		$originalGal.find('.gallery-images > a').each(function(){
			var $this = $(this),
				$img = $this.find('img'),
				$newItem = $('<div class="cmls-gallery-item" />'),
				$newImage = $('<img />');
			$newImage
				.attr('data-lazy', $this.attr('data-image'))
				.attr('alt', $img.attr('alt'));
			$newItem.append($newImage);
			if ($img.attr('alt').length > 1 && $img.attr('alt').indexOf('NO CAPTION') < 0) {
				$newItem.append('<div class="cmls-gallery-caption">' + $img.attr('alt') + '</div>');
			}
			$newGal.append($newItem);
		});
		$originalGal.parent().append($newGal);
		installSlick();
	});

	function installSlick(){
		var options = {
			autoplay: true,
			autoplaySpeed: 4000,
			arrows: true,
			dots: true,
			speed: 300,
			centerMode: true,
			variableWidth: true,
			lazyLoad: 'progressive',
			slidesToShow: 1,
			slidesToScroll: 1
		};
		if (window.SLICK_OPTIONS) {
			options = $.extend({}, options, window.SLICK_OPTIONS);
		}
		$.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.9/slick.min.js', function() {
			$('body')
				.append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.9/slick.min.css">')
				.append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.9/slick-theme.min.css">')
				.append('<style>.slick-prev,.slick-next { left: 5px; z-index: 9999; } .slick-next { left: auto; right: 5px; }');
			$('.cmls-gallery').each(function(){
				var $this = $(this);
				if ( ! $this.data('isSlick')) {
					$this.slick(options);
					$this.data('isSlick', true);
				}
			});
		});
	}

}(jQuery, window));