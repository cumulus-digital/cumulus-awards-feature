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

		tag.parentsUntil('.wrapper-content', '.column,.row,.block-type-content')
			.addClass('CMLS_CCC');
			
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

			window._CMLS.CCC_IFRAME_ACTIVATE_DFP = function setupDFP() {
				var iwin = tag[0].contentWindow,
					idoc = tag[0].contentDocument;

				idoc.title = window.document.title;

				// inject DFP setup
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
						log('Retrieving DFP Property ID');
						var idCheck = this.innerText.match(/\/6717\/([a-zA-Z\.\-]+)/);
						if (idCheck.length > 1) {
							log('Activating parent DFP in iframe template for cube', this);
							iwin.eval(
								'googletag.cmd.push(function() {' +
								'	googletag.defineSlot(\'/6717/'+idCheck[1]+'\', [[300, 250], [300, 600]], \'div-gpt-ad-1418849849333-0\')' +
								'		.addService(googletag.pubads())' +
								'		.setCollapseEmptyDiv(true)' +
								'		.setTargeting("pos","mid");' +
								'	googletag.pubads().enableSingleRequest();' +
								'	googletag.enableServices();' +
								'});'
							);
							return false;
						}
					}
				});
			};

			window._CMLS.CCC_IFRAME_SETUP = function setupIframe() {
				log('Inner frame called parent iframe setup');
				tag[0].contentDocument.title = window.document.title;
			};

			//tag.after(newframe);
			tag[0].contentDocument.open();
			tag[0].contentDocument.write(tag.text());
			tag[0].contentDocument.close();

			// Set up iframe resizer
			var ifscr = window.document.createElement('script'),
				w = window;
			ifscr.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.1/iframeResizer.min.js';
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