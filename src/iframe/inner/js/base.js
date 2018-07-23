/* jshint browser: true, devel: true */

/* jshint ignore:start */
/*jsl:ignore* /
/*ignore jslint start*/

// TWITTER TIMELINE WIDGET
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

// FACEBOOK API
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Google DFP Setup
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
	var gads = document.createElement('script');
	gads.async = true;
	gads.type = 'text/javascript';
	var useSSL = 'https:' == document.location.protocol;
	gads.src = (useSSL ? 'https:' : 'http:') + 
	'//www.googletagservices.com/tag/js/gpt.js';
	var node = document.getElementsByTagName('script')[0];
	node.parentNode.insertBefore(gads, node);
})();

/*ignore jslint end*/
/*jsl:end */
/* jshint ignore:end */

/**
 * Application
 */
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
				var $container = $(this),
					$newframe = $('<iframe/>'),
					attrs = $container.prop('attributes');
				$.each(attrs, function(){
					if (this.specified) {
						$newframe.prop(this.name, this.value);
					}
				});
				$container.after($newframe);
				$container.remove();
			});

			$('img,iframe').load(function() {
				if (window.self.parentIFrame) {
					window.self.parentIFrame.reset();
				}
			});

			// Activate DFP if cube is present
			if (window.self.document.getElementById('div-gpt-ad-1418849849333-0')) {
				window.parent._CMLS.CCC_IFRAME_ACTIVATE_DFP(window.self);
			}
		});
	};
	window.document.head.appendChild(jqscr);

	// Start up iframe-resizer
	log('Injecting iframe-resizer contentWindow library');
	var ifscr = window.document.createElement('script');
	ifscr.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.1/iframeResizer.contentWindow.min.js';
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