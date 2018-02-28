;(function (window, undefined) {
	
	// Run parent processor
	if (
		window.parent._CMLS &&
		window.parent._CMLS.CCC_IFRAME_SETUP
	) {
		window.parent._CMLS.CCC_IFRAME_SETUP(window.self);
	}

	// For any fake iframes
	window.document.createElement('iiframe');

	// Load jquery
	var jqscr = window.document.createElement('script');
	jqscr.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js';
	jqscr.type = 'text/javascript';
	jqscr.onload = function(){
		var $ = window.jQuery;

		// Handle our fake iframes
		$(function(){
			$('iiframe').each(function() {
				var container = $(this),
					newframe = window.document.createElement('iframe'),
					attrs = this.attributes;
				$.each(attrs, function(){
					if (this.specified) {
						newframe[this.name] = this.value;
					}
				});
				container.append(newframe);
			});
		});
	};

	// Start up loazy loader
	(function(w, d){
		var b = d.getElementsByTagName('body')[0];
		var s = d.createElement("script"); s.async = true;
		var v = !("IntersectionObserver" in w) ? "8.6.0" : "10.4.2";
		s.src = "https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/" + v + "/lazyload.min.js";
		w.lazyLoadOptions = {
			container: window.parent.document.body
		}; // Your options here. See "recipes" for more information about async.
		b.appendChild(s);
	}(window, document));


	// Start up iframe-resizer
	var ifscr = window.document.createElement('script');
	ifscr.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.15/iframeResizer.contentWindow.min.js';
	window.document.head.appendChild(ifscr);

}(window.self));