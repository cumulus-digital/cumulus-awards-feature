!function(e,s,t){function n(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Feature]",e,[].slice.call(arguments))}}var a=e("#CMLS_FEATURE");if(!a.length)return n('You must add id="CMLS_FEATURE" to the script tag which loads this library!');a.parentsUntil(".wrapper-content",".column,.row,.block-type-content").addClass("CMLS_CCC"),n("Added CMLS_CCC class to parent containers."),s._CMLS=s._CMLS||{},s._CMLS.awards=s._CMLS.awards||{};var o=a.attr("data-google-analytics-id");o&&(n("Installing Google Analytics",o),s._CMLS.installGoogleAnalytics=function e(t){var n,a,o,i,l,r,g;t&&(n=s,a=document,o="script",i="//www.google-analytics.com/analytics.js",l="ga",n.GoogleAnalyticsObject=l,n.ga=n.ga||function(){(n.ga.q=n.ga.q||[]).push(arguments)},n.ga.l=1*new Date,r=a.createElement(o),g=a.getElementsByTagName(o)[0],r.async=1,r.src=i,g.parentNode.insertBefore(r,g),ga("create",t,"auto",{name:"contestTracker"}),ga("contestTracker.send","pageview"))},s._CMLS.installGoogleAnalytics(o)),s._CMLS.awards.throttle=function(n,a){var o,i,l,r=null,g=0,s=function(){g=(new Date).getTime(),r=null,l=n.apply(o,i),r||(o=i=null)};return function(){var e=(new Date).getTime();g||(g=e);var t=a-(e-g);return o=this,i=arguments,t<=0||a<t?(r&&(clearTimeout(r),r=null),g=e,l=n.apply(o,i),r||(o=i=null)):r||(r=setTimeout(s,t)),l}}}(jQuery,window.self),function(a,d,e){function u(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Iframed Feature]",e,[].slice.call(arguments))}}d._CMLS=d._CMLS||{},a(function(){var c=a("#CMLS_TEMPLATE:first");if(c.length)if(c.parentsUntil(".wrapper-content",".column,.row,.block-type-content").addClass("CMLS_CCC"),c.is("iframe")){var t="CMLS_CCC_IFRAME-"+Date.now();c.attr({id:t,name:t,width:"100%",frameBorder:0,class:"CMLS_CCC_IFRAME",scrolling:!1,allowTransparency:!0,style:""}),c[0].name=t,c[0].id=t,d._CMLS.CCC_IFRAME_ACTIVATE_DFP=function e(t){var n=c[0].contentWindow,a;if(c[0].contentDocument.title=d.document.title,t.googletag&&t.googletag.pubads){var o,i=t.googletag.pubads().getSlots(),l;i.length&&i.some(function(e){var t=e.getAdUnitPath();if(-1<t.indexOf("/6717/"))return l=t,!0});var r=t.googletag.pubads().getTargetingKeys(),g=[];if(r&&r.length&&r.forEach(function(e){g.push("googletag.pubads().setTargeting('"+e+"', '"+d.self.googletag.pubads().getTargeting(e)+"');")}),u("DFP targets defined",g),l){var s="var googletag = googletag || {};googletag.cmd = googletag.cmd || [];googletag.cmd.unshift(function defineTargets() {\t"+g.join("\n")+"});googletag.cmd.unshift(function defineSlot() {\tgoogletag.defineSlot('"+l+"', [[300, 250], [300, 600]], 'div-gpt-ad-1418849849333-0')\t\t.addService(googletag.pubads())\t\t.setCollapseEmptyDiv(true)\t\t.setTargeting('pos','mid');\tgoogletag.pubads().enableSingleRequest();\tgoogletag.enableServices();});(function() {var gads = document.createElement('script');gads.async = true;gads.type = 'text/javascript';var useSSL = 'https:' == document.location.protocol;gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';var node = document.getElementsByTagName('script')[0];node.parentNode.insertBefore(gads, node);})();";u("Activating parent DFP in iframe template for cube",s),n.eval(s)}}},d._CMLS.CCC_IFRAME_SETUP=function e(){u("Inner frame called parent iframe setup"),c[0].contentDocument.title=d.document.title},c[0].contentDocument.open(),c[0].contentDocument.write(c.text()),c[0].contentDocument.close();var e=d.document.createElement("script"),n=d;e.src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.4/iframeResizer.min.js",e.type="text/javascript",e.onload=function(){var e=-1!==navigator.userAgent.indexOf("MSIE");n.iFrameResize({log:d.IFR_DEBUG||!1,checkOrigin:!1,sizeWidth:!1,tolerance:1,minSize:100,heightCalculationMethod:e?"max":"lowestElement"},"#"+t)},d.document.head.appendChild(e)}else u("#CMLS_TEMPLATE is not an iframe!");else u("No #CMLS_TEMPLATE found, not an iframe feature")})}(jQuery,window.self);
//# sourceMappingURL=base-min.js.map