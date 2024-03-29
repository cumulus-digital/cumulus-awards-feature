/* jshint browser: true, devel: true */
// @codekit-prepend "../../../js/base.js";

// Handle iframe templated builds

(function($, window, undefined){

	window.self._CMLS = window.self._CMLS || {};
	var frame_id = 'CMLS_CCC_IFRAME',
		frame_parent = window.self;
		frame_parent._CMLS = frame_parent._CMLS || {};

	// Safe wrapper for console.log
	function log(){
		if (typeof console === 'object' && console.log) {
			var ts = (new Date());
			ts = ts.toISOString() ? ts.toISOString() : ts.toUTCString();
			console.log('[CMLS Iframed Feature]', ts, [].slice.call(arguments));
		}
	}

	function loadScript(src, done) {
		var js = frame_parent.document.createElement('script');
		js.src = src;
		js.onload = function() {
			done();
		};
		js.onerror = function() {
			done(new Error('Failed to load script ' + src));
		};
		frame_parent.document.head.appendChild(js);
	}
	if (window.self.Promise) {
		main();
	} else {
		loadScript('https://polyfill.io/v3/polyfill.min.js?features=Promise', main);
	}

	function main() {

		var Promise = window.Promise;

		// Add title to interior frame from container site
		function waitForPageTitle() {
			var timeout = 10000, // 10 seconds,
			    start = Date.now();
			function waitingForPageTitle(resolve, reject) {
				var $frame = $('#' + frame_id, frame_parent.document);
				if ($frame.length) {
					resolve($frame);
				} else if (timeout && (Date.now() - start) >= timeout) {
					reject(new Error('timeout'));
				} else {
					setTimeout(waitingForPageTitle.bind(this, resolve, reject), 50);
				}
			}
			return new Promise(waitingForPageTitle);
		}
		waitForPageTitle().then(function($frame) {
			$frame.each(function() {
				this.contentDocument.title = frame_parent.document.title;
			});
		});

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
			
			// Write contents of template into generated iframe
			var template_content = $tag.text();
			if ( !!('srcdoc' in document.createElement('iframe'))) {
				$new_frame[0].srcdoc = template_content;
				$new_frame.insertBefore($tag);
			} else {
				$new_frame.insertBefore($tag);
				var new_frame_doc = $new_frame[0].contentDocument;
				new_frame_doc.open();
				new_frame_doc.write(template_content);
				new_frame_doc.close();
			}

			$tag.detach();

			// Inject iFrameResizer into parent window
			var hasTaggedElement = (template_content.indexOf('data-iframe-height') > -1) ? true : false;
			loadScript('https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js', function() {
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
			});

		}, frame_parent.document);
	}
}(window.jQuery, window.self));