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
			
			var frame_id = 'CMLS_CCC_IFRAME-' + Date.now(),
				frame_parent = window.self;

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
			window._CMLS.CCC_IFRAME_ACTIVATE_DFP = function setupDFP(sizes) {
				if ( ! frame_parent.googletag || ! frame_parent.googletag.pubads) {
					log('Iframe content contains DFP slots, but main window does not have DFP');
					return;
				}

				log('Activating DFP inside iframe');
				var iwin = tag[0].contentWindow,
					idoc = tag[0].contentDocument;

				idoc.title = window.document.title;

				var pa = frame_parent.googletag.pubads(),
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
				var targetingKeys = frame_parent.googletag.pubads().getTargetingKeys(),
					targets = [];
				if (targetingKeys && targetingKeys.length) {
					targetingKeys.forEach(function(key){
						targets.push(
							'googletag.pubads().setTargeting(' +
							'\'' + key + '\', ' +
							'\'' + frame_parent.googletag.pubads().getTargeting(key) + '\'' +
							');'
						);
					});
				}

				log('DFP targets defined', targets);

				if (adPath) {
					var sizeString = '[[300,250],[300,600]]';
					if (sizes && Array.isArray(sizes)) {
						var tmpSizeString = '[';
						if (Array.isArray(sizes[0])) {
							sizes.forEach(function(size) {
								tmpSizeString += '[' + size.join(',') + ']';
							});
						} else {
							tmpSizeString += sizes.join(',');
						}
						tmpSizeString += ']';
						sizeString = tmpSizeString;
					}
					log('Injecting DFP for sizes', sizeString);
					var dfpScript =
						"var googletag = googletag || {};" +
						"googletag.cmd = googletag.cmd || [];" +

						"googletag.cmd.unshift(function defineTargets() {" +
						"	" + targets.join("\n") +
						"});" +

						"googletag.cmd.unshift(function defineSlot() {" +
						"	googletag.defineSlot('" + adPath + "', " + sizeString + ", 'div-gpt-ad-1418849849333-0')" +
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
			ifscr.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.min.js';
			ifscr.type = 'text/javascript';
			ifscr.onload = function(){
				var isOldIE = (navigator.userAgent.indexOf("MSIE") !== -1);
				var hasTaggedElement = (tag.text().indexOf('data-iframe-height') > -1) ? true : false;
				if (hasTaggedElement) {
					log('iframe content has tagged element for IFR');
				}
				w.iFrameResize({
					//log: window.IFR_DEBUG || false,
					log: (window._CMLS && window._CMLS.debug) || window.IFR_DEBUG ? true : false,
					checkOrigin: false,
					sizeWidth: false,
					tolerance: 10,
					minSize: 100,
					heightCalculationMethod: hasTaggedElement ? 'taggedElement' : isOldIE ? 'max' : 'bodyOffset',
					initCallback: function(ifr) {
						$(ifr).trigger('cmls-ifr-init');
					}
				}, '#' + frame_id);
			};
			window.document.head.appendChild(ifscr);

		} else {
			log('#CMLS_TEMPLATE is not an iframe!');
		}
	});
}(jQuery, window.self));