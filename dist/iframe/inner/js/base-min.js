!function(e,t,n){var a,i=e.getElementsByTagName(t)[0],r=/^http:/.test(e.location)?"http":"https";e.getElementById(n)||((a=e.createElement(t)).id=n,a.src=r+"://platform.twitter.com/widgets.js",i.parentNode.insertBefore(a,i))}(document,"script","twitter-wjs"),function(e,t,n){var a,i=e.getElementsByTagName(t)[0];e.getElementById(n)||((a=e.createElement(t)).id=n,a.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3",i.parentNode.insertBefore(a,i))}(document,"script","facebook-jssdk"),function(i,e){function r(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Iframed Feature INNER]",e,[].slice.call(arguments))}}var t=i.document.createElement("iiframe"),n=function(n,a){var i,r,s,o=null,c=0,l=function(){c=(new Date).getTime(),o=null,s=n.apply(i,r),o||(i=r=null)};return function(){var e=(new Date).getTime();c||(c=e);var t=a-(e-c);return i=this,r=arguments,t<=0||a<t?(o&&(clearTimeout(o),o=null),c=e,s=n.apply(i,r),o||(i=r=null)):o||(o=setTimeout(l,t)),s}},s={selector:'[lazyload="on"]',advance:200,getLoadable:function(){return this.loadable||(this.loadable=$(this.selector)),this.loadable},handler:function(){this.getLoadable().each(function(){if(!this.dataset["original-src"]||this.src!==this.dataset["original-src"]){var e=getComputedStyle(this),t=this.getBoundingClientRect(),n=this.ownerDocument.defaultView.frameElement.getBoundingClientRect();t&&n&&t.top+n.top<=i.parent.innerHeight&&"none"!==e.display&&(this.dataset["original-src"]=this.src,this.src=this.dataset.src,this.dataset.srcset&&(this.dataset["original-srcset"]=this.srcset,this.srcset=this.dataset.srcset))}})}};r("Injecting jQuery");var a=i.document.createElement("script");a.src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js",a.type="text/javascript",a.onload=function(){r("jQuery injected.");var a=i.jQuery;a(function(){a("iiframe").each(function(){r("Resolving inner iframe",this);var e=a(this),t=a("<iframe/>"),n=e.prop("attributes");a.each(n,function(){this.specified&&t.prop(this.name,this.value)}),e.after(t),e.remove()}),a("img,iframe").load(function(){i.self.parentIFrame&&i.self.parentIFrame.reset()}),i.self.document.getElementById("div-gpt-ad-1418849849333-0")&&i.parent._CMLS.CCC_IFRAME_ACTIVATE_DFP(i.self),i.parent.document.addEventListener("scroll",n(s.handler,200)),i.parent.addEventListener("resize",n(s.handler,200)),i.parent.addEventListener("orientationchange",n(s.handler,200)),s.handler()})},i.document.head.appendChild(a),r("Injecting iframe-resizer contentWindow library");var o=i.document.createElement("script");o.src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.4/iframeResizer.contentWindow.min.js",o.onload=function(){r("iframe-resizer contentWindow loaded.")},i.document.head.appendChild(o),i.parent._CMLS&&i.parent._CMLS.CCC_IFRAME_SETUP&&(r("Calling parent iframe setup"),i.parent._CMLS.CCC_IFRAME_SETUP(i.self))}(window.self);
//# sourceMappingURL=base-min.js.map