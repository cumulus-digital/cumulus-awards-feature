(function($, window, undefined){
	
		/**
	 * Installs Google Analytics
	 * @param  {string} id GA Property ID
	 */
	window.installGoogleAnalytics = function(id, name) {
		if (! id) {
			return;
		}

		/* jshint ignore:start */
		/*jsl:ignore* /
		/*ignore jslint start*/
		/* adapted from https://github.com/darkskyapp/string-hash */
		function hashIt(str) {
			var hash = 5381,
			i = str.length;

			while(i) {
				hash = (hash * 33) ^ str.charCodeAt(--i);
			}

			/* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
			* integers. Since we want the results to be always positive, convert the
			* signed int to an unsigned by doing an unsigned bitshift. */
			return hash >>> 0;
		}

		if ( ! name) {
			name = 'fT' + hashIt(window.self.document.title);
		} else {
			name = 'fT' + name;
		}
		/*ignore jslint end*/
		/*jsl:end */
		/* jshint ignore:end */

		/* jshint ignore:start */
		/*jsl:ignore* /
		/*ignore jslint start*/
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', id, 'auto', {'name': name});
		ga(name + '.send', 'pageview');
		/*ignore jslint end*/
		/*jsl:end */
		/* jshint ignore:end */

		return name;

	};

}(jQuery, window));