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
  js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/*ignore jslint end*/
/*jsl:end */
/* jshint ignore:end */

/**
 * Application
 */
(function (window, undefined) {
	
	// Safe wrapper for console.log
	function log(){
		if (typeof console === 'object' && console.log) {
			var ts = (new Date());
			ts = ts.toISOString() ? ts.toISOString() : ts.toUTCString();
			console.log('[CMLS Iframed Feature INNER]', ts, [].slice.call(arguments));
		}
	}

	// Polyfill promise if necessary
	function loadScript(src, done) {
		var js = window.self.document.createElement('script');
		js.src = src;
		js.onload = function() {
			done();
		};
		js.onerror = function() {
			done(new Error('Failed to load script ' + src));
		};
		window.self.document.head.appendChild(js);
	}
	if (window.self.Promise) {
		main();
	} else {
		loadScript('https://polyfill.io/v3/polyfill.min.js?features=Promise', main);
	}

	function main() {

		var Promise = window.Promise;

		// For any fake iframes
		window.document.createElement('iiframe'); // jshint ignore:line

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
					this.loadable = window.$(this.selector);
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

		// jQuery loader promise
		window.jQueryLoader = function(){
			return new Promise(function(resolve, reject) {
				if ( ! window.hasOwnProperty('jQuery')) {
					loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js', function() {
						var loadedEvent = window.self.document.createEvent('Event');
						loadedEvent.initEvent('jquery.loaded', true, true);
						window.self.dispatchEvent(loadedEvent);
						resolve();
					});
				} else {
					resolve();
				}
			});
		};
		window.jQueryLoader().then(function(){
			var $ = window.jQuery;
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

				// Load events make parent iframe resize
				$('img,iframe').on('load', function() {
					if (window.self.parentIFrame) {
						window.self.parentIFrame.reset();
					}
				});

				// Activate LazyLoader
				window.self.parent.document.addEventListener("scroll", _throttle(_lazyload.handler, 500));
				window.self.parent.addEventListener("resize", _throttle(_lazyload.handler, 500));
				window.self.parent.addEventListener("orientationchange", _throttle(_lazyload.handler, 500));

				_lazyload.handler();

			});
		});

		window.ifrLoader = function(){
			return new Promise(function(resolve, reject) {
				if ( ! window.hasOwnProperty('parentIFrame')) {
					log('Injecting iframe-resizer contentWindow library');
					loadScript('https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js', function(e) {
						var loadedEvent = window.self.document.createEvent('Event');
						loadedEvent.initEvent('ifr.loaded', true, true);
						window.self.dispatchEvent(loadedEvent);
						resolve();
					});
				} else {
					resolve();
				}
			});
		};
		window.ifrLoader();

		// Handle DFP
		function waitForParentDFP() {
			var timeout = 10000, // 10 seconds,
			    start = Date.now();
			function waitingForParentDFP(resolve, reject) {
				if (window.self.parent.googletag && window.self.parent.googletag.pubads) {
					resolve(window.self.parent.googletag);
				} else if (timeout && (Date.now() - start) >= timeout) {
					reject(new Error('timeout'));
				} else {
					setTimeout(waitingForParentDFP.bind(this, resolve, reject), 50);
				}
			}
			return new Promise(waitingForParentDFP);
		}
		window.self.INIT_DFP = function INIT_DFP(sizes) {

			log('DFP init requested, waiting for parent googletag...');
			waitForParentDFP()
			.then(
				function(){

					var googletag = window.self.googletag || {cmd: []},
					    wp = window.self.parent,
					    g = wp.googletag,
					    gpa = g.pubads,
					    adPath = null,
					    targetingKeys = null;

					// Discover ad path of parent site
					if (wp.GPT_SITE_ID) {
						adPath = wp.GPT_SITE_ID;
					} else {
						var slots = gpa().getSlots();
						if (slots.length) {
							slots.some(function(slot) {
								var p = slot.getAdUnitPath();
								if (p.indexOf('/6717') > -1) {
									adPath = p;
									return true;
								}
							});
						}
					}

					// Make sure we have an adpath
					if ( ! adPath) {
						log('Could not determine parent adPath, exiting DFP activation');
						return;
					}

					// Find existing global targeting keys from parent window
					targetingKeys = gpa().getTargetingKeys();
					if (targetingKeys && targetingKeys.length) {
						log('Setting DFP targeting keys', targetingKeys);
						googletag.cmd.unshift(function defineTargets() {
							targetingKeys.forEach(function(key) {
								var t = gpa().getTargeting(key);
								log('Defining GPT target', key, t);
								googletag.pubads().setTargeting(key, t);
							});
						});
					}

					googletag.cmd.unshift(function(){
						log('Setting up DFP slot');
						var slot = googletag.defineSlot(adPath, sizes, 'div-gpt-cube')
						           .addService(googletag.pubads())
						           .setCollapseEmptyDiv(true)
						           .setTargeting('pos', 'mid');
						googletag.pubads().enableSingleRequest();
						googletag.enableServices();
					});

					(function() {
						var gads = window.self.document.createElement('script');
						gads.async = true;
						gads.type = 'text/javascript';
						gads.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
						var node = window.self.document.getElementsByTagName('script')[0];
						node.parentNode.insertBefore(gads, node);
					})();

					log('DFP activated.');
				},
				function(error){
					log('Timed out waiting for parent googletag.');
				}
			);

		};

	}

	log('Setting document title from parent');
	window.self.document.title = window.self.parent.document.title;

}(window.self));