!function(e,t,n){function a(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Feature]",e,[].slice.call(arguments))}}var o=e("#CMLS_FEATURE");if(!o.length)return a('You must add id="CMLS_FEATURE" to the script tag which loads this library!'),!1;o.parentsUntil(".wrapper-content",".column,.row,.block-type-content").addClass("CMLS_CCC"),a("Added CMLS_CCC class to parent containers."),t._CMLS=t._CMLS||{},t._CMLS.awards=t._CMLS.awards||{};var i=o.attr("data-google-analytics-id");i&&(a("Installing Google Analytics",i),t._CMLS.installGoogleAnalytics=function e(n){var a,o,i,r,l,s,g;n&&(a=t,o=document,i="script",r="//www.google-analytics.com/analytics.js",l="ga",a.GoogleAnalyticsObject=l,a.ga=a.ga||function(){(a.ga.q=a.ga.q||[]).push(arguments)},a.ga.l=1*new Date,s=o.createElement(i),g=o.getElementsByTagName(i)[0],s.async=1,s.src=r,g.parentNode.insertBefore(s,g),ga("create",n,"auto",{name:"contestTracker"}),ga("contestTracker.send","pageview"))},t._CMLS.installGoogleAnalytics(i)),t._CMLS.awards.throttle=function(e,t){var n,a,o,i=null,r=0,l=function(){r=(new Date).getTime(),i=null,o=e.apply(n,a),i||(n=a=null)};return function(){var s=(new Date).getTime();r||(r=s);var g=t-(s-r);return n=this,a=arguments,g<=0||g>t?(i&&(clearTimeout(i),i=null),r=s,o=e.apply(n,a),i||(n=a=null)):i||(i=setTimeout(l,g)),o}}}(jQuery,window.self),function(e,t,n){function a(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Iframed Feature]",e,[].slice.call(arguments))}}t.self._CMLS=t.self._CMLS||{},e((function(){var n=e("#CMLS_TEMPLATE:first");if(n.length)if(n.parentsUntil(".wrapper-content",".column,.row,.block-type-content").addClass("CMLS_CCC"),n.is("iframe")){var o="CMLS_CCC_IFRAME-"+Date.now(),i=t.self,r=e("<iframe/>",{id:o,name:o,width:"100%",frameBorder:0,class:"CMLS_CCC_IFRAME",scrolling:!1,allowTransparency:!0,style:"width: 100%"});n.before(r),n.detach(),i._CMLS.CCC_IFRAME_ACTIVATE_DFP=function e(t){if(i.googletag&&i.googletag.pubads){a("Activating DFP inside iframe");var n=r[0].contentWindow,o;r[0].contentDocument.title=i.document.title;var l,s=i.googletag.pubads().getSlots(),g;s.length&&s.some((function(e){var t=e.getAdUnitPath();if(t.indexOf("/6717/")>-1)return g=t,!0}));var c=i.googletag.pubads().getTargetingKeys(),d=[];if(c&&c.length&&c.forEach((function(e){d.push("googletag.pubads().setTargeting('"+e+"', '"+i.googletag.pubads().getTargeting(e)+"');")})),a("DFP targets defined",d),g){var u="[[300,250],[300,600]]";if(t&&Array.isArray(t)){var f="[";Array.isArray(t[0])?t.forEach((function(e){f+="["+e.join(",")+"]"})):f+=t.join(","),u=f+="]"}a("Injecting DFP for sizes",u);var m="var googletag = googletag || {};googletag.cmd = googletag.cmd || [];googletag.cmd.unshift(function defineTargets() {\t"+d.join("\n")+"});googletag.cmd.unshift(function defineSlot() {\tgoogletag.defineSlot('"+g+"', "+u+", 'div-gpt-ad-1418849849333-0')\t\t.addService(googletag.pubads())\t\t.setCollapseEmptyDiv(true)\t\t.setTargeting('pos','mid');\tgoogletag.pubads().enableSingleRequest();\tgoogletag.enableServices();});(function() {var gads = document.createElement('script');gads.async = true;gads.type = 'text/javascript';var useSSL = 'https:' == document.location.protocol;gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';var node = document.getElementsByTagName('script')[0];node.parentNode.insertBefore(gads, node);})();";a("Activating parent DFP in iframe template for cube",m),n.eval(m)}}else a("Iframe content contains DFP slots, but main window does not have DFP")},i._CMLS.CCC_IFRAME_SETUP=function e(){a("Inner frame called parent iframe setup"),r[0].contentDocument.title=i.document.title},r[0].contentDocument.open(),r[0].contentDocument.write(n.text()),r[0].contentDocument.close();var l=i.document.createElement("script"),s=i;l.src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.min.js",l.type="text/javascript",l.onload=function(){var t=-1!==navigator.userAgent.indexOf("MSIE"),r=n.text().indexOf("data-iframe-height")>-1;r&&a("iframe content has tagged element for IFR"),s.iFrameResize({log:!!(i._CMLS&&i._CMLS.debug||i.IFR_DEBUG),checkOrigin:!1,sizeWidth:!1,tolerance:10,minSize:100,heightCalculationMethod:r?"taggedElement":t?"max":"bodyOffset",onInit:function(t){e(t).trigger("cmls-ifr-init")}},"#"+o)},i.self.document.head.appendChild(l)}else a("#CMLS_TEMPLATE is not an iframe!");else a("No #CMLS_TEMPLATE found, not an iframe feature")}))}(jQuery,window.self);
//# sourceMappingURL=base-min.js.map