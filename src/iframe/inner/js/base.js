/* jshint browser: true, devel: true */
;(function (window, undefined) {
	
	// Safe wrapper for console.log
	function log(){
		if (typeof console === 'object' && console.log) {
			var ts = (new Date());
			ts = ts.toISOString() ? ts.toISOString() : ts.toUTCString();
			console.log('[CMLS Iframed Feature INNER]', ts, [].slice.call(arguments));
		}
	}

	// For any fake iframes
	var iiframe = window.document.createElement('iiframe'); // jshint ignore:line

	// Load jquery
	log('Injecting jQuery');
	var jqscr = window.document.createElement('script');
	jqscr.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js';
	jqscr.type = 'text/javascript';
	jqscr.onload = function(){
		log('jQuery injected.');
		var $ = window.jQuery;

		// Handle our fake iframes
		$(function(){
			$('iiframe').each(function() {
				log('Resolving inner iframe', this);
				var container = $(this),
					newframe = window.document.createElement('iframe'),
					attrs = this.attributes;
				$.each(attrs, function(){
					//if (this.specified) {
						newframe[this.name] = this.value;
					//}
				});
				container.after(newframe);
				container.remove();
			});

			$('img').load(function() {
				if (window.self.parentIFrame) {
					window.self.parentIFrame.reset();
				}
			});
		});
	};
	window.document.head.appendChild(jqscr);

	// Start up iframe-resizer
	log('Injecting iframe-resizer contentWindow library');
	var ifscr = window.document.createElement('script');
	ifscr.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.16/iframeResizer.contentWindow.min.js';
	ifscr.onload = function() {
		log('iframe-resizer contentWindow loaded.');
	};
	window.document.head.appendChild(ifscr);

	// Run parent processor
	if (
		window.parent._CMLS &&
		window.parent._CMLS.CCC_IFRAME_SETUP
	) {
		log('Calling parent iframe setup');
		window.parent._CMLS.CCC_IFRAME_SETUP(window.self);
	}

}(window.self));