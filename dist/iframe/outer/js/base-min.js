!function(e,c,t){function n(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Feature]",e,[].slice.call(arguments))}}var a=e("#CMLS_FEATURE");if(!a.length)return n('You must add id="CMLS_FEATURE" to the script tag which loads this library!');a.parentsUntil(".wrapper-content",".column,.row,.block-type-content").addClass("CMLS_CCC"),n("Added CMLS_CCC class to parent containers."),c._CMLS=c._CMLS||{},c._CMLS.awards=c._CMLS.awards||{};var o=a.attr("data-google-analytics-id");o&&(n("Installing Google Analytics",o),c._CMLS.installGoogleAnalytics=function e(t){var n,a,o,l,i,r,s;t&&(n=c,a=document,o="script",l="//www.google-analytics.com/analytics.js",i="ga",n.GoogleAnalyticsObject=i,n.ga=n.ga||function(){(n.ga.q=n.ga.q||[]).push(arguments)},n.ga.l=1*new Date,r=a.createElement(o),s=a.getElementsByTagName(o)[0],r.async=1,r.src=l,s.parentNode.insertBefore(r,s),ga("create",t,"auto",{name:"contestTracker"}),ga("contestTracker.send","pageview"))},c._CMLS.installGoogleAnalytics(o)),c._CMLS.awards.throttle=function(n,a){var o,l,i,r=null,s=0,c=function(){s=(new Date).getTime(),r=null,i=n.apply(o,l),r||(o=l=null)};return function(){var e=(new Date).getTime();s||(s=e);var t=a-(e-s);return o=this,l=arguments,t<=0||a<t?(r&&(clearTimeout(r),r=null),s=e,i=n.apply(o,l),r||(o=l=null)):r||(r=setTimeout(c,t)),i}}}(jQuery,window.self),function(a,g,e){function u(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Iframed Feature]",e,[].slice.call(arguments))}}g._CMLS=g._CMLS||{},a(function(){var c=a("#CMLS_TEMPLATE:first");if(c.length)if(c.parentsUntil(".wrapper-content",".column,.row,.block-type-content").addClass("CMLS_CCC"),c.is("iframe")){var t="CMLS_CCC_IFRAME-"+Date.now();c.attr({id:t,name:t,width:"100%",frameBorder:0,class:"CMLS_CCC_IFRAME",scrolling:!1,allowTransparency:!0,style:""}),c[0].name=t,c[0].id=t,g._CMLS.CCC_IFRAME_ACTIVATE_DFP=function e(){var t=c[0].contentWindow,n;if(c[0].contentDocument.title=g.document.title,g.self.googletag){var a,o=g.self.googletag.pubads().getSlots(),l;o.length&&o.some(function(e){var t=e.getAdUnitPath();if(-1<t.indexOf("/6717/"))return l=t,!0});var i=g.self.googletag.pubads().getTargetingKeys(),r=[];if(i&&i.length&&i.forEach(function(e){r.push("googletag.pubads().setTargeting('"+e+"', '"+g.self.googletag.pubads().getTargeting(e)+"');")}),l){var s="googletag.cmd.unshift(function() {\t"+r.join("\n")+"});googletag.cmd.unshift(function() {\tgoogletag.defineSlot('"+l+"', [[300, 250], [300, 600]], 'div-gpt-ad-1418849849333-0')\t\t.addService(googletag.pubads())\t\t.setCollapseEmptyDiv(true)\t\t.setTargeting('pos','mid');\tgoogletag.pubads().enableSingleRequest();\tgoogletag.enableServices();});var googletag = googletag || {};googletag.cmd = googletag.cmd || [];(function() {var gads = document.createElement('script');gads.async = true;gads.type = 'text/javascript';var useSSL = 'https:' == document.location.protocol;gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';var node = document.getElementsByTagName('script')[0];node.parentNode.insertBefore(gads, node);})();";u("Activating parent DFP in iframe template for cube",s),t.eval(s)}}},g._CMLS.CCC_IFRAME_SETUP=function e(){u("Inner frame called parent iframe setup"),c[0].contentDocument.title=g.document.title},c[0].contentDocument.open(),c[0].contentDocument.write(c.text()),c[0].contentDocument.close();var e=g.document.createElement("script"),n=g;e.src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.4/iframeResizer.min.js",e.type="text/javascript",e.onload=function(){var e=-1!==navigator.userAgent.indexOf("MSIE");n.iFrameResize({log:g.IFR_DEBUG||!1,checkOrigin:!1,sizeWidth:!1,tolerance:1,minSize:100,heightCalculationMethod:e?"max":"lowestElement"},"#"+t)},g.document.head.appendChild(e)}else u("#CMLS_TEMPLATE is not an iframe!");else u("No #CMLS_TEMPLATE found, not an iframe feature")})}(jQuery,window.self);
//# sourceMappingURL=base-min.js.map