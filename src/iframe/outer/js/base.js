/* jshint browser: true, devel: true */
// @codekit-prepend "../../../js/base.js";

// Handle iframe templated builds

;(function($, window, undefined){

	window.self._CMLS = window.self._CMLS || {};

	// Safe wrapper for console.log
	function log(){
		if (typeof console === 'object' && console.log) {
			var ts = (new Date());
			ts = ts.toISOString() ? ts.toISOString() : ts.toUTCString();
			console.log('[CMLS Iframed Feature]', ts, [].slice.call(arguments));
		}
	}

	var frame_id = 'CMLS_CCC_IFRAME-' + Date.now(),
		frame_parent = window.self;
		frame_parent._CMLS = frame_parent._CMLS || {};

	/**
	 * Allow generated frame to inject parent DFP setup for a cube ad
	 * @param {array} sizes Array of ad sizes to inject for cube, default is [[300,250], [300,600]]
	 */
	function init_DFP(sizes) {
		if ( ! frame_parent.googletag || ! frame_parent.googletag.pubads) {
			log('#CMLS_TEMPLATE requested DFP activation, but parent window does not have DFP');
			return;
		}

		var $frame = $('#' + frame_id, frame_parent.document);

		if ( ! $frame.length) {
			log('Could not find generated frame when attempting to activate DFP, setting listener', '#' + frame_id);
			$(frame_parent).on('cmls-ifr-init', init_DFP(sizes));
			return;
		}

		var fwin = $frame[0].contentWindow,
			g = frame_parent.googletag,
			pa = g.pubads,
			slots = pa().getSlots(),
			adPath = null,
			targetingKeys = null,
			targets = [],
			sizeString = '[[300,250],[300,600]]';

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

		// Find existing global targeting keys from the parent window
		targetingKeys = frame_parent.googletag.pubads().getTargetingKeys();
		if (targetingKeys && targetingKeys.length) {
			targetingKeys.forEach(function(key){
				targets.push(
					'googletag.pubads().setTargeting(' +
					'\'' + key + '\', ' +
					'\'' + frame_parent.googletag.pubads().getTargeting(key) + '\'' +
					');'
				);
			});

			if (targets.length) {
				log('DFP targets defined', targets);
			}
		}

		// Generate new sizeString if requested
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
		log('Injecting DFP for sizeString:', sizeString);

		var dfpScript =
			"var googletag = googletag || {cmd: []};\n" +

			"googletag.cmd.unshift(function defineTargets() {\n" +
				targets.join("\n") +
			"});\n" +

			"googletag.cmd.unshift(function defineSlot() {" +
				"var slot = googletag.defineSlot('" + adPath + "', " + sizeString + ", 'div-gpt-cube');" +
				"if (slot) {" +
					"slot.addService(googletag.pubads());" +
					"slot.setCollapseEmptyDiv(true);" +
					"slot.setTargeting('pos','mid');" +
				"}\n" +
				"googletag.pubads().enableSingleRequest();" +
				"googletag.enableServices();" +
			"});\n" +

			"(function() {" +
			"var gads = document.createElement('script');" +
			"gads.async = true;" +
			"gads.type = 'text/javascript';" +
			"gads.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';" +
			"var node = document.getElementsByTagName('script')[0];" +
			"node.parentNode.insertBefore(gads, node);" +
			"})();";

		log('Activating parent DFP in iframe template for cube', dfpScript);
		fwin.eval(dfpScript);
	}

	frame_parent._CMLS.CCC_IFRAME_ACTIVATE_DFP = function CCC_IFRAME_ACTIVATE_DFP(sizes){
		init_DFP(sizes);
	};

	// Add title to interior frame from container site
	frame_parent._CMLS.CCC_IFRAME_SETUP = function CCC_IFRAME_SETUP() {
		var $frame = $('#' + frame_id, frame_parent.document);

		if ( ! $frame.length) {
			log('Could not find generated frame when attempting to activate DFP');
			return;
		}

		log('Setting title on generated frame document');
		$frame.each(function() {
			this.contentDocument.title = frame_parent.document.title;
		});
	};

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
		
		$new_frame.insertBefore($tag);
		$tag.detach();

		var new_frame_doc = $new_frame[0].contentDocument;

		// Write contents of template into generated iframe
		var template_content = $tag.text();
		new_frame_doc.open();
		new_frame_doc.write(template_content);
		new_frame_doc.close();

		// Inject iFrameResizer into parent window
		var ifscr = frame_parent.document.createElement('script'),
			hasTaggedElement = (template_content.indexOf('data-iframe-height') > -1) ? true : false;
		ifscr.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.min.js';
		ifscr.type = 'text/javascript';
		ifscr.onload = function(){
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
					$(ifr).setAttribute('init', true).trigger('cmls-ifr-init');
					frame_parent.trigger('cmls-ifr-init');
				}
			}, '#' + frame_id);
		};
		frame_parent.document.head.appendChild(ifscr);

	}, frame_parent.document);
}(jQuery, window.self));