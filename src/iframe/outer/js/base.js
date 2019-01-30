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

		// Check for required identification tag of iframe
		var tag = $('#CMLS_TEMPLATE:first');
		if (!tag.length) {
			log('No #CMLS_TEMPLATE found, not an iframe feature');
			return;
		}

		// Wrap our content in a recognizable class
		tag.parentsUntil('.wrapper-content', '.column,.row,.block-type-content')
			.addClass('CMLS_CCC');
		
		// If identifying tag is an iframe, set it up
		if (tag.is('iframe')) {
			
			var frame_id = 'CMLS_CCC_IFRAME-' + Date.now();

			tag.attr({
				id: frame_id,
				name: frame_id,
				width: '100%',
				frameBorder: 0,
				class: 'CMLS_CCC_IFRAME',
				scrolling: false,
				allowTransparency: true,
				style: ""
			});
			tag[0].name = frame_id;
			tag[0].id = frame_id;

			// Add DFP cube ad on load
			window._CMLS.CCC_IFRAME_ACTIVATE_DFP = function setupDFP(parent) {
				log('Activating DFP inside iframe');
				var iwin = tag[0].contentWindow,
					idoc = tag[0].contentDocument;

				idoc.title = window.document.title;

				if (parent.googletag && parent.googletag.pubads) {
					var pa = parent.googletag.pubads(),
						slots = pa.getSlots(),
						adPath;
					if (slots.length) {
						slots.some(function(slot) {
							var p = slot.getAdUnitPath();
							if (p.indexOf('/6717/') > -1) {
								adPath = p;
								return true;
							}
						});
					}
					var targetingKeys = parent.googletag.pubads().getTargetingKeys(),
						targets = [];
					if (targetingKeys && targetingKeys.length) {
						targetingKeys.forEach(function(key){
							targets.push(
								'googletag.pubads().setTargeting(' +
								'\'' + key + '\', ' +
								'\'' + window.self.googletag.pubads().getTargeting(key) + '\'' +
								');'
							);
						});
					}

					log('DFP targets defined', targets);

					if (adPath) {
						var dfpScript =
							"var googletag = googletag || {};" +
							"googletag.cmd = googletag.cmd || [];" +

							"googletag.cmd.unshift(function defineTargets() {" +
							"	" + targets.join("\n") +
							"});" +

							"googletag.cmd.unshift(function defineSlot() {" +
							"	googletag.defineSlot('" + adPath + "', [[300, 250], [300, 600]], 'div-gpt-ad-1418849849333-0')" +
							"		.addService(googletag.pubads())" +
							"		.setCollapseEmptyDiv(true)" +
							"		.setTargeting('pos','mid');" +
							"	googletag.pubads().enableSingleRequest();" +
							"	googletag.enableServices();" +
							"});" +

							"(function() {" +
							"var gads = document.createElement('script');" +
							"gads.async = true;" +
							"gads.type = 'text/javascript';" +
							"var useSSL = 'https:' == document.location.protocol;" +
							"gads.src = (useSSL ? 'https:' : 'http:') + " +
							"'//www.googletagservices.com/tag/js/gpt.js';" +
							"var node = document.getElementsByTagName('script')[0];" +
							"node.parentNode.insertBefore(gads, node);" +
							"})();";

						log('Activating parent DFP in iframe template for cube', dfpScript);
						iwin.eval(dfpScript);
					}
				}
			};

			// Add title to interior frame from container site
			window._CMLS.CCC_IFRAME_SETUP = function setupIframe() {
				log('Inner frame called parent iframe setup');
				tag[0].contentDocument.title = window.document.title;
			};

			// Write contents of iframe tag into iframe window
			tag[0].contentDocument.open();
			tag[0].contentDocument.write(tag.text());
			tag[0].contentDocument.close();

			// Set up iframe resizer
			var ifscr = window.document.createElement('script'),
				w = window;
			ifscr.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.4/iframeResizer.min.js';
			ifscr.type = 'text/javascript';
			ifscr.onload = function(){
				var isOldIE = (navigator.userAgent.indexOf("MSIE") !== -1);
				w.iFrameResize({
					log: window.IFR_DEBUG || false,
					checkOrigin: false,
					sizeWidth: false,
					tolerance: 1,
					minSize: 100,
					heightCalculationMethod: isOldIE ? 'max' : 'lowestElement'
				}, '#' + frame_id);
			};
			window.document.head.appendChild(ifscr);

		} else {
			log('#CMLS_TEMPLATE is not an iframe!');
		}
	});
}(jQuery, window.self));