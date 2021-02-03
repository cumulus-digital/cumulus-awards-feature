!function(e,t,n){function a(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Feature]",e,[].slice.call(arguments))}}var o=e("#CMLS_FEATURE");if(!o.length)return a('You must add id="CMLS_FEATURE" to the script tag which loads this library!'),!1;o.parentsUntil(".wrapper-content",".column,.row,.block-type-content").addClass("CMLS_CCC"),a("Added CMLS_CCC class to parent containers."),t._CMLS=t._CMLS||{},t._CMLS.awards=t._CMLS.awards||{};var i=o.attr("data-google-analytics-id");i&&(a("Installing Google Analytics",i),t._CMLS.installGoogleAnalytics=function e(n){var a,o,i,r,l,g,s;n&&(a=t,o=document,i="script",r="//www.google-analytics.com/analytics.js",l="ga",a.GoogleAnalyticsObject=l,a.ga=a.ga||function(){(a.ga.q=a.ga.q||[]).push(arguments)},a.ga.l=1*new Date,g=o.createElement(i),s=o.getElementsByTagName(i)[0],g.async=1,g.src=r,s.parentNode.insertBefore(g,s),ga("create",n,"auto",{name:"contestTracker"}),ga("contestTracker.send","pageview"))},t._CMLS.installGoogleAnalytics(i)),t._CMLS.awards.throttle=function(e,t){var n,a,o,i=null,r=0,l=function(){r=(new Date).getTime(),i=null,o=e.apply(n,a),i||(n=a=null)};return function(){var g=(new Date).getTime();r||(r=g);var s=t-(g-r);return n=this,a=arguments,s<=0||s>t?(i&&(clearTimeout(i),i=null),r=g,o=e.apply(n,a),i||(n=a=null)):i||(i=setTimeout(l,s)),o}}}(jQuery,window.self),function(e,t,n){function a(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Iframed Feature]",e,[].slice.call(arguments))}}t.self._CMLS=t.self._CMLS||{};var o="CMLS_CCC_IFRAME-"+Date.now(),i=t.self;i._CMLS.CCC_IFRAME_ACTIVATE_DFP=function t(n){e((function(){if(i.googletag&&i.googletag.pubads){var t=e("#"+o,i.document);if(t.length){var r=t[0].contentWindow,l,g,s=(0,i.googletag.pubads)().getSlots(),c=null,d=null,u=[],f="[[300,250],[300,600]]";if(s.length&&s.some((function(e){var t=e.getAdUnitPath();if(t.indexOf("/6717/")>-1)return c=t,!0})),c){if((d=i.googletag.pubads().getTargetingKeys())&&d.length&&(d.forEach((function(e){u.push("googletag.pubads().setTargeting('"+e+"', '"+i.googletag.pubads().getTargeting(e)+"');")})),u.length&&a("DFP targets defined",u)),n&&Array.isArray(n)){var m="[";Array.isArray(n[0])?n.forEach((function(e){m+="["+e.join(",")+"]"})):m+=n.join(","),f=m+="]"}a("Injecting DFP for sizeString:",f);var C="var googletag = googletag || {};\ngoogletag.cmd = googletag.cmd || [];\ngoogletag.cmd.unshift(function defineTargets() {\n"+u.join("\n")+"});\ngoogletag.cmd.unshift(function defineSlot() {var slot = googletag.defineSlot('"+c+"', "+f+", 'div-gpt-cube');if (slot) {slot.addService(googletag.pubads());slot.setCollapseEmptyDiv(true);slot.setTargeting('pos','mid');}\ngoogletag.pubads().enableSingleRequest();googletag.enableServices();});\n(function() {var gads = document.createElement('script');gads.async = true;gads.type = 'text/javascript';var useSSL = 'https:' == document.location.protocol;gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';var node = document.getElementsByTagName('script')[0];node.parentNode.insertBefore(gads, node);})();";a("Activating parent DFP in iframe template for cube",C),r.eval(C)}else a("Could not determine parent adPath, exiting DFP activation")}else a("Could not find generated frame when attempting to activate DFP")}else a("#CMLS_TEMPLATE requested DFP activation, but parent window does not have DFP")}))},i._CMLS.CCC_IFRAME_SETUP=function t(){var n=e("#"+o,i.document);n.length?(a("Setting title on generated frame document"),n.each((function(){this.contentDocument.title=i.document.title}))):a("Could not find generated frame when attempting to activate DFP")},e((function(){var t=e("#CMLS_TEMPLATE:first",i.document);if(t.length)if(t.is("iframe")){t.parentsUntil(".wrapper-content",".column,.row,.block-type-content").addClass("CMLS_CCC");var n=e("<iframe/>",{id:o,name:o,frameBorder:0,width:"100%",class:"CMLS_CCC_IFRAME",scrolling:!1,allowTransparency:!0,style:"width: 100%"});n.insertBefore(t),t.detach();var r=n[0].contentDocument,l=t.text();r.open(),r.write(l),r.close();var g=i.document.createElement("script"),s=l.indexOf("data-iframe-height")>-1;g.src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.min.js",g.type="text/javascript",g.onload=function(){var t=-1!==navigator.userAgent.indexOf("MSIE");s&&a("Template content has tagged element for IFR"),i.iFrameResize({log:!!(i._CMLS&&i._CMLS.debug||i.IFR_DEBUG),checkOrigin:!1,sizeWidth:!1,tolerance:10,minSize:100,heightCalculationMethod:s?"taggedElement":t?"max":"bodyOffset",onInit:function(t){e(t).trigger("cmls-ifr-init")}},"#"+o)},i.document.head.appendChild(g)}else a("#CMLS_TEMPLATE is not an iframe feature!");else a("No #CMLS_TEMPLATE found, not an iframe feature")}))}(jQuery,window.self);
//# sourceMappingURL=base-min.js.map