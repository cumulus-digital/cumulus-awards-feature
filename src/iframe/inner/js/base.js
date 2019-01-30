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

	// Throttle from Underscore.js
	var _throttle = function (func, wait) {
		var context, args, result;
		var timeout = null;
		var previous = 0;

		var later = function () {
			previous = (new Date()).getTime();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) { context = args = null; }
		};
		return function () {
			var now = (new Date()).getTime();
			if (!previous) { previous = now; }
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) { context = args = null; }
			} else if (!timeout) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	};

	// Handle lazyload
	var _lazyload = {
		selector: '[lazyload="on"]',
		advance: 200,
		getLoadable: function() {
			if ( ! this.loadable) {
				this.loadable = $(this.selector);
			}
			return this.loadable;
		},
		handler: function() {
			_lazyload.getLoadable().each(function() {
				if (this.dataset.originalsrc && this.src === this.dataset.originalsrc) {
					return;
				}
				var style = getComputedStyle(this),
					bounds = this.getBoundingClientRect(),
					frameBounds = this.ownerDocument.defaultView.frameElement.getBoundingClientRect();
				if (
					(bounds && frameBounds) &&
					bounds.top + frameBounds.top - _lazyload.advance <= window.parent.innerHeight &&
					style.display !== 'none'
				) {
					if ( ! this.dataset.original_src) {
						this.dataset.original_src = this.src;
					}
					if (this.src !== this.dataset.src) {
						this.src = this.dataset.src;
					}
					if (this.dataset.srcset) {
						if ( ! this.dataset.original_srcset) {
							this.dataset.original_srcset = this.srcset;
						}
						if (this.srcset !== this.dataset.srcset) {
							this.srcset = this.dataset.srcset;
						}
					}
				}
			});
		}
	};

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
				var $container = $(this),
					$newframe = $('<iframe/>'),
					attrs = $container.prop('attributes');
				log('Resolving inner iframe', this, attrs);
				$.each(attrs, function(){
					if (this.specified) {
						$newframe.attr(this.name, this.value);
					}
				});
				$container.after($newframe);
				Object.assign($newframe[0].dataset, $container[0].dataset);
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

			// Activate LazyLoader
			window.parent.document.addEventListener("scroll", _throttle(_lazyload.handler, 500));
			window.parent.addEventListener("resize", _throttle(_lazyload.handler, 500));
			window.parent.addEventListener("orientationchange", _throttle(_lazyload.handler, 500));

			_lazyload.handler();
		});
	};
	window.document.head.appendChild(jqscr);

	// Start up iframe-resizer
	log('Injecting iframe-resizer contentWindow library');
	var ifscr = window.document.createElement('script');
	ifscr.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.4/iframeResizer.contentWindow.min.js';
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