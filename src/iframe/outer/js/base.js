/* jshint browser: true, devel: true */
// @codekit-prepend "../../../js/base.js";

// Handle iframe templated builds

(function($, window, undefined){

	window.self._CMLS = window.self._CMLS || {};

	// Safe wrapper for console.log
	function log(){
		if (typeof console === 'object' && console.log) {
			var ts = (new Date());
			ts = ts.toISOString() ? ts.toISOString() : ts.toUTCString();
			console.log('[CMLS Iframed Feature]', ts, [].slice.call(arguments));
		}
	}

	var frame_id = 'CMLS_CCC_IFRAME',
		frame_parent = window.self;
		frame_parent._CMLS = frame_parent._CMLS || {};

	// Add title to interior frame from container site
	frame_parent._CMLS.CCC_IFRAME_SETUP_COUNT = 0;
	frame_parent._CMLS.CCC_IFRAME_SETUP = function CCC_IFRAME_SETUP() {
		var $frame = $('#' + frame_id, frame_parent.document);

		if ( ! $frame.length) {
			log('Could not find generated frame when attempting to setup iframe');
			if (frame_parent._CMLS.CCC_IFRAME_SETUP_COUNT < 80) {
				log('Trying again...');
				frame_parent._CMLS.CCC_IFRAME_SETUP_COUNT++;
				setTimeout(function(){
					frame_parent._CMLS.CCC_IFRAME_SETUP();
				}, 200);
			}
			return;
		}

		log('Setting title on generated frame document');
		$frame.each(function() {
			this.contentDocument.title = frame_parent.document.title;
		});
	};

	$(function(){

		// Check for required identification tag of iframe
		var $tag = $('#CMLS_TEMPLATE:first', frame_parent.document);
		if ( ! $tag.length) {
			log('No #CMLS_TEMPLATE found, not an iframe feature');
			return;
		}

		// Ensure tag is an iframe
		if ( ! $tag.is('iframe')) {
			log('#CMLS_TEMPLATE is not an iframe feature!');
			return;
		}

		// Wrap our content in a recognizable class
		$tag.parentsUntil('.wrapper-content', '.column,.row,.block-type-content')
			.addClass('CMLS_CCC');
		
		// Generate new iframe
		var $new_frame = $('<iframe/>', {
			id: frame_id,
			name: frame_id,
			frameBorder: 0,
			width: '100%',
			class: 'CMLS_CCC_IFRAME',
			scrolling: false,
			allowTransparency: true,
			style: 'width: 100%',
		});
		
		$new_frame.insertBefore($tag);
		$tag.detach();

		//var new_frame_doc = $new_frame[0].contentDocument;

		// Write contents of template into generated iframe
		var template_content = $tag.text();
		$($new_frame).contents()[0].innerHTML = template_content;

		// Inject iFrameResizer into parent window
		var ifscr = frame_parent.document.createElement('script'),
			hasTaggedElement = (template_content.indexOf('data-iframe-height') > -1) ? true : false;
		ifscr.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js';
		ifscr.type = 'text/javascript';
		ifscr.onload = function(){
			var isOldIE = (navigator.userAgent.indexOf("MSIE") !== -1);
			if (hasTaggedElement) {
				log('Template content has tagged element for IFR');
			}
			frame_parent.iFrameResize({
				//log: window.IFR_DEBUG || false,
				log: (frame_parent._CMLS && frame_parent._CMLS.debug) || frame_parent.IFR_DEBUG ? true : false,
				checkOrigin: false,
				sizeWidth: false,
				tolerance: 10,
				minSize: 100,
				heightCalculationMethod: hasTaggedElement ? 'taggedElement' : isOldIE ? 'max' : 'bodyOffset',
				onInit: function(ifr) {
					var $ifr = $(ifr);
					$ifr.attr('init', true);
					$ifr.trigger('cmls-ifr-init');
					$(frame_parent).trigger('cmls-ifr-init');
				}
			}, '#' + frame_id);
		};
		frame_parent.document.head.appendChild(ifscr);

	}, frame_parent.document);
}(window.jQuery, window.self));