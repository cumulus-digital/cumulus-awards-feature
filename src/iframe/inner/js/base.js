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
					bounds.top + frameBounds.top - _lazyload.advance <= window.self.parent.innerHeight &&
					style.display !== 'none'
				) {
					if (this.dataset.src) {
						if ( ! this.dataset.original_src) {
							this.dataset.original_src = this.src;
						}
						if (this.src.indexOf(this.dataset.src) === -1) {
							log('Setting src', this, this.dataset.src, this.src);
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
		var loadedEvent = window.self.document.createEvent('Event');
		loadedEvent.initEvent('jquery.loaded', true, true);
		window.self.dispatchEvent(loadedEvent);

		$(function(){

			// Handle our fake iframes
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
			if (
				! window.self.DO_NOT_ACTIVATE_DFP &&
				window.self.document.getElementById('div-gpt-ad-1418849849333-0') &&
				window.self.parent._CMLS.CCC_IFRAME_ACTIVATE_DFP
			) {
				window.self.parent._CMLS.CCC_IFRAME_ACTIVATE_DFP();
			}

			// Activate LazyLoader
			window.self.parent.document.addEventListener("scroll", _throttle(_lazyload.handler, 500));
			window.self.parent.addEventListener("resize", _throttle(_lazyload.handler, 500));
			window.self.parent.addEventListener("orientationchange", _throttle(_lazyload.handler, 500));

			_lazyload.handler();

		});
	};
	window.document.head.appendChild(jqscr);

	// Start up iframe-resizer
	log('Injecting iframe-resizer contentWindow library');
	var ifscr = window.document.createElement('script');
	ifscr.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.contentWindow.min.js';
	ifscr.onload = function() {
		log('iframe-resizer contentWindow loaded.');
	};
	window.document.head.appendChild(ifscr);

	// Handle DFP
	window.self.INIT_DFP_COUNT = 0;
	window.self.INIT_DFP = function INIT_DFP(sizes) {
		if ( ! window.self.parent.googletag || ! window.self.parent.googletag.pubads) {
			log('#CMLS_TEMPLATE requested DFP activation, but parent window does not have DFP');
			if (window.self.INIT_DFP_COUNT < 10) {
				log('Trying again in 1 second...');
				window.self.INIT_DFP_COUNT++;
				setTimeout(function() {
					window.self.INIT_DFP(sizes);
				}, 1000);
			}
			return;
		}

		var googletag = window.self.googletag || {cmd: []},
			wp = window.self.parent,
			g = wp.googletag,
			gpa = g.pubads,
			slots = gpa().getSlots(),
			adPath = null,
			targetingKeys = null;

		// Find the slots that correspond to our network ID
		if (slots.length) {
			slots.some(function(slot) {
				var p = slot.getAdUnitPath();
				if (p.indexOf('/6717/') > -1) {
					adPath = p;
					return true;
				}
			});
		}

		// Make sure we have an adpath
		if ( ! adPath) {
			log('Could not determine parent adPath, exiting DFP activation');
			return;
		}

		// Find existing global targeting keys from parent window
		targetingKeys = gpa().getTargetingKeys();
		log('Setting DFP targeting keys', targetingKeys);
		if (targetingKeys && targetingKeys.length) {
			googletag.cmd.unshift(function defineTargets() {
				targetingKeys.forEach(function(key) {
					var t = gpa().getTargeting(key);
					window.top.console.log('Defining DFP target', key, t);
					googletag.pubads().setTargeting(key, t);
				});
			});
		}

		log('Setting up DFP slot');
		googletag.cmd.unshift(function defineSlot() {
			window.top.console.log('Activating DFP slot');
			var slot = googletag.defineSlot(adPath, sizes, 'div-gpt-cube');
			if (slot) {
				slot.addService(googletag.pubads());
				slot.setCollapseEmptyDiv(true);
				slot.setTargeting('pos', 'mid');
			}
			googletag.pubads().enableSingleRequest();
			googletag.enableServices();
		});

		log('googletag.cmd', googletag.cmd);

		(function() {
			var gads = window.self.document.createElement('script');
			gads.async = true;
			gads.type = 'text/javascript';
			gads.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
			var node = window.self.document.getElementsByTagName('script')[0];
			node.parentNode.insertBefore(gads, node);
		})();

		log('DFP activated.');
	};

	log('Setting document title from parent');
	window.self.document.title = window.self.parent.document.title;

}(window.self));