!function(e,t,n){var a,i=e.getElementsByTagName(t)[0],s=/^http:/.test(e.location)?"http":"https";e.getElementById(n)||((a=e.createElement(t)).id=n,a.src=s+"://platform.twitter.com/widgets.js",i.parentNode.insertBefore(a,i))}(document,"script","twitter-wjs"),function(e,t,n){var a,i=e.getElementsByTagName(t)[0];e.getElementById(n)||((a=e.createElement(t)).id=n,a.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3",i.parentNode.insertBefore(a,i))}(document,"script","facebook-jssdk"),function(i,e){function s(){if("object"==typeof console&&console.log){var e=new Date;e=e.toISOString()?e.toISOString():e.toUTCString(),console.log("[CMLS Iframed Feature INNER]",e,[].slice.call(arguments))}}var t=i.document.createElement("iiframe"),n=function(n,a){var i,s,r,o=null,c=0,l=function(){c=(new Date).getTime(),o=null,r=n.apply(i,s),o||(i=s=null)};return function(){var e=(new Date).getTime();c||(c=e);var t=a-(e-c);return i=this,s=arguments,t<=0||a<t?(o&&(clearTimeout(o),o=null),c=e,r=n.apply(i,s),o||(i=s=null)):o||(o=setTimeout(l,t)),r}},r={selector:'[lazyload="on"]',advance:200,getLoadable:function(){return this.loadable||(this.loadable=$(this.selector)),this.loadable},handler:function(){r.getLoadable().each(function(){if(!this.dataset.originalsrc||this.src!==this.dataset.originalsrc){var e=getComputedStyle(this),t=this.getBoundingClientRect(),n=this.ownerDocument.defaultView.frameElement.getBoundingClientRect();t&&n&&t.top+n.top-r.advance<=i.parent.innerHeight&&"none"!==e.display&&this.dataset.src&&(this.dataset.original_src||(this.dataset.original_src=this.src),-1===this.src.indexOf(this.dataset.src)&&(s("Setting src",this,this.dataset.src,this.src),this.src=this.dataset.src),this.dataset.srcset&&(this.dataset.original_srcset||(this.dataset.original_srcset=this.srcset),this.srcset!==this.dataset.srcset&&(this.srcset=this.dataset.srcset)))}})}};s("Injecting jQuery");var a=i.document.createElement("script");a.src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js",a.type="text/javascript",a.onload=function(){s("jQuery injected.");var a=i.jQuery;a(function(){a("iiframe").each(function(){var e=a(this),t=a("<iframe/>"),n=e.prop("attributes");s("Resolving inner iframe",this,n),a.each(n,function(){this.specified&&t.attr(this.name,this.value)}),e.after(t),Object.assign(t[0].dataset,e[0].dataset),e.remove()}),a("img,iframe").load(function(){i.self.parentIFrame&&i.self.parentIFrame.reset()}),i.self.document.getElementById("div-gpt-ad-1418849849333-0")&&i.parent._CMLS.CCC_IFRAME_ACTIVATE_DFP(i.self),i.parent.document.addEventListener("scroll",n(r.handler,500)),i.parent.addEventListener("resize",n(r.handler,500)),i.parent.addEventListener("orientationchange",n(r.handler,500)),r.handler()})},i.document.head.appendChild(a),s("Injecting iframe-resizer contentWindow library");var o=i.document.createElement("script");o.src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.4/iframeResizer.contentWindow.min.js",o.onload=function(){s("iframe-resizer contentWindow loaded.")},i.document.head.appendChild(o),i.parent._CMLS&&i.parent._CMLS.CCC_IFRAME_SETUP&&(s("Calling parent iframe setup"),i.parent._CMLS.CCC_IFRAME_SETUP(i.self))}(window.self);
//# sourceMappingURL=base-min.js.map