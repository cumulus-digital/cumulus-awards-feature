!function(e,g,t){function n(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Feature]",e,[].slice.call(arguments))}}var a=e("#CMLS_FEATURE");if(!a.length)return n('You must add id="CMLS_FEATURE" to the script tag which loads this library!');a.parentsUntil(".wrapper-content",".column,.row,.block-type-content").addClass("CMLS_CCC"),n("Added CMLS_CCC class to parent containers."),g._CMLS=g._CMLS||{},g._CMLS.awards=g._CMLS.awards||{};var o=a.attr("data-google-analytics-id");o&&(n("Installing Google Analytics",o),g._CMLS.installGoogleAnalytics=function e(t){var n,a,o,i,r,l,s;t&&(n=g,a=document,o="script",i="//www.google-analytics.com/analytics.js",r="ga",n.GoogleAnalyticsObject=r,n.ga=n.ga||function(){(n.ga.q=n.ga.q||[]).push(arguments)},n.ga.l=1*new Date,l=a.createElement(o),s=a.getElementsByTagName(o)[0],l.async=1,l.src=i,s.parentNode.insertBefore(l,s),ga("create",t,"auto",{name:"contestTracker"}),ga("contestTracker.send","pageview"))},g._CMLS.installGoogleAnalytics(o)),g._CMLS.awards.throttle=function(n,a){var o,i,r,l=null,s=0,g=function(){s=(new Date).getTime(),l=null,r=n.apply(o,i),l||(o=i=null)};return function(){var e=(new Date).getTime();s||(s=e);var t=a-(e-s);return o=this,i=arguments,t<=0||a<t?(l&&(clearTimeout(l),l=null),s=e,r=n.apply(o,i),l||(o=i=null)):l||(l=setTimeout(g,t)),r}}}(jQuery,window.self),function(a,m,e){function p(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Iframed Feature]",e,[].slice.call(arguments))}}m._CMLS=m._CMLS||{},a(function(){var u=a("#CMLS_TEMPLATE:first");if(u.length)if(u.parentsUntil(".wrapper-content",".column,.row,.block-type-content").addClass("CMLS_CCC"),u.is("iframe")){var t="CMLS_CCC_IFRAME-"+Date.now(),f=m.self;u.attr({id:t,name:t,width:"100%",frameBorder:0,class:"CMLS_CCC_IFRAME",scrolling:!1,allowTransparency:!0,style:""}),u[0].name=t,u[0].id=t,m._CMLS.CCC_IFRAME_ACTIVATE_DFP=function e(t){if(f.googletag&&f.googletag.pubads){p("Activating DFP inside iframe");var n=u[0].contentWindow,a;u[0].contentDocument.title=m.document.title;var o,i=f.googletag.pubads().getSlots(),r;i.length&&i.some(function(e){var t=e.getAdUnitPath();if(-1<t.indexOf("/6717/"))return r=t,!0});var l=f.googletag.pubads().getTargetingKeys(),s=[];if(l&&l.length&&l.forEach(function(e){s.push("googletag.pubads().setTargeting('"+e+"', '"+f.googletag.pubads().getTargeting(e)+"');")}),p("DFP targets defined",s),r){var g="[[300,250],[300,600]]";if(t&&Array.isArray(t)){var c="[";Array.isArray(t[0])?t.forEach(function(e){c+="["+e.join(",")+"]"}):c+=t.join(","),g=c+="]"}p("Injecting DFP for sizes",g);var d="var googletag = googletag || {};googletag.cmd = googletag.cmd || [];googletag.cmd.unshift(function defineTargets() {\t"+s.join("\n")+"});googletag.cmd.unshift(function defineSlot() {\tgoogletag.defineSlot('"+r+"', "+g+", 'div-gpt-ad-1418849849333-0')\t\t.addService(googletag.pubads())\t\t.setCollapseEmptyDiv(true)\t\t.setTargeting('pos','mid');\tgoogletag.pubads().enableSingleRequest();\tgoogletag.enableServices();});(function() {var gads = document.createElement('script');gads.async = true;gads.type = 'text/javascript';var useSSL = 'https:' == document.location.protocol;gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';var node = document.getElementsByTagName('script')[0];node.parentNode.insertBefore(gads, node);})();";p("Activating parent DFP in iframe template for cube",d),n.eval(d)}}else p("Iframe content contains DFP slots, but main window does not have DFP")},m._CMLS.CCC_IFRAME_SETUP=function e(){p("Inner frame called parent iframe setup"),u[0].contentDocument.title=m.document.title},u[0].contentDocument.open(),u[0].contentDocument.write(u.text()),u[0].contentDocument.close();var e=m.document.createElement("script"),n=m;e.src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.4/iframeResizer.min.js",e.type="text/javascript",e.onload=function(){var e=-1!==navigator.userAgent.indexOf("MSIE");n.iFrameResize({log:m.IFR_DEBUG||!1,checkOrigin:!1,sizeWidth:!1,tolerance:1,minSize:100,heightCalculationMethod:e?"max":"lowestElement"},"#"+t)},m.document.head.appendChild(e)}else p("#CMLS_TEMPLATE is not an iframe!");else p("No #CMLS_TEMPLATE found, not an iframe feature")})}(jQuery,window.self);
//# sourceMappingURL=base-min.js.map