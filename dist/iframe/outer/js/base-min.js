!function($,e,t){function n(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Feature]",e,[].slice.call(arguments))}}var o=$("#CMLS_FEATURE");if(!o.length)return n('You must add id="CMLS_FEATURE" to the script tag which loads this library!'),!1;o.parentsUntil(".wrapper-content",".column,.row,.block-type-content").addClass("CMLS_CCC"),n("Added CMLS_CCC class to parent containers."),e._CMLS=e._CMLS||{};var a=o.attr("data-google-analytics-id");a&&(n("Installing Google Analytics",a),e._CMLS.installGoogleAnalytics=function t(n){n&&(!function(e,t,n,o,a,i,r){e.GoogleAnalyticsObject=a,e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e[a].l=1*new Date,i=t.createElement(n),r=t.getElementsByTagName(n)[0],i.async=1,i.src=o,r.parentNode.insertBefore(i,r)}(e,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create",n,"auto",{name:"contestTracker"}),ga("contestTracker.send","pageview"))},e._CMLS.installGoogleAnalytics(a))}(jQuery,window.self),function($,e,t){function n(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Iframed Feature]",e,[].slice.call(arguments))}}e._CMLS=e._CMLS||{},$(function(){var t=$("#CMLS_TEMPLATE");if(!t.length)return void n("No #CMLS_TEMPLATE found!");if(t.parentsUntil(".wrapper-content",".column,.row,.block-type-content").addClass("CMLS_CCC"),t.is("iframe")){var o="CMLS_CCC_IFRAME-"+Date.now();t.attr({id:o,name:o,width:"100%",frameBorder:0,className:"CMLS_CCC_IFRAME",scrolling:!1,allowTransparency:!0,style:""}),e._CMLS.CCC_IFRAME_ACTIVATE_DFP=function o(){var a=t[0].contentWindow;t[0].contentDocument.title=e.document.title,$("script").each(function(){if((!this.src||this.src.length<1)&&(this.innerText.indexOf("var googletag")>-1||this.innerText.indexOf("googletag.defineSlot")>-1||this.innerText.indexOf("googletag.pubads().setTargeting")>-1)){n("Retrieving DFP Property ID");var e=this.innerText.match(/\/6717\/([a-zA-Z\.\-]+)/);if(e.length>1)return n("Activating parent DFP in iframe template for cube",this),a.eval("googletag.cmd.push(function() {\tgoogletag.defineSlot('/6717/"+e[1]+'\', [[300, 250], [300, 600]], \'div-gpt-ad-1418849849333-0\')\t\t.addService(googletag.pubads())\t\t.setCollapseEmptyDiv(true)\t\t.setTargeting("pos","mid");\tgoogletag.pubads().enableSingleRequest();\tgoogletag.enableServices();});'),!1}})},e._CMLS.CCC_IFRAME_SETUP=function o(){n("Inner frame called parent iframe setup"),t[0].contentDocument.title=e.document.title},t[0].contentDocument.open(),t[0].contentDocument.write(t.text()),t[0].contentDocument.close();var a=e.document.createElement("script"),i=e;a.src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.1/iframeResizer.min.js",a.type="text/javascript",a.onload=function(){var t=-1!==navigator.userAgent.indexOf("MSIE");i.iFrameResize({log:e.IFR_DEBUG||!1,checkOrigin:!1,heightCalculationMethod:t?"max":"lowestElement"},"#"+o)},e.document.head.appendChild(a)}else n("#CMLS_TEMPLATE is not an iframe!")})}(jQuery,window.self);
//# sourceMappingURL=./base-min.js.map