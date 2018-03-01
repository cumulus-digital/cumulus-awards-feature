/* jshint browser: true, devel: true */
// @codekit-prepend "../../../js/base.js";

// Handle iframe templated builds

;(function($, window, undefined){

	window._CMLS = window._CMLS || {};

	// Safe wrapper for console.log
	function log(){
		if (typeof console === 'object' && console.log) {
			var ts = (new Date());
			ts = ts.toISOString() ? ts.toISOString() : ts.toUTCString();
			console.log('[CMLS Iframed Feature]', ts, [].slice.call(arguments));
		}
	}

	$(function(){

		var tag = $('#CMLS_TEMPLATE');
		if (!tag.length) {
			log('No #CMLS_TEMPLATE found!');
			return;
		}

		if (tag.is('iframe')) {
			//var newframe = $('<iframe></iframe>'),
			var frame_id = 'CMLS_CCC_IFRAME-' + Date.now();

			tag.attr({
				id: frame_id,
				name: frame_id,
				width: '100%',
				frameBorder: 0,
				className: 'CMLS_CCC_IFRAME',
				scrolling: false,
				allowTransparency: true,
				style: ""
			});

			window._CMLS.CCC_IFRAME_SETUP = function setupIframe() {
				log('Inner frame called parent iframe setup');
				var iwin = tag[0].contentWindow,
					idoc = tag[0].contentDocument;

				idoc.title = window.document.title;

				// inject DFP setup
				var googletags = [],
					hasGoogletag = false;
				$('script').each(function(){
					if ( 
						// don't bother with script tags that have a src
						(! this.src || this.src.length < 1) &&
						(
							this.innerText.indexOf('var googletag') > -1 ||
							this.innerText.indexOf('googletag.defineSlot') > -1 ||
							this.innerText.indexOf('googletag.pubads().setTargeting') > -1
						)
					) {
						log('Activating parent DFP in iframe template', this);
						if (this.innerText.indexOf('var googletag') > -1) {
							googletags.unshift(this.innerText);
							hasGoogletag = true;
						} else {
							googletags.push(this.innerText);
						}
					}
				});
				if (hasGoogletag) {
					googletags.forEach(function(scr) {
						iwin.eval(scr);
					});
				}
			};

			//tag.after(newframe);
			tag[0].contentDocument.open();
			tag[0].contentDocument.write(tag.text());
			tag[0].contentDocument.close();

			// Set up iframe resizer
			var ifscr = window.document.createElement('script'),
				w = window;
			ifscr.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.16/iframeResizer.min.js';
			ifscr.type = 'text/javascript';
			ifscr.onload = function(){
				var isOldIE = (navigator.userAgent.indexOf("MSIE") !== -1);
				w.iFrameResize({
					log: window.IFR_DEBUG || false,
					checkOrigin: false,
					heightCalculationMethod: isOldIE ? 'max' : 'lowestElement'
				}, '#' + frame_id);
			};
			window.document.head.appendChild(ifscr);

		} else {
			log('#CMLS_TEMPLATE is not an iframe!');
		}
	});
}(jQuery, window.self));