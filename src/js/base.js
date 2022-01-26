/* jshint browser: true, devel: true */
(function($, window, undefined) {

	// Safe wrapper for console.log
	function log(){
		if (typeof console === 'object' && console.log) {
			var ts = (new Date());
			ts = ts.toISOString() ? ts.toISOString() : ts.toUTCString();
			console.log('[CMLS Feature]', ts, [].slice.call(arguments));
		}
	}

	// Finds the content wrapper that contains the feature and adds
	// classes to its column and row so we don't need to necessarily
	// know the exact markup of the page.
	var tag = $('#CMLS_FEATURE');
	if (tag.length) {
		tag.parentsUntil('.wrapper-content', '.column,.row,.block-type-content')
			.addClass('CMLS_CCC');
		log('Added CMLS_CCC class to parent containers.');
	} else {
		log('You must add id="CMLS_FEATURE" to the script tag which loads this library!');
		return false;
	}

	window._CMLS = window._CMLS || {};
	window._CMLS.awards = window._CMLS.awards || {};

	// If we have a google analytics ID, set it up.
	var gaID = tag.attr('data-google-analytics-id');
	if (gaID) {
		log('Installing Google Analytics', gaID);
		/**
		 * Installs GA with a given ID
		 * @param  {string} id GA property ID
		 * @return {void}
		 */
		window._CMLS.installGoogleAnalytics = function installGoogleAnalytics(id) {
			if ( ! id) {
				return;
			}
			/* jshint ignore:start */
			/*jsl:ignore* /
			/*ignore jslint start*/
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			window.ga('create', id, 'auto', {'name': 'contestTracker'});
			window.ga('contestTracker.send', 'pageview');
			/*ignore jslint end*/
			/*jsl:end */
			/* jshint ignore:end */
		};
		window._CMLS.installGoogleAnalytics(gaID);
	}

	// Throttle from Underscore.js
	window._CMLS.awards.throttle = function (func, wait) {
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

}(window.jQuery, window.self));