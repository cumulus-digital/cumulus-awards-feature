!function(e,t,n){var a,s=e.getElementsByTagName(t)[0],i=/^http:/.test(e.location)?"http":"https";e.getElementById(n)||((a=e.createElement(t)).id=n,a.src=i+"://platform.twitter.com/widgets.js",s.parentNode.insertBefore(a,s))}(document,"script","twitter-wjs"),function(e,t,n){var a,s=e.getElementsByTagName(t)[0];e.getElementById(n)||((a=e.createElement(t)).id=n,a.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3",s.parentNode.insertBefore(a,s))}(document,"script","facebook-jssdk"),function(e,t){function n(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Iframed Feature INNER]",e,[].slice.call(arguments))}}var a=e.document.createElement("iiframe"),s=function(e,t){var n,a,s,i=null,r=0,o=function(){r=(new Date).getTime(),i=null,s=e.apply(n,a),i||(n=a=null)};return function(){var c=(new Date).getTime();r||(r=c);var l=t-(c-r);return n=this,a=arguments,l<=0||l>t?(i&&(clearTimeout(i),i=null),r=c,s=e.apply(n,a),i||(n=a=null)):i||(i=setTimeout(o,l)),s}},i={selector:'[lazyload="on"]',advance:200,getLoadable:function(){return this.loadable||(this.loadable=$(this.selector)),this.loadable},handler:function(){i.getLoadable().each((function(){if(!this.dataset.originalsrc||this.src!==this.dataset.originalsrc){var t=getComputedStyle(this),a=this.getBoundingClientRect(),s=this.ownerDocument.defaultView.frameElement.getBoundingClientRect();a&&s&&a.top+s.top-i.advance<=e.self.parent.innerHeight&&"none"!==t.display&&this.dataset.src&&(this.dataset.original_src||(this.dataset.original_src=this.src),-1===this.src.indexOf(this.dataset.src)&&(n("Setting src",this,this.dataset.src,this.src),this.src=this.dataset.src),this.dataset.srcset&&(this.dataset.original_srcset||(this.dataset.original_srcset=this.srcset),this.srcset!==this.dataset.srcset&&(this.srcset=this.dataset.srcset)))}}))}};n("Injecting jQuery");var r=e.document.createElement("script");r.src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js",r.type="text/javascript",r.onload=function(){n("jQuery injected.");var t=e.jQuery,a=e.self.document.createEvent("Event");a.initEvent("jquery.loaded",!0,!0),e.self.dispatchEvent(a),t((function(){t("iiframe").each((function(){var e=t(this),a=t("<iframe/>"),s=e.prop("attributes");n("Resolving inner iframe",this,s),t.each(s,(function(){this.specified&&a.attr(this.name,this.value)})),e.after(a),Object.assign(a[0].dataset,e[0].dataset),e.remove()})),t("img,iframe").load((function(){e.self.parentIFrame&&e.self.parentIFrame.reset()})),!e.self.DO_NOT_ACTIVATE_DFP&&e.self.document.getElementById("div-gpt-ad-1418849849333-0")&&e.self.parent._CMLS.CCC_IFRAME_ACTIVATE_DFP&&e.self.parent._CMLS.CCC_IFRAME_ACTIVATE_DFP(),e.self.parent.document.addEventListener("scroll",s(i.handler,500)),e.self.parent.addEventListener("resize",s(i.handler,500)),e.self.parent.addEventListener("orientationchange",s(i.handler,500)),i.handler()}))},e.document.head.appendChild(r),n("Injecting iframe-resizer contentWindow library");var o=e.document.createElement("script");o.src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.contentWindow.min.js",o.onload=function(){n("iframe-resizer contentWindow loaded.")},e.document.head.appendChild(o),e.self.parent._CMLS&&e.self.parent._CMLS.CCC_IFRAME_SETUP&&(n("Calling parent iframe setup"),e.self.parent._CMLS.CCC_IFRAME_SETUP(e.self)),e.self.INIT_DFP=function t(a){if(e.parent.googletag&&e.parent.googletag.pubads){var s=s||{cmd:[]},i,r,o=e.parent.googletag.pubads,c=o().getSlots(),l=null,d=null;c.length&&c.some((function(e){var t=e.getAdUnitPath();if(t.indexOf("/6717/")>-1)return l=t,!0})),l?(n("Setting DFP targeting keys",d=o().getTargetingKeys()),d&&d.length&&d.forEach((function(e){var t=o().getTargeting(e);s.cmd.push((function(){n("Defining DFP target",e,t),s.pubads().setTargeting(e,t)}))})),n("Setting up DFP slot"),s.cmd.push((function(){n("Activating DFP slot");var e=s.defineSlot(l,a,"div-gpt-cube");e&&(e.addService(s.pubads()),e.setCollapseEmptyDiv(!0),e.setTargeting("pos","mid")),s.pubads().enableSingleRequest(),s.enableServices()})),function(){var e=document.createElement("script");e.async=!0,e.type="text/javascript",e.src="https://securepubads.g.doubleclick.net/tag/js/gpt.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(),n("DFP activated.")):n("Could not determine parent adPath, exiting DFP activation")}else n("#CMLS_TEMPLATE requested DFP activation, but parent window does not have DFP")}}(window.self);
//# sourceMappingURL=base-min.js.map