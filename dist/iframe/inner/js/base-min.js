!function(e,t,a){var n,s=e.getElementsByTagName(t)[0],i=/^http:/.test(e.location)?"http":"https";e.getElementById(a)||((n=e.createElement(t)).id=a,n.src=i+"://platform.twitter.com/widgets.js",s.parentNode.insertBefore(n,s))}(document,"script","twitter-wjs"),function(e,t,a){var n,s=e.getElementsByTagName(t)[0];e.getElementById(a)||((n=e.createElement(t)).id=a,n.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3",s.parentNode.insertBefore(n,s))}(document,"script","facebook-jssdk"),function(s,e){function i(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Iframed Feature INNER]",e,[].slice.call(arguments))}}var t=s.document.createElement("iiframe"),a=function(a,n){var s,i,r,o=null,c=0,l=function(){c=(new Date).getTime(),o=null,r=a.apply(s,i),o||(s=i=null)};return function(){var e=(new Date).getTime();c||(c=e);var t=n-(e-c);return s=this,i=arguments,t<=0||n<t?(o&&(clearTimeout(o),o=null),c=e,r=a.apply(s,i),o||(s=i=null)):o||(o=setTimeout(l,t)),r}},r={selector:'[lazyload="on"]',advance:200,getLoadable:function(){return this.loadable||(this.loadable=$(this.selector)),this.loadable},handler:function(){r.getLoadable().each(function(){if(!this.dataset.originalsrc||this.src!==this.dataset.originalsrc){var e=getComputedStyle(this),t=this.getBoundingClientRect(),a=this.ownerDocument.defaultView.frameElement.getBoundingClientRect();t&&a&&t.top+a.top-r.advance<=s.self.parent.innerHeight&&"none"!==e.display&&this.dataset.src&&(this.dataset.original_src||(this.dataset.original_src=this.src),-1===this.src.indexOf(this.dataset.src)&&(i("Setting src",this,this.dataset.src,this.src),this.src=this.dataset.src),this.dataset.srcset&&(this.dataset.original_srcset||(this.dataset.original_srcset=this.srcset),this.srcset!==this.dataset.srcset&&(this.srcset=this.dataset.srcset)))}})}};i("Injecting jQuery");var n=s.document.createElement("script");n.src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js",n.type="text/javascript",n.onload=function(){i("jQuery injected.");var n=s.jQuery;n(s).trigger("jquery.loaded"),n(function(){n("iiframe").each(function(){var e=n(this),t=n("<iframe/>"),a=e.prop("attributes");i("Resolving inner iframe",this,a),n.each(a,function(){this.specified&&t.attr(this.name,this.value)}),e.after(t),Object.assign(t[0].dataset,e[0].dataset),e.remove()}),n("img,iframe").load(function(){s.self.parentIFrame&&s.self.parentIFrame.reset()}),s.self.document.getElementById("div-gpt-ad-1418849849333-0")&&s.self.parent._CMLS.CCC_IFRAME_ACTIVATE_DFP(s.self.parent),s.self.parent.document.addEventListener("scroll",a(r.handler,500)),s.self.parent.addEventListener("resize",a(r.handler,500)),s.self.parent.addEventListener("orientationchange",a(r.handler,500)),r.handler()})},s.document.head.appendChild(n),i("Injecting iframe-resizer contentWindow library");var o=s.document.createElement("script");o.src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.4/iframeResizer.contentWindow.min.js",o.onload=function(){i("iframe-resizer contentWindow loaded.")},s.document.head.appendChild(o),s.self.parent._CMLS&&s.self.parent._CMLS.CCC_IFRAME_SETUP&&(i("Calling parent iframe setup"),s.self.parent._CMLS.CCC_IFRAME_SETUP(s.self))}(window.self);
//# sourceMappingURL=base-min.js.map