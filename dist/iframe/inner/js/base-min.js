!function(e,t,n){var a,i=e.getElementsByTagName(t)[0],r=/^http:/.test(e.location)?"http":"https";e.getElementById(n)||((a=e.createElement(t)).id=n,a.src=r+"://platform.twitter.com/widgets.js",i.parentNode.insertBefore(a,i))}(document,"script","twitter-wjs"),function(e,t,n){var a,i=e.getElementsByTagName(t)[0];e.getElementById(n)||((a=e.createElement(t)).id=n,a.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3",i.parentNode.insertBefore(a,i))}(document,"script","facebook-jssdk"),function(e,t){function n(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Iframed Feature INNER]",e,[].slice.call(arguments))}}function a(){var t=1e4,n=Date.now();return new i((function(i,r){e.self.parent.googletag&&e.self.parent.googletag.pubads?i(e.self.parent.googletag):Date.now()-n>=t?r(new Error("timeout")):setTimeout(a.bind(this,i,r),50)}))}var i=e.Promise;e.document.createElement("iiframe");var r=function(e,t){var n,a,i,r=null,s=0,o=function(){s=(new Date).getTime(),r=null,i=e.apply(n,a),r||(n=a=null)};return function(){var c=(new Date).getTime();s||(s=c);var l=t-(c-s);return n=this,a=arguments,l<=0||l>t?(r&&(clearTimeout(r),r=null),s=c,i=e.apply(n,a),r||(n=a=null)):r||(r=setTimeout(o,l)),i}},s={selector:'[lazyload="on"]',advance:200,getLoadable:function(){return this.loadable||(this.loadable=e.$(this.selector)),this.loadable},handler:function(){s.getLoadable().each((function(){if(!this.dataset.originalsrc||this.src!==this.dataset.originalsrc){var t=getComputedStyle(this),a=this.getBoundingClientRect(),i=this.ownerDocument.defaultView.frameElement.getBoundingClientRect();a&&i&&a.top+i.top-s.advance<=e.self.parent.innerHeight&&"none"!==t.display&&this.dataset.src&&(this.dataset.original_src||(this.dataset.original_src=this.src),-1===this.src.indexOf(this.dataset.src)&&(n("Setting src",this,this.dataset.src,this.src),this.src=this.dataset.src),this.dataset.srcset&&(this.dataset.original_srcset||(this.dataset.original_srcset=this.srcset),this.srcset!==this.dataset.srcset&&(this.srcset=this.dataset.srcset)))}}))}};e.jQueryLoader=function(){return new i((function(t,a){if(e.hasOwnProperty("jQuery"))t();else{var i=document.createElement("script");i.src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",i.type="text/javascript",i.onload=function(){n("jQuery injected.");var $=e.jQuery;e.$=$;var a=e.self.document.createEvent("Event");a.initEvent("jquery.loaded",!0,!0),e.self.dispatchEvent(a),t()},i.onerror=a(new Error("Failed to load jQuery!")),document.head.appendChild(i)}}))},e.jQueryLoader().then((function(){var $=e.jQuery;$((function(){$("iiframe").each((function(){var e=$(this),t=$("<iframe/>"),a=e.prop("attributes");n("Resolving inner iframe",this,a),$.each(a,(function(){this.specified&&t.attr(this.name,this.value)})),e.after(t),Object.assign(t[0].dataset,e[0].dataset),e.remove()})),$("img,iframe").on("load",(function(){e.self.parentIFrame&&e.self.parentIFrame.reset()})),e.self.parent.document.addEventListener("scroll",r(s.handler,500)),e.self.parent.addEventListener("resize",r(s.handler,500)),e.self.parent.addEventListener("orientationchange",r(s.handler,500)),s.handler()}))})),e.ifrLoader=function(){return new i((function(t,a){if(e.hasOwnProperty("parentIFrame"))t();else{n("Injecting iframe-resizer contentWindow library");var i=document.createElement("script");i.src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js",i.type="text/javascript",i.onload=function(){n("iframe-resizer contentWindow loaded.");var a=e.self.document.createEvent("Event");a.initEvent("ifr.loaded",!0,!0),e.self.dispatchEvent(a),t()},document.head.appendChild(i)}}))},e.ifrLoader(),e.self.INIT_DFP=function t(i){n("DFP init requested, waiting for parent googletag..."),a().then((function(){var t=e.self.googletag||{cmd:[]},a=e.self.parent,r,s=a.googletag.pubads,o=null,c=null;if(a.GPT_SITE_ID)o=a.GPT_SITE_ID;else{var l=s().getSlots();l.length&&l.some((function(e){var t=e.getAdUnitPath();if(t.indexOf("/6717")>-1)return o=t,!0}))}o?((c=s().getTargetingKeys())&&c.length&&(n("Setting DFP targeting keys",c),t.cmd.unshift((function e(){c.forEach((function(e){var a=s().getTargeting(e);n("Defining GPT target",e,a),t.pubads().setTargeting(e,a)}))}))),t.cmd.unshift((function(){n("Setting up DFP slot");var e=t.defineSlot(o,i,"div-gpt-cube").addService(t.pubads()).setCollapseEmptyDiv(!0).setTargeting("pos","mid");t.pubads().enableSingleRequest(),t.enableServices()})),function(){var t=e.self.document.createElement("script");t.async=!0,t.type="text/javascript",t.src="https://securepubads.g.doubleclick.net/tag/js/gpt.js";var n=e.self.document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n)}(),n("DFP activated.")):n("Could not determine parent adPath, exiting DFP activation")}),(function(e){n("Timed out waiting for parent googletag.")}))},n("Setting document title from parent"),e.self.document.title=e.self.parent.document.title}(window.self);
//# sourceMappingURL=base-min.js.map