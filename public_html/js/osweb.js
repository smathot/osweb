/*!
* @license CreateJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2015 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{},createjs.extend=function(a,b){"use strict";function c(){this.constructor=a}return c.prototype=b.prototype,a.prototype=new c},this.createjs=this.createjs||{},createjs.promote=function(a,b){"use strict";var c=a.prototype,d=Object.getPrototypeOf&&Object.getPrototypeOf(c)||c.__proto__;if(d){c[(b+="_")+"constructor"]=d.constructor;for(var e in d)c.hasOwnProperty(e)&&"function"==typeof d[e]&&(c[b+e]=d[e])}return a},this.createjs=this.createjs||{},createjs.indexOf=function(a,b){"use strict";for(var c=0,d=a.length;d>c;c++)if(b===a[c])return c;return-1},this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.type=a,this.target=null,this.currentTarget=null,this.eventPhase=0,this.bubbles=!!b,this.cancelable=!!c,this.timeStamp=(new Date).getTime(),this.defaultPrevented=!1,this.propagationStopped=!1,this.immediatePropagationStopped=!1,this.removed=!1}var b=a.prototype;b.preventDefault=function(){this.defaultPrevented=this.cancelable&&!0},b.stopPropagation=function(){this.propagationStopped=!0},b.stopImmediatePropagation=function(){this.immediatePropagationStopped=this.propagationStopped=!0},b.remove=function(){this.removed=!0},b.clone=function(){return new a(this.type,this.bubbles,this.cancelable)},b.set=function(a){for(var b in a)this[b]=a[b];return this},b.toString=function(){return"[Event (type="+this.type+")]"},createjs.Event=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this._listeners=null,this._captureListeners=null}var b=a.prototype;a.initialize=function(a){a.addEventListener=b.addEventListener,a.on=b.on,a.removeEventListener=a.off=b.removeEventListener,a.removeAllEventListeners=b.removeAllEventListeners,a.hasEventListener=b.hasEventListener,a.dispatchEvent=b.dispatchEvent,a._dispatchEvent=b._dispatchEvent,a.willTrigger=b.willTrigger},b.addEventListener=function(a,b,c){var d;d=c?this._captureListeners=this._captureListeners||{}:this._listeners=this._listeners||{};var e=d[a];return e&&this.removeEventListener(a,b,c),e=d[a],e?e.push(b):d[a]=[b],b},b.on=function(a,b,c,d,e,f){return b.handleEvent&&(c=c||b,b=b.handleEvent),c=c||this,this.addEventListener(a,function(a){b.call(c,a,e),d&&a.remove()},f)},b.removeEventListener=function(a,b,c){var d=c?this._captureListeners:this._listeners;if(d){var e=d[a];if(e)for(var f=0,g=e.length;g>f;f++)if(e[f]==b){1==g?delete d[a]:e.splice(f,1);break}}},b.off=b.removeEventListener,b.removeAllEventListeners=function(a){a?(this._listeners&&delete this._listeners[a],this._captureListeners&&delete this._captureListeners[a]):this._listeners=this._captureListeners=null},b.dispatchEvent=function(a,b,c){if("string"==typeof a){var d=this._listeners;if(!(b||d&&d[a]))return!0;a=new createjs.Event(a,b,c)}else a.target&&a.clone&&(a=a.clone());try{a.target=this}catch(e){}if(a.bubbles&&this.parent){for(var f=this,g=[f];f.parent;)g.push(f=f.parent);var h,i=g.length;for(h=i-1;h>=0&&!a.propagationStopped;h--)g[h]._dispatchEvent(a,1+(0==h));for(h=1;i>h&&!a.propagationStopped;h++)g[h]._dispatchEvent(a,3)}else this._dispatchEvent(a,2);return!a.defaultPrevented},b.hasEventListener=function(a){var b=this._listeners,c=this._captureListeners;return!!(b&&b[a]||c&&c[a])},b.willTrigger=function(a){for(var b=this;b;){if(b.hasEventListener(a))return!0;b=b.parent}return!1},b.toString=function(){return"[EventDispatcher]"},b._dispatchEvent=function(a,b){var c,d=1==b?this._captureListeners:this._listeners;if(a&&d){var e=d[a.type];if(!e||!(c=e.length))return;try{a.currentTarget=this}catch(f){}try{a.eventPhase=b}catch(f){}a.removed=!1,e=e.slice();for(var g=0;c>g&&!a.immediatePropagationStopped;g++){var h=e[g];h.handleEvent?h.handleEvent(a):h(a),a.removed&&(this.off(a.type,h,1==b),a.removed=!1)}}},createjs.EventDispatcher=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"Ticker cannot be instantiated."}a.RAF_SYNCHED="synched",a.RAF="raf",a.TIMEOUT="timeout",a.useRAF=!1,a.timingMode=null,a.maxDelta=0,a.paused=!1,a.removeEventListener=null,a.removeAllEventListeners=null,a.dispatchEvent=null,a.hasEventListener=null,a._listeners=null,createjs.EventDispatcher.initialize(a),a._addEventListener=a.addEventListener,a.addEventListener=function(){return!a._inited&&a.init(),a._addEventListener.apply(a,arguments)},a._inited=!1,a._startTime=0,a._pausedTime=0,a._ticks=0,a._pausedTicks=0,a._interval=50,a._lastTime=0,a._times=null,a._tickTimes=null,a._timerId=null,a._raf=!0,a.setInterval=function(b){a._interval=b,a._inited&&a._setupTick()},a.getInterval=function(){return a._interval},a.setFPS=function(b){a.setInterval(1e3/b)},a.getFPS=function(){return 1e3/a._interval};try{Object.defineProperties(a,{interval:{get:a.getInterval,set:a.setInterval},framerate:{get:a.getFPS,set:a.setFPS}})}catch(b){console.log(b)}a.init=function(){a._inited||(a._inited=!0,a._times=[],a._tickTimes=[],a._startTime=a._getTime(),a._times.push(a._lastTime=0),a.interval=a._interval)},a.reset=function(){if(a._raf){var b=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame;b&&b(a._timerId)}else clearTimeout(a._timerId);a.removeAllEventListeners("tick"),a._timerId=a._times=a._tickTimes=null,a._startTime=a._lastTime=a._ticks=0,a._inited=!1},a.getMeasuredTickTime=function(b){var c=0,d=a._tickTimes;if(!d||d.length<1)return-1;b=Math.min(d.length,b||0|a.getFPS());for(var e=0;b>e;e++)c+=d[e];return c/b},a.getMeasuredFPS=function(b){var c=a._times;return!c||c.length<2?-1:(b=Math.min(c.length-1,b||0|a.getFPS()),1e3/((c[0]-c[b])/b))},a.setPaused=function(b){a.paused=b},a.getPaused=function(){return a.paused},a.getTime=function(b){return a._startTime?a._getTime()-(b?a._pausedTime:0):-1},a.getEventTime=function(b){return a._startTime?(a._lastTime||a._startTime)-(b?a._pausedTime:0):-1},a.getTicks=function(b){return a._ticks-(b?a._pausedTicks:0)},a._handleSynch=function(){a._timerId=null,a._setupTick(),a._getTime()-a._lastTime>=.97*(a._interval-1)&&a._tick()},a._handleRAF=function(){a._timerId=null,a._setupTick(),a._tick()},a._handleTimeout=function(){a._timerId=null,a._setupTick(),a._tick()},a._setupTick=function(){if(null==a._timerId){var b=a.timingMode||a.useRAF&&a.RAF_SYNCHED;if(b==a.RAF_SYNCHED||b==a.RAF){var c=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(c)return a._timerId=c(b==a.RAF?a._handleRAF:a._handleSynch),void(a._raf=!0)}a._raf=!1,a._timerId=setTimeout(a._handleTimeout,a._interval)}},a._tick=function(){var b=a.paused,c=a._getTime(),d=c-a._lastTime;if(a._lastTime=c,a._ticks++,b&&(a._pausedTicks++,a._pausedTime+=d),a.hasEventListener("tick")){var e=new createjs.Event("tick"),f=a.maxDelta;e.delta=f&&d>f?f:d,e.paused=b,e.time=c,e.runTime=c-a._pausedTime,a.dispatchEvent(e)}for(a._tickTimes.unshift(a._getTime()-c);a._tickTimes.length>100;)a._tickTimes.pop();for(a._times.unshift(c);a._times.length>100;)a._times.pop()};var c=window.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow);a._getTime=function(){return(c&&c.call(performance)||(new Date).getTime())-a._startTime},createjs.Ticker=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"UID cannot be instantiated"}a._nextID=0,a.get=function(){return a._nextID++},createjs.UID=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f,g,h,i,j,k){this.Event_constructor(a,b,c),this.stageX=d,this.stageY=e,this.rawX=null==i?d:i,this.rawY=null==j?e:j,this.nativeEvent=f,this.pointerID=g,this.primary=!!h,this.relatedTarget=k}var b=createjs.extend(a,createjs.Event);b._get_localX=function(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).x},b._get_localY=function(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).y},b._get_isTouch=function(){return-1!==this.pointerID};try{Object.defineProperties(b,{localX:{get:b._get_localX},localY:{get:b._get_localY},isTouch:{get:b._get_isTouch}})}catch(c){}b.clone=function(){return new a(this.type,this.bubbles,this.cancelable,this.stageX,this.stageY,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)},b.toString=function(){return"[MouseEvent (type="+this.type+" stageX="+this.stageX+" stageY="+this.stageY+")]"},createjs.MouseEvent=createjs.promote(a,"Event")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f){this.setValues(a,b,c,d,e,f)}var b=a.prototype;a.DEG_TO_RAD=Math.PI/180,a.identity=null,b.setValues=function(a,b,c,d,e,f){return this.a=null==a?1:a,this.b=b||0,this.c=c||0,this.d=null==d?1:d,this.tx=e||0,this.ty=f||0,this},b.append=function(a,b,c,d,e,f){var g=this.a,h=this.b,i=this.c,j=this.d;return(1!=a||0!=b||0!=c||1!=d)&&(this.a=g*a+i*b,this.b=h*a+j*b,this.c=g*c+i*d,this.d=h*c+j*d),this.tx=g*e+i*f+this.tx,this.ty=h*e+j*f+this.ty,this},b.prepend=function(a,b,c,d,e,f){var g=this.a,h=this.c,i=this.tx;return this.a=a*g+c*this.b,this.b=b*g+d*this.b,this.c=a*h+c*this.d,this.d=b*h+d*this.d,this.tx=a*i+c*this.ty+e,this.ty=b*i+d*this.ty+f,this},b.appendMatrix=function(a){return this.append(a.a,a.b,a.c,a.d,a.tx,a.ty)},b.prependMatrix=function(a){return this.prepend(a.a,a.b,a.c,a.d,a.tx,a.ty)},b.appendTransform=function(b,c,d,e,f,g,h,i,j){if(f%360)var k=f*a.DEG_TO_RAD,l=Math.cos(k),m=Math.sin(k);else l=1,m=0;return g||h?(g*=a.DEG_TO_RAD,h*=a.DEG_TO_RAD,this.append(Math.cos(h),Math.sin(h),-Math.sin(g),Math.cos(g),b,c),this.append(l*d,m*d,-m*e,l*e,0,0)):this.append(l*d,m*d,-m*e,l*e,b,c),(i||j)&&(this.tx-=i*this.a+j*this.c,this.ty-=i*this.b+j*this.d),this},b.prependTransform=function(b,c,d,e,f,g,h,i,j){if(f%360)var k=f*a.DEG_TO_RAD,l=Math.cos(k),m=Math.sin(k);else l=1,m=0;return(i||j)&&(this.tx-=i,this.ty-=j),g||h?(g*=a.DEG_TO_RAD,h*=a.DEG_TO_RAD,this.prepend(l*d,m*d,-m*e,l*e,0,0),this.prepend(Math.cos(h),Math.sin(h),-Math.sin(g),Math.cos(g),b,c)):this.prepend(l*d,m*d,-m*e,l*e,b,c),this},b.rotate=function(b){b*=a.DEG_TO_RAD;var c=Math.cos(b),d=Math.sin(b),e=this.a,f=this.b;return this.a=e*c+this.c*d,this.b=f*c+this.d*d,this.c=-e*d+this.c*c,this.d=-f*d+this.d*c,this},b.skew=function(b,c){return b*=a.DEG_TO_RAD,c*=a.DEG_TO_RAD,this.append(Math.cos(c),Math.sin(c),-Math.sin(b),Math.cos(b),0,0),this},b.scale=function(a,b){return this.a*=a,this.b*=a,this.c*=b,this.d*=b,this},b.translate=function(a,b){return this.tx+=this.a*a+this.c*b,this.ty+=this.b*a+this.d*b,this},b.identity=function(){return this.a=this.d=1,this.b=this.c=this.tx=this.ty=0,this},b.invert=function(){var a=this.a,b=this.b,c=this.c,d=this.d,e=this.tx,f=a*d-b*c;return this.a=d/f,this.b=-b/f,this.c=-c/f,this.d=a/f,this.tx=(c*this.ty-d*e)/f,this.ty=-(a*this.ty-b*e)/f,this},b.isIdentity=function(){return 0===this.tx&&0===this.ty&&1===this.a&&0===this.b&&0===this.c&&1===this.d},b.equals=function(a){return this.tx===a.tx&&this.ty===a.ty&&this.a===a.a&&this.b===a.b&&this.c===a.c&&this.d===a.d},b.transformPoint=function(a,b,c){return c=c||{},c.x=a*this.a+b*this.c+this.tx,c.y=a*this.b+b*this.d+this.ty,c},b.decompose=function(b){null==b&&(b={}),b.x=this.tx,b.y=this.ty,b.scaleX=Math.sqrt(this.a*this.a+this.b*this.b),b.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);var c=Math.atan2(-this.c,this.d),d=Math.atan2(this.b,this.a),e=Math.abs(1-c/d);return 1e-5>e?(b.rotation=d/a.DEG_TO_RAD,this.a<0&&this.d>=0&&(b.rotation+=b.rotation<=0?180:-180),b.skewX=b.skewY=0):(b.skewX=c/a.DEG_TO_RAD,b.skewY=d/a.DEG_TO_RAD),b},b.copy=function(a){return this.setValues(a.a,a.b,a.c,a.d,a.tx,a.ty)},b.clone=function(){return new a(this.a,this.b,this.c,this.d,this.tx,this.ty)},b.toString=function(){return"[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]"},a.identity=new a,createjs.Matrix2D=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e){this.setValues(a,b,c,d,e)}var b=a.prototype;b.setValues=function(a,b,c,d,e){return this.visible=null==a?!0:!!a,this.alpha=null==b?1:b,this.shadow=c,this.compositeOperation=d,this.matrix=e||this.matrix&&this.matrix.identity()||new createjs.Matrix2D,this},b.append=function(a,b,c,d,e){return this.alpha*=b,this.shadow=c||this.shadow,this.compositeOperation=d||this.compositeOperation,this.visible=this.visible&&a,e&&this.matrix.appendMatrix(e),this},b.prepend=function(a,b,c,d,e){return this.alpha*=b,this.shadow=this.shadow||c,this.compositeOperation=this.compositeOperation||d,this.visible=this.visible&&a,e&&this.matrix.prependMatrix(e),this},b.identity=function(){return this.visible=!0,this.alpha=1,this.shadow=this.compositeOperation=null,this.matrix.identity(),this},b.clone=function(){return new a(this.alpha,this.shadow,this.compositeOperation,this.visible,this.matrix.clone())},createjs.DisplayProps=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.setValues(a,b)}var b=a.prototype;b.setValues=function(a,b){return this.x=a||0,this.y=b||0,this},b.copy=function(a){return this.x=a.x,this.y=a.y,this},b.clone=function(){return new a(this.x,this.y)},b.toString=function(){return"[Point (x="+this.x+" y="+this.y+")]"},createjs.Point=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.setValues(a,b,c,d)}var b=a.prototype;b.setValues=function(a,b,c,d){return this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0,this},b.extend=function(a,b,c,d){return c=c||0,d=d||0,a+c>this.x+this.width&&(this.width=a+c-this.x),b+d>this.y+this.height&&(this.height=b+d-this.y),a<this.x&&(this.width+=this.x-a,this.x=a),b<this.y&&(this.height+=this.y-b,this.y=b),this},b.pad=function(a,b,c,d){return this.x-=b,this.y-=a,this.width+=b+d,this.height+=a+c,this},b.copy=function(a){return this.setValues(a.x,a.y,a.width,a.height)},b.contains=function(a,b,c,d){return c=c||0,d=d||0,a>=this.x&&a+c<=this.x+this.width&&b>=this.y&&b+d<=this.y+this.height},b.union=function(a){return this.clone().extend(a.x,a.y,a.width,a.height)},b.intersection=function(b){var c=b.x,d=b.y,e=c+b.width,f=d+b.height;return this.x>c&&(c=this.x),this.y>d&&(d=this.y),this.x+this.width<e&&(e=this.x+this.width),this.y+this.height<f&&(f=this.y+this.height),c>=e||d>=f?null:new a(c,d,e-c,f-d)},b.intersects=function(a){return a.x<=this.x+this.width&&this.x<=a.x+a.width&&a.y<=this.y+this.height&&this.y<=a.y+a.height},b.isEmpty=function(){return this.width<=0||this.height<=0},b.clone=function(){return new a(this.x,this.y,this.width,this.height)},b.toString=function(){return"[Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")]"},createjs.Rectangle=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f,g){a.addEventListener&&(this.target=a,this.overLabel=null==c?"over":c,this.outLabel=null==b?"out":b,this.downLabel=null==d?"down":d,this.play=e,this._isPressed=!1,this._isOver=!1,this._enabled=!1,a.mouseChildren=!1,this.enabled=!0,this.handleEvent({}),f&&(g&&(f.actionsEnabled=!1,f.gotoAndStop&&f.gotoAndStop(g)),a.hitArea=f))}var b=a.prototype;b.setEnabled=function(a){if(a!=this._enabled){var b=this.target;this._enabled=a,a?(b.cursor="pointer",b.addEventListener("rollover",this),b.addEventListener("rollout",this),b.addEventListener("mousedown",this),b.addEventListener("pressup",this),b._reset&&(b.__reset=b._reset,b._reset=this._reset)):(b.cursor=null,b.removeEventListener("rollover",this),b.removeEventListener("rollout",this),b.removeEventListener("mousedown",this),b.removeEventListener("pressup",this),b.__reset&&(b._reset=b.__reset,delete b.__reset))}},b.getEnabled=function(){return this._enabled};try{Object.defineProperties(b,{enabled:{get:b.getEnabled,set:b.setEnabled}})}catch(c){}b.toString=function(){return"[ButtonHelper]"},b.handleEvent=function(a){var b,c=this.target,d=a.type;"mousedown"==d?(this._isPressed=!0,b=this.downLabel):"pressup"==d?(this._isPressed=!1,b=this._isOver?this.overLabel:this.outLabel):"rollover"==d?(this._isOver=!0,b=this._isPressed?this.downLabel:this.overLabel):(this._isOver=!1,b=this._isPressed?this.overLabel:this.outLabel),this.play?c.gotoAndPlay&&c.gotoAndPlay(b):c.gotoAndStop&&c.gotoAndStop(b)},b._reset=function(){var a=this.paused;this.__reset(),this.paused=a},createjs.ButtonHelper=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.color=a||"black",this.offsetX=b||0,this.offsetY=c||0,this.blur=d||0}var b=a.prototype;a.identity=new a("transparent",0,0,0),b.toString=function(){return"[Shadow]"},b.clone=function(){return new a(this.color,this.offsetX,this.offsetY,this.blur)},createjs.Shadow=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.EventDispatcher_constructor(),this.complete=!0,this.framerate=0,this._animations=null,this._frames=null,this._images=null,this._data=null,this._loadCount=0,this._frameHeight=0,this._frameWidth=0,this._numFrames=0,this._regX=0,this._regY=0,this._spacing=0,this._margin=0,this._parseData(a)}var b=createjs.extend(a,createjs.EventDispatcher);b.getAnimations=function(){return this._animations.slice()};try{Object.defineProperties(b,{animations:{get:b.getAnimations}})}catch(c){}b.getNumFrames=function(a){if(null==a)return this._frames?this._frames.length:this._numFrames||0;var b=this._data[a];return null==b?0:b.frames.length},b.getAnimation=function(a){return this._data[a]},b.getFrame=function(a){var b;return this._frames&&(b=this._frames[a])?b:null},b.getFrameBounds=function(a,b){var c=this.getFrame(a);return c?(b||new createjs.Rectangle).setValues(-c.regX,-c.regY,c.rect.width,c.rect.height):null},b.toString=function(){return"[SpriteSheet]"},b.clone=function(){throw"SpriteSheet cannot be cloned."},b._parseData=function(a){var b,c,d,e;if(null!=a){if(this.framerate=a.framerate||0,a.images&&(c=a.images.length)>0)for(e=this._images=[],b=0;c>b;b++){var f=a.images[b];if("string"==typeof f){var g=f;f=document.createElement("img"),f.src=g}e.push(f),f.getContext||f.naturalWidth||(this._loadCount++,this.complete=!1,function(a,b){f.onload=function(){a._handleImageLoad(b)}}(this,g),function(a,b){f.onerror=function(){a._handleImageError(b)}}(this,g))}if(null==a.frames);else if(Array.isArray(a.frames))for(this._frames=[],e=a.frames,b=0,c=e.length;c>b;b++){var h=e[b];this._frames.push({image:this._images[h[4]?h[4]:0],rect:new createjs.Rectangle(h[0],h[1],h[2],h[3]),regX:h[5]||0,regY:h[6]||0})}else d=a.frames,this._frameWidth=d.width,this._frameHeight=d.height,this._regX=d.regX||0,this._regY=d.regY||0,this._spacing=d.spacing||0,this._margin=d.margin||0,this._numFrames=d.count,0==this._loadCount&&this._calculateFrames();if(this._animations=[],null!=(d=a.animations)){this._data={};var i;for(i in d){var j={name:i},k=d[i];if("number"==typeof k)e=j.frames=[k];else if(Array.isArray(k))if(1==k.length)j.frames=[k[0]];else for(j.speed=k[3],j.next=k[2],e=j.frames=[],b=k[0];b<=k[1];b++)e.push(b);else{j.speed=k.speed,j.next=k.next;var l=k.frames;e=j.frames="number"==typeof l?[l]:l.slice(0)}(j.next===!0||void 0===j.next)&&(j.next=i),(j.next===!1||e.length<2&&j.next==i)&&(j.next=null),j.speed||(j.speed=1),this._animations.push(i),this._data[i]=j}}}},b._handleImageLoad=function(a){0==--this._loadCount&&(this._calculateFrames(),this.complete=!0,this.dispatchEvent("complete"))},b._handleImageError=function(a){var b=new createjs.Event("error");b.src=a,this.dispatchEvent(b),0==--this._loadCount&&this.dispatchEvent("complete")},b._calculateFrames=function(){if(!this._frames&&0!=this._frameWidth){this._frames=[];var a=this._numFrames||1e5,b=0,c=this._frameWidth,d=this._frameHeight,e=this._spacing,f=this._margin;a:for(var g=0,h=this._images;g<h.length;g++)for(var i=h[g],j=i.width,k=i.height,l=f;k-f-d>=l;){for(var m=f;j-f-c>=m;){if(b>=a)break a;b++,this._frames.push({image:i,rect:new createjs.Rectangle(m,l,c,d),regX:this._regX,regY:this._regY}),m+=c+e}l+=d+e}this._numFrames=b}},createjs.SpriteSheet=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.command=null,this._stroke=null,this._strokeStyle=null,this._oldStrokeStyle=null,this._strokeDash=null,this._oldStrokeDash=null,this._strokeIgnoreScale=!1,this._fill=null,this._instructions=[],this._commitIndex=0,this._activeInstructions=[],this._dirty=!1,this._storeIndex=0,this.clear()}var b=a.prototype,c=a;a.getRGB=function(a,b,c,d){return null!=a&&null==c&&(d=b,c=255&a,b=a>>8&255,a=a>>16&255),null==d?"rgb("+a+","+b+","+c+")":"rgba("+a+","+b+","+c+","+d+")"},a.getHSL=function(a,b,c,d){return null==d?"hsl("+a%360+","+b+"%,"+c+"%)":"hsla("+a%360+","+b+"%,"+c+"%,"+d+")"},a.BASE_64={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63},a.STROKE_CAPS_MAP=["butt","round","square"],a.STROKE_JOINTS_MAP=["miter","round","bevel"];var d=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");d.getContext&&(a._ctx=d.getContext("2d"),d.width=d.height=1),b.getInstructions=function(){return this._updateInstructions(),this._instructions};try{Object.defineProperties(b,{instructions:{get:b.getInstructions}})}catch(e){}b.isEmpty=function(){return!(this._instructions.length||this._activeInstructions.length)},b.draw=function(a,b){this._updateInstructions();for(var c=this._instructions,d=this._storeIndex,e=c.length;e>d;d++)c[d].exec(a,b)},b.drawAsPath=function(a){this._updateInstructions();for(var b,c=this._instructions,d=this._storeIndex,e=c.length;e>d;d++)(b=c[d]).path!==!1&&b.exec(a)},b.moveTo=function(a,b){return this.append(new c.MoveTo(a,b),!0)},b.lineTo=function(a,b){return this.append(new c.LineTo(a,b))},b.arcTo=function(a,b,d,e,f){return this.append(new c.ArcTo(a,b,d,e,f))},b.arc=function(a,b,d,e,f,g){return this.append(new c.Arc(a,b,d,e,f,g))},b.quadraticCurveTo=function(a,b,d,e){return this.append(new c.QuadraticCurveTo(a,b,d,e))},b.bezierCurveTo=function(a,b,d,e,f,g){return this.append(new c.BezierCurveTo(a,b,d,e,f,g))},b.rect=function(a,b,d,e){return this.append(new c.Rect(a,b,d,e))},b.closePath=function(){return this._activeInstructions.length?this.append(new c.ClosePath):this},b.clear=function(){return this._instructions.length=this._activeInstructions.length=this._commitIndex=0,this._strokeStyle=this._oldStrokeStyle=this._stroke=this._fill=this._strokeDash=this._oldStrokeDash=null,this._dirty=this._strokeIgnoreScale=!1,this},b.beginFill=function(a){return this._setFill(a?new c.Fill(a):null)},b.beginLinearGradientFill=function(a,b,d,e,f,g){return this._setFill((new c.Fill).linearGradient(a,b,d,e,f,g))},b.beginRadialGradientFill=function(a,b,d,e,f,g,h,i){return this._setFill((new c.Fill).radialGradient(a,b,d,e,f,g,h,i))},b.beginBitmapFill=function(a,b,d){return this._setFill(new c.Fill(null,d).bitmap(a,b))},b.endFill=function(){return this.beginFill()},b.setStrokeStyle=function(a,b,d,e,f){return this._updateInstructions(!0),this._strokeStyle=this.command=new c.StrokeStyle(a,b,d,e,f),this._stroke&&(this._stroke.ignoreScale=f),this._strokeIgnoreScale=f,this},b.setStrokeDash=function(a,b){return this._updateInstructions(!0),this._strokeDash=this.command=new c.StrokeDash(a,b),this},b.beginStroke=function(a){return this._setStroke(a?new c.Stroke(a):null)},b.beginLinearGradientStroke=function(a,b,d,e,f,g){return this._setStroke((new c.Stroke).linearGradient(a,b,d,e,f,g))},b.beginRadialGradientStroke=function(a,b,d,e,f,g,h,i){return this._setStroke((new c.Stroke).radialGradient(a,b,d,e,f,g,h,i))},b.beginBitmapStroke=function(a,b){return this._setStroke((new c.Stroke).bitmap(a,b))},b.endStroke=function(){return this.beginStroke()},b.curveTo=b.quadraticCurveTo,b.drawRect=b.rect,b.drawRoundRect=function(a,b,c,d,e){return this.drawRoundRectComplex(a,b,c,d,e,e,e,e)},b.drawRoundRectComplex=function(a,b,d,e,f,g,h,i){return this.append(new c.RoundRect(a,b,d,e,f,g,h,i))},b.drawCircle=function(a,b,d){return this.append(new c.Circle(a,b,d))},b.drawEllipse=function(a,b,d,e){return this.append(new c.Ellipse(a,b,d,e))},b.drawPolyStar=function(a,b,d,e,f,g){return this.append(new c.PolyStar(a,b,d,e,f,g))},b.append=function(a,b){return this._activeInstructions.push(a),this.command=a,b||(this._dirty=!0),this},b.decodePath=function(b){for(var c=[this.moveTo,this.lineTo,this.quadraticCurveTo,this.bezierCurveTo,this.closePath],d=[2,2,4,6,0],e=0,f=b.length,g=[],h=0,i=0,j=a.BASE_64;f>e;){var k=b.charAt(e),l=j[k],m=l>>3,n=c[m];if(!n||3&l)throw"bad path data (@"+e+"): "+k;var o=d[m];m||(h=i=0),g.length=0,e++;for(var p=(l>>2&1)+2,q=0;o>q;q++){var r=j[b.charAt(e)],s=r>>5?-1:1;r=(31&r)<<6|j[b.charAt(e+1)],3==p&&(r=r<<6|j[b.charAt(e+2)]),r=s*r/10,q%2?h=r+=h:i=r+=i,g[q]=r,e+=p}n.apply(this,g)}return this},b.store=function(){return this._updateInstructions(!0),this._storeIndex=this._instructions.length,this},b.unstore=function(){return this._storeIndex=0,this},b.clone=function(){var b=new a;return b.command=this.command,b._stroke=this._stroke,b._strokeStyle=this._strokeStyle,b._strokeDash=this._strokeDash,b._strokeIgnoreScale=this._strokeIgnoreScale,b._fill=this._fill,b._instructions=this._instructions.slice(),b._commitIndex=this._commitIndex,b._activeInstructions=this._activeInstructions.slice(),b._dirty=this._dirty,b._storeIndex=this._storeIndex,b},b.toString=function(){return"[Graphics]"},b.mt=b.moveTo,b.lt=b.lineTo,b.at=b.arcTo,b.bt=b.bezierCurveTo,b.qt=b.quadraticCurveTo,b.a=b.arc,b.r=b.rect,b.cp=b.closePath,b.c=b.clear,b.f=b.beginFill,b.lf=b.beginLinearGradientFill,b.rf=b.beginRadialGradientFill,b.bf=b.beginBitmapFill,b.ef=b.endFill,b.ss=b.setStrokeStyle,b.sd=b.setStrokeDash,b.s=b.beginStroke,b.ls=b.beginLinearGradientStroke,b.rs=b.beginRadialGradientStroke,b.bs=b.beginBitmapStroke,b.es=b.endStroke,b.dr=b.drawRect,b.rr=b.drawRoundRect,b.rc=b.drawRoundRectComplex,b.dc=b.drawCircle,b.de=b.drawEllipse,b.dp=b.drawPolyStar,b.p=b.decodePath,b._updateInstructions=function(b){var c=this._instructions,d=this._activeInstructions,e=this._commitIndex;if(this._dirty&&d.length){c.length=e,c.push(a.beginCmd);var f=d.length,g=c.length;c.length=g+f;for(var h=0;f>h;h++)c[h+g]=d[h];this._fill&&c.push(this._fill),this._stroke&&(this._strokeDash!==this._oldStrokeDash&&(this._oldStrokeDash=this._strokeDash,c.push(this._strokeDash)),this._strokeStyle!==this._oldStrokeStyle&&(this._oldStrokeStyle=this._strokeStyle,c.push(this._strokeStyle)),c.push(this._stroke)),this._dirty=!1}b&&(d.length=0,this._commitIndex=c.length)},b._setFill=function(a){return this._updateInstructions(!0),this.command=this._fill=a,this},b._setStroke=function(a){return this._updateInstructions(!0),(this.command=this._stroke=a)&&(a.ignoreScale=this._strokeIgnoreScale),this},(c.LineTo=function(a,b){this.x=a,this.y=b}).prototype.exec=function(a){a.lineTo(this.x,this.y)},(c.MoveTo=function(a,b){this.x=a,this.y=b}).prototype.exec=function(a){a.moveTo(this.x,this.y)},(c.ArcTo=function(a,b,c,d,e){this.x1=a,this.y1=b,this.x2=c,this.y2=d,this.radius=e}).prototype.exec=function(a){a.arcTo(this.x1,this.y1,this.x2,this.y2,this.radius)},(c.Arc=function(a,b,c,d,e,f){this.x=a,this.y=b,this.radius=c,this.startAngle=d,this.endAngle=e,this.anticlockwise=!!f}).prototype.exec=function(a){a.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle,this.anticlockwise)},(c.QuadraticCurveTo=function(a,b,c,d){this.cpx=a,this.cpy=b,this.x=c,this.y=d}).prototype.exec=function(a){a.quadraticCurveTo(this.cpx,this.cpy,this.x,this.y)},(c.BezierCurveTo=function(a,b,c,d,e,f){this.cp1x=a,this.cp1y=b,this.cp2x=c,this.cp2y=d,this.x=e,this.y=f}).prototype.exec=function(a){a.bezierCurveTo(this.cp1x,this.cp1y,this.cp2x,this.cp2y,this.x,this.y)},(c.Rect=function(a,b,c,d){this.x=a,this.y=b,this.w=c,this.h=d}).prototype.exec=function(a){a.rect(this.x,this.y,this.w,this.h)},(c.ClosePath=function(){}).prototype.exec=function(a){a.closePath()},(c.BeginPath=function(){}).prototype.exec=function(a){a.beginPath()},b=(c.Fill=function(a,b){this.style=a,this.matrix=b}).prototype,b.exec=function(a){if(this.style){a.fillStyle=this.style;var b=this.matrix;b&&(a.save(),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty)),a.fill(),b&&a.restore()}},b.linearGradient=function(b,c,d,e,f,g){for(var h=this.style=a._ctx.createLinearGradient(d,e,f,g),i=0,j=b.length;j>i;i++)h.addColorStop(c[i],b[i]);return h.props={colors:b,ratios:c,x0:d,y0:e,x1:f,y1:g,type:"linear"},this},b.radialGradient=function(b,c,d,e,f,g,h,i){for(var j=this.style=a._ctx.createRadialGradient(d,e,f,g,h,i),k=0,l=b.length;l>k;k++)j.addColorStop(c[k],b[k]);return j.props={colors:b,ratios:c,x0:d,y0:e,r0:f,x1:g,y1:h,r1:i,type:"radial"},this},b.bitmap=function(b,c){if(b.naturalWidth||b.getContext||b.readyState>=2){var d=this.style=a._ctx.createPattern(b,c||"");d.props={image:b,repetition:c,type:"bitmap"}}return this},b.path=!1,b=(c.Stroke=function(a,b){this.style=a,this.ignoreScale=b}).prototype,b.exec=function(a){this.style&&(a.strokeStyle=this.style,this.ignoreScale&&(a.save(),a.setTransform(1,0,0,1,0,0)),a.stroke(),this.ignoreScale&&a.restore())},b.linearGradient=c.Fill.prototype.linearGradient,b.radialGradient=c.Fill.prototype.radialGradient,b.bitmap=c.Fill.prototype.bitmap,b.path=!1,b=(c.StrokeStyle=function(a,b,c,d,e){this.width=a,this.caps=b,this.joints=c,this.miterLimit=d,this.ignoreScale=e}).prototype,b.exec=function(b){b.lineWidth=null==this.width?"1":this.width,b.lineCap=null==this.caps?"butt":isNaN(this.caps)?this.caps:a.STROKE_CAPS_MAP[this.caps],b.lineJoin=null==this.joints?"miter":isNaN(this.joints)?this.joints:a.STROKE_JOINTS_MAP[this.joints],b.miterLimit=null==this.miterLimit?"10":this.miterLimit,b.ignoreScale=null==this.ignoreScale?!1:this.ignoreScale},b.path=!1,(c.StrokeDash=function(a,b){this.segments=a,this.offset=b||0}).prototype.exec=function(a){a.setLineDash&&(a.setLineDash(this.segments||c.StrokeDash.EMPTY_SEGMENTS),a.lineDashOffset=this.offset||0)},c.StrokeDash.EMPTY_SEGMENTS=[],(c.RoundRect=function(a,b,c,d,e,f,g,h){this.x=a,this.y=b,this.w=c,this.h=d,this.radiusTL=e,this.radiusTR=f,this.radiusBR=g,this.radiusBL=h}).prototype.exec=function(a){var b=(j>i?i:j)/2,c=0,d=0,e=0,f=0,g=this.x,h=this.y,i=this.w,j=this.h,k=this.radiusTL,l=this.radiusTR,m=this.radiusBR,n=this.radiusBL;0>k&&(k*=c=-1),k>b&&(k=b),0>l&&(l*=d=-1),l>b&&(l=b),0>m&&(m*=e=-1),m>b&&(m=b),0>n&&(n*=f=-1),n>b&&(n=b),a.moveTo(g+i-l,h),a.arcTo(g+i+l*d,h-l*d,g+i,h+l,l),a.lineTo(g+i,h+j-m),a.arcTo(g+i+m*e,h+j+m*e,g+i-m,h+j,m),a.lineTo(g+n,h+j),a.arcTo(g-n*f,h+j+n*f,g,h+j-n,n),a.lineTo(g,h+k),a.arcTo(g-k*c,h-k*c,g+k,h,k),a.closePath()},(c.Circle=function(a,b,c){this.x=a,this.y=b,this.radius=c}).prototype.exec=function(a){a.arc(this.x,this.y,this.radius,0,2*Math.PI)},(c.Ellipse=function(a,b,c,d){this.x=a,this.y=b,this.w=c,this.h=d}).prototype.exec=function(a){var b=this.x,c=this.y,d=this.w,e=this.h,f=.5522848,g=d/2*f,h=e/2*f,i=b+d,j=c+e,k=b+d/2,l=c+e/2;a.moveTo(b,l),a.bezierCurveTo(b,l-h,k-g,c,k,c),a.bezierCurveTo(k+g,c,i,l-h,i,l),a.bezierCurveTo(i,l+h,k+g,j,k,j),a.bezierCurveTo(k-g,j,b,l+h,b,l)},(c.PolyStar=function(a,b,c,d,e,f){this.x=a,this.y=b,this.radius=c,this.sides=d,this.pointSize=e,this.angle=f}).prototype.exec=function(a){var b=this.x,c=this.y,d=this.radius,e=(this.angle||0)/180*Math.PI,f=this.sides,g=1-(this.pointSize||0),h=Math.PI/f;a.moveTo(b+Math.cos(e)*d,c+Math.sin(e)*d);for(var i=0;f>i;i++)e+=h,1!=g&&a.lineTo(b+Math.cos(e)*d*g,c+Math.sin(e)*d*g),e+=h,a.lineTo(b+Math.cos(e)*d,c+Math.sin(e)*d);a.closePath()},a.beginCmd=new c.BeginPath,createjs.Graphics=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.EventDispatcher_constructor(),this.alpha=1,this.cacheCanvas=null,this.cacheID=0,this.id=createjs.UID.get(),this.mouseEnabled=!0,this.tickEnabled=!0,this.name=null,this.parent=null,this.regX=0,this.regY=0,this.rotation=0,this.scaleX=1,this.scaleY=1,this.skewX=0,this.skewY=0,this.shadow=null,this.visible=!0,this.x=0,this.y=0,this.transformMatrix=null,this.compositeOperation=null,this.snapToPixel=!0,this.filters=null,
this.mask=null,this.hitArea=null,this.cursor=null,this._cacheOffsetX=0,this._cacheOffsetY=0,this._filterOffsetX=0,this._filterOffsetY=0,this._cacheScale=1,this._cacheDataURLID=0,this._cacheDataURL=null,this._props=new createjs.DisplayProps,this._rectangle=new createjs.Rectangle,this._bounds=null}var b=createjs.extend(a,createjs.EventDispatcher);a._MOUSE_EVENTS=["click","dblclick","mousedown","mouseout","mouseover","pressmove","pressup","rollout","rollover"],a.suppressCrossDomainErrors=!1,a._snapToPixelEnabled=!1;var c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c.getContext&&(a._hitTestCanvas=c,a._hitTestContext=c.getContext("2d"),c.width=c.height=1),a._nextCacheID=1,b.getStage=function(){for(var a=this,b=createjs.Stage;a.parent;)a=a.parent;return a instanceof b?a:null};try{Object.defineProperties(b,{stage:{get:b.getStage}})}catch(d){}b.isVisible=function(){return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY)},b.draw=function(a,b){var c=this.cacheCanvas;if(b||!c)return!1;var d=this._cacheScale;return a.drawImage(c,this._cacheOffsetX+this._filterOffsetX,this._cacheOffsetY+this._filterOffsetY,c.width/d,c.height/d),!0},b.updateContext=function(b){var c=this,d=c.mask,e=c._props.matrix;d&&d.graphics&&!d.graphics.isEmpty()&&(d.getMatrix(e),b.transform(e.a,e.b,e.c,e.d,e.tx,e.ty),d.graphics.drawAsPath(b),b.clip(),e.invert(),b.transform(e.a,e.b,e.c,e.d,e.tx,e.ty)),this.getMatrix(e);var f=e.tx,g=e.ty;a._snapToPixelEnabled&&c.snapToPixel&&(f=f+(0>f?-.5:.5)|0,g=g+(0>g?-.5:.5)|0),b.transform(e.a,e.b,e.c,e.d,f,g),b.globalAlpha*=c.alpha,c.compositeOperation&&(b.globalCompositeOperation=c.compositeOperation),c.shadow&&this._applyShadow(b,c.shadow)},b.cache=function(a,b,c,d,e){e=e||1,this.cacheCanvas||(this.cacheCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")),this._cacheWidth=c,this._cacheHeight=d,this._cacheOffsetX=a,this._cacheOffsetY=b,this._cacheScale=e,this.updateCache()},b.updateCache=function(b){var c=this.cacheCanvas;if(!c)throw"cache() must be called before updateCache()";var d=this._cacheScale,e=this._cacheOffsetX*d,f=this._cacheOffsetY*d,g=this._cacheWidth,h=this._cacheHeight,i=c.getContext("2d"),j=this._getFilterBounds();e+=this._filterOffsetX=j.x,f+=this._filterOffsetY=j.y,g=Math.ceil(g*d)+j.width,h=Math.ceil(h*d)+j.height,g!=c.width||h!=c.height?(c.width=g,c.height=h):b||i.clearRect(0,0,g+1,h+1),i.save(),i.globalCompositeOperation=b,i.setTransform(d,0,0,d,-e,-f),this.draw(i,!0),this._applyFilters(),i.restore(),this.cacheID=a._nextCacheID++},b.uncache=function(){this._cacheDataURL=this.cacheCanvas=null,this.cacheID=this._cacheOffsetX=this._cacheOffsetY=this._filterOffsetX=this._filterOffsetY=0,this._cacheScale=1},b.getCacheDataURL=function(){return this.cacheCanvas?(this.cacheID!=this._cacheDataURLID&&(this._cacheDataURL=this.cacheCanvas.toDataURL()),this._cacheDataURL):null},b.localToGlobal=function(a,b,c){return this.getConcatenatedMatrix(this._props.matrix).transformPoint(a,b,c||new createjs.Point)},b.globalToLocal=function(a,b,c){return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(a,b,c||new createjs.Point)},b.localToLocal=function(a,b,c,d){return d=this.localToGlobal(a,b,d),c.globalToLocal(d.x,d.y,d)},b.setTransform=function(a,b,c,d,e,f,g,h,i){return this.x=a||0,this.y=b||0,this.scaleX=null==c?1:c,this.scaleY=null==d?1:d,this.rotation=e||0,this.skewX=f||0,this.skewY=g||0,this.regX=h||0,this.regY=i||0,this},b.getMatrix=function(a){var b=this,c=a&&a.identity()||new createjs.Matrix2D;return b.transformMatrix?c.copy(b.transformMatrix):c.appendTransform(b.x,b.y,b.scaleX,b.scaleY,b.rotation,b.skewX,b.skewY,b.regX,b.regY)},b.getConcatenatedMatrix=function(a){for(var b=this,c=this.getMatrix(a);b=b.parent;)c.prependMatrix(b.getMatrix(b._props.matrix));return c},b.getConcatenatedDisplayProps=function(a){a=a?a.identity():new createjs.DisplayProps;var b=this,c=b.getMatrix(a.matrix);do a.prepend(b.visible,b.alpha,b.shadow,b.compositeOperation),b!=this&&c.prependMatrix(b.getMatrix(b._props.matrix));while(b=b.parent);return a},b.hitTest=function(b,c){var d=a._hitTestContext;d.setTransform(1,0,0,1,-b,-c),this.draw(d);var e=this._testHit(d);return d.setTransform(1,0,0,1,0,0),d.clearRect(0,0,2,2),e},b.set=function(a){for(var b in a)this[b]=a[b];return this},b.getBounds=function(){if(this._bounds)return this._rectangle.copy(this._bounds);var a=this.cacheCanvas;if(a){var b=this._cacheScale;return this._rectangle.setValues(this._cacheOffsetX,this._cacheOffsetY,a.width/b,a.height/b)}return null},b.getTransformedBounds=function(){return this._getBounds()},b.setBounds=function(a,b,c,d){null==a&&(this._bounds=a),this._bounds=(this._bounds||new createjs.Rectangle).setValues(a,b,c,d)},b.clone=function(){return this._cloneProps(new a)},b.toString=function(){return"[DisplayObject (name="+this.name+")]"},b._cloneProps=function(a){return a.alpha=this.alpha,a.mouseEnabled=this.mouseEnabled,a.tickEnabled=this.tickEnabled,a.name=this.name,a.regX=this.regX,a.regY=this.regY,a.rotation=this.rotation,a.scaleX=this.scaleX,a.scaleY=this.scaleY,a.shadow=this.shadow,a.skewX=this.skewX,a.skewY=this.skewY,a.visible=this.visible,a.x=this.x,a.y=this.y,a.compositeOperation=this.compositeOperation,a.snapToPixel=this.snapToPixel,a.filters=null==this.filters?null:this.filters.slice(0),a.mask=this.mask,a.hitArea=this.hitArea,a.cursor=this.cursor,a._bounds=this._bounds,a},b._applyShadow=function(a,b){b=b||Shadow.identity,a.shadowColor=b.color,a.shadowOffsetX=b.offsetX,a.shadowOffsetY=b.offsetY,a.shadowBlur=b.blur},b._tick=function(a){var b=this._listeners;b&&b.tick&&(a.target=null,a.propagationStopped=a.immediatePropagationStopped=!1,this.dispatchEvent(a))},b._testHit=function(b){try{var c=b.getImageData(0,0,1,1).data[3]>1}catch(d){if(!a.suppressCrossDomainErrors)throw"An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."}return c},b._applyFilters=function(){if(this.filters&&0!=this.filters.length&&this.cacheCanvas)for(var a=this.filters.length,b=this.cacheCanvas.getContext("2d"),c=this.cacheCanvas.width,d=this.cacheCanvas.height,e=0;a>e;e++)this.filters[e].applyFilter(b,0,0,c,d)},b._getFilterBounds=function(a){var b,c=this.filters,d=this._rectangle.setValues(0,0,0,0);if(!c||!(b=c.length))return d;for(var e=0;b>e;e++){var f=this.filters[e];f.getBounds&&f.getBounds(d)}return d},b._getBounds=function(a,b){return this._transformBounds(this.getBounds(),a,b)},b._transformBounds=function(a,b,c){if(!a)return a;var d=a.x,e=a.y,f=a.width,g=a.height,h=this._props.matrix;h=c?h.identity():this.getMatrix(h),(d||e)&&h.appendTransform(0,0,1,1,0,0,0,-d,-e),b&&h.prependMatrix(b);var i=f*h.a,j=f*h.b,k=g*h.c,l=g*h.d,m=h.tx,n=h.ty,o=m,p=m,q=n,r=n;return(d=i+m)<o?o=d:d>p&&(p=d),(d=i+k+m)<o?o=d:d>p&&(p=d),(d=k+m)<o?o=d:d>p&&(p=d),(e=j+n)<q?q=e:e>r&&(r=e),(e=j+l+n)<q?q=e:e>r&&(r=e),(e=l+n)<q?q=e:e>r&&(r=e),a.setValues(o,q,p-o,r-q)},b._hasMouseEventListener=function(){for(var b=a._MOUSE_EVENTS,c=0,d=b.length;d>c;c++)if(this.hasEventListener(b[c]))return!0;return!!this.cursor},createjs.DisplayObject=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.DisplayObject_constructor(),this.children=[],this.mouseChildren=!0,this.tickChildren=!0}var b=createjs.extend(a,createjs.DisplayObject);b.getNumChildren=function(){return this.children.length};try{Object.defineProperties(b,{numChildren:{get:b.getNumChildren}})}catch(c){}b.initialize=a,b.isVisible=function(){var a=this.cacheCanvas||this.children.length;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;for(var c=this.children.slice(),d=0,e=c.length;e>d;d++){var f=c[d];f.isVisible()&&(a.save(),f.updateContext(a),f.draw(a),a.restore())}return!0},b.addChild=function(a){if(null==a)return a;var b=arguments.length;if(b>1){for(var c=0;b>c;c++)this.addChild(arguments[c]);return arguments[b-1]}return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.push(a),a.dispatchEvent("added"),a},b.addChildAt=function(a,b){var c=arguments.length,d=arguments[c-1];if(0>d||d>this.children.length)return arguments[c-2];if(c>2){for(var e=0;c-1>e;e++)this.addChildAt(arguments[e],d+e);return arguments[c-2]}return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.splice(b,0,a),a.dispatchEvent("added"),a},b.removeChild=function(a){var b=arguments.length;if(b>1){for(var c=!0,d=0;b>d;d++)c=c&&this.removeChild(arguments[d]);return c}return this.removeChildAt(createjs.indexOf(this.children,a))},b.removeChildAt=function(a){var b=arguments.length;if(b>1){for(var c=[],d=0;b>d;d++)c[d]=arguments[d];c.sort(function(a,b){return b-a});for(var e=!0,d=0;b>d;d++)e=e&&this.removeChildAt(c[d]);return e}if(0>a||a>this.children.length-1)return!1;var f=this.children[a];return f&&(f.parent=null),this.children.splice(a,1),f.dispatchEvent("removed"),!0},b.removeAllChildren=function(){for(var a=this.children;a.length;)this.removeChildAt(0)},b.getChildAt=function(a){return this.children[a]},b.getChildByName=function(a){for(var b=this.children,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},b.sortChildren=function(a){this.children.sort(a)},b.getChildIndex=function(a){return createjs.indexOf(this.children,a)},b.swapChildrenAt=function(a,b){var c=this.children,d=c[a],e=c[b];d&&e&&(c[a]=e,c[b]=d)},b.swapChildren=function(a,b){for(var c,d,e=this.children,f=0,g=e.length;g>f&&(e[f]==a&&(c=f),e[f]==b&&(d=f),null==c||null==d);f++);f!=g&&(e[c]=b,e[d]=a)},b.setChildIndex=function(a,b){var c=this.children,d=c.length;if(!(a.parent!=this||0>b||b>=d)){for(var e=0;d>e&&c[e]!=a;e++);e!=d&&e!=b&&(c.splice(e,1),c.splice(b,0,a))}},b.contains=function(a){for(;a;){if(a==this)return!0;a=a.parent}return!1},b.hitTest=function(a,b){return null!=this.getObjectUnderPoint(a,b)},b.getObjectsUnderPoint=function(a,b,c){var d=[],e=this.localToGlobal(a,b);return this._getObjectsUnderPoint(e.x,e.y,d,c>0,1==c),d},b.getObjectUnderPoint=function(a,b,c){var d=this.localToGlobal(a,b);return this._getObjectsUnderPoint(d.x,d.y,null,c>0,1==c)},b.getBounds=function(){return this._getBounds(null,!0)},b.getTransformedBounds=function(){return this._getBounds()},b.clone=function(b){var c=this._cloneProps(new a);return b&&this._cloneChildren(c),c},b.toString=function(){return"[Container (name="+this.name+")]"},b._tick=function(a){if(this.tickChildren)for(var b=this.children.length-1;b>=0;b--){var c=this.children[b];c.tickEnabled&&c._tick&&c._tick(a)}this.DisplayObject__tick(a)},b._cloneChildren=function(a){a.children.length&&a.removeAllChildren();for(var b=a.children,c=0,d=this.children.length;d>c;c++){var e=this.children[c].clone(!0);e.parent=a,b.push(e)}},b._getObjectsUnderPoint=function(b,c,d,e,f,g){if(g=g||0,!g&&!this._testMask(this,b,c))return null;var h,i=createjs.DisplayObject._hitTestContext;f=f||e&&this._hasMouseEventListener();for(var j=this.children,k=j.length,l=k-1;l>=0;l--){var m=j[l],n=m.hitArea;if(m.visible&&(n||m.isVisible())&&(!e||m.mouseEnabled)&&(n||this._testMask(m,b,c)))if(!n&&m instanceof a){var o=m._getObjectsUnderPoint(b,c,d,e,f,g+1);if(!d&&o)return e&&!this.mouseChildren?this:o}else{if(e&&!f&&!m._hasMouseEventListener())continue;var p=m.getConcatenatedDisplayProps(m._props);if(h=p.matrix,n&&(h.appendMatrix(n.getMatrix(n._props.matrix)),p.alpha=n.alpha),i.globalAlpha=p.alpha,i.setTransform(h.a,h.b,h.c,h.d,h.tx-b,h.ty-c),(n||m).draw(i),!this._testHit(i))continue;if(i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,2,2),!d)return e&&!this.mouseChildren?this:m;d.push(m)}}return null},b._testMask=function(a,b,c){var d=a.mask;if(!d||!d.graphics||d.graphics.isEmpty())return!0;var e=this._props.matrix,f=a.parent;e=f?f.getConcatenatedMatrix(e):e.identity(),e=d.getMatrix(d._props.matrix).prependMatrix(e);var g=createjs.DisplayObject._hitTestContext;return g.setTransform(e.a,e.b,e.c,e.d,e.tx-b,e.ty-c),d.graphics.drawAsPath(g),g.fillStyle="#000",g.fill(),this._testHit(g)?(g.setTransform(1,0,0,1,0,0),g.clearRect(0,0,2,2),!0):!1},b._getBounds=function(a,b){var c=this.DisplayObject_getBounds();if(c)return this._transformBounds(c,a,b);var d=this._props.matrix;d=b?d.identity():this.getMatrix(d),a&&d.prependMatrix(a);for(var e=this.children.length,f=null,g=0;e>g;g++){var h=this.children[g];h.visible&&(c=h._getBounds(d))&&(f?f.extend(c.x,c.y,c.width,c.height):f=c.clone())}return f},createjs.Container=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.Container_constructor(),this.autoClear=!0,this.canvas="string"==typeof a?document.getElementById(a):a,this.mouseX=0,this.mouseY=0,this.drawRect=null,this.snapToPixelEnabled=!1,this.mouseInBounds=!1,this.tickOnUpdate=!0,this.mouseMoveOutside=!1,this.preventSelection=!0,this._pointerData={},this._pointerCount=0,this._primaryPointerID=null,this._mouseOverIntervalID=null,this._nextStage=null,this._prevStage=null,this.enableDOMEvents(!0)}var b=createjs.extend(a,createjs.Container);b._get_nextStage=function(){return this._nextStage},b._set_nextStage=function(a){this._nextStage&&(this._nextStage._prevStage=null),a&&(a._prevStage=this),this._nextStage=a};try{Object.defineProperties(b,{nextStage:{get:b._get_nextStage,set:b._set_nextStage}})}catch(c){}b.update=function(a){if(this.canvas&&(this.tickOnUpdate&&this.tick(a),this.dispatchEvent("drawstart",!1,!0)!==!1)){createjs.DisplayObject._snapToPixelEnabled=this.snapToPixelEnabled;var b=this.drawRect,c=this.canvas.getContext("2d");c.setTransform(1,0,0,1,0,0),this.autoClear&&(b?c.clearRect(b.x,b.y,b.width,b.height):c.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)),c.save(),this.drawRect&&(c.beginPath(),c.rect(b.x,b.y,b.width,b.height),c.clip()),this.updateContext(c),this.draw(c,!1),c.restore(),this.dispatchEvent("drawend")}},b.tick=function(a){if(this.tickEnabled&&this.dispatchEvent("tickstart",!1,!0)!==!1){var b=new createjs.Event("tick");if(a)for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);this._tick(b),this.dispatchEvent("tickend")}},b.handleEvent=function(a){"tick"==a.type&&this.update(a)},b.clear=function(){if(this.canvas){var a=this.canvas.getContext("2d");a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)}},b.toDataURL=function(a,b){var c,d=this.canvas.getContext("2d"),e=this.canvas.width,f=this.canvas.height;if(a){c=d.getImageData(0,0,e,f);var g=d.globalCompositeOperation;d.globalCompositeOperation="destination-over",d.fillStyle=a,d.fillRect(0,0,e,f)}var h=this.canvas.toDataURL(b||"image/png");return a&&(d.putImageData(c,0,0),d.globalCompositeOperation=g),h},b.enableMouseOver=function(a){if(this._mouseOverIntervalID&&(clearInterval(this._mouseOverIntervalID),this._mouseOverIntervalID=null,0==a&&this._testMouseOver(!0)),null==a)a=20;else if(0>=a)return;var b=this;this._mouseOverIntervalID=setInterval(function(){b._testMouseOver()},1e3/Math.min(50,a))},b.enableDOMEvents=function(a){null==a&&(a=!0);var b,c,d=this._eventListeners;if(!a&&d){for(b in d)c=d[b],c.t.removeEventListener(b,c.f,!1);this._eventListeners=null}else if(a&&!d&&this.canvas){var e=window.addEventListener?window:document,f=this;d=this._eventListeners={},d.mouseup={t:e,f:function(a){f._handleMouseUp(a)}},d.mousemove={t:e,f:function(a){f._handleMouseMove(a)}},d.dblclick={t:this.canvas,f:function(a){f._handleDoubleClick(a)}},d.mousedown={t:this.canvas,f:function(a){f._handleMouseDown(a)}};for(b in d)c=d[b],c.t.addEventListener(b,c.f,!1)}},b.clone=function(){throw"Stage cannot be cloned."},b.toString=function(){return"[Stage (name="+this.name+")]"},b._getElementRect=function(a){var b;try{b=a.getBoundingClientRect()}catch(c){b={top:a.offsetTop,left:a.offsetLeft,width:a.offsetWidth,height:a.offsetHeight}}var d=(window.pageXOffset||document.scrollLeft||0)-(document.clientLeft||document.body.clientLeft||0),e=(window.pageYOffset||document.scrollTop||0)-(document.clientTop||document.body.clientTop||0),f=window.getComputedStyle?getComputedStyle(a,null):a.currentStyle,g=parseInt(f.paddingLeft)+parseInt(f.borderLeftWidth),h=parseInt(f.paddingTop)+parseInt(f.borderTopWidth),i=parseInt(f.paddingRight)+parseInt(f.borderRightWidth),j=parseInt(f.paddingBottom)+parseInt(f.borderBottomWidth);return{left:b.left+d+g,right:b.right+d-i,top:b.top+e+h,bottom:b.bottom+e-j}},b._getPointerData=function(a){var b=this._pointerData[a];return b||(b=this._pointerData[a]={x:0,y:0}),b},b._handleMouseMove=function(a){a||(a=window.event),this._handlePointerMove(-1,a,a.pageX,a.pageY)},b._handlePointerMove=function(a,b,c,d,e){if((!this._prevStage||void 0!==e)&&this.canvas){var f=this._nextStage,g=this._getPointerData(a),h=g.inBounds;this._updatePointerPosition(a,b,c,d),(h||g.inBounds||this.mouseMoveOutside)&&(-1===a&&g.inBounds==!h&&this._dispatchMouseEvent(this,h?"mouseleave":"mouseenter",!1,a,g,b),this._dispatchMouseEvent(this,"stagemousemove",!1,a,g,b),this._dispatchMouseEvent(g.target,"pressmove",!0,a,g,b)),f&&f._handlePointerMove(a,b,c,d,null)}},b._updatePointerPosition=function(a,b,c,d){var e=this._getElementRect(this.canvas);c-=e.left,d-=e.top;var f=this.canvas.width,g=this.canvas.height;c/=(e.right-e.left)/f,d/=(e.bottom-e.top)/g;var h=this._getPointerData(a);(h.inBounds=c>=0&&d>=0&&f-1>=c&&g-1>=d)?(h.x=c,h.y=d):this.mouseMoveOutside&&(h.x=0>c?0:c>f-1?f-1:c,h.y=0>d?0:d>g-1?g-1:d),h.posEvtObj=b,h.rawX=c,h.rawY=d,(a===this._primaryPointerID||-1===a)&&(this.mouseX=h.x,this.mouseY=h.y,this.mouseInBounds=h.inBounds)},b._handleMouseUp=function(a){this._handlePointerUp(-1,a,!1)},b._handlePointerUp=function(a,b,c,d){var e=this._nextStage,f=this._getPointerData(a);if(!this._prevStage||void 0!==d){var g=null,h=f.target;d||!h&&!e||(g=this._getObjectsUnderPoint(f.x,f.y,null,!0)),f.down&&(this._dispatchMouseEvent(this,"stagemouseup",!1,a,f,b,g),f.down=!1),g==h&&this._dispatchMouseEvent(h,"click",!0,a,f,b),this._dispatchMouseEvent(h,"pressup",!0,a,f,b),c?(a==this._primaryPointerID&&(this._primaryPointerID=null),delete this._pointerData[a]):f.target=null,e&&e._handlePointerUp(a,b,c,d||g&&this)}},b._handleMouseDown=function(a){this._handlePointerDown(-1,a,a.pageX,a.pageY)},b._handlePointerDown=function(a,b,c,d,e){this.preventSelection&&b.preventDefault(),(null==this._primaryPointerID||-1===a)&&(this._primaryPointerID=a),null!=d&&this._updatePointerPosition(a,b,c,d);var f=null,g=this._nextStage,h=this._getPointerData(a);e||(f=h.target=this._getObjectsUnderPoint(h.x,h.y,null,!0)),h.inBounds&&(this._dispatchMouseEvent(this,"stagemousedown",!1,a,h,b,f),h.down=!0),this._dispatchMouseEvent(f,"mousedown",!0,a,h,b),g&&g._handlePointerDown(a,b,c,d,e||f&&this)},b._testMouseOver=function(a,b,c){if(!this._prevStage||void 0!==b){var d=this._nextStage;if(!this._mouseOverIntervalID)return void(d&&d._testMouseOver(a,b,c));var e=this._getPointerData(-1);if(e&&(a||this.mouseX!=this._mouseOverX||this.mouseY!=this._mouseOverY||!this.mouseInBounds)){var f,g,h,i=e.posEvtObj,j=c||i&&i.target==this.canvas,k=null,l=-1,m="";!b&&(a||this.mouseInBounds&&j)&&(k=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,!0),this._mouseOverX=this.mouseX,this._mouseOverY=this.mouseY);var n=this._mouseOverTarget||[],o=n[n.length-1],p=this._mouseOverTarget=[];for(f=k;f;)p.unshift(f),m||(m=f.cursor),f=f.parent;for(this.canvas.style.cursor=m,!b&&c&&(c.canvas.style.cursor=m),g=0,h=p.length;h>g&&p[g]==n[g];g++)l=g;for(o!=k&&this._dispatchMouseEvent(o,"mouseout",!0,-1,e,i,k),g=n.length-1;g>l;g--)this._dispatchMouseEvent(n[g],"rollout",!1,-1,e,i,k);for(g=p.length-1;g>l;g--)this._dispatchMouseEvent(p[g],"rollover",!1,-1,e,i,o);o!=k&&this._dispatchMouseEvent(k,"mouseover",!0,-1,e,i,o),d&&d._testMouseOver(a,b||k&&this,c||j&&this)}}},b._handleDoubleClick=function(a,b){var c=null,d=this._nextStage,e=this._getPointerData(-1);b||(c=this._getObjectsUnderPoint(e.x,e.y,null,!0),this._dispatchMouseEvent(c,"dblclick",!0,-1,e,a)),d&&d._handleDoubleClick(a,b||c&&this)},b._dispatchMouseEvent=function(a,b,c,d,e,f,g){if(a&&(c||a.hasEventListener(b))){var h=new createjs.MouseEvent(b,c,!1,e.x,e.y,f,d,d===this._primaryPointerID||-1===d,e.rawX,e.rawY,g);a.dispatchEvent(h)}},createjs.Stage=createjs.promote(a,"Container")}(),this.createjs=this.createjs||{},function(){function a(a){this.DisplayObject_constructor(),"string"==typeof a?(this.image=document.createElement("img"),this.image.src=a):this.image=a,this.sourceRect=null}var b=createjs.extend(a,createjs.DisplayObject);b.initialize=a,b.isVisible=function(){var a=this.image,b=this.cacheCanvas||a&&(a.naturalWidth||a.getContext||a.readyState>=2);return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&b)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b)||!this.image)return!0;var c=this.image,d=this.sourceRect;if(d){var e=d.x,f=d.y,g=e+d.width,h=f+d.height,i=0,j=0,k=c.width,l=c.height;0>e&&(i-=e,e=0),g>k&&(g=k),0>f&&(j-=f,f=0),h>l&&(h=l),a.drawImage(c,e,f,g-e,h-f,i,j,g-e,h-f)}else a.drawImage(c,0,0);return!0},b.getBounds=function(){var a=this.DisplayObject_getBounds();if(a)return a;var b=this.image,c=this.sourceRect||b,d=b&&(b.naturalWidth||b.getContext||b.readyState>=2);return d?this._rectangle.setValues(0,0,c.width,c.height):null},b.clone=function(){var b=new a(this.image);return this.sourceRect&&(b.sourceRect=this.sourceRect.clone()),this._cloneProps(b),b},b.toString=function(){return"[Bitmap (name="+this.name+")]"},createjs.Bitmap=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.DisplayObject_constructor(),this.currentFrame=0,this.currentAnimation=null,this.paused=!0,this.spriteSheet=a,this.currentAnimationFrame=0,this.framerate=0,this._animation=null,this._currentFrame=null,this._skipAdvance=!1,null!=b&&this.gotoAndPlay(b)}var b=createjs.extend(a,createjs.DisplayObject);b.initialize=a,b.isVisible=function(){var a=this.cacheCanvas||this.spriteSheet.complete;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;this._normalizeFrame();var c=this.spriteSheet.getFrame(0|this._currentFrame);if(!c)return!1;var d=c.rect;return d.width&&d.height&&a.drawImage(c.image,d.x,d.y,d.width,d.height,-c.regX,-c.regY,d.width,d.height),!0},b.play=function(){this.paused=!1},b.stop=function(){this.paused=!0},b.gotoAndPlay=function(a){this.paused=!1,this._skipAdvance=!0,this._goto(a)},b.gotoAndStop=function(a){this.paused=!0,this._goto(a)},b.advance=function(a){var b=this.framerate||this.spriteSheet.framerate,c=b&&null!=a?a/(1e3/b):1;this._normalizeFrame(c)},b.getBounds=function(){return this.DisplayObject_getBounds()||this.spriteSheet.getFrameBounds(this.currentFrame,this._rectangle)},b.clone=function(){return this._cloneProps(new a(this.spriteSheet))},b.toString=function(){return"[Sprite (name="+this.name+")]"},b._cloneProps=function(a){return this.DisplayObject__cloneProps(a),a.currentFrame=this.currentFrame,a.currentAnimation=this.currentAnimation,a.paused=this.paused,a.currentAnimationFrame=this.currentAnimationFrame,a.framerate=this.framerate,a._animation=this._animation,a._currentFrame=this._currentFrame,a._skipAdvance=this._skipAdvance,a},b._tick=function(a){this.paused||(this._skipAdvance||this.advance(a&&a.delta),this._skipAdvance=!1),this.DisplayObject__tick(a)},b._normalizeFrame=function(a){a=a||0;var b,c=this._animation,d=this.paused,e=this._currentFrame;if(c){var f=c.speed||1,g=this.currentAnimationFrame;if(b=c.frames.length,g+a*f>=b){var h=c.next;if(this._dispatchAnimationEnd(c,e,d,h,b-1))return;if(h)return this._goto(h,a-(b-g)/f);this.paused=!0,g=c.frames.length-1}else g+=a*f;this.currentAnimationFrame=g,this._currentFrame=c.frames[0|g]}else if(e=this._currentFrame+=a,b=this.spriteSheet.getNumFrames(),e>=b&&b>0&&!this._dispatchAnimationEnd(c,e,d,b-1)&&(this._currentFrame-=b)>=b)return this._normalizeFrame();e=0|this._currentFrame,this.currentFrame!=e&&(this.currentFrame=e,this.dispatchEvent("change"))},b._dispatchAnimationEnd=function(a,b,c,d,e){var f=a?a.name:null;if(this.hasEventListener("animationend")){var g=new createjs.Event("animationend");g.name=f,g.next=d,this.dispatchEvent(g)}var h=this._animation!=a||this._currentFrame!=b;return h||c||!this.paused||(this.currentAnimationFrame=e,h=!0),h},b._goto=function(a,b){if(this.currentAnimationFrame=0,isNaN(a)){var c=this.spriteSheet.getAnimation(a);c&&(this._animation=c,this.currentAnimation=a,this._normalizeFrame(b))}else this.currentAnimation=this._animation=null,this._currentFrame=a,this._normalizeFrame()},createjs.Sprite=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.DisplayObject_constructor(),this.graphics=a?a:new createjs.Graphics}var b=createjs.extend(a,createjs.DisplayObject);b.isVisible=function(){var a=this.cacheCanvas||this.graphics&&!this.graphics.isEmpty();return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){return this.DisplayObject_draw(a,b)?!0:(this.graphics.draw(a,this),!0)},b.clone=function(b){var c=b&&this.graphics?this.graphics.clone():this.graphics;return this._cloneProps(new a(c))},b.toString=function(){return"[Shape (name="+this.name+")]"},createjs.Shape=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.DisplayObject_constructor(),this.text=a,this.font=b,this.color=c,this.textAlign="left",this.textBaseline="top",this.maxWidth=null,this.outline=0,this.lineHeight=0,this.lineWidth=null}var b=createjs.extend(a,createjs.DisplayObject),c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c.getContext&&(a._workingContext=c.getContext("2d"),c.width=c.height=1),a.H_OFFSETS={start:0,left:0,center:-.5,end:-1,right:-1},a.V_OFFSETS={top:0,hanging:-.01,middle:-.4,alphabetic:-.8,ideographic:-.85,bottom:-1},b.isVisible=function(){var a=this.cacheCanvas||null!=this.text&&""!==this.text;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;var c=this.color||"#000";return this.outline?(a.strokeStyle=c,a.lineWidth=1*this.outline):a.fillStyle=c,this._drawText(this._prepContext(a)),!0},b.getMeasuredWidth=function(){return this._getMeasuredWidth(this.text)},b.getMeasuredLineHeight=function(){return 1.2*this._getMeasuredWidth("M")},b.getMeasuredHeight=function(){return this._drawText(null,{}).height},b.getBounds=function(){var b=this.DisplayObject_getBounds();if(b)return b;if(null==this.text||""===this.text)return null;var c=this._drawText(null,{}),d=this.maxWidth&&this.maxWidth<c.width?this.maxWidth:c.width,e=d*a.H_OFFSETS[this.textAlign||"left"],f=this.lineHeight||this.getMeasuredLineHeight(),g=f*a.V_OFFSETS[this.textBaseline||"top"];return this._rectangle.setValues(e,g,d,c.height)},b.getMetrics=function(){var b={lines:[]};return b.lineHeight=this.lineHeight||this.getMeasuredLineHeight(),b.vOffset=b.lineHeight*a.V_OFFSETS[this.textBaseline||"top"],this._drawText(null,b,b.lines)},b.clone=function(){return this._cloneProps(new a(this.text,this.font,this.color))},b.toString=function(){return"[Text (text="+(this.text.length>20?this.text.substr(0,17)+"...":this.text)+")]"},b._cloneProps=function(a){return this.DisplayObject__cloneProps(a),a.textAlign=this.textAlign,a.textBaseline=this.textBaseline,a.maxWidth=this.maxWidth,a.outline=this.outline,a.lineHeight=this.lineHeight,a.lineWidth=this.lineWidth,a},b._prepContext=function(a){return a.font=this.font||"10px sans-serif",a.textAlign=this.textAlign||"left",a.textBaseline=this.textBaseline||"top",a},b._drawText=function(b,c,d){var e=!!b;e||(b=a._workingContext,b.save(),this._prepContext(b));for(var f=this.lineHeight||this.getMeasuredLineHeight(),g=0,h=0,i=String(this.text).split(/(?:\r\n|\r|\n)/),j=0,k=i.length;k>j;j++){var l=i[j],m=null;if(null!=this.lineWidth&&(m=b.measureText(l).width)>this.lineWidth){var n=l.split(/(\s)/);l=n[0],m=b.measureText(l).width;for(var o=1,p=n.length;p>o;o+=2){var q=b.measureText(n[o]+n[o+1]).width;m+q>this.lineWidth?(e&&this._drawTextLine(b,l,h*f),d&&d.push(l),m>g&&(g=m),l=n[o+1],m=b.measureText(l).width,h++):(l+=n[o]+n[o+1],m+=q)}}e&&this._drawTextLine(b,l,h*f),d&&d.push(l),c&&null==m&&(m=b.measureText(l).width),m>g&&(g=m),h++}return c&&(c.width=g,c.height=h*f),e||b.restore(),c},b._drawTextLine=function(a,b,c){this.outline?a.strokeText(b,0,c,this.maxWidth||65535):a.fillText(b,0,c,this.maxWidth||65535)},b._getMeasuredWidth=function(b){var c=a._workingContext;c.save();var d=this._prepContext(c).measureText(b).width;return c.restore(),d},createjs.Text=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.Container_constructor(),this.text=a||"",this.spriteSheet=b,this.lineHeight=0,this.letterSpacing=0,this.spaceWidth=0,this._oldProps={text:0,spriteSheet:0,lineHeight:0,letterSpacing:0,spaceWidth:0}}var b=createjs.extend(a,createjs.Container);a.maxPoolSize=100,a._spritePool=[],b.draw=function(a,b){this.DisplayObject_draw(a,b)||(this._updateText(),this.Container_draw(a,b))},b.getBounds=function(){return this._updateText(),this.Container_getBounds()},b.isVisible=function(){var a=this.cacheCanvas||this.spriteSheet&&this.spriteSheet.complete&&this.text;return!!(this.visible&&this.alpha>0&&0!==this.scaleX&&0!==this.scaleY&&a)},b.clone=function(){return this._cloneProps(new a(this.text,this.spriteSheet))},b.addChild=b.addChildAt=b.removeChild=b.removeChildAt=b.removeAllChildren=function(){},b._cloneProps=function(a){return this.Container__cloneProps(a),a.lineHeight=this.lineHeight,a.letterSpacing=this.letterSpacing,a.spaceWidth=this.spaceWidth,a},b._getFrameIndex=function(a,b){var c,d=b.getAnimation(a);return d||(a!=(c=a.toUpperCase())||a!=(c=a.toLowerCase())||(c=null),c&&(d=b.getAnimation(c))),d&&d.frames[0]},b._getFrame=function(a,b){var c=this._getFrameIndex(a,b);return null==c?c:b.getFrame(c)},b._getLineHeight=function(a){var b=this._getFrame("1",a)||this._getFrame("T",a)||this._getFrame("L",a)||a.getFrame(0);return b?b.rect.height:1},b._getSpaceWidth=function(a){var b=this._getFrame("1",a)||this._getFrame("l",a)||this._getFrame("e",a)||this._getFrame("a",a)||a.getFrame(0);return b?b.rect.width:1},b._updateText=function(){var b,c=0,d=0,e=this._oldProps,f=!1,g=this.spaceWidth,h=this.lineHeight,i=this.spriteSheet,j=a._spritePool,k=this.children,l=0,m=k.length;for(var n in e)e[n]!=this[n]&&(e[n]=this[n],f=!0);if(f){var o=!!this._getFrame(" ",i);o||g||(g=this._getSpaceWidth(i)),h||(h=this._getLineHeight(i));for(var p=0,q=this.text.length;q>p;p++){var r=this.text.charAt(p);if(" "!=r||o)if("\n"!=r&&"\r"!=r){var s=this._getFrameIndex(r,i);null!=s&&(m>l?b=k[l]:(k.push(b=j.length?j.pop():new createjs.Sprite),b.parent=this,m++),b.spriteSheet=i,b.gotoAndStop(s),b.x=c,b.y=d,l++,c+=b.getBounds().width+this.letterSpacing)}else"\r"==r&&"\n"==this.text.charAt(p+1)&&p++,c=0,d+=h;else c+=g}for(;m>l;)j.push(b=k.pop()),b.parent=null,m--;j.length>a.maxPoolSize&&(j.length=a.maxPoolSize)}},createjs.BitmapText=createjs.promote(a,"Container")}(),this.createjs=this.createjs||{},function(){"use strict";function a(b,c,d,e){this.Container_constructor(),!a.inited&&a.init(),this.mode=b||a.INDEPENDENT,this.startPosition=c||0,this.loop=d,this.currentFrame=0,this.timeline=new createjs.Timeline(null,e,{paused:!0,position:c,useTicks:!0}),this.paused=!1,this.actionsEnabled=!0,this.autoReset=!0,this.frameBounds=this.frameBounds||null,this.framerate=null,this._synchOffset=0,this._prevPos=-1,this._prevPosition=0,this._t=0,this._managed={}}function b(){throw"MovieClipPlugin cannot be instantiated."}var c=createjs.extend(a,createjs.Container);a.INDEPENDENT="independent",a.SINGLE_FRAME="single",a.SYNCHED="synched",a.inited=!1,a.init=function(){a.inited||(b.install(),a.inited=!0)},c.getLabels=function(){return this.timeline.getLabels()},c.getCurrentLabel=function(){return this._updateTimeline(),this.timeline.getCurrentLabel()},c.getDuration=function(){return this.timeline.duration;
};try{Object.defineProperties(c,{labels:{get:c.getLabels},currentLabel:{get:c.getCurrentLabel},totalFrames:{get:c.getDuration},duration:{get:c.getDuration}})}catch(d){}c.initialize=a,c.isVisible=function(){return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY)},c.draw=function(a,b){return this.DisplayObject_draw(a,b)?!0:(this._updateTimeline(),this.Container_draw(a,b),!0)},c.play=function(){this.paused=!1},c.stop=function(){this.paused=!0},c.gotoAndPlay=function(a){this.paused=!1,this._goto(a)},c.gotoAndStop=function(a){this.paused=!0,this._goto(a)},c.advance=function(b){var c=a.INDEPENDENT;if(this.mode==c){for(var d=this,e=d.framerate;(d=d.parent)&&null==e;)d.mode==c&&(e=d._framerate);this._framerate=e;var f=null!=e&&-1!=e&&null!=b?b/(1e3/e)+this._t:1,g=0|f;for(this._t=f-g;!this.paused&&g--;)this._prevPosition=this._prevPos<0?0:this._prevPosition+1,this._updateTimeline()}},c.clone=function(){throw"MovieClip cannot be cloned."},c.toString=function(){return"[MovieClip (name="+this.name+")]"},c._tick=function(a){this.advance(a&&a.delta),this.Container__tick(a)},c._goto=function(a){var b=this.timeline.resolve(a);null!=b&&(-1==this._prevPos&&(this._prevPos=NaN),this._prevPosition=b,this._t=0,this._updateTimeline())},c._reset=function(){this._prevPos=-1,this._t=this.currentFrame=0,this.paused=!1},c._updateTimeline=function(){var b=this.timeline,c=this.mode!=a.INDEPENDENT;b.loop=null==this.loop?!0:this.loop;var d=c?this.startPosition+(this.mode==a.SINGLE_FRAME?0:this._synchOffset):this._prevPos<0?0:this._prevPosition,e=c||!this.actionsEnabled?createjs.Tween.NONE:null;if(this.currentFrame=b._calcPosition(d),b.setPosition(d,e),this._prevPosition=b._prevPosition,this._prevPos!=b._prevPos){this.currentFrame=this._prevPos=b._prevPos;for(var f in this._managed)this._managed[f]=1;for(var g=b._tweens,h=0,i=g.length;i>h;h++){var j=g[h],k=j._target;if(k!=this&&!j.passive){var l=j._stepPosition;k instanceof createjs.DisplayObject?this._addManagedChild(k,l):this._setState(k.state,l)}}var m=this.children;for(h=m.length-1;h>=0;h--){var n=m[h].id;1==this._managed[n]&&(this.removeChildAt(h),delete this._managed[n])}}},c._setState=function(a,b){if(a)for(var c=a.length-1;c>=0;c--){var d=a[c],e=d.t,f=d.p;for(var g in f)e[g]=f[g];this._addManagedChild(e,b)}},c._addManagedChild=function(b,c){b._off||(this.addChildAt(b,0),b instanceof a&&(b._synchOffset=c,b.mode==a.INDEPENDENT&&b.autoReset&&!this._managed[b.id]&&b._reset()),this._managed[b.id]=2)},c._getBounds=function(a,b){var c=this.DisplayObject_getBounds();return c||(this._updateTimeline(),this.frameBounds&&(c=this._rectangle.copy(this.frameBounds[this.currentFrame]))),c?this._transformBounds(c,a,b):this.Container__getBounds(a,b)},createjs.MovieClip=createjs.promote(a,"Container"),b.priority=100,b.install=function(){createjs.Tween.installPlugin(b,["startPosition"])},b.init=function(a,b,c){return c},b.step=function(){},b.tween=function(b,c,d,e,f,g,h,i){return b.target instanceof a?1==g?f[c]:e[c]:d}}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"SpriteSheetUtils cannot be instantiated"}var b=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");b.getContext&&(a._workingCanvas=b,a._workingContext=b.getContext("2d"),b.width=b.height=1),a.addFlippedFrames=function(b,c,d,e){if(c||d||e){var f=0;c&&a._flip(b,++f,!0,!1),d&&a._flip(b,++f,!1,!0),e&&a._flip(b,++f,!0,!0)}},a.extractFrame=function(b,c){isNaN(c)&&(c=b.getAnimation(c).frames[0]);var d=b.getFrame(c);if(!d)return null;var e=d.rect,f=a._workingCanvas;f.width=e.width,f.height=e.height,a._workingContext.drawImage(d.image,e.x,e.y,e.width,e.height,0,0,e.width,e.height);var g=document.createElement("img");return g.src=f.toDataURL("image/png"),g},a.mergeAlpha=function(a,b,c){c||(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")),c.width=Math.max(b.width,a.width),c.height=Math.max(b.height,a.height);var d=c.getContext("2d");return d.save(),d.drawImage(a,0,0),d.globalCompositeOperation="destination-in",d.drawImage(b,0,0),d.restore(),c},a._flip=function(b,c,d,e){for(var f=b._images,g=a._workingCanvas,h=a._workingContext,i=f.length/c,j=0;i>j;j++){var k=f[j];k.__tmp=j,h.setTransform(1,0,0,1,0,0),h.clearRect(0,0,g.width+1,g.height+1),g.width=k.width,g.height=k.height,h.setTransform(d?-1:1,0,0,e?-1:1,d?k.width:0,e?k.height:0),h.drawImage(k,0,0);var l=document.createElement("img");l.src=g.toDataURL("image/png"),l.width=k.width,l.height=k.height,f.push(l)}var m=b._frames,n=m.length/c;for(j=0;n>j;j++){k=m[j];var o=k.rect.clone();l=f[k.image.__tmp+i*c];var p={image:l,rect:o,regX:k.regX,regY:k.regY};d&&(o.x=l.width-o.x-o.width,p.regX=o.width-k.regX),e&&(o.y=l.height-o.y-o.height,p.regY=o.height-k.regY),m.push(p)}var q="_"+(d?"h":"")+(e?"v":""),r=b._animations,s=b._data,t=r.length/c;for(j=0;t>j;j++){var u=r[j];k=s[u];var v={name:u+q,speed:k.speed,next:k.next,frames:[]};k.next&&(v.next+=q),m=k.frames;for(var w=0,x=m.length;x>w;w++)v.frames.push(m[w]+n*c);s[v.name]=v,r.push(v.name)}},createjs.SpriteSheetUtils=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.EventDispatcher_constructor(),this.maxWidth=2048,this.maxHeight=2048,this.spriteSheet=null,this.scale=1,this.padding=1,this.timeSlice=.3,this.progress=-1,this.framerate=a||0,this._frames=[],this._animations={},this._data=null,this._nextFrameIndex=0,this._index=0,this._timerID=null,this._scale=1}var b=createjs.extend(a,createjs.EventDispatcher);a.ERR_DIMENSIONS="frame dimensions exceed max spritesheet dimensions",a.ERR_RUNNING="a build is already running",b.addFrame=function(b,c,d,e,f){if(this._data)throw a.ERR_RUNNING;var g=c||b.bounds||b.nominalBounds;return!g&&b.getBounds&&(g=b.getBounds()),g?(d=d||1,this._frames.push({source:b,sourceRect:g,scale:d,funct:e,data:f,index:this._frames.length,height:g.height*d})-1):null},b.addAnimation=function(b,c,d,e){if(this._data)throw a.ERR_RUNNING;this._animations[b]={frames:c,next:d,speed:e}},b.addMovieClip=function(b,c,d,e,f,g){if(this._data)throw a.ERR_RUNNING;var h=b.frameBounds,i=c||b.bounds||b.nominalBounds;if(!i&&b.getBounds&&(i=b.getBounds()),i||h){var j,k,l=this._frames.length,m=b.timeline.duration;for(j=0;m>j;j++){var n=h&&h[j]?h[j]:i;this.addFrame(b,n,d,this._setupMovieClipFrame,{i:j,f:e,d:f})}var o=b.timeline._labels,p=[];for(var q in o)p.push({index:o[q],label:q});if(p.length)for(p.sort(function(a,b){return a.index-b.index}),j=0,k=p.length;k>j;j++){for(var r=p[j].label,s=l+p[j].index,t=l+(j==k-1?m:p[j+1].index),u=[],v=s;t>v;v++)u.push(v);(!g||(r=g(r,b,s,t)))&&this.addAnimation(r,u,!0)}}},b.build=function(){if(this._data)throw a.ERR_RUNNING;for(this._startBuild();this._drawNext(););return this._endBuild(),this.spriteSheet},b.buildAsync=function(b){if(this._data)throw a.ERR_RUNNING;this.timeSlice=b,this._startBuild();var c=this;this._timerID=setTimeout(function(){c._run()},50-50*Math.max(.01,Math.min(.99,this.timeSlice||.3)))},b.stopAsync=function(){clearTimeout(this._timerID),this._data=null},b.clone=function(){throw"SpriteSheetBuilder cannot be cloned."},b.toString=function(){return"[SpriteSheetBuilder]"},b._startBuild=function(){var b=this.padding||0;this.progress=0,this.spriteSheet=null,this._index=0,this._scale=this.scale;var c=[];this._data={images:[],frames:c,framerate:this.framerate,animations:this._animations};var d=this._frames.slice();if(d.sort(function(a,b){return a.height<=b.height?-1:1}),d[d.length-1].height+2*b>this.maxHeight)throw a.ERR_DIMENSIONS;for(var e=0,f=0,g=0;d.length;){var h=this._fillRow(d,e,g,c,b);if(h.w>f&&(f=h.w),e+=h.h,!h.h||!d.length){var i=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");i.width=this._getSize(f,this.maxWidth),i.height=this._getSize(e,this.maxHeight),this._data.images[g]=i,h.h||(f=e=0,g++)}}},b._setupMovieClipFrame=function(a,b){var c=a.actionsEnabled;a.actionsEnabled=!1,a.gotoAndStop(b.i),a.actionsEnabled=c,b.f&&b.f(a,b.d,b.i)},b._getSize=function(a,b){for(var c=4;Math.pow(2,++c)<a;);return Math.min(b,Math.pow(2,c))},b._fillRow=function(b,c,d,e,f){var g=this.maxWidth,h=this.maxHeight;c+=f;for(var i=h-c,j=f,k=0,l=b.length-1;l>=0;l--){var m=b[l],n=this._scale*m.scale,o=m.sourceRect,p=m.source,q=Math.floor(n*o.x-f),r=Math.floor(n*o.y-f),s=Math.ceil(n*o.height+2*f),t=Math.ceil(n*o.width+2*f);if(t>g)throw a.ERR_DIMENSIONS;s>i||j+t>g||(m.img=d,m.rect=new createjs.Rectangle(j,c,t,s),k=k||s,b.splice(l,1),e[m.index]=[j,c,t,s,d,Math.round(-q+n*p.regX-f),Math.round(-r+n*p.regY-f)],j+=t)}return{w:j,h:k}},b._endBuild=function(){this.spriteSheet=new createjs.SpriteSheet(this._data),this._data=null,this.progress=1,this.dispatchEvent("complete")},b._run=function(){for(var a=50*Math.max(.01,Math.min(.99,this.timeSlice||.3)),b=(new Date).getTime()+a,c=!1;b>(new Date).getTime();)if(!this._drawNext()){c=!0;break}if(c)this._endBuild();else{var d=this;this._timerID=setTimeout(function(){d._run()},50-a)}var e=this.progress=this._index/this._frames.length;if(this.hasEventListener("progress")){var f=new createjs.Event("progress");f.progress=e,this.dispatchEvent(f)}},b._drawNext=function(){var a=this._frames[this._index],b=a.scale*this._scale,c=a.rect,d=a.sourceRect,e=this._data.images[a.img],f=e.getContext("2d");return a.funct&&a.funct(a.source,a.data),f.save(),f.beginPath(),f.rect(c.x,c.y,c.width,c.height),f.clip(),f.translate(Math.ceil(c.x-d.x*b),Math.ceil(c.y-d.y*b)),f.scale(b,b),a.source.draw(f),f.restore(),++this._index<this._frames.length},createjs.SpriteSheetBuilder=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.DisplayObject_constructor(),"string"==typeof a&&(a=document.getElementById(a)),this.mouseEnabled=!1;var b=a.style;b.position="absolute",b.transformOrigin=b.WebkitTransformOrigin=b.msTransformOrigin=b.MozTransformOrigin=b.OTransformOrigin="0% 0%",this.htmlElement=a,this._oldProps=null}var b=createjs.extend(a,createjs.DisplayObject);b.isVisible=function(){return null!=this.htmlElement},b.draw=function(a,b){return!0},b.cache=function(){},b.uncache=function(){},b.updateCache=function(){},b.hitTest=function(){},b.localToGlobal=function(){},b.globalToLocal=function(){},b.localToLocal=function(){},b.clone=function(){throw"DOMElement cannot be cloned."},b.toString=function(){return"[DOMElement (name="+this.name+")]"},b._tick=function(a){var b=this.getStage();b&&b.on("drawend",this._handleDrawEnd,this,!0),this.DisplayObject__tick(a)},b._handleDrawEnd=function(a){var b=this.htmlElement;if(b){var c=b.style,d=this.getConcatenatedDisplayProps(this._props),e=d.matrix,f=d.visible?"visible":"hidden";if(f!=c.visibility&&(c.visibility=f),d.visible){var g=this._oldProps,h=g&&g.matrix,i=1e4;if(!h||!h.equals(e)){var j="matrix("+(e.a*i|0)/i+","+(e.b*i|0)/i+","+(e.c*i|0)/i+","+(e.d*i|0)/i+","+(e.tx+.5|0);c.transform=c.WebkitTransform=c.OTransform=c.msTransform=j+","+(e.ty+.5|0)+")",c.MozTransform=j+"px,"+(e.ty+.5|0)+"px)",g||(g=this._oldProps=new createjs.DisplayProps(!0,NaN)),g.matrix.copy(e)}g.alpha!=d.alpha&&(c.opacity=""+(d.alpha*i|0)/i,g.alpha=d.alpha)}}},createjs.DOMElement=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){}var b=a.prototype;b.getBounds=function(a){return a},b.applyFilter=function(a,b,c,d,e,f,g,h){f=f||a,null==g&&(g=b),null==h&&(h=c);try{var i=a.getImageData(b,c,d,e)}catch(j){return!1}return this._applyFilter(i)?(f.putImageData(i,g,h),!0):!1},b.toString=function(){return"[Filter]"},b.clone=function(){return new a},b._applyFilter=function(a){return!0},createjs.Filter=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){(isNaN(a)||0>a)&&(a=0),(isNaN(b)||0>b)&&(b=0),(isNaN(c)||1>c)&&(c=1),this.blurX=0|a,this.blurY=0|b,this.quality=0|c}var b=createjs.extend(a,createjs.Filter);a.MUL_TABLE=[1,171,205,293,57,373,79,137,241,27,391,357,41,19,283,265,497,469,443,421,25,191,365,349,335,161,155,149,9,278,269,261,505,245,475,231,449,437,213,415,405,395,193,377,369,361,353,345,169,331,325,319,313,307,301,37,145,285,281,69,271,267,263,259,509,501,493,243,479,118,465,459,113,446,55,435,429,423,209,413,51,403,199,393,97,3,379,375,371,367,363,359,355,351,347,43,85,337,333,165,327,323,5,317,157,311,77,305,303,75,297,294,73,289,287,71,141,279,277,275,68,135,67,133,33,262,260,129,511,507,503,499,495,491,61,121,481,477,237,235,467,232,115,457,227,451,7,445,221,439,218,433,215,427,425,211,419,417,207,411,409,203,202,401,399,396,197,49,389,387,385,383,95,189,47,187,93,185,23,183,91,181,45,179,89,177,11,175,87,173,345,343,341,339,337,21,167,83,331,329,327,163,81,323,321,319,159,79,315,313,39,155,309,307,153,305,303,151,75,299,149,37,295,147,73,291,145,289,287,143,285,71,141,281,35,279,139,69,275,137,273,17,271,135,269,267,133,265,33,263,131,261,130,259,129,257,1],a.SHG_TABLE=[0,9,10,11,9,12,10,11,12,9,13,13,10,9,13,13,14,14,14,14,10,13,14,14,14,13,13,13,9,14,14,14,15,14,15,14,15,15,14,15,15,15,14,15,15,15,15,15,14,15,15,15,15,15,15,12,14,15,15,13,15,15,15,15,16,16,16,15,16,14,16,16,14,16,13,16,16,16,15,16,13,16,15,16,14,9,16,16,16,16,16,16,16,16,16,13,14,16,16,15,16,16,10,16,15,16,14,16,16,14,16,16,14,16,16,14,15,16,16,16,14,15,14,15,13,16,16,15,17,17,17,17,17,17,14,15,17,17,16,16,17,16,15,17,16,17,11,17,16,17,16,17,16,17,17,16,17,17,16,17,17,16,16,17,17,17,16,14,17,17,17,17,15,16,14,16,15,16,13,16,15,16,14,16,15,16,12,16,15,16,17,17,17,17,17,13,16,15,17,17,17,16,15,17,17,17,16,15,17,17,14,16,17,17,16,17,17,16,15,17,16,14,17,16,15,17,16,17,17,16,17,15,16,17,14,17,16,15,17,16,17,13,17,16,17,17,16,17,14,17,16,17,16,17,16,17,9],b.getBounds=function(a){var b=0|this.blurX,c=0|this.blurY;if(0>=b&&0>=c)return a;var d=Math.pow(this.quality,.2);return(a||new createjs.Rectangle).pad(b*d+1,c*d+1,b*d+1,c*d+1)},b.clone=function(){return new a(this.blurX,this.blurY,this.quality)},b.toString=function(){return"[BlurFilter]"},b._applyFilter=function(b){var c=this.blurX>>1;if(isNaN(c)||0>c)return!1;var d=this.blurY>>1;if(isNaN(d)||0>d)return!1;if(0==c&&0==d)return!1;var e=this.quality;(isNaN(e)||1>e)&&(e=1),e|=0,e>3&&(e=3),1>e&&(e=1);var f=b.data,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=c+c+1|0,w=d+d+1|0,x=0|b.width,y=0|b.height,z=x-1|0,A=y-1|0,B=c+1|0,C=d+1|0,D={r:0,b:0,g:0,a:0},E=D;for(i=1;v>i;i++)E=E.n={r:0,b:0,g:0,a:0};E.n=D;var F={r:0,b:0,g:0,a:0},G=F;for(i=1;w>i;i++)G=G.n={r:0,b:0,g:0,a:0};G.n=F;for(var H=null,I=0|a.MUL_TABLE[c],J=0|a.SHG_TABLE[c],K=0|a.MUL_TABLE[d],L=0|a.SHG_TABLE[d];e-->0;){m=l=0;var M=I,N=J;for(h=y;--h>-1;){for(n=B*(r=f[0|l]),o=B*(s=f[l+1|0]),p=B*(t=f[l+2|0]),q=B*(u=f[l+3|0]),E=D,i=B;--i>-1;)E.r=r,E.g=s,E.b=t,E.a=u,E=E.n;for(i=1;B>i;i++)j=l+((i>z?z:i)<<2)|0,n+=E.r=f[j],o+=E.g=f[j+1],p+=E.b=f[j+2],q+=E.a=f[j+3],E=E.n;for(H=D,g=0;x>g;g++)f[l++]=n*M>>>N,f[l++]=o*M>>>N,f[l++]=p*M>>>N,f[l++]=q*M>>>N,j=m+((j=g+c+1)<z?j:z)<<2,n-=H.r-(H.r=f[j]),o-=H.g-(H.g=f[j+1]),p-=H.b-(H.b=f[j+2]),q-=H.a-(H.a=f[j+3]),H=H.n;m+=x}for(M=K,N=L,g=0;x>g;g++){for(l=g<<2|0,n=C*(r=f[l])|0,o=C*(s=f[l+1|0])|0,p=C*(t=f[l+2|0])|0,q=C*(u=f[l+3|0])|0,G=F,i=0;C>i;i++)G.r=r,G.g=s,G.b=t,G.a=u,G=G.n;for(k=x,i=1;d>=i;i++)l=k+g<<2,n+=G.r=f[l],o+=G.g=f[l+1],p+=G.b=f[l+2],q+=G.a=f[l+3],G=G.n,A>i&&(k+=x);if(l=g,H=F,e>0)for(h=0;y>h;h++)j=l<<2,f[j+3]=u=q*M>>>N,u>0?(f[j]=n*M>>>N,f[j+1]=o*M>>>N,f[j+2]=p*M>>>N):f[j]=f[j+1]=f[j+2]=0,j=g+((j=h+C)<A?j:A)*x<<2,n-=H.r-(H.r=f[j]),o-=H.g-(H.g=f[j+1]),p-=H.b-(H.b=f[j+2]),q-=H.a-(H.a=f[j+3]),H=H.n,l+=x;else for(h=0;y>h;h++)j=l<<2,f[j+3]=u=q*M>>>N,u>0?(u=255/u,f[j]=(n*M>>>N)*u,f[j+1]=(o*M>>>N)*u,f[j+2]=(p*M>>>N)*u):f[j]=f[j+1]=f[j+2]=0,j=g+((j=h+C)<A?j:A)*x<<2,n-=H.r-(H.r=f[j]),o-=H.g-(H.g=f[j+1]),p-=H.b-(H.b=f[j+2]),q-=H.a-(H.a=f[j+3]),H=H.n,l+=x}}return!0},createjs.BlurFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.alphaMap=a,this._alphaMap=null,this._mapData=null}var b=createjs.extend(a,createjs.Filter);b.clone=function(){var b=new a(this.alphaMap);return b._alphaMap=this._alphaMap,b._mapData=this._mapData,b},b.toString=function(){return"[AlphaMapFilter]"},b._applyFilter=function(a){if(!this.alphaMap)return!0;if(!this._prepAlphaMap())return!1;for(var b=a.data,c=this._mapData,d=0,e=b.length;e>d;d+=4)b[d+3]=c[d]||0;return!0},b._prepAlphaMap=function(){if(!this.alphaMap)return!1;if(this.alphaMap==this._alphaMap&&this._mapData)return!0;this._mapData=null;var a,b=this._alphaMap=this.alphaMap,c=b;b instanceof HTMLCanvasElement?a=c.getContext("2d"):(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"),c.width=b.width,c.height=b.height,a=c.getContext("2d"),a.drawImage(b,0,0));try{var d=a.getImageData(0,0,b.width,b.height)}catch(e){return!1}return this._mapData=d.data,!0},createjs.AlphaMapFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.mask=a}var b=createjs.extend(a,createjs.Filter);b.applyFilter=function(a,b,c,d,e,f,g,h){return this.mask?(f=f||a,null==g&&(g=b),null==h&&(h=c),f.save(),a!=f?!1:(f.globalCompositeOperation="destination-in",f.drawImage(this.mask,g,h),f.restore(),!0)):!0},b.clone=function(){return new a(this.mask)},b.toString=function(){return"[AlphaMaskFilter]"},createjs.AlphaMaskFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f,g,h){this.redMultiplier=null!=a?a:1,this.greenMultiplier=null!=b?b:1,this.blueMultiplier=null!=c?c:1,this.alphaMultiplier=null!=d?d:1,this.redOffset=e||0,this.greenOffset=f||0,this.blueOffset=g||0,this.alphaOffset=h||0}var b=createjs.extend(a,createjs.Filter);b.toString=function(){return"[ColorFilter]"},b.clone=function(){return new a(this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset)},b._applyFilter=function(a){for(var b=a.data,c=b.length,d=0;c>d;d+=4)b[d]=b[d]*this.redMultiplier+this.redOffset,b[d+1]=b[d+1]*this.greenMultiplier+this.greenOffset,b[d+2]=b[d+2]*this.blueMultiplier+this.blueOffset,b[d+3]=b[d+3]*this.alphaMultiplier+this.alphaOffset;return!0},createjs.ColorFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.setColor(a,b,c,d)}var b=a.prototype;a.DELTA_INDEX=[0,.01,.02,.04,.05,.06,.07,.08,.1,.11,.12,.14,.15,.16,.17,.18,.2,.21,.22,.24,.25,.27,.28,.3,.32,.34,.36,.38,.4,.42,.44,.46,.48,.5,.53,.56,.59,.62,.65,.68,.71,.74,.77,.8,.83,.86,.89,.92,.95,.98,1,1.06,1.12,1.18,1.24,1.3,1.36,1.42,1.48,1.54,1.6,1.66,1.72,1.78,1.84,1.9,1.96,2,2.12,2.25,2.37,2.5,2.62,2.75,2.87,3,3.2,3.4,3.6,3.8,4,4.3,4.7,4.9,5,5.5,6,6.5,6.8,7,7.3,7.5,7.8,8,8.4,8.7,9,9.4,9.6,9.8,10],a.IDENTITY_MATRIX=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],a.LENGTH=a.IDENTITY_MATRIX.length,b.setColor=function(a,b,c,d){return this.reset().adjustColor(a,b,c,d)},b.reset=function(){return this.copy(a.IDENTITY_MATRIX)},b.adjustColor=function(a,b,c,d){return this.adjustHue(d),this.adjustContrast(b),this.adjustBrightness(a),this.adjustSaturation(c)},b.adjustBrightness=function(a){return 0==a||isNaN(a)?this:(a=this._cleanValue(a,255),this._multiplyMatrix([1,0,0,0,a,0,1,0,0,a,0,0,1,0,a,0,0,0,1,0,0,0,0,0,1]),this)},b.adjustContrast=function(b){if(0==b||isNaN(b))return this;b=this._cleanValue(b,100);var c;return 0>b?c=127+b/100*127:(c=b%1,c=0==c?a.DELTA_INDEX[b]:a.DELTA_INDEX[b<<0]*(1-c)+a.DELTA_INDEX[(b<<0)+1]*c,c=127*c+127),this._multiplyMatrix([c/127,0,0,0,.5*(127-c),0,c/127,0,0,.5*(127-c),0,0,c/127,0,.5*(127-c),0,0,0,1,0,0,0,0,0,1]),this},b.adjustSaturation=function(a){if(0==a||isNaN(a))return this;a=this._cleanValue(a,100);var b=1+(a>0?3*a/100:a/100),c=.3086,d=.6094,e=.082;return this._multiplyMatrix([c*(1-b)+b,d*(1-b),e*(1-b),0,0,c*(1-b),d*(1-b)+b,e*(1-b),0,0,c*(1-b),d*(1-b),e*(1-b)+b,0,0,0,0,0,1,0,0,0,0,0,1]),this},b.adjustHue=function(a){if(0==a||isNaN(a))return this;a=this._cleanValue(a,180)/180*Math.PI;var b=Math.cos(a),c=Math.sin(a),d=.213,e=.715,f=.072;return this._multiplyMatrix([d+b*(1-d)+c*-d,e+b*-e+c*-e,f+b*-f+c*(1-f),0,0,d+b*-d+.143*c,e+b*(1-e)+.14*c,f+b*-f+c*-.283,0,0,d+b*-d+c*-(1-d),e+b*-e+c*e,f+b*(1-f)+c*f,0,0,0,0,0,1,0,0,0,0,0,1]),this},b.concat=function(b){return b=this._fixMatrix(b),b.length!=a.LENGTH?this:(this._multiplyMatrix(b),this)},b.clone=function(){return(new a).copy(this)},b.toArray=function(){for(var b=[],c=0,d=a.LENGTH;d>c;c++)b[c]=this[c];return b},b.copy=function(b){for(var c=a.LENGTH,d=0;c>d;d++)this[d]=b[d];return this},b.toString=function(){return"[ColorMatrix]"},b._multiplyMatrix=function(a){var b,c,d,e=[];for(b=0;5>b;b++){for(c=0;5>c;c++)e[c]=this[c+5*b];for(c=0;5>c;c++){var f=0;for(d=0;5>d;d++)f+=a[c+5*d]*e[d];this[c+5*b]=f}}},b._cleanValue=function(a,b){return Math.min(b,Math.max(-b,a))},b._fixMatrix=function(b){return b instanceof a&&(b=b.toArray()),b.length<a.LENGTH?b=b.slice(0,b.length).concat(a.IDENTITY_MATRIX.slice(b.length,a.LENGTH)):b.length>a.LENGTH&&(b=b.slice(0,a.LENGTH)),b},createjs.ColorMatrix=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.matrix=a}var b=createjs.extend(a,createjs.Filter);b.toString=function(){return"[ColorMatrixFilter]"},b.clone=function(){return new a(this.matrix)},b._applyFilter=function(a){for(var b,c,d,e,f=a.data,g=f.length,h=this.matrix,i=h[0],j=h[1],k=h[2],l=h[3],m=h[4],n=h[5],o=h[6],p=h[7],q=h[8],r=h[9],s=h[10],t=h[11],u=h[12],v=h[13],w=h[14],x=h[15],y=h[16],z=h[17],A=h[18],B=h[19],C=0;g>C;C+=4)b=f[C],c=f[C+1],d=f[C+2],e=f[C+3],f[C]=b*i+c*j+d*k+e*l+m,f[C+1]=b*n+c*o+d*p+e*q+r,f[C+2]=b*s+c*t+d*u+e*v+w,f[C+3]=b*x+c*y+d*z+e*A+B;return!0},createjs.ColorMatrixFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"Touch cannot be instantiated"}a.isSupported=function(){return!!("ontouchstart"in window||window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>0)},a.enable=function(b,c,d){return b&&b.canvas&&a.isSupported()?b.__touch?!0:(b.__touch={pointers:{},multitouch:!c,preventDefault:!d,count:0},"ontouchstart"in window?a._IOS_enable(b):(window.navigator.msPointerEnabled||window.navigator.pointerEnabled)&&a._IE_enable(b),!0):!1},a.disable=function(b){b&&("ontouchstart"in window?a._IOS_disable(b):(window.navigator.msPointerEnabled||window.navigator.pointerEnabled)&&a._IE_disable(b),delete b.__touch)},a._IOS_enable=function(b){var c=b.canvas,d=b.__touch.f=function(c){a._IOS_handleEvent(b,c)};c.addEventListener("touchstart",d,!1),c.addEventListener("touchmove",d,!1),c.addEventListener("touchend",d,!1),c.addEventListener("touchcancel",d,!1)},a._IOS_disable=function(a){var b=a.canvas;if(b){var c=a.__touch.f;b.removeEventListener("touchstart",c,!1),b.removeEventListener("touchmove",c,!1),b.removeEventListener("touchend",c,!1),b.removeEventListener("touchcancel",c,!1)}},a._IOS_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&b.preventDefault&&b.preventDefault();for(var c=b.changedTouches,d=b.type,e=0,f=c.length;f>e;e++){var g=c[e],h=g.identifier;g.target==a.canvas&&("touchstart"==d?this._handleStart(a,h,b,g.pageX,g.pageY):"touchmove"==d?this._handleMove(a,h,b,g.pageX,g.pageY):("touchend"==d||"touchcancel"==d)&&this._handleEnd(a,h,b))}}},a._IE_enable=function(b){var c=b.canvas,d=b.__touch.f=function(c){a._IE_handleEvent(b,c)};void 0===window.navigator.pointerEnabled?(c.addEventListener("MSPointerDown",d,!1),window.addEventListener("MSPointerMove",d,!1),window.addEventListener("MSPointerUp",d,!1),window.addEventListener("MSPointerCancel",d,!1),b.__touch.preventDefault&&(c.style.msTouchAction="none")):(c.addEventListener("pointerdown",d,!1),window.addEventListener("pointermove",d,!1),window.addEventListener("pointerup",d,!1),window.addEventListener("pointercancel",d,!1),b.__touch.preventDefault&&(c.style.touchAction="none")),b.__touch.activeIDs={}},a._IE_disable=function(a){var b=a.__touch.f;void 0===window.navigator.pointerEnabled?(window.removeEventListener("MSPointerMove",b,!1),window.removeEventListener("MSPointerUp",b,!1),window.removeEventListener("MSPointerCancel",b,!1),a.canvas&&a.canvas.removeEventListener("MSPointerDown",b,!1)):(window.removeEventListener("pointermove",b,!1),window.removeEventListener("pointerup",b,!1),window.removeEventListener("pointercancel",b,!1),a.canvas&&a.canvas.removeEventListener("pointerdown",b,!1))},a._IE_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&b.preventDefault&&b.preventDefault();var c=b.type,d=b.pointerId,e=a.__touch.activeIDs;if("MSPointerDown"==c||"pointerdown"==c){if(b.srcElement!=a.canvas)return;e[d]=!0,this._handleStart(a,d,b,b.pageX,b.pageY)}else e[d]&&("MSPointerMove"==c||"pointermove"==c?this._handleMove(a,d,b,b.pageX,b.pageY):("MSPointerUp"==c||"MSPointerCancel"==c||"pointerup"==c||"pointercancel"==c)&&(delete e[d],this._handleEnd(a,d,b)))}},a._handleStart=function(a,b,c,d,e){var f=a.__touch;if(f.multitouch||!f.count){var g=f.pointers;g[b]||(g[b]=!0,f.count++,a._handlePointerDown(b,c,d,e))}},a._handleMove=function(a,b,c,d,e){a.__touch.pointers[b]&&a._handlePointerMove(b,c,d,e)},a._handleEnd=function(a,b,c){var d=a.__touch,e=d.pointers;e[b]&&(d.count--,a._handlePointerUp(b,c,!0),delete e[b])},createjs.Touch=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=createjs.EaselJS=createjs.EaselJS||{};a.version="0.8.2",a.buildDate="Thu, 26 Nov 2015 20:44:34 GMT"}(),this.createjs=this.createjs||{},function(){"use strict";var a=createjs.PreloadJS=createjs.PreloadJS||{};a.version="0.6.2",a.buildDate="Thu, 26 Nov 2015 20:44:31 GMT"}(),this.createjs=this.createjs||{},function(){"use strict";createjs.proxy=function(a,b){var c=Array.prototype.slice.call(arguments,2);return function(){return a.apply(b,Array.prototype.slice.call(arguments,0).concat(c))}}}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.Event_constructor("error"),this.title=a,this.message=b,this.data=c}var b=createjs.extend(a,createjs.Event);b.clone=function(){return new createjs.ErrorEvent(this.title,this.message,this.data)},createjs.ErrorEvent=createjs.promote(a,"Event")}(),this.createjs=this.createjs||{},function(a){"use strict";function b(a,b){this.Event_constructor("progress"),this.loaded=a,this.total=null==b?1:b,this.progress=0==b?0:this.loaded/this.total}var c=createjs.extend(b,createjs.Event);c.clone=function(){return new createjs.ProgressEvent(this.loaded,this.total)},createjs.ProgressEvent=createjs.promote(b,"Event")}(window),function(){function a(b,d){function f(a){if(f[a]!==q)return f[a];var b;if("bug-string-char-index"==a)b="a"!="a"[0];else if("json"==a)b=f("json-stringify")&&f("json-parse");else{var c,e='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if("json-stringify"==a){var i=d.stringify,k="function"==typeof i&&t;if(k){(c=function(){return 1}).toJSON=c;try{k="0"===i(0)&&"0"===i(new g)&&'""'==i(new h)&&i(s)===q&&i(q)===q&&i()===q&&"1"===i(c)&&"[1]"==i([c])&&"[null]"==i([q])&&"null"==i(null)&&"[null,null,null]"==i([q,s,null])&&i({a:[c,!0,!1,null,"\x00\b\n\f\r	"]})==e&&"1"===i(null,c)&&"[\n 1,\n 2\n]"==i([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==i(new j(-864e13))&&'"+275760-09-13T00:00:00.000Z"'==i(new j(864e13))&&'"-000001-01-01T00:00:00.000Z"'==i(new j(-621987552e5))&&'"1969-12-31T23:59:59.999Z"'==i(new j(-1))}catch(l){k=!1}}b=k}if("json-parse"==a){var m=d.parse;if("function"==typeof m)try{if(0===m("0")&&!m(!1)){c=m(e);var n=5==c.a.length&&1===c.a[0];if(n){try{n=!m('"	"')}catch(l){}if(n)try{n=1!==m("01")}catch(l){}if(n)try{n=1!==m("1.")}catch(l){}}}}catch(l){n=!1}b=n}}return f[a]=!!b}b||(b=e.Object()),d||(d=e.Object());var g=b.Number||e.Number,h=b.String||e.String,i=b.Object||e.Object,j=b.Date||e.Date,k=b.SyntaxError||e.SyntaxError,l=b.TypeError||e.TypeError,m=b.Math||e.Math,n=b.JSON||e.JSON;"object"==typeof n&&n&&(d.stringify=n.stringify,d.parse=n.parse);var o,p,q,r=i.prototype,s=r.toString,t=new j(-0xc782b5b800cec);try{t=-109252==t.getUTCFullYear()&&0===t.getUTCMonth()&&1===t.getUTCDate()&&10==t.getUTCHours()&&37==t.getUTCMinutes()&&6==t.getUTCSeconds()&&708==t.getUTCMilliseconds()}catch(u){}if(!f("json")){var v="[object Function]",w="[object Date]",x="[object Number]",y="[object String]",z="[object Array]",A="[object Boolean]",B=f("bug-string-char-index");if(!t)var C=m.floor,D=[0,31,59,90,120,151,181,212,243,273,304,334],E=function(a,b){return D[b]+365*(a-1970)+C((a-1969+(b=+(b>1)))/4)-C((a-1901+b)/100)+C((a-1601+b)/400)};if((o=r.hasOwnProperty)||(o=function(a){var b,c={};return(c.__proto__=null,c.__proto__={toString:1},c).toString!=s?o=function(a){var b=this.__proto__,c=a in(this.__proto__=null,this);return this.__proto__=b,c}:(b=c.constructor,o=function(a){var c=(this.constructor||b).prototype;return a in this&&!(a in c&&this[a]===c[a])}),c=null,o.call(this,a)}),p=function(a,b){var d,e,f,g=0;(d=function(){this.valueOf=0}).prototype.valueOf=0,e=new d;for(f in e)o.call(e,f)&&g++;return d=e=null,g?p=2==g?function(a,b){var c,d={},e=s.call(a)==v;for(c in a)e&&"prototype"==c||o.call(d,c)||!(d[c]=1)||!o.call(a,c)||b(c)}:function(a,b){var c,d,e=s.call(a)==v;for(c in a)e&&"prototype"==c||!o.call(a,c)||(d="constructor"===c)||b(c);(d||o.call(a,c="constructor"))&&b(c)}:(e=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"],p=function(a,b){var d,f,g=s.call(a)==v,h=!g&&"function"!=typeof a.constructor&&c[typeof a.hasOwnProperty]&&a.hasOwnProperty||o;for(d in a)g&&"prototype"==d||!h.call(a,d)||b(d);for(f=e.length;d=e[--f];h.call(a,d)&&b(d));}),p(a,b)},!f("json-stringify")){var F={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},G="000000",H=function(a,b){return(G+(b||0)).slice(-a)},I="\\u00",J=function(a){for(var b='"',c=0,d=a.length,e=!B||d>10,f=e&&(B?a.split(""):a);d>c;c++){var g=a.charCodeAt(c);switch(g){case 8:case 9:case 10:case 12:case 13:case 34:case 92:b+=F[g];break;default:if(32>g){b+=I+H(2,g.toString(16));break}b+=e?f[c]:a.charAt(c)}}return b+'"'},K=function(a,b,c,d,e,f,g){var h,i,j,k,m,n,r,t,u,v,B,D,F,G,I,L;try{h=b[a]}catch(M){}if("object"==typeof h&&h)if(i=s.call(h),i!=w||o.call(h,"toJSON"))"function"==typeof h.toJSON&&(i!=x&&i!=y&&i!=z||o.call(h,"toJSON"))&&(h=h.toJSON(a));else if(h>-1/0&&1/0>h){if(E){for(m=C(h/864e5),j=C(m/365.2425)+1970-1;E(j+1,0)<=m;j++);for(k=C((m-E(j,0))/30.42);E(j,k+1)<=m;k++);m=1+m-E(j,k),n=(h%864e5+864e5)%864e5,r=C(n/36e5)%24,t=C(n/6e4)%60,u=C(n/1e3)%60,v=n%1e3}else j=h.getUTCFullYear(),k=h.getUTCMonth(),m=h.getUTCDate(),r=h.getUTCHours(),t=h.getUTCMinutes(),u=h.getUTCSeconds(),v=h.getUTCMilliseconds();h=(0>=j||j>=1e4?(0>j?"-":"+")+H(6,0>j?-j:j):H(4,j))+"-"+H(2,k+1)+"-"+H(2,m)+"T"+H(2,r)+":"+H(2,t)+":"+H(2,u)+"."+H(3,v)+"Z"}else h=null;if(c&&(h=c.call(b,a,h)),null===h)return"null";if(i=s.call(h),i==A)return""+h;if(i==x)return h>-1/0&&1/0>h?""+h:"null";if(i==y)return J(""+h);if("object"==typeof h){for(G=g.length;G--;)if(g[G]===h)throw l();if(g.push(h),B=[],I=f,f+=e,i==z){for(F=0,G=h.length;G>F;F++)D=K(F,h,c,d,e,f,g),B.push(D===q?"null":D);L=B.length?e?"[\n"+f+B.join(",\n"+f)+"\n"+I+"]":"["+B.join(",")+"]":"[]"}else p(d||h,function(a){var b=K(a,h,c,d,e,f,g);b!==q&&B.push(J(a)+":"+(e?" ":"")+b)}),L=B.length?e?"{\n"+f+B.join(",\n"+f)+"\n"+I+"}":"{"+B.join(",")+"}":"{}";return g.pop(),L}};d.stringify=function(a,b,d){var e,f,g,h;if(c[typeof b]&&b)if((h=s.call(b))==v)f=b;else if(h==z){g={};for(var i,j=0,k=b.length;k>j;i=b[j++],h=s.call(i),(h==y||h==x)&&(g[i]=1));}if(d)if((h=s.call(d))==x){if((d-=d%1)>0)for(e="",d>10&&(d=10);e.length<d;e+=" ");}else h==y&&(e=d.length<=10?d:d.slice(0,10));return K("",(i={},i[""]=a,i),f,g,e,"",[])}}if(!f("json-parse")){var L,M,N=h.fromCharCode,O={92:"\\",34:'"',47:"/",98:"\b",116:"	",110:"\n",102:"\f",114:"\r"},P=function(){throw L=M=null,k()},Q=function(){for(var a,b,c,d,e,f=M,g=f.length;g>L;)switch(e=f.charCodeAt(L)){case 9:case 10:case 13:case 32:L++;break;case 123:case 125:case 91:case 93:case 58:case 44:return a=B?f.charAt(L):f[L],L++,a;case 34:for(a="@",L++;g>L;)if(e=f.charCodeAt(L),32>e)P();else if(92==e)switch(e=f.charCodeAt(++L)){case 92:case 34:
case 47:case 98:case 116:case 110:case 102:case 114:a+=O[e],L++;break;case 117:for(b=++L,c=L+4;c>L;L++)e=f.charCodeAt(L),e>=48&&57>=e||e>=97&&102>=e||e>=65&&70>=e||P();a+=N("0x"+f.slice(b,L));break;default:P()}else{if(34==e)break;for(e=f.charCodeAt(L),b=L;e>=32&&92!=e&&34!=e;)e=f.charCodeAt(++L);a+=f.slice(b,L)}if(34==f.charCodeAt(L))return L++,a;P();default:if(b=L,45==e&&(d=!0,e=f.charCodeAt(++L)),e>=48&&57>=e){for(48==e&&(e=f.charCodeAt(L+1),e>=48&&57>=e)&&P(),d=!1;g>L&&(e=f.charCodeAt(L),e>=48&&57>=e);L++);if(46==f.charCodeAt(L)){for(c=++L;g>c&&(e=f.charCodeAt(c),e>=48&&57>=e);c++);c==L&&P(),L=c}if(e=f.charCodeAt(L),101==e||69==e){for(e=f.charCodeAt(++L),(43==e||45==e)&&L++,c=L;g>c&&(e=f.charCodeAt(c),e>=48&&57>=e);c++);c==L&&P(),L=c}return+f.slice(b,L)}if(d&&P(),"true"==f.slice(L,L+4))return L+=4,!0;if("false"==f.slice(L,L+5))return L+=5,!1;if("null"==f.slice(L,L+4))return L+=4,null;P()}return"$"},R=function(a){var b,c;if("$"==a&&P(),"string"==typeof a){if("@"==(B?a.charAt(0):a[0]))return a.slice(1);if("["==a){for(b=[];a=Q(),"]"!=a;c||(c=!0))c&&(","==a?(a=Q(),"]"==a&&P()):P()),","==a&&P(),b.push(R(a));return b}if("{"==a){for(b={};a=Q(),"}"!=a;c||(c=!0))c&&(","==a?(a=Q(),"}"==a&&P()):P()),(","==a||"string"!=typeof a||"@"!=(B?a.charAt(0):a[0])||":"!=Q())&&P(),b[a.slice(1)]=R(Q());return b}P()}return a},S=function(a,b,c){var d=T(a,b,c);d===q?delete a[b]:a[b]=d},T=function(a,b,c){var d,e=a[b];if("object"==typeof e&&e)if(s.call(e)==z)for(d=e.length;d--;)S(e,d,c);else p(e,function(a){S(e,a,c)});return c.call(a,b,e)};d.parse=function(a,b){var c,d;return L=0,M=""+a,c=R(Q()),"$"!=Q()&&P(),L=M=null,b&&s.call(b)==v?T((d={},d[""]=c,d),"",b):c}}}return d.runInContext=a,d}var b="function"==typeof define&&define.amd,c={"function":!0,object:!0},d=c[typeof exports]&&exports&&!exports.nodeType&&exports,e=c[typeof window]&&window||this,f=d&&c[typeof module]&&module&&!module.nodeType&&"object"==typeof global&&global;if(!f||f.global!==f&&f.window!==f&&f.self!==f||(e=f),d&&!b)a(e,d);else{var g=e.JSON,h=e.JSON3,i=!1,j=a(e,e.JSON3={noConflict:function(){return i||(i=!0,e.JSON=g,e.JSON3=h,g=h=null),j}});e.JSON={parse:j.parse,stringify:j.stringify}}b&&define(function(){return j})}.call(this),function(){var a={};a.appendToHead=function(b){a.getHead().appendChild(b)},a.getHead=function(){return document.head||document.getElementsByTagName("head")[0]},a.getBody=function(){return document.body||document.getElementsByTagName("body")[0]},createjs.DomUtils=a}(),function(){var a={};a.parseXML=function(a,b){var c=null;try{if(window.DOMParser){var d=new DOMParser;c=d.parseFromString(a,b)}}catch(e){}if(!c)try{c=new ActiveXObject("Microsoft.XMLDOM"),c.async=!1,c.loadXML(a)}catch(e){c=null}return c},a.parseJSON=function(a){if(null==a)return null;try{return JSON.parse(a)}catch(b){throw b}},createjs.DataUtils=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.src=null,this.type=null,this.id=null,this.maintainOrder=!1,this.callback=null,this.data=null,this.method=createjs.LoadItem.GET,this.values=null,this.headers=null,this.withCredentials=!1,this.mimeType=null,this.crossOrigin=null,this.loadTimeout=c.LOAD_TIMEOUT_DEFAULT}var b=a.prototype={},c=a;c.LOAD_TIMEOUT_DEFAULT=8e3,c.create=function(b){if("string"==typeof b){var d=new a;return d.src=b,d}if(b instanceof c)return b;if(b instanceof Object&&b.src)return null==b.loadTimeout&&(b.loadTimeout=c.LOAD_TIMEOUT_DEFAULT),b;throw new Error("Type not recognized.")},b.set=function(a){for(var b in a)this[b]=a[b];return this},createjs.LoadItem=c}(),function(){var a={};a.ABSOLUTE_PATT=/^(?:\w+:)?\/{2}/i,a.RELATIVE_PATT=/^[.\/]*?\//i,a.EXTENSION_PATT=/\/?[^\/]+\.(\w{1,5})$/i,a.parseURI=function(b){var c={absolute:!1,relative:!1};if(null==b)return c;var d=b.indexOf("?");d>-1&&(b=b.substr(0,d));var e;return a.ABSOLUTE_PATT.test(b)?c.absolute=!0:a.RELATIVE_PATT.test(b)&&(c.relative=!0),(e=b.match(a.EXTENSION_PATT))&&(c.extension=e[1].toLowerCase()),c},a.formatQueryString=function(a,b){if(null==a)throw new Error("You must specify data.");var c=[];for(var d in a)c.push(d+"="+escape(a[d]));return b&&(c=c.concat(b)),c.join("&")},a.buildPath=function(a,b){if(null==b)return a;var c=[],d=a.indexOf("?");if(-1!=d){var e=a.slice(d+1);c=c.concat(e.split("&"))}return-1!=d?a.slice(0,d)+"?"+this.formatQueryString(b,c):a+"?"+this.formatQueryString(b,c)},a.isCrossDomain=function(a){var b=document.createElement("a");b.href=a.src;var c=document.createElement("a");c.href=location.href;var d=""!=b.hostname&&(b.port!=c.port||b.protocol!=c.protocol||b.hostname!=c.hostname);return d},a.isLocal=function(a){var b=document.createElement("a");return b.href=a.src,""==b.hostname&&"file:"==b.protocol},a.isBinary=function(a){switch(a){case createjs.AbstractLoader.IMAGE:case createjs.AbstractLoader.BINARY:return!0;default:return!1}},a.isImageTag=function(a){return a instanceof HTMLImageElement},a.isAudioTag=function(a){return window.HTMLAudioElement?a instanceof HTMLAudioElement:!1},a.isVideoTag=function(a){return window.HTMLVideoElement?a instanceof HTMLVideoElement:!1},a.isText=function(a){switch(a){case createjs.AbstractLoader.TEXT:case createjs.AbstractLoader.JSON:case createjs.AbstractLoader.MANIFEST:case createjs.AbstractLoader.XML:case createjs.AbstractLoader.CSS:case createjs.AbstractLoader.SVG:case createjs.AbstractLoader.JAVASCRIPT:case createjs.AbstractLoader.SPRITESHEET:return!0;default:return!1}},a.getTypeByExtension=function(a){if(null==a)return createjs.AbstractLoader.TEXT;switch(a.toLowerCase()){case"jpeg":case"jpg":case"gif":case"png":case"webp":case"bmp":return createjs.AbstractLoader.IMAGE;case"ogg":case"mp3":case"webm":return createjs.AbstractLoader.SOUND;case"mp4":case"webm":case"ts":return createjs.AbstractLoader.VIDEO;case"json":return createjs.AbstractLoader.JSON;case"xml":return createjs.AbstractLoader.XML;case"css":return createjs.AbstractLoader.CSS;case"js":return createjs.AbstractLoader.JAVASCRIPT;case"svg":return createjs.AbstractLoader.SVG;default:return createjs.AbstractLoader.TEXT}},createjs.RequestUtils=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.EventDispatcher_constructor(),this.loaded=!1,this.canceled=!1,this.progress=0,this.type=c,this.resultFormatter=null,a?this._item=createjs.LoadItem.create(a):this._item=null,this._preferXHR=b,this._result=null,this._rawResult=null,this._loadedItems=null,this._tagSrcAttribute=null,this._tag=null}var b=createjs.extend(a,createjs.EventDispatcher),c=a;c.POST="POST",c.GET="GET",c.BINARY="binary",c.CSS="css",c.IMAGE="image",c.JAVASCRIPT="javascript",c.JSON="json",c.JSONP="jsonp",c.MANIFEST="manifest",c.SOUND="sound",c.VIDEO="video",c.SPRITESHEET="spritesheet",c.SVG="svg",c.TEXT="text",c.XML="xml",b.getItem=function(){return this._item},b.getResult=function(a){return a?this._rawResult:this._result},b.getTag=function(){return this._tag},b.setTag=function(a){this._tag=a},b.load=function(){this._createRequest(),this._request.on("complete",this,this),this._request.on("progress",this,this),this._request.on("loadStart",this,this),this._request.on("abort",this,this),this._request.on("timeout",this,this),this._request.on("error",this,this);var a=new createjs.Event("initialize");a.loader=this._request,this.dispatchEvent(a),this._request.load()},b.cancel=function(){this.canceled=!0,this.destroy()},b.destroy=function(){this._request&&(this._request.removeAllEventListeners(),this._request.destroy()),this._request=null,this._item=null,this._rawResult=null,this._result=null,this._loadItems=null,this.removeAllEventListeners()},b.getLoadedItems=function(){return this._loadedItems},b._createRequest=function(){this._preferXHR?this._request=new createjs.XHRRequest(this._item):this._request=new createjs.TagRequest(this._item,this._tag||this._createTag(),this._tagSrcAttribute)},b._createTag=function(a){return null},b._sendLoadStart=function(){this._isCanceled()||this.dispatchEvent("loadstart")},b._sendProgress=function(a){if(!this._isCanceled()){var b=null;"number"==typeof a?(this.progress=a,b=new createjs.ProgressEvent(this.progress)):(b=a,this.progress=a.loaded/a.total,b.progress=this.progress,(isNaN(this.progress)||this.progress==1/0)&&(this.progress=0)),this.hasEventListener("progress")&&this.dispatchEvent(b)}},b._sendComplete=function(){if(!this._isCanceled()){this.loaded=!0;var a=new createjs.Event("complete");a.rawResult=this._rawResult,null!=this._result&&(a.result=this._result),this.dispatchEvent(a)}},b._sendError=function(a){!this._isCanceled()&&this.hasEventListener("error")&&(null==a&&(a=new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")),this.dispatchEvent(a))},b._isCanceled=function(){return null==window.createjs||this.canceled?!0:!1},b.resultFormatter=null,b.handleEvent=function(a){switch(a.type){case"complete":this._rawResult=a.target._response;var b=this.resultFormatter&&this.resultFormatter(this);b instanceof Function?b.call(this,createjs.proxy(this._resultFormatSuccess,this),createjs.proxy(this._resultFormatFailed,this)):(this._result=b||this._rawResult,this._sendComplete());break;case"progress":this._sendProgress(a);break;case"error":this._sendError(a);break;case"loadstart":this._sendLoadStart();break;case"abort":case"timeout":this._isCanceled()||this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_"+a.type.toUpperCase()+"_ERROR"))}},b._resultFormatSuccess=function(a){this._result=a,this._sendComplete()},b._resultFormatFailed=function(a){this._sendError(a)},b.buildPath=function(a,b){return createjs.RequestUtils.buildPath(a,b)},b.toString=function(){return"[PreloadJS AbstractLoader]"},createjs.AbstractLoader=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.AbstractLoader_constructor(a,b,c),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src",this.on("initialize",this._updateXHR,this)}var b=createjs.extend(a,createjs.AbstractLoader);b.load=function(){this._tag||(this._tag=this._createTag(this._item.src)),this._tag.preload="auto",this._tag.load(),this.AbstractLoader_load()},b._createTag=function(){},b._createRequest=function(){this._preferXHR?this._request=new createjs.XHRRequest(this._item):this._request=new createjs.MediaTagRequest(this._item,this._tag||this._createTag(),this._tagSrcAttribute)},b._updateXHR=function(a){a.loader.setResponseType&&a.loader.setResponseType("blob")},b._formatResult=function(a){if(this._tag.removeEventListener&&this._tag.removeEventListener("canplaythrough",this._loadedHandler),this._tag.onstalled=null,this._preferXHR){var b=window.URL||window.webkitURL,c=a.getResult(!0);a.getTag().src=b.createObjectURL(c)}return a.getTag()},createjs.AbstractMediaLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this._item=a},b=createjs.extend(a,createjs.EventDispatcher);b.load=function(){},b.destroy=function(){},b.cancel=function(){},createjs.AbstractRequest=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.AbstractRequest_constructor(a),this._tag=b,this._tagSrcAttribute=c,this._loadedHandler=createjs.proxy(this._handleTagComplete,this),this._addedToDOM=!1,this._startTagVisibility=null}var b=createjs.extend(a,createjs.AbstractRequest);b.load=function(){this._tag.onload=createjs.proxy(this._handleTagComplete,this),this._tag.onreadystatechange=createjs.proxy(this._handleReadyStateChange,this),this._tag.onerror=createjs.proxy(this._handleError,this);var a=new createjs.Event("initialize");a.loader=this._tag,this.dispatchEvent(a),this._hideTag(),this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout),this._tag[this._tagSrcAttribute]=this._item.src,null==this._tag.parentNode&&(window.document.body.appendChild(this._tag),this._addedToDOM=!0)},b.destroy=function(){this._clean(),this._tag=null,this.AbstractRequest_destroy()},b._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var a=this._tag;("loaded"==a.readyState||"complete"==a.readyState)&&this._handleTagComplete()},b._handleError=function(){this._clean(),this.dispatchEvent("error")},b._handleTagComplete=function(){this._rawResult=this._tag,this._result=this.resultFormatter&&this.resultFormatter(this)||this._rawResult,this._clean(),this._showTag(),this.dispatchEvent("complete")},b._handleTimeout=function(){this._clean(),this.dispatchEvent(new createjs.Event("timeout"))},b._clean=function(){this._tag.onload=null,this._tag.onreadystatechange=null,this._tag.onerror=null,this._addedToDOM&&null!=this._tag.parentNode&&this._tag.parentNode.removeChild(this._tag),clearTimeout(this._loadTimeout)},b._hideTag=function(){this._startTagVisibility=this._tag.style.visibility,this._tag.style.visibility="hidden"},b._showTag=function(){this._tag.style.visibility=this._startTagVisibility},b._handleStalled=function(){},createjs.TagRequest=createjs.promote(a,"AbstractRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.AbstractRequest_constructor(a),this._tag=b,this._tagSrcAttribute=c,this._loadedHandler=createjs.proxy(this._handleTagComplete,this)}var b=createjs.extend(a,createjs.TagRequest);b.load=function(){var a=createjs.proxy(this._handleStalled,this);this._stalledCallback=a;var b=createjs.proxy(this._handleProgress,this);this._handleProgress=b,this._tag.addEventListener("stalled",a),this._tag.addEventListener("progress",b),this._tag.addEventListener&&this._tag.addEventListener("canplaythrough",this._loadedHandler,!1),this.TagRequest_load()},b._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var a=this._tag;("loaded"==a.readyState||"complete"==a.readyState)&&this._handleTagComplete()},b._handleStalled=function(){},b._handleProgress=function(a){if(a&&!(a.loaded>0&&0==a.total)){var b=new createjs.ProgressEvent(a.loaded,a.total);this.dispatchEvent(b)}},b._clean=function(){this._tag.removeEventListener&&this._tag.removeEventListener("canplaythrough",this._loadedHandler),this._tag.removeEventListener("stalled",this._stalledCallback),this._tag.removeEventListener("progress",this._progressCallback),this.TagRequest__clean()},createjs.MediaTagRequest=createjs.promote(a,"TagRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractRequest_constructor(a),this._request=null,this._loadTimeout=null,this._xhrLevel=1,this._response=null,this._rawResponse=null,this._canceled=!1,this._handleLoadStartProxy=createjs.proxy(this._handleLoadStart,this),this._handleProgressProxy=createjs.proxy(this._handleProgress,this),this._handleAbortProxy=createjs.proxy(this._handleAbort,this),this._handleErrorProxy=createjs.proxy(this._handleError,this),this._handleTimeoutProxy=createjs.proxy(this._handleTimeout,this),this._handleLoadProxy=createjs.proxy(this._handleLoad,this),this._handleReadyStateChangeProxy=createjs.proxy(this._handleReadyStateChange,this),!this._createXHR(a)}var b=createjs.extend(a,createjs.AbstractRequest);a.ACTIVEX_VERSIONS=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],b.getResult=function(a){return a&&this._rawResponse?this._rawResponse:this._response},b.cancel=function(){this.canceled=!0,this._clean(),this._request.abort()},b.load=function(){if(null==this._request)return void this._handleError();null!=this._request.addEventListener?(this._request.addEventListener("loadstart",this._handleLoadStartProxy,!1),this._request.addEventListener("progress",this._handleProgressProxy,!1),this._request.addEventListener("abort",this._handleAbortProxy,!1),this._request.addEventListener("error",this._handleErrorProxy,!1),this._request.addEventListener("timeout",this._handleTimeoutProxy,!1),this._request.addEventListener("load",this._handleLoadProxy,!1),this._request.addEventListener("readystatechange",this._handleReadyStateChangeProxy,!1)):(this._request.onloadstart=this._handleLoadStartProxy,this._request.onprogress=this._handleProgressProxy,this._request.onabort=this._handleAbortProxy,this._request.onerror=this._handleErrorProxy,this._request.ontimeout=this._handleTimeoutProxy,this._request.onload=this._handleLoadProxy,this._request.onreadystatechange=this._handleReadyStateChangeProxy),1==this._xhrLevel&&(this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout));try{this._item.values&&this._item.method!=createjs.AbstractLoader.GET?this._item.method==createjs.AbstractLoader.POST&&this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)):this._request.send()}catch(a){this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND",null,a))}},b.setResponseType=function(a){"blob"===a&&(a=window.URL?"blob":"arraybuffer",this._responseType=a),this._request.responseType=a},b.getAllResponseHeaders=function(){return this._request.getAllResponseHeaders instanceof Function?this._request.getAllResponseHeaders():null},b.getResponseHeader=function(a){return this._request.getResponseHeader instanceof Function?this._request.getResponseHeader(a):null},b._handleProgress=function(a){if(a&&!(a.loaded>0&&0==a.total)){var b=new createjs.ProgressEvent(a.loaded,a.total);this.dispatchEvent(b)}},b._handleLoadStart=function(a){clearTimeout(this._loadTimeout),this.dispatchEvent("loadstart")},b._handleAbort=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED",null,a))},b._handleError=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent(a.message))},b._handleReadyStateChange=function(a){4==this._request.readyState&&this._handleLoad()},b._handleLoad=function(a){if(!this.loaded){this.loaded=!0;var b=this._checkError();if(b)return void this._handleError(b);if(this._response=this._getResponse(),"arraybuffer"===this._responseType)try{this._response=new Blob([this._response])}catch(c){if(window.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,"TypeError"===c.name&&window.BlobBuilder){var d=new BlobBuilder;d.append(this._response),this._response=d.getBlob()}}this._clean(),this.dispatchEvent(new createjs.Event("complete"))}},b._handleTimeout=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT",null,a))},b._checkError=function(){var a=parseInt(this._request.status);switch(a){case 404:case 0:return new Error(a)}return null},b._getResponse=function(){if(null!=this._response)return this._response;if(null!=this._request.response)return this._request.response;try{if(null!=this._request.responseText)return this._request.responseText}catch(a){}try{if(null!=this._request.responseXML)return this._request.responseXML}catch(a){}return null},b._createXHR=function(a){var b=createjs.RequestUtils.isCrossDomain(a),c={},d=null;if(window.XMLHttpRequest)d=new XMLHttpRequest,b&&void 0===d.withCredentials&&window.XDomainRequest&&(d=new XDomainRequest);else{for(var e=0,f=s.ACTIVEX_VERSIONS.length;f>e;e++){var g=s.ACTIVEX_VERSIONS[e];try{d=new ActiveXObject(g);break}catch(h){}}if(null==d)return!1}null==a.mimeType&&createjs.RequestUtils.isText(a.type)&&(a.mimeType="text/plain; charset=utf-8"),a.mimeType&&d.overrideMimeType&&d.overrideMimeType(a.mimeType),this._xhrLevel="string"==typeof d.responseType?2:1;var i=null;if(i=a.method==createjs.AbstractLoader.GET?createjs.RequestUtils.buildPath(a.src,a.values):a.src,d.open(a.method||createjs.AbstractLoader.GET,i,!0),b&&d instanceof XMLHttpRequest&&1==this._xhrLevel&&(c.Origin=location.origin),a.values&&a.method==createjs.AbstractLoader.POST&&(c["Content-Type"]="application/x-www-form-urlencoded"),b||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest"),a.headers)for(var j in a.headers)c[j]=a.headers[j];for(j in c)d.setRequestHeader(j,c[j]);return d instanceof XMLHttpRequest&&void 0!==a.withCredentials&&(d.withCredentials=a.withCredentials),this._request=d,!0},b._clean=function(){clearTimeout(this._loadTimeout),null!=this._request.removeEventListener?(this._request.removeEventListener("loadstart",this._handleLoadStartProxy),this._request.removeEventListener("progress",this._handleProgressProxy),this._request.removeEventListener("abort",this._handleAbortProxy),this._request.removeEventListener("error",this._handleErrorProxy),this._request.removeEventListener("timeout",this._handleTimeoutProxy),this._request.removeEventListener("load",this._handleLoadProxy),this._request.removeEventListener("readystatechange",this._handleReadyStateChangeProxy)):(this._request.onloadstart=null,this._request.onprogress=null,this._request.onabort=null,this._request.onerror=null,this._request.ontimeout=null,this._request.onload=null,this._request.onreadystatechange=null)},b.toString=function(){return"[PreloadJS XHRRequest]"},createjs.XHRRequest=createjs.promote(a,"AbstractRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.AbstractLoader_constructor(),this._plugins=[],this._typeCallbacks={},this._extensionCallbacks={},this.next=null,this.maintainScriptOrder=!0,this.stopOnError=!1,this._maxConnections=1,this._availableLoaders=[createjs.ImageLoader,createjs.JavaScriptLoader,createjs.CSSLoader,createjs.JSONLoader,createjs.JSONPLoader,createjs.SoundLoader,createjs.ManifestLoader,createjs.SpriteSheetLoader,createjs.XMLLoader,createjs.SVGLoader,createjs.BinaryLoader,createjs.VideoLoader,createjs.TextLoader],this._defaultLoaderLength=this._availableLoaders.length,this.init(a,b,c)}var b=createjs.extend(a,createjs.AbstractLoader),c=a;b.init=function(a,b,c){this.useXHR=!0,this.preferXHR=!0,this._preferXHR=!0,this.setPreferXHR(a),this._paused=!1,this._basePath=b,this._crossOrigin=c,this._loadStartWasDispatched=!1,this._currentlyLoadingScript=null,this._currentLoads=[],this._loadQueue=[],this._loadQueueBackup=[],this._loadItemsById={},this._loadItemsBySrc={},this._loadedResults={},this._loadedRawResults={},this._numItems=0,this._numItemsLoaded=0,this._scriptOrder=[],this._loadedScripts=[],this._lastProgress=NaN},c.loadTimeout=8e3,c.LOAD_TIMEOUT=0,c.BINARY=createjs.AbstractLoader.BINARY,c.CSS=createjs.AbstractLoader.CSS,c.IMAGE=createjs.AbstractLoader.IMAGE,c.JAVASCRIPT=createjs.AbstractLoader.JAVASCRIPT,c.JSON=createjs.AbstractLoader.JSON,c.JSONP=createjs.AbstractLoader.JSONP,c.MANIFEST=createjs.AbstractLoader.MANIFEST,c.SOUND=createjs.AbstractLoader.SOUND,c.VIDEO=createjs.AbstractLoader.VIDEO,c.SVG=createjs.AbstractLoader.SVG,c.TEXT=createjs.AbstractLoader.TEXT,c.XML=createjs.AbstractLoader.XML,c.POST=createjs.AbstractLoader.POST,c.GET=createjs.AbstractLoader.GET,b.registerLoader=function(a){if(!a||!a.canLoadItem)throw new Error("loader is of an incorrect type.");if(-1!=this._availableLoaders.indexOf(a))throw new Error("loader already exists.");this._availableLoaders.unshift(a)},b.unregisterLoader=function(a){var b=this._availableLoaders.indexOf(a);-1!=b&&b<this._defaultLoaderLength-1&&this._availableLoaders.splice(b,1)},b.setUseXHR=function(a){return this.setPreferXHR(a)},b.setPreferXHR=function(a){return this.preferXHR=0!=a&&null!=window.XMLHttpRequest,this.preferXHR},b.removeAll=function(){this.remove()},b.remove=function(a){var b=null;if(a&&!Array.isArray(a))b=[a];else if(a)b=a;else if(arguments.length>0)return;var c=!1;if(b){for(;b.length;){var d=b.pop(),e=this.getResult(d);for(f=this._loadQueue.length-1;f>=0;f--)if(g=this._loadQueue[f].getItem(),g.id==d||g.src==d){this._loadQueue.splice(f,1)[0].cancel();break}for(f=this._loadQueueBackup.length-1;f>=0;f--)if(g=this._loadQueueBackup[f].getItem(),g.id==d||g.src==d){this._loadQueueBackup.splice(f,1)[0].cancel();break}if(e)this._disposeItem(this.getItem(d));else for(var f=this._currentLoads.length-1;f>=0;f--){var g=this._currentLoads[f].getItem();if(g.id==d||g.src==d){this._currentLoads.splice(f,1)[0].cancel(),c=!0;break}}}c&&this._loadNext()}else{this.close();for(var h in this._loadItemsById)this._disposeItem(this._loadItemsById[h]);this.init(this.preferXHR,this._basePath)}},b.reset=function(){this.close();for(var a in this._loadItemsById)this._disposeItem(this._loadItemsById[a]);for(var b=[],c=0,d=this._loadQueueBackup.length;d>c;c++)b.push(this._loadQueueBackup[c].getItem());this.loadManifest(b,!1)},b.installPlugin=function(a){if(null!=a&&null!=a.getPreloadHandlers){this._plugins.push(a);var b=a.getPreloadHandlers();if(b.scope=a,null!=b.types)for(var c=0,d=b.types.length;d>c;c++)this._typeCallbacks[b.types[c]]=b;if(null!=b.extensions)for(c=0,d=b.extensions.length;d>c;c++)this._extensionCallbacks[b.extensions[c]]=b}},b.setMaxConnections=function(a){this._maxConnections=a,!this._paused&&this._loadQueue.length>0&&this._loadNext()},b.loadFile=function(a,b,c){if(null==a){var d=new createjs.ErrorEvent("PRELOAD_NO_FILE");return void this._sendError(d)}this._addItem(a,null,c),b!==!1?this.setPaused(!1):this.setPaused(!0)},b.loadManifest=function(a,b,d){var e=null,f=null;if(Array.isArray(a)){if(0==a.length){var g=new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY");return void this._sendError(g)}e=a}else if("string"==typeof a)e=[{src:a,type:c.MANIFEST}];else{if("object"!=typeof a){var g=new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL");return void this._sendError(g)}if(void 0!==a.src){if(null==a.type)a.type=c.MANIFEST;else if(a.type!=c.MANIFEST){var g=new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE");this._sendError(g)}e=[a]}else void 0!==a.manifest&&(e=a.manifest,f=a.path)}for(var h=0,i=e.length;i>h;h++)this._addItem(e[h],f,d);b!==!1?this.setPaused(!1):this.setPaused(!0)},b.load=function(){this.setPaused(!1)},b.getItem=function(a){return this._loadItemsById[a]||this._loadItemsBySrc[a]},b.getResult=function(a,b){var c=this._loadItemsById[a]||this._loadItemsBySrc[a];if(null==c)return null;var d=c.id;return b&&this._loadedRawResults[d]?this._loadedRawResults[d]:this._loadedResults[d]},b.getItems=function(a){var b=[];for(var c in this._loadItemsById){var d=this._loadItemsById[c],e=this.getResult(c);(a!==!0||null!=e)&&b.push({item:d,result:e,rawResult:this.getResult(c,!0)})}return b},b.setPaused=function(a){this._paused=a,this._paused||this._loadNext()},b.close=function(){for(;this._currentLoads.length;)this._currentLoads.pop().cancel();this._scriptOrder.length=0,this._loadedScripts.length=0,this.loadStartWasDispatched=!1,this._itemCount=0,this._lastProgress=NaN},b._addItem=function(a,b,c){var d=this._createLoadItem(a,b,c);if(null!=d){var e=this._createLoader(d);null!=e&&("plugins"in e&&(e.plugins=this._plugins),d._loader=e,this._loadQueue.push(e),this._loadQueueBackup.push(e),this._numItems++,this._updateProgress(),(this.maintainScriptOrder&&d.type==createjs.LoadQueue.JAVASCRIPT||d.maintainOrder===!0)&&(this._scriptOrder.push(d),this._loadedScripts.push(null)))}},b._createLoadItem=function(a,b,c){var d=createjs.LoadItem.create(a);if(null==d)return null;var e="",f=c||this._basePath;if(d.src instanceof Object){if(!d.type)return null;if(b){e=b;var g=createjs.RequestUtils.parseURI(b);null==f||g.absolute||g.relative||(e=f+e)}else null!=f&&(e=f)}else{var h=createjs.RequestUtils.parseURI(d.src);h.extension&&(d.ext=h.extension),null==d.type&&(d.type=createjs.RequestUtils.getTypeByExtension(d.ext));var i=d.src;if(!h.absolute&&!h.relative)if(b){e=b;var g=createjs.RequestUtils.parseURI(b);i=b+i,null==f||g.absolute||g.relative||(e=f+e)}else null!=f&&(e=f);d.src=e+d.src}d.path=e,(void 0===d.id||null===d.id||""===d.id)&&(d.id=i);var j=this._typeCallbacks[d.type]||this._extensionCallbacks[d.ext];if(j){var k=j.callback.call(j.scope,d,this);if(k===!1)return null;k===!0||null!=k&&(d._loader=k),h=createjs.RequestUtils.parseURI(d.src),null!=h.extension&&(d.ext=h.extension)}return this._loadItemsById[d.id]=d,this._loadItemsBySrc[d.src]=d,null==d.crossOrigin&&(d.crossOrigin=this._crossOrigin),d},b._createLoader=function(a){if(null!=a._loader)return a._loader;for(var b=this.preferXHR,c=0;c<this._availableLoaders.length;c++){var d=this._availableLoaders[c];if(d&&d.canLoadItem(a))return new d(a,b)}return null},b._loadNext=function(){if(!this._paused){this._loadStartWasDispatched||(this._sendLoadStart(),this._loadStartWasDispatched=!0),this._numItems==this._numItemsLoaded?(this.loaded=!0,this._sendComplete(),this.next&&this.next.load&&this.next.load()):this.loaded=!1;for(var a=0;a<this._loadQueue.length&&!(this._currentLoads.length>=this._maxConnections);a++){var b=this._loadQueue[a];this._canStartLoad(b)&&(this._loadQueue.splice(a,1),a--,this._loadItem(b))}}},b._loadItem=function(a){a.on("fileload",this._handleFileLoad,this),a.on("progress",this._handleProgress,this),a.on("complete",this._handleFileComplete,this),a.on("error",this._handleError,this),a.on("fileerror",this._handleFileError,this),this._currentLoads.push(a),this._sendFileStart(a.getItem()),a.load()},b._handleFileLoad=function(a){a.target=null,this.dispatchEvent(a)},b._handleFileError=function(a){var b=new createjs.ErrorEvent("FILE_LOAD_ERROR",null,a.item);this._sendError(b)},b._handleError=function(a){var b=a.target;this._numItemsLoaded++,this._finishOrderedItem(b,!0),this._updateProgress();var c=new createjs.ErrorEvent("FILE_LOAD_ERROR",null,b.getItem());this._sendError(c),this.stopOnError?this.setPaused(!0):(this._removeLoadItem(b),this._cleanLoadItem(b),this._loadNext())},b._handleFileComplete=function(a){var b=a.target,c=b.getItem(),d=b.getResult();this._loadedResults[c.id]=d;var e=b.getResult(!0);null!=e&&e!==d&&(this._loadedRawResults[c.id]=e),this._saveLoadedItems(b),this._removeLoadItem(b),this._finishOrderedItem(b)||this._processFinishedLoad(c,b),this._cleanLoadItem(b)},b._saveLoadedItems=function(a){var b=a.getLoadedItems();if(null!==b)for(var c=0;c<b.length;c++){var d=b[c].item;this._loadItemsBySrc[d.src]=d,this._loadItemsById[d.id]=d,this._loadedResults[d.id]=b[c].result,this._loadedRawResults[d.id]=b[c].rawResult}},b._finishOrderedItem=function(a,b){var c=a.getItem();if(this.maintainScriptOrder&&c.type==createjs.LoadQueue.JAVASCRIPT||c.maintainOrder){a instanceof createjs.JavaScriptLoader&&(this._currentlyLoadingScript=!1);var d=createjs.indexOf(this._scriptOrder,c);return-1==d?!1:(this._loadedScripts[d]=b===!0?!0:c,this._checkScriptLoadOrder(),!0)}return!1},b._checkScriptLoadOrder=function(){for(var a=this._loadedScripts.length,b=0;a>b;b++){var c=this._loadedScripts[b];if(null===c)break;if(c!==!0){var d=this._loadedResults[c.id];c.type==createjs.LoadQueue.JAVASCRIPT&&createjs.DomUtils.appendToHead(d);var e=c._loader;this._processFinishedLoad(c,e),this._loadedScripts[b]=!0}}},b._processFinishedLoad=function(a,b){if(this._numItemsLoaded++,!this.maintainScriptOrder&&a.type==createjs.LoadQueue.JAVASCRIPT){var c=b.getTag();createjs.DomUtils.appendToHead(c)}this._updateProgress(),this._sendFileComplete(a,b),this._loadNext()},b._canStartLoad=function(a){if(!this.maintainScriptOrder||a.preferXHR)return!0;var b=a.getItem();if(b.type!=createjs.LoadQueue.JAVASCRIPT)return!0;if(this._currentlyLoadingScript)return!1;for(var c=this._scriptOrder.indexOf(b),d=0;c>d;){var e=this._loadedScripts[d];if(null==e)return!1;d++}return this._currentlyLoadingScript=!0,!0},b._removeLoadItem=function(a){for(var b=this._currentLoads.length,c=0;b>c;c++)if(this._currentLoads[c]==a){this._currentLoads.splice(c,1);break}},b._cleanLoadItem=function(a){var b=a.getItem();b&&delete b._loader},b._handleProgress=function(a){var b=a.target;this._sendFileProgress(b.getItem(),b.progress),this._updateProgress()},b._updateProgress=function(){var a=this._numItemsLoaded/this._numItems,b=this._numItems-this._numItemsLoaded;if(b>0){for(var c=0,d=0,e=this._currentLoads.length;e>d;d++)c+=this._currentLoads[d].progress;a+=c/b*(b/this._numItems)}this._lastProgress!=a&&(this._sendProgress(a),this._lastProgress=a)},b._disposeItem=function(a){delete this._loadedResults[a.id],delete this._loadedRawResults[a.id],delete this._loadItemsById[a.id],delete this._loadItemsBySrc[a.src]},b._sendFileProgress=function(a,b){if(!this._isCanceled()&&!this._paused&&this.hasEventListener("fileprogress")){var c=new createjs.Event("fileprogress");c.progress=b,c.loaded=b,c.total=1,c.item=a,this.dispatchEvent(c)}},b._sendFileComplete=function(a,b){
if(!this._isCanceled()&&!this._paused){var c=new createjs.Event("fileload");c.loader=b,c.item=a,c.result=this._loadedResults[a.id],c.rawResult=this._loadedRawResults[a.id],a.completeHandler&&a.completeHandler(c),this.hasEventListener("fileload")&&this.dispatchEvent(c)}},b._sendFileStart=function(a){var b=new createjs.Event("filestart");b.item=a,this.hasEventListener("filestart")&&this.dispatchEvent(b)},b.toString=function(){return"[PreloadJS LoadQueue]"},createjs.LoadQueue=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!0,createjs.AbstractLoader.TEXT)}var b=(createjs.extend(a,createjs.AbstractLoader),a);b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.TEXT},createjs.TextLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!0,createjs.AbstractLoader.BINARY),this.on("initialize",this._updateXHR,this)}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.AbstractLoader.BINARY},b._updateXHR=function(a){a.loader.setResponseType("arraybuffer")},createjs.BinaryLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractLoader_constructor(a,b,createjs.AbstractLoader.CSS),this.resultFormatter=this._formatResult,this._tagSrcAttribute="href",b?this._tag=document.createElement("style"):this._tag=document.createElement("link"),this._tag.rel="stylesheet",this._tag.type="text/css"}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.AbstractLoader.CSS},b._formatResult=function(a){if(this._preferXHR){var b=a.getTag();if(b.styleSheet)b.styleSheet.cssText=a.getResult(!0);else{var c=document.createTextNode(a.getResult(!0));b.appendChild(c)}}else b=this._tag;return createjs.DomUtils.appendToHead(b),b},createjs.CSSLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractLoader_constructor(a,b,createjs.AbstractLoader.IMAGE),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src",createjs.RequestUtils.isImageTag(a)?this._tag=a:createjs.RequestUtils.isImageTag(a.src)?this._tag=a.src:createjs.RequestUtils.isImageTag(a.tag)&&(this._tag=a.tag),null!=this._tag?this._preferXHR=!1:this._tag=document.createElement("img"),this.on("initialize",this._updateXHR,this)}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.AbstractLoader.IMAGE},b.load=function(){if(""!=this._tag.src&&this._tag.complete)return void this._sendComplete();var a=this._item.crossOrigin;1==a&&(a="Anonymous"),null==a||createjs.RequestUtils.isLocal(this._item.src)||(this._tag.crossOrigin=a),this.AbstractLoader_load()},b._updateXHR=function(a){a.loader.mimeType="text/plain; charset=x-user-defined-binary",a.loader.setResponseType&&a.loader.setResponseType("blob")},b._formatResult=function(a){return this._formatImage},b._formatImage=function(a,b){var c=this._tag,d=window.URL||window.webkitURL;if(this._preferXHR)if(d){var e=d.createObjectURL(this.getResult(!0));c.src=e,c.addEventListener("load",this._cleanUpURL,!1),c.addEventListener("error",this._cleanUpURL,!1)}else c.src=this._item.src;else;c.complete?a(c):(c.onload=createjs.proxy(function(){a(this._tag)},this),c.onerror=createjs.proxy(function(){b(_this._tag)},this))},b._cleanUpURL=function(a){var b=window.URL||window.webkitURL;b.revokeObjectURL(a.target.src)},createjs.ImageLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractLoader_constructor(a,b,createjs.AbstractLoader.JAVASCRIPT),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src",this.setTag(document.createElement("script"))}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.AbstractLoader.JAVASCRIPT},b._formatResult=function(a){var b=a.getTag();return this._preferXHR&&(b.text=a.getResult(!0)),b},createjs.JavaScriptLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!0,createjs.AbstractLoader.JSON),this.resultFormatter=this._formatResult}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.AbstractLoader.JSON},b._formatResult=function(a){var b=null;try{b=createjs.DataUtils.parseJSON(a.getResult(!0))}catch(c){var d=new createjs.ErrorEvent("JSON_FORMAT",null,c);return this._sendError(d),c}return b},createjs.JSONLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!1,createjs.AbstractLoader.JSONP),this.setTag(document.createElement("script")),this.getTag().type="text/javascript"}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.AbstractLoader.JSONP},b.cancel=function(){this.AbstractLoader_cancel(),this._dispose()},b.load=function(){if(null==this._item.callback)throw new Error("callback is required for loading JSONP requests.");if(null!=window[this._item.callback])throw new Error("JSONP callback '"+this._item.callback+"' already exists on window. You need to specify a different callback or re-name the current one.");window[this._item.callback]=createjs.proxy(this._handleLoad,this),window.document.body.appendChild(this._tag),this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout),this._tag.src=this._item.src},b._handleLoad=function(a){this._result=this._rawResult=a,this._sendComplete(),this._dispose()},b._handleTimeout=function(){this._dispose(),this.dispatchEvent(new createjs.ErrorEvent("timeout"))},b._dispose=function(){window.document.body.removeChild(this._tag),delete window[this._item.callback],clearTimeout(this._loadTimeout)},createjs.JSONPLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,null,createjs.AbstractLoader.MANIFEST),this.plugins=null,this._manifestQueue=null}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.MANIFEST_PROGRESS=.25,c.canLoadItem=function(a){return a.type==createjs.AbstractLoader.MANIFEST},b.load=function(){this.AbstractLoader_load()},b._createRequest=function(){var a=this._item.callback;null!=a?this._request=new createjs.JSONPLoader(this._item):this._request=new createjs.JSONLoader(this._item)},b.handleEvent=function(a){switch(a.type){case"complete":return this._rawResult=a.target.getResult(!0),this._result=a.target.getResult(),this._sendProgress(c.MANIFEST_PROGRESS),void this._loadManifest(this._result);case"progress":return a.loaded*=c.MANIFEST_PROGRESS,this.progress=a.loaded/a.total,(isNaN(this.progress)||this.progress==1/0)&&(this.progress=0),void this._sendProgress(a)}this.AbstractLoader_handleEvent(a)},b.destroy=function(){this.AbstractLoader_destroy(),this._manifestQueue.close()},b._loadManifest=function(a){if(a&&a.manifest){var b=this._manifestQueue=new createjs.LoadQueue;b.on("fileload",this._handleManifestFileLoad,this),b.on("progress",this._handleManifestProgress,this),b.on("complete",this._handleManifestComplete,this,!0),b.on("error",this._handleManifestError,this,!0);for(var c=0,d=this.plugins.length;d>c;c++)b.installPlugin(this.plugins[c]);b.loadManifest(a)}else this._sendComplete()},b._handleManifestFileLoad=function(a){a.target=null,this.dispatchEvent(a)},b._handleManifestComplete=function(a){this._loadedItems=this._manifestQueue.getItems(!0),this._sendComplete()},b._handleManifestProgress=function(a){this.progress=a.progress*(1-c.MANIFEST_PROGRESS)+c.MANIFEST_PROGRESS,this._sendProgress(this.progress)},b._handleManifestError=function(a){var b=new createjs.Event("fileerror");b.item=a.data,this.dispatchEvent(b)},createjs.ManifestLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractMediaLoader_constructor(a,b,createjs.AbstractLoader.SOUND),createjs.RequestUtils.isAudioTag(a)?this._tag=a:createjs.RequestUtils.isAudioTag(a.src)?this._tag=a:createjs.RequestUtils.isAudioTag(a.tag)&&(this._tag=createjs.RequestUtils.isAudioTag(a)?a:a.src),null!=this._tag&&(this._preferXHR=!1)}var b=createjs.extend(a,createjs.AbstractMediaLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.AbstractLoader.SOUND},b._createTag=function(a){var b=document.createElement("audio");return b.autoplay=!1,b.preload="none",b.src=a,b},createjs.SoundLoader=createjs.promote(a,"AbstractMediaLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractMediaLoader_constructor(a,b,createjs.AbstractLoader.VIDEO),createjs.RequestUtils.isVideoTag(a)||createjs.RequestUtils.isVideoTag(a.src)?(this.setTag(createjs.RequestUtils.isVideoTag(a)?a:a.src),this._preferXHR=!1):this.setTag(this._createTag())}var b=createjs.extend(a,createjs.AbstractMediaLoader),c=a;b._createTag=function(){return document.createElement("video")},c.canLoadItem=function(a){return a.type==createjs.AbstractLoader.VIDEO},createjs.VideoLoader=createjs.promote(a,"AbstractMediaLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractLoader_constructor(a,b,createjs.AbstractLoader.SPRITESHEET),this._manifestQueue=null}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.SPRITESHEET_PROGRESS=.25,c.canLoadItem=function(a){return a.type==createjs.AbstractLoader.SPRITESHEET},b.destroy=function(){this.AbstractLoader_destroy,this._manifestQueue.close()},b._createRequest=function(){var a=this._item.callback;null!=a?this._request=new createjs.JSONPLoader(this._item):this._request=new createjs.JSONLoader(this._item)},b.handleEvent=function(a){switch(a.type){case"complete":return this._rawResult=a.target.getResult(!0),this._result=a.target.getResult(),this._sendProgress(c.SPRITESHEET_PROGRESS),void this._loadManifest(this._result);case"progress":return a.loaded*=c.SPRITESHEET_PROGRESS,this.progress=a.loaded/a.total,(isNaN(this.progress)||this.progress==1/0)&&(this.progress=0),void this._sendProgress(a)}this.AbstractLoader_handleEvent(a)},b._loadManifest=function(a){if(a&&a.images){var b=this._manifestQueue=new createjs.LoadQueue(this._preferXHR,this._item.path,this._item.crossOrigin);b.on("complete",this._handleManifestComplete,this,!0),b.on("fileload",this._handleManifestFileLoad,this),b.on("progress",this._handleManifestProgress,this),b.on("error",this._handleManifestError,this,!0),b.loadManifest(a.images)}},b._handleManifestFileLoad=function(a){var b=a.result;if(null!=b){var c=this.getResult().images,d=c.indexOf(a.item.src);c[d]=b}},b._handleManifestComplete=function(a){this._result=new createjs.SpriteSheet(this._result),this._loadedItems=this._manifestQueue.getItems(!0),this._sendComplete()},b._handleManifestProgress=function(a){this.progress=a.progress*(1-c.SPRITESHEET_PROGRESS)+c.SPRITESHEET_PROGRESS,this._sendProgress(this.progress)},b._handleManifestError=function(a){var b=new createjs.Event("fileerror");b.item=a.data,this.dispatchEvent(b)},createjs.SpriteSheetLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractLoader_constructor(a,b,createjs.AbstractLoader.SVG),this.resultFormatter=this._formatResult,this._tagSrcAttribute="data",b?this.setTag(document.createElement("svg")):(this.setTag(document.createElement("object")),this.getTag().type="image/svg+xml")}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.AbstractLoader.SVG},b._formatResult=function(a){var b=createjs.DataUtils.parseXML(a.getResult(!0),"text/xml"),c=a.getTag();return!this._preferXHR&&document.body.contains(c)&&document.body.removeChild(c),null!=b.documentElement?(c.appendChild(b.documentElement),c.style.visibility="visible",c):b},createjs.SVGLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!0,createjs.AbstractLoader.XML),this.resultFormatter=this._formatResult}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.AbstractLoader.XML},b._formatResult=function(a){return createjs.DataUtils.parseXML(a.getResult(!0),"text/xml")},createjs.XMLLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){var a=createjs.SoundJS=createjs.SoundJS||{};a.version="0.6.2",a.buildDate="Thu, 26 Nov 2015 20:44:31 GMT"}(),this.createjs=this.createjs||{},createjs.indexOf=function(a,b){"use strict";for(var c=0,d=a.length;d>c;c++)if(b===a[c])return c;return-1},this.createjs=this.createjs||{},function(){"use strict";createjs.proxy=function(a,b){var c=Array.prototype.slice.call(arguments,2);return function(){return a.apply(b,Array.prototype.slice.call(arguments,0).concat(c))}}}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"BrowserDetect cannot be instantiated"}var b=a.agent=window.navigator.userAgent;a.isWindowPhone=b.indexOf("IEMobile")>-1||b.indexOf("Windows Phone")>-1,a.isFirefox=b.indexOf("Firefox")>-1,a.isOpera=null!=window.opera,a.isChrome=b.indexOf("Chrome")>-1,a.isIOS=(b.indexOf("iPod")>-1||b.indexOf("iPhone")>-1||b.indexOf("iPad")>-1)&&!a.isWindowPhone,a.isAndroid=b.indexOf("Android")>-1&&!a.isWindowPhone,a.isBlackberry=b.indexOf("Blackberry")>-1,createjs.BrowserDetect=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){this.interrupt=null,this.delay=null,this.offset=null,this.loop=null,this.volume=null,this.pan=null,this.startTime=null,this.duration=null},b=a.prototype={},c=a;c.create=function(a){if(a instanceof c||a instanceof Object){var b=new createjs.PlayPropsConfig;return b.set(a),b}throw new Error("Type not recognized.")},b.set=function(a){for(var b in a)this[b]=a[b];return this},b.toString=function(){return"[PlayPropsConfig]"},createjs.PlayPropsConfig=c}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"Sound cannot be instantiated"}function b(a,b){this.init(a,b)}var c=a;c.INTERRUPT_ANY="any",c.INTERRUPT_EARLY="early",c.INTERRUPT_LATE="late",c.INTERRUPT_NONE="none",c.PLAY_INITED="playInited",c.PLAY_SUCCEEDED="playSucceeded",c.PLAY_INTERRUPTED="playInterrupted",c.PLAY_FINISHED="playFinished",c.PLAY_FAILED="playFailed",c.SUPPORTED_EXTENSIONS=["mp3","ogg","opus","mpeg","wav","m4a","mp4","aiff","wma","mid"],c.EXTENSION_MAP={m4a:"mp4"},c.FILE_PATTERN=/^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([\/.]*?(?:[^?]+)?\/)?((?:[^\/?]+)\.(\w+))(?:\?(\S+)?)?$/,c.defaultInterruptBehavior=c.INTERRUPT_NONE,c.alternateExtensions=[],c.activePlugin=null,c._masterVolume=1,Object.defineProperty(c,"volume",{get:function(){return this._masterVolume},set:function(a){if(null==Number(a))return!1;if(a=Math.max(0,Math.min(1,a)),c._masterVolume=a,!this.activePlugin||!this.activePlugin.setVolume||!this.activePlugin.setVolume(a))for(var b=this._instances,d=0,e=b.length;e>d;d++)b[d].setMasterVolume(a)}}),c._masterMute=!1,Object.defineProperty(c,"muted",{get:function(){return this._masterMute},set:function(a){if(null==a)return!1;if(this._masterMute=a,!this.activePlugin||!this.activePlugin.setMute||!this.activePlugin.setMute(a))for(var b=this._instances,c=0,d=b.length;d>c;c++)b[c].setMasterMute(a);return!0}}),Object.defineProperty(c,"capabilities",{get:function(){return null==c.activePlugin?null:c.activePlugin._capabilities},set:function(a){return!1}}),c._pluginsRegistered=!1,c._lastID=0,c._instances=[],c._idHash={},c._preloadHash={},c._defaultPlayPropsHash={},c.addEventListener=null,c.removeEventListener=null,c.removeAllEventListeners=null,c.dispatchEvent=null,c.hasEventListener=null,c._listeners=null,createjs.EventDispatcher.initialize(c),c.getPreloadHandlers=function(){return{callback:createjs.proxy(c.initLoad,c),types:["sound"],extensions:c.SUPPORTED_EXTENSIONS}},c._handleLoadComplete=function(a){var b=a.target.getItem().src;if(c._preloadHash[b])for(var d=0,e=c._preloadHash[b].length;e>d;d++){var f=c._preloadHash[b][d];if(c._preloadHash[b][d]=!0,c.hasEventListener("fileload")){var a=new createjs.Event("fileload");a.src=f.src,a.id=f.id,a.data=f.data,a.sprite=f.sprite,c.dispatchEvent(a)}}},c._handleLoadError=function(a){var b=a.target.getItem().src;if(c._preloadHash[b])for(var d=0,e=c._preloadHash[b].length;e>d;d++){var f=c._preloadHash[b][d];if(c._preloadHash[b][d]=!1,c.hasEventListener("fileerror")){var a=new createjs.Event("fileerror");a.src=f.src,a.id=f.id,a.data=f.data,a.sprite=f.sprite,c.dispatchEvent(a)}}},c._registerPlugin=function(a){return a.isSupported()?(c.activePlugin=new a,!0):!1},c.registerPlugins=function(a){c._pluginsRegistered=!0;for(var b=0,d=a.length;d>b;b++)if(c._registerPlugin(a[b]))return!0;return!1},c.initializeDefaultPlugins=function(){return null!=c.activePlugin?!0:c._pluginsRegistered?!1:c.registerPlugins([createjs.WebAudioPlugin,createjs.HTMLAudioPlugin])?!0:!1},c.isReady=function(){return null!=c.activePlugin},c.getCapabilities=function(){return null==c.activePlugin?null:c.activePlugin._capabilities},c.getCapability=function(a){return null==c.activePlugin?null:c.activePlugin._capabilities[a]},c.initLoad=function(a){return c._registerSound(a)},c._registerSound=function(a){if(!c.initializeDefaultPlugins())return!1;var d;if(a.src instanceof Object?(d=c._parseSrc(a.src),d.src=a.path+d.src):d=c._parsePath(a.src),null==d)return!1;a.src=d.src,a.type="sound";var e=a.data,f=null;if(null!=e&&(isNaN(e.channels)?isNaN(e)||(f=parseInt(e)):f=parseInt(e.channels),e.audioSprite))for(var g,h=e.audioSprite.length;h--;)g=e.audioSprite[h],c._idHash[g.id]={src:a.src,startTime:parseInt(g.startTime),duration:parseInt(g.duration)},g.defaultPlayProps&&(c._defaultPlayPropsHash[g.id]=createjs.PlayPropsConfig.create(g.defaultPlayProps));null!=a.id&&(c._idHash[a.id]={src:a.src});var i=c.activePlugin.register(a);return b.create(a.src,f),null!=e&&isNaN(e)?a.data.channels=f||b.maxPerChannel():a.data=f||b.maxPerChannel(),i.type&&(a.type=i.type),a.defaultPlayProps&&(c._defaultPlayPropsHash[a.src]=createjs.PlayPropsConfig.create(a.defaultPlayProps)),i},c.registerSound=function(a,b,d,e,f){var g={src:a,id:b,data:d,defaultPlayProps:f};a instanceof Object&&a.src&&(e=b,g=a),g=createjs.LoadItem.create(g),g.path=e,null==e||g.src instanceof Object||(g.src=e+a);var h=c._registerSound(g);if(!h)return!1;if(c._preloadHash[g.src]||(c._preloadHash[g.src]=[]),c._preloadHash[g.src].push(g),1==c._preloadHash[g.src].length)h.on("complete",createjs.proxy(this._handleLoadComplete,this)),h.on("error",createjs.proxy(this._handleLoadError,this)),c.activePlugin.preload(h);else if(1==c._preloadHash[g.src][0])return!0;return g},c.registerSounds=function(a,b){var c=[];a.path&&(b?b+=a.path:b=a.path,a=a.manifest);for(var d=0,e=a.length;e>d;d++)c[d]=createjs.Sound.registerSound(a[d].src,a[d].id,a[d].data,b,a[d].defaultPlayProps);return c},c.removeSound=function(a,d){if(null==c.activePlugin)return!1;a instanceof Object&&a.src&&(a=a.src);var e;if(a instanceof Object?e=c._parseSrc(a):(a=c._getSrcById(a).src,e=c._parsePath(a)),null==e)return!1;a=e.src,null!=d&&(a=d+a);for(var f in c._idHash)c._idHash[f].src==a&&delete c._idHash[f];return b.removeSrc(a),delete c._preloadHash[a],c.activePlugin.removeSound(a),!0},c.removeSounds=function(a,b){var c=[];a.path&&(b?b+=a.path:b=a.path,a=a.manifest);for(var d=0,e=a.length;e>d;d++)c[d]=createjs.Sound.removeSound(a[d].src,b);return c},c.removeAllSounds=function(){c._idHash={},c._preloadHash={},b.removeAll(),c.activePlugin&&c.activePlugin.removeAllSounds()},c.loadComplete=function(a){if(!c.isReady())return!1;var b=c._parsePath(a);return a=b?c._getSrcById(b.src).src:c._getSrcById(a).src,void 0==c._preloadHash[a]?!1:1==c._preloadHash[a][0]},c._parsePath=function(a){"string"!=typeof a&&(a=a.toString());var b=a.match(c.FILE_PATTERN);if(null==b)return!1;for(var d=b[4],e=b[5],f=c.capabilities,g=0;!f[e];)if(e=c.alternateExtensions[g++],g>c.alternateExtensions.length)return null;a=a.replace("."+b[5],"."+e);var h={name:d,src:a,extension:e};return h},c._parseSrc=function(a){var b={name:void 0,src:void 0,extension:void 0},d=c.capabilities;for(var e in a)if(a.hasOwnProperty(e)&&d[e]){b.src=a[e],b.extension=e;break}if(!b.src)return!1;var f=b.src.lastIndexOf("/");return-1!=f?b.name=b.src.slice(f+1):b.name=b.src,b},c.play=function(a,b,d,e,f,g,h,i,j){var k;k=b instanceof Object||b instanceof createjs.PlayPropsConfig?createjs.PlayPropsConfig.create(b):createjs.PlayPropsConfig.create({interrupt:b,delay:d,offset:e,loop:f,volume:g,pan:h,startTime:i,duration:j});var l=c.createInstance(a,k.startTime,k.duration),m=c._playInstance(l,k);return m||l._playFailed(),l},c.createInstance=function(a,d,e){if(!c.initializeDefaultPlugins())return new createjs.DefaultSoundInstance(a,d,e);var f=c._defaultPlayPropsHash[a];a=c._getSrcById(a);var g=c._parsePath(a.src),h=null;return null!=g&&null!=g.src?(b.create(g.src),null==d&&(d=a.startTime),h=c.activePlugin.create(g.src,d,e||a.duration),f=f||c._defaultPlayPropsHash[g.src],f&&h.applyPlayProps(f)):h=new createjs.DefaultSoundInstance(a,d,e),h.uniqueId=c._lastID++,h},c.stop=function(){for(var a=this._instances,b=a.length;b--;)a[b].stop()},c.setVolume=function(a){if(null==Number(a))return!1;if(a=Math.max(0,Math.min(1,a)),c._masterVolume=a,!this.activePlugin||!this.activePlugin.setVolume||!this.activePlugin.setVolume(a))for(var b=this._instances,d=0,e=b.length;e>d;d++)b[d].setMasterVolume(a)},c.getVolume=function(){return this._masterVolume},c.setMute=function(a){if(null==a)return!1;if(this._masterMute=a,!this.activePlugin||!this.activePlugin.setMute||!this.activePlugin.setMute(a))for(var b=this._instances,c=0,d=b.length;d>c;c++)b[c].setMasterMute(a);return!0},c.getMute=function(){return this._masterMute},c.setDefaultPlayProps=function(a,b){a=c._getSrcById(a),c._defaultPlayPropsHash[c._parsePath(a.src).src]=createjs.PlayPropsConfig.create(b)},c.getDefaultPlayProps=function(a){return a=c._getSrcById(a),c._defaultPlayPropsHash[c._parsePath(a.src).src]},c._playInstance=function(a,b){var d=c._defaultPlayPropsHash[a.src]||{};if(null==b.interrupt&&(b.interrupt=d.interrupt||c.defaultInterruptBehavior),null==b.delay&&(b.delay=d.delay||0),null==b.offset&&(b.offset=a.getPosition()),null==b.loop&&(b.loop=a.loop),null==b.volume&&(b.volume=a.volume),null==b.pan&&(b.pan=a.pan),0==b.delay){var e=c._beginPlaying(a,b);if(!e)return!1}else{var f=setTimeout(function(){c._beginPlaying(a,b)},b.delay);a.delayTimeoutId=f}return this._instances.push(a),!0},c._beginPlaying=function(a,c){if(!b.add(a,c.interrupt))return!1;var d=a._beginPlaying(c);if(!d){var e=createjs.indexOf(this._instances,a);return e>-1&&this._instances.splice(e,1),!1}return!0},c._getSrcById=function(a){return c._idHash[a]||{src:a}},c._playFinished=function(a){b.remove(a);var c=createjs.indexOf(this._instances,a);c>-1&&this._instances.splice(c,1)},createjs.Sound=a,b.channels={},b.create=function(a,c){var d=b.get(a);return null==d?(b.channels[a]=new b(a,c),!0):!1},b.removeSrc=function(a){var c=b.get(a);return null==c?!1:(c._removeAll(),delete b.channels[a],!0)},b.removeAll=function(){for(var a in b.channels)b.channels[a]._removeAll();b.channels={}},b.add=function(a,c){var d=b.get(a.src);return null==d?!1:d._add(a,c)},b.remove=function(a){var c=b.get(a.src);return null==c?!1:(c._remove(a),!0)},b.maxPerChannel=function(){return d.maxDefault},b.get=function(a){return b.channels[a]};var d=b.prototype;d.constructor=b,d.src=null,d.max=null,d.maxDefault=100,d.length=0,d.init=function(a,b){this.src=a,this.max=b||this.maxDefault,-1==this.max&&(this.max=this.maxDefault),this._instances=[]},d._get=function(a){return this._instances[a]},d._add=function(a,b){return this._getSlot(b,a)?(this._instances.push(a),this.length++,!0):!1},d._remove=function(a){var b=createjs.indexOf(this._instances,a);return-1==b?!1:(this._instances.splice(b,1),this.length--,!0)},d._removeAll=function(){for(var a=this.length-1;a>=0;a--)this._instances[a].stop()},d._getSlot=function(b,c){var d,e;if(b!=a.INTERRUPT_NONE&&(e=this._get(0),null==e))return!0;for(var f=0,g=this.max;g>f;f++){if(d=this._get(f),null==d)return!0;if(d.playState==a.PLAY_FINISHED||d.playState==a.PLAY_INTERRUPTED||d.playState==a.PLAY_FAILED){e=d;break}b!=a.INTERRUPT_NONE&&(b==a.INTERRUPT_EARLY&&d.getPosition()<e.getPosition()||b==a.INTERRUPT_LATE&&d.getPosition()>e.getPosition())&&(e=d)}return null!=e?(e._interrupt(),this._remove(e),!0):!1},d.toString=function(){return"[Sound SoundChannel]"}}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d){this.EventDispatcher_constructor(),this.src=a,this.uniqueId=-1,this.playState=null,this.delayTimeoutId=null,this._volume=1,Object.defineProperty(this,"volume",{get:this.getVolume,set:this.setVolume}),this._pan=0,Object.defineProperty(this,"pan",{get:this.getPan,set:this.setPan}),this._startTime=Math.max(0,b||0),Object.defineProperty(this,"startTime",{get:this.getStartTime,set:this.setStartTime}),this._duration=Math.max(0,c||0),Object.defineProperty(this,"duration",{get:this.getDuration,set:this.setDuration}),this._playbackResource=null,Object.defineProperty(this,"playbackResource",{get:this.getPlaybackResource,set:this.setPlaybackResource}),d!==!1&&d!==!0&&this.setPlaybackResource(d),this._position=0,Object.defineProperty(this,"position",{get:this.getPosition,set:this.setPosition}),this._loop=0,Object.defineProperty(this,"loop",{get:this.getLoop,set:this.setLoop}),this._muted=!1,Object.defineProperty(this,"muted",{get:this.getMuted,set:this.setMuted}),this._paused=!1,Object.defineProperty(this,"paused",{get:this.getPaused,set:this.setPaused})},b=createjs.extend(a,createjs.EventDispatcher);b.play=function(a,b,c,d,e,f){var g;return g=a instanceof Object||a instanceof createjs.PlayPropsConfig?createjs.PlayPropsConfig.create(a):createjs.PlayPropsConfig.create({interrupt:a,delay:b,offset:c,loop:d,volume:e,pan:f}),this.playState==createjs.Sound.PLAY_SUCCEEDED?(this.applyPlayProps(g),void(this._paused&&this.setPaused(!1))):(this._cleanUp(),createjs.Sound._playInstance(this,g),this)},b.stop=function(){return this._position=0,this._paused=!1,this._handleStop(),this._cleanUp(),this.playState=createjs.Sound.PLAY_FINISHED,this},b.destroy=function(){this._cleanUp(),this.src=null,this.playbackResource=null,this.removeAllEventListeners()},b.applyPlayProps=function(a){return null!=a.offset&&this.setPosition(a.offset),null!=a.loop&&this.setLoop(a.loop),null!=a.volume&&this.setVolume(a.volume),null!=a.pan&&this.setPan(a.pan),null!=a.startTime&&(this.setStartTime(a.startTime),this.setDuration(a.duration)),this},b.toString=function(){return"[AbstractSoundInstance]"},b.getPaused=function(){return this._paused},b.setPaused=function(a){return a!==!0&&a!==!1||this._paused==a||1==a&&this.playState!=createjs.Sound.PLAY_SUCCEEDED?void 0:(this._paused=a,a?this._pause():this._resume(),clearTimeout(this.delayTimeoutId),this)},b.setVolume=function(a){return a==this._volume?this:(this._volume=Math.max(0,Math.min(1,a)),this._muted||this._updateVolume(),this)},b.getVolume=function(){return this._volume},b.setMuted=function(a){return a===!0||a===!1?(this._muted=a,this._updateVolume(),this):void 0},b.getMuted=function(){return this._muted},b.setPan=function(a){return a==this._pan?this:(this._pan=Math.max(-1,Math.min(1,a)),this._updatePan(),this)},b.getPan=function(){return this._pan},b.getPosition=function(){return this._paused||this.playState!=createjs.Sound.PLAY_SUCCEEDED||(this._position=this._calculateCurrentPosition()),this._position},b.setPosition=function(a){return this._position=Math.max(0,a),this.playState==createjs.Sound.PLAY_SUCCEEDED&&this._updatePosition(),this},b.getStartTime=function(){return this._startTime},b.setStartTime=function(a){return a==this._startTime?this:(this._startTime=Math.max(0,a||0),this._updateStartTime(),this)},b.getDuration=function(){return this._duration},b.setDuration=function(a){return a==this._duration?this:(this._duration=Math.max(0,a||0),this._updateDuration(),this)},b.setPlaybackResource=function(a){return this._playbackResource=a,0==this._duration&&this._setDurationFromSource(),this},b.getPlaybackResource=function(){return this._playbackResource},b.getLoop=function(){return this._loop},b.setLoop=function(a){null!=this._playbackResource&&(0!=this._loop&&0==a?this._removeLooping(a):0==this._loop&&0!=a&&this._addLooping(a)),this._loop=a},b._sendEvent=function(a){var b=new createjs.Event(a);this.dispatchEvent(b)},b._cleanUp=function(){clearTimeout(this.delayTimeoutId),this._handleCleanUp(),this._paused=!1,createjs.Sound._playFinished(this)},b._interrupt=function(){this._cleanUp(),this.playState=createjs.Sound.PLAY_INTERRUPTED,this._sendEvent("interrupted")},b._beginPlaying=function(a){return this.setPosition(a.offset),this.setLoop(a.loop),this.setVolume(a.volume),this.setPan(a.pan),null!=a.startTime&&(this.setStartTime(a.startTime),this.setDuration(a.duration)),null!=this._playbackResource&&this._position<this._duration?(this._paused=!1,this._handleSoundReady(),this.playState=createjs.Sound.PLAY_SUCCEEDED,this._sendEvent("succeeded"),!0):(this._playFailed(),!1)},b._playFailed=function(){this._cleanUp(),this.playState=createjs.Sound.PLAY_FAILED,this._sendEvent("failed")},b._handleSoundComplete=function(a){return this._position=0,0!=this._loop?(this._loop--,this._handleLoop(),void this._sendEvent("loop")):(this._cleanUp(),this.playState=createjs.Sound.PLAY_FINISHED,void this._sendEvent("complete"))},b._handleSoundReady=function(){},b._updateVolume=function(){},b._updatePan=function(){},b._updateStartTime=function(){},b._updateDuration=function(){},b._setDurationFromSource=function(){},b._calculateCurrentPosition=function(){},b._updatePosition=function(){},b._removeLooping=function(a){},b._addLooping=function(a){},b._pause=function(){},b._resume=function(){},b._handleStop=function(){},b._handleCleanUp=function(){},b._handleLoop=function(){},createjs.AbstractSoundInstance=createjs.promote(a,"EventDispatcher"),createjs.DefaultSoundInstance=createjs.AbstractSoundInstance}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){this._capabilities=null,this._loaders={},this._audioSources={},this._soundInstances={},this._volume=1,this._loaderClass,this._soundInstanceClass},b=a.prototype;a._capabilities=null,a.isSupported=function(){return!0},b.register=function(a){var b=this._loaders[a.src];return b&&!b.canceled?this._loaders[a.src]:(this._audioSources[a.src]=!0,this._soundInstances[a.src]=[],b=new this._loaderClass(a),b.on("complete",this._handlePreloadComplete,this),this._loaders[a.src]=b,b)},b.preload=function(a){a.on("error",this._handlePreloadError,this),a.load()},b.isPreloadStarted=function(a){return null!=this._audioSources[a]},b.isPreloadComplete=function(a){return!(null==this._audioSources[a]||1==this._audioSources[a])},b.removeSound=function(a){if(this._soundInstances[a]){for(var b=this._soundInstances[a].length;b--;){var c=this._soundInstances[a][b];c.destroy()}delete this._soundInstances[a],delete this._audioSources[a],this._loaders[a]&&this._loaders[a].destroy(),delete this._loaders[a]}},b.removeAllSounds=function(){for(var a in this._audioSources)this.removeSound(a)},b.create=function(a,b,c){this.isPreloadStarted(a)||this.preload(this.register(a));var d=new this._soundInstanceClass(a,b,c,this._audioSources[a]);return this._soundInstances[a].push(d),d},b.setVolume=function(a){return this._volume=a,this._updateVolume(),!0},b.getVolume=function(){return this._volume},b.setMute=function(a){return this._updateVolume(),!0},b.toString=function(){return"[AbstractPlugin]"},b._handlePreloadComplete=function(a){var b=a.target.getItem().src;this._audioSources[b]=a.result;for(var c=0,d=this._soundInstances[b].length;d>c;c++){var e=this._soundInstances[b][c];e.setPlaybackResource(this._audioSources[b]);
}},b._handlePreloadError=function(a){},b._updateVolume=function(){},createjs.AbstractPlugin=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!0,createjs.AbstractLoader.SOUND)}var b=createjs.extend(a,createjs.AbstractLoader);a.context=null,b.toString=function(){return"[WebAudioLoader]"},b._createRequest=function(){this._request=new createjs.XHRRequest(this._item,!1),this._request.setResponseType("arraybuffer")},b._sendComplete=function(b){a.context.decodeAudioData(this._rawResult,createjs.proxy(this._handleAudioDecoded,this),createjs.proxy(this._sendError,this))},b._handleAudioDecoded=function(a){this._result=a,this.AbstractLoader__sendComplete()},createjs.WebAudioLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,d,e){this.AbstractSoundInstance_constructor(a,b,d,e),this.gainNode=c.context.createGain(),this.panNode=c.context.createPanner(),this.panNode.panningModel=c._panningModel,this.panNode.connect(this.gainNode),this._updatePan(),this.sourceNode=null,this._soundCompleteTimeout=null,this._sourceNodeNext=null,this._playbackStartTime=0,this._endedHandler=createjs.proxy(this._handleSoundComplete,this)}var b=createjs.extend(a,createjs.AbstractSoundInstance),c=a;c.context=null,c._scratchBuffer=null,c.destinationNode=null,c._panningModel="equalpower",b.destroy=function(){this.AbstractSoundInstance_destroy(),this.panNode.disconnect(0),this.panNode=null,this.gainNode.disconnect(0),this.gainNode=null},b.toString=function(){return"[WebAudioSoundInstance]"},b._updatePan=function(){this.panNode.setPosition(this._pan,0,-.5)},b._removeLooping=function(a){this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext)},b._addLooping=function(a){this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._sourceNodeNext=this._createAndPlayAudioNode(this._playbackStartTime,0))},b._setDurationFromSource=function(){this._duration=1e3*this.playbackResource.duration},b._handleCleanUp=function(){this.sourceNode&&this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this.sourceNode=this._cleanUpAudioNode(this.sourceNode),this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext)),0!=this.gainNode.numberOfOutputs&&this.gainNode.disconnect(0),clearTimeout(this._soundCompleteTimeout),this._playbackStartTime=0},b._cleanUpAudioNode=function(a){if(a){a.stop(0),a.disconnect(0);try{a.buffer=c._scratchBuffer}catch(b){}a=null}return a},b._handleSoundReady=function(a){this.gainNode.connect(c.destinationNode);var b=.001*this._duration,d=.001*this._position;d>b&&(d=b),this.sourceNode=this._createAndPlayAudioNode(c.context.currentTime-b,d),this._playbackStartTime=this.sourceNode.startTime-d,this._soundCompleteTimeout=setTimeout(this._endedHandler,1e3*(b-d)),0!=this._loop&&(this._sourceNodeNext=this._createAndPlayAudioNode(this._playbackStartTime,0))},b._createAndPlayAudioNode=function(a,b){var d=c.context.createBufferSource();d.buffer=this.playbackResource,d.connect(this.panNode);var e=.001*this._duration;return d.startTime=a+e,d.start(d.startTime,b+.001*this._startTime,e-b),d},b._pause=function(){this._position=1e3*(c.context.currentTime-this._playbackStartTime),this.sourceNode=this._cleanUpAudioNode(this.sourceNode),this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext),0!=this.gainNode.numberOfOutputs&&this.gainNode.disconnect(0),clearTimeout(this._soundCompleteTimeout)},b._resume=function(){this._handleSoundReady()},b._updateVolume=function(){var a=this._muted?0:this._volume;a!=this.gainNode.gain.value&&(this.gainNode.gain.value=a)},b._calculateCurrentPosition=function(){return 1e3*(c.context.currentTime-this._playbackStartTime)},b._updatePosition=function(){this.sourceNode=this._cleanUpAudioNode(this.sourceNode),this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext),clearTimeout(this._soundCompleteTimeout),this._paused||this._handleSoundReady()},b._handleLoop=function(){this._cleanUpAudioNode(this.sourceNode),this.sourceNode=this._sourceNodeNext,this._playbackStartTime=this.sourceNode.startTime,this._sourceNodeNext=this._createAndPlayAudioNode(this._playbackStartTime,0),this._soundCompleteTimeout=setTimeout(this._endedHandler,this._duration)},b._updateDuration=function(){this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._pause(),this._resume())},createjs.WebAudioSoundInstance=createjs.promote(a,"AbstractSoundInstance")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.AbstractPlugin_constructor(),this._panningModel=c._panningModel,this.context=c.context,this.dynamicsCompressorNode=this.context.createDynamicsCompressor(),this.dynamicsCompressorNode.connect(this.context.destination),this.gainNode=this.context.createGain(),this.gainNode.connect(this.dynamicsCompressorNode),createjs.WebAudioSoundInstance.destinationNode=this.gainNode,this._capabilities=c._capabilities,this._loaderClass=createjs.WebAudioLoader,this._soundInstanceClass=createjs.WebAudioSoundInstance,this._addPropsToClasses()}var b=createjs.extend(a,createjs.AbstractPlugin),c=a;c._capabilities=null,c._panningModel="equalpower",c.context=null,c._scratchBuffer=null,c._unlocked=!1,c.isSupported=function(){var a=createjs.BrowserDetect.isIOS||createjs.BrowserDetect.isAndroid||createjs.BrowserDetect.isBlackberry;return"file:"!=location.protocol||a||this._isFileXHRSupported()?(c._generateCapabilities(),null==c.context?!1:!0):!1},c.playEmptySound=function(){if(null!=c.context){var a=c.context.createBufferSource();a.buffer=c._scratchBuffer,a.connect(c.context.destination),a.start(0,0,0)}},c._isFileXHRSupported=function(){var a=!0,b=new XMLHttpRequest;try{b.open("GET","WebAudioPluginTest.fail",!1)}catch(c){return a=!1}b.onerror=function(){a=!1},b.onload=function(){a=404==this.status||200==this.status||0==this.status&&""!=this.response};try{b.send()}catch(c){a=!1}return a},c._generateCapabilities=function(){if(null==c._capabilities){var a=document.createElement("audio");if(null==a.canPlayType)return null;if(null==c.context)if(window.AudioContext)c.context=new AudioContext;else{if(!window.webkitAudioContext)return null;c.context=new webkitAudioContext}null==c._scratchBuffer&&(c._scratchBuffer=c.context.createBuffer(1,1,22050)),c._compatibilitySetUp(),"ontouchstart"in window&&"running"!=c.context.state&&(c._unlock(),document.addEventListener("mousedown",c._unlock,!0),document.addEventListener("touchend",c._unlock,!0)),c._capabilities={panning:!0,volume:!0,tracks:-1};for(var b=createjs.Sound.SUPPORTED_EXTENSIONS,d=createjs.Sound.EXTENSION_MAP,e=0,f=b.length;f>e;e++){var g=b[e],h=d[g]||g;c._capabilities[g]="no"!=a.canPlayType("audio/"+g)&&""!=a.canPlayType("audio/"+g)||"no"!=a.canPlayType("audio/"+h)&&""!=a.canPlayType("audio/"+h)}c.context.destination.numberOfChannels<2&&(c._capabilities.panning=!1)}},c._compatibilitySetUp=function(){if(c._panningModel="equalpower",!c.context.createGain){c.context.createGain=c.context.createGainNode;var a=c.context.createBufferSource();a.__proto__.start=a.__proto__.noteGrainOn,a.__proto__.stop=a.__proto__.noteOff,c._panningModel=0}},c._unlock=function(){c._unlocked||(c.playEmptySound(),"running"==c.context.state&&(document.removeEventListener("mousedown",c._unlock,!0),document.removeEventListener("touchend",c._unlock,!0),c._unlocked=!0))},b.toString=function(){return"[WebAudioPlugin]"},b._addPropsToClasses=function(){var a=this._soundInstanceClass;a.context=this.context,a._scratchBuffer=c._scratchBuffer,a.destinationNode=this.gainNode,a._panningModel=this._panningModel,this._loaderClass.context=this.context},b._updateVolume=function(){var a=createjs.Sound._masterMute?0:this._volume;a!=this.gainNode.gain.value&&(this.gainNode.gain.value=a)},createjs.WebAudioPlugin=createjs.promote(a,"AbstractPlugin")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"HTMLAudioTagPool cannot be instantiated"}function b(a){this._tags=[]}var c=a;c._tags={},c._tagPool=new b,c._tagUsed={},c.get=function(a){var b=c._tags[a];return null==b?(b=c._tags[a]=c._tagPool.get(),b.src=a):c._tagUsed[a]?(b=c._tagPool.get(),b.src=a):c._tagUsed[a]=!0,b},c.set=function(a,b){b==c._tags[a]?c._tagUsed[a]=!1:c._tagPool.set(b)},c.remove=function(a){var b=c._tags[a];return null==b?!1:(c._tagPool.set(b),delete c._tags[a],delete c._tagUsed[a],!0)},c.getDuration=function(a){var b=c._tags[a];return null!=b&&b.duration?1e3*b.duration:0},createjs.HTMLAudioTagPool=a;var d=b.prototype;d.constructor=b,d.get=function(){var a;return a=0==this._tags.length?this._createTag():this._tags.pop(),null==a.parentNode&&document.body.appendChild(a),a},d.set=function(a){var b=createjs.indexOf(this._tags,a);-1==b&&(this._tags.src=null,this._tags.push(a))},d.toString=function(){return"[TagPool]"},d._createTag=function(){var a=document.createElement("audio");return a.autoplay=!1,a.preload="none",a}}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.AbstractSoundInstance_constructor(a,b,c,d),this._audioSpriteStopTime=null,this._delayTimeoutId=null,this._endedHandler=createjs.proxy(this._handleSoundComplete,this),this._readyHandler=createjs.proxy(this._handleTagReady,this),this._stalledHandler=createjs.proxy(this._playFailed,this),this._audioSpriteEndHandler=createjs.proxy(this._handleAudioSpriteLoop,this),this._loopHandler=createjs.proxy(this._handleSoundComplete,this),c?this._audioSpriteStopTime=.001*(b+c):this._duration=createjs.HTMLAudioTagPool.getDuration(this.src)}var b=createjs.extend(a,createjs.AbstractSoundInstance);b.setMasterVolume=function(a){this._updateVolume()},b.setMasterMute=function(a){this._updateVolume()},b.toString=function(){return"[HTMLAudioSoundInstance]"},b._removeLooping=function(){null!=this._playbackResource&&(this._playbackResource.loop=!1,this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1))},b._addLooping=function(){null==this._playbackResource||this._audioSpriteStopTime||(this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),this._playbackResource.loop=!0)},b._handleCleanUp=function(){var a=this._playbackResource;if(null!=a){a.pause(),a.loop=!1,a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED,this._stalledHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1);try{a.currentTime=this._startTime}catch(b){}createjs.HTMLAudioTagPool.set(this.src,a),this._playbackResource=null}},b._beginPlaying=function(a){return this._playbackResource=createjs.HTMLAudioTagPool.get(this.src),this.AbstractSoundInstance__beginPlaying(a)},b._handleSoundReady=function(a){if(4!==this._playbackResource.readyState){var b=this._playbackResource;return b.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),b.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED,this._stalledHandler,!1),b.preload="auto",void b.load()}this._updateVolume(),this._playbackResource.currentTime=.001*(this._startTime+this._position),this._audioSpriteStopTime?this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1):(this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),0!=this._loop&&(this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),this._playbackResource.loop=!0)),this._playbackResource.play()},b._handleTagReady=function(a){this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED,this._stalledHandler,!1),this._handleSoundReady()},b._pause=function(){this._playbackResource.pause()},b._resume=function(){this._playbackResource.play()},b._updateVolume=function(){if(null!=this._playbackResource){var a=this._muted||createjs.Sound._masterMute?0:this._volume*createjs.Sound._masterVolume;a!=this._playbackResource.volume&&(this._playbackResource.volume=a)}},b._calculateCurrentPosition=function(){return 1e3*this._playbackResource.currentTime-this._startTime},b._updatePosition=function(){this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._handleSetPositionSeek,!1);try{this._playbackResource.currentTime=.001*(this._position+this._startTime)}catch(a){this._handleSetPositionSeek(null)}},b._handleSetPositionSeek=function(a){null!=this._playbackResource&&(this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._handleSetPositionSeek,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1))},b._handleAudioSpriteLoop=function(a){this._playbackResource.currentTime<=this._audioSpriteStopTime||(this._playbackResource.pause(),0==this._loop?this._handleSoundComplete(null):(this._position=0,this._loop--,this._playbackResource.currentTime=.001*this._startTime,this._paused||this._playbackResource.play(),this._sendEvent("loop")))},b._handleLoop=function(a){0==this._loop&&(this._playbackResource.loop=!1,this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1))},b._updateStartTime=function(){this._audioSpriteStopTime=.001*(this._startTime+this._duration),this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1))},b._updateDuration=function(){this._audioSpriteStopTime=.001*(this._startTime+this._duration),this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1))},b._setDurationFromSource=function(){this._duration=createjs.HTMLAudioTagPool.getDuration(this.src),this._playbackResource=null},createjs.HTMLAudioSoundInstance=createjs.promote(a,"AbstractSoundInstance")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.AbstractPlugin_constructor(),this.defaultNumChannels=2,this._capabilities=c._capabilities,this._loaderClass=createjs.SoundLoader,this._soundInstanceClass=createjs.HTMLAudioSoundInstance}var b=createjs.extend(a,createjs.AbstractPlugin),c=a;c.MAX_INSTANCES=30,c._AUDIO_READY="canplaythrough",c._AUDIO_ENDED="ended",c._AUDIO_SEEKED="seeked",c._AUDIO_STALLED="stalled",c._TIME_UPDATE="timeupdate",c._capabilities=null,c.isSupported=function(){return c._generateCapabilities(),null!=c._capabilities},c._generateCapabilities=function(){if(null==c._capabilities){var a=document.createElement("audio");if(null==a.canPlayType)return null;c._capabilities={panning:!1,volume:!0,tracks:-1};for(var b=createjs.Sound.SUPPORTED_EXTENSIONS,d=createjs.Sound.EXTENSION_MAP,e=0,f=b.length;f>e;e++){var g=b[e],h=d[g]||g;c._capabilities[g]="no"!=a.canPlayType("audio/"+g)&&""!=a.canPlayType("audio/"+g)||"no"!=a.canPlayType("audio/"+h)&&""!=a.canPlayType("audio/"+h)}}},b.register=function(a){var b=createjs.HTMLAudioTagPool.get(a.src),c=this.AbstractPlugin_register(a);return c.setTag(b),c},b.removeSound=function(a){this.AbstractPlugin_removeSound(a),createjs.HTMLAudioTagPool.remove(a)},b.create=function(a,b,c){var d=this.AbstractPlugin_create(a,b,c);return d.setPlaybackResource(null),d},b.toString=function(){return"[HTMLAudioPlugin]"},b.setVolume=b.getVolume=b.setMute=null,createjs.HTMLAudioPlugin=createjs.promote(a,"AbstractPlugin")}(),this.createjs=this.createjs||{},function(){"use strict";function a(b,c,d){this.ignoreGlobalPause=!1,this.loop=!1,this.duration=0,this.pluginData=d||{},this.target=b,this.position=null,this.passive=!1,this._paused=!1,this._curQueueProps={},this._initQueueProps={},this._steps=[],this._actions=[],this._prevPosition=0,this._stepPosition=0,this._prevPos=-1,this._target=b,this._useTicks=!1,this._inited=!1,this._registered=!1,c&&(this._useTicks=c.useTicks,this.ignoreGlobalPause=c.ignoreGlobalPause,this.loop=c.loop,c.onChange&&this.addEventListener("change",c.onChange),c.override&&a.removeTweens(b)),c&&c.paused?this._paused=!0:createjs.Tween._register(this,!0),c&&null!=c.position&&this.setPosition(c.position,a.NONE)}var b=createjs.extend(a,createjs.EventDispatcher);a.NONE=0,a.LOOP=1,a.REVERSE=2,a.IGNORE={},a._tweens=[],a._plugins={},a.get=function(b,c,d,e){return e&&a.removeTweens(b),new a(b,c,d)},a.tick=function(b,c){for(var d=a._tweens.slice(),e=d.length-1;e>=0;e--){var f=d[e];c&&!f.ignoreGlobalPause||f._paused||f.tick(f._useTicks?1:b)}},a.handleEvent=function(a){"tick"==a.type&&this.tick(a.delta,a.paused)},a.removeTweens=function(b){if(b.tweenjs_count){for(var c=a._tweens,d=c.length-1;d>=0;d--){var e=c[d];e._target==b&&(e._paused=!0,c.splice(d,1))}b.tweenjs_count=0}},a.removeAllTweens=function(){for(var b=a._tweens,c=0,d=b.length;d>c;c++){var e=b[c];e._paused=!0,e.target&&(e.target.tweenjs_count=0)}b.length=0},a.hasActiveTweens=function(b){return b?null!=b.tweenjs_count&&!!b.tweenjs_count:a._tweens&&!!a._tweens.length},a.installPlugin=function(b,c){var d=b.priority;null==d&&(b.priority=d=0);for(var e=0,f=c.length,g=a._plugins;f>e;e++){var h=c[e];if(g[h]){for(var i=g[h],j=0,k=i.length;k>j&&!(d<i[j].priority);j++);g[h].splice(j,0,b)}else g[h]=[b]}},a._register=function(b,c){var d=b._target,e=a._tweens;if(c&&!b._registered)d&&(d.tweenjs_count=d.tweenjs_count?d.tweenjs_count+1:1),e.push(b),!a._inited&&createjs.Ticker&&(createjs.Ticker.addEventListener("tick",a),a._inited=!0);else if(!c&&b._registered){d&&d.tweenjs_count--;for(var f=e.length;f--;)if(e[f]==b){e.splice(f,1);break}}b._registered=c},b.wait=function(a,b){if(null==a||0>=a)return this;var c=this._cloneProps(this._curQueueProps);return this._addStep({d:a,p0:c,e:this._linearEase,p1:c,v:b})},b.to=function(a,b,c){return(isNaN(b)||0>b)&&(b=0),this._addStep({d:b||0,p0:this._cloneProps(this._curQueueProps),e:c,p1:this._cloneProps(this._appendQueueProps(a))})},b.call=function(a,b,c){return this._addAction({f:a,p:b?b:[this],o:c?c:this._target})},b.set=function(a,b){return this._addAction({f:this._set,o:this,p:[a,b?b:this._target]})},b.play=function(a){return a||(a=this),this.call(a.setPaused,[!1],a)},b.pause=function(a){return a||(a=this),this.call(a.setPaused,[!0],a)},b.setPosition=function(a,b){0>a&&(a=0),null==b&&(b=1);var c=a,d=!1;if(c>=this.duration&&(this.loop?c%=this.duration:(c=this.duration,d=!0)),c==this._prevPos)return d;var e=this._prevPos;if(this.position=this._prevPos=c,this._prevPosition=a,this._target)if(d)this._updateTargetProps(null,1);else if(this._steps.length>0){for(var f=0,g=this._steps.length;g>f&&!(this._steps[f].t>c);f++);var h=this._steps[f-1];this._updateTargetProps(h,(this._stepPosition=c-h.t)/h.d)}return 0!=b&&this._actions.length>0&&(this._useTicks?this._runActions(c,c):1==b&&e>c?(e!=this.duration&&this._runActions(e,this.duration),this._runActions(0,c,!0)):this._runActions(e,c)),d&&this.setPaused(!0),this.dispatchEvent("change"),d},b.tick=function(a){this._paused||this.setPosition(this._prevPosition+a)},b.setPaused=function(b){return this._paused===!!b?this:(this._paused=!!b,a._register(this,!b),this)},b.w=b.wait,b.t=b.to,b.c=b.call,b.s=b.set,b.toString=function(){return"[Tween]"},b.clone=function(){throw"Tween can not be cloned."},b._updateTargetProps=function(b,c){var d,e,f,g,h,i;if(b||1!=c){if(this.passive=!!b.v,this.passive)return;b.e&&(c=b.e(c,0,1,1)),d=b.p0,e=b.p1}else this.passive=!1,d=e=this._curQueueProps;for(var j in this._initQueueProps){null==(g=d[j])&&(d[j]=g=this._initQueueProps[j]),null==(h=e[j])&&(e[j]=h=g),f=g==h||0==c||1==c||"number"!=typeof g?1==c?h:g:g+(h-g)*c;var k=!1;if(i=a._plugins[j])for(var l=0,m=i.length;m>l;l++){var n=i[l].tween(this,j,f,d,e,c,!!b&&d==e,!b);n==a.IGNORE?k=!0:f=n}k||(this._target[j]=f)}},b._runActions=function(a,b,c){var d=a,e=b,f=-1,g=this._actions.length,h=1;for(a>b&&(d=b,e=a,f=g,g=h=-1);(f+=h)!=g;){var i=this._actions[f],j=i.t;(j==e||j>d&&e>j||c&&j==a)&&i.f.apply(i.o,i.p)}},b._appendQueueProps=function(b){var c,d,e,f,g;for(var h in b)if(void 0===this._initQueueProps[h]){if(d=this._target[h],c=a._plugins[h])for(e=0,f=c.length;f>e;e++)d=c[e].init(this,h,d);this._initQueueProps[h]=this._curQueueProps[h]=void 0===d?null:d}else d=this._curQueueProps[h];for(var h in b){if(d=this._curQueueProps[h],c=a._plugins[h])for(g=g||{},e=0,f=c.length;f>e;e++)c[e].step&&c[e].step(this,h,d,b[h],g);this._curQueueProps[h]=b[h]}return g&&this._appendQueueProps(g),this._curQueueProps},b._cloneProps=function(a){var b={};for(var c in a)b[c]=a[c];return b},b._addStep=function(a){return a.d>0&&(this._steps.push(a),a.t=this.duration,this.duration+=a.d),this},b._addAction=function(a){return a.t=this.duration,this._actions.push(a),this},b._set=function(a,b){for(var c in a)b[c]=a[c]},createjs.Tween=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.EventDispatcher_constructor(),this.ignoreGlobalPause=!1,this.duration=0,this.loop=!1,this.position=null,this._paused=!1,this._tweens=[],this._labels=null,this._labelList=null,this._prevPosition=0,this._prevPos=-1,this._useTicks=!1,this._registered=!1,c&&(this._useTicks=c.useTicks,this.loop=c.loop,this.ignoreGlobalPause=c.ignoreGlobalPause,c.onChange&&this.addEventListener("change",c.onChange)),a&&this.addTween.apply(this,a),this.setLabels(b),c&&c.paused?this._paused=!0:createjs.Tween._register(this,!0),c&&null!=c.position&&this.setPosition(c.position,createjs.Tween.NONE)}var b=createjs.extend(a,createjs.EventDispatcher);b.addTween=function(a){var b=arguments.length;if(b>1){for(var c=0;b>c;c++)this.addTween(arguments[c]);return arguments[0]}return 0==b?null:(this.removeTween(a),this._tweens.push(a),a.setPaused(!0),a._paused=!1,a._useTicks=this._useTicks,a.duration>this.duration&&(this.duration=a.duration),this._prevPos>=0&&a.setPosition(this._prevPos,createjs.Tween.NONE),a)},b.removeTween=function(a){var b=arguments.length;if(b>1){for(var c=!0,d=0;b>d;d++)c=c&&this.removeTween(arguments[d]);return c}if(0==b)return!1;for(var e=this._tweens,d=e.length;d--;)if(e[d]==a)return e.splice(d,1),a.duration>=this.duration&&this.updateDuration(),!0;return!1},b.addLabel=function(a,b){this._labels[a]=b;var c=this._labelList;if(c){for(var d=0,e=c.length;e>d&&!(b<c[d].position);d++);c.splice(d,0,{label:a,position:b})}},b.setLabels=function(a){this._labels=a?a:{}},b.getLabels=function(){var a=this._labelList;if(!a){a=this._labelList=[];var b=this._labels;for(var c in b)a.push({label:c,position:b[c]});a.sort(function(a,b){return a.position-b.position})}return a},b.getCurrentLabel=function(){var a=this.getLabels(),b=this.position,c=a.length;if(c){for(var d=0;c>d&&!(b<a[d].position);d++);return 0==d?null:a[d-1].label}return null},b.gotoAndPlay=function(a){this.setPaused(!1),this._goto(a)},b.gotoAndStop=function(a){this.setPaused(!0),this._goto(a)},b.setPosition=function(a,b){var c=this._calcPosition(a),d=!this.loop&&a>=this.duration;if(c==this._prevPos)return d;this._prevPosition=a,this.position=this._prevPos=c;for(var e=0,f=this._tweens.length;f>e;e++)if(this._tweens[e].setPosition(c,b),c!=this._prevPos)return!1;return d&&this.setPaused(!0),this.dispatchEvent("change"),d},b.setPaused=function(a){this._paused=!!a,createjs.Tween._register(this,!a)},b.updateDuration=function(){this.duration=0;for(var a=0,b=this._tweens.length;b>a;a++){var c=this._tweens[a];c.duration>this.duration&&(this.duration=c.duration)}},b.tick=function(a){this.setPosition(this._prevPosition+a)},b.resolve=function(a){var b=Number(a);return isNaN(b)&&(b=this._labels[a]),b},b.toString=function(){return"[Timeline]"},b.clone=function(){throw"Timeline can not be cloned."},b._goto=function(a){var b=this.resolve(a);null!=b&&this.setPosition(b)},b._calcPosition=function(a){return 0>a?0:a<this.duration?a:this.loop?a%this.duration:this.duration},createjs.Timeline=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"Ease cannot be instantiated."}a.linear=function(a){return a},a.none=a.linear,a.get=function(a){return-1>a&&(a=-1),a>1&&(a=1),function(b){return 0==a?b:0>a?b*(b*-a+1+a):b*((2-b)*a+(1-a))}},a.getPowIn=function(a){return function(b){return Math.pow(b,a)}},a.getPowOut=function(a){return function(b){return 1-Math.pow(1-b,a)}},a.getPowInOut=function(a){return function(b){return(b*=2)<1?.5*Math.pow(b,a):1-.5*Math.abs(Math.pow(2-b,a))}},a.quadIn=a.getPowIn(2),a.quadOut=a.getPowOut(2),a.quadInOut=a.getPowInOut(2),a.cubicIn=a.getPowIn(3),a.cubicOut=a.getPowOut(3),a.cubicInOut=a.getPowInOut(3),a.quartIn=a.getPowIn(4),a.quartOut=a.getPowOut(4),a.quartInOut=a.getPowInOut(4),a.quintIn=a.getPowIn(5),a.quintOut=a.getPowOut(5),a.quintInOut=a.getPowInOut(5),a.sineIn=function(a){return 1-Math.cos(a*Math.PI/2)},a.sineOut=function(a){return Math.sin(a*Math.PI/2)},a.sineInOut=function(a){return-.5*(Math.cos(Math.PI*a)-1)},a.getBackIn=function(a){return function(b){return b*b*((a+1)*b-a)}},a.backIn=a.getBackIn(1.7),a.getBackOut=function(a){return function(b){return--b*b*((a+1)*b+a)+1}},a.backOut=a.getBackOut(1.7),a.getBackInOut=function(a){return a*=1.525,function(b){return(b*=2)<1?.5*(b*b*((a+1)*b-a)):.5*((b-=2)*b*((a+1)*b+a)+2)}},a.backInOut=a.getBackInOut(1.7),a.circIn=function(a){return-(Math.sqrt(1-a*a)-1)},a.circOut=function(a){return Math.sqrt(1- --a*a)},a.circInOut=function(a){return(a*=2)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)},a.bounceIn=function(b){return 1-a.bounceOut(1-b)},a.bounceOut=function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},a.bounceInOut=function(b){return.5>b?.5*a.bounceIn(2*b):.5*a.bounceOut(2*b-1)+.5},a.getElasticIn=function(a,b){var c=2*Math.PI;return function(d){if(0==d||1==d)return d;var e=b/c*Math.asin(1/a);return-(a*Math.pow(2,10*(d-=1))*Math.sin((d-e)*c/b))}},a.elasticIn=a.getElasticIn(1,.3),a.getElasticOut=function(a,b){var c=2*Math.PI;return function(d){if(0==d||1==d)return d;var e=b/c*Math.asin(1/a);return a*Math.pow(2,-10*d)*Math.sin((d-e)*c/b)+1}},a.elasticOut=a.getElasticOut(1,.3),a.getElasticInOut=function(a,b){var c=2*Math.PI;return function(d){var e=b/c*Math.asin(1/a);return(d*=2)<1?-.5*(a*Math.pow(2,10*(d-=1))*Math.sin((d-e)*c/b)):a*Math.pow(2,-10*(d-=1))*Math.sin((d-e)*c/b)*.5+1}},a.elasticInOut=a.getElasticInOut(1,.3*1.5),createjs.Ease=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"MotionGuidePlugin cannot be instantiated."}a.priority=0,a._rotOffS,a._rotOffE,a._rotNormS,a._rotNormE,a.install=function(){return createjs.Tween.installPlugin(a,["guide","x","y","rotation"]),createjs.Tween.IGNORE},a.init=function(a,b,c){var d=a.target;return d.hasOwnProperty("x")||(d.x=0),d.hasOwnProperty("y")||(d.y=0),d.hasOwnProperty("rotation")||(d.rotation=0),"rotation"==b&&(a.__needsRot=!0),"guide"==b?null:c},a.step=function(b,c,d,e,f){if("rotation"==c&&(b.__rotGlobalS=d,b.__rotGlobalE=e,a.testRotData(b,f)),"guide"!=c)return e;var g,h=e;h.hasOwnProperty("path")||(h.path=[]);var i=h.path;if(h.hasOwnProperty("end")||(h.end=1),h.hasOwnProperty("start")||(h.start=d&&d.hasOwnProperty("end")&&d.path===i?d.end:0),h.hasOwnProperty("_segments")&&h._length)return e;var j=i.length,k=10;if(!(j>=6&&(j-2)%4==0))throw"invalid 'path' data, please see documentation for valid paths";h._segments=[],h._length=0;for(var l=2;j>l;l+=4){for(var m,n,o=i[l-2],p=i[l-1],q=i[l+0],r=i[l+1],s=i[l+2],t=i[l+3],u=o,v=p,w=0,x=[],y=1;k>=y;y++){var z=y/k,A=1-z;m=A*A*o+2*A*z*q+z*z*s,n=A*A*p+2*A*z*r+z*z*t,w+=x[x.push(Math.sqrt((g=m-u)*g+(g=n-v)*g))-1],u=m,v=n}h._segments.push(w),h._segments.push(x),h._length+=w}g=h.orient,h.orient=!0;var B={};return a.calc(h,h.start,B),b.__rotPathS=Number(B.rotation.toFixed(5)),a.calc(h,h.end,B),b.__rotPathE=Number(B.rotation.toFixed(5)),h.orient=!1,a.calc(h,h.end,f),h.orient=g,h.orient?(b.__guideData=h,a.testRotData(b,f),e):e},a.testRotData=function(a,b){if(void 0===a.__rotGlobalS||void 0===a.__rotGlobalE){if(a.__needsRot)return;void 0!==a._curQueueProps.rotation?a.__rotGlobalS=a.__rotGlobalE=a._curQueueProps.rotation:a.__rotGlobalS=a.__rotGlobalE=b.rotation=a.target.rotation||0}if(void 0!==a.__guideData){var c=a.__guideData,d=a.__rotGlobalE-a.__rotGlobalS,e=a.__rotPathE-a.__rotPathS,f=d-e;if("auto"==c.orient)f>180?f-=360:-180>f&&(f+=360);else if("cw"==c.orient){for(;0>f;)f+=360;0==f&&d>0&&180!=d&&(f+=360)}else if("ccw"==c.orient){for(f=d-(e>180?360-e:e);f>0;)f-=360;0==f&&0>d&&-180!=d&&(f-=360)}c.rotDelta=f,c.rotOffS=a.__rotGlobalS-a.__rotPathS,a.__rotGlobalS=a.__rotGlobalE=a.__guideData=a.__needsRot=void 0}},a.tween=function(b,c,d,e,f,g,h,i){var j=f.guide;if(void 0==j||j===e.guide)return d;if(j.lastRatio!=g){var k=(j.end-j.start)*(h?j.end:g)+j.start;switch(a.calc(j,k,b.target),j.orient){case"cw":case"ccw":case"auto":b.target.rotation+=j.rotOffS+j.rotDelta*g;break;case"fixed":default:b.target.rotation+=j.rotOffS}j.lastRatio=g}return"rotation"!=c||j.orient&&"false"!=j.orient?b.target[c]:d},a.calc=function(a,b,c){if(void 0==a._segments)throw"Missing critical pre-calculated information, please file a bug";void 0==c&&(c={x:0,y:0,rotation:0});for(var d=a._segments,e=a.path,f=a._length*b,g=d.length-2,h=0;f>d[h]&&g>h;)f-=d[h],h+=2;var i=d[h+1],j=0;for(g=i.length-1;f>i[j]&&g>j;)f-=i[j],j++;var k=j/++g+f/(g*i[j]);h=2*h+2;var l=1-k;return c.x=l*l*e[h-2]+2*l*k*e[h+0]+k*k*e[h+2],c.y=l*l*e[h-1]+2*l*k*e[h+1]+k*k*e[h+3],a.orient&&(c.rotation=57.2957795*Math.atan2((e[h+1]-e[h-1])*l+(e[h+3]-e[h+1])*k,(e[h+0]-e[h-2])*l+(e[h+2]-e[h+0])*k)),c},createjs.MotionGuidePlugin=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=createjs.TweenJS=createjs.TweenJS||{};a.version="0.6.2",a.buildDate="Thu, 26 Nov 2015 20:44:31 GMT"}();
// Filbert is a Python parser written in JavaScript.
//
// Filbert was written by Matt Lott and released under an MIT
// license. It was adatped from [Acorn](https://github.com/marijnh/acorn.git)
// by Marijn Haverbeke.
//
// Git repository for Filbert are available at
//
//     https://github.com/differentmatt/filbert.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/differentmatt/filbert/issues

(function(root, mod) {
  if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS
  if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD
  mod(root.filbert || (root.filbert = {})); // Plain browser env
})(this, function(exports) {
  "use strict";

  exports.version = "0.5.1";

  // The main exported interface (under `self.filbert` when in the
  // browser) is a `parse` function that takes a code string and
  // returns an abstract syntax tree as specified by [Mozilla parser
  // API][api].
  //
  // [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

  var options, input, inputLen, sourceFile, nc;

  exports.parse = function(inpt, opts) {
    input = String(inpt); inputLen = input.length;
    setOptions(opts);
    initTokenState();
    nc = getNodeCreator(startNode, startNodeFrom, finishNode, unpackTuple);
    return parseTopLevel(options.program);
  };

  // A second optional argument can be given to further configure
  // the parser process. These options are recognized:

  var defaultOptions = exports.defaultOptions = {
    // `languageVersion` indicates the Python version to parse. It
    // is not currently in use, but will support 2 or 3 eventually.
    languageVersion: 3,
    // When `allowTrailingCommas` is false, the parser will not allow
    // trailing commas in array and object literals.
    allowTrailingCommas: true,
    // When enabled, a return at the top level is not considered an
    // error.
    allowReturnOutsideFunction: false,
    // When `locations` is on, `loc` properties holding objects with
    // `start` and `end` properties in `{line, column}` form (with
    // line being 1-based and column 0-based) will be attached to the
    // nodes.
    locations: false,
    // A function can be passed as `onComment` option, which will
    // cause Filbert to call that function with `(text, start,
    // end)` parameters whenever a comment is skipped.
    // `text` is the content of the comment, and `start` and `end` are
    // character offsets that denote the start and end of the comment.
    // When the `locations` option is on, two more parameters are
    // passed, the full `{line, column}` locations of the start and
    // end of the comments. Note that you are not allowed to call the
    // parser from the callback-that will corrupt its internal state.
    onComment: null,
    // [semi-standardized][range] `range` property holding a `[start,
    // end]` array with the same numbers, set the `ranges` option to
    // `true`.
    //
    // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
    ranges: false,
    // It is possible to parse multiple files into a single AST by
    // passing the tree produced by parsing the first file as
    // `program` option in subsequent parses. This will add the
    // toplevel forms of the parsed file to the `Program` (top) node
    // of an existing parse tree.
    program: null,
    // When `locations` is on, you can pass this to record the source
    // file in every node's `loc` object.
    sourceFile: null,
    // This value, if given, is stored in every node, whether
    // `locations` is on or off.
    directSourceFile: null,
    // Python runtime library object name
    runtimeParamName: "__pythonRuntime"
  };

  function setOptions(opts) {
    options = opts || {};
    for (var opt in defaultOptions) if (!Object.prototype.hasOwnProperty.call(options, opt))
      options[opt] = defaultOptions[opt];
    sourceFile = options.sourceFile || null;
  }

  // The `getLineInfo` function is mostly useful when the
  // `locations` option is off (for performance reasons) and you
  // want to find the line/column position for a given character
  // offset. `input` should be the code string that the offset refers
  // into.

  var getLineInfo = exports.getLineInfo = function(input, offset) {
    for (var line = 1, cur = 0;;) {
      lineBreak.lastIndex = cur;
      var match = lineBreak.exec(input);
      if (match && match.index < offset) {
        ++line;
        cur = match.index + match[0].length;
      } else break;
    }
    return {line: line, column: offset - cur};
  };

  // Filbert is organized as a tokenizer and a recursive-descent parser.
  // The `tokenize` export provides an interface to the tokenizer.
  // Because the tokenizer is optimized for being efficiently used by
  // the Filbert parser itself, this interface is somewhat crude and not
  // very modular. Performing another parse or call to `tokenize` will
  // reset the internal state, and invalidate existing tokenizers.

  exports.tokenize = function(inpt, opts) {
    input = String(inpt); inputLen = input.length;
    setOptions(opts);
    initTokenState();

    var t = {};
    function getToken(forceRegexp) {
      lastEnd = tokEnd;
      readToken(forceRegexp);
      t.start = tokStart; t.end = tokEnd;
      t.startLoc = tokStartLoc; t.endLoc = tokEndLoc;
      t.type = tokType; t.value = tokVal;
      return t;
    }
    getToken.jumpTo = function(pos, reAllowed) {
      tokPos = pos;
      if (options.locations) {
        tokCurLine = 1;
        tokLineStart = lineBreak.lastIndex = 0;
        var match;
        while ((match = lineBreak.exec(input)) && match.index < pos) {
          ++tokCurLine;
          tokLineStart = match.index + match[0].length;
        }
      }
      tokRegexpAllowed = reAllowed;
      skipSpace();
    };
    return getToken;
  };

  // State is kept in (closure-)global variables. We already saw the
  // `options`, `input`, and `inputLen` variables above.

  // The current position of the tokenizer in the input.

  var tokPos;

  // The start and end offsets of the current token.

  var tokStart, tokEnd;

  // When `options.locations` is true, these hold objects
  // containing the tokens start and end line/column pairs.

  var tokStartLoc, tokEndLoc;

  // The type and value of the current token. Token types are objects,
  // named by variables against which they can be compared, and
  // holding properties that describe them (indicating, for example,
  // the precedence of an infix operator, and the original name of a
  // keyword token). The kind of value that's held in `tokVal` depends
  // on the type of the token. For literals, it is the literal value,
  // for operators, the operator name, and so on.

  var tokType, tokVal;

  // Interal state for the tokenizer. To distinguish between division
  // operators and regular expressions, it remembers whether the last
  // token was one that is allowed to be followed by an expression.
  // (If it is, a slash is probably a regexp, if it isn't it's a
  // division operator. See the `parseStatement` function for a
  // caveat.)

  var tokRegexpAllowed;

  // When `options.locations` is true, these are used to keep
  // track of the current line, and know when a new line has been
  // entered.

  var tokCurLine, tokLineStart;

  // These store the position of the previous token, which is useful
  // when finishing a node and assigning its `end` position.

  var lastStart, lastEnd, lastEndLoc;

  // This is the parser's state. `inFunction` is used to reject
  // `return` statements outside of functions, `strict` indicates
  // whether strict mode is on, and `bracketNesting` tracks the level
  // of nesting within brackets for implicit lint continuation.

  var inFunction, strict, bracketNesting;

  // This function is used to raise exceptions on parse errors. It
  // takes an offset integer (into the current `input`) to indicate
  // the location of the error, attaches the position to the end
  // of the error message, and then raises a `SyntaxError` with that
  // message.

  function raise(pos, message) {
    var loc = getLineInfo(input, pos);
    var err = new SyntaxError(message);
    err.pos = pos; err.loc = loc; err.raisedAt = tokPos;
    throw err;
  }

  // Reused empty array added for node fields that are always empty.

  var empty = [];

  // Used for name collision avoidance whend adding extra AST identifiers

  var newAstIdCount = 0;

  var indentHist = exports.indentHist = {
    // Current indentation stack
    indent: [],

    // Number of dedent tokens left (i.e. if tokType == _dedent, dedentCount > 0)
    // Multiple dedent tokens are read in at once, but processed individually in readToken()
    dedentCount: 0,

    init: function () { this.indent = []; this.dedentCount = 0; },
    count: function () { return this.indent.length; },
    len: function (i) { 
      if (typeof i === 'undefined' || i >= this.indent.length) i = this.indent.length - 1;
      return this.indent[i].length; 
    },
    isIndent: function(s) {
      return this.indent.length === 0 || s.length > this.len();
    },
    isDedent: function(s) {
      return this.indent.length > 0 && s.length < this.len();
    },
    addIndent: function (s) { this.indent.push(s); },
    addDedent: function (s) {
      this.dedentCount = 0;
      for (var i = this.indent.length - 1; i >= 0 && s.length < this.indent[i].length; --i)
        ++this.dedentCount;
    },
    updateDedent: function () { this.dedentCount = this.count(); },
    pop: function () {
      --this.dedentCount;
      this.indent.pop();
    },
    undoIndent: function () { this.pop(); }
  };

  // ## Scope

  // Collection of namespaces saved as a stack
  // A namespace is a mapping of identifiers to 3 types: variables, functions, classes
  // A namespace also knows whether it is for global, class, or function
  // A new namespace is pushed at function and class start, and popped at their end
  // Starts with a global namespace on the stack
  // E.g. scope.namespaces ~ [{type: 'g', map:{x: 'v', MyClass: 'c'} }, ...]

  // TODO: Not tracking built-in namespace
  
  var scope = exports.scope = {
    namespaces: [],
    init: function () { this.namespaces = [{ type: 'g', map: {} }]; },
    current: function(offset) { 
      offset = offset || 0;
      return this.namespaces[this.namespaces.length - offset - 1];
    },
    startClass: function (id) {
      this.current().map[id] = 'c';
      this.namespaces.push({ type: 'c', map: {}, className: id });
    },
    startFn: function (id) {
      this.current().map[id] = 'f';
      this.namespaces.push({ type: 'f', map: {}, fnName: id });
    },
    end: function () { this.namespaces.pop(); },
    addVar: function (id) { this.current().map[id] = 'v'; },
    exists: function (id) { return this.current().map.hasOwnProperty(id); },
    isClass: function () { return this.current().type === 'c'; },
    isUserFunction: function(name) {
      // Loose match (i.e. order ignored)
      // TODO: does not identify user-defined class methods
      for (var i = this.namespaces.length - 1; i >= 0; i--)
        for (var key in this.namespaces[i].map)
          if (key === name && this.namespaces[i].map[key] === 'f')
            return true;
      return false;
    },
    isParentClass: function() { return this.current(1).type === 'c'; },
    isNewObj: function (id) {
      for (var i = this.namespaces.length - 1; i >= 0; i--)
        if (this.namespaces[i].map[id] === 'c') return true;
        else if (this.namespaces[i].map[id] === 'f') break;
      return false;
    },
    getParentClassName: function () { return this.current(1).className; },
    getThisReplace: function () { return this.current().thisReplace; },
    setThisReplace: function (s) { this.current().thisReplace = s; }
  };
  

  // ## Token types

  // The assignment of fine-grained, information-carrying type objects
  // allows the tokenizer to store the information it has about a
  // token in a way that is very cheap for the parser to look up.

  // All token type variables start with an underscore, to make them
  // easy to recognize.

  // These are the general types. The `type` property is only used to
  // make them recognizeable when debugging.

  var _num = {type: "num"}, _regexp = {type: "regexp"}, _string = {type: "string"};
  var _name = {type: "name"}, _eof = {type: "eof"};
  var _newline = {type: "newline"}, _indent = {type: "indent"}, _dedent = {type: "dedent"};

  // Keyword tokens. The `keyword` property (also used in keyword-like
  // operators) indicates that the token originated from an
  // identifier-like word, which is used when parsing property names.
  //
  // The `beforeExpr` property is used to disambiguate between regular
  // expressions and divisions. It is set on all token types that can
  // be followed by an expression (thus, a slash after them would be a
  // regular expression).
  
  var _dict = { keyword: "dict" };  // TODO: not a keyword
  var _as = { keyword: "as" }, _assert = { keyword: "assert" }, _break = { keyword: "break" };
  var _class = { keyword: "class" }, _continue = { keyword: "continue" };
  var _def = { keyword: "def" }, _del = { keyword: "del" };
  var _elif = { keyword: "elif", beforeExpr: true }, _else = { keyword: "else", beforeExpr: true };
  var _except = { keyword: "except", beforeExpr: true }, _finally = {keyword: "finally"};
  var _for = { keyword: "for" }, _from = { keyword: "from" }, _global = { keyword: "global" };
  var _if = { keyword: "if" }, _import = { keyword: "import" };
  var _lambda = {keyword: "lambda"}, _nonlocal = {keyword: "nonlocal"};
  var _pass = { keyword: "pass" }, _raise = {keyword: "raise"};
  var _return = { keyword: "return", beforeExpr: true }, _try = { keyword: "try" };
  var _while = {keyword: "while"}, _with = {keyword: "with"}, _yield = {keyword: "yield"};

  // The keywords that denote values.

  var _none = {keyword: "None", atomValue: null}, _true = {keyword: "True", atomValue: true};
  var _false = {keyword: "False", atomValue: false};

  // Some keywords are treated as regular operators. `in` sometimes
  // (when parsing `for`) needs to be tested against specifically, so
  // we assign a variable name to it for quick comparing.
  // 'prec' is the operator precedence'

  var _or = { keyword: "or", prec: 1, beforeExpr: true, rep: "||" };
  var _and = { keyword: "and", prec: 2, beforeExpr: true, rep: "&&" };
  var _not = { keyword: "not", prec: 3, prefix: true, beforeExpr: true, rep: "!" };
  var _in = { keyword: "in", prec: 4, beforeExpr: true };
  var _is = { keyword: "is", prec: 4, beforeExpr: true };

  // Map keyword names to token types.

  var keywordTypes = {
    "dict": _dict,
    "False": _false, "None": _none, "True": _true, "and": _and, "as": _as, 
    "break": _break, "class": _class, "continue": _continue, "def": _def, "del": _del,
    "elif": _elif, "else": _else, "except": _except, "finally": _finally, "for": _for,
    "from": _from, "global": _global, "if": _if, "import": _import, "in": _in, "is": _is, 
    "lambda": _lambda, "nonlocal": _nonlocal, "not": _not, "or": _or, 
    "pass": _pass, "raise": _raise, "return": _return, "try": _try, "while": _while, 
    "with": _with, "yield": _yield
  };

  // Punctuation token types. Again, the `type` property is purely for debugging.

  var _bracketL = {type: "[", beforeExpr: true}, _bracketR = {type: "]"}, _braceL = {type: "{", beforeExpr: true};
  var _braceR = {type: "}"}, _parenL = {type: "(", beforeExpr: true}, _parenR = {type: ")"};
  var _comma = {type: ",", beforeExpr: true}, _semi = {type: ";", beforeExpr: true};
  var _colon = { type: ":", beforeExpr: true }, _dot = { type: "." }, _question = { type: "?", beforeExpr: true };
  
  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `prec` specifies the precedence of this operator.
  //
  // `prefix` marks the operator as a prefix unary operator. 
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.

  var _slash = { prec: 10, beforeExpr: true }, _eq = { isAssign: true, beforeExpr: true };
  var _assign = {isAssign: true, beforeExpr: true};
  var _equality = { prec: 4, beforeExpr: true };
  var _relational = {prec: 4, beforeExpr: true };
  var _bitwiseOR = { prec: 5, beforeExpr: true };
  var _bitwiseXOR = { prec: 6, beforeExpr: true };
  var _bitwiseAND = { prec: 7, beforeExpr: true };
  var _bitShift = { prec: 8, beforeExpr: true };
  var _plusMin = { prec: 9, beforeExpr: true };
  var _multiplyModulo = { prec: 10, beforeExpr: true };
  var _floorDiv = { prec: 10, beforeExpr: true };
  var _posNegNot = { prec: 11, prefix: true, beforeExpr: true };
  var _bitwiseNOT = { prec: 11, prefix: true, beforeExpr: true };
  var _exponentiation = { prec: 12, beforeExpr: true };

  // Provide access to the token types for external users of the
  // tokenizer.

  exports.tokTypes = {bracketL: _bracketL, bracketR: _bracketR, braceL: _braceL, braceR: _braceR,
                      parenL: _parenL, parenR: _parenR, comma: _comma, semi: _semi, colon: _colon,
                      dot: _dot, question: _question, slash: _slash, eq: _eq, name: _name, eof: _eof,
                      num: _num, regexp: _regexp, string: _string,
                      newline: _newline, indent: _indent, dedent: _dedent,
                      exponentiation: _exponentiation, floorDiv: _floorDiv, plusMin: _plusMin,
                      posNegNot: _posNegNot, multiplyModulo: _multiplyModulo
  };
  for (var kw in keywordTypes) exports.tokTypes["_" + kw] = keywordTypes[kw];

  // This is a trick taken from Esprima. It turns out that, on
  // non-Chrome browsers, to check whether a string is in a set, a
  // predicate containing a big ugly `switch` statement is faster than
  // a regular expression, and on Chrome the two are about on par.
  // This function uses `eval` (non-lexical) to produce such a
  // predicate from a space-separated string of words.
  //
  // It starts by sorting the words by length.

  function makePredicate(words) {
    words = words.split(" ");
    var f = "", cats = [];
    out: for (var i = 0; i < words.length; ++i) {
      for (var j = 0; j < cats.length; ++j)
        if (cats[j][0].length == words[i].length) {
          cats[j].push(words[i]);
          continue out;
        }
      cats.push([words[i]]);
    }
    function compareTo(arr) {
      if (arr.length == 1) return f += "return str === " + JSON.stringify(arr[0]) + ";";
      f += "switch(str){";
      for (var i = 0; i < arr.length; ++i) f += "case " + JSON.stringify(arr[i]) + ":";
      f += "return true}return false;";
    }

    // When there are more than three length categories, an outer
    // switch first dispatches on the lengths, to save on comparisons.

    if (cats.length > 3) {
      cats.sort(function(a, b) {return b.length - a.length;});
      f += "switch(str.length){";
      for (var i = 0; i < cats.length; ++i) {
        var cat = cats[i];
        f += "case " + cat[0].length + ":";
        compareTo(cat);
      }
      f += "}";

      // Otherwise, simply generate a flat `switch` statement.

    } else {
      compareTo(words);
    }
    return new Function("str", f);
  }

  // The forbidden variable names

  var isStrictBadIdWord = makePredicate("eval arguments");

  // Keywords
  // TODO: dict isn't a keyword, it's a builtin

  var isKeyword = makePredicate("dict False None True and as assert break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield");

  // ## Character categories

  // Big ugly regular expressions that match characters in the
  // whitespace, identifier, and identifier-start categories. These
  // are only applied when a character is found to actually have a
  // code point above 128.

  var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
  var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
  var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
  var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
  var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

  // Whether a single character denotes a newline.

  var newline = /[\n\r\u2028\u2029]/;

  // Matches a whole line break (where CRLF is considered a single
  // line break). Used to count lines.

  var lineBreak = /\r\n|[\n\r\u2028\u2029]/g;

  // Test whether a given character code starts an identifier.

  var isIdentifierStart = exports.isIdentifierStart = function(code) {
    if (code < 65) return code === 36;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123)return true;
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
  };

  // Test whether a given character is part of an identifier.

  var isIdentifierChar = exports.isIdentifierChar = function(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123)return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
  };

  // ## Tokenizer

  // These are used when `options.locations` is on, for the
  // `tokStartLoc` and `tokEndLoc` properties.

  function Position() {
    this.line = tokCurLine;
    this.column = tokPos - tokLineStart;
  }

  // Reset the token state. Used at the start of a parse.

  function initTokenState() {
    tokCurLine = 1;
    tokPos = tokLineStart = 0;
    tokRegexpAllowed = true;
    indentHist.init();
    newAstIdCount = 0;
    scope.init();
  }

  // Called at the end of every token. Sets `tokEnd`, `tokVal`, and
  // `tokRegexpAllowed`, and skips the space after the token, so that
  // the next one's `tokStart` will point at the right position.

  function finishToken(type, val) {
    tokEnd = tokPos;
    if (options.locations) tokEndLoc = new Position;
    tokType = type;
    if (type === _parenL || type === _braceL || type === _bracketL) ++bracketNesting;
    if (type === _parenR || type === _braceR || type === _bracketR) --bracketNesting;
    if (type !== _newline) skipSpace();
    tokVal = val;
    tokRegexpAllowed = type.beforeExpr;
  }

  function skipLine() {
    var ch = input.charCodeAt(++tokPos);
    while (tokPos < inputLen && !isNewline(ch)) {
      ++tokPos;
      ch = input.charCodeAt(tokPos);
    }
  }

  function skipLineComment() {
    var start = tokPos;
    var startLoc = options.onComment && options.locations && new Position;
    skipLine();
    if (options.onComment)
      options.onComment(input.slice(start + 1, tokPos), start, tokPos,
                        startLoc, options.locations && new Position);
  }

  // Called at the start of the parse and after every token. Skips
  // whitespace and comments, and.

  function skipSpace() {
    while (tokPos < inputLen) {
      var ch = input.charCodeAt(tokPos);
      if (ch === 35) skipLineComment();
      else if (ch === 92) {
        ++tokPos;
        if (isNewline(input.charCodeAt(tokPos))) {
          if (input.charCodeAt(tokPos) === 13 && input.charCodeAt(tokPos+1) === 10) ++tokPos;
          ++tokPos;
          if (options.location) { tokLineStart = tokPos; ++tokCurLine; }
        } else {
          raise(tokPos, "Unexpected character after line continuation character");
        }
      }
      else if (isSpace(ch)) ++tokPos;
      else if (bracketNesting > 0 && isNewline(ch)) {
        if (ch === 13 && input.charCodeAt(tokPos+1) === 10) ++tokPos;
        ++tokPos;
        if (options.location) { tokLineStart = tokPos; ++tokCurLine; }
      }
      else break;
    }
  }

  function isSpace(ch) {
    if (ch === 32 || // ' '
      ch === 9 || ch === 11 || ch === 12 ||
      ch === 160 || // '\xa0'
      ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
      return true;
    }
    return false;
  }

  function isNewline(ch) {
    if (ch === 10 || ch === 13 ||
      ch === 8232 || ch === 8233) {
      return true;
    }
    return false;
  }

  // ### Token reading

  // This is the function that is called to fetch the next token. It
  // is somewhat obscure, because it works in character codes rather
  // than characters, and because operator parsing has been inlined
  // into it.
  //
  // All in the name of speed.
  //
  // The `forceRegexp` parameter is used in the one case where the
  // `tokRegexpAllowed` trick does not work. See `parseStatement`.

  function readToken_dot() {
    var next = input.charCodeAt(tokPos + 1);
    if (next >= 48 && next <= 57) return readNumber(true);
    ++tokPos;
    return finishToken(_dot);
  }

  function readToken_slash() { // '/'
    if (tokRegexpAllowed) { ++tokPos; return readRegexp(); }
    var next = input.charCodeAt(tokPos + 1);
    if (next === 47) return finishOp(_floorDiv, 2);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_slash, 1);
  }

  function readToken_mult_modulo(code) { // '*%'
    var next = input.charCodeAt(tokPos + 1);
    if (next === 42 && next === code) return finishOp(_exponentiation, 2);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_multiplyModulo, 1);
  }
  
  function readToken_pipe_amp(code) { // '|&'
    var next = input.charCodeAt(tokPos + 1);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(code === 124 ? _bitwiseOR : _bitwiseAND, 1);
  }

  function readToken_caret() { // '^'
    var next = input.charCodeAt(tokPos + 1);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_bitwiseXOR, 1);
  }

  function readToken_plus_min(code) { // '+-'
    var next = input.charCodeAt(tokPos + 1);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_plusMin, 1);
  }

  function readToken_lt_gt(code) { // '<>'
    var next = input.charCodeAt(tokPos + 1);
    var size = 1;
    if (next === code) {
      size = 2;
      if (input.charCodeAt(tokPos + size) === 61) return finishOp(_assign, size + 1);
      return finishOp(_bitShift, size);
    }
    if (next === 61) size = 2;
    return finishOp(_relational, size);
  }

  function readToken_eq_excl(code) { // '=!'
    var next = input.charCodeAt(tokPos + 1);
    if (next === 61) return finishOp(_equality, 2);
    return finishOp(_eq, 1);
  }

  // Parse indentation
  // Possible output: _indent, _dedent, _eof, readToken()
  // TODO: disallow unequal indents of same length (e.g. nested if/else block)

  function readToken_indent() {
    // Read indent, skip empty lines and comments
    var indent = "";
    var indentPos = tokPos;
    var ch, next;
    while (indentPos < inputLen) {
      ch = input.charCodeAt(indentPos);
      if (isSpace(ch)) {
        indent += String.fromCharCode(ch);
        ++indentPos;
      } else if (isNewline(ch)) { // newline
        indent = "";
        if (ch === 13 && input.charCodeAt(indentPos + 1) === 10) ++indentPos;
        ++indentPos;
        tokPos = indentPos;
        if (options.locations) {
          tokLineStart = indentPos;
          ++tokCurLine;
        }
      } else if (ch === 35) { // '#'
        do {
          next = input.charCodeAt(++indentPos);
        } while (indentPos < inputLen && next !== 10);
        // TODO: call onComment
      } else {
        break;
      }
    }

    // Determine token type based on indent found versus indentation history
    var type;
    if (indent.length > 0) {
      if (indentHist.isIndent(indent)) {
        type = _indent;
        if (indentHist.count() >= 1) tokStart += indentHist.len(indentHist.count() - 1);
        indentHist.addIndent(indent);
      } else if (indentHist.isDedent(indent)) {
        type = _dedent;
        indentHist.addDedent(indent);
        var nextDedent = indentHist.count() - indentHist.dedentCount;
        if (nextDedent >= 2) {
          tokStart += indentHist.len(nextDedent) - indentHist.len(nextDedent - 1);
        }
      } else {
        tokPos += indent.length;
      }
    } else if (indentPos >= inputLen) {
      type = _eof;
    } else if (indentHist.count() > 0) {
      type = _dedent;
      indentHist.updateDedent();
    }

    switch (type) {
      case _indent: case _dedent: return finishOp(type, indentPos - ++tokPos);
      case _eof:
        tokPos = inputLen;
        if (options.locations) tokStartLoc = new Position;
        return finishOp(type, 0);
      default:
        tokType = null;
        return readToken();
    }
  }

  function getTokenFromCode(code) {
    switch(code) {

    case 13: case 10: case 8232: case 8233:
      ++tokPos;
      if (code === 13 && input.charCodeAt(tokPos) === 10) ++tokPos;
      if (options.locations) {
        ++tokCurLine;
        tokLineStart = tokPos;
      }
      return finishToken(_newline);

    case 35: // '#'
      skipLineComment();
      return readToken();

      // The interpretation of a dot depends on whether it is followed
      // by a digit.
    case 46: // '.'
      return readToken_dot();

      // Punctuation tokens.
    case 40: ++tokPos; return finishToken(_parenL);
    case 41: ++tokPos; return finishToken(_parenR);
    case 59: ++tokPos; return finishToken(_semi);
    case 44: ++tokPos; return finishToken(_comma);
    case 91: ++tokPos; return finishToken(_bracketL);
    case 93: ++tokPos; return finishToken(_bracketR);
    case 123: ++tokPos; return finishToken(_braceL);
    case 125: ++tokPos; return finishToken(_braceR);
    case 58: ++tokPos; return finishToken(_colon);
    case 63: ++tokPos; return finishToken(_question);

      // '0x' is a hexadecimal number.
    case 48: // '0'
      var next = input.charCodeAt(tokPos + 1);
      if (next === 120 || next === 88) return readHexNumber();
      // Anything else beginning with a digit is an integer, octal
      // number, or float.
    case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
      return readNumber(false);

      // Quotes produce strings.
    case 34: case 39: // '"', "'"
      return readString(code);

    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.

    case 47: // '/'
      return readToken_slash(code);

    case 42: case 37: // '*%'
      return readToken_mult_modulo(code);

    case 124: case 38: // '|&'
      return readToken_pipe_amp(code);

    case 94: // '^'
      return readToken_caret();

    case 43: case 45: // '+-'
      return readToken_plus_min(code);

    case 60: case 62: // '<>'
      return readToken_lt_gt(code);

    case 61: case 33: // '=!'
      return readToken_eq_excl(code);

    case 126: // '~'
      return finishOp(_bitwiseNOT, 1);
    }

    return false;
  }

  function readToken(forceRegexp) {
    if (tokType === _dedent) {
      indentHist.pop();
      if (indentHist.dedentCount > 0) return;
    }

    if (!forceRegexp) tokStart = tokPos;
    else tokPos = tokStart + 1;
    if (options.locations) tokStartLoc = new Position;
    if (forceRegexp) return readRegexp();
    if (tokPos >= inputLen) return finishToken(_eof);
    if (tokType === _newline) return readToken_indent();

    var code = input.charCodeAt(tokPos);
    // Identifier or keyword. '\uXXXX' sequences are allowed in
    // identifiers, so '\' also dispatches to that.
    if (isIdentifierStart(code) || code === 92 /* '\' */) return readWord();

    var tok = getTokenFromCode(code);

    if (tok === false) {
      // If we are here, we either found a non-ASCII identifier
      // character, or something that's entirely disallowed.
      var ch = String.fromCharCode(code);
      if (ch === "\\" || nonASCIIidentifierStart.test(ch)) return readWord();
      raise(tokPos, "Unexpected character '" + ch + "'");
    }
    return tok;
  }

  function finishOp(type, size) {
    var str = input.slice(tokPos, tokPos + size);
    tokPos += size;
    finishToken(type, str);
  }

  // Parse a regular expression. Some context-awareness is necessary,
  // since a '/' inside a '[]' set does not end the expression.

  function readRegexp() {
    var content = "", escaped, inClass, start = tokPos, value;
    for (;;) {
      if (tokPos >= inputLen) raise(start, "Unterminated regular expression");
      var ch = input.charAt(tokPos);
      if (newline.test(ch)) raise(start, "Unterminated regular expression");
      if (!escaped) {
        if (ch === "[") inClass = true;
        else if (ch === "]" && inClass) inClass = false;
        else if (ch === "/" && !inClass) break;
        escaped = ch === "\\";
      } else escaped = false;
      ++tokPos;
    }
    content = input.slice(start, tokPos);
    ++tokPos;
    // Need to use `readWord1` because '\uXXXX' sequences are allowed
    // here (don't ask).
    var mods = readWord1();
    if (mods && !/^[gmsiy]*$/.test(mods)) raise(start, "Invalid regular expression flag");
    try {
      value = new RegExp(content, mods);
    } catch (e) {
      if (e instanceof SyntaxError) raise(start, "Error parsing regular expression: " + e.message);
      raise(e);
    }
    return finishToken(_regexp, value);
  }

  // Read an integer in the given radix. Return null if zero digits
  // were read, the integer value otherwise. When `len` is given, this
  // will return `null` unless the integer has exactly `len` digits.

  function readInt(radix, len) {
    var start = tokPos, total = 0;
    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
      var code = input.charCodeAt(tokPos), val;
      if (code >= 97) val = code - 97 + 10; // a
      else if (code >= 65) val = code - 65 + 10; // A
      else if (code >= 48 && code <= 57) val = code - 48; // 0-9
      else val = Infinity;
      if (val >= radix) break;
      ++tokPos;
      total = total * radix + val;
    }
    if (tokPos === start || len != null && tokPos - start !== len) return null;

    return total;
  }

  function readHexNumber() {
    tokPos += 2; // 0x
    var val = readInt(16);
    if (val == null) raise(tokStart + 2, "Expected hexadecimal number");
    if (isIdentifierStart(input.charCodeAt(tokPos))) raise(tokPos, "Identifier directly after number");
    return finishToken(_num, val);
  }

  // Read an integer, octal integer, or floating-point number.

  function readNumber(startsWithDot) {
    var start = tokPos, isFloat = false, octal = input.charCodeAt(tokPos) === 48;
    if (!startsWithDot && readInt(10) === null) raise(start, "Invalid number");
    if (input.charCodeAt(tokPos) === 46) {
      ++tokPos;
      readInt(10);
      isFloat = true;
    }
    var next = input.charCodeAt(tokPos);
    if (next === 69 || next === 101) { // 'eE'
      next = input.charCodeAt(++tokPos);
      if (next === 43 || next === 45) ++tokPos; // '+-'
      if (readInt(10) === null) raise(start, "Invalid number");
      isFloat = true;
    }
    if (isIdentifierStart(input.charCodeAt(tokPos))) raise(tokPos, "Identifier directly after number");

    var str = input.slice(start, tokPos), val;
    if (isFloat) val = parseFloat(str);
    else if (!octal || str.length === 1) val = parseInt(str, 10);
    else if (/[89]/.test(str) || strict) raise(start, "Invalid number");
    else val = parseInt(str, 8);
    return finishToken(_num, val);
  }

  // Read a string value, interpreting backslash-escapes.

  function readString(quote) {
    tokPos++;
    var ch = input.charCodeAt(tokPos);
    var tripleQuoted = false;
    if (ch === quote && input.charCodeAt(tokPos+1) === quote) {
      tripleQuoted = true;
      tokPos += 2;
    }
    var out = "";
    for (;;) {
      if (tokPos >= inputLen) raise(tokStart, "Unterminated string constant");
      var ch = input.charCodeAt(tokPos);
      if (ch === quote) {
        if (tripleQuoted) {
          if (input.charCodeAt(tokPos+1) === quote &&
              input.charCodeAt(tokPos+2) === quote) {
            tokPos += 3;
            return finishToken(_string, out);
          }
        } else {
          ++tokPos;
          return finishToken(_string, out);
        }
      }
      if (ch === 92) { // '\'
        ch = input.charCodeAt(++tokPos);
        var octal = /^[0-7]+/.exec(input.slice(tokPos, tokPos + 3));
        if (octal) octal = octal[0];
        while (octal && parseInt(octal, 8) > 255) octal = octal.slice(0, -1);
        if (octal === "0") octal = null;
        ++tokPos;
        if (octal) {
          if (strict) raise(tokPos - 2, "Octal literal in strict mode");
          out += String.fromCharCode(parseInt(octal, 8));
          tokPos += octal.length - 1;
        } else {
          switch (ch) {
          case 110: out += "\n"; break; // 'n' -> '\n'
          case 114: out += "\r"; break; // 'r' -> '\r'
          case 120: out += String.fromCharCode(readHexChar(2)); break; // 'x'
          case 117: out += String.fromCharCode(readHexChar(4)); break; // 'u'
          case 85: // 'U'
            ch = readHexChar(8);
            if (ch < 0xFFFF && (ch < 0xD800 || 0xDBFF < ch)) out += String.fromCharCode(ch); // If it's UTF-16
            else { // If we need UCS-2
              ch -= 0x10000;
              out += String.fromCharCode((ch>>10)+0xd800)+String.fromCharCode((ch%0x400)+0xdc00);
            }
            break;
          case 116: out += "\t"; break; // 't' -> '\t'
          case 98: out += "\b"; break; // 'b' -> '\b'
          case 118: out += "\u000b"; break; // 'v' -> '\u000b'
          case 102: out += "\f"; break; // 'f' -> '\f'
          case 48: out += "\0"; break; // 0 -> '\0'
          case 13: if (input.charCodeAt(tokPos) === 10) ++tokPos; // '\r\n'
          case 10: // ' \n'
            if (options.locations) { tokLineStart = tokPos; ++tokCurLine; }
            break;
          default: out += '\\' + String.fromCharCode(ch); break; // Python doesn't remove slashes on failed escapes
          }
        }
      } else {
        if (isNewline(ch)) {
          if (tripleQuoted) {
            out += String.fromCharCode(ch);
            ++tokPos;
            if (ch === 13 && input.charCodeAt(tokPos) === 10) {
              ++tokPos;
              out += "\n";
            }
            if (options.location) { tokLineStart = tokPos; ++tokCurLine; }
          } else raise(tokStart, "Unterminated string constant");
        } else {
          out += String.fromCharCode(ch); // '\'
          ++tokPos;
        }
      }
    }
  }

  // Used to read character escape sequences ('\x', '\u', '\U').

  function readHexChar(len) {
    var n = readInt(16, len);
    if (n === null) raise(tokStart, "Bad character escape sequence");
    return n;
  }

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.

  var containsEsc;

  // Read an identifier, and return it as a string. Sets `containsEsc`
  // to whether the word contained a '\u' escape.
  //
  // Only builds up the word character-by-character when it actually
  // containeds an escape, as a micro-optimization.

  function readWord1() {
    containsEsc = false;
    var word, first = true, start = tokPos;
    for (;;) {
      var ch = input.charCodeAt(tokPos);
      if (isIdentifierChar(ch)) {
        if (containsEsc) word += input.charAt(tokPos);
        ++tokPos;
      } else if (ch === 92) { // "\"
        if (!containsEsc) word = input.slice(start, tokPos);
        containsEsc = true;
        if (input.charCodeAt(++tokPos) != 117) // "u"
          raise(tokPos, "Expecting Unicode escape sequence \\uXXXX");
        ++tokPos;
        var esc = readHexChar(4);
        var escStr = String.fromCharCode(esc);
        if (!escStr) raise(tokPos - 1, "Invalid Unicode escape");
        if (!(first ? isIdentifierStart(esc) : isIdentifierChar(esc)))
          raise(tokPos - 4, "Invalid Unicode escape");
        word += escStr;
      } else {
        break;
      }
      first = false;
    }
    return containsEsc ? word : input.slice(start, tokPos);
  }

  // Read an identifier or keyword token. Will check for reserved
  // words when necessary.

  function readWord() {
    var word = readWord1();
    var type = _name;
    if (!containsEsc && isKeyword(word))
      type = keywordTypes[word];
    return finishToken(type, word);
  }

  // ## Parser

  // A recursive descent parser operates by defining functions for all
  // syntactic elements, and recursively calling those, each function
  // advancing the input stream and returning an AST node. Precedence
  // of constructs (for example, the fact that `!x[1]` means `!(x[1])`
  // instead of `(!x)[1]` is handled by the fact that the parser
  // function that parses unary prefix operators is called first, and
  // in turn calls the function that parses `[]` subscripts - that
  // way, it'll receive the node for `x[1]` already parsed, and wraps
  // *that* in the unary operator node.
  //
  // Acorn uses an [operator precedence parser][opp] to handle binary
  // operator precedence, because it is much more compact than using
  // the technique outlined above, which uses different, nesting
  // functions to specify precedence, for all of the ten binary
  // precedence levels that JavaScript defines.
  //
  // [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

  // ### Parser utilities

  // Continue to the next token.

  function next() {
    lastStart = tokStart;
    lastEnd = tokEnd;
    lastEndLoc = tokEndLoc;
    readToken();
  }

  // Enter strict mode. Re-reads the next token to please pedantic
  // tests ("use strict"; 010; -- should fail).

  function setStrict(strct) {
    strict = strct;
    tokPos = tokStart;
    if (options.locations) {
      while (tokPos < tokLineStart) {
        tokLineStart = input.lastIndexOf("\n", tokLineStart - 2) + 1;
        --tokCurLine;
      }
    }
    skipSpace();
    readToken();
  }

  // Start an AST node, attaching a start offset.

  function Node() {
    this.type = null;
  }

  exports.Node = Node;

  function SourceLocation() {
    this.start = tokStartLoc;
    this.end = null;
    if (sourceFile !== null) this.source = sourceFile;
  }

  function startNode() {
    var node = new Node();
    if (options.locations)
      node.loc = new SourceLocation();
    if (options.directSourceFile)
      node.sourceFile = options.directSourceFile;
    if (options.ranges)
      node.range = [tokStart, 0];
    return node;
  }

  // Finish an AST node, adding `type` and `end` properties.

  function finishNode(node, type) {
    node.type = type;
    if (options.locations)
      node.loc.end = lastEndLoc;
    if (options.ranges)
      node.range[1] = lastEnd;
    return node;
  }

  // Start a node whose start offset information should be based on
  // the start of another node. For example, a binary operator node is
  // only started after its left-hand side has already been parsed.

  function startNodeFrom(other) {
    var node = new Node();
    if (options.locations) {
      node.loc = new SourceLocation();
      node.loc.start = other.loc.start;
    }
    if (options.ranges)
      node.range = [other.range[0], 0];

    return node;
  }

  // ## Node creation utilities

  var getNodeCreator = exports.getNodeCreator = function(startNode, startNodeFrom, finishNode, unpackTuple) {

    return {

      // Finish a node whose end offset information should be based on
      // the end of another node.  For example, createNode* functions
      // are used to create extra AST nodes which may be based on a single
      // parsed user code node.

      finishNodeFrom: function (endNode, node, type) {
        node.type = type;
        if (options.locations) node.loc.end = endNode.loc.end;
        if (options.ranges) node.range[1] = endNode.range[1];
        return node;
      },

      // Create an AST node using start offsets

      createNodeFrom: function (startNode, type, props) {
        var node = startNodeFrom(startNode);
        for (var prop in props) node[prop] = props[prop];
        return finishNode(node, type);
      },

      // Create an AST node using start and end offsets

      createNodeSpan: function (startNode, endNode, type, props) {
        var node = startNodeFrom(startNode);
        for (var prop in props) node[prop] = props[prop];
        return this.finishNodeFrom(endNode, node, type);
      },

      createGeneratedNodeSpan: function (startNode, endNode, type, props) {
        var node = startNodeFrom(startNode);
        for (var prop in props) node[prop] = props[prop];
        node.userCode = false;
        return this.finishNodeFrom(endNode, node, type);
      },

      // while (__formalsIndex < __params.formals.length) {
      //   <argsId>.push(__params.formals[__formalsIndex++]); }
      createNodeArgsWhileConsequent: function (argsId, s) {
        var __paramsFormals = this.createNodeMembIds(argsId, '__params' + s, 'formals');
        var __formalsIndexId = this.createGeneratedNodeSpan(argsId, argsId, "Identifier", { name: '__formalsIndex' + s });
        return this.createGeneratedNodeSpan(argsId, argsId, "WhileStatement", {
          test: this.createGeneratedNodeSpan(argsId, argsId, "BinaryExpression", {
            operator: '<', left: __formalsIndexId,
            right: this.createGeneratedNodeSpan(argsId, argsId, "MemberExpression", {
              computed: false, object: __paramsFormals,
              property: this.createGeneratedNodeSpan(argsId, argsId, "Identifier", { name: 'length' })
            })
          }),
          body: this.createGeneratedNodeSpan(argsId, argsId, "BlockStatement", {
            body: [this.createGeneratedNodeSpan(argsId, argsId, "ExpressionStatement", {
              expression: this.createGeneratedNodeSpan(argsId, argsId, "CallExpression", {
                callee: this.createNodeMembIds(argsId, argsId.name, 'push'),
                arguments: [this.createGeneratedNodeSpan(argsId, argsId, "MemberExpression", {
                  computed: true, object: __paramsFormals,
                  property: this.createGeneratedNodeSpan(argsId, argsId, "UpdateExpression", {
                    operator: '++', prefix: false, argument: __formalsIndexId
                  })
                })]
              })
            })]
          })
        });
      },

      // { while (__formalsIndex < __args.length) {
      //   <argsId>.push(__args[__formalsIndex++]); }}
      createNodeArgsAlternate: function (argsId, s) {
        var __args = '__args' + s;
        var __formalsIndexId = this.createGeneratedNodeSpan(argsId, argsId, "Identifier", { name: '__formalsIndex' + s });
        return this.createGeneratedNodeSpan(argsId, argsId, "BlockStatement", {
          body: [this.createGeneratedNodeSpan(argsId, argsId, "WhileStatement", {
            test: this.createGeneratedNodeSpan(argsId, argsId, "BinaryExpression", {
              operator: '<', left: __formalsIndexId,
              right: this.createNodeMembIds(argsId, __args, 'length')
            }),
            body: this.createGeneratedNodeSpan(argsId, argsId, "BlockStatement", {
              body: [this.createGeneratedNodeSpan(argsId, argsId, "ExpressionStatement", {
                expression: this.createGeneratedNodeSpan(argsId, argsId, "CallExpression", {
                  callee: this.createNodeMembIds(argsId, argsId.name, 'push'),
                  arguments: [this.createGeneratedNodeSpan(argsId, argsId, "MemberExpression", {
                    computed: true,
                    object: this.createGeneratedNodeSpan(argsId, argsId, "Identifier", { name: __args }),
                    property: this.createGeneratedNodeSpan(argsId, argsId, "UpdateExpression", {
                      operator: '++', prefix: false, argument: __formalsIndexId
                    })
                  })]
                })
              })]
            })
          })]
        });
      },

      // return (function() {<body>}).call(this);
      createNodeFnBodyIife: function (body) {
        var iifeBody = this.createGeneratedNodeSpan(body, body, "FunctionExpression", {
          params: [], defaults: [], body: body, generator: false, expression: false
        });
        var iifeCall = this.createGeneratedNodeSpan(body, body, "CallExpression", {
          callee: this.createGeneratedNodeSpan(body, body, "MemberExpression", {
            computed: false, object: iifeBody,
            property: this.createGeneratedNodeSpan(body, body, "Identifier", { name: 'call' })
          }),
          arguments: [this.createGeneratedNodeSpan(body, body, "ThisExpression")]
        });
        return this.createGeneratedNodeSpan(body, body, "ReturnStatement", { argument: iifeCall });
      },

      // E.g. Math.pow(2, 3)

      createNodeMemberCall: function (node, object, property, args) {
        var objId = this.createNodeFrom(node, "Identifier", { name: object });
        var propId = this.createNodeFrom(node, "Identifier", { name: property });
        var member = this.createNodeFrom(node, "MemberExpression", { object: objId, property: propId, computed: false });
        node.callee = member;
        node.arguments = args;
        return finishNode(node, "CallExpression");
      },

      // o.p
      createNodeMembIds: function(r, o, p) {
        return this.createNodeSpan(r, r, "MemberExpression", {
          computed: false,
          object: this.createNodeSpan(r, r, "Identifier", { name: o }),
          property: this.createNodeSpan(r, r, "Identifier", { name: p })
        })
      },

      // o[p]
      createNodeMembIdLit: function(r, o, p) {
        return this.createNodeSpan(r, r, "MemberExpression", {
          computed: true,
          object: this.createNodeSpan(r, r, "Identifier", { name: o }),
          property: this.createNodeSpan(r, r, "Literal", { value: p })
        })
      },

      // E.g. pyRuntime.ops.add

      createNodeOpsCallee: function (node, fnName) {
        var runtimeId = this.createGeneratedNodeSpan(node, node, "Identifier", { name: options.runtimeParamName });
        var opsId = this.createGeneratedNodeSpan(node, node, "Identifier", { name: "ops" });
        var addId = this.createGeneratedNodeSpan(node, node, "Identifier", { name: fnName });
        var opsMember = this.createGeneratedNodeSpan(node, node, "MemberExpression", { object: runtimeId, property: opsId, computed: false });
        return this.createGeneratedNodeSpan(node, node, "MemberExpression", { object: opsMember, property: addId, computed: false });
      },

      // var __params = arguments.length === 1 && arguments[0].formals && arguments[0].keywords ? arguments[0] : null;
      createNodeParamsCheck: function (r, s) {
        var __paramsId = this.createNodeSpan(r, r, "Identifier", { name: '__params' + s });
        var arguments0 = this.createNodeMembIdLit(r, 'arguments', 0);
        var checks = this.createNodeSpan(r, r, "ConditionalExpression", {
          test: this.createNodeSpan(r, r, "LogicalExpression", {
            operator: '&&',
            left: this.createNodeSpan(r, r, "LogicalExpression", {
              operator: '&&',
              left: this.createNodeSpan(r, r, "BinaryExpression", {
                operator: '===',
                left: this.createNodeMembIds(r, 'arguments', 'length'),
                right: this.createNodeSpan(r, r, "Literal", { value: 1 })
              }),
              right: this.createNodeSpan(r, r, "MemberExpression", {
                computed: false, object: arguments0,
                property: this.createNodeSpan(r, r, "Identifier", { name: 'formals' }),
              })
            }),
            right: this.createNodeSpan(r, r, "MemberExpression", {
              computed: false, object: arguments0,
              property: this.createNodeSpan(r, r, "Identifier", { name: 'keywords' }),
            })
          }),
          consequent: arguments0,
          alternate: this.createNodeSpan(r, r, "Literal", { value: null })
        });
        return this.createGeneratedVarDeclFromId(r, __paramsId, checks);
      },

      // function __getParam(v, d) {
      //   var r = d;
      //   if (__params) {
      //     if (__formalsIndex < __params.formals.length) {
      //       r = __params.formals[__formalsIndex++];
      //     } else if (v in __params.keywords) {
      //       r = __params.keywords[v];
      //       delete __params.keywords[v];
      //     }
      //   } else if (__formalsIndex < __args.length) {
      //     r = __args[__formalsIndex++];
      //   }
      //   return r;
      // }
      createNodeGetParamFn: function (r, s) {
        var dId = this.createNodeSpan(r, r, "Identifier", { name: 'd' });
        var vId = this.createNodeSpan(r, r, "Identifier", { name: 'v' });
        var rId = this.createNodeSpan(r, r, "Identifier", { name: 'r' });
        var __formalsIndexId = this.createNodeSpan(r, r, "Identifier", { name: '__formalsIndex' + s });
        var __params = '__params' + s;
        var __getParam = '__getParam' + s;
        var __args = '__args' + s;
        var __paramsFormals = this.createNodeMembIds(r, __params, 'formals');
        var __paramsKeywords = this.createNodeMembIds(r, __params, 'keywords')
        var __paramsKeywordsV = this.createNodeSpan(r, r, "MemberExpression", { computed: true, property: vId, object: __paramsKeywords });
        return this.createGeneratedNodeSpan(r, r, "FunctionDeclaration", {
          id: this.createNodeSpan(r, r, "Identifier", { name: __getParam }),
          params: [vId, dId],
          defaults: [],
          body: this.createNodeSpan(r, r, "BlockStatement", {
            body: [this.createGeneratedVarDeclFromId(r, rId, dId),
              this.createGeneratedNodeSpan(r, r, "IfStatement", {
                test: this.createNodeSpan(r, r, "Identifier", { name: __params }),
                consequent: this.createNodeSpan(r, r, "BlockStatement", {
                  body: [this.createGeneratedNodeSpan(r, r, "IfStatement", {
                    test: this.createNodeSpan(r, r, "BinaryExpression", {
                      operator: '<', left: __formalsIndexId,
                      right: this.createNodeSpan(r, r, "MemberExpression", {
                        computed: false, object: __paramsFormals,
                        property: this.createNodeSpan(r, r, "Identifier", { name: 'length' })
                      })
                    }),
                    consequent: this.createNodeSpan(r, r, "BlockStatement", {
                      body: [this.createGeneratedNodeSpan(r, r, "ExpressionStatement", {
                        expression: this.createGeneratedNodeSpan(r, r, "AssignmentExpression", {
                          operator: '=', left: rId,
                          right: this.createNodeSpan(r, r, "MemberExpression", {
                            computed: true, object: __paramsFormals,
                            property: this.createNodeSpan(r, r, "UpdateExpression", {
                              operator: '++', argument: __formalsIndexId, prefix: false
                            })
                          })
                        })
                      })]
                    }),
                    alternate: this.createGeneratedNodeSpan(r, r, "IfStatement", {
                      test: this.createNodeSpan(r, r, "BinaryExpression", {
                        operator: 'in', left: vId, right: __paramsKeywords,
                      }),
                      consequent: this.createNodeSpan(r, r, "BlockStatement", {
                        body: [this.createGeneratedNodeSpan(r, r, "ExpressionStatement", {
                          expression: this.createGeneratedNodeSpan(r, r, "AssignmentExpression", {
                            operator: '=', left: rId, right: __paramsKeywordsV
                          })
                        }),
                        this.createGeneratedNodeSpan(r, r, "ExpressionStatement", {
                          expression: this.createNodeSpan(r, r, "UnaryExpression", {
                            operator: 'delete', prefix: true, argument: __paramsKeywordsV
                          })
                        })]
                      }),
                      alternate: null
                    })
                  })]
                }),
                alternate: this.createGeneratedNodeSpan(r, r, "IfStatement", {
                  test: this.createGeneratedNodeSpan(r, r, "BinaryExpression", {
                    operator: '<', left: __formalsIndexId,
                    right: this.createNodeMembIds(r, __args, 'length'),
                  }),
                  consequent: this.createGeneratedNodeSpan(r, r, "BlockStatement", {
                    body: [this.createGeneratedNodeSpan(r, r, "ExpressionStatement", {
                      expression: this.createGeneratedNodeSpan(r, r, "AssignmentExpression", {
                        operator: '=', left: rId,
                        right: this.createGeneratedNodeSpan(r, r, "MemberExpression", {
                          computed: true,
                          object: this.createGeneratedNodeSpan(r, r, "Identifier", { name: __args }),
                          property: this.createGeneratedNodeSpan(r, r, "UpdateExpression", {
                            operator: '++', argument: __formalsIndexId, prefix: false
                          })
                        })
                      })
                    })]
                  }),
                  alternate: null
                })
              }),
              this.createGeneratedNodeSpan(r, r, "ReturnStatement", { argument: rId })]
          }),
          rest: null, generator: false, expression: false
        });
      },

      // E.g. pyRuntime.utils.add

      createNodeRuntimeCall: function (r, mod, fn, args) {
        return this.createNodeSpan(r, r, "CallExpression", {
          callee: this.createNodeSpan(r, r, "MemberExpression", {
            computed: false,
            object: this.createNodeMembIds(r, options.runtimeParamName,  mod),
            property: this.createNodeSpan(r, r, "Identifier", { name: fn })
          }),
          arguments: args
        });
      },

      // Used to convert 'id = init' to 'var id = init'

      createVarDeclFromId: function (refNode, id, init) {
        var decl = startNodeFrom(refNode);
        decl.id = id;
        decl.init = init;
        this.finishNodeFrom(refNode, decl, "VariableDeclarator");
        var declDecl = startNodeFrom(refNode);
        declDecl.kind = "var";
        declDecl.declarations = [decl];
        return this.finishNodeFrom(refNode, declDecl, "VariableDeclaration");
      },

      createGeneratedVarDeclFromId: function (refNode, id, init) {
        var decl = startNodeFrom(refNode);
        decl.id = id;
        decl.init = init;
        this.finishNodeFrom(refNode, decl, "VariableDeclarator");
        var declDecl = startNodeFrom(refNode);
        declDecl.kind = "var";
        declDecl.declarations = [decl];
        declDecl.userCode = false;
        return this.finishNodeFrom(refNode, declDecl, "VariableDeclaration");
      },

      createClass: function(container, ctorNode, classParams, classBodyRefNode, classBlock) {
        // Helper to identify class methods which were parsed onto the class prototype

        function getPrototype(stmt) {
          if (stmt.expression && stmt.expression.left && stmt.expression.left.object &&
            stmt.expression.left.object.property && stmt.expression.left.object.property.name === "prototype")
            return stmt.expression.left.property.name;
          return null;
        }

        // Start building class constructor

        var ctorBlock = startNodeFrom(classBlock);
        ctorBlock.body = [];

        // Add parent class constructor call

        if (classParams.length === 1) {
          var objId = this.createNodeSpan(classBodyRefNode, classBodyRefNode, "Identifier", { name: classParams[0].name });
          var propertyId = this.createNodeSpan(classBodyRefNode, classBodyRefNode, "Identifier", { name: "call" });
          var calleeMember = this.createNodeSpan(classBodyRefNode, classBodyRefNode, "MemberExpression", { object: objId, property: propertyId, computed: false });
          var thisExpr = this.createNodeSpan(classBodyRefNode, classBodyRefNode, "ThisExpression");
          var callExpr = this.createNodeSpan(classBodyRefNode, classBodyRefNode, "CallExpression", { callee: calleeMember, arguments: [thisExpr] });
          var superExpr = this.createNodeSpan(classBodyRefNode, classBodyRefNode, "ExpressionStatement", { expression: callExpr });
          ctorBlock.body.push(superExpr);
        }

        // Add non-function statements and contents of special '__init__' method

        for (var i in classBlock.body) {
          var stmt = classBlock.body[i];
          var prototype = getPrototype(stmt);
          if (!prototype) {
            ctorBlock.body.push(stmt);
          }
          else if (prototype === "__init__") {
            for (var j in stmt.expression.right.body.body)
              ctorBlock.body.push(stmt.expression.right.body.body[j]);
            ctorNode.params = stmt.expression.right.params;
          }
        }

        // Finish class constructor

        ctorNode.body = finishNode(ctorBlock, "BlockStatement");
        finishNode(ctorNode, "FunctionDeclaration");
        container.body.push(ctorNode);

        // Add inheritance via 'MyClass.prototype = Object.create(ParentClass.prototype)'

        if (classParams.length === 1) {
          var childClassId = this.createNodeSpan(ctorNode, ctorNode, "Identifier", { name: ctorNode.id.name });
          var childPrototypeId = this.createNodeSpan(ctorNode, ctorNode, "Identifier", { name: "prototype" });
          var childPrototypeMember = this.createNodeSpan(ctorNode, ctorNode, "MemberExpression", { object: childClassId, property: childPrototypeId, computed: false });
          var parentClassId = this.createNodeSpan(ctorNode, ctorNode, "Identifier", { name: classParams[0].name });
          var parentPrototypeId = this.createNodeSpan(ctorNode, ctorNode, "Identifier", { name: "prototype" });
          var parentPrototypeMember = this.createNodeSpan(ctorNode, ctorNode, "MemberExpression", { object: parentClassId, property: parentPrototypeId, computed: false });
          var objClassId = this.createNodeSpan(ctorNode, ctorNode, "Identifier", { name: "Object" });
          var objCreateId = this.createNodeSpan(ctorNode, ctorNode, "Identifier", { name: "create" });
          var objPropertyMember = this.createNodeSpan(ctorNode, ctorNode, "MemberExpression", { object: objClassId, property: objCreateId, computed: false });
          var callExpr = this.createNodeSpan(ctorNode, ctorNode, "CallExpression", { callee: objPropertyMember, arguments: [parentPrototypeMember] });
          var assignExpr = this.createNodeSpan(ctorNode, ctorNode, "AssignmentExpression", { left: childPrototypeMember, operator: "=", right: callExpr });
          var inheritanceExpr = this.createNodeSpan(ctorNode, ctorNode, "ExpressionStatement", { expression: assignExpr });
          container.body.push(inheritanceExpr);
        }

        // Add class methods, which are already prototype assignments

        for (var i in classBlock.body) {
          var stmt = classBlock.body[i];
          var prototype = getPrototype(stmt);
          if (prototype && prototype !== "__init__")
            container.body.push(stmt);
        }

        return finishNode(container, "BlockStatement");
      },

      // Create for loop
      // 
      // Problem:
      // 1. JavaScript for/in loop iterates on properties, which are the indexes for an Array
      //    Python iterates on the list items themselves, not indexes
      // 2. JavaScript for/in does not necessarily iterate in order
      // Solution:
      // Generate extra AST to do the right thing at runtime
      // JavaScript for/in is used for dictionaries
      // If iterating through an ordered sequence, return something like: 
      // { var __right = right; 
      //    if (__right instanceof Array) { 
      //      for(var __index=0; __index < __right.length; __index++) {
      //        i = __right[__index]; 
      //        ...
      //      } 
      //    } else { 
      //      for(i in __right){...} 
      //    }
      // }
      // When the loop target is a Tuple, it is unpacked into each for body in the example above.
      // E.g. 'for k, v in __right: total += v' becomes:
      // for (var __tmp in __right) {
      //    k = __tmp[0];
      //    v = __tmp[1];
      //    total += v;
      // }

      // TODO: for/in on a string should go through items, not indexes. String obj and string literal.

      createFor: function (node, init, tupleArgs, right, body) {
        var forOrderedBody = body;
        var forInBody = JSON.parse(JSON.stringify(forOrderedBody));

        var tmpVarSuffix = newAstIdCount++;

        var arrayId = this.createNodeSpan(node, node, "Identifier", { name: "Array" });
        var lengthId = this.createNodeSpan(init, init, "Identifier", { name: "length" });
        var zeroLit = this.createNodeSpan(init, init, "Literal", { value: 0 });

        // var __rightN = right

        var rightId = this.createNodeSpan(right, right, "Identifier", { name: "__filbertRight" + tmpVarSuffix });
        var rightAssign = this.createVarDeclFromId(right, rightId, right);

        // for(;;) and for(in) loops

        var forRightId = this.createNodeSpan(init, init, "Identifier", { name: "__filbertRight" + tmpVarSuffix });

        // for (var __indexN; __indexN < __rightN.length; ++__indexN)

        var forOrderedIndexId = this.createNodeSpan(init, init, "Identifier", { name: "__filbertIndex" + tmpVarSuffix });
        var forOrderedIndexDeclr = this.createNodeSpan(init, init, "VariableDeclarator", { id: forOrderedIndexId, init: zeroLit });
        var forOrderedIndexDecln = this.createNodeSpan(init, init, "VariableDeclaration", { declarations: [forOrderedIndexDeclr], kind: "var" });
        var forOrderedTestMember = this.createNodeSpan(init, init, "MemberExpression", { object: forRightId, property: lengthId, computed: false });
        var forOrderedTestBinop = this.createNodeSpan(init, init, "BinaryExpression", { left: forOrderedIndexId, operator: "<", right: forOrderedTestMember });
        var forOrderedUpdate = this.createNodeSpan(init, init, "UpdateExpression", { operator: "++", prefix: true, argument: forOrderedIndexId });
        var forOrderedMember = this.createNodeSpan(init, init, "MemberExpression", { object: forRightId, property: forOrderedIndexId, computed: true });

        if (tupleArgs) {
          var varStmts = unpackTuple(tupleArgs, forOrderedMember);
          for (var i = varStmts.length - 1; i >= 0; i--) forOrderedBody.body.unshift(varStmts[i]);
        }
        else {
          if (init.type === "Identifier" && !scope.exists(init.name)) {
            scope.addVar(init.name);
            forOrderedBody.body.unshift(this.createVarDeclFromId(init, init, forOrderedMember));
          } else {
            var forOrderedInit = this.createNodeSpan(init, init, "AssignmentExpression", { operator: "=", left: init, right: forOrderedMember });
            var forOrderedInitStmt = this.createNodeSpan(init, init, "ExpressionStatement", { expression: forOrderedInit });
            forOrderedBody.body.unshift(forOrderedInitStmt);
          }
        }

        var forOrdered = this.createNodeSpan(node, node, "ForStatement", { init: forOrderedIndexDecln, test: forOrderedTestBinop, update: forOrderedUpdate, body: forOrderedBody });
        var forOrderedBlock = this.createNodeSpan(node, node, "BlockStatement", { body: [forOrdered] });

        // for (init in __rightN)

        var forInLeft = init;
        if (tupleArgs) {
          var varStmts = unpackTuple(tupleArgs, right);
          forInLeft = varStmts[0];
          for (var i = varStmts.length - 1; i > 0; i--) forInBody.body.unshift(varStmts[i]);
        }
        else if (init.type === "Identifier" && !scope.exists(init.name)) {
          scope.addVar(init.name);
          forInLeft = this.createVarDeclFromId(init, init, null);
        }
        var forIn = this.createNodeSpan(node, node, "ForInStatement", { left: forInLeft, right: forRightId, body: forInBody });
        var forInBlock = this.createNodeSpan(node, node, "BlockStatement", { body: [forIn] });

        // if ordered sequence then forOrdered else forIn

        var ifRightId = this.createNodeSpan(node, node, "Identifier", { name: "__filbertRight" + tmpVarSuffix });
        var ifTest = this.createNodeSpan(node, node, "BinaryExpression", { left: ifRightId, operator: "instanceof", right: arrayId });
        var ifStmt = this.createNodeSpan(node, node, "IfStatement", { test: ifTest, consequent: forOrderedBlock, alternate: forInBlock });

        node.body = [rightAssign, ifStmt];

        return node;
      },

      // expr => __tmpList.push(expr);

      createListCompPush: function (expr, tmpVarSuffix) {
        var exprPushTmpListId = this.createNodeSpan(expr, expr, "Identifier", { name: "__tmpList" + tmpVarSuffix });
        var exprPushId = this.createNodeSpan(expr, expr, "Identifier", { name: "push" });
        var exprMember = this.createNodeSpan(expr, expr, "MemberExpression", { object: exprPushTmpListId, property: exprPushId, computed: false });
        var exprCall = this.createNodeSpan(expr, expr, "CallExpression", { callee: exprMember, arguments: [expr] });
        return this.createNodeSpan(expr, expr, "ExpressionStatement", { expression: exprCall });
      },

      //  (function() {
      //    var _list = [];
      //    ...
      //    body
      //    return _list;
      //  }());

      createListCompIife: function (node, body, tmpVarSuffix) {
        var iifeRuntimeId = this.createNodeSpan(node, node, "Identifier", { name: options.runtimeParamName });
        var iifeObjectsId = this.createNodeSpan(node, node, "Identifier", { name: "objects" });
        var iifeObjMember = this.createNodeSpan(node, node, "MemberExpression", { object: iifeRuntimeId, property: iifeObjectsId, computed: false });
        var iifeListId = this.createNodeSpan(node, node, "Identifier", { name: "list" });
        var iifeListMember = this.createNodeSpan(node, node, "MemberExpression", { object: iifeObjMember, property: iifeListId, computed: false });
        var iifeNewExpr = this.createNodeSpan(node, node, "NewExpression", { callee: iifeListMember, arguments: [] });
        var iifeListId = this.createNodeSpan(node, node, "Identifier", { name: "__tmpList" + tmpVarSuffix });
        var iifeListDecl = this.createVarDeclFromId(node, iifeListId, iifeNewExpr);

        var iifeReturnListId = this.createNodeSpan(node, node, "Identifier", { name: "__tmpList" + tmpVarSuffix });
        var iifeReturn = this.createNodeSpan(node, node, "ReturnStatement", { argument: iifeReturnListId });

        var iifeBlock = this.createNodeSpan(node, node, "BlockStatement", { body: [iifeListDecl, body, iifeReturn] });
        var fnExpr = this.createNodeSpan(node, node, "FunctionExpression", { params: [], defaults: [], body: iifeBlock, generator: false, expression: false });

        return this.createNodeSpan(node, node, "CallExpression", { callee: fnExpr, arguments: [] });
      }
    };
  };

  // Predicate that tests whether the next token is of the given
  // type, and if yes, consumes it as a side effect.

  function eat(type) {
    if (tokType === type) {
      next();
      return true;
    }
  }

  // Expect a token of a given type. If found, consume it, otherwise,
  // raise an unexpected token error.

  function expect(type) {
    if (tokType === type) next();
    else unexpected();
  }

  // Raise an unexpected token error.

  function unexpected() {
    raise(tokStart, "Unexpected token");
  }

  // Verify that a node is an lval - something that can be assigned
  // to.

  function checkLVal(expr) {
    if (expr.type !== "Identifier" && expr.type !== "MemberExpression")
      raise(expr.start, "Assigning to rvalue");
    if (strict && expr.type === "Identifier" && isStrictBadIdWord(expr.name))
      raise(expr.start, "Assigning to " + expr.name + " in strict mode");
  }

  // Get args for a new tuple expression

  function getTupleArgs(expr) {
    if (expr.callee && expr.callee.object && expr.callee.object.object &&
      expr.callee.object.object.name === options.runtimeParamName &&
      expr.callee.property && expr.callee.property.name === "tuple")
      return expr.arguments;
    return null;
  }

  // Unpack an lvalue tuple into indivual variable assignments
  // 'arg0, arg1 = right' becomes:
  // var tmp = right
  // arg0 = tmp[0]
  // arg1 = tmp[1]
  // ...

  function unpackTuple(tupleArgs, right) {
    if (!tupleArgs || tupleArgs.length < 1) unexpected();

    var varStmts = [];

    // var tmp = right

    var tmpId = nc.createNodeSpan(right, right, "Identifier", { name: "__filbertTmp" + newAstIdCount++ });
    var tmpDecl = nc.createVarDeclFromId(right, tmpId, right);
    varStmts.push(tmpDecl);

    // argN = tmp[N]

    for (var i = 0; i < tupleArgs.length; i++) {
      var lval = tupleArgs[i];
      var subTupleArgs = getTupleArgs(lval);
      if (subTupleArgs) {
        var subLit = nc.createNodeSpan(right, right, "Literal", { value: i });
        var subRight = nc.createNodeSpan(right, right, "MemberExpression", { object: tmpId, property: subLit, computed: true });
        var subStmts = unpackTuple(subTupleArgs, subRight);
        for (var j = 0; j < subStmts.length; j++) varStmts.push(subStmts[j]);
      } else {
        checkLVal(lval);
        var indexId = nc.createNodeSpan(right, right, "Literal", { value: i });
        var init = nc.createNodeSpan(right, right, "MemberExpression", { object: tmpId, property: indexId, computed: true });
        if (lval.type === "Identifier" && !scope.exists(lval.name)) {
          scope.addVar(lval.name);
          var varDecl = nc.createVarDeclFromId(lval, lval, init);
          varStmts.push(varDecl);
        }
        else {
          var node = startNodeFrom(lval);
          node.left = lval;
          node.operator = "=";
          node.right = init;
          finishNode(node, "AssignmentExpression");
          varStmts.push(nc.createNodeFrom(node, "ExpressionStatement", { expression: node }));
        }
      }
    }

    return varStmts;
  }

  // ### Statement parsing

  // Parse a program. Initializes the parser, reads any number of
  // statements, and wraps them in a Program node.  Optionally takes a
  // `program` argument.  If present, the statements will be appended
  // to its body instead of creating a new node.

  function parseTopLevel(program) {
    lastStart = lastEnd = tokPos;
    if (options.locations) lastEndLoc = new Position;
    inFunction = strict = null;
    bracketNesting = 0;
    readToken();
    var node = program || startNode();
    if (!program) node.body = [];
    while (tokType !== _eof) {
      var stmt = parseStatement();
      if (stmt) node.body.push(stmt);
    }
    return finishNode(node, "Program");
  }

  // Parse a single statement.
  //
  // If expecting a statement and finding a slash operator, parse a
  // regular expression literal. This is to handle cases like
  // `if (foo) /blah/.exec(foo);`, where looking at the previous token
  // does not help.

  function parseStatement() {
    if (tokType === _slash || tokType === _assign && tokVal == "/=")
      readToken(true);

    var starttype = tokType, node = startNode();

    // Most types of statements are recognized by the keyword they
    // start with. Many are trivial to parse, some require a bit of
    // complexity.

    switch (starttype) {

    case _break:
      next();
      return finishNode(node, "BreakStatement");

    case _continue:
      next();
      return finishNode(node, "ContinueStatement");

    case _class:
      next();
      return parseClass(node);

    case _def:
      next();
      return parseFunction(node);

    case _for:
      next();
      return parseFor(node);

    case _from: // Skipping from and import statements for now
      skipLine();
      next();
      return parseStatement();

    case _if: case _elif:
      next();
      if (tokType === _parenL) node.test = parseParenExpression();
      else node.test = parseExpression();
      expect(_colon);
      node.consequent = parseSuite();
      if (tokType === _elif)
        node.alternate = parseStatement();
      else
        node.alternate = eat(_else) && eat(_colon) ? parseSuite() : null;
      return finishNode(node, "IfStatement");

    case _import: // Skipping from and import statements for now
      skipLine();
      next();
      return parseStatement();

    case _newline:
      // TODO: parseStatement() should probably eat it's own newline
      next();
      return null;

    case _pass:
      next();
      return finishNode(node, "EmptyStatement");

    case _return:
      if (!inFunction && !options.allowReturnOutsideFunction)
        raise(tokStart, "'return' outside of function");
      next();
      if (tokType ===_newline || tokType === _eof) node.argument = null;
      else { node.argument = parseExpression();}
      return finishNode(node, "ReturnStatement");

    case _try: // TODO, and remove parseBlock
      next();
      node.block = parseBlock();
      node.handler = null;
      if (tokType === _catch) {
        var clause = startNode();
        next();
        expect(_parenL);
        clause.param = parseIdent();
        if (strict && isStrictBadIdWord(clause.param.name))
          raise(clause.param.start, "Binding " + clause.param.name + " in strict mode");
        expect(_parenR);
        clause.guard = null;
        clause.body = parseBlock();
        node.handler = finishNode(clause, "CatchClause");
      }
      node.guardedHandlers = empty;
      node.finalizer = eat(_finally) ? parseBlock() : null;
      if (!node.handler && !node.finalizer)
        raise(node.start, "Missing catch or finally clause");
      return finishNode(node, "TryStatement");

    case _while:
      next();
      if (tokType === _parenL) node.test = parseParenExpression();
      else node.test = parseExpression();
      expect(_colon);
      node.body = parseSuite();
      return finishNode(node, "WhileStatement");

    case _with: // TODO
      if (strict) raise(tokStart, "'with' in strict mode");
      next();
      node.object = parseParenExpression();
      node.body = parseStatement();
      return finishNode(node, "WithStatement");

    case _semi:
      next();
      return finishNode(node, "EmptyStatement");

      // Assume it's an ExpressionStatement. If an assign has been 
      // converted to a variable declaration, pass it up as is.

    default:
      var expr = parseExpression();
      if (tokType !== _semi && tokType !== _newline && tokType !== _eof) unexpected();
      if (expr.type === "VariableDeclaration" || expr.type === "BlockStatement") {
        return expr;
      } else {
        node.expression = expr;
        return finishNode(node, "ExpressionStatement");
      }
    }
  }

  // Parse indent-enclosed block of statements

  function parseBlock() {
    var node = startNode();
    node.body = [];
    while (tokType !== _dedent && tokType !== _eof) {
      var stmt = parseStatement();
      if (stmt) node.body.push(stmt);
    }
    if (tokType === _dedent) next();
    return finishNode(node, "BlockStatement");
  }

  // Parse 'suite' from Python grammar spec
  // Will replace parseBlock eventually

  function parseSuite() {
    // NOTE: This is not strictly valid Python for this to be an empty block
    var node = startNode();
    node.body = [];
    if (eat(_newline)) {
      if (tokType === _indent) {
        expect(_indent);
        while (!eat(_dedent) && !eat(_eof)) {
          var stmt = parseStatement();
          if (stmt) node.body.push(stmt);
        }
      }
    } else if (tokType !== _eof) {
      node.body.push(parseStatement());
      next();
    }
    return finishNode(node, "BlockStatement");
  }

  // Parse for/in loop

  function parseFor(node) {
    var init = parseExpression(false, true);
    var tupleArgs = getTupleArgs(init);
    if (!tupleArgs) checkLVal(init);
    expect(_in);
    var right = parseExpression();
    expect(_colon);
    var body = parseSuite();
    finishNode(node, "BlockStatement");
    return nc.createFor(node, init, tupleArgs, right, body);
  }

  // ### Expression parsing

  // These nest, from the most general expression type at the top to
  // 'atomic', nondivisible expression types at the bottom. Most of
  // the functions will simply let the function(s) below them parse,
  // and, *if* the syntactic construct they handle is present, wrap
  // the AST node that the inner parser gave them in another node.

  // Parse a full expression. The arguments are used to forbid comma
  // sequences (in argument lists, array literals, or object literals)
  // or the `in` operator (in for loops initalization expressions).

  function parseExpression(noComma, noIn) {
    return parseMaybeAssign(noIn);
  }

  // Used for constructs like `switch` and `if` that insist on
  // parentheses around their expression.

  function parseParenExpression() {
    expect(_parenL);
    var val = parseExpression();
    expect(_parenR);
    return val;
  }

  // Parse an assignment expression. This includes applications of
  // operators like `+=`.
  // Add 'this.' to assignments in a class constructor.
  // Convert identifier assignment to variable declaration if the
  // identifier doesn't exist in this namespace yet.

  function parseMaybeAssign(noIn) {
    var left = parseMaybeTuple(noIn);
    if (tokType.isAssign) {
      var tupleArgs = getTupleArgs(left);
      if (tupleArgs) {
        next();
        var right = parseMaybeTuple(noIn);
        var blockNode = startNodeFrom(left);
        blockNode.body = unpackTuple(tupleArgs, right);
        return finishNode(blockNode, "BlockStatement");
      }

      if (scope.isClass()) {
        var thisExpr = nc.createNodeFrom(left, "ThisExpression");
        left = nc.createNodeFrom(left, "MemberExpression", { object: thisExpr, property: left });
      }

      var node = startNodeFrom(left);
      node.operator = tokVal;
      node.left = left;
      next();
      node.right = parseMaybeTuple(noIn);
      checkLVal(left);

      if (node.operator === '+=' || node.operator === '*=') {
        var right = nc.createNodeSpan(node.right, node.right, "CallExpression");
        right.callee = nc.createNodeOpsCallee(right, node.operator === '+=' ? "add" : "multiply");
        right.arguments = [left, node.right];
        node.right = right;
        node.operator = '=';
      }

      if (left.type === "Identifier" && !scope.exists(left.name)) {
        if (!node.operator || node.operator.length > 1) unexpected();
        scope.addVar(left.name);
        return nc.createVarDeclFromId(node.left, node.left, node.right);
      }
      return finishNode(node, "AssignmentExpression");
    }
    return left;
  }

  // Parse a tuple

  function parseMaybeTuple(noIn) {
    var expr = parseExprOps(noIn);
    if (tokType === _comma) {
      return parseTuple(noIn, expr);
    }
    return expr;
  }

  // Start the precedence parser.

  function parseExprOps(noIn) {
    return parseExprOp(parseMaybeUnary(noIn), -1, noIn);
  }

  // Parse binary operators with the operator precedence parsing
  // algorithm. `left` is the left-hand side of the operator.
  // `minPrec` provides context that allows the function to stop and
  // defer further parser to one of its callers when it encounters an
  // operator that has a lower precedence than the set it is parsing.
  // Exponentiation is evaluated right-to-left, so 'prec >= minPrec'
  // Exponentiation operator 'x**y' is replaced with 'Math.pow(x, y)'
  // Floor division operator 'x//y' is replaced with 'Math.floor(x/y)'
  // 'in' and 'not in' implemented via indexOf()

  function parseExprOp(left, minPrec, noIn) {
    var node, exprNode, right, op = tokType, val = tokVal;
    var prec = op === _not ? _in.prec : op.prec;
    if (op === _exponentiation && prec >= minPrec) {
      node = startNodeFrom(left);
      next();
      right = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
      exprNode = nc.createNodeMemberCall(node, "Math", "pow", [left, right]);
      return parseExprOp(exprNode, minPrec, noIn);
    } else if (prec != null && (!noIn || op !== _in)) {
      if (prec > minPrec) {
        next();
        node = startNodeFrom(left);
        if (op === _floorDiv) {
          right = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
          finishNode(node);
          var binExpr = nc.createNodeSpan(node, node, "BinaryExpression", { left: left, operator: '/', right: right });
          exprNode = nc.createNodeMemberCall(node, "Math", "floor", [binExpr]);
        } else if (op === _in || op === _not) {
          if (op === _in || eat(_in)) {
            right = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
            finishNode(node);
            var notLit = nc.createNodeSpan(node, node, "Literal", { value: op === _not });
            exprNode = nc.createNodeRuntimeCall(node, 'ops', 'in', [left, right, notLit]);
          } else raise(tokPos, "Expected 'not in' comparison operator");
        } else if (op === _plusMin && val === '+' || op === _multiplyModulo && val === '*') {
          node.arguments = [left];
          node.arguments.push(parseExprOp(parseMaybeUnary(noIn), prec, noIn));
          finishNode(node, "CallExpression");
          node.callee = nc.createNodeOpsCallee(node, op === _plusMin ? "add" : "multiply");
          exprNode = node;
        } else {
          if (op === _is) {
            if (eat(_not)) node.operator = "!==";
            else node.operator = "===";
          } else node.operator = op.rep != null ? op.rep : val;
          node.left = left;
          node.right = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
          exprNode = finishNode(node, (op === _or || op === _and) ? "LogicalExpression" : "BinaryExpression");
        }
        return parseExprOp(exprNode, minPrec, noIn);
      }
    }
    return left;
  }

  // Parse unary operators.
  // '-+' are prefixes here, with different precedence.

  function parseMaybeUnary(noIn) {
    if (tokType.prefix || tokType === _plusMin) {
      var prec = tokType === _plusMin ? _posNegNot.prec : tokType.prec;
      var node = startNode();
      node.operator = tokType.rep != null ? tokType.rep : tokVal;
      node.prefix = true;
      tokRegexpAllowed = true;
      next();
      node.argument = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
      return finishNode(node, "UnaryExpression");
    }
    return parseSubscripts(parseExprAtom());
  }

  // Parse call, dot, and `[]`-subscript expressions.

  function parseSubscripts(base, noCalls) {
    var node = startNodeFrom(base);
    if (eat(_dot)) {
      var id = parseIdent(true);
      if (pythonRuntime.imports[base.name] && pythonRuntime.imports[base.name][id.name]) {
        // Calling a Python import function
        // TODO: Unpack parameters into JavaScript-friendly parameters
        var runtimeId = nc.createNodeSpan(base, base, "Identifier", { name: options.runtimeParamName });
        var importsId = nc.createNodeSpan(base, base, "Identifier", { name: "imports" });
        var runtimeMember = nc.createNodeSpan(base, base, "MemberExpression", { object: runtimeId, property: importsId, computed: false });
        node.object = nc.createNodeSpan(base, base, "MemberExpression", { object: runtimeMember, property: base, computed: false });
      } else if (base.name && base.name === scope.getThisReplace()) {
        node.object = nc.createNodeSpan(base, base, "ThisExpression");
      } else node.object = base;
      node.property = id;
      node.computed = false;
      return parseSubscripts(finishNode(node, "MemberExpression"), noCalls);
    } else if (eat(_bracketL)) {
      var expr, isSlice = false;
      if (eat(_colon)) isSlice = true;
      else expr = parseExpression();
      if (!isSlice && eat(_colon)) isSlice = true;
      if (isSlice) return parseSlice(node, base, expr, noCalls);
      var subscriptCall = nc.createNodeSpan(expr, expr, "CallExpression");
      subscriptCall.callee = nc.createNodeOpsCallee(expr, "subscriptIndex");
      subscriptCall.arguments = [base, expr];
      node.object = base;
      node.property = subscriptCall;
      node.computed = true;
      expect(_bracketR);
      return parseSubscripts(finishNode(node, "MemberExpression"), noCalls);
    } else if (!noCalls && eat(_parenL)) {
      if (scope.isUserFunction(base.name)) {
        // Unpack parameters into JavaScript-friendly parameters, further processed at runtime
        var createParamsCall = nc.createNodeRuntimeCall(node, 'utils', 'createParamsObj', parseParamsList());
        node.arguments = [createParamsCall];
      } else node.arguments = parseExprList(_parenR, false);
      if (scope.isNewObj(base.name)) finishNode(node, "NewExpression");
      else finishNode(node, "CallExpression");
      if (pythonRuntime.functions[base.name]) {
        // Calling a Python built-in function
        // TODO: Unpack parameters into JavaScript-friendly parameters
        if (base.type !== "Identifier") unexpected();
        var runtimeId = nc.createNodeSpan(base, base, "Identifier", { name: options.runtimeParamName });
        var functionsId = nc.createNodeSpan(base, base, "Identifier", { name: "functions" });
        var runtimeMember = nc.createNodeSpan(base, base, "MemberExpression", { object: runtimeId, property: functionsId, computed: false });
        node.callee = nc.createNodeSpan(base, base, "MemberExpression", { object: runtimeMember, property: base, computed: false });
      } else node.callee = base;
      return parseSubscripts(node, noCalls);
    }
    return base;
  }

  function parseSlice(node, base, start, noCalls) {
    var end, step;
    if (!start) start = nc.createNodeFrom(node, "Literal", { value: null });
    if (tokType === _bracketR || eat(_colon)) {
      end = nc.createNodeFrom(node, "Literal", { value: null });
    } else {
      end = parseExpression();
      if (tokType !== _bracketR) expect(_colon);
    }
    if (tokType === _bracketR) step = nc.createNodeFrom(node, "Literal", { value: null });
    else step = parseExpression();
    expect(_bracketR);

    node.arguments = [start, end, step];
    var sliceId = nc.createNodeFrom(base, "Identifier", { name: "_pySlice" });
    var memberExpr = nc.createNodeSpan(base, base, "MemberExpression", { object: base, property: sliceId, computed: false });
    node.callee = memberExpr;
    return parseSubscripts(finishNode(node, "CallExpression"), noCalls);
  }

  // Parse an atomic expression - either a single token that is an
  // expression, an expression started by a keyword like `function` or
  // `new`, or an expression wrapped in punctuation like `()`, `[]`,
  // or `{}`.

  function parseExprAtom() {
    switch (tokType) {

    case _dict:
      next();
      return parseDict(_parenR);

    case _name:
      return parseIdent();

    case _num: case _string: case _regexp:
      var node = startNode();
      node.value = tokVal;
      node.raw = input.slice(tokStart, tokEnd);
      next();
      return finishNode(node, "Literal");

    case _none: case _true: case _false:
      var node = startNode();
      node.value = tokType.atomValue;
      node.raw = tokType.keyword;
      next();
      return finishNode(node, "Literal");

    case _parenL:
      var tokStartLoc1 = tokStartLoc, tokStart1 = tokStart;
      next();
      if (tokType === _parenR) {
        // Empty tuple
        var node = parseTuple(false);
        eat(_parenR);
        return node;
      }
      var val = parseMaybeTuple(false);
      if (options.locations) {
        val.loc.start = tokStartLoc1;
        val.loc.end = tokEndLoc;
      }
      if (options.ranges)
        val.range = [tokStart1, tokEnd];
      expect(_parenR);
      return val;

    case _bracketL:
      return parseList();

    case _braceL:
      return parseDict(_braceR);

    case _indent:
      raise(tokStart, "Unexpected indent");

    default:
      unexpected();
    }
  }

  // Parse list

  // Custom list object is used to simulate native Python list
  // E.g. Python '[]' becomes JavaScript 'new __pythonRuntime.objects.list();'
  // If list comprehension, build something like this:
  //(function() {
  //  var _list = [];
  //  ...
  //  _list.push(expr);
  //  return _list;
  //}());

  function parseList() {
    var node = startNode();
    node.arguments = [];
    next();

    if (!eat(_bracketR)) {
      var expr = parseExprOps(false);
      if (tokType === _for || tokType === _if) {

        // List comprehension
        var tmpVarSuffix = newAstIdCount++;
        expr = nc.createListCompPush(expr, tmpVarSuffix);
        var body = parseCompIter(expr, true);
        finishNode(node);
        return nc.createListCompIife(node, body, tmpVarSuffix);

      } else if (eat(_comma)) {
        node.arguments = [expr].concat(parseExprList(_bracketR, true, false));
      }
      else {
        expect(_bracketR);
        node.arguments = [expr];
      }
    }

    finishNode(node, "NewExpression");
    var runtimeId = nc.createNodeSpan(node, node, "Identifier", { name: options.runtimeParamName });
    var objectsId = nc.createNodeSpan(node, node, "Identifier", { name: "objects" });
    var runtimeMember = nc.createNodeSpan(node, node, "MemberExpression", { object: runtimeId, property: objectsId, computed: false });
    var listId = nc.createNodeSpan(node, node, "Identifier", { name: "list" });
    node.callee = nc.createNodeSpan(node, node, "MemberExpression", { object: runtimeMember, property: listId, computed: false });
    return node;
  }

  // Parse a comp_iter from Python language grammar
  // Used to build list comprehensions
  // 'expr' is the body to be used after unrolling the ifs and fors

  function parseCompIter(expr, first) {
    if (first && tokType !== _for) unexpected();
    if (eat(_bracketR)) return expr;
    var node = startNode();
    if (eat(_for)) {
      var init = parseExpression(false, true);
      var tupleArgs = getTupleArgs(init);
      if (!tupleArgs) checkLVal(init);
      expect(_in);
      var right = parseExpression();
      var body = parseCompIter(expr, false);
      var block = nc.createNodeSpan(body, body, "BlockStatement", { body: [body] });
      finishNode(node, "BlockStatement");
      return nc.createFor(node, init, tupleArgs, right, block);
    } else if (eat(_if)) {
      if (tokType === _parenL) node.test = parseParenExpression();
      else node.test = parseExpression();
      node.consequent = parseCompIter(expr, false);
      return finishNode(node, "IfStatement");
    } else unexpected();
  }

  // Parse class

  function parseClass(ctorNode) {
    // Container for class constructor and prototype functions
    var container = startNodeFrom(ctorNode);
    container.body = [];

    // Parse class signature
    ctorNode.id = parseIdent();
    ctorNode.params = [];
    var classParams = [];
    if (eat(_parenL)) {
      var first = true;
      while (!eat(_parenR)) {
        if (!first) expect(_comma); else first = false;
        classParams.push(parseIdent());
      }
    }
    if (classParams.length > 1) raise(tokPos, "Multiple inheritance not supported");
    expect(_colon);

    // Start new namespace for class body
    scope.startClass(ctorNode.id.name);

    // Save a reference for source ranges
    var classBodyRefNode = finishNode(startNode());

    // Parse class body
    var classBlock = parseSuite();

    // Generate additional AST to implement class
    var classStmt = nc.createClass(container, ctorNode, classParams, classBodyRefNode, classBlock);

    scope.end();

    return classStmt;
  }

  // Parse dictionary
  // Custom dict object used to simulate native Python dict
  // E.g. "{'k1':'v1', 'k2':'v2'}" becomes "new __pythonRuntime.objects.dict(['k1', 'v1'], ['k2', 'v2']);"

  function parseDict(tokClose) {
    var node = startNode(), first = true, key, value;
    node.arguments = [];
    next();
    while (!eat(tokClose)) {
      if (!first) {
        expect(_comma);
      } else first = false;

      if (tokClose === _braceR) {
        key = parsePropertyName();
        expect(_colon);
        value = parseExprOps(false);
      } else if (tokClose === _parenR) {
        var keyId = parseIdent(true);
        key = startNodeFrom(keyId);
        key.value = keyId.name;
        finishNode(key, "Literal");
        expect(_eq);
        value = parseExprOps(false);
      } else unexpected();
      node.arguments.push(nc.createNodeSpan(key, value, "ArrayExpression", { elements: [key, value] }));
    }
    finishNode(node, "NewExpression");

    var runtimeId = nc.createNodeSpan(node, node, "Identifier", { name: options.runtimeParamName });
    var objectsId = nc.createNodeSpan(node, node, "Identifier", { name: "objects" });
    var runtimeMember = nc.createNodeSpan(node, node, "MemberExpression", { object: runtimeId, property: objectsId, computed: false });
    var listId = nc.createNodeSpan(node, node, "Identifier", { name: "dict" });
    node.callee = nc.createNodeSpan(node, node, "MemberExpression", { object: runtimeMember, property: listId, computed: false });

    return node;
  }

  function parsePropertyName() {
    if (tokType === _num || tokType === _string) return parseExprAtom();
    return parseIdent(true);
  }

  function parseFunction(node) {
    // TODO: The node creation utilities used here are tightly coupled (e.g. variable names)

    var suffix = newAstIdCount++;
    node.id = parseIdent();
    node.params = [];

    // Parse parameters

    var formals = [];     // In order, maybe with default value
    var argsId = null;    // *args
    var kwargsId = null;  // **kwargs
    var defaultsFound = false;
    var first = true;
    expect(_parenL);
    while (!eat(_parenR)) {
      if (!first) expect(_comma); else first = false;
      if (tokVal === '*') {
        if (kwargsId) raise(tokPos, "invalid syntax");
        next(); argsId = parseIdent();
      } else if (tokVal === '**') {
        next(); kwargsId = parseIdent();
      } else {
        if (kwargsId) raise(tokPos, "invalid syntax");
        var paramId = parseIdent();
        if (eat(_eq)) {
          formals.push({ id: paramId, expr: parseExprOps(false) });
          defaultsFound = true;
        } else {
          if (defaultsFound) raise(tokPos, "non-default argument follows default argument");
          if (argsId) raise(tokPos, "missing required keyword-only argument");
          formals.push({ id: paramId, expr: null });
        }
      }
    }
    expect(_colon);

    // Start a new scope with regard to the `inFunction`
    // flag (restore them to their old value afterwards).
    // `inFunction` used to throw syntax error for stray `return`
    var oldInFunc = inFunction = true;

    scope.startFn(node.id.name);

    // If class method, remove class instance var from params and save for 'this' replacement
    if (scope.isParentClass()) {
      var selfId = formals.shift();
      scope.setThisReplace(selfId.id.name);
    }

    var body = parseSuite();
    node.body = nc.createNodeSpan(body, body, "BlockStatement", { body: [] });

    // Add runtime parameter processing
    // The caller may pass a complex parameter object as a single parameter like this:
    // {formals:[<expr>, <expr>, ...], keywords:{<id>:<expr>, <id>:<expr>, ...}}

    if (formals.length > 0 || argsId || kwargsId) {
      // var __params = arguments.length === 1 && arguments[0].formals && arguments[0].keywords ? arguments[0] : null;
      node.body.body.push(nc.createNodeParamsCheck(node.id, suffix));

      // var __formalsIndex = 0;
      node.body.body.push(nc.createGeneratedVarDeclFromId(node.id,
        nc.createNodeSpan(node.id, node.id, "Identifier", { name: '__formalsIndex' + suffix }),
        nc.createNodeSpan(node.id, node.id, "Literal", { value: 0 })));

      // var __args = arguments;
      node.body.body.push(nc.createGeneratedVarDeclFromId(node.id,
        nc.createNodeSpan(node.id, node.id, "Identifier", { name: '__args' + suffix }),
        nc.createNodeSpan(node.id, node.id, "Identifier", { name: 'arguments' })));
    }

    if (formals.length > 0) {
      // function __getParam(v, d) {
      //   var r = d;
      //   if (__params) {
      //     if (__formalsIndex < __params.formals.length) {
      //       r = __params.formals[__formalsIndex++];
      //     } else if (v in __params.keywords) {
      //       r = __params.keywords[v];
      //       delete __params.keywords[v];
      //     }
      //   } else if (__formalsIndex < __args.length) {
      //     r = __args[__formalsIndex++];
      //   }
      //   return r;
      // }
      node.body.body.push(nc.createNodeGetParamFn(node.id, suffix));

      for (var i = 0; i < formals.length; i++) {
        // var <param> = __getParam('<param>', <optional default>);
        var __getParamCall = nc.createNodeSpan(formals[i].id, formals[i].id, "CallExpression", {
          callee: nc.createNodeSpan(formals[i].id, formals[i].id, "Identifier", { name: '__getParam' + suffix }),
          arguments: [nc.createNodeSpan(formals[i].id, formals[i].id, "Literal", { value: formals[i].id.name })]
        });
        if (formals[i].expr) __getParamCall.arguments.push(formals[i].expr);
        node.body.body.push(nc.createGeneratedVarDeclFromId(formals[i].id, formals[i].id, __getParamCall));
      }
    }
    
    var refNode = argsId || kwargsId;
    if (refNode) {
      if (argsId) {
        // var <args> = [];
        var argsAssign = nc.createGeneratedVarDeclFromId(argsId, argsId, nc.createNodeSpan(argsId, argsId, "ArrayExpression", { elements: [] }));
        node.body.body.push(argsAssign);
      }
      if (kwargsId) {
        // var <kwargs> = {};
        var kwargsAssign = nc.createGeneratedVarDeclFromId(kwargsId, kwargsId, nc.createNodeSpan(kwargsId, kwargsId, "ObjectExpression", { properties: [] }));
        node.body.body.push(kwargsAssign);
      }
      // if (__params) {}
      var argsIf = nc.createNodeSpan(refNode, refNode, "IfStatement", {
        test: nc.createNodeSpan(refNode, refNode, "Identifier", { name: '__params' + suffix }),
        consequent: nc.createNodeSpan(refNode, refNode, "BlockStatement", { body: [] })})
      if (argsId) {
        // while (__formalsIndex < __params.formals.length) {
        //   <argsId>.push(__params.formals[__formalsIndex++]); }
        argsIf.consequent.body.push(nc.createNodeArgsWhileConsequent(argsId, suffix));
        // { while (__formalsIndex < __args.length) {
        //   <argsId>.push(__args[__formalsIndex++]); }}
        argsIf.alternate = nc.createNodeArgsAlternate(argsId, suffix);
      }
      if (kwargsId) {
        // <kwargs> = __params.keywords
        argsIf.consequent.body.push(nc.createNodeSpan(kwargsId, kwargsId, "ExpressionStatement", {
          expression: nc.createNodeSpan(kwargsId, kwargsId, "AssignmentExpression", {
            operator: '=', left: kwargsId, right: nc.createNodeMembIds(kwargsId, '__params' + suffix, 'keywords'),
          })
        }));
      }
      node.body.body.push(argsIf);
    }

    // Convert original body to 'return (function() {<body>}).call(this);'
    node.body.body.push(nc.createNodeFnBodyIife(body));

    inFunction = oldInFunc;

    // Verify that argument names are not repeated
    for (var i = 0; i < formals.length; ++i) {
      for (var j = 0; j < i; ++j) if (formals[i].id.name === formals[j].id.name)
        raise(formals[i].id.start, "Argument name clash");
    }

    // If class method, replace with prototype function literals
    var retNode;
    if (scope.isParentClass()) {
      finishNode(node);
      var classId = nc.createNodeSpan(node, node, "Identifier", { name: scope.getParentClassName() });
      var prototypeId = nc.createNodeSpan(node, node, "Identifier", { name: "prototype" });
      var functionId = node.id;
      var prototypeMember = nc.createNodeSpan(node, node, "MemberExpression", { object: classId, property: prototypeId, computed: false });
      var functionMember = nc.createNodeSpan(node, node, "MemberExpression", { object: prototypeMember, property: functionId, computed: false });
      var functionExpr = nc.createNodeSpan(node, node, "FunctionExpression", { body: node.body, params: node.params });
      var assignExpr = nc.createNodeSpan(node, node, "AssignmentExpression", { left: functionMember, operator: "=", right: functionExpr });
      retNode = nc.createNodeSpan(node, node, "ExpressionStatement", { expression: assignExpr });
    } else retNode = finishNode(node, "FunctionDeclaration");

    scope.end();

    return retNode;
  }

  // Parses a comma-separated list of expressions, and returns them as
  // an array. `close` is the token type that ends the list, and
  // `allowEmpty` can be turned on to allow subsequent commas with
  // nothing in between them to be parsed as `null` (which is needed
  // for array literals).

  function parseExprList(close, allowTrailingComma, allowEmpty) {
    var elts = [], first = true;
    while (!eat(close)) {
      if (!first) {
        expect(_comma);
        if (allowTrailingComma && options.allowTrailingCommas && eat(close)) break;
      } else first = false;

      if (allowEmpty && tokType === _comma) elts.push(null);
      else elts.push(parseExprOps(false));
    }
    return elts;
  }

  function parseParamsList() {
    // In: expr, expr, ..., id=expr, id=expr, ...
    // Out: expr, expr, ..., {id:expr, __kwp:true}, {id:expr, __kwp:true}, ...
    var elts = [], first = true;
    while (!eat(_parenR)) {
      if (!first) expect(_comma);
      else first = false;
      var expr = parseExprOps(false);
      if (eat(_eq)) {
        var right = parseExprOps(false);
        var kwId = nc.createNodeSpan(expr, right, "Identifier", {name:"__kwp"});
        var kwLit = nc.createNodeSpan(expr, right, "Literal", {value:true});
        var left = nc.createNodeSpan(expr, right, "ObjectExpression", { properties: [] });
        left.properties.push({ type: "Property", key: expr, value: right, kind: "init" });
        left.properties.push({ type: "Property", key: kwId, value: kwLit, kind: "init" });
        expr = left;
      }
      elts.push(expr);
    }
    return elts;
  }

  // Parse the next token as an identifier. If `liberal` is true (used
  // when parsing properties), it will also convert keywords into
  // identifiers.

  // TODO: liberal?

  function parseIdent(liberal) {
    var node = startNode();
    if (liberal) liberal = false;
    if (tokType === _name) {
      if (!liberal && strict && input.slice(tokStart, tokEnd).indexOf("\\") == -1)
        raise(tokStart, "The keyword '" + tokVal + "' is reserved");
      node.name = tokVal;
    } else if (liberal && tokType.keyword) {
      node.name = tokType.keyword;
    } else {
      unexpected();
    }
    tokRegexpAllowed = false;
    next();
    return finishNode(node, "Identifier");
  }

  function parseTuple(noIn, expr) {
    var node = expr ? startNodeFrom(expr) : startNode();
    node.arguments = expr ? [expr] : [];

    // Tuple with single element has special trailing comma: t = 'hi',
    // Look ahead and eat comma in this scenario
    if (tokType === _comma) {
      var oldPos = tokPos; skipSpace();
      var newPos = tokPos; tokPos = oldPos;
      if (newPos >= inputLen || input[newPos] === ';' || input[newPos] === ')' || newline.test(input[newPos]))
        eat(_comma);
    }

    while (eat(_comma)) {
      node.arguments.push(parseExprOps(noIn));
    }
    finishNode(node, "NewExpression");

    var runtimeId = nc.createNodeSpan(node, node, "Identifier", { name: options.runtimeParamName });
    var objectsId = nc.createNodeSpan(node, node, "Identifier", { name: "objects" });
    var runtimeMember = nc.createNodeSpan(node, node, "MemberExpression", { object: runtimeId, property: objectsId, computed: false });
    var listId = nc.createNodeSpan(node, node, "Identifier", { name: "tuple" });
    node.callee = nc.createNodeSpan(node, node, "MemberExpression", { object: runtimeMember, property: listId, computed: false });

    return node;
  }


  // ## Python runtime library

  var pythonRuntime = exports.pythonRuntime = {

    // Shim JavaScript objects that impersonate Python equivalents

    // TODO: use 'type' or isSequence instead of 'instanceof Array' to id these

    internal: {
      // Only used within runtime
      isSeq: function (a) { return a && (a._type === "list" || a._type === "tuple"); },
      slice: function (obj, start, end, step) {
        if (step == null || step === 0) step = 1; // TODO: step === 0 is a runtime error
        if (start == null) {
          if (step < 0) start = obj.length - 1;
          else start = 0;
        } else if (start < 0) start += obj.length;
        if (end == null) {
          if (step < 0) end = -1;
          else end = obj.length;
        } else if (end < 0) end += obj.length;

        var ret = new pythonRuntime.objects.list(), tmp, i;
        if (step < 0) {
          tmp = obj.slice(end + 1, start + 1);
          for (i = tmp.length - 1; i >= 0; i += step) ret.append(tmp[i]);
        } else {
          tmp = obj.slice(start, end);
          if (step === 1) ret = pythonRuntime.utils.createList(tmp);
          else for (i = 0; i < tmp.length; i += step) ret.append(tmp[i]);
        }
        return ret;
      },
      isJSArray: Array.isArray || function(obj) {
        return toString.call(obj) === '[object Array]';
      }
    },

    utils: {
      convertToDict: function (dict) {
        if (!dict.hasOwnProperty("_type")) {
          Object.defineProperty(dict, "_type",
          {
            get: function () { return 'dict';},
            enumerable: false
          });
        }
        if (!dict.hasOwnProperty("_isPython")) {
          Object.defineProperty(dict, "_isPython",
          {
            get: function () { return true; },
            enumerable: false
          });
        }
        if (!dict.hasOwnProperty("items")) {
          Object.defineProperty(dict, "items",
          {
            value: function () {
              var items = new pythonRuntime.objects.list();
              for (var k in this) items.append(new pythonRuntime.objects.tuple(k, this[k]));
              return items;
            },
            enumerable: false
          });
        }
        if (!dict.hasOwnProperty("length")) {
          Object.defineProperty(dict, "length",
          {
            get: function () {
              return Object.keys(this).length;
            },
            enumerable: false
          });
        }
        if (!dict.hasOwnProperty("clear")) {
          Object.defineProperty(dict, "clear",
          {
            value: function () {
              for (var i in this) delete this[i];
            },
            enumerable: false
          });
        }
        if (!dict.hasOwnProperty("get")) {
          Object.defineProperty(dict, "get",
          {
            value: function (key, def) {
              if (key in this) return this[key];
              else if (def !== undefined) return def;
              return null;
            },
            enumerable: false
          });
        }
        if (!dict.hasOwnProperty("keys")) {
          Object.defineProperty(dict, "keys",
          {
            value: function () {
              return Object.keys(this);
            },
            enumerable: false
          });
        }
        if (!dict.hasOwnProperty("pop")) {
          Object.defineProperty(dict, "pop",
          {
            value: function (key, def) {
              var value;
              if (key in this) {
                value = this[key];
                delete this[key];
              } else if (def !== undefined) value = def;
              else return new Error("KeyError");
              return value;
            },
            enumerable: false
          });
        }
        if (!dict.hasOwnProperty("values")) {
          Object.defineProperty(dict, "values",
          {
            value: function () {
              var values = new pythonRuntime.objects.list();
              for (var key in this) values.append(this[key]);
              return values;
            },
            enumerable: false
          });
        }
      },
      createDict: function () {
        var ret = new pythonRuntime.objects.dict();
        if (arguments.length === 1 && arguments[0] instanceof Object)
          for (var k in arguments[0]) ret[k] = arguments[0][k];
        else
          throw TypeError("createDict expects a single JavaScript object")
        return ret;
      },
      createParamsObj: function () {
        // In: expr, expr, ..., {id:expr, __kwp:true}, {id:expr, __kwp:true}, ...
        // Out: {formals:[expr, expr, ...], keywords:{id:expr, id:expr, ...}}
        var params = { formals: new pythonRuntime.objects.list(), keywords: new pythonRuntime.objects.dict() };
        for (var i = 0; i < arguments.length; i++) {
          if (arguments[i] && arguments[i].__kwp === true) {
            for (var k in arguments[i])
              if (k !== '__kwp') params.keywords[k] = arguments[i][k];
          }
          else params.formals.push(arguments[i]);
        }
        return params;
      },
      convertToList: function (list) {
        if (!list.hasOwnProperty("_type")) {
          Object.defineProperty(list, "_type",
          {
            get: function () { return 'list'; },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("_isPython")) {
          Object.defineProperty(list, "_isPython",
          {
            get: function () { return true; },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("append")) {
          Object.defineProperty(list, "append",
          {
            value: function (x) {
              this.push(x);
            },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("clear")) {
          Object.defineProperty(list, "clear",
          {
            value: function () {
              this.splice(0, this.length);
            },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("copy")) {
          Object.defineProperty(list, "copy",
          {
            value: function () {
              return this.slice(0);
            },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("count")) {
          Object.defineProperty(list, "count",
          {
            value: function (x) {
              var c = 0;
              for (var i = 0; i < this.length; i++)
                if (this[i] === x) c++;
              return c;
            },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("equals")) {
          Object.defineProperty(list, "equals",
          {
            value: function (x) {
              try {
                if (this.length !== x.length) return false;
                for (var i = 0; i < this.length; i++) {
                  if (this[i].hasOwnProperty("equals")) {
                    if (!this[i].equals(x[i])) return false;
                  } else if (this[i] !== x[i]) return false;
                }
                return true;
              }
              catch (e) { }
              return false;
            },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("extend")) {
          Object.defineProperty(list, "extend",
          {
            value: function (L) {
              for (var i = 0; i < L.length; i++) this.push(L[i]);
            },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("index")) {
          Object.defineProperty(list, "index",
          {
            value: function (x) {
              return this.indexOf(x);
            },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("indexOf")) {
          Object.defineProperty(list, "indexOf",
          {
            value: function (x, fromIndex) {
              try {
                for (var i = fromIndex ? fromIndex : 0; i < this.length; i++) {
                  if (this[i].hasOwnProperty("equals")) {
                    if (this[i].equals(x)) return i;
                  } else if (this[i] === x) return i;
                }
              }
              catch (e) { }
              return -1;
            },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("insert")) {
          Object.defineProperty(list, "insert",
          {
            value: function (i, x) {
              this.splice(i, 0, x);
            },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("pop")) {
          Object.defineProperty(list, "pop",
          {
            value: function (i) {
              if (!i)
                i = this.length - 1;
              var item = this[i];
              this.splice(i, 1);
              return item;
            },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("_pySlice")) {
          Object.defineProperty(list, "_pySlice",
          {
            value: function (start, end, step) {
              return pythonRuntime.internal.slice(this, start, end, step);
            },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("remove")) {
          Object.defineProperty(list, "remove",
          {
            value: function (x) {
              this.splice(this.indexOf(x), 1);
            },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("sort")) {
          Object.defineProperty(list, "sort",
          {
            value: function(x, reverse) {
              var list2 = this.slice(0);
              var apply_key = function(a, numerical) {
                var list3 = list2.map(x);
                // construct a dict that maps the listay before and after the map
                var mapping = {}
                for(var i in list3) mapping[list3[i]] = list2[i];
                if(numerical)
                  list3.sort(function(a, b) { return a - b; });
                else
                  list3.sort()
                for(var i in a) a[i] = mapping[list3[i]];
              }
              for(var i in this) {
                if(typeof this[i] !== 'number' || !isFinite(this[i])) {
                  if(typeof x != 'undefined') {
                    apply_key(this, false);
                  }
                  else {
                    list2.sort();
                    for (var j in this) this[j] = list2[j];
                  }
                  if(reverse)
                    this.reverse();
                  return;
                }
              }
              if(typeof x != 'undefined') {
                apply_key(this, true);
              }
              else {
                list2.sort(function(a, b) { return a - b; });
                for(var i in this) this[i] = list2[i];
              }
              if(reverse)
                this.reverse();
            },
            enumerable: false
          });
        }
        if (!list.hasOwnProperty("toString")) {
          Object.defineProperty(list, "toString",
          {
            value: function () {
              return '[' + this.join(', ') + ']';
            },
            enumerable: false
          });
        }
      },
      createList: function () {
        var ret = new pythonRuntime.objects.list();
        if (arguments.length === 1 && arguments[0] instanceof Array)
          for (var i in arguments[0]) ret.push(arguments[0][i]);
        else
          for (var i in arguments) ret.push(arguments[i]);
        return ret;
      }
    },

    ops: {
      add: function (a, b) {
        if (pythonRuntime.internal.isSeq(a) && pythonRuntime.internal.isSeq(b)) {
          if (a._type !== b._type)
            throw TypeError("can only concatenate " + a._type + " (not '" + b._type + "') to " + a._type);
          var ret;
          if (a._type === 'list') ret = new pythonRuntime.objects.list();
          else if (a._type === 'tuple') ret = new pythonRuntime.objects.tuple();
          if (ret) {
            for (var i = 0; i < a.length; i++) ret.push(a[i]);
            for (var i = 0; i < b.length; i++) ret.push(b[i]);
            return ret;
          }
        }
        return a + b;
      },
      in: function (a, b, n) {
        var r = b.hasOwnProperty('indexOf') ? b.indexOf(a) >= 0 : a in b;
        return n ? !r : r;
      },
      multiply: function (a, b) {
        // TODO: non-sequence operand must be an integer
        if (pythonRuntime.internal.isSeq(a) && !isNaN(parseInt(b))) {
          var ret;
          if (a._type === 'list') ret = new pythonRuntime.objects.list();
          else if (a._type === 'tuple') ret = new pythonRuntime.objects.tuple();
          if (ret) {
            for (var i = 0; i < b; i++)
              for (var j = 0; j < a.length; j++) ret.push(a[j]);
            return ret;
          }
        }
        else if (pythonRuntime.internal.isSeq(b) && !isNaN(parseInt(a))) {
          var ret;
          if (b._type === 'list') ret = new pythonRuntime.objects.list();
          else if (b._type === 'tuple') ret = new pythonRuntime.objects.tuple();
          if (ret) {
            for (var i = 0; i < a; i++)
              for (var j = 0; j < b.length; j++) ret.push(b[j]);
            return ret;
          }
        }
        return a * b;
      },
      subscriptIndex: function (o, i) {
        if (pythonRuntime.internal.isSeq(o) && i < 0) return o.length + i;
        if (pythonRuntime.internal.isJSArray(o) && i < 0 ) return o.length + i;
        if ( typeof o === "string" && i < 0 ) return o.length + i;
        return i;
      }
    },

    objects: {
      dict: function () {
        var obj = {};
        for (var i in arguments) obj[arguments[i][0]] = arguments[i][1];
        pythonRuntime.utils.convertToDict(obj);
        return obj;
      },
      list: function () {
        var arr = [];
        arr.push.apply(arr, arguments);
        pythonRuntime.utils.convertToList(arr);
        return arr;
      },
      tuple: function () {
        var arr = [];
        arr.push.apply(arr, arguments);
        Object.defineProperty(arr, "_type",
        {
          get: function () { return 'tuple'; },
          enumerable: false
        });
        Object.defineProperty(arr, "_isPython",
        {
          get: function () { return true; },
          enumerable: false
        });
        Object.defineProperty(arr, "count",
        {
          value: function (x) {
            var c = 0;
            for (var i = 0; i < this.length; i++)
              if (this[i] === x) c++;
            return c;
          },
          enumerable: false
        });
        Object.defineProperty(arr, "equals",
        {
          value: function (x) {
            try {
              if (this.length !== x.length) return false;
              for (var i = 0; i < this.length; i++) {
                if (this[i].hasOwnProperty("equals")) {
                  if (!this[i].equals(x[i])) return false;
                } else if (this[i] !== x[i]) return false;
              }
              return true;
            }
            catch (e) { }
            return false;
          },
          enumerable: false
        });
        Object.defineProperty(arr, "index",
        {
          value: function (x) {
            return this.indexOf(x);
          },
          enumerable: false
        });
        Object.defineProperty(arr, "indexOf",
        {
          value: function (x, fromIndex) {
            try {
              for (var i = fromIndex ? fromIndex : 0; i < this.length; i++) {
                if (this[i].hasOwnProperty("equals")) {
                  if (this[i].equals(x)) return i;
                } else if (this[i] === x) return i;
              }
            }
            catch (e) { }
            return -1;
          },
          enumerable: false
        });
        Object.defineProperty(arr, "_pySlice",
        {
          value: function (start, end, step) { 
            return pythonRuntime.internal.slice(this, start, end, step);
          },
            enumerable: false
        });
        Object.defineProperty(arr, "toString",
        {
          value: function () {
            var s = '(' + this.join(', ');
            if (this.length === 1) s += ',';
            s += ')';
            return s;
          },
          enumerable: false
        });
        return arr;
      }
    },

    // Python built-in functions

    functions: {
      abs: function(x) {
        return Math.abs(x);
      },
      all: function(iterable) {
        for (var i in iterable) if (pythonRuntime.functions.bool(iterable[i]) !== true) return false;
        return true;
      },
      any: function(iterable) {
        for (var i in iterable) if (pythonRuntime.functions.bool(iterable[i]) === true) return true;
        return false;
      },
      ascii: function(obj) {
        var s = pythonRuntime.functions.repr(obj),
            asc = "",
            code;
        for (var i = 0; i < s.length; i++) {
          code = s.charCodeAt(i);
          if (code <= 127) asc += s[i];
          else if (code <= 0xFF) asc += "\\x" + code.toString(16);
          else if (0xD800 <= code && code <= 0xDBFF) { // UCS-2 for the astral chars
            // if (i+1 >= s.length) throw "High surrogate not followed by low surrogate"; // Is this needed?
            code = ((code-0xD800)*0x400)+(s.charCodeAt(++i)-0xDC00)+0x10000;
            asc += "\\U" + ("000"+code.toString(16)).slice(-8);
          } else if (code <= 0xFFFF) asc += "\\u" + ("0"+code.toString(16)).slice(-4);
          else if (code <= 0x10FFFF) asc += "\\U" + ("000"+code.toString(16)).slice(-8);
          else; // Invalid value, should probably throw something. It should never get here though as strings shouldn't contain them in the first place
        }
        return asc;
      },
      bool: function(x) {
        return !(x === undefined || // No argument
                 x === null || // None
                 x === false || // False
                 x === 0 || // Zero
                 x.length === 0 || // Empty Sequence
                 // TODO: Empty Mapping, needs more support for python mappings first
                 (x.__bool__ !== undefined && x.__bool__() === false) || // If it has bool conversion defined
                 (x.__len__ !== undefined && (x.__len__() === false || x.__len__() === 0))); // If it has length conversion defined
      },
      chr: function(i) {
        return String.fromCharCode(i); // TODO: Error code for not 0 <= i <= 1114111
      },
      divmod: function(a, b) {
        return pythonRuntime.objects.tuple(Math.floor(a/b), a%b);
      },
      enumerate: function(iterable, start) {
        start = start || 0;
        var ret = new pythonRuntime.objects.list();
        for (var i in iterable) ret.push(new pythonRuntime.objects.tuple(start++, iterable[i]));
        return ret;
      },
      filter: function(fn, iterable) {
        fn = fn || function () { return true; };
        var ret = new pythonRuntime.objects.list();
        for (var i in iterable) if (fn(iterable[i])) ret.push(iterable[i]);
        return ret;
      },
      float: function(x) {
        if (x === undefined) return 0.0;
        else if (typeof x == "string") { // TODO: Fix type check
          x = x.trim().toLowerCase();
          if ((/^[+-]?inf(inity)?$/i).exec(x) !== null) return Infinity*(x[0]==="-"?-1:1);
          else if ((/^nan$/i).exec(x) !== null) return NaN;
          else return parseFloat(x);
        } else if (typeof x == "number") { // TODO: Fix type check
          return x; // TODO: Get python types working right so we can return an actual float
        } else {
          if (x.__float__ !== undefined) return x.__float__();
          else return null; // TODO: Throw TypeError: float() argument must be a string or a number, not '<type of x>'
        }
      },
      hex: function(x) {
        return x.toString(16);
      },
      int: function (s) {
        return parseInt(s);
      },
      len: function (o) {
        return o.length;
      },
      list: function (iterable) {
        var ret = new pythonRuntime.objects.list();
        if (iterable instanceof Array) for (var i in iterable) ret.push(iterable[i]);
        else for (var i in iterable) ret.push(i);
        return ret;
      },
      map: function(fn, iterable) {
        // TODO: support additional iterables passed
        var ret = new pythonRuntime.objects.list();
        for (var i in iterable) ret.push(fn(iterable[i]));
        return ret;
      },
      max: function(arg1, arg2) {
        // TODO: support optional keyword-only arguments
        // TODO: empty iterable raises Python ValueError
        if (!arg2) { // iterable
          var max = null;
          for (var i in arg1) if (max === null || arg1[i] > max) max = arg1[i];
          return max;
        } else return arg1 >= arg2 ? arg1 : arg2;
      },
      min: function(arg1, arg2) {
        // TODO: support optional keyword-only arguments
        // TODO: empty iterable raises Python ValueError
        if (!arg2) { // iterable
          var max = null;
          for (var i in arg1) if (max === null || arg1[i] < max) max = arg1[i];
          return max;
        } else return arg1 <= arg2 ? arg1 : arg2;
      },
      oct: function(x) {
        return x.toString(8);
      },
      ord: function(c) {
        return c.charCodeAt(0);
      },
      pow: function(x, y, z) {
        return z ? Math.pow(x, y) % z : Math.pow(x, y);
      },
      print: function () {
        var s = "";
        for (var i = 0; i < arguments.length; i++)
          s += i === 0 ? arguments[i] : " " + arguments[i];
        console.log(s);
      },
      range: function (start, stop, step) {
        if (stop === undefined) {
          stop = start;
          start = 0;
          step = 1;
        }
        else if (step === undefined) step = 1;
        var r = new pythonRuntime.objects.list();
        if (start < stop && step > 0 || start > stop && step < 0) {
          var i = start;
          while (i < stop && step > 0 || i > stop && step < 0) {
            r.append(i);
            i += step;
          }
        }
        return r;
      },
      repr: function (obj) {
        if (typeof obj === 'string') return "'" + obj + "'"; // TODO: Patch until typesystem comes up.
        if (obj.__repr__ !== undefined) return obj.__repr__();
        else if (obj.__class__ !== undefined && obj.__class__.module !== undefined && obj.__class__.__name__) {
          return '<'+obj.__class__.__module__+'.'+obj.__class__.__name__+' object>';
        } else return obj.toString(); // Raise a please report warning here, we should never reach this piece of code
      },
      reversed: function (seq) {
        var ret = new pythonRuntime.objects.list();
        for (var i in seq) ret.push(seq[i]);
        return ret.reverse();
      },
      round: function (num, ndigits) {
        if (ndigits) {
          var scale = Math.pow(10, ndigits);
          return Math.round(num * scale) / scale;
        }
        return Math.round(num);
      },
      sorted: function (iterable, key, reverse) {
        var ret = new pythonRuntime.objects.list();
        for (var i in iterable) ret.push(iterable[i]);
        if(key) ret.sort(key); else ret.sort();
        if (reverse) ret.reverse();
        return ret;
      },
      str: function (obj) {
        return obj.toString();
      },
      sum: function (iterable, start) {
        // TODO: start can't be a string
        var ret = start || 0;
        for (var i in iterable) ret += iterable[i];
        return ret;
      },
      tuple: function (iterable) {
        var ret = new pythonRuntime.objects.tuple();
        for (var i in iterable) ret.push(iterable[i]);
        return ret;
      }
    },

    // Python imports
    // TODO: from x import y, z

    imports: {
      random: {
        random: function () { return Math.random(); }
      }
    }
  };
});

// Filbert: Loose parser
//
// This module provides an alternative parser (`parse_dammit`) that
// exposes that same interface as `parse`, but will try to parse
// anything as Python, repairing syntax errors the best it can.
// There are circumstances in which it will raise an error and give
// up, but they are very rare. The resulting AST will be a mostly
// valid JavaScript AST (as per the [Mozilla parser API][api], except
// that:
//
// - Return outside functions is allowed
//
// - Bogus Identifier nodes with a name of `"✖"` are inserted whenever
//   the parser got too confused to return anything meaningful.
//
// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API
//
// The expected use for this is to *first* try `filbert.parse`, and only
// if that fails switch to `parse_dammit`. The loose parser might
// parse badly indented code incorrectly, so **don't** use it as
// your default parser.
//
// Quite a lot of filbert.js is duplicated here. The alternative was to
// add a *lot* of extra cruft to that file, making it less readable
// and slower. Copying and editing the code allowed invasive changes and 
// simplifications without creating a complicated tangle.

(function(root, mod) {
  if (typeof exports == "object" && typeof module == "object") return mod(exports, require("./filbert")); // CommonJS
  if (typeof define == "function" && define.amd) return define(["exports", "./filbert_loose"], mod); // AMD
  mod(root.filbert_loose || (root.filbert_loose = {}), root.filbert); // Plain browser env
})(this, function(exports, filbert) {
  "use strict";

  var tt = filbert.tokTypes;
  var scope = filbert.scope;
  var indentHist = filbert.indentHist;

  var options, input, inputLen, fetchToken, nc;

  exports.parse_dammit = function(inpt, opts) {
    input = String(inpt); inputLen = input.length;
    setOptions(opts);
    if (!options.tabSize) options.tabSize = 4;
    fetchToken = filbert.tokenize(inpt, options);
    ahead.length = 0;
    newAstIdCount = 0;
    scope.init();
    nc = filbert.getNodeCreator(startNode, startNodeFrom, finishNode, unpackTuple);
    next();
    return parseTopLevel();
  };

  function setOptions(opts) {
    options = opts || {};
    for (var opt in filbert.defaultOptions) if (!Object.prototype.hasOwnProperty.call(options, opt))
      options[opt] = filbert.defaultOptions[opt];
    sourceFile = options.sourceFile || null;
  }

  var lastEnd, token = {start: 0, end: 0}, ahead = [];
  var lastEndLoc, sourceFile;

  var newAstIdCount = 0;

  function next() {
    lastEnd = token.end;
    if (options.locations) lastEndLoc = token.endLoc;

    if (ahead.length) token = ahead.shift();
    else token = readToken();
  }

  function readToken() {
    for (;;) {
      try {
        return fetchToken();
      } catch(e) {
        if (!(e instanceof SyntaxError)) throw e;

        // Try to skip some text, based on the error message, and then continue
        var msg = e.message, pos = e.raisedAt, replace = true;
        if (/unterminated/i.test(msg)) {
          pos = lineEnd(e.pos);
          if (/string/.test(msg)) {
            replace = {start: e.pos, end: pos, type: tt.string, value: input.slice(e.pos + 1, pos)};
          } else if (/regular expr/i.test(msg)) {
            var re = input.slice(e.pos, pos);
            try { re = new RegExp(re); } catch(e) {}
            replace = {start: e.pos, end: pos, type: tt.regexp, value: re};
          } else {
            replace = false;
          }
        } else if (/invalid (unicode|regexp|number)|expecting unicode|octal literal|is reserved|directly after number/i.test(msg)) {
          while (pos < input.length && !isSpace(input.charCodeAt(pos)) && !isNewline(input.charCodeAt(pos))) ++pos;
        } else if (/character escape|expected hexadecimal/i.test(msg)) {
          while (pos < input.length) {
            var ch = input.charCodeAt(pos++);
            if (ch === 34 || ch === 39 || isNewline(ch)) break;
          }
        } else if (/unexpected character/i.test(msg)) {
          pos++;
          replace = false;
        } else if (/regular expression/i.test(msg)) {
          replace = true;
        } else {
          throw e;
        }
        resetTo(pos);
        if (replace === true) replace = {start: pos, end: pos, type: tt.name, value: "✖"};
        if (replace) {
          if (options.locations) {
            replace.startLoc = filbert.getLineInfo(input, replace.start);
            replace.endLoc = filbert.getLineInfo(input, replace.end);
          }
          return replace;
        }
      }
    }
  }

  function resetTo(pos) {
    var ch = input.charAt(pos - 1);
    var reAllowed = !ch || /[\[\{\(,;:?\/*=+\-~!|&%^<>]/.test(ch) ||
      /[enwfd]/.test(ch) && /\b(keywords|case|else|return|throw|new|in|(instance|type)of|delete|void)$/.test(input.slice(pos - 10, pos));
    fetchToken.jumpTo(pos, reAllowed);
  }

  function copyToken(token) {
    var copy = {start: token.start, end: token.end, type: token.type, value: token.value};
    if (options.locations) {
      copy.startLoc = token.startLoc;
      copy.endLoc = token.endLoc;
    }
    return copy;
  }

  function lookAhead(n) {
    // Copy token objects, because fetchToken will overwrite the one
    // it returns, and in this case we still need it
    if (!ahead.length)
      token = copyToken(token);
    while (n > ahead.length)
      ahead.push(copyToken(readToken()));
    return ahead[n-1];
  }

  var newline = /[\n\r\u2028\u2029]/;
  var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

  function isNewline(ch) {
    return ch === 10 || ch === 13 || ch === 8232 || ch === 8329;
  }
  
  function isSpace(ch) {
    return ch === 9 || ch === 11 || ch === 12 ||
      ch === 32 || // ' '
      ch === 35 || // '#'
      ch === 160 || // '\xa0'
      ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch));
  }
  
  function lineEnd(pos) {
    while (pos < input.length && !isNewline(input.charCodeAt(pos))) ++pos;
    return pos;
  }

  function skipLine() {
    fetchToken.jumpTo(lineEnd(token.start), false);
  }

  function Node(start) {
    this.type = null;
  }
  Node.prototype = filbert.Node.prototype;

  function SourceLocation(start) {
    this.start = start || token.startLoc || {line: 1, column: 0};
    this.end = null;
    if (sourceFile !== null) this.source = sourceFile;
  }

  function startNode() {
    var node = new Node(token.start);
    if (options.locations)
      node.loc = new SourceLocation();
    if (options.directSourceFile)
      node.sourceFile = options.directSourceFile;
    if (options.ranges)
      node.range = [token.start, 0];
    return node;
  }

  function startNodeFrom(other) {
    var node = new Node(other.start);
    if (options.locations)
      node.loc = new SourceLocation(other.loc.start);
    if (options.ranges)
      node.range = [other.range[0], 0];
    return node;
  }

  function finishNode(node, type) {
    node.type = type;
    if (options.locations)
      node.loc.end = lastEndLoc;
    if (options.ranges)
      node.range[1] = lastEnd;
    return node;
  }

  function getDummyLoc() {
    if (options.locations) {
      var loc = new SourceLocation();
      loc.end = loc.start;
      return loc;
    }
  }

  var dummyCount = 0
  function dummyIdent() {
    var dummy = new Node(token.start);
    dummy.type = "Identifier";
    dummy.end = token.start;
    dummy.name = "dummy" + dummyCount++;
    dummy.loc = getDummyLoc();
    return dummy;
  }
  function isDummy(node) { return node.name && node.name.indexOf("dummy") === 0; }

  function eat(type) {
    if (token.type === type) {
      next();
      return true;
    }
  }

  function expect(type) {
    if (eat(type)) return true;
    if (lookAhead(1).type == type) {
      next(); next();
      return true;
    }
    if (lookAhead(2).type == type) {
      next(); next(); next();
      return true;
    }
  }

  function checkLVal(expr) {
    if (expr.type === "Identifier" || expr.type === "MemberExpression") return expr;
    return dummyIdent();
  }

  // Get args for a new tuple expression

  function getTupleArgs(expr) {
    if (expr.callee && expr.callee.object && expr.callee.object.object &&
      expr.callee.object.object.name === options.runtimeParamName &&
      expr.callee.property && expr.callee.property.name === "tuple")
      return expr.arguments;
    return null;
  }

  // Unpack an lvalue tuple into indivual variable assignments
  // 'arg0, arg1 = right' becomes:
  // var tmp = right
  // arg0 = tmp[0]
  // arg1 = tmp[1]
  // ...

  function unpackTuple(tupleArgs, right) {
    var varStmts = [];

    // var tmp = right

    var tmpId = nc.createNodeSpan(right, right, "Identifier", { name: "__filbertTmp" + newAstIdCount++ });
    var tmpDecl = nc.createVarDeclFromId(right, tmpId, right);
    varStmts.push(tmpDecl);

    // argN = tmp[N]

    if (tupleArgs && tupleArgs.length > 0) {
      for (var i = 0; i < tupleArgs.length; i++) {
        var lval = tupleArgs[i];
        var subTupleArgs = getTupleArgs(lval);
        if (subTupleArgs) {
          var subLit = nc.createNodeSpan(right, right, "Literal", { value: i });
          var subRight = nc.createNodeSpan(right, right, "MemberExpression", { object: tmpId, property: subLit, computed: true });
          var subStmts = unpackTuple(subTupleArgs, subRight);
          for (var j = 0; j < subStmts.length; j++) varStmts.push(subStmts[j]);
        } else {
          checkLVal(lval);
          var indexId = nc.createNodeSpan(right, right, "Literal", { value: i });
          var init = nc.createNodeSpan(right, right, "MemberExpression", { object: tmpId, property: indexId, computed: true });
          if (lval.type === "Identifier" && !scope.exists(lval.name)) {
            scope.addVar(lval.name);
            var varDecl = nc.createVarDeclFromId(lval, lval, init);
            varStmts.push(varDecl);
          }
          else {
            var node = startNodeFrom(lval);
            node.left = lval;
            node.operator = "=";
            node.right = init;
            finishNode(node, "AssignmentExpression");
            varStmts.push(nc.createNodeFrom(node, "ExpressionStatement", { expression: node }));
          }
        }
      }
    }

    return varStmts;
  }

  // ### Statement parsing

  function parseTopLevel() {
    var node = startNode();
    node.body = [];
    while (token.type !== tt.eof) {
      var stmt = parseStatement();
      if (stmt) node.body.push(stmt);
    }
    return finishNode(node, "Program");
  }

  function parseStatement() {
    var starttype = token.type, node = startNode();

    switch (starttype) {

    case tt._break:
      next();
      return finishNode(node, "BreakStatement");

    case tt._continue:
      next();
      return finishNode(node, "ContinueStatement");

    case tt._class:
      next();
      return parseClass(node);

    case tt._def:
      next();
      return parseFunction(node);

    case tt._for:
      next();
      return parseFor(node);

    case tt._from: // Skipping from and import statements for now
      skipLine();
      next();
      return parseStatement();

    case tt._if: case tt._elif:
      next();
      if (token.type === tt.parenL) node.test = parseParenExpression();
      else node.test = parseExpression();
      expect(tt.colon);
      node.consequent = parseSuite();
      if (token.type === tt._elif)
        node.alternate = parseStatement();
      else
        node.alternate = eat(tt._else) && eat(tt.colon) ? parseSuite() : null;
      return finishNode(node, "IfStatement");

    case tt._import: // Skipping from and import statements for now
      skipLine();
      next();
      return parseStatement();

    case tt.newline:
      // TODO: parseStatement() should probably eat it's own newline
      next();
      return null;

    case tt._pass:
      next();
      return finishNode(node, "EmptyStatement");

    case tt._return:
      next();
      if (token.type === tt.newline || token.type === tt.eof) node.argument = null;
      else { node.argument = parseExpression(); }
      return finishNode(node, "ReturnStatement"); 

    case tt._while:
      next();
      if (token.type === tt.parenL) node.test = parseParenExpression();
      else node.test = parseExpression();
      expect(tt.colon);
      node.body = parseSuite();
      return finishNode(node, "WhileStatement");

    case tt.semi:
      next();
      return finishNode(node, "EmptyStatement");

    case tt.indent:
      // Unexpected indent, let's ignore it
      indentHist.undoIndent();
      next();
      return parseStatement();

    default:
      var expr = parseExpression();
      if (isDummy(expr)) {
        next();
        if (token.type === tt.eof) return finishNode(node, "EmptyStatement");
        return parseStatement();
      } else if (expr.type === "VariableDeclaration" || expr.type === "BlockStatement") {
        return expr;
      } else {
        node.expression = expr;
        return finishNode(node, "ExpressionStatement");
      }
    }
  }

  function parseSuite() {
    var node = startNode();
    node.body = [];
    if (eat(tt.newline)) {
      eat(tt.indent);
      while (!eat(tt.dedent) && token.type !== tt.eof) {
        var stmt = parseStatement();
        if (stmt) node.body.push(stmt);
      }
    } else {
      node.body.push(parseStatement());
      next();
    }
    return finishNode(node, "BlockStatement");
  }

  function parseFor(node) {
    var init = parseExpression(false, true);
    var tupleArgs = getTupleArgs(init);
    if (!tupleArgs) checkLVal(init);
    expect(tt._in);
    var right = parseExpression();
    expect(tt.colon);
    var body = parseSuite();
    finishNode(node, "BlockStatement");
    return nc.createFor(node, init, tupleArgs, right, body);
  }

  // ### Expression parsing

  function parseExpression(noComma, noIn) {
    return parseMaybeAssign(noIn);
  }

  function parseParenExpression() {
    expect(tt.parenL);
    var val = parseExpression();
    expect(tt.parenR);
    return val;
  }

  function parseMaybeAssign(noIn) {
    var left = parseMaybeTuple(noIn);
    if (token.type.isAssign) {
      var tupleArgs = getTupleArgs(left);
      if (tupleArgs) {
        next();
        var right = parseMaybeTuple(noIn);
        var blockNode = startNodeFrom(left);
        blockNode.body = unpackTuple(tupleArgs, right);
        return finishNode(blockNode, "BlockStatement");
      }

      if (scope.isClass()) {
        var thisExpr = nc.createNodeFrom(left, "ThisExpression");
        left = nc.createNodeFrom(left, "MemberExpression", { object: thisExpr, property: left });
      }

      var node = startNodeFrom(left);
      node.operator = token.value;
      node.left = checkLVal(left);
      next();
      node.right = parseMaybeTuple(noIn);

      if (node.operator === '+=' || node.operator === '*=') {
        var right = nc.createNodeSpan(node.right, node.right, "CallExpression");
        right.callee = nc.createNodeOpsCallee(right, node.operator === '+=' ? "add" : "multiply");
        right.arguments = [left, node.right];
        node.right = right;
        node.operator = '=';
      }

      if (left.type === "Identifier" && !scope.exists(left.name)) {
        scope.addVar(left.name);
        return nc.createVarDeclFromId(node.left, node.left, node.right);
      }

      return finishNode(node, "AssignmentExpression");
    }
    return left;
  }

  function parseMaybeTuple(noIn) {
    var expr = parseExprOps(noIn);
    if (token.type === tt.comma) {
      return parseTuple(noIn, expr);
    }
    return expr;
  }

  function parseExprOps(noIn) {
    return parseExprOp(parseMaybeUnary(noIn), -1, noIn);
  }

  function parseExprOp(left, minPrec, noIn) {
    var node, exprNode, right, op = token.type, val = token.value;
    var prec = op === tt._not ? tt._in.prec : op.prec;
    if (op === tt.exponentiation && prec >= minPrec) {
      node = startNodeFrom(left);
      next();
      right = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
      exprNode = nc.createNodeMemberCall(node, "Math", "pow", [left, right]);
      return parseExprOp(exprNode, minPrec, noIn);
    } else if (prec != null && (!noIn || op !== tt._in)) {
      if (prec > minPrec) {
        next();
        node = startNodeFrom(left);
        if (op === tt.floorDiv) {
          right = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
          finishNode(node);
          var binExpr = nc.createNodeSpan(node, node, "BinaryExpression", { left: left, operator: '/', right: right });
          exprNode = nc.createNodeMemberCall(node, "Math", "floor", [binExpr]);
        } else if (op === tt._in || op === tt._not) {
          if (op === tt._in || eat(tt._in)) {
            right = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
            finishNode(node);
            var notLit = nc.createNodeSpan(node, node, "Literal", { value: op === tt._not });
            exprNode = nc.createNodeRuntimeCall(node, 'ops', 'in', [left, right, notLit]);
          } else exprNode = dummyIdent();
        } else if (op === tt.plusMin && val === '+' || op === tt.multiplyModulo && val === '*') {
          node.arguments = [left];
          node.arguments.push(parseExprOp(parseMaybeUnary(noIn), prec, noIn));
          finishNode(node, "CallExpression");
          node.callee = nc.createNodeOpsCallee(node, op === tt.plusMin ? "add" : "multiply");
          exprNode = node;
        } else {
          if (op === tt._is) {
            if (eat(tt._not)) node.operator = "!==";
            else node.operator = "===";
          } else node.operator = op.rep != null ? op.rep : val;

          // Accept '===' as '=='
          if (input[token.start - 1] === '=' && input[token.start - 2] === '=') next();

          node.left = left;
          node.right = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
          exprNode = finishNode(node, (op === tt._or || op === tt._and) ? "LogicalExpression" : "BinaryExpression");
        }
        return parseExprOp(exprNode, minPrec, noIn);
      }
    }
    return left;
  }

  function parseMaybeUnary(noIn) {
    if (token.type.prefix || token.type === tt.plusMin) {
      var prec = token.type === tt.plusMin ? tt.posNegNot.prec : token.type.prec;
      var node = startNode();
      node.operator = token.type.rep != null ? token.type.rep : token.value;
      node.prefix = true;
      next();
      node.argument = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
      return finishNode(node, "UnaryExpression");
    }
    return parseSubscripts(parseExprAtom(), false);
  }

  function parseSubscripts(base, noCalls) {
    var node = startNodeFrom(base);
    if (eat(tt.dot)) {
      var id = parseIdent(true);
      if (filbert.pythonRuntime.imports[base.name] && filbert.pythonRuntime.imports[base.name][id.name]) {
        // Calling a Python import function
        var runtimeId = nc.createNodeSpan(base, base, "Identifier", { name: options.runtimeParamName });
        var importsId = nc.createNodeSpan(base, base, "Identifier", { name: "imports" });
        var runtimeMember = nc.createNodeSpan(base, base, "MemberExpression", { object: runtimeId, property: importsId, computed: false });
        node.object = nc.createNodeSpan(base, base, "MemberExpression", { object: runtimeMember, property: base, computed: false });
      } else if (base.name && base.name === scope.getThisReplace()) {
        node.object = nc.createNodeSpan(base, base, "ThisExpression");
      } else node.object = base;
      node.property = id;
      node.computed = false;
      return parseSubscripts(finishNode(node, "MemberExpression"), noCalls);
    } else if (eat(tt.bracketL)) {
      var expr, isSlice = false;
      if (eat(tt.colon)) isSlice = true;
      else expr = parseExpression();
      if (!isSlice && eat(tt.colon)) isSlice = true;
      if (isSlice) return parseSlice(node, base, expr, noCalls);
      var subscriptCall = nc.createNodeSpan(expr, expr, "CallExpression");
      subscriptCall.callee = nc.createNodeOpsCallee(expr, "subscriptIndex");
      subscriptCall.arguments = [base, expr];
      node.object = base;
      node.property = subscriptCall;
      node.computed = true;
      expect(tt.bracketR);
      return parseSubscripts(finishNode(node, "MemberExpression"), noCalls);
    } else if (!noCalls && eat(tt.parenL)) {
      if (scope.isUserFunction(base.name)) {
        // Unpack parameters into JavaScript-friendly parameters, further processed at runtime
        var createParamsCall = nc.createNodeRuntimeCall(node, 'utils', 'createParamsObj', parseParamsList());
        node.arguments = [createParamsCall];
      } else node.arguments = parseExprList(tt.parenR, false);
      
      if (scope.isNewObj(base.name)) finishNode(node, "NewExpression");
      else finishNode(node, "CallExpression");
      if (filbert.pythonRuntime.functions[base.name]) {
        // Calling a Python built-in function
        var runtimeId = nc.createNodeSpan(base, base, "Identifier", { name: options.runtimeParamName });
        var functionsId = nc.createNodeSpan(base, base, "Identifier", { name: "functions" });
        var runtimeMember = nc.createNodeSpan(base, base, "MemberExpression", { object: runtimeId, property: functionsId, computed: false });
        node.callee = nc.createNodeSpan(base, base, "MemberExpression", { object: runtimeMember, property: base, computed: false });
      } else node.callee = base;
      return parseSubscripts(node, noCalls);
    }
    return base;
  }

  function parseSlice(node, base, start, noCalls) {
    var end, step;
    if (!start) start = nc.createNodeFrom(node, "Literal", { value: null });
    if (token.type === tt.bracketR || eat(tt.colon)) {
      end = nc.createNodeFrom(node, "Literal", { value: null });
    } else {
      end = parseExpression();
      if (token.type !== tt.bracketR) expect(tt.colon);
    }
    if (token.type === tt.bracketR) step = nc.createNodeFrom(node, "Literal", { value: null });
    else step = parseExpression();
    expect(tt.bracketR);

    node.arguments = [start, end, step];
    var sliceId = nc.createNodeFrom(base, "Identifier", { name: "_pySlice" });
    var memberExpr = nc.createNodeSpan(base, base, "MemberExpression", { object: base, property: sliceId, computed: false });
    node.callee = memberExpr;
    return parseSubscripts(finishNode(node, "CallExpression"), noCalls);
  }

  function parseExprAtom() {
    switch (token.type) {

    case tt._dict:
      next();
      return parseDict(tt.parenR);

    case tt.name:
      return parseIdent();

    case tt.num: case tt.string: case tt.regexp:
      var node = startNode();
      node.value = token.value;
      node.raw = input.slice(token.start, token.end);
      next();
      return finishNode(node, "Literal");

    case tt._None: case tt._True: case tt._False:
      var node = startNode();
      node.value = token.type.atomValue;
      node.raw = token.type.keyword;
      next();
      return finishNode(node, "Literal");

    case tt.parenL:
      var tokStartLoc1 = token.startLoc, tokStart1 = token.start;
      next();
      if (token.type === tt.parenR) {
        var node = parseTuple(true);
        eat(tt.parenR);
        return node;
      }
      var val = parseMaybeTuple(true);
      if (options.locations) {
        val.loc.start = tokStartLoc1;
        val.loc.end = token.endLoc;
      }
      if (options.ranges)
        val.range = [tokStart1, token.end];
      expect(tt.parenR);
      return val;

    case tt.bracketL:
      return parseList();

    case tt.braceL:
      return parseDict(tt.braceR);

    default:
      return dummyIdent();
    }
  }

  // Parse list

  // Custom list object is used to simulate native Python list
  // E.g. Python '[]' becomes JavaScript 'new __pythonRuntime.objects.list();'
  // If list comprehension, build something like this:
  //(function() {
  //  var _list = [];
  //  ...
  //  _list.push(expr);
  //  return _list;
  //}());

  function parseList() {
    var node = startNode();
    node.arguments = [];
    next();

    if (!eat(tt.bracketR)) {
      var expr = parseExprOps(false);
      if (token.type === tt._for || token.type === tt._if) {

        // List comprehension
        var tmpVarSuffix = newAstIdCount++;
        expr = nc.createListCompPush(expr, tmpVarSuffix);
        var body = parseCompIter(expr, true);
        finishNode(node);
        return nc.createListCompIife(node, body, tmpVarSuffix);

      } else if (eat(tt.comma)) {
        node.arguments = [expr].concat(parseExprList(tt.bracketR, true, false));
      }
      else {
        expect(tt.bracketR);
        node.arguments = [expr];
      }
    }

    finishNode(node, "NewExpression");
    var runtimeId = nc.createNodeSpan(node, node, "Identifier", { name: options.runtimeParamName });
    var objectsId = nc.createNodeSpan(node, node, "Identifier", { name: "objects" });
    var runtimeMember = nc.createNodeSpan(node, node, "MemberExpression", { object: runtimeId, property: objectsId, computed: false });
    var listId = nc.createNodeSpan(node, node, "Identifier", { name: "list" });
    node.callee = nc.createNodeSpan(node, node, "MemberExpression", { object: runtimeMember, property: listId, computed: false });
    return node;
  }

  // Parse a comp_iter from Python language grammar
  // 'expr' is the body to be used after unrolling the ifs and fors

  function parseCompIter(expr, first) {
    if (first && token.type !== tt._for) return dummyIdent();
    if (eat(tt.bracketR)) return expr;
    var node = startNode();
    if (eat(tt._for)) {
      var init = parseExpression(false, true);
      var tupleArgs = getTupleArgs(init);
      if (!tupleArgs) checkLVal(init);
      expect(tt._in);
      var right = parseExpression();
      var body = parseCompIter(expr, false);
      var block = nc.createNodeSpan(body, body, "BlockStatement", { body: [body] });
      finishNode(node, "BlockStatement");
      return nc.createFor(node, init, tupleArgs, right, block);
    } else if (eat(tt._if)) {
      if (token.type === tt.parenL) node.test = parseParenExpression();
      else node.test = parseExpression();
      node.consequent = parseCompIter(expr, false);
      return finishNode(node, "IfStatement");
    } else return dummyIdent();
  }

  // Parse class

  function parseClass(ctorNode) {
    // Container for class constructor and prototype functions
    var container = startNodeFrom(ctorNode);
    container.body = [];

    // Parse class signature
    ctorNode.id = parseIdent();
    ctorNode.params = [];
    var classParams = [];
    if (eat(tt.parenL)) {
      var first = true;
      while (!eat(tt.parenR) && token.type !== tt.eof) {
        if (!first) expect(tt.comma); else first = false;
        classParams.push(parseIdent());
      }
    }
    expect(tt.colon);

    // Start new namespace for class body
    scope.startClass(ctorNode.id.name);

    // Save a reference for source ranges
    var classBodyRefNode = finishNode(startNode());

    // Parse class body
    var classBlock = parseSuite();

    // Generate additional AST to implement class
    var classStmt = nc.createClass(container, ctorNode, classParams, classBodyRefNode, classBlock);

    scope.end();

    return classStmt;
  }

  // Parse dictionary
  // Custom dict object used to simulate native Python dict
  // E.g. "{'k1':'v1', 'k2':'v2'}" becomes "new __pythonRuntime.objects.dict(['k1', 'v1'], ['k2', 'v2']);"

  function parseDict(tokClose) {
    var node = startNode(), first = true, key, value;
    node.arguments = [];
    next();
    while (!eat(tokClose) && !eat(tt.newline) && token.type !== tt.eof) {
      if (!first) {
        expect(tt.comma);
      } else first = false;

      if (tokClose === tt.braceR) {
        key = parsePropertyName();
        expect(tt.colon);
        value = parseExprOps(false);
      } else if (tokClose === tt.parenR) {
        var keyId = parseIdent(true);
        key = startNodeFrom(keyId);
        key.value = keyId.name;
        finishNode(key, "Literal");
        expect(tt.eq);
        value = parseExprOps(false);
      }
      node.arguments.push(nc.createNodeSpan(key, value, "ArrayExpression", { elements: [key, value] }));
    }
    finishNode(node, "NewExpression");

    var runtimeId = nc.createNodeSpan(node, node, "Identifier", { name: options.runtimeParamName });
    var objectsId = nc.createNodeSpan(node, node, "Identifier", { name: "objects" });
    var runtimeMember = nc.createNodeSpan(node, node, "MemberExpression", { object: runtimeId, property: objectsId, computed: false });
    var listId = nc.createNodeSpan(node, node, "Identifier", { name: "dict" });
    node.callee = nc.createNodeSpan(node, node, "MemberExpression", { object: runtimeMember, property: listId, computed: false });

    return node;
  }

  function parsePropertyName() {
    if (token.type === tt.num || token.type === tt.string) return parseExprAtom();
    if (token.type === tt.name || token.type.keyword) return parseIdent();
  }

  function parseIdent() {
    var node = startNode();
    node.name = token.type === tt.name ? token.value : token.type.keyword;
    if (!node.name) node = dummyIdent();
    next();
    return finishNode(node, "Identifier");
  }

  function parseFunction(node) {
    var suffix = newAstIdCount++;
    node.id = parseIdent();
    node.params = [];

    // Parse parameters

    var formals = [];     // In order, maybe with default value
    var argsId = null;    // *args
    var kwargsId = null;  // **kwargs
    var first = true;
    expect(tt.parenL);
    while (!eat(tt.parenR) && token.type !== tt.eof) {
      if (!first) expect(tt.comma); else first = false;
      if (token.value === '*') {
        next(); argsId = parseIdent();
      } else if (token.value === '**') {
        next(); kwargsId = parseIdent();
      } else {
        var paramId = parseIdent();
        if (eat(tt.eq))
          formals.push({ id: paramId, expr: parseExprOps(false) });
        else
          formals.push({ id: paramId, expr: null });
      }
    }
    expect(tt.colon);

    scope.startFn(node.id.name);

    // If class method, remove class instance var from params and save for 'this' replacement
    if (scope.isParentClass()) {
      var selfId = formals.shift();
      scope.setThisReplace(selfId.id.name);
    }

    var body = parseSuite();
    node.body = nc.createNodeSpan(body, body, "BlockStatement", { body: [] });

    // Add runtime parameter processing

    if (formals.length > 0 || argsId || kwargsId) {
      node.body.body.push(nc.createNodeParamsCheck(node.id, suffix));
      node.body.body.push(nc.createVarDeclFromId(node.id,
        nc.createNodeSpan(node.id, node.id, "Identifier", { name: '__formalsIndex' + suffix }),
        nc.createNodeSpan(node.id, node.id, "Literal", { value: 0 })));
      node.body.body.push(nc.createVarDeclFromId(node.id,
        nc.createNodeSpan(node.id, node.id, "Identifier", { name: '__args' + suffix }),
        nc.createNodeSpan(node.id, node.id, "Identifier", { name: 'arguments' })));
    }
    if (formals.length > 0) {
      node.body.body.push(nc.createNodeGetParamFn(node.id, suffix));
      for (var i = 0; i < formals.length; i++) {
        var __getParamCall = nc.createNodeSpan(formals[i].id, formals[i].id, "CallExpression", {
          callee: nc.createNodeSpan(formals[i].id, formals[i].id, "Identifier", { name: '__getParam' + suffix }),
          arguments: [nc.createNodeSpan(formals[i].id, formals[i].id, "Literal", { value: formals[i].id.name })]
        });
        if (formals[i].expr) __getParamCall.arguments.push(formals[i].expr);
        node.body.body.push(nc.createVarDeclFromId(formals[i].id, formals[i].id, __getParamCall));
      }
    }
    var refNode = argsId || kwargsId;
    if (refNode) {
      if (argsId) {
        var argsAssign = nc.createVarDeclFromId(argsId, argsId, nc.createNodeSpan(argsId, argsId, "ArrayExpression", { elements: [] }));
        node.body.body.push(argsAssign);
      }
      if (kwargsId) {
        var kwargsAssign = nc.createVarDeclFromId(kwargsId, kwargsId, nc.createNodeSpan(kwargsId, kwargsId, "ObjectExpression", { properties: [] }));
        node.body.body.push(kwargsAssign);
      }
      var argsIf = nc.createNodeSpan(refNode, refNode, "IfStatement", {
        test: nc.createNodeSpan(refNode, refNode, "Identifier", { name: '__params' + suffix }),
        consequent: nc.createNodeSpan(refNode, refNode, "BlockStatement", { body: [] })
      })
      if (argsId) {
        argsIf.consequent.body.push(nc.createNodeArgsWhileConsequent(argsId, suffix));
        argsIf.alternate = nc.createNodeArgsAlternate(argsId);
      }
      if (kwargsId) {
        argsIf.consequent.body.push(nc.createNodeSpan(kwargsId, kwargsId, "ExpressionStatement", {
          expression: nc.createNodeSpan(kwargsId, kwargsId, "AssignmentExpression", {
            operator: '=', left: kwargsId, right: nc.createNodeMembIds(kwargsId, '__params' + suffix, 'keywords'),
          })
        }));
      }
      node.body.body.push(argsIf);
    }
    node.body.body.push(nc.createNodeFnBodyIife(body));

    // If class method, replace with prototype function literals
    var retNode;
    if (scope.isParentClass()) {
      finishNode(node);
      var classId = nc.createNodeSpan(node, node, "Identifier", { name: scope.getParentClassName() });
      var prototypeId = nc.createNodeSpan(node, node, "Identifier", { name: "prototype" });
      var functionId = node.id;
      var prototypeMember = nc.createNodeSpan(node, node, "MemberExpression", { object: classId, property: prototypeId, computed: false });
      var functionMember = nc.createNodeSpan(node, node, "MemberExpression", { object: prototypeMember, property: functionId, computed: false });
      var functionExpr = nc.createNodeSpan(node, node, "FunctionExpression", { body: node.body, params: node.params });
      var assignExpr = nc.createNodeSpan(node, node, "AssignmentExpression", { left: functionMember, operator: "=", right: functionExpr });
      retNode = nc.createNodeSpan(node, node, "ExpressionStatement", { expression: assignExpr });
    } else retNode = finishNode(node, "FunctionDeclaration");

    scope.end();

    return retNode;
  }

  function parseExprList(close) {
    var elts = [];
    while (!eat(close) && !eat(tt.newline) && token.type !== tt.eof) {
      var elt = parseExprOps(false);
      if (isDummy(elt)) {
        next();
      } else {
        elts.push(elt);
      }
      while (eat(tt.comma)) {}
    }
    return elts;
  }

  function parseParamsList() {
    var elts = [], first = true;
    while (!eat(tt.parenR) && !eat(tt.newline) && token.type !== tt.eof) {
      if (!first) expect(tt.comma);
      else first = false;
      var expr = parseExprOps(false);
      if (eat(tt.eq)) {
        var right = parseExprOps(false);
        var kwId = nc.createNodeSpan(expr, right, "Identifier", { name: "__kwp" });
        var kwLit = nc.createNodeSpan(expr, right, "Literal", { value: true });
        var left = nc.createNodeSpan(expr, right, "ObjectExpression", { properties: [] });
        left.properties.push({ type: "Property", key: expr, value: right, kind: "init" });
        left.properties.push({ type: "Property", key: kwId, value: kwLit, kind: "init" });
        expr = left;
      }
      elts.push(expr);
    }
    return elts;
  }

  function parseTuple(noIn, expr) {
    var node = expr ? startNodeFrom(expr) : startNode();
    node.arguments = expr ? [expr] : [];

    // Tuple with single element has special trailing comma: t = 'hi',
    // Look ahead and eat comma in this scenario
    if (token.type === tt.comma) {
      var pos = token.start + 1;
      while (isSpace(input.charCodeAt(pos))) ++pos;
      if (pos >= inputLen || input[pos] === ';' || input[pos] === ')' || isNewline(input.charCodeAt(pos)))
        eat(tt.comma);
    }

    while (eat(tt.comma)) {
      node.arguments.push(parseExprOps(noIn));
    }
    finishNode(node, "NewExpression");

    var runtimeId = nc.createNodeSpan(node, node, "Identifier", { name: options.runtimeParamName });
    var objectsId = nc.createNodeSpan(node, node, "Identifier", { name: "objects" });
    var runtimeMember = nc.createNodeSpan(node, node, "MemberExpression", { object: runtimeId, property: objectsId, computed: false });
    var listId = nc.createNodeSpan(node, node, "Identifier", { name: "tuple" });
    node.callee = nc.createNodeSpan(node, node, "MemberExpression", { object: runtimeMember, property: listId, computed: false });

    return node;
  }
});

TarGZ = function(){};

// Load and parse archive, calls onload after loading all files.
TarGZ.load = function(url, onload, onstream, onerror) 
{
  var o = new TarGZ();
  o.onload = onload;
  o.onerror = onerror;
  o.onstream = onstream;
  o.load(url);
  return o;
};

// Streams an archive from the given url, calling onstream after loading each file in archive.
// Calls onload after loading all files.
TarGZ.stream = function(url, onstream, onload, onerror) 
{
  var o = new TarGZ();
  o.onload = onload;
  o.onerror = onerror;
  o.onstream = onstream;
  o.load(url);
  return o;
};

TarGZ.prototype = {
  onerror : null,
  onload : null,
  onstream : null,
  ondata : null,
  
  load : function(url) {
    var self = this;
    var offset = {chunkBytes: 0, chunks: 0};
    var byteOffset = 0;
    this.files = [];
    GZip.load(url,
      function(h) {
        byteOffset = self.processTarChunks(h.data, byteOffset, h.outputSize);
        if (self.onload)
          self.onload(self.files, h);
      },
      function(h) {
        self.gzip = h;
        if (self.ondata) self.ondata(h);
        byteOffset = self.processTarChunks(h.data, byteOffset, h.outputSize);
      },
      function(xhr, e, h) {
        if (self.onerror)
          self.onerror(xhr, e, h);
      }
    );
  },
 
  cleanHighByte : function(s) {
    return s.replace(/./g, function(m) { 
      return String.fromCharCode(m.charCodeAt(0) & 0xff);
    });
  },
  
  parseTar : function(text) {
    this.files = [];
    this.processTarChunks([text], 0, text.length);
  },
  processTarChunks : function (chunks, offset, totalSize) {
    while (totalSize >= offset + 512) {
      var header = this.files.length == 0 ? null : this.files[this.files.length-1];
      if (header && header.data == null) {
        if (offset + header.length <= totalSize) {
          header.data = this.chunkSubstring(chunks, offset, offset+header.length);
          header.toDataURL = this.__toDataURL;
          offset += 512 * Math.ceil(header.length / 512);
          if (this.onstream) 
            this.onstream(header, this.gzip);
        } else { // not loaded yet
          break;
        }
      } else {
        var s = this.chunkSubstring(chunks, offset, offset+512);
        var header = this.parseTarHeader(s, 0);
        if (header.length > 0 || header.filename != '') {
          this.files.push(header);
          offset += 512;
          header.offset = offset;
        } else { // empty header, stop processing
          offset = totalSize;
        }
      }
    }
    return offset;
  },
  parseTarHeader : function(text, offset) {
    var i = offset || 0;
    var h = {};
    h.filename = text.substring(i, i+=100).split("\0", 1)[0];
    h.mode = text.substring(i, i+=8).split("\0", 1)[0];
    h.uid = text.substring(i, i+=8).split("\0", 1)[0];
    h.gid = text.substring(i, i+=8).split("\0", 1)[0];
    h.length = this.parseTarNumber(text.substring(i, i+=12));
    h.lastModified = text.substring(i, i+=12).split("\0", 1)[0];
    h.checkSum = text.substring(i, i+=8).split("\0", 1)[0];
    h.fileType = text.substring(i, i+=1).split("\0", 1)[0];
    h.linkName = text.substring(i, i+=100).split("\0", 1)[0];
    return h;
  },
  parseTarNumber : function(text) {
    // if (text.charCodeAt(0) & 0x80 == 1) {
    // GNU tar 8-byte binary big-endian number
    // } else {
      return parseInt(text.replace(/[^\d]/g, ''), 8);
    // }
  },

  // extract substring from an array of strings
  chunkSubstring : function (chunks, start, end) {
    var soff=0, eoff=0, i=0, j=0;
    for (i=0; i<chunks.length; i++) {
      if (soff + chunks[i].length > start)
        break;
      soff += chunks[i].length;
    }
    var strs = [];
    eoff = soff;
    for (j=i; j<chunks.length; j++) {
      strs.push(chunks[j]);
      if (eoff + chunks[j].length > end)
        break;
      eoff += chunks[j].length;
    }
    var s = strs.join('');
    return s.substring(start-soff, start-soff+(end-start));
  },

  __toDataURL : function() {
    if (this.data.substring(0,40).match(/^data:[^\/]+\/[^,]+,/)) {
      return this.data;
    } else if (TarGZ.prototype.cleanHighByte(this.data.substring(0,10)).match(/\377\330\377\340..JFIF/)) {
      return 'data:image/jpeg;base64,'+btoa(TarGZ.prototype.cleanHighByte(this.data));
    } else if (TarGZ.prototype.cleanHighByte(this.data.substring(0,6)) == "\211PNG\r\n") {
      return 'data:image/png;base64,'+btoa(TarGZ.prototype.cleanHighByte(this.data));
    } else if (TarGZ.prototype.cleanHighByte(this.data.substring(0,6)).match(/GIF8[79]a/)) {
      return 'data:image/gif;base64,'+btoa(TarGZ.prototype.cleanHighByte(this.data));
    } else 
    {
      //console.log("toDataURL: I don't know how to handle " + this.filename);
      return 'data:audio/wav;base64,'+btoa(TarGZ.prototype.cleanHighByte(this.data));
    }
  }
};



Bin = {
  byte : function(s, offset) {
    return s.charCodeAt(offset) & 0xff;
  },

  UInt16BE : function(s, offset) {
    return ((Bin.byte(s, offset) << 8) | Bin.byte(s, offset+1));
  },

  UInt32BE : function(s, offset) {
    return (
      (Bin.byte(s, offset) << 24) |
      (Bin.byte(s, offset+1) << 16) |
      (Bin.byte(s, offset+2) << 8) |
       Bin.byte(s, offset+3));
  },

  UInt16LE : function(s, offset) {
    return ((Bin.byte(s, offset+1) << 8) | Bin.byte(s, offset));
  },

  UInt32LE : function(s, offset) {
    return (
      (Bin.byte(s, offset+3) << 24) |
      (Bin.byte(s, offset+2) << 16) |
      (Bin.byte(s, offset+1) << 8) |
       Bin.byte(s, offset));
  },

  CString : function(s, offset) {
    var zeroIdx = offset;
    for (; zeroIdx<s.length; zeroIdx++) {
      if (Bin.byte(s, zeroIdx) == 0)
        break;
    }
    if (zeroIdx == s.length)
      throw("No null byte encountered");
    return s.substring(offset, zeroIdx);
  },

  CRC16 : function(s, start, length, crc) {
    return crc32(s, start, length, crc) & 0xffff;
  },

  CRC32 : function(s, start, length, crc) {
    return crc32(s, start, length, crc);
  }
};

GZip = {
  DEFLATE:  8,
  FTEXT:    1 << 0,
  FHCRC:    1 << 1,
  FEXTRA:   1 << 2,
  FNAME:    1 << 3,
  FCOMMENT: 1 << 4,

  loadlocal : function(data, onload, onstream, onerror) 
  {
    var self = this;
    var h = null;
    var s = data;

    try 
    {
    	var t = new Date;
    	if (!h) h = self.parseHeader(s);
    	self.parseAllBody(s, h, onstream);
    	self.parseFooter(s, h);
    	var elapsed = new Date() - t;
    	h.decompressionTime += elapsed;
    } 
    catch(e) 
    {
        console.log('error');
        return;
    }
    if (onload)
	{
    	onload(h, null);
	}
  },	

  load : function(data, url, onload, onstream, onerror) 
  {
    var xhr = new XMLHttpRequest();
    var self = this;
    var h = null;
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status == 0) {
          var s = xhr.responseText;

	      console.log('data');		
		  console.log(s);


          try {
            var t = new Date;
            if (!h) h = self.parseHeader(s);
            self.parseAllBody(s, h, onstream);
            self.parseFooter(s, h);
            var elapsed = new Date() - t;
            h.decompressionTime += elapsed;
          } catch(e) {
            onerror(xhr, e, h);
            return;
          }
          if (onload)
            onload(h, xhr);
        } else {
          if (onerror)
            onerror(xhr);
        }
      } else if (xhr.readyState == 3) {
        if (xhr.status == 200 || xhr.status == 0) {
          var s = xhr.responseText;
          if (s.length < 1024) return; // read in header
          try {
            var t = new Date;
            if (!h) h = self.parseHeader(s);
            self.parseBody(s, h, onstream);
            var elapsed = new Date() - t;
            h.decompressionTime += elapsed;
          } catch(e) {
            return;
          }
        }
      }
    };
    xhr.open("GET", url, true);
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    xhr.setRequestHeader("Content-Type", "text/plain");
    
    console.log('send');
    xhr.send(null);
  },

  parseHeader : function(s) {
    var h = {};
    h.decompressionTime = 0;
    h.id1 = Bin.byte(s,0);
    h.id2 = Bin.byte(s,1);
    h.compressionMethod = Bin.byte(s,2);
    if (h.id1 != 0x1f || h.id2 != 0x8b || h.compressionMethod != GZip.DEFLATE) {
      throw("Not a GZip file: " + h.id1 + ',' + h.id2 + ',' + h.compressionMethod);
    }
    h.flags = Bin.byte(s,3);
    h.mtime = Bin.UInt32LE(s, 4);
    h.extraFlags = Bin.byte(s, 8);
    h.operatingSystem = Bin.byte(s, 9);
    var offset = 10;
    if (h.flags & GZip.FEXTRA) {
      var xlen = Bin.UInt16LE(s, offset);
      offset += 2;
      h.extraField = s.substring(offset, offset+xlen);
      offset += xlen;
    }
    if (h.flags & GZip.FNAME) {
      h.filename = Bin.CString(s, offset);
      offset += h.filename.length + 1;
    }
    if (h.flags & GZip.FCOMMENT) {
      h.comment = Bin.CString(s, offset);
      offset += h.comment.length + 1;
    }
    h.computedHeaderCRC16 = Bin.CRC16(s, 0, offset, 0);
    if (h.flags & GZip.FHCRC) {
      h.headerCRC16 = Bin.UInt16LE(s, offset);
      if (h.computedHeaderCRC16 != null && h.headerCRC16 != h.computedHeaderCRC16)
        throw("Header CRC16 check failed");
      offset += 2;
    }
    h.offset = offset;
    h.data = [];
    h.outputSize = 0;
    h.inflater = new Inflater();
    h.inflater.start_inflate(h);
    return h;
  },
  
  parseBody : function(s, h, onstream) {
    h.inflater.continue_inflate(s, h, onstream);
    return h;
  },
  
  parseAllBody : function(s, h, onstream) {
    h.inflater.final_inflate(s, h, onstream);
    return h;
  },
  
  parseFooter : function(s, h) {
    h.CRC32 = Bin.UInt32LE(s, s.length-8);
    if (h.computedCRC32 && h.computedCRC32 != h.CRC32)
      throw("Data CRC32 check failed");
    h.inputSize = Bin.UInt32LE(s, s.length-4);
    if (h.data != null && h.inputSize != (h.outputSize % 0xffffffff))
      throw("Data length check failed");
    return h;
  }
};

/*   
=============================================================================== 
Crc32 is a JavaScript function for computing the CRC32 of a string 
............................................................................... 
 
Version: 1.2 - 2006/11 - http://noteslog.com/category/javascript/ 
 
------------------------------------------------------------------------------- 
Copyright (c) 2006 Andrea Ercolino 
http://www.opensource.org/licenses/mit-license.php 
=============================================================================== 
*/ 
 
(function() { 
    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
    var intTable = [];
    for (var i=0; i < table.length / 9; i++) {
      intTable.push(parseInt(table.substr( i*9, 8), 16));
    }
    /* Number */ 
    crc32 = function( /* String */ str, start, length, /* Number */ crc ) { 
        crc = crc ^ (-1);
        var end = Math.min(str.length, start + length);
        for( var i = start; i < end; i++ ) {
            var n = ( crc ^ str.charCodeAt( i ) ) & 0xFF; 
            crc = ( crc >>> 8 ) ^ intTable[n];
        } 
        return crc ^ (-1); 
    }; 
})();

/*
 * $Id: rawinflate.js,v 0.2 2009/03/01 18:32:24 dankogai Exp $
 *
 * original:
 * http://www.onicos.com/staff/iz/amuse/javascript/expert/inflate.txt
 */

Inflater = (function(){

/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0.0.1
 * LastModified: Dec 25 1999
 */

/* Interface:
 * data = zip_inflate(src);
 */

/* constant parameters */
var zip_WSIZE = 32768;        // Sliding Window size
var zip_STORED_BLOCK = 0;
var zip_STATIC_TREES = 1;
var zip_DYN_TREES  = 2;

/* for inflate */
var zip_lbits = 9;         // bits in base literal/length lookup table
var zip_dbits = 6;         // bits in base distance lookup table
var zip_INBUFSIZ = 32768;    // Input buffer size
var zip_INBUF_EXTRA = 64;    // Extra buffer

/* variables (inflate) */
var zip_slide;
var zip_wp;            // current position in slide
var zip_fixed_tl = null;    // inflate static
var zip_fixed_td;        // inflate static
var zip_fixed_bl, fixed_bd;    // inflate static
var zip_bit_buf;        // bit buffer
var zip_bit_len;        // bits in bit buffer
var zip_method;
var zip_eof;
var zip_copy_leng;
var zip_copy_dist;
var zip_tl, zip_td;    // literal/length and distance decoder tables
var zip_bl, zip_bd;    // number of bits decoded by tl and td

var zip_inflate_data;
var zip_inflate_pos;


/* constant tables (inflate) */
var zip_MASK_BITS = new Array(
  0x0000,
  0x0001, 0x0003, 0x0007, 0x000f, 0x001f, 0x003f, 0x007f, 0x00ff,
  0x01ff, 0x03ff, 0x07ff, 0x0fff, 0x1fff, 0x3fff, 0x7fff, 0xffff);
// Tables for deflate from PKZIP's appnote.txt.
var zip_cplens = new Array( // Copy lengths for literal codes 257..285
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0);
/* note: see note #13 above about the 258 in this list. */
var zip_cplext = new Array( // Extra bits for literal codes 257..285
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
  3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99); // 99==invalid
var zip_cpdist = new Array( // Copy offsets for distance codes 0..29
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577);
var zip_cpdext = new Array( // Extra bits for distance codes
  0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6,
  7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
  12, 12, 13, 13);
var zip_border = new Array(  // Order of the bit length code lengths
  16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15);
/* objects (inflate) */

var zip_HuftList = function() {
  this.next = null;
  this.list = null;
};

var zip_HuftNode = function() {
  this.e = 0; // number of extra bits or operation
  this.b = 0; // number of bits in this code or subcode

  // union
  this.n = 0; // literal, length base, or distance base
  this.t = null; // (zip_HuftNode) pointer to next level of table
};

var zip_HuftBuild = function(b,    // code lengths in bits (all assumed <= BMAX)
             n,    // number of codes (assumed <= N_MAX)
             s,    // number of simple-valued codes (0..s-1)
             d,    // list of base values for non-simple codes
             e,    // list of extra bits for non-simple codes
             mm    // maximum lookup bits
           ) {
  this.BMAX = 16;   // maximum bit length of any code
  this.N_MAX = 288; // maximum number of codes in any set
  this.status = 0;    // 0: success, 1: incomplete table, 2: bad input
  this.root = null;    // (zip_HuftList) starting table
  this.m = 0;        // maximum lookup bits, returns actual

/* Given a list of code lengths and a maximum table size, make a set of
   tables to decode that set of codes.    Return zero on success, one if
   the given code set is incomplete (the tables are still built in this
   case), two if the input is invalid (all zero length codes or an
   oversubscribed set of lengths), and three if not enough memory.
   The code with value 256 is special, and the tables are constructed
   so that no bits beyond that code are fetched when that code is
   decoded. */
  {
    var a;            // counter for codes of length k
    var c = new Array(this.BMAX+1);    // bit length count table
    var el;            // length of EOB code (value 256)
    var f;            // i repeats in table every f entries
    var g;            // maximum code length
    var h;            // table level
    var i;            // counter, current code
    var j;            // counter
    var k;            // number of bits in current code
    var lx = new Array(this.BMAX+1);    // stack of bits per table
    var p;            // pointer into c[], b[], or v[]
    var pidx;        // index of p
    var q;            // (zip_HuftNode) points to current table
    var r = new zip_HuftNode(); // table entry for structure assignment
    var u = new Array(this.BMAX); // zip_HuftNode[BMAX][]  table stack
    var v = new Array(this.N_MAX); // values in order of bit length
    var w;
    var x = new Array(this.BMAX+1);// bit offsets, then code stack
    var xp;            // pointer into x or c
    var y;            // number of dummy codes added
    var z;            // number of entries in current table
    var o;
    var tail;        // (zip_HuftList)

    tail = this.root = null;
    for(i = 0; i < c.length; i++)
      c[i] = 0;
    for(i = 0; i < lx.length; i++)
      lx[i] = 0;
    for(i = 0; i < u.length; i++)
      u[i] = null;
    for(i = 0; i < v.length; i++)
      v[i] = 0;
    for(i = 0; i < x.length; i++)
      x[i] = 0;

    // Generate counts for each bit length
    el = n > 256 ? b[256] : this.BMAX; // set length of EOB code, if any
    p = b; pidx = 0;
    i = n;
    do {
      c[p[pidx]]++;    // assume all entries <= BMAX
      pidx++;
    } while(--i > 0);
    if(c[0] == n) {    // null input--all zero length codes
      this.root = null;
      this.m = 0;
      this.status = 0;
      return;
    }

    // Find minimum and maximum length, bound *m by those
    for(j = 1; j <= this.BMAX; j++)
      if(c[j] != 0)
        break;
    k = j;            // minimum code length
    if(mm < j)
      mm = j;
    for(i = this.BMAX; i != 0; i--)
      if(c[i] != 0)
        break;
    g = i;            // maximum code length
    if(mm > i)
      mm = i;

    // Adjust last length count to fill out codes, if needed
    for(y = 1 << j; j < i; j++, y <<= 1)
      if((y -= c[j]) < 0) {
        this.status = 2;    // bad input: more codes than bits
        this.m = mm;
        return;
      }
    if((y -= c[i]) < 0) {
      this.status = 2;
      this.m = mm;
      return;
    }
    c[i] += y;

    // Generate starting offsets into the value table for each length
    x[1] = j = 0;
    p = c;
    pidx = 1;
    xp = 2;
    while(--i > 0)        // note that i == g from above
      x[xp++] = (j += p[pidx++]);

    // Make a table of values in order of bit lengths
    p = b; pidx = 0;
    i = 0;
    do {
      if((j = p[pidx++]) != 0)
        v[x[j]++] = i;
    } while(++i < n);
    n = x[g];            // set n to length of v

    // Generate the Huffman codes and for each, make the table entries
    x[0] = i = 0;        // first Huffman code is zero
    p = v; pidx = 0;        // grab values in bit order
    h = -1;            // no tables yet--level -1
    w = lx[0] = 0;        // no bits decoded yet
    q = null;            // ditto
    z = 0;            // ditto

    // go through the bit lengths (k already is bits in shortest code)
    for(; k <= g; k++) {
      a = c[k];
      while(a-- > 0) {
        // here i is the Huffman code of length k bits for value p[pidx]
        // make tables up to required level
        while(k > w + lx[1 + h]) {
          w += lx[1 + h]; // add bits already decoded
          h++;

          // compute minimum size table less than or equal to *m bits
          z = (z = g - w) > mm ? mm : z; // upper limit
          if((f = 1 << (j = k - w)) > a + 1) { // try a k-w bit table
            // too few codes for k-w bit table
            f -= a + 1;    // deduct codes from patterns left
            xp = k;
            while(++j < z) { // try smaller tables up to z bits
              if((f <<= 1) <= c[++xp])
                break;    // enough codes to use up j bits
              f -= c[xp];    // else deduct codes from patterns
            }
          }
          if(w + j > el && w < el)
            j = el - w;    // make EOB code end at table
          z = 1 << j;    // table entries for j-bit table
          lx[1 + h] = j; // set table size in stack

          // allocate and link in new table
          q = new Array(z);
          for(o = 0; o < z; o++) {
            q[o] = new zip_HuftNode();
          }

          if(tail == null)
            tail = this.root = new zip_HuftList();
          else
            tail = tail.next = new zip_HuftList();
          tail.next = null;
          tail.list = q;
          u[h] = q;    // table starts after link

          /* connect to last table, if there is one */
          if(h > 0) {
            x[h] = i;        // save pattern for backing up
            r.b = lx[h];    // bits to dump before this table
            r.e = 16 + j;    // bits in this table
            r.t = q;        // pointer to this table
            j = (i & ((1 << w) - 1)) >> (w - lx[h]);
            u[h-1][j].e = r.e;
            u[h-1][j].b = r.b;
            u[h-1][j].n = r.n;
            u[h-1][j].t = r.t;
          }
        }

        // set up table entry in r
        r.b = k - w;
        if(pidx >= n)
          r.e = 99;        // out of values--invalid code
        else if(p[pidx] < s) {
          r.e = (p[pidx] < 256 ? 16 : 15); // 256 is end-of-block code
          r.n = p[pidx++];    // simple code is just the value
        } else {
          r.e = e[p[pidx] - s];    // non-simple--look up in lists
          r.n = d[p[pidx++] - s];
        }

        // fill code-like entries with r //
        f = 1 << (k - w);
        for(j = i >> w; j < z; j += f) {
          q[j].e = r.e;
          q[j].b = r.b;
          q[j].n = r.n;
          q[j].t = r.t;
        }

        // backwards increment the k-bit code i
        for(j = 1 << (k - 1); (i & j) != 0; j >>= 1)
          i ^= j;
        i ^= j;

        // backup over finished tables
        while((i & ((1 << w) - 1)) != x[h]) {
          w -= lx[h];        // don't need to update q
          h--;
        }
      }
    }

    /* return actual size of base table */
    this.m = lx[1];

    /* Return true (1) if we were given an incomplete table */
    this.status = ((y != 0 && g != 1) ? 1 : 0);
  } /* end of constructor */
};


/* routines (inflate) */

var zip_GET_BYTE = function() {
  if(zip_inflate_data.length <= zip_inflate_pos)
    return -1;
  return zip_inflate_data.charCodeAt(zip_inflate_pos++) & 0xff;
};

var zip_NEEDBITS = function(n) {
  while(zip_bit_len < n) {
    zip_bit_buf |= zip_GET_BYTE() << zip_bit_len;
    zip_bit_len += 8;
  }
};

var zip_GETBITS = function(n) {
  return zip_bit_buf & zip_MASK_BITS[n];
};

var zip_DUMPBITS = function(n) {
  zip_bit_buf >>= n;
  zip_bit_len -= n;
};

var zip_inflate_codes = function(buff, off, size) {
  /* inflate (decompress) the codes in a deflated (compressed) block.
     Return an error code or zero if it all goes ok. */
  var e;        // table entry flag/number of extra bits
  var t;        // (zip_HuftNode) pointer to table entry
  var n;

  if(size == 0)
    return 0;

  // inflate the coded data
  n = 0;
  for(;;) {            // do until end of block
    zip_NEEDBITS(zip_bl);
    t = zip_tl.list[zip_GETBITS(zip_bl)];
    e = t.e;
    while(e > 16) {
      if(e == 99)
        return -1;
      zip_DUMPBITS(t.b);
      e -= 16;
      zip_NEEDBITS(e);
      t = t.t[zip_GETBITS(e)];
      e = t.e;
    }
    zip_DUMPBITS(t.b);

    if(e == 16) {        // then it's a literal
      zip_wp &= zip_WSIZE - 1;
      buff[off + n++] = zip_slide[zip_wp++] = t.n;
      if(n == size)
        return size;
      continue;
    }

    // exit if end of block
    if(e == 15)
      break;

    // it's an EOB or a length

    // get length of block to copy
    zip_NEEDBITS(e);
    zip_copy_leng = t.n + zip_GETBITS(e);
    zip_DUMPBITS(e);

    // decode distance of block to copy
    zip_NEEDBITS(zip_bd);
    t = zip_td.list[zip_GETBITS(zip_bd)];
    e = t.e;

    while(e > 16) {
      if(e == 99)
        return -1;
      zip_DUMPBITS(t.b);
      e -= 16;
      zip_NEEDBITS(e);
      t = t.t[zip_GETBITS(e)];
      e = t.e;
    }
    zip_DUMPBITS(t.b);
    zip_NEEDBITS(e);
    zip_copy_dist = zip_wp - t.n - zip_GETBITS(e);
    zip_DUMPBITS(e);

    // do the copy
    while(zip_copy_leng > 0 && n < size) {
      zip_copy_leng--;
      zip_copy_dist &= zip_WSIZE - 1;
      zip_wp &= zip_WSIZE - 1;
      buff[off + n++] = zip_slide[zip_wp++]
        = zip_slide[zip_copy_dist++];
    }

    if(n == size)
      return size;
  }

  zip_method = -1; // done
  return n;
};

var zip_inflate_stored = function(buff, off, size) {
  /* "decompress" an inflated type 0 (stored) block. */
  var n;

  // go to byte boundary
  n = zip_bit_len & 7;
  zip_DUMPBITS(n);

  // get the length and its complement
  zip_NEEDBITS(16);
  n = zip_GETBITS(16);
  zip_DUMPBITS(16);
  zip_NEEDBITS(16);
  if(n != ((~zip_bit_buf) & 0xffff))
    return -1;            // error in compressed data
  zip_DUMPBITS(16);

  // read and output the compressed data
  zip_copy_leng = n;

  n = 0;
  while(zip_copy_leng > 0 && n < size) {
    zip_copy_leng--;
    zip_wp &= zip_WSIZE - 1;
    zip_NEEDBITS(8);
    buff[off + n++] = zip_slide[zip_wp++] =
      zip_GETBITS(8);
    zip_DUMPBITS(8);
  }

  if(zip_copy_leng == 0)
    zip_method = -1; // done
  return n;
};

var zip_inflate_fixed = function(buff, off, size) {
  /* decompress an inflated type 1 (fixed Huffman codes) block.  We should
     either replace this with a custom decoder, or at least precompute the
     Huffman tables. */

  // if first time, set up tables for fixed blocks
  if(zip_fixed_tl == null) {
    var i;            // temporary variable
    var l = new Array(288);    // length list for huft_build
    var h;    // zip_HuftBuild

    // literal table
    for(i = 0; i < 144; i++)
      l[i] = 8;
    for(; i < 256; i++)
      l[i] = 9;
    for(; i < 280; i++)
      l[i] = 7;
    for(; i < 288; i++)    // make a complete, but wrong code set
      l[i] = 8;
    zip_fixed_bl = 7;

    h = new zip_HuftBuild(l, 288, 257, zip_cplens, zip_cplext,
                zip_fixed_bl);
    if(h.status != 0) {
      alert("HufBuild error: "+h.status);
      return -1;
    }
    zip_fixed_tl = h.root;
    zip_fixed_bl = h.m;

    // distance table
    for(i = 0; i < 30; i++)    // make an incomplete code set
      l[i] = 5;
    zip_fixed_bd = 5;

    h = new zip_HuftBuild(l, 30, 0, zip_cpdist, zip_cpdext, zip_fixed_bd);
    if(h.status > 1) {
      zip_fixed_tl = null;
      throw("HufBuild error: "+h.status);
      return -1;
    }
    zip_fixed_td = h.root;
    zip_fixed_bd = h.m;
  }

  zip_tl = zip_fixed_tl;
  zip_td = zip_fixed_td;
  zip_bl = zip_fixed_bl;
  zip_bd = zip_fixed_bd;
  return zip_inflate_codes(buff, off, size);
};

var zip_inflate_dynamic = function(buff, off, size) {
  // decompress an inflated type 2 (dynamic Huffman codes) block.
  var i;        // temporary variables
  var j;
  var l;        // last length
  var n;        // number of lengths to get
  var t;        // (zip_HuftNode) literal/length code table
  var nb;        // number of bit length codes
  var nl;        // number of literal/length codes
  var nd;        // number of distance codes
  var ll = new Array(286+30); // literal/length and distance code lengths
  var h;        // (zip_HuftBuild)

  for(i = 0; i < ll.length; i++)
    ll[i] = 0;

  // read in table lengths
  zip_NEEDBITS(5);
  nl = 257 + zip_GETBITS(5);    // number of literal/length codes
  zip_DUMPBITS(5);
  zip_NEEDBITS(5);
  nd = 1 + zip_GETBITS(5);    // number of distance codes
  zip_DUMPBITS(5);
  zip_NEEDBITS(4);
  nb = 4 + zip_GETBITS(4);    // number of bit length codes
  zip_DUMPBITS(4);
  if(nl > 286 || nd > 30)
    return -1;        // bad lengths

  // read in bit-length-code lengths
  for(j = 0; j < nb; j++)
  {
    zip_NEEDBITS(3);
    ll[zip_border[j]] = zip_GETBITS(3);
    zip_DUMPBITS(3);
  }
  for(; j < 19; j++)
    ll[zip_border[j]] = 0;

  // build decoding table for trees--single level, 7 bit lookup
  zip_bl = 7;
  h = new zip_HuftBuild(ll, 19, 19, null, null, zip_bl);
  if(h.status != 0)
    return -1;    // incomplete code set

  zip_tl = h.root;
  zip_bl = h.m;

  // read in literal and distance code lengths
  n = nl + nd;
  i = l = 0;
  while(i < n) {
    zip_NEEDBITS(zip_bl);
    t = zip_tl.list[zip_GETBITS(zip_bl)];
    j = t.b;
    zip_DUMPBITS(j);
    j = t.n;
    if(j < 16)        // length of code in bits (0..15)
      ll[i++] = l = j;    // save last length in l
    else if(j == 16) {    // repeat last length 3 to 6 times
      zip_NEEDBITS(2);
      j = 3 + zip_GETBITS(2);
      zip_DUMPBITS(2);
      if(i + j > n)
        return -1;
      while(j-- > 0)
        ll[i++] = l;
    } else if(j == 17) {    // 3 to 10 zero length codes
      zip_NEEDBITS(3);
      j = 3 + zip_GETBITS(3);
      zip_DUMPBITS(3);
      if(i + j > n)
        return -1;
      while(j-- > 0)
        ll[i++] = 0;
      l = 0;
    } else {        // j == 18: 11 to 138 zero length codes
      zip_NEEDBITS(7);
      j = 11 + zip_GETBITS(7);
      zip_DUMPBITS(7);
      if(i + j > n)
        return -1;
      while(j-- > 0)
        ll[i++] = 0;
      l = 0;
    }
  }

  // build the decoding tables for literal/length and distance codes
  zip_bl = zip_lbits;
  h = new zip_HuftBuild(ll, nl, 257, zip_cplens, zip_cplext, zip_bl);
  if(zip_bl == 0)    // no literals or lengths
    h.status = 1;
  if(h.status != 0) {
    if(h.status == 1)
      ;// **incomplete literal tree**
    return -1;        // incomplete code set
  }
  zip_tl = h.root;
  zip_bl = h.m;

  for(i = 0; i < nd; i++)
    ll[i] = ll[i + nl];
  zip_bd = zip_dbits;
  h = new zip_HuftBuild(ll, nd, 0, zip_cpdist, zip_cpdext, zip_bd);
  zip_td = h.root;
  zip_bd = h.m;

  if(zip_bd == 0 && nl > 257) {   // lengths but no distances
    // **incomplete distance tree**
    return -1;
  }

  if(h.status == 1) {
    ;// **incomplete distance tree**
  }
  if(h.status != 0)
    return -1;

  // decompress until an end-of-block code
  return zip_inflate_codes(buff, off, size);
};

var zip_inflate_start = function() {
  var i;

  if(zip_slide == null)
    zip_slide = new Array(2 * zip_WSIZE);
  zip_wp = 0;
  zip_bit_buf = 0;
  zip_bit_len = 0;
  zip_method = -1;
  zip_eof = false;
  zip_copy_leng = zip_copy_dist = 0;
  zip_tl = null;
};

var zip_inflate_internal = function(buff, off, size) {
  // decompress an inflated entry
  var n, i;

  n = 0;
  while(n < size) {
    if(zip_eof && zip_method == -1)
      return n;

    if(zip_copy_leng > 0) {
      if(zip_method != zip_STORED_BLOCK) {
        // STATIC_TREES or DYN_TREES
        while(zip_copy_leng > 0 && n < size) {
          zip_copy_leng--;
          zip_copy_dist &= zip_WSIZE - 1;
          zip_wp &= zip_WSIZE - 1;
          buff[off + n++] = zip_slide[zip_wp++] =
            zip_slide[zip_copy_dist++];
        }
      } else {
        while(zip_copy_leng > 0 && n < size) {
          zip_copy_leng--;
          zip_wp &= zip_WSIZE - 1;
          zip_NEEDBITS(8);
          buff[off + n++] = zip_slide[zip_wp++] = zip_GETBITS(8);
          zip_DUMPBITS(8);
        }
        if(zip_copy_leng == 0)
          zip_method = -1; // done
      }
      if(n == size)
        return n;
    }

    if(zip_method == -1) {
      if(zip_eof)
        break;

      // read in last block bit
      zip_NEEDBITS(1);
      if(zip_GETBITS(1) != 0)
        zip_eof = true;
      zip_DUMPBITS(1);

      // read in block type
      zip_NEEDBITS(2);
      zip_method = zip_GETBITS(2);
      zip_DUMPBITS(2);
      zip_tl = null;
      zip_copy_leng = 0;
    }

    switch(zip_method) {
      case 0: // zip_STORED_BLOCK
      i = zip_inflate_stored(buff, off + n, size - n);
      break;

      case 1: // zip_STATIC_TREES
      if(zip_tl != null)
        i = zip_inflate_codes(buff, off + n, size - n);
      else
        i = zip_inflate_fixed(buff, off + n, size - n);
      break;

      case 2: // zip_DYN_TREES
      if(zip_tl != null)
        i = zip_inflate_codes(buff, off + n, size - n);
      else
        i = zip_inflate_dynamic(buff, off + n, size - n);
      break;

      default: // error
      i = -1;
      break;
    }

    if(i == -1) {
      if(zip_eof)
        return 0;
      return -1;
    }
    n += i;
  }
  return n;
};

var final_data = false;
var start_inflate = function(h) {
  final_data = false;
  zip_inflate_start();
  zip_inflate_pos = h.offset;
  h.computedCRC32 = 0;
};
var continue_inflate = function(str, h, onstream) {
  var i, j;
  var BUFSZ = 4096;
  zip_inflate_data = str;
  if (!final_data && str.length <= zip_inflate_pos+BUFSZ+64)
    return h;

  var buff = new Array(BUFSZ);
  while((i = zip_inflate_internal(buff, 0, buff.length)) > 0) {
    var cbuf = new Array(i);
    for(j = 0; j < i; j++){
      cbuf[j] = String.fromCharCode(buff[j]);
    }
    var s = cbuf.join("");
    h.data.push(s);
    h.outputSize += s.length;
    h.offset = zip_inflate_pos;
    h.computedCRC32 = Bin.CRC32(s, 0, s.length, h.computedCRC32);
    if (!final_data && str.length <= zip_inflate_pos+BUFSZ+64)
      break;
  }
  zip_inflate_data = null; // G.C.
  if (onstream) onstream(h);
  return h;
};
var final_inflate = function(str, h, onstream) {
  final_data = true;
  continue_inflate(str, h, onstream);
};

this.inflate = function(str,h,onstream) {
  start_inflate(h);
  return final_inflate(str,h,onstream);
};
this.start_inflate = start_inflate;
this.continue_inflate = continue_inflate;
this.final_inflate = final_inflate;
});
/*  Prototype JavaScript framework, version 1.7.2
 *  (c) 2005-2010 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/

var Prototype = {

  Version: '1.7.2',

  Browser: (function(){
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE:             !!window.attachEvent && !isOpera,
      Opera:          isOpera,
      WebKit:         ua.indexOf('AppleWebKit/') > -1,
      Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari:   /Apple.*Mobile/.test(ua)
    }
  })(),

  BrowserFeatures: {
    XPath: !!document.evaluate,

    SelectorsAPI: !!document.querySelector,

    ElementExtensions: (function() {
      var constructor = window.Element || window.HTMLElement;
      return !!(constructor && constructor.prototype);
    })(),
    SpecificElementExtensions: (function() {
      if (typeof window.HTMLDivElement !== 'undefined')
        return true;

      var div = document.createElement('div'),
          form = document.createElement('form'),
          isSupported = false;

      if (div['__proto__'] && (div['__proto__'] !== form['__proto__'])) {
        isSupported = true;
      }

      div = form = null;

      return isSupported;
    })()
  },

  ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script\\s*>',
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

  emptyFunction: function() { },

  K: function(x) { return x }
};

if (Prototype.Browser.MobileSafari)
  Prototype.BrowserFeatures.SpecificElementExtensions = false;
/* Based on Alex Arnell's inheritance implementation. */

var Class = (function() {

  var IS_DONTENUM_BUGGY = (function(){
    for (var p in { toString: 1 }) {
      if (p === 'toString') return false;
    }
    return true;
  })();

  function subclass() {};
  function create() {
    var parent = null, properties = $A(arguments);
    if (Object.isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    Object.extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

    for (var i = 0, length = properties.length; i < length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = Prototype.emptyFunction;

    klass.prototype.constructor = klass;
    return klass;
  }

  function addMethods(source) {
    var ancestor   = this.superclass && this.superclass.prototype,
        properties = Object.keys(source);

    if (IS_DONTENUM_BUGGY) {
      if (source.toString != Object.prototype.toString)
        properties.push("toString");
      if (source.valueOf != Object.prototype.valueOf)
        properties.push("valueOf");
    }

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i], value = source[property];
      if (ancestor && Object.isFunction(value) &&
          value.argumentNames()[0] == "$super") {
        var method = value;
        value = (function(m) {
          return function() { return ancestor[m].apply(this, arguments); };
        })(property).wrap(method);

        value.valueOf = (function(method) {
          return function() { return method.valueOf.call(method); };
        })(method);

        value.toString = (function(method) {
          return function() { return method.toString.call(method); };
        })(method);
      }
      this.prototype[property] = value;
    }

    return this;
  }

  return {
    create: create,
    Methods: {
      addMethods: addMethods
    }
  };
})();
(function() {

  var _toString = Object.prototype.toString,
      _hasOwnProperty = Object.prototype.hasOwnProperty,
      NULL_TYPE = 'Null',
      UNDEFINED_TYPE = 'Undefined',
      BOOLEAN_TYPE = 'Boolean',
      NUMBER_TYPE = 'Number',
      STRING_TYPE = 'String',
      OBJECT_TYPE = 'Object',
      FUNCTION_CLASS = '[object Function]',
      BOOLEAN_CLASS = '[object Boolean]',
      NUMBER_CLASS = '[object Number]',
      STRING_CLASS = '[object String]',
      ARRAY_CLASS = '[object Array]',
      DATE_CLASS = '[object Date]',
      NATIVE_JSON_STRINGIFY_SUPPORT = window.JSON &&
        typeof JSON.stringify === 'function' &&
        JSON.stringify(0) === '0' &&
        typeof JSON.stringify(Prototype.K) === 'undefined';



  var DONT_ENUMS = ['toString', 'toLocaleString', 'valueOf',
   'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

  var IS_DONTENUM_BUGGY = (function(){
    for (var p in { toString: 1 }) {
      if (p === 'toString') return false;
    }
    return true;
  })();

  function Type(o) {
    switch(o) {
      case null: return NULL_TYPE;
      case (void 0): return UNDEFINED_TYPE;
    }
    var type = typeof o;
    switch(type) {
      case 'boolean': return BOOLEAN_TYPE;
      case 'number':  return NUMBER_TYPE;
      case 'string':  return STRING_TYPE;
    }
    return OBJECT_TYPE;
  }

  function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
  }

  function inspect(object) {
    try {
      if (isUndefined(object)) return 'undefined';
      if (object === null) return 'null';
      return object.inspect ? object.inspect() : String(object);
    } catch (e) {
      if (e instanceof RangeError) return '...';
      throw e;
    }
  }

  function toJSON(value) {
    return Str('', { '': value }, []);
  }

  function Str(key, holder, stack) {
    var value = holder[key];
    if (Type(value) === OBJECT_TYPE && typeof value.toJSON === 'function') {
      value = value.toJSON(key);
    }

    var _class = _toString.call(value);

    switch (_class) {
      case NUMBER_CLASS:
      case BOOLEAN_CLASS:
      case STRING_CLASS:
        value = value.valueOf();
    }

    switch (value) {
      case null: return 'null';
      case true: return 'true';
      case false: return 'false';
    }

    var type = typeof value;
    switch (type) {
      case 'string':
        return value.inspect(true);
      case 'number':
        return isFinite(value) ? String(value) : 'null';
      case 'object':

        for (var i = 0, length = stack.length; i < length; i++) {
          if (stack[i] === value) {
            throw new TypeError("Cyclic reference to '" + value + "' in object");
          }
        }
        stack.push(value);

        var partial = [];
        if (_class === ARRAY_CLASS) {
          for (var i = 0, length = value.length; i < length; i++) {
            var str = Str(i, value, stack);
            partial.push(typeof str === 'undefined' ? 'null' : str);
          }
          partial = '[' + partial.join(',') + ']';
        } else {
          var keys = Object.keys(value);
          for (var i = 0, length = keys.length; i < length; i++) {
            var key = keys[i], str = Str(key, value, stack);
            if (typeof str !== "undefined") {
               partial.push(key.inspect(true)+ ':' + str);
             }
          }
          partial = '{' + partial.join(',') + '}';
        }
        stack.pop();
        return partial;
    }
  }

  function stringify(object) {
    return JSON.stringify(object);
  }

  function toQueryString(object) {
    return $H(object).toQueryString();
  }

  function toHTML(object) {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
  }

  function keys(object) {
    if (Type(object) !== OBJECT_TYPE) { throw new TypeError(); }
    var results = [];
    for (var property in object) {
      if (_hasOwnProperty.call(object, property))
        results.push(property);
    }

    if (IS_DONTENUM_BUGGY) {
      for (var i = 0; property = DONT_ENUMS[i]; i++) {
        if (_hasOwnProperty.call(object, property))
          results.push(property);
      }
    }

    return results;
  }

  function values(object) {
    var results = [];
    for (var property in object)
      results.push(object[property]);
    return results;
  }

  function clone(object) {
    return extend({ }, object);
  }

  function isElement(object) {
    return !!(object && object.nodeType == 1);
  }

  function isArray(object) {
    return _toString.call(object) === ARRAY_CLASS;
  }

  var hasNativeIsArray = (typeof Array.isArray == 'function')
    && Array.isArray([]) && !Array.isArray({});

  if (hasNativeIsArray) {
    isArray = Array.isArray;
  }

  function isHash(object) {
    return object instanceof Hash;
  }

  function isFunction(object) {
    return _toString.call(object) === FUNCTION_CLASS;
  }

  function isString(object) {
    return _toString.call(object) === STRING_CLASS;
  }

  function isNumber(object) {
    return _toString.call(object) === NUMBER_CLASS;
  }

  function isDate(object) {
    return _toString.call(object) === DATE_CLASS;
  }

  function isUndefined(object) {
    return typeof object === "undefined";
  }

  extend(Object, {
    extend:        extend,
    inspect:       inspect,
    toJSON:        NATIVE_JSON_STRINGIFY_SUPPORT ? stringify : toJSON,
    toQueryString: toQueryString,
    toHTML:        toHTML,
    keys:          Object.keys || keys,
    values:        values,
    clone:         clone,
    isElement:     isElement,
    isArray:       isArray,
    isHash:        isHash,
    isFunction:    isFunction,
    isString:      isString,
    isNumber:      isNumber,
    isDate:        isDate,
    isUndefined:   isUndefined
  });
})();
Object.extend(Function.prototype, (function() {
  var slice = Array.prototype.slice;

  function update(array, args) {
    var arrayLength = array.length, length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
  }

  function merge(array, args) {
    array = slice.call(array, 0);
    return update(array, args);
  }

  function argumentNames() {
    var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
      .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
      .replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
  }


  function bind(context) {
    if (arguments.length < 2 && Object.isUndefined(arguments[0]))
      return this;

    if (!Object.isFunction(this))
      throw new TypeError("The object is not callable.");

    var nop = function() {};
    var __method = this, args = slice.call(arguments, 1);

    var bound = function() {
      var a = merge(args, arguments);
      var c = this instanceof bound ? this : context;
      return __method.apply(c, a);
    };

    nop.prototype   = this.prototype;
    bound.prototype = new nop();

    return bound;
  }

  function bindAsEventListener(context) {
    var __method = this, args = slice.call(arguments, 1);
    return function(event) {
      var a = update([event || window.event], args);
      return __method.apply(context, a);
    }
  }

  function curry() {
    if (!arguments.length) return this;
    var __method = this, args = slice.call(arguments, 0);
    return function() {
      var a = merge(args, arguments);
      return __method.apply(this, a);
    }
  }

  function delay(timeout) {
    var __method = this, args = slice.call(arguments, 1);
    timeout = timeout * 1000;
    return window.setTimeout(function() {
      return __method.apply(__method, args);
    }, timeout);
  }

  function defer() {
    var args = update([0.01], arguments);
    return this.delay.apply(this, args);
  }

  function wrap(wrapper) {
    var __method = this;
    return function() {
      var a = update([__method.bind(this)], arguments);
      return wrapper.apply(this, a);
    }
  }

  function methodize() {
    if (this._methodized) return this._methodized;
    var __method = this;
    return this._methodized = function() {
      var a = update([this], arguments);
      return __method.apply(null, a);
    };
  }

  var extensions = {
    argumentNames:       argumentNames,
    bindAsEventListener: bindAsEventListener,
    curry:               curry,
    delay:               delay,
    defer:               defer,
    wrap:                wrap,
    methodize:           methodize
  };

  if (!Function.prototype.bind)
    extensions.bind = bind;

  return extensions;
})());



(function(proto) {


  function toISOString() {
    return this.getUTCFullYear() + '-' +
      (this.getUTCMonth() + 1).toPaddedString(2) + '-' +
      this.getUTCDate().toPaddedString(2) + 'T' +
      this.getUTCHours().toPaddedString(2) + ':' +
      this.getUTCMinutes().toPaddedString(2) + ':' +
      this.getUTCSeconds().toPaddedString(2) + 'Z';
  }


  function toJSON() {
    return this.toISOString();
  }

  if (!proto.toISOString) proto.toISOString = toISOString;
  if (!proto.toJSON) proto.toJSON = toJSON;

})(Date.prototype);


RegExp.prototype.match = RegExp.prototype.test;

RegExp.escape = function(str) {
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};
var PeriodicalExecuter = Class.create({
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  execute: function() {
    this.callback(this);
  },

  stop: function() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  },

  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.execute();
        this.currentlyExecuting = false;
      } catch(e) {
        this.currentlyExecuting = false;
        throw e;
      }
    }
  }
});
Object.extend(String, {
  interpret: function(value) {
    return value == null ? '' : String(value);
  },
  specialChar: {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '\\': '\\\\'
  }
});

Object.extend(String.prototype, (function() {
  var NATIVE_JSON_PARSE_SUPPORT = window.JSON &&
    typeof JSON.parse === 'function' &&
    JSON.parse('{"test": true}').test;

  function prepareReplacement(replacement) {
    if (Object.isFunction(replacement)) return replacement;
    var template = new Template(replacement);
    return function(match) { return template.evaluate(match) };
  }

  function isNonEmptyRegExp(regexp) {
    return regexp.source && regexp.source !== '(?:)';
  }


  function gsub(pattern, replacement) {
    var result = '', source = this, match;
    replacement = prepareReplacement(replacement);

    if (Object.isString(pattern))
      pattern = RegExp.escape(pattern);

    if (!(pattern.length || isNonEmptyRegExp(pattern))) {
      replacement = replacement('');
      return replacement + source.split('').join(replacement) + replacement;
    }

    while (source.length > 0) {
      match = source.match(pattern)
      if (match && match[0].length > 0) {
        result += source.slice(0, match.index);
        result += String.interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;
  }

  function sub(pattern, replacement, count) {
    replacement = prepareReplacement(replacement);
    count = Object.isUndefined(count) ? 1 : count;

    return this.gsub(pattern, function(match) {
      if (--count < 0) return match[0];
      return replacement(match);
    });
  }

  function scan(pattern, iterator) {
    this.gsub(pattern, iterator);
    return String(this);
  }

  function truncate(length, truncation) {
    length = length || 30;
    truncation = Object.isUndefined(truncation) ? '...' : truncation;
    return this.length > length ?
      this.slice(0, length - truncation.length) + truncation : String(this);
  }

  function strip() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  }

  function stripTags() {
    return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
  }

  function stripScripts() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  }

  function extractScripts() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img'),
        matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  }

  function evalScripts() {
    return this.extractScripts().map(function(script) { return eval(script); });
  }

  function escapeHTML() {
    return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function unescapeHTML() {
    return this.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  }


  function toQueryParams(separator) {
    var match = this.strip().match(/([^?#]*)(#.*)?$/);
    if (!match) return { };

    return match[1].split(separator || '&').inject({ }, function(hash, pair) {
      if ((pair = pair.split('='))[0]) {
        var key = decodeURIComponent(pair.shift()),
            value = pair.length > 1 ? pair.join('=') : pair[0];

        if (value != undefined) {
          value = value.gsub('+', ' ');
          value = decodeURIComponent(value);
        }

        if (key in hash) {
          if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
          hash[key].push(value);
        }
        else hash[key] = value;
      }
      return hash;
    });
  }

  function toArray() {
    return this.split('');
  }

  function succ() {
    return this.slice(0, this.length - 1) +
      String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
  }

  function times(count) {
    return count < 1 ? '' : new Array(count + 1).join(this);
  }

  function camelize() {
    return this.replace(/-+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
  }

  function capitalize() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  }

  function underscore() {
    return this.replace(/::/g, '/')
               .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
               .replace(/([a-z\d])([A-Z])/g, '$1_$2')
               .replace(/-/g, '_')
               .toLowerCase();
  }

  function dasherize() {
    return this.replace(/_/g, '-');
  }

  function inspect(useDoubleQuotes) {
    var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character) {
      if (character in String.specialChar) {
        return String.specialChar[character];
      }
      return '\\u00' + character.charCodeAt().toPaddedString(2, 16);
    });
    if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
    return "'" + escapedString.replace(/'/g, '\\\'') + "'";
  }

  function unfilterJSON(filter) {
    return this.replace(filter || Prototype.JSONFilter, '$1');
  }

  function isJSON() {
    var str = this;
    if (str.blank()) return false;
    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
    return (/^[\],:{}\s]*$/).test(str);
  }

  function evalJSON(sanitize) {
    var json = this.unfilterJSON(),
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    if (cx.test(json)) {
      json = json.replace(cx, function (a) {
        return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      });
    }
    try {
      if (!sanitize || json.isJSON()) return eval('(' + json + ')');
    } catch (e) { }
    throw new SyntaxError('Badly formed JSON string: ' + this.inspect());
  }

  function parseJSON() {
    var json = this.unfilterJSON();
    return JSON.parse(json);
  }

  function include(pattern) {
    return this.indexOf(pattern) > -1;
  }

  function startsWith(pattern, position) {
    position = Object.isNumber(position) ? position : 0;
    return this.lastIndexOf(pattern, position) === position;
  }

  function endsWith(pattern, position) {
    pattern = String(pattern);
    position = Object.isNumber(position) ? position : this.length;
    if (position < 0) position = 0;
    if (position > this.length) position = this.length;
    var d = position - pattern.length;
    return d >= 0 && this.indexOf(pattern, d) === d;
  }

  function empty() {
    return this == '';
  }

  function blank() {
    return /^\s*$/.test(this);
  }

  function interpolate(object, pattern) {
    return new Template(this, pattern).evaluate(object);
  }

  return {
    gsub:           gsub,
    sub:            sub,
    scan:           scan,
    truncate:       truncate,
    strip:          String.prototype.trim || strip,
    stripTags:      stripTags,
    stripScripts:   stripScripts,
    extractScripts: extractScripts,
    evalScripts:    evalScripts,
    escapeHTML:     escapeHTML,
    unescapeHTML:   unescapeHTML,
    toQueryParams:  toQueryParams,
    parseQuery:     toQueryParams,
    toArray:        toArray,
    succ:           succ,
    times:          times,
    camelize:       camelize,
    capitalize:     capitalize,
    underscore:     underscore,
    dasherize:      dasherize,
    inspect:        inspect,
    unfilterJSON:   unfilterJSON,
    isJSON:         isJSON,
    evalJSON:       NATIVE_JSON_PARSE_SUPPORT ? parseJSON : evalJSON,
    include:        include,
    startsWith:     String.prototype.startsWith || startsWith,
    endsWith:       String.prototype.endsWith || endsWith,
    empty:          empty,
    blank:          blank,
    interpolate:    interpolate
  };
})());

var Template = Class.create({
  initialize: function(template, pattern) {
    this.template = template.toString();
    this.pattern = pattern || Template.Pattern;
  },

  evaluate: function(object) {
    if (object && Object.isFunction(object.toTemplateReplacements))
      object = object.toTemplateReplacements();

    return this.template.gsub(this.pattern, function(match) {
      if (object == null) return (match[1] + '');

      var before = match[1] || '';
      if (before == '\\') return match[2];

      var ctx = object, expr = match[3],
          pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;

      match = pattern.exec(expr);
      if (match == null) return before;

      while (match != null) {
        var comp = match[1].startsWith('[') ? match[2].replace(/\\\\]/g, ']') : match[1];
        ctx = ctx[comp];
        if (null == ctx || '' == match[3]) break;
        expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
        match = pattern.exec(expr);
      }

      return before + String.interpret(ctx);
    });
  }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

var $break = { };

var Enumerable = (function() {
  function each(iterator, context) {
    try {
      this._each(iterator, context);
    } catch (e) {
      if (e != $break) throw e;
    }
    return this;
  }

  function eachSlice(number, iterator, context) {
    var index = -number, slices = [], array = this.toArray();
    if (number < 1) return array;
    while ((index += number) < array.length)
      slices.push(array.slice(index, index+number));
    return slices.collect(iterator, context);
  }

  function all(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = true;
    this.each(function(value, index) {
      result = result && !!iterator.call(context, value, index, this);
      if (!result) throw $break;
    }, this);
    return result;
  }

  function any(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = false;
    this.each(function(value, index) {
      if (result = !!iterator.call(context, value, index, this))
        throw $break;
    }, this);
    return result;
  }

  function collect(iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];
    this.each(function(value, index) {
      results.push(iterator.call(context, value, index, this));
    }, this);
    return results;
  }

  function detect(iterator, context) {
    var result;
    this.each(function(value, index) {
      if (iterator.call(context, value, index, this)) {
        result = value;
        throw $break;
      }
    }, this);
    return result;
  }

  function findAll(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (iterator.call(context, value, index, this))
        results.push(value);
    }, this);
    return results;
  }

  function grep(filter, iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];

    if (Object.isString(filter))
      filter = new RegExp(RegExp.escape(filter));

    this.each(function(value, index) {
      if (filter.match(value))
        results.push(iterator.call(context, value, index, this));
    }, this);
    return results;
  }

  function include(object) {
    if (Object.isFunction(this.indexOf) && this.indexOf(object) != -1)
      return true;

    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  }

  function inGroupsOf(number, fillWith) {
    fillWith = Object.isUndefined(fillWith) ? null : fillWith;
    return this.eachSlice(number, function(slice) {
      while(slice.length < number) slice.push(fillWith);
      return slice;
    });
  }

  function inject(memo, iterator, context) {
    this.each(function(value, index) {
      memo = iterator.call(context, memo, value, index, this);
    }, this);
    return memo;
  }

  function invoke(method) {
    var args = $A(arguments).slice(1);
    return this.map(function(value) {
      return value[method].apply(value, args);
    });
  }

  function max(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index, this);
      if (result == null || value >= result)
        result = value;
    }, this);
    return result;
  }

  function min(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index, this);
      if (result == null || value < result)
        result = value;
    }, this);
    return result;
  }

  function partition(iterator, context) {
    iterator = iterator || Prototype.K;
    var trues = [], falses = [];
    this.each(function(value, index) {
      (iterator.call(context, value, index, this) ?
        trues : falses).push(value);
    }, this);
    return [trues, falses];
  }

  function pluck(property) {
    var results = [];
    this.each(function(value) {
      results.push(value[property]);
    });
    return results;
  }

  function reject(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (!iterator.call(context, value, index, this))
        results.push(value);
    }, this);
    return results;
  }

  function sortBy(iterator, context) {
    return this.map(function(value, index) {
      return {
        value: value,
        criteria: iterator.call(context, value, index, this)
      };
    }, this).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  }

  function toArray() {
    return this.map();
  }

  function zip() {
    var iterator = Prototype.K, args = $A(arguments);
    if (Object.isFunction(args.last()))
      iterator = args.pop();

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      return iterator(collections.pluck(index));
    });
  }

  function size() {
    return this.toArray().length;
  }

  function inspect() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }









  return {
    each:       each,
    eachSlice:  eachSlice,
    all:        all,
    every:      all,
    any:        any,
    some:       any,
    collect:    collect,
    map:        collect,
    detect:     detect,
    findAll:    findAll,
    select:     findAll,
    filter:     findAll,
    grep:       grep,
    include:    include,
    member:     include,
    inGroupsOf: inGroupsOf,
    inject:     inject,
    invoke:     invoke,
    max:        max,
    min:        min,
    partition:  partition,
    pluck:      pluck,
    reject:     reject,
    sortBy:     sortBy,
    toArray:    toArray,
    entries:    toArray,
    zip:        zip,
    size:       size,
    inspect:    inspect,
    find:       detect
  };
})();

function $A(iterable) {
  if (!iterable) return [];
  if ('toArray' in Object(iterable)) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
}


function $w(string) {
  if (!Object.isString(string)) return [];
  string = string.strip();
  return string ? string.split(/\s+/) : [];
}

Array.from = $A;


(function() {
  var arrayProto = Array.prototype,
      slice = arrayProto.slice,
      _each = arrayProto.forEach; // use native browser JS 1.6 implementation if available

  function each(iterator, context) {
    for (var i = 0, length = this.length >>> 0; i < length; i++) {
      if (i in this) iterator.call(context, this[i], i, this);
    }
  }
  if (!_each) _each = each;

  function clear() {
    this.length = 0;
    return this;
  }

  function first() {
    return this[0];
  }

  function last() {
    return this[this.length - 1];
  }

  function compact() {
    return this.select(function(value) {
      return value != null;
    });
  }

  function flatten() {
    return this.inject([], function(array, value) {
      if (Object.isArray(value))
        return array.concat(value.flatten());
      array.push(value);
      return array;
    });
  }

  function without() {
    var values = slice.call(arguments, 0);
    return this.select(function(value) {
      return !values.include(value);
    });
  }

  function reverse(inline) {
    return (inline === false ? this.toArray() : this)._reverse();
  }

  function uniq(sorted) {
    return this.inject([], function(array, value, index) {
      if (0 == index || (sorted ? array.last() != value : !array.include(value)))
        array.push(value);
      return array;
    });
  }

  function intersect(array) {
    return this.uniq().findAll(function(item) {
      return array.indexOf(item) !== -1;
    });
  }


  function clone() {
    return slice.call(this, 0);
  }

  function size() {
    return this.length;
  }

  function inspect() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  }

  function indexOf(item, i) {
    if (this == null) throw new TypeError();

    var array = Object(this), length = array.length >>> 0;
    if (length === 0) return -1;

    i = Number(i);
    if (isNaN(i)) {
      i = 0;
    } else if (i !== 0 && isFinite(i)) {
      i = (i > 0 ? 1 : -1) * Math.floor(Math.abs(i));
    }

    if (i > length) return -1;

    var k = i >= 0 ? i : Math.max(length - Math.abs(i), 0);
    for (; k < length; k++)
      if (k in array && array[k] === item) return k;
    return -1;
  }


  function lastIndexOf(item, i) {
    if (this == null) throw new TypeError();

    var array = Object(this), length = array.length >>> 0;
    if (length === 0) return -1;

    if (!Object.isUndefined(i)) {
      i = Number(i);
      if (isNaN(i)) {
        i = 0;
      } else if (i !== 0 && isFinite(i)) {
        i = (i > 0 ? 1 : -1) * Math.floor(Math.abs(i));
      }
    } else {
      i = length;
    }

    var k = i >= 0 ? Math.min(i, length - 1) :
     length - Math.abs(i);

    for (; k >= 0; k--)
      if (k in array && array[k] === item) return k;
    return -1;
  }

  function concat(_) {
    var array = [], items = slice.call(arguments, 0), item, n = 0;
    items.unshift(this);
    for (var i = 0, length = items.length; i < length; i++) {
      item = items[i];
      if (Object.isArray(item) && !('callee' in item)) {
        for (var j = 0, arrayLength = item.length; j < arrayLength; j++) {
          if (j in item) array[n] = item[j];
          n++;
        }
      } else {
        array[n++] = item;
      }
    }
    array.length = n;
    return array;
  }


  function wrapNative(method) {
    return function() {
      if (arguments.length === 0) {
        return method.call(this, Prototype.K);
      } else if (arguments[0] === undefined) {
        var args = slice.call(arguments, 1);
        args.unshift(Prototype.K);
        return method.apply(this, args);
      } else {
        return method.apply(this, arguments);
      }
    };
  }


  function map(iterator) {
    if (this == null) throw new TypeError();
    iterator = iterator || Prototype.K;

    var object = Object(this);
    var results = [], context = arguments[1], n = 0;

    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object) {
        results[n] = iterator.call(context, object[i], i, object);
      }
      n++;
    }
    results.length = n;
    return results;
  }

  if (arrayProto.map) {
    map = wrapNative(Array.prototype.map);
  }

  function filter(iterator) {
    if (this == null || !Object.isFunction(iterator))
      throw new TypeError();

    var object = Object(this);
    var results = [], context = arguments[1], value;

    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object) {
        value = object[i];
        if (iterator.call(context, value, i, object)) {
          results.push(value);
        }
      }
    }
    return results;
  }

  if (arrayProto.filter) {
    filter = Array.prototype.filter;
  }

  function some(iterator) {
    if (this == null) throw new TypeError();
    iterator = iterator || Prototype.K;
    var context = arguments[1];

    var object = Object(this);
    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object && iterator.call(context, object[i], i, object)) {
        return true;
      }
    }

    return false;
  }

  if (arrayProto.some) {
    var some = wrapNative(Array.prototype.some);
  }


  function every(iterator) {
    if (this == null) throw new TypeError();
    iterator = iterator || Prototype.K;
    var context = arguments[1];

    var object = Object(this);
    for (var i = 0, length = object.length >>> 0; i < length; i++) {
      if (i in object && !iterator.call(context, object[i], i, object)) {
        return false;
      }
    }

    return true;
  }

  if (arrayProto.every) {
    var every = wrapNative(Array.prototype.every);
  }

  var _reduce = arrayProto.reduce;
  function inject(memo, iterator) {
    iterator = iterator || Prototype.K;
    var context = arguments[2];
    return _reduce.call(this, iterator.bind(context), memo);
  }

  if (!arrayProto.reduce) {
    var inject = Enumerable.inject;
  }

  Object.extend(arrayProto, Enumerable);

  if (!arrayProto._reverse)
    arrayProto._reverse = arrayProto.reverse;

  Object.extend(arrayProto, {
    _each:     _each,

    map:       map,
    collect:   map,
    select:    filter,
    filter:    filter,
    findAll:   filter,
    some:      some,
    any:       some,
    every:     every,
    all:       every,
    inject:    inject,

    clear:     clear,
    first:     first,
    last:      last,
    compact:   compact,
    flatten:   flatten,
    without:   without,
    reverse:   reverse,
    uniq:      uniq,
    intersect: intersect,
    clone:     clone,
    toArray:   clone,
    size:      size,
    inspect:   inspect
  });

  var CONCAT_ARGUMENTS_BUGGY = (function() {
    return [].concat(arguments)[0][0] !== 1;
  })(1,2);

  if (CONCAT_ARGUMENTS_BUGGY) arrayProto.concat = concat;

  if (!arrayProto.indexOf) arrayProto.indexOf = indexOf;
  if (!arrayProto.lastIndexOf) arrayProto.lastIndexOf = lastIndexOf;
})();
function $H(object) {
  return new Hash(object);
};

var Hash = Class.create(Enumerable, (function() {
  function initialize(object) {
    this._object = Object.isHash(object) ? object.toObject() : Object.clone(object);
  }


  function _each(iterator, context) {
    var i = 0;
    for (var key in this._object) {
      var value = this._object[key], pair = [key, value];
      pair.key = key;
      pair.value = value;
      iterator.call(context, pair, i);
      i++;
    }
  }

  function set(key, value) {
    return this._object[key] = value;
  }

  function get(key) {
    if (this._object[key] !== Object.prototype[key])
      return this._object[key];
  }

  function unset(key) {
    var value = this._object[key];
    delete this._object[key];
    return value;
  }

  function toObject() {
    return Object.clone(this._object);
  }



  function keys() {
    return this.pluck('key');
  }

  function values() {
    return this.pluck('value');
  }

  function index(value) {
    var match = this.detect(function(pair) {
      return pair.value === value;
    });
    return match && match.key;
  }

  function merge(object) {
    return this.clone().update(object);
  }

  function update(object) {
    return new Hash(object).inject(this, function(result, pair) {
      result.set(pair.key, pair.value);
      return result;
    });
  }

  function toQueryPair(key, value) {
    if (Object.isUndefined(value)) return key;

    value = String.interpret(value);

    value = value.gsub(/(\r)?\n/, '\r\n');
    value = encodeURIComponent(value);
    value = value.gsub(/%20/, '+');
    return key + '=' + value;
  }

  function toQueryString() {
    return this.inject([], function(results, pair) {
      var key = encodeURIComponent(pair.key), values = pair.value;

      if (values && typeof values == 'object') {
        if (Object.isArray(values)) {
          var queryValues = [];
          for (var i = 0, len = values.length, value; i < len; i++) {
            value = values[i];
            queryValues.push(toQueryPair(key, value));
          }
          return results.concat(queryValues);
        }
      } else results.push(toQueryPair(key, values));
      return results;
    }).join('&');
  }

  function inspect() {
    return '#<Hash:{' + this.map(function(pair) {
      return pair.map(Object.inspect).join(': ');
    }).join(', ') + '}>';
  }

  function clone() {
    return new Hash(this);
  }

  return {
    initialize:             initialize,
    _each:                  _each,
    set:                    set,
    get:                    get,
    unset:                  unset,
    toObject:               toObject,
    toTemplateReplacements: toObject,
    keys:                   keys,
    values:                 values,
    index:                  index,
    merge:                  merge,
    update:                 update,
    toQueryString:          toQueryString,
    inspect:                inspect,
    toJSON:                 toObject,
    clone:                  clone
  };
})());

Hash.from = $H;
Object.extend(Number.prototype, (function() {
  function toColorPart() {
    return this.toPaddedString(2, 16);
  }

  function succ() {
    return this + 1;
  }

  function times(iterator, context) {
    $R(0, this, true).each(iterator, context);
    return this;
  }

  function toPaddedString(length, radix) {
    var string = this.toString(radix || 10);
    return '0'.times(length - string.length) + string;
  }

  function abs() {
    return Math.abs(this);
  }

  function round() {
    return Math.round(this);
  }

  function ceil() {
    return Math.ceil(this);
  }

  function floor() {
    return Math.floor(this);
  }

  return {
    toColorPart:    toColorPart,
    succ:           succ,
    times:          times,
    toPaddedString: toPaddedString,
    abs:            abs,
    round:          round,
    ceil:           ceil,
    floor:          floor
  };
})());

function $R(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}

var ObjectRange = Class.create(Enumerable, (function() {
  function initialize(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  }

  function _each(iterator, context) {
    var value = this.start, i;
    for (i = 0; this.include(value); i++) {
      iterator.call(context, value, i);
      value = value.succ();
    }
  }

  function include(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }

  return {
    initialize: initialize,
    _each:      _each,
    include:    include
  };
})());



var Abstract = { };


var Try = {
  these: function() {
    var returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) { }
    }

    return returnValue;
  }
};

var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new XMLHttpRequest()},
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) || false;
  },

  activeRequestCount: 0
};

Ajax.Responders = {
  responders: [],

  _each: function(iterator, context) {
    this.responders._each(iterator, context);
  },

  register: function(responder) {
    if (!this.include(responder))
      this.responders.push(responder);
  },

  unregister: function(responder) {
    this.responders = this.responders.without(responder);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (Object.isFunction(responder[callback])) {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) { }
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate:   function() { Ajax.activeRequestCount++ },
  onComplete: function() { Ajax.activeRequestCount-- }
});
Ajax.Base = Class.create({
  initialize: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      contentType:  'application/x-www-form-urlencoded',
      encoding:     'UTF-8',
      parameters:   '',
      evalJSON:     true,
      evalJS:       true
    };
    Object.extend(this.options, options || { });

    this.options.method = this.options.method.toLowerCase();

    if (Object.isHash(this.options.parameters))
      this.options.parameters = this.options.parameters.toObject();
  }
});
Ajax.Request = Class.create(Ajax.Base, {
  _complete: false,

  initialize: function($super, url, options) {
    $super(options);
    this.transport = Ajax.getTransport();
    this.request(url);
  },

  request: function(url) {
    this.url = url;
    this.method = this.options.method;
    var params = Object.isString(this.options.parameters) ?
          this.options.parameters :
          Object.toQueryString(this.options.parameters);

    if (!['get', 'post'].include(this.method)) {
      params += (params ? '&' : '') + "_method=" + this.method;
      this.method = 'post';
    }

    if (params && this.method === 'get') {
      this.url += (this.url.include('?') ? '&' : '?') + params;
    }

    this.parameters = params.toQueryParams();

    try {
      var response = new Ajax.Response(this);
      if (this.options.onCreate) this.options.onCreate(response);
      Ajax.Responders.dispatch('onCreate', this, response);

      this.transport.open(this.method.toUpperCase(), this.url,
        this.options.asynchronous);

      if (this.options.asynchronous) this.respondToReadyState.bind(this).defer(1);

      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();

      this.body = this.method == 'post' ? (this.options.postBody || params) : null;
      this.transport.send(this.body);

      /* Force Firefox to handle ready state 4 for synchronous requests */
      if (!this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange();

    }
    catch (e) {
      this.dispatchException(e);
    }
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState > 1 && !((readyState == 4) && this._complete))
      this.respondToReadyState(this.transport.readyState);
  },

  setRequestHeaders: function() {
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Prototype-Version': Prototype.Version,
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };

    if (this.method == 'post') {
      headers['Content-type'] = this.options.contentType +
        (this.options.encoding ? '; charset=' + this.options.encoding : '');

      /* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType &&
          (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
            headers['Connection'] = 'close';
    }

    if (typeof this.options.requestHeaders == 'object') {
      var extras = this.options.requestHeaders;

      if (Object.isFunction(extras.push))
        for (var i = 0, length = extras.length; i < length; i += 2)
          headers[extras[i]] = extras[i+1];
      else
        $H(extras).each(function(pair) { headers[pair.key] = pair.value });
    }

    for (var name in headers)
      if (headers[name] != null)
        this.transport.setRequestHeader(name, headers[name]);
  },

  success: function() {
    var status = this.getStatus();
    return !status || (status >= 200 && status < 300) || status == 304;
  },

  getStatus: function() {
    try {
      if (this.transport.status === 1223) return 204;
      return this.transport.status || 0;
    } catch (e) { return 0 }
  },

  respondToReadyState: function(readyState) {
    var state = Ajax.Request.Events[readyState], response = new Ajax.Response(this);

    if (state == 'Complete') {
      try {
        this._complete = true;
        (this.options['on' + response.status]
         || this.options['on' + (this.success() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(response, response.headerJSON);
      } catch (e) {
        this.dispatchException(e);
      }

      var contentType = response.getHeader('Content-type');
      if (this.options.evalJS == 'force'
          || (this.options.evalJS && this.isSameOrigin() && contentType
          && contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
        this.evalResponse();
    }

    try {
      (this.options['on' + state] || Prototype.emptyFunction)(response, response.headerJSON);
      Ajax.Responders.dispatch('on' + state, this, response, response.headerJSON);
    } catch (e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      this.transport.onreadystatechange = Prototype.emptyFunction;
    }
  },

  isSameOrigin: function() {
    var m = this.url.match(/^\s*https?:\/\/[^\/]*/);
    return !m || (m[0] == '#{protocol}//#{domain}#{port}'.interpolate({
      protocol: location.protocol,
      domain: document.domain,
      port: location.port ? ':' + location.port : ''
    }));
  },

  getHeader: function(name) {
    try {
      return this.transport.getResponseHeader(name) || null;
    } catch (e) { return null; }
  },

  evalResponse: function() {
    try {
      return eval((this.transport.responseText || '').unfilterJSON());
    } catch (e) {
      this.dispatchException(e);
    }
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];








Ajax.Response = Class.create({
  initialize: function(request){
    this.request = request;
    var transport  = this.transport  = request.transport,
        readyState = this.readyState = transport.readyState;

    if ((readyState > 2 && !Prototype.Browser.IE) || readyState == 4) {
      this.status       = this.getStatus();
      this.statusText   = this.getStatusText();
      this.responseText = String.interpret(transport.responseText);
      this.headerJSON   = this._getHeaderJSON();
    }

    if (readyState == 4) {
      var xml = transport.responseXML;
      this.responseXML  = Object.isUndefined(xml) ? null : xml;
      this.responseJSON = this._getResponseJSON();
    }
  },

  status:      0,

  statusText: '',

  getStatus: Ajax.Request.prototype.getStatus,

  getStatusText: function() {
    try {
      return this.transport.statusText || '';
    } catch (e) { return '' }
  },

  getHeader: Ajax.Request.prototype.getHeader,

  getAllHeaders: function() {
    try {
      return this.getAllResponseHeaders();
    } catch (e) { return null }
  },

  getResponseHeader: function(name) {
    return this.transport.getResponseHeader(name);
  },

  getAllResponseHeaders: function() {
    return this.transport.getAllResponseHeaders();
  },

  _getHeaderJSON: function() {
    var json = this.getHeader('X-JSON');
    if (!json) return null;

    try {
      json = decodeURIComponent(escape(json));
    } catch(e) {
    }

    try {
      return json.evalJSON(this.request.options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  },

  _getResponseJSON: function() {
    var options = this.request.options;
    if (!options.evalJSON || (options.evalJSON != 'force' &&
      !(this.getHeader('Content-type') || '').include('application/json')) ||
        this.responseText.blank())
          return null;
    try {
      return this.responseText.evalJSON(options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  }
});

Ajax.Updater = Class.create(Ajax.Request, {
  initialize: function($super, container, url, options) {
    this.container = {
      success: (container.success || container),
      failure: (container.failure || (container.success ? null : container))
    };

    options = Object.clone(options);
    var onComplete = options.onComplete;
    options.onComplete = (function(response, json) {
      this.updateContent(response.responseText);
      if (Object.isFunction(onComplete)) onComplete(response, json);
    }).bind(this);

    $super(url, options);
  },

  updateContent: function(responseText) {
    var receiver = this.container[this.success() ? 'success' : 'failure'],
        options = this.options;

    if (!options.evalScripts) responseText = responseText.stripScripts();

    if (receiver = $(receiver)) {
      if (options.insertion) {
        if (Object.isString(options.insertion)) {
          var insertion = { }; insertion[options.insertion] = responseText;
          receiver.insert(insertion);
        }
        else options.insertion(receiver, responseText);
      }
      else receiver.update(responseText);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
  initialize: function($super, container, url, options) {
    $super(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = { };
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(response) {
    if (this.options.decay) {
      this.decay = (response.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = response.responseText;
    }
    this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});

(function(GLOBAL) {

  var UNDEFINED;
  var SLICE = Array.prototype.slice;

  var DIV = document.createElement('div');


  function $(element) {
    if (arguments.length > 1) {
      for (var i = 0, elements = [], length = arguments.length; i < length; i++)
        elements.push($(arguments[i]));
      return elements;
    }

    if (Object.isString(element))
      element = document.getElementById(element);
    return Element.extend(element);
  }

  GLOBAL.$ = $;


  if (!GLOBAL.Node) GLOBAL.Node = {};

  if (!GLOBAL.Node.ELEMENT_NODE) {
    Object.extend(GLOBAL.Node, {
      ELEMENT_NODE:                1,
      ATTRIBUTE_NODE:              2,
      TEXT_NODE:                   3,
      CDATA_SECTION_NODE:          4,
      ENTITY_REFERENCE_NODE:       5,
      ENTITY_NODE:                 6,
      PROCESSING_INSTRUCTION_NODE: 7,
      COMMENT_NODE:                8,
      DOCUMENT_NODE:               9,
      DOCUMENT_TYPE_NODE:         10,
      DOCUMENT_FRAGMENT_NODE:     11,
      NOTATION_NODE:              12
    });
  }

  var ELEMENT_CACHE = {};

  function shouldUseCreationCache(tagName, attributes) {
    if (tagName === 'select') return false;
    if ('type' in attributes) return false;
    return true;
  }

  var HAS_EXTENDED_CREATE_ELEMENT_SYNTAX = (function(){
    try {
      var el = document.createElement('<input name="x">');
      return el.tagName.toLowerCase() === 'input' && el.name === 'x';
    }
    catch(err) {
      return false;
    }
  })();


  var oldElement = GLOBAL.Element;
  function Element(tagName, attributes) {
    attributes = attributes || {};
    tagName = tagName.toLowerCase();

    if (HAS_EXTENDED_CREATE_ELEMENT_SYNTAX && attributes.name) {
      tagName = '<' + tagName + ' name="' + attributes.name + '">';
      delete attributes.name;
      return Element.writeAttribute(document.createElement(tagName), attributes);
    }

    if (!ELEMENT_CACHE[tagName])
      ELEMENT_CACHE[tagName] = Element.extend(document.createElement(tagName));

    var node = shouldUseCreationCache(tagName, attributes) ?
     ELEMENT_CACHE[tagName].cloneNode(false) : document.createElement(tagName);

    return Element.writeAttribute(node, attributes);
  }

  GLOBAL.Element = Element;

  Object.extend(GLOBAL.Element, oldElement || {});
  if (oldElement) GLOBAL.Element.prototype = oldElement.prototype;

  Element.Methods = { ByTag: {}, Simulated: {} };

  var methods = {};

  var INSPECT_ATTRIBUTES = { id: 'id', className: 'class' };
  function inspect(element) {
    element = $(element);
    var result = '<' + element.tagName.toLowerCase();

    var attribute, value;
    for (var property in INSPECT_ATTRIBUTES) {
      attribute = INSPECT_ATTRIBUTES[property];
      value = (element[property] || '').toString();
      if (value) result += ' ' + attribute + '=' + value.inspect(true);
    }

    return result + '>';
  }

  methods.inspect = inspect;


  function visible(element) {
    return $(element).style.display !== 'none';
  }

  function toggle(element, bool) {
    element = $(element);
    if (Object.isUndefined(bool))
      bool = !Element.visible(element);
    Element[bool ? 'show' : 'hide'](element);

    return element;
  }

  function hide(element) {
    element = $(element);
    element.style.display = 'none';
    return element;
  }

  function show(element) {
    element = $(element);
    element.style.display = '';
    return element;
  }


  Object.extend(methods, {
    visible: visible,
    toggle:  toggle,
    hide:    hide,
    show:    show
  });


  function remove(element) {
    element = $(element);
    element.parentNode.removeChild(element);
    return element;
  }

  var SELECT_ELEMENT_INNERHTML_BUGGY = (function(){
    var el = document.createElement("select"),
        isBuggy = true;
    el.innerHTML = "<option value=\"test\">test</option>";
    if (el.options && el.options[0]) {
      isBuggy = el.options[0].nodeName.toUpperCase() !== "OPTION";
    }
    el = null;
    return isBuggy;
  })();

  var TABLE_ELEMENT_INNERHTML_BUGGY = (function(){
    try {
      var el = document.createElement("table");
      if (el && el.tBodies) {
        el.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
        var isBuggy = typeof el.tBodies[0] == "undefined";
        el = null;
        return isBuggy;
      }
    } catch (e) {
      return true;
    }
  })();

  var LINK_ELEMENT_INNERHTML_BUGGY = (function() {
    try {
      var el = document.createElement('div');
      el.innerHTML = "<link />";
      var isBuggy = (el.childNodes.length === 0);
      el = null;
      return isBuggy;
    } catch(e) {
      return true;
    }
  })();

  var ANY_INNERHTML_BUGGY = SELECT_ELEMENT_INNERHTML_BUGGY ||
   TABLE_ELEMENT_INNERHTML_BUGGY || LINK_ELEMENT_INNERHTML_BUGGY;

  var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING = (function () {
    var s = document.createElement("script"),
        isBuggy = false;
    try {
      s.appendChild(document.createTextNode(""));
      isBuggy = !s.firstChild ||
        s.firstChild && s.firstChild.nodeType !== 3;
    } catch (e) {
      isBuggy = true;
    }
    s = null;
    return isBuggy;
  })();

  function update(element, content) {
    element = $(element);

    var descendants = element.getElementsByTagName('*'),
     i = descendants.length;
    while (i--) purgeElement(descendants[i]);

    if (content && content.toElement)
      content = content.toElement();

    if (Object.isElement(content))
      return element.update().insert(content);


    content = Object.toHTML(content);
    var tagName = element.tagName.toUpperCase();

    if (tagName === 'SCRIPT' && SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING) {
      element.text = content;
      return element;
    }

    if (ANY_INNERHTML_BUGGY) {
      if (tagName in INSERTION_TRANSLATIONS.tags) {
        while (element.firstChild)
          element.removeChild(element.firstChild);

        var nodes = getContentFromAnonymousElement(tagName, content.stripScripts());
        for (var i = 0, node; node = nodes[i]; i++)
          element.appendChild(node);

      } else if (LINK_ELEMENT_INNERHTML_BUGGY && Object.isString(content) && content.indexOf('<link') > -1) {
        while (element.firstChild)
          element.removeChild(element.firstChild);

        var nodes = getContentFromAnonymousElement(tagName,
         content.stripScripts(), true);

        for (var i = 0, node; node = nodes[i]; i++)
          element.appendChild(node);
      } else {
        element.innerHTML = content.stripScripts();
      }
    } else {
      element.innerHTML = content.stripScripts();
    }

    content.evalScripts.bind(content).defer();
    return element;
  }

  function replace(element, content) {
    element = $(element);

    if (content && content.toElement) {
      content = content.toElement();
    } else if (!Object.isElement(content)) {
      content = Object.toHTML(content);
      var range = element.ownerDocument.createRange();
      range.selectNode(element);
      content.evalScripts.bind(content).defer();
      content = range.createContextualFragment(content.stripScripts());
    }

    element.parentNode.replaceChild(content, element);
    return element;
  }

  var INSERTION_TRANSLATIONS = {
    before: function(element, node) {
      element.parentNode.insertBefore(node, element);
    },
    top: function(element, node) {
      element.insertBefore(node, element.firstChild);
    },
    bottom: function(element, node) {
      element.appendChild(node);
    },
    after: function(element, node) {
      element.parentNode.insertBefore(node, element.nextSibling);
    },

    tags: {
      TABLE:  ['<table>',                '</table>',                   1],
      TBODY:  ['<table><tbody>',         '</tbody></table>',           2],
      TR:     ['<table><tbody><tr>',     '</tr></tbody></table>',      3],
      TD:     ['<table><tbody><tr><td>', '</td></tr></tbody></table>', 4],
      SELECT: ['<select>',               '</select>',                  1]
    }
  };

  var tags = INSERTION_TRANSLATIONS.tags;

  Object.extend(tags, {
    THEAD: tags.TBODY,
    TFOOT: tags.TBODY,
    TH:    tags.TD
  });

  function replace_IE(element, content) {
    element = $(element);
    if (content && content.toElement)
      content = content.toElement();
    if (Object.isElement(content)) {
      element.parentNode.replaceChild(content, element);
      return element;
    }

    content = Object.toHTML(content);
    var parent = element.parentNode, tagName = parent.tagName.toUpperCase();

    if (tagName in INSERTION_TRANSLATIONS.tags) {
      var nextSibling = Element.next(element);
      var fragments = getContentFromAnonymousElement(
       tagName, content.stripScripts());

      parent.removeChild(element);

      var iterator;
      if (nextSibling)
        iterator = function(node) { parent.insertBefore(node, nextSibling) };
      else
        iterator = function(node) { parent.appendChild(node); }

      fragments.each(iterator);
    } else {
      element.outerHTML = content.stripScripts();
    }

    content.evalScripts.bind(content).defer();
    return element;
  }

  if ('outerHTML' in document.documentElement)
    replace = replace_IE;

  function isContent(content) {
    if (Object.isUndefined(content) || content === null) return false;

    if (Object.isString(content) || Object.isNumber(content)) return true;
    if (Object.isElement(content)) return true;
    if (content.toElement || content.toHTML) return true;

    return false;
  }

  function insertContentAt(element, content, position) {
    position   = position.toLowerCase();
    var method = INSERTION_TRANSLATIONS[position];

    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) {
      method(element, content);
      return element;
    }

    content = Object.toHTML(content);
    var tagName = ((position === 'before' || position === 'after') ?
     element.parentNode : element).tagName.toUpperCase();

    var childNodes = getContentFromAnonymousElement(tagName, content.stripScripts());

    if (position === 'top' || position === 'after') childNodes.reverse();

    for (var i = 0, node; node = childNodes[i]; i++)
      method(element, node);

    content.evalScripts.bind(content).defer();
  }

  function insert(element, insertions) {
    element = $(element);

    if (isContent(insertions))
      insertions = { bottom: insertions };

    for (var position in insertions)
      insertContentAt(element, insertions[position], position);

    return element;
  }

  function wrap(element, wrapper, attributes) {
    element = $(element);

    if (Object.isElement(wrapper)) {
      $(wrapper).writeAttribute(attributes || {});
    } else if (Object.isString(wrapper)) {
      wrapper = new Element(wrapper, attributes);
    } else {
      wrapper = new Element('div', wrapper);
    }

    if (element.parentNode)
      element.parentNode.replaceChild(wrapper, element);

    wrapper.appendChild(element);

    return wrapper;
  }

  function cleanWhitespace(element) {
    element = $(element);
    var node = element.firstChild;

    while (node) {
      var nextNode = node.nextSibling;
      if (node.nodeType === Node.TEXT_NODE && !/\S/.test(node.nodeValue))
        element.removeChild(node);
      node = nextNode;
    }
    return element;
  }

  function empty(element) {
    return $(element).innerHTML.blank();
  }

  function getContentFromAnonymousElement(tagName, html, force) {
    var t = INSERTION_TRANSLATIONS.tags[tagName], div = DIV;

    var workaround = !!t;
    if (!workaround && force) {
      workaround = true;
      t = ['', '', 0];
    }

    if (workaround) {
      div.innerHTML = '&#160;' + t[0] + html + t[1];
      div.removeChild(div.firstChild);
      for (var i = t[2]; i--; )
        div = div.firstChild;
    } else {
      div.innerHTML = html;
    }

    return $A(div.childNodes);
  }

  function clone(element, deep) {
    if (!(element = $(element))) return;
    var clone = element.cloneNode(deep);
    if (!HAS_UNIQUE_ID_PROPERTY) {
      clone._prototypeUID = UNDEFINED;
      if (deep) {
        var descendants = Element.select(clone, '*'),
         i = descendants.length;
        while (i--)
          descendants[i]._prototypeUID = UNDEFINED;
      }
    }
    return Element.extend(clone);
  }

  function purgeElement(element) {
    var uid = getUniqueElementID(element);
    if (uid) {
      Element.stopObserving(element);
      if (!HAS_UNIQUE_ID_PROPERTY)
        element._prototypeUID = UNDEFINED;
      delete Element.Storage[uid];
    }
  }

  function purgeCollection(elements) {
    var i = elements.length;
    while (i--)
      purgeElement(elements[i]);
  }

  function purgeCollection_IE(elements) {
    var i = elements.length, element, uid;
    while (i--) {
      element = elements[i];
      uid = getUniqueElementID(element);
      delete Element.Storage[uid];
      delete Event.cache[uid];
    }
  }

  if (HAS_UNIQUE_ID_PROPERTY) {
    purgeCollection = purgeCollection_IE;
  }


  function purge(element) {
    if (!(element = $(element))) return;
    purgeElement(element);

    var descendants = element.getElementsByTagName('*'),
     i = descendants.length;

    while (i--) purgeElement(descendants[i]);

    return null;
  }

  Object.extend(methods, {
    remove:  remove,
    update:  update,
    replace: replace,
    insert:  insert,
    wrap:    wrap,
    cleanWhitespace: cleanWhitespace,
    empty:   empty,
    clone:   clone,
    purge:   purge
  });



  function recursivelyCollect(element, property, maximumLength) {
    element = $(element);
    maximumLength = maximumLength || -1;
    var elements = [];

    while (element = element[property]) {
      if (element.nodeType === Node.ELEMENT_NODE)
        elements.push(Element.extend(element));

      if (elements.length === maximumLength) break;
    }

    return elements;
  }


  function ancestors(element) {
    return recursivelyCollect(element, 'parentNode');
  }

  function descendants(element) {
    return Element.select(element, '*');
  }

  function firstDescendant(element) {
    element = $(element).firstChild;
    while (element && element.nodeType !== Node.ELEMENT_NODE)
      element = element.nextSibling;

    return $(element);
  }

  function immediateDescendants(element) {
    var results = [], child = $(element).firstChild;

    while (child) {
      if (child.nodeType === Node.ELEMENT_NODE)
        results.push(Element.extend(child));

      child = child.nextSibling;
    }

    return results;
  }

  function previousSiblings(element) {
    return recursivelyCollect(element, 'previousSibling');
  }

  function nextSiblings(element) {
    return recursivelyCollect(element, 'nextSibling');
  }

  function siblings(element) {
    element = $(element);
    var previous = previousSiblings(element),
     next = nextSiblings(element);
    return previous.reverse().concat(next);
  }

  function match(element, selector) {
    element = $(element);

    if (Object.isString(selector))
      return Prototype.Selector.match(element, selector);

    return selector.match(element);
  }


  function _recursivelyFind(element, property, expression, index) {
    element = $(element), expression = expression || 0, index = index || 0;
    if (Object.isNumber(expression)) {
      index = expression, expression = null;
    }

    while (element = element[property]) {
      if (element.nodeType !== 1) continue;
      if (expression && !Prototype.Selector.match(element, expression))
        continue;
      if (--index >= 0) continue;

      return Element.extend(element);
    }
  }


  function up(element, expression, index) {
    element = $(element);

    if (arguments.length === 1) return $(element.parentNode);
    return _recursivelyFind(element, 'parentNode', expression, index);
  }

  function down(element, expression, index) {
    if (arguments.length === 1) return firstDescendant(element);
    element = $(element), expression = expression || 0, index = index || 0;

    if (Object.isNumber(expression))
      index = expression, expression = '*';

    var node = Prototype.Selector.select(expression, element)[index];
    return Element.extend(node);
  }

  function previous(element, expression, index) {
    return _recursivelyFind(element, 'previousSibling', expression, index);
  }

  function next(element, expression, index) {
    return _recursivelyFind(element, 'nextSibling', expression, index);
  }

  function select(element) {
    element = $(element);
    var expressions = SLICE.call(arguments, 1).join(', ');
    return Prototype.Selector.select(expressions, element);
  }

  function adjacent(element) {
    element = $(element);
    var expressions = SLICE.call(arguments, 1).join(', ');
    var siblings = Element.siblings(element), results = [];
    for (var i = 0, sibling; sibling = siblings[i]; i++) {
      if (Prototype.Selector.match(sibling, expressions))
        results.push(sibling);
    }

    return results;
  }

  function descendantOf_DOM(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    while (element = element.parentNode)
      if (element === ancestor) return true;
    return false;
  }

  function descendantOf_contains(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    if (!ancestor.contains) return descendantOf_DOM(element, ancestor);
    return ancestor.contains(element) && ancestor !== element;
  }

  function descendantOf_compareDocumentPosition(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    return (element.compareDocumentPosition(ancestor) & 8) === 8;
  }

  var descendantOf;
  if (DIV.compareDocumentPosition) {
    descendantOf = descendantOf_compareDocumentPosition;
  } else if (DIV.contains) {
    descendantOf = descendantOf_contains;
  } else {
    descendantOf = descendantOf_DOM;
  }


  Object.extend(methods, {
    recursivelyCollect:   recursivelyCollect,
    ancestors:            ancestors,
    descendants:          descendants,
    firstDescendant:      firstDescendant,
    immediateDescendants: immediateDescendants,
    previousSiblings:     previousSiblings,
    nextSiblings:         nextSiblings,
    siblings:             siblings,
    match:                match,
    up:                   up,
    down:                 down,
    previous:             previous,
    next:                 next,
    select:               select,
    adjacent:             adjacent,
    descendantOf:         descendantOf,

    getElementsBySelector: select,

    childElements:         immediateDescendants
  });


  var idCounter = 1;
  function identify(element) {
    element = $(element);
    var id = Element.readAttribute(element, 'id');
    if (id) return id;

    do { id = 'anonymous_element_' + idCounter++ } while ($(id));

    Element.writeAttribute(element, 'id', id);
    return id;
  }


  function readAttribute(element, name) {
    return $(element).getAttribute(name);
  }

  function readAttribute_IE(element, name) {
    element = $(element);

    var table = ATTRIBUTE_TRANSLATIONS.read;
    if (table.values[name])
      return table.values[name](element, name);

    if (table.names[name]) name = table.names[name];

    if (name.include(':')) {
      if (!element.attributes || !element.attributes[name]) return null;
      return element.attributes[name].value;
    }

    return element.getAttribute(name);
  }

  function readAttribute_Opera(element, name) {
    if (name === 'title') return element.title;
    return element.getAttribute(name);
  }

  var PROBLEMATIC_ATTRIBUTE_READING = (function() {
    DIV.setAttribute('onclick', []);
    var value = DIV.getAttribute('onclick');
    var isFunction = Object.isArray(value);
    DIV.removeAttribute('onclick');
    return isFunction;
  })();

  if (PROBLEMATIC_ATTRIBUTE_READING) {
    readAttribute = readAttribute_IE;
  } else if (Prototype.Browser.Opera) {
    readAttribute = readAttribute_Opera;
  }


  function writeAttribute(element, name, value) {
    element = $(element);
    var attributes = {}, table = ATTRIBUTE_TRANSLATIONS.write;

    if (typeof name === 'object') {
      attributes = name;
    } else {
      attributes[name] = Object.isUndefined(value) ? true : value;
    }

    for (var attr in attributes) {
      name = table.names[attr] || attr;
      value = attributes[attr];
      if (table.values[attr])
        name = table.values[attr](element, value) || name;
      if (value === false || value === null)
        element.removeAttribute(name);
      else if (value === true)
        element.setAttribute(name, name);
      else element.setAttribute(name, value);
    }

    return element;
  }

  var PROBLEMATIC_HAS_ATTRIBUTE_WITH_CHECKBOXES = (function () {
    if (!HAS_EXTENDED_CREATE_ELEMENT_SYNTAX) {
      return false;
    }
    var checkbox = document.createElement('<input type="checkbox">');
    checkbox.checked = true;
    var node = checkbox.getAttributeNode('checked');
    return !node || !node.specified;
  })();

  function hasAttribute(element, attribute) {
    attribute = ATTRIBUTE_TRANSLATIONS.has[attribute] || attribute;
    var node = $(element).getAttributeNode(attribute);
    return !!(node && node.specified);
  }

  function hasAttribute_IE(element, attribute) {
    if (attribute === 'checked') {
      return element.checked;
    }
    return hasAttribute(element, attribute);
  }

  GLOBAL.Element.Methods.Simulated.hasAttribute =
   PROBLEMATIC_HAS_ATTRIBUTE_WITH_CHECKBOXES ?
   hasAttribute_IE : hasAttribute;

  function classNames(element) {
    return new Element.ClassNames(element);
  }

  var regExpCache = {};
  function getRegExpForClassName(className) {
    if (regExpCache[className]) return regExpCache[className];

    var re = new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    regExpCache[className] = re;
    return re;
  }

  function hasClassName(element, className) {
    if (!(element = $(element))) return;

    var elementClassName = element.className;

    if (elementClassName.length === 0) return false;
    if (elementClassName === className) return true;

    return getRegExpForClassName(className).test(elementClassName);
  }

  function addClassName(element, className) {
    if (!(element = $(element))) return;

    if (!hasClassName(element, className))
      element.className += (element.className ? ' ' : '') + className;

    return element;
  }

  function removeClassName(element, className) {
    if (!(element = $(element))) return;

    element.className = element.className.replace(
     getRegExpForClassName(className), ' ').strip();

    return element;
  }

  function toggleClassName(element, className, bool) {
    if (!(element = $(element))) return;

    if (Object.isUndefined(bool))
      bool = !hasClassName(element, className);

    var method = Element[bool ? 'addClassName' : 'removeClassName'];
    return method(element, className);
  }

  var ATTRIBUTE_TRANSLATIONS = {};

  var classProp = 'className', forProp = 'for';

  DIV.setAttribute(classProp, 'x');
  if (DIV.className !== 'x') {
    DIV.setAttribute('class', 'x');
    if (DIV.className === 'x')
      classProp = 'class';
  }

  var LABEL = document.createElement('label');
  LABEL.setAttribute(forProp, 'x');
  if (LABEL.htmlFor !== 'x') {
    LABEL.setAttribute('htmlFor', 'x');
    if (LABEL.htmlFor === 'x')
      forProp = 'htmlFor';
  }
  LABEL = null;

  function _getAttr(element, attribute) {
    return element.getAttribute(attribute);
  }

  function _getAttr2(element, attribute) {
    return element.getAttribute(attribute, 2);
  }

  function _getAttrNode(element, attribute) {
    var node = element.getAttributeNode(attribute);
    return node ? node.value : '';
  }

  function _getFlag(element, attribute) {
    return $(element).hasAttribute(attribute) ? attribute : null;
  }

  DIV.onclick = Prototype.emptyFunction;
  var onclickValue = DIV.getAttribute('onclick');

  var _getEv;

  if (String(onclickValue).indexOf('{') > -1) {
    _getEv = function(element, attribute) {
      var value = element.getAttribute(attribute);
      if (!value) return null;
      value = value.toString();
      value = value.split('{')[1];
      value = value.split('}')[0];
      return value.strip();
    };
  }
  else if (onclickValue === '') {
    _getEv = function(element, attribute) {
      var value = element.getAttribute(attribute);
      if (!value) return null;
      return value.strip();
    };
  }

  ATTRIBUTE_TRANSLATIONS.read = {
    names: {
      'class':     classProp,
      'className': classProp,
      'for':       forProp,
      'htmlFor':   forProp
    },

    values: {
      style: function(element) {
        return element.style.cssText.toLowerCase();
      },
      title: function(element) {
        return element.title;
      }
    }
  };

  ATTRIBUTE_TRANSLATIONS.write = {
    names: {
      className:   'class',
      htmlFor:     'for',
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing'
    },

    values: {
      checked: function(element, value) {
        element.checked = !!value;
      },

      style: function(element, value) {
        element.style.cssText = value ? value : '';
      }
    }
  };

  ATTRIBUTE_TRANSLATIONS.has = { names: {} };

  Object.extend(ATTRIBUTE_TRANSLATIONS.write.names,
   ATTRIBUTE_TRANSLATIONS.read.names);

  var CAMEL_CASED_ATTRIBUTE_NAMES = $w('colSpan rowSpan vAlign dateTime ' +
   'accessKey tabIndex encType maxLength readOnly longDesc frameBorder');

  for (var i = 0, attr; attr = CAMEL_CASED_ATTRIBUTE_NAMES[i]; i++) {
    ATTRIBUTE_TRANSLATIONS.write.names[attr.toLowerCase()] = attr;
    ATTRIBUTE_TRANSLATIONS.has.names[attr.toLowerCase()]   = attr;
  }

  Object.extend(ATTRIBUTE_TRANSLATIONS.read.values, {
    href:        _getAttr2,
    src:         _getAttr2,
    type:        _getAttr,
    action:      _getAttrNode,
    disabled:    _getFlag,
    checked:     _getFlag,
    readonly:    _getFlag,
    multiple:    _getFlag,
    onload:      _getEv,
    onunload:    _getEv,
    onclick:     _getEv,
    ondblclick:  _getEv,
    onmousedown: _getEv,
    onmouseup:   _getEv,
    onmouseover: _getEv,
    onmousemove: _getEv,
    onmouseout:  _getEv,
    onfocus:     _getEv,
    onblur:      _getEv,
    onkeypress:  _getEv,
    onkeydown:   _getEv,
    onkeyup:     _getEv,
    onsubmit:    _getEv,
    onreset:     _getEv,
    onselect:    _getEv,
    onchange:    _getEv
  });


  Object.extend(methods, {
    identify:        identify,
    readAttribute:   readAttribute,
    writeAttribute:  writeAttribute,
    classNames:      classNames,
    hasClassName:    hasClassName,
    addClassName:    addClassName,
    removeClassName: removeClassName,
    toggleClassName: toggleClassName
  });


  function normalizeStyleName(style) {
    if (style === 'float' || style === 'styleFloat')
      return 'cssFloat';
    return style.camelize();
  }

  function normalizeStyleName_IE(style) {
    if (style === 'float' || style === 'cssFloat')
      return 'styleFloat';
    return style.camelize();
  }

  function setStyle(element, styles) {
    element = $(element);
    var elementStyle = element.style, match;

    if (Object.isString(styles)) {
      elementStyle.cssText += ';' + styles;
      if (styles.include('opacity')) {
        var opacity = styles.match(/opacity:\s*(\d?\.?\d*)/)[1];
        Element.setOpacity(element, opacity);
      }
      return element;
    }

    for (var property in styles) {
      if (property === 'opacity') {
        Element.setOpacity(element, styles[property]);
      } else {
        var value = styles[property];
        if (property === 'float' || property === 'cssFloat') {
          property = Object.isUndefined(elementStyle.styleFloat) ?
           'cssFloat' : 'styleFloat';
        }
        elementStyle[property] = value;
      }
    }

    return element;
  }


  function getStyle(element, style) {
    element = $(element);
    style = normalizeStyleName(style);

    var value = element.style[style];
    if (!value || value === 'auto') {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }

    if (style === 'opacity') return value ? parseFloat(value) : 1.0;
    return value === 'auto' ? null : value;
  }

  function getStyle_Opera(element, style) {
    switch (style) {
      case 'height': case 'width':
        if (!Element.visible(element)) return null;

        var dim = parseInt(getStyle(element, style), 10);

        if (dim !== element['offset' + style.capitalize()])
          return dim + 'px';

        return Element.measure(element, style);

      default: return getStyle(element, style);
    }
  }

  function getStyle_IE(element, style) {
    element = $(element);
    style = normalizeStyleName_IE(style);

    var value = element.style[style];
    if (!value && element.currentStyle) {
      value = element.currentStyle[style];
    }

    if (style === 'opacity' && !STANDARD_CSS_OPACITY_SUPPORTED)
      return getOpacity_IE(element);

    if (value === 'auto') {
      if ((style === 'width' || style === 'height') && Element.visible(element))
        return Element.measure(element, style) + 'px';
      return null;
    }

    return value;
  }

  function stripAlphaFromFilter_IE(filter) {
    return (filter || '').replace(/alpha\([^\)]*\)/gi, '');
  }

  function hasLayout_IE(element) {
    if (!element.currentStyle || !element.currentStyle.hasLayout)
      element.style.zoom = 1;
    return element;
  }

  var STANDARD_CSS_OPACITY_SUPPORTED = (function() {
    DIV.style.cssText = "opacity:.55";
    return /^0.55/.test(DIV.style.opacity);
  })();

  function setOpacity(element, value) {
    element = $(element);
    if (value == 1 || value === '') value = '';
    else if (value < 0.00001) value = 0;
    element.style.opacity = value;
    return element;
  }

  function setOpacity_IE(element, value) {
    if (STANDARD_CSS_OPACITY_SUPPORTED)
      return setOpacity(element, value);

    element = hasLayout_IE($(element));
    var filter = Element.getStyle(element, 'filter'),
     style = element.style;

    if (value == 1 || value === '') {
      filter = stripAlphaFromFilter_IE(filter);
      if (filter) style.filter = filter;
      else style.removeAttribute('filter');
      return element;
    }

    if (value < 0.00001) value = 0;

    style.filter = stripAlphaFromFilter_IE(filter) +
     'alpha(opacity=' + (value * 100) + ')';

    return element;
  }


  function getOpacity(element) {
    return Element.getStyle(element, 'opacity');
  }

  function getOpacity_IE(element) {
    if (STANDARD_CSS_OPACITY_SUPPORTED)
      return getOpacity(element);

    var filter = Element.getStyle(element, 'filter');
    if (filter.length === 0) return 1.0;
    var match = (filter || '').match(/alpha\(opacity=(.*)\)/);
    if (match && match[1]) return parseFloat(match[1]) / 100;
    return 1.0;
  }


  Object.extend(methods, {
    setStyle:   setStyle,
    getStyle:   getStyle,
    setOpacity: setOpacity,
    getOpacity: getOpacity
  });

  if ('styleFloat' in DIV.style) {
    methods.getStyle = getStyle_IE;
    methods.setOpacity = setOpacity_IE;
    methods.getOpacity = getOpacity_IE;
  }

  var UID = 0;

  GLOBAL.Element.Storage = { UID: 1 };

  function getUniqueElementID(element) {
    if (element === window) return 0;

    if (typeof element._prototypeUID === 'undefined')
      element._prototypeUID = Element.Storage.UID++;
    return element._prototypeUID;
  }

  function getUniqueElementID_IE(element) {
    if (element === window) return 0;
    if (element == document) return 1;
    return element.uniqueID;
  }

  var HAS_UNIQUE_ID_PROPERTY = ('uniqueID' in DIV);
  if (HAS_UNIQUE_ID_PROPERTY)
    getUniqueElementID = getUniqueElementID_IE;

  function getStorage(element) {
    if (!(element = $(element))) return;

    var uid = getUniqueElementID(element);

    if (!Element.Storage[uid])
      Element.Storage[uid] = $H();

    return Element.Storage[uid];
  }

  function store(element, key, value) {
    if (!(element = $(element))) return;
    var storage = getStorage(element);
    if (arguments.length === 2) {
      storage.update(key);
    } else {
      storage.set(key, value);
    }
    return element;
  }

  function retrieve(element, key, defaultValue) {
    if (!(element = $(element))) return;
    var storage = getStorage(element), value = storage.get(key);

    if (Object.isUndefined(value)) {
      storage.set(key, defaultValue);
      value = defaultValue;
    }

    return value;
  }


  Object.extend(methods, {
    getStorage: getStorage,
    store:      store,
    retrieve:   retrieve
  });


  var Methods = {}, ByTag = Element.Methods.ByTag,
   F = Prototype.BrowserFeatures;

  if (!F.ElementExtensions && ('__proto__' in DIV)) {
    GLOBAL.HTMLElement = {};
    GLOBAL.HTMLElement.prototype = DIV['__proto__'];
    F.ElementExtensions = true;
  }

  function checkElementPrototypeDeficiency(tagName) {
    if (typeof window.Element === 'undefined') return false;
    if (!HAS_EXTENDED_CREATE_ELEMENT_SYNTAX) return false;
    var proto = window.Element.prototype;
    if (proto) {
      var id = '_' + (Math.random() + '').slice(2),
       el = document.createElement(tagName);
      proto[id] = 'x';
      var isBuggy = (el[id] !== 'x');
      delete proto[id];
      el = null;
      return isBuggy;
    }

    return false;
  }

  var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY =
   checkElementPrototypeDeficiency('object');

  function extendElementWith(element, methods) {
    for (var property in methods) {
      var value = methods[property];
      if (Object.isFunction(value) && !(property in element))
        element[property] = value.methodize();
    }
  }

  var EXTENDED = {};
  function elementIsExtended(element) {
    var uid = getUniqueElementID(element);
    return (uid in EXTENDED);
  }

  function extend(element) {
    if (!element || elementIsExtended(element)) return element;
    if (element.nodeType !== Node.ELEMENT_NODE || element == window)
      return element;

    var methods = Object.clone(Methods),
     tagName = element.tagName.toUpperCase();

    if (ByTag[tagName]) Object.extend(methods, ByTag[tagName]);

    extendElementWith(element, methods);
    EXTENDED[getUniqueElementID(element)] = true;
    return element;
  }

  function extend_IE8(element) {
    if (!element || elementIsExtended(element)) return element;

    var t = element.tagName;
    if (t && (/^(?:object|applet|embed)$/i.test(t))) {
      extendElementWith(element, Element.Methods);
      extendElementWith(element, Element.Methods.Simulated);
      extendElementWith(element, Element.Methods.ByTag[t.toUpperCase()]);
    }

    return element;
  }

  if (F.SpecificElementExtensions) {
    extend = HTMLOBJECTELEMENT_PROTOTYPE_BUGGY ? extend_IE8 : Prototype.K;
  }

  function addMethodsToTagName(tagName, methods) {
    tagName = tagName.toUpperCase();
    if (!ByTag[tagName]) ByTag[tagName] = {};
    Object.extend(ByTag[tagName], methods);
  }

  function mergeMethods(destination, methods, onlyIfAbsent) {
    if (Object.isUndefined(onlyIfAbsent)) onlyIfAbsent = false;
    for (var property in methods) {
      var value = methods[property];
      if (!Object.isFunction(value)) continue;
      if (!onlyIfAbsent || !(property in destination))
        destination[property] = value.methodize();
    }
  }

  function findDOMClass(tagName) {
    var klass;
    var trans = {
      "OPTGROUP": "OptGroup", "TEXTAREA": "TextArea", "P": "Paragraph",
      "FIELDSET": "FieldSet", "UL": "UList", "OL": "OList", "DL": "DList",
      "DIR": "Directory", "H1": "Heading", "H2": "Heading", "H3": "Heading",
      "H4": "Heading", "H5": "Heading", "H6": "Heading", "Q": "Quote",
      "INS": "Mod", "DEL": "Mod", "A": "Anchor", "IMG": "Image", "CAPTION":
      "TableCaption", "COL": "TableCol", "COLGROUP": "TableCol", "THEAD":
      "TableSection", "TFOOT": "TableSection", "TBODY": "TableSection", "TR":
      "TableRow", "TH": "TableCell", "TD": "TableCell", "FRAMESET":
      "FrameSet", "IFRAME": "IFrame"
    };
    if (trans[tagName]) klass = 'HTML' + trans[tagName] + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName.capitalize() + 'Element';
    if (window[klass]) return window[klass];

    var element = document.createElement(tagName),
     proto = element['__proto__'] || element.constructor.prototype;

    element = null;
    return proto;
  }

  function addMethods(methods) {
    if (arguments.length === 0) addFormMethods();

    if (arguments.length === 2) {
      var tagName = methods;
      methods = arguments[1];
    }

    if (!tagName) {
      Object.extend(Element.Methods, methods || {});
    } else {
      if (Object.isArray(tagName)) {
        for (var i = 0, tag; tag = tagName[i]; i++)
          addMethodsToTagName(tag, methods);
      } else {
        addMethodsToTagName(tagName, methods);
      }
    }

    var ELEMENT_PROTOTYPE = window.HTMLElement ? HTMLElement.prototype :
     Element.prototype;

    if (F.ElementExtensions) {
      mergeMethods(ELEMENT_PROTOTYPE, Element.Methods);
      mergeMethods(ELEMENT_PROTOTYPE, Element.Methods.Simulated, true);
    }

    if (F.SpecificElementExtensions) {
      for (var tag in Element.Methods.ByTag) {
        var klass = findDOMClass(tag);
        if (Object.isUndefined(klass)) continue;
        mergeMethods(klass.prototype, ByTag[tag]);
      }
    }

    Object.extend(Element, Element.Methods);
    Object.extend(Element, Element.Methods.Simulated);
    delete Element.ByTag;
    delete Element.Simulated;

    Element.extend.refresh();

    ELEMENT_CACHE = {};
  }

  Object.extend(GLOBAL.Element, {
    extend:     extend,
    addMethods: addMethods
  });

  if (extend === Prototype.K) {
    GLOBAL.Element.extend.refresh = Prototype.emptyFunction;
  } else {
    GLOBAL.Element.extend.refresh = function() {
      if (Prototype.BrowserFeatures.ElementExtensions) return;
      Object.extend(Methods, Element.Methods);
      Object.extend(Methods, Element.Methods.Simulated);

      EXTENDED = {};
    };
  }

  function addFormMethods() {
    Object.extend(Form, Form.Methods);
    Object.extend(Form.Element, Form.Element.Methods);
    Object.extend(Element.Methods.ByTag, {
      "FORM":     Object.clone(Form.Methods),
      "INPUT":    Object.clone(Form.Element.Methods),
      "SELECT":   Object.clone(Form.Element.Methods),
      "TEXTAREA": Object.clone(Form.Element.Methods),
      "BUTTON":   Object.clone(Form.Element.Methods)
    });
  }

  Element.addMethods(methods);

  function destroyCache_IE() {
    DIV = null;
    ELEMENT_CACHE = null;
  }

  if (window.attachEvent)
    window.attachEvent('onunload', destroyCache_IE);

})(this);
(function() {

  function toDecimal(pctString) {
    var match = pctString.match(/^(\d+)%?$/i);
    if (!match) return null;
    return (Number(match[1]) / 100);
  }

  function getRawStyle(element, style) {
    element = $(element);

    var value = element.style[style];
    if (!value || value === 'auto') {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }

    if (style === 'opacity') return value ? parseFloat(value) : 1.0;
    return value === 'auto' ? null : value;
  }

  function getRawStyle_IE(element, style) {
    var value = element.style[style];
    if (!value && element.currentStyle) {
      value = element.currentStyle[style];
    }
    return value;
  }

  function getContentWidth(element, context) {
    var boxWidth = element.offsetWidth;

    var bl = getPixelValue(element, 'borderLeftWidth',  context) || 0;
    var br = getPixelValue(element, 'borderRightWidth', context) || 0;
    var pl = getPixelValue(element, 'paddingLeft',      context) || 0;
    var pr = getPixelValue(element, 'paddingRight',     context) || 0;

    return boxWidth - bl - br - pl - pr;
  }

  if ('currentStyle' in document.documentElement) {
    getRawStyle = getRawStyle_IE;
  }


  function getPixelValue(value, property, context) {
    var element = null;
    if (Object.isElement(value)) {
      element = value;
      value = getRawStyle(element, property);
    }

    if (value === null || Object.isUndefined(value)) {
      return null;
    }

    if ((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(value)) {
      return window.parseFloat(value);
    }

    var isPercentage = value.include('%'), isViewport = (context === document.viewport);

    if (/\d/.test(value) && element && element.runtimeStyle && !(isPercentage && isViewport)) {
      var style = element.style.left, rStyle = element.runtimeStyle.left;
      element.runtimeStyle.left = element.currentStyle.left;
      element.style.left = value || 0;
      value = element.style.pixelLeft;
      element.style.left = style;
      element.runtimeStyle.left = rStyle;

      return value;
    }

    if (element && isPercentage) {
      context = context || element.parentNode;
      var decimal = toDecimal(value), whole = null;

      var isHorizontal = property.include('left') || property.include('right') ||
       property.include('width');

      var isVertical   = property.include('top') || property.include('bottom') ||
        property.include('height');

      if (context === document.viewport) {
        if (isHorizontal) {
          whole = document.viewport.getWidth();
        } else if (isVertical) {
          whole = document.viewport.getHeight();
        }
      } else {
        if (isHorizontal) {
          whole = $(context).measure('width');
        } else if (isVertical) {
          whole = $(context).measure('height');
        }
      }

      return (whole === null) ? 0 : whole * decimal;
    }

    return 0;
  }

  function toCSSPixels(number) {
    if (Object.isString(number) && number.endsWith('px'))
      return number;
    return number + 'px';
  }

  function isDisplayed(element) {
    while (element && element.parentNode) {
      var display = element.getStyle('display');
      if (display === 'none') {
        return false;
      }
      element = $(element.parentNode);
    }
    return true;
  }

  var hasLayout = Prototype.K;
  if ('currentStyle' in document.documentElement) {
    hasLayout = function(element) {
      if (!element.currentStyle.hasLayout) {
        element.style.zoom = 1;
      }
      return element;
    };
  }

  function cssNameFor(key) {
    if (key.include('border')) key = key + '-width';
    return key.camelize();
  }

  Element.Layout = Class.create(Hash, {
    initialize: function($super, element, preCompute) {
      $super();
      this.element = $(element);

      Element.Layout.PROPERTIES.each( function(property) {
        this._set(property, null);
      }, this);

      if (preCompute) {
        this._preComputing = true;
        this._begin();
        Element.Layout.PROPERTIES.each( this._compute, this );
        this._end();
        this._preComputing = false;
      }
    },

    _set: function(property, value) {
      return Hash.prototype.set.call(this, property, value);
    },

    set: function(property, value) {
      throw "Properties of Element.Layout are read-only.";
    },

    get: function($super, property) {
      var value = $super(property);
      return value === null ? this._compute(property) : value;
    },

    _begin: function() {
      if (this._isPrepared()) return;

      var element = this.element;
      if (isDisplayed(element)) {
        this._setPrepared(true);
        return;
      }


      var originalStyles = {
        position:   element.style.position   || '',
        width:      element.style.width      || '',
        visibility: element.style.visibility || '',
        display:    element.style.display    || ''
      };

      element.store('prototype_original_styles', originalStyles);

      var position = getRawStyle(element, 'position'), width = element.offsetWidth;

      if (width === 0 || width === null) {
        element.style.display = 'block';
        width = element.offsetWidth;
      }

      var context = (position === 'fixed') ? document.viewport :
       element.parentNode;

      var tempStyles = {
        visibility: 'hidden',
        display:    'block'
      };

      if (position !== 'fixed') tempStyles.position = 'absolute';

      element.setStyle(tempStyles);

      var positionedWidth = element.offsetWidth, newWidth;
      if (width && (positionedWidth === width)) {
        newWidth = getContentWidth(element, context);
      } else if (position === 'absolute' || position === 'fixed') {
        newWidth = getContentWidth(element, context);
      } else {
        var parent = element.parentNode, pLayout = $(parent).getLayout();

        newWidth = pLayout.get('width') -
         this.get('margin-left') -
         this.get('border-left') -
         this.get('padding-left') -
         this.get('padding-right') -
         this.get('border-right') -
         this.get('margin-right');
      }

      element.setStyle({ width: newWidth + 'px' });

      this._setPrepared(true);
    },

    _end: function() {
      var element = this.element;
      var originalStyles = element.retrieve('prototype_original_styles');
      element.store('prototype_original_styles', null);
      element.setStyle(originalStyles);
      this._setPrepared(false);
    },

    _compute: function(property) {
      var COMPUTATIONS = Element.Layout.COMPUTATIONS;
      if (!(property in COMPUTATIONS)) {
        throw "Property not found.";
      }

      return this._set(property, COMPUTATIONS[property].call(this, this.element));
    },

    _isPrepared: function() {
      return this.element.retrieve('prototype_element_layout_prepared', false);
    },

    _setPrepared: function(bool) {
      return this.element.store('prototype_element_layout_prepared', bool);
    },

    toObject: function() {
      var args = $A(arguments);
      var keys = (args.length === 0) ? Element.Layout.PROPERTIES :
       args.join(' ').split(' ');
      var obj = {};
      keys.each( function(key) {
        if (!Element.Layout.PROPERTIES.include(key)) return;
        var value = this.get(key);
        if (value != null) obj[key] = value;
      }, this);
      return obj;
    },

    toHash: function() {
      var obj = this.toObject.apply(this, arguments);
      return new Hash(obj);
    },

    toCSS: function() {
      var args = $A(arguments);
      var keys = (args.length === 0) ? Element.Layout.PROPERTIES :
       args.join(' ').split(' ');
      var css = {};

      keys.each( function(key) {
        if (!Element.Layout.PROPERTIES.include(key)) return;
        if (Element.Layout.COMPOSITE_PROPERTIES.include(key)) return;

        var value = this.get(key);
        if (value != null) css[cssNameFor(key)] = value + 'px';
      }, this);
      return css;
    },

    inspect: function() {
      return "#<Element.Layout>";
    }
  });

  Object.extend(Element.Layout, {
    PROPERTIES: $w('height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height'),

    COMPOSITE_PROPERTIES: $w('padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height'),

    COMPUTATIONS: {
      'height': function(element) {
        if (!this._preComputing) this._begin();

        var bHeight = this.get('border-box-height');
        if (bHeight <= 0) {
          if (!this._preComputing) this._end();
          return 0;
        }

        var bTop = this.get('border-top'),
         bBottom = this.get('border-bottom');

        var pTop = this.get('padding-top'),
         pBottom = this.get('padding-bottom');

        if (!this._preComputing) this._end();

        return bHeight - bTop - bBottom - pTop - pBottom;
      },

      'width': function(element) {
        if (!this._preComputing) this._begin();

        var bWidth = this.get('border-box-width');
        if (bWidth <= 0) {
          if (!this._preComputing) this._end();
          return 0;
        }

        var bLeft = this.get('border-left'),
         bRight = this.get('border-right');

        var pLeft = this.get('padding-left'),
         pRight = this.get('padding-right');

        if (!this._preComputing) this._end();
        return bWidth - bLeft - bRight - pLeft - pRight;
      },

      'padding-box-height': function(element) {
        var height = this.get('height'),
         pTop = this.get('padding-top'),
         pBottom = this.get('padding-bottom');

        return height + pTop + pBottom;
      },

      'padding-box-width': function(element) {
        var width = this.get('width'),
         pLeft = this.get('padding-left'),
         pRight = this.get('padding-right');

        return width + pLeft + pRight;
      },

      'border-box-height': function(element) {
        if (!this._preComputing) this._begin();
        var height = element.offsetHeight;
        if (!this._preComputing) this._end();
        return height;
      },

      'border-box-width': function(element) {
        if (!this._preComputing) this._begin();
        var width = element.offsetWidth;
        if (!this._preComputing) this._end();
        return width;
      },

      'margin-box-height': function(element) {
        var bHeight = this.get('border-box-height'),
         mTop = this.get('margin-top'),
         mBottom = this.get('margin-bottom');

        if (bHeight <= 0) return 0;

        return bHeight + mTop + mBottom;
      },

      'margin-box-width': function(element) {
        var bWidth = this.get('border-box-width'),
         mLeft = this.get('margin-left'),
         mRight = this.get('margin-right');

        if (bWidth <= 0) return 0;

        return bWidth + mLeft + mRight;
      },

      'top': function(element) {
        var offset = element.positionedOffset();
        return offset.top;
      },

      'bottom': function(element) {
        var offset = element.positionedOffset(),
         parent = element.getOffsetParent(),
         pHeight = parent.measure('height');

        var mHeight = this.get('border-box-height');

        return pHeight - mHeight - offset.top;
      },

      'left': function(element) {
        var offset = element.positionedOffset();
        return offset.left;
      },

      'right': function(element) {
        var offset = element.positionedOffset(),
         parent = element.getOffsetParent(),
         pWidth = parent.measure('width');

        var mWidth = this.get('border-box-width');

        return pWidth - mWidth - offset.left;
      },

      'padding-top': function(element) {
        return getPixelValue(element, 'paddingTop');
      },

      'padding-bottom': function(element) {
        return getPixelValue(element, 'paddingBottom');
      },

      'padding-left': function(element) {
        return getPixelValue(element, 'paddingLeft');
      },

      'padding-right': function(element) {
        return getPixelValue(element, 'paddingRight');
      },

      'border-top': function(element) {
        return getPixelValue(element, 'borderTopWidth');
      },

      'border-bottom': function(element) {
        return getPixelValue(element, 'borderBottomWidth');
      },

      'border-left': function(element) {
        return getPixelValue(element, 'borderLeftWidth');
      },

      'border-right': function(element) {
        return getPixelValue(element, 'borderRightWidth');
      },

      'margin-top': function(element) {
        return getPixelValue(element, 'marginTop');
      },

      'margin-bottom': function(element) {
        return getPixelValue(element, 'marginBottom');
      },

      'margin-left': function(element) {
        return getPixelValue(element, 'marginLeft');
      },

      'margin-right': function(element) {
        return getPixelValue(element, 'marginRight');
      }
    }
  });

  if ('getBoundingClientRect' in document.documentElement) {
    Object.extend(Element.Layout.COMPUTATIONS, {
      'right': function(element) {
        var parent = hasLayout(element.getOffsetParent());
        var rect = element.getBoundingClientRect(),
         pRect = parent.getBoundingClientRect();

        return (pRect.right - rect.right).round();
      },

      'bottom': function(element) {
        var parent = hasLayout(element.getOffsetParent());
        var rect = element.getBoundingClientRect(),
         pRect = parent.getBoundingClientRect();

        return (pRect.bottom - rect.bottom).round();
      }
    });
  }

  Element.Offset = Class.create({
    initialize: function(left, top) {
      this.left = left.round();
      this.top  = top.round();

      this[0] = this.left;
      this[1] = this.top;
    },

    relativeTo: function(offset) {
      return new Element.Offset(
        this.left - offset.left,
        this.top  - offset.top
      );
    },

    inspect: function() {
      return "#<Element.Offset left: #{left} top: #{top}>".interpolate(this);
    },

    toString: function() {
      return "[#{left}, #{top}]".interpolate(this);
    },

    toArray: function() {
      return [this.left, this.top];
    }
  });

  function getLayout(element, preCompute) {
    return new Element.Layout(element, preCompute);
  }

  function measure(element, property) {
    return $(element).getLayout().get(property);
  }

  function getHeight(element) {
    return Element.getDimensions(element).height;
  }

  function getWidth(element) {
    return Element.getDimensions(element).width;
  }

  function getDimensions(element) {
    element = $(element);
    var display = Element.getStyle(element, 'display');

    if (display && display !== 'none') {
      return { width: element.offsetWidth, height: element.offsetHeight };
    }

    var style = element.style;
    var originalStyles = {
      visibility: style.visibility,
      position:   style.position,
      display:    style.display
    };

    var newStyles = {
      visibility: 'hidden',
      display:    'block'
    };

    if (originalStyles.position !== 'fixed')
      newStyles.position = 'absolute';

    Element.setStyle(element, newStyles);

    var dimensions = {
      width:  element.offsetWidth,
      height: element.offsetHeight
    };

    Element.setStyle(element, originalStyles);

    return dimensions;
  }

  function getOffsetParent(element) {
    element = $(element);

    if (isDocument(element) || isDetached(element) || isBody(element) || isHtml(element))
      return $(document.body);

    var isInline = (Element.getStyle(element, 'display') === 'inline');
    if (!isInline && element.offsetParent) return $(element.offsetParent);

    while ((element = element.parentNode) && element !== document.body) {
      if (Element.getStyle(element, 'position') !== 'static') {
        return isHtml(element) ? $(document.body) : $(element);
      }
    }

    return $(document.body);
  }


  function cumulativeOffset(element) {
    element = $(element);
    var valueT = 0, valueL = 0;
    if (element.parentNode) {
      do {
        valueT += element.offsetTop  || 0;
        valueL += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);
    }
    return new Element.Offset(valueL, valueT);
  }

  function positionedOffset(element) {
    element = $(element);

    var layout = element.getLayout();

    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (isBody(element)) break;
        var p = Element.getStyle(element, 'position');
        if (p !== 'static') break;
      }
    } while (element);

    valueL -= layout.get('margin-top');
    valueT -= layout.get('margin-left');

    return new Element.Offset(valueL, valueT);
  }

  function cumulativeScrollOffset(element) {
    var valueT = 0, valueL = 0;
    do {
      if (element === document.body) {
        var bodyScrollNode = document.documentElement || document.body.parentNode || document.body;
        valueT += !Object.isUndefined(window.pageYOffset) ? window.pageYOffset : bodyScrollNode.scrollTop || 0;
        valueL += !Object.isUndefined(window.pageXOffset) ? window.pageXOffset : bodyScrollNode.scrollLeft || 0;
        break;
      } else {
        valueT += element.scrollTop  || 0;
        valueL += element.scrollLeft || 0;
        element = element.parentNode;
      }
    } while (element);
    return new Element.Offset(valueL, valueT);
  }

  function viewportOffset(forElement) {
    var valueT = 0, valueL = 0, docBody = document.body;

    forElement = $(forElement);
    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == docBody &&
        Element.getStyle(element, 'position') == 'absolute') break;
    } while (element = element.offsetParent);

    element = forElement;
    do {
      if (element != docBody) {
        valueT -= element.scrollTop  || 0;
        valueL -= element.scrollLeft || 0;
      }
    } while (element = element.parentNode);
    return new Element.Offset(valueL, valueT);
  }

  function absolutize(element) {
    element = $(element);

    if (Element.getStyle(element, 'position') === 'absolute') {
      return element;
    }

    var offsetParent = getOffsetParent(element);
    var eOffset = element.viewportOffset(),
     pOffset = offsetParent.viewportOffset();

    var offset = eOffset.relativeTo(pOffset);
    var layout = element.getLayout();

    element.store('prototype_absolutize_original_styles', {
      position: element.getStyle('position'),
      left:     element.getStyle('left'),
      top:      element.getStyle('top'),
      width:    element.getStyle('width'),
      height:   element.getStyle('height')
    });

    element.setStyle({
      position: 'absolute',
      top:    offset.top + 'px',
      left:   offset.left + 'px',
      width:  layout.get('width') + 'px',
      height: layout.get('height') + 'px'
    });

    return element;
  }

  function relativize(element) {
    element = $(element);
    if (Element.getStyle(element, 'position') === 'relative') {
      return element;
    }

    var originalStyles =
     element.retrieve('prototype_absolutize_original_styles');

    if (originalStyles) element.setStyle(originalStyles);
    return element;
  }


  function scrollTo(element) {
    element = $(element);
    var pos = Element.cumulativeOffset(element);
    window.scrollTo(pos.left, pos.top);
    return element;
  }


  function makePositioned(element) {
    element = $(element);
    var position = Element.getStyle(element, 'position'), styles = {};
    if (position === 'static' || !position) {
      styles.position = 'relative';
      if (Prototype.Browser.Opera) {
        styles.top  = 0;
        styles.left = 0;
      }
      Element.setStyle(element, styles);
      Element.store(element, 'prototype_made_positioned', true);
    }
    return element;
  }

  function undoPositioned(element) {
    element = $(element);
    var storage = Element.getStorage(element),
     madePositioned = storage.get('prototype_made_positioned');

    if (madePositioned) {
      storage.unset('prototype_made_positioned');
      Element.setStyle(element, {
        position: '',
        top:      '',
        bottom:   '',
        left:     '',
        right:    ''
      });
    }
    return element;
  }

  function makeClipping(element) {
    element = $(element);

    var storage = Element.getStorage(element),
     madeClipping = storage.get('prototype_made_clipping');

    if (Object.isUndefined(madeClipping)) {
      var overflow = Element.getStyle(element, 'overflow');
      storage.set('prototype_made_clipping', overflow);
      if (overflow !== 'hidden')
        element.style.overflow = 'hidden';
    }

    return element;
  }

  function undoClipping(element) {
    element = $(element);
    var storage = Element.getStorage(element),
     overflow = storage.get('prototype_made_clipping');

    if (!Object.isUndefined(overflow)) {
      storage.unset('prototype_made_clipping');
      element.style.overflow = overflow || '';
    }

    return element;
  }

  function clonePosition(element, source, options) {
    options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, options || {});

    source  = $(source);
    element = $(element);
    var p, delta, layout, styles = {};

    if (options.setLeft || options.setTop) {
      p = Element.viewportOffset(source);
      delta = [0, 0];
      if (Element.getStyle(element, 'position') === 'absolute') {
        var parent = Element.getOffsetParent(element);
        if (parent !== document.body) delta = Element.viewportOffset(parent);
      }
    }

    if (options.setWidth || options.setHeight) {
      layout = Element.getLayout(source);
    }

    if (options.setLeft)
      styles.left = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if (options.setTop)
      styles.top  = (p[1] - delta[1] + options.offsetTop)  + 'px';

    if (options.setWidth)
      styles.width  = layout.get('border-box-width')  + 'px';
    if (options.setHeight)
      styles.height = layout.get('border-box-height') + 'px';

    return Element.setStyle(element, styles);
  }


  if (Prototype.Browser.IE) {
    getOffsetParent = getOffsetParent.wrap(
      function(proceed, element) {
        element = $(element);

        if (isDocument(element) || isDetached(element) || isBody(element) || isHtml(element))
          return $(document.body);

        var position = element.getStyle('position');
        if (position !== 'static') return proceed(element);

        element.setStyle({ position: 'relative' });
        var value = proceed(element);
        element.setStyle({ position: position });
        return value;
      }
    );

    positionedOffset = positionedOffset.wrap(function(proceed, element) {
      element = $(element);
      if (!element.parentNode) return new Element.Offset(0, 0);
      var position = element.getStyle('position');
      if (position !== 'static') return proceed(element);

      var offsetParent = element.getOffsetParent();
      if (offsetParent && offsetParent.getStyle('position') === 'fixed')
        hasLayout(offsetParent);

      element.setStyle({ position: 'relative' });
      var value = proceed(element);
      element.setStyle({ position: position });
      return value;
    });
  } else if (Prototype.Browser.Webkit) {
    cumulativeOffset = function(element) {
      element = $(element);
      var valueT = 0, valueL = 0;
      do {
        valueT += element.offsetTop  || 0;
        valueL += element.offsetLeft || 0;
        if (element.offsetParent == document.body) {
          if (Element.getStyle(element, 'position') == 'absolute') break;
        }

        element = element.offsetParent;
      } while (element);

      return new Element.Offset(valueL, valueT);
    };
  }


  Element.addMethods({
    getLayout:              getLayout,
    measure:                measure,
    getWidth:               getWidth,
    getHeight:              getHeight,
    getDimensions:          getDimensions,
    getOffsetParent:        getOffsetParent,
    cumulativeOffset:       cumulativeOffset,
    positionedOffset:       positionedOffset,
    cumulativeScrollOffset: cumulativeScrollOffset,
    viewportOffset:         viewportOffset,
    absolutize:             absolutize,
    relativize:             relativize,
    scrollTo:               scrollTo,
    makePositioned:         makePositioned,
    undoPositioned:         undoPositioned,
    makeClipping:           makeClipping,
    undoClipping:           undoClipping,
    clonePosition:          clonePosition
  });

  function isBody(element) {
    return element.nodeName.toUpperCase() === 'BODY';
  }

  function isHtml(element) {
    return element.nodeName.toUpperCase() === 'HTML';
  }

  function isDocument(element) {
    return element.nodeType === Node.DOCUMENT_NODE;
  }

  function isDetached(element) {
    return element !== document.body &&
     !Element.descendantOf(element, document.body);
  }

  if ('getBoundingClientRect' in document.documentElement) {
    Element.addMethods({
      viewportOffset: function(element) {
        element = $(element);
        if (isDetached(element)) return new Element.Offset(0, 0);

        var rect = element.getBoundingClientRect(),
         docEl = document.documentElement;
        return new Element.Offset(rect.left - docEl.clientLeft,
         rect.top - docEl.clientTop);
      }
    });
  }


})();

(function() {

  var IS_OLD_OPERA = Prototype.Browser.Opera &&
   (window.parseFloat(window.opera.version()) < 9.5);
  var ROOT = null;
  function getRootElement() {
    if (ROOT) return ROOT;
    ROOT = IS_OLD_OPERA ? document.body : document.documentElement;
    return ROOT;
  }

  function getDimensions() {
    return { width: this.getWidth(), height: this.getHeight() };
  }

  function getWidth() {
    return getRootElement().clientWidth;
  }

  function getHeight() {
    return getRootElement().clientHeight;
  }

  function getScrollOffsets() {
    var x = window.pageXOffset || document.documentElement.scrollLeft ||
     document.body.scrollLeft;
    var y = window.pageYOffset || document.documentElement.scrollTop ||
     document.body.scrollTop;

    return new Element.Offset(x, y);
  }

  document.viewport = {
    getDimensions:    getDimensions,
    getWidth:         getWidth,
    getHeight:        getHeight,
    getScrollOffsets: getScrollOffsets
  };

})();
window.$$ = function() {
  var expression = $A(arguments).join(', ');
  return Prototype.Selector.select(expression, document);
};

Prototype.Selector = (function() {

  function select() {
    throw new Error('Method "Prototype.Selector.select" must be defined.');
  }

  function match() {
    throw new Error('Method "Prototype.Selector.match" must be defined.');
  }

  function find(elements, expression, index) {
    index = index || 0;
    var match = Prototype.Selector.match, length = elements.length, matchIndex = 0, i;

    for (i = 0; i < length; i++) {
      if (match(elements[i], expression) && index == matchIndex++) {
        return Element.extend(elements[i]);
      }
    }
  }

  function extendElements(elements) {
    for (var i = 0, length = elements.length; i < length; i++) {
      Element.extend(elements[i]);
    }
    return elements;
  }


  var K = Prototype.K;

  return {
    select: select,
    match: match,
    find: find,
    extendElements: (Element.extend === K) ? K : extendElements,
    extendElement: Element.extend
  };
})();
Prototype._original_property = window.Sizzle;
/*!
 * Sizzle CSS Selector Engine v@VERSION
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: @DATE
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


	whitespace = "[\\x20\\t\\r\\n\\f]",
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	identifier = characterEncoding.replace( "w", "w#" ),

	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		function( target, els ) {
			var j = target.length,
				i = 0;
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		if ( (match = rquickExpr.exec( selector )) ) {
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					if ( elem && elem.parentNode ) {
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	if ( diff ) {
		return diff;
	}

	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	document = doc;
	docElem = doc.documentElement;

	documentIsHTML = !isXML( doc );

	if ( parent && parent !== parent.top ) {
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		div.firstChild.className = "i";
		return div.getElementsByClassName("i").length === 2;
	});

	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */


	rbuggyMatches = [];

	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		assert(function( div ) {
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			support.disconnectedMatch = matches.call( div, "div" );

			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	sortOrder = hasCompare ?
	function( a, b ) {

		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			1;

		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			siblingCheck( ap[i], bp[i] ) :

			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			if ( ret || support.disconnectedMatch ||
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		while ( (node = elem[i++]) ) {
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	return ret;
};

Expr = Sizzle.selectors = {

	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			} else if ( unquoted && rpseudo.test( unquoted ) &&
				(excess = tokenize( unquoted, true )) &&
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						if ( forward && useCache ) {
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						} else {
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			if ( fn[ expando ] ) {
				return fn( argument );
			}

			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		"not": markFunction(function( selector ) {
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"lang": markFunction( function( lang ) {
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"empty": function( elem ) {
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							outerCache[ dir ] = newCache;

							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					[] :

					results :
				matcherIn;

		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			if ( matcher[ expando ] ) {
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				if ( bySet ) {
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					setMatched = condense( setMatched );
				}

				push.apply( results, setMatched );

				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	if ( match.length === 1 ) {

		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};


support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

support.detectDuplicates = !!hasDuplicate;

setDocument();

support.sortDetached = assert(function( div1 ) {
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

if ( typeof define === "function" && define.amd ) {
	define(function() { return Sizzle; });
} else if ( typeof module !== "undefined" && module.exports ) {
	module.exports = Sizzle;
} else {
	window.Sizzle = Sizzle;
}

})( window );

;(function(engine) {
  var extendElements = Prototype.Selector.extendElements;

  function select(selector, scope) {
    return extendElements(engine(selector, scope || document));
  }

  function match(element, selector) {
    return engine.matches(selector, [element]).length == 1;
  }

  Prototype.Selector.engine = engine;
  Prototype.Selector.select = select;
  Prototype.Selector.match = match;
})(Sizzle);

window.Sizzle = Prototype._original_property;
delete Prototype._original_property;

var Form = {
  reset: function(form) {
    form = $(form);
    form.reset();
    return form;
  },

  serializeElements: function(elements, options) {
    if (typeof options != 'object') options = { hash: !!options };
    else if (Object.isUndefined(options.hash)) options.hash = true;
    var key, value, submitted = false, submit = options.submit, accumulator, initial;

    if (options.hash) {
      initial = {};
      accumulator = function(result, key, value) {
        if (key in result) {
          if (!Object.isArray(result[key])) result[key] = [result[key]];
          result[key] = result[key].concat(value);
        } else result[key] = value;
        return result;
      };
    } else {
      initial = '';
      accumulator = function(result, key, values) {
        if (!Object.isArray(values)) {values = [values];}
        if (!values.length) {return result;}
        var encodedKey = encodeURIComponent(key).gsub(/%20/, '+');
        return result + (result ? "&" : "") + values.map(function (value) {
          value = value.gsub(/(\r)?\n/, '\r\n');
          value = encodeURIComponent(value);
          value = value.gsub(/%20/, '+');
          return encodedKey + "=" + value;
        }).join("&");
      };
    }

    return elements.inject(initial, function(result, element) {
      if (!element.disabled && element.name) {
        key = element.name; value = $(element).getValue();
        if (value != null && element.type != 'file' && (element.type != 'submit' || (!submitted &&
            submit !== false && (!submit || key == submit) && (submitted = true)))) {
          result = accumulator(result, key, value);
        }
      }
      return result;
    });
  }
};

Form.Methods = {
  serialize: function(form, options) {
    return Form.serializeElements(Form.getElements(form), options);
  },


  getElements: function(form) {
    var elements = $(form).getElementsByTagName('*');
    var element, results = [], serializers = Form.Element.Serializers;

    for (var i = 0; element = elements[i]; i++) {
      if (serializers[element.tagName.toLowerCase()])
        results.push(Element.extend(element));
    }
    return results;
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name) return $A(inputs).map(Element.extend);

    for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) || (name && input.name != name))
        continue;
      matchingInputs.push(Element.extend(input));
    }

    return matchingInputs;
  },

  disable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('disable');
    return form;
  },

  enable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('enable');
    return form;
  },

  findFirstElement: function(form) {
    var elements = $(form).getElements().findAll(function(element) {
      return 'hidden' != element.type && !element.disabled;
    });
    var firstByIndex = elements.findAll(function(element) {
      return element.hasAttribute('tabIndex') && element.tabIndex >= 0;
    }).sortBy(function(element) { return element.tabIndex }).first();

    return firstByIndex ? firstByIndex : elements.find(function(element) {
      return /^(?:input|select|textarea)$/i.test(element.tagName);
    });
  },

  focusFirstElement: function(form) {
    form = $(form);
    var element = form.findFirstElement();
    if (element) element.activate();
    return form;
  },

  request: function(form, options) {
    form = $(form), options = Object.clone(options || { });

    var params = options.parameters, action = form.readAttribute('action') || '';
    if (action.blank()) action = window.location.href;
    options.parameters = form.serialize(true);

    if (params) {
      if (Object.isString(params)) params = params.toQueryParams();
      Object.extend(options.parameters, params);
    }

    if (form.hasAttribute('method') && !options.method)
      options.method = form.method;

    return new Ajax.Request(action, options);
  }
};

/*--------------------------------------------------------------------------*/


Form.Element = {
  focus: function(element) {
    $(element).focus();
    return element;
  },

  select: function(element) {
    $(element).select();
    return element;
  }
};

Form.Element.Methods = {

  serialize: function(element) {
    element = $(element);
    if (!element.disabled && element.name) {
      var value = element.getValue();
      if (value != undefined) {
        var pair = { };
        pair[element.name] = value;
        return Object.toQueryString(pair);
      }
    }
    return '';
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    return Form.Element.Serializers[method](element);
  },

  setValue: function(element, value) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    Form.Element.Serializers[method](element, value);
    return element;
  },

  clear: function(element) {
    $(element).value = '';
    return element;
  },

  present: function(element) {
    return $(element).value != '';
  },

  activate: function(element) {
    element = $(element);
    try {
      element.focus();
      if (element.select && (element.tagName.toLowerCase() != 'input' ||
          !(/^(?:button|reset|submit)$/i.test(element.type))))
        element.select();
    } catch (e) { }
    return element;
  },

  disable: function(element) {
    element = $(element);
    element.disabled = true;
    return element;
  },

  enable: function(element) {
    element = $(element);
    element.disabled = false;
    return element;
  }
};

/*--------------------------------------------------------------------------*/

var Field = Form.Element;

var $F = Form.Element.Methods.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers = (function() {
  function input(element, value) {
    switch (element.type.toLowerCase()) {
      case 'checkbox':
      case 'radio':
        return inputSelector(element, value);
      default:
        return valueSelector(element, value);
    }
  }

  function inputSelector(element, value) {
    if (Object.isUndefined(value))
      return element.checked ? element.value : null;
    else element.checked = !!value;
  }

  function valueSelector(element, value) {
    if (Object.isUndefined(value)) return element.value;
    else element.value = value;
  }

  function select(element, value) {
    if (Object.isUndefined(value))
      return (element.type === 'select-one' ? selectOne : selectMany)(element);

    var opt, currentValue, single = !Object.isArray(value);
    for (var i = 0, length = element.length; i < length; i++) {
      opt = element.options[i];
      currentValue = this.optionValue(opt);
      if (single) {
        if (currentValue == value) {
          opt.selected = true;
          return;
        }
      }
      else opt.selected = value.include(currentValue);
    }
  }

  function selectOne(element) {
    var index = element.selectedIndex;
    return index >= 0 ? optionValue(element.options[index]) : null;
  }

  function selectMany(element) {
    var values, length = element.length;
    if (!length) return null;

    for (var i = 0, values = []; i < length; i++) {
      var opt = element.options[i];
      if (opt.selected) values.push(optionValue(opt));
    }
    return values;
  }

  function optionValue(opt) {
    return Element.hasAttribute(opt, 'value') ? opt.value : opt.text;
  }

  return {
    input:         input,
    inputSelector: inputSelector,
    textarea:      valueSelector,
    select:        select,
    selectOne:     selectOne,
    selectMany:    selectMany,
    optionValue:   optionValue,
    button:        valueSelector
  };
})();

/*--------------------------------------------------------------------------*/


Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
  initialize: function($super, element, frequency, callback) {
    $super(callback, frequency);
    this.element   = $(element);
    this.lastValue = this.getValue();
  },

  execute: function() {
    var value = this.getValue();
    if (Object.isString(this.lastValue) && Object.isString(value) ?
        this.lastValue != value : String(this.lastValue) != String(value)) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
});

Form.Element.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = Class.create({
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    Form.getElements(this.element).each(this.registerCallback, this);
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        default:
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
});

Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
(function(GLOBAL) {
  var DIV = document.createElement('div');
  var docEl = document.documentElement;
  var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'onmouseenter' in docEl
   && 'onmouseleave' in docEl;

  var Event = {
    KEY_BACKSPACE: 8,
    KEY_TAB:       9,
    KEY_RETURN:   13,
    KEY_ESC:      27,
    KEY_LEFT:     37,
    KEY_UP:       38,
    KEY_RIGHT:    39,
    KEY_DOWN:     40,
    KEY_DELETE:   46,
    KEY_HOME:     36,
    KEY_END:      35,
    KEY_PAGEUP:   33,
    KEY_PAGEDOWN: 34,
    KEY_INSERT:   45
  };


  var isIELegacyEvent = function(event) { return false; };

  if (window.attachEvent) {
    if (window.addEventListener) {
      isIELegacyEvent = function(event) {
        return !(event instanceof window.Event);
      };
    } else {
      isIELegacyEvent = function(event) { return true; };
    }
  }

  var _isButton;

  function _isButtonForDOMEvents(event, code) {
    return event.which ? (event.which === code + 1) : (event.button === code);
  }

  var legacyButtonMap = { 0: 1, 1: 4, 2: 2 };
  function _isButtonForLegacyEvents(event, code) {
    return event.button === legacyButtonMap[code];
  }

  function _isButtonForWebKit(event, code) {
    switch (code) {
      case 0: return event.which == 1 && !event.metaKey;
      case 1: return event.which == 2 || (event.which == 1 && event.metaKey);
      case 2: return event.which == 3;
      default: return false;
    }
  }

  if (window.attachEvent) {
    if (!window.addEventListener) {
      _isButton = _isButtonForLegacyEvents;
    } else {
      _isButton = function(event, code) {
        return isIELegacyEvent(event) ? _isButtonForLegacyEvents(event, code) :
         _isButtonForDOMEvents(event, code);
      }
    }
  } else if (Prototype.Browser.WebKit) {
    _isButton = _isButtonForWebKit;
  } else {
    _isButton = _isButtonForDOMEvents;
  }

  function isLeftClick(event)   { return _isButton(event, 0) }

  function isMiddleClick(event) { return _isButton(event, 1) }

  function isRightClick(event)  { return _isButton(event, 2) }

  function element(event) {
    return Element.extend(_element(event));
  }

  function _element(event) {
    event = Event.extend(event);

    var node = event.target, type = event.type,
     currentTarget = event.currentTarget;

    if (currentTarget && currentTarget.tagName) {
      if (type === 'load' || type === 'error' ||
        (type === 'click' && currentTarget.tagName.toLowerCase() === 'input'
          && currentTarget.type === 'radio'))
            node = currentTarget;
    }

    return node.nodeType == Node.TEXT_NODE ? node.parentNode : node;
  }

  function findElement(event, expression) {
    var element = _element(event), selector = Prototype.Selector;
    if (!expression) return Element.extend(element);
    while (element) {
      if (Object.isElement(element) && selector.match(element, expression))
        return Element.extend(element);
      element = element.parentNode;
    }
  }

  function pointer(event) {
    return { x: pointerX(event), y: pointerY(event) };
  }

  function pointerX(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollLeft: 0 };

    return event.pageX || (event.clientX +
      (docElement.scrollLeft || body.scrollLeft) -
      (docElement.clientLeft || 0));
  }

  function pointerY(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollTop: 0 };

    return  event.pageY || (event.clientY +
       (docElement.scrollTop || body.scrollTop) -
       (docElement.clientTop || 0));
  }


  function stop(event) {
    Event.extend(event);
    event.preventDefault();
    event.stopPropagation();

    event.stopped = true;
  }


  Event.Methods = {
    isLeftClick:   isLeftClick,
    isMiddleClick: isMiddleClick,
    isRightClick:  isRightClick,

    element:     element,
    findElement: findElement,

    pointer:  pointer,
    pointerX: pointerX,
    pointerY: pointerY,

    stop: stop
  };

  var methods = Object.keys(Event.Methods).inject({ }, function(m, name) {
    m[name] = Event.Methods[name].methodize();
    return m;
  });

  if (window.attachEvent) {
    function _relatedTarget(event) {
      var element;
      switch (event.type) {
        case 'mouseover':
        case 'mouseenter':
          element = event.fromElement;
          break;
        case 'mouseout':
        case 'mouseleave':
          element = event.toElement;
          break;
        default:
          return null;
      }
      return Element.extend(element);
    }

    var additionalMethods = {
      stopPropagation: function() { this.cancelBubble = true },
      preventDefault:  function() { this.returnValue = false },
      inspect: function() { return '[object Event]' }
    };

    Event.extend = function(event, element) {
      if (!event) return false;

      if (!isIELegacyEvent(event)) return event;

      if (event._extendedByPrototype) return event;
      event._extendedByPrototype = Prototype.emptyFunction;

      var pointer = Event.pointer(event);

      Object.extend(event, {
        target: event.srcElement || element,
        relatedTarget: _relatedTarget(event),
        pageX:  pointer.x,
        pageY:  pointer.y
      });

      Object.extend(event, methods);
      Object.extend(event, additionalMethods);

      return event;
    };
  } else {
    Event.extend = Prototype.K;
  }

  if (window.addEventListener) {
    Event.prototype = window.Event.prototype || document.createEvent('HTMLEvents').__proto__;
    Object.extend(Event.prototype, methods);
  }

  var EVENT_TRANSLATIONS = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };

  function getDOMEventName(eventName) {
    return EVENT_TRANSLATIONS[eventName] || eventName;
  }

  if (MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED)
    getDOMEventName = Prototype.K;

  function getUniqueElementID(element) {
    if (element === window) return 0;

    if (typeof element._prototypeUID === 'undefined')
      element._prototypeUID = Element.Storage.UID++;
    return element._prototypeUID;
  }

  function getUniqueElementID_IE(element) {
    if (element === window) return 0;
    if (element == document) return 1;
    return element.uniqueID;
  }

  if ('uniqueID' in DIV)
    getUniqueElementID = getUniqueElementID_IE;

  function isCustomEvent(eventName) {
    return eventName.include(':');
  }

  Event._isCustomEvent = isCustomEvent;

  function getRegistryForElement(element, uid) {
    var CACHE = GLOBAL.Event.cache;
    if (Object.isUndefined(uid))
      uid = getUniqueElementID(element);
    if (!CACHE[uid]) CACHE[uid] = { element: element };
    return CACHE[uid];
  }

  function destroyRegistryForElement(element, uid) {
    if (Object.isUndefined(uid))
      uid = getUniqueElementID(element);
    delete GLOBAL.Event.cache[uid];
  }


  function register(element, eventName, handler) {
    var registry = getRegistryForElement(element);
    if (!registry[eventName]) registry[eventName] = [];
    var entries = registry[eventName];

    var i = entries.length;
    while (i--)
      if (entries[i].handler === handler) return null;

    var uid = getUniqueElementID(element);
    var responder = GLOBAL.Event._createResponder(uid, eventName, handler);
    var entry = {
      responder: responder,
      handler:   handler
    };

    entries.push(entry);
    return entry;
  }

  function unregister(element, eventName, handler) {
    var registry = getRegistryForElement(element);
    var entries = registry[eventName];
    if (!entries) return;

    var i = entries.length, entry;
    while (i--) {
      if (entries[i].handler === handler) {
        entry = entries[i];
        break;
      }
    }

    if (!entry) return;

    var index = entries.indexOf(entry);
    entries.splice(index, 1);

    return entry;
  }


  function observe(element, eventName, handler) {
    element = $(element);
    var entry = register(element, eventName, handler);

    if (entry === null) return element;

    var responder = entry.responder;
    if (isCustomEvent(eventName))
      observeCustomEvent(element, eventName, responder);
    else
      observeStandardEvent(element, eventName, responder);

    return element;
  }

  function observeStandardEvent(element, eventName, responder) {
    var actualEventName = getDOMEventName(eventName);
    if (element.addEventListener) {
      element.addEventListener(actualEventName, responder, false);
    } else {
      element.attachEvent('on' + actualEventName, responder);
    }
  }

  function observeCustomEvent(element, eventName, responder) {
    if (element.addEventListener) {
      element.addEventListener('dataavailable', responder, false);
    } else {
      element.attachEvent('ondataavailable', responder);
      element.attachEvent('onlosecapture',   responder);
    }
  }

  function stopObserving(element, eventName, handler) {
    element = $(element);
    var handlerGiven = !Object.isUndefined(handler),
     eventNameGiven = !Object.isUndefined(eventName);

    if (!eventNameGiven && !handlerGiven) {
      stopObservingElement(element);
      return element;
    }

    if (!handlerGiven) {
      stopObservingEventName(element, eventName);
      return element;
    }

    var entry = unregister(element, eventName, handler);

    if (!entry) return element;
    removeEvent(element, eventName, entry.responder);
    return element;
  }

  function stopObservingStandardEvent(element, eventName, responder) {
    var actualEventName = getDOMEventName(eventName);
    if (element.removeEventListener) {
      element.removeEventListener(actualEventName, responder, false);
    } else {
      element.detachEvent('on' + actualEventName, responder);
    }
  }

  function stopObservingCustomEvent(element, eventName, responder) {
    if (element.removeEventListener) {
      element.removeEventListener('dataavailable', responder, false);
    } else {
      element.detachEvent('ondataavailable', responder);
      element.detachEvent('onlosecapture',   responder);
    }
  }



  function stopObservingElement(element) {
    var uid = getUniqueElementID(element), registry = GLOBAL.Event.cache[uid];
    if (!registry) return;

    destroyRegistryForElement(element, uid);

    var entries, i;
    for (var eventName in registry) {
      if (eventName === 'element') continue;

      entries = registry[eventName];
      i = entries.length;
      while (i--)
        removeEvent(element, eventName, entries[i].responder);
    }
  }

  function stopObservingEventName(element, eventName) {
    var registry = getRegistryForElement(element);
    var entries = registry[eventName];
    if (!entries) return;
    delete registry[eventName];

    var i = entries.length;
    while (i--)
      removeEvent(element, eventName, entries[i].responder);
  }


  function removeEvent(element, eventName, handler) {
    if (isCustomEvent(eventName))
      stopObservingCustomEvent(element, eventName, handler);
    else
      stopObservingStandardEvent(element, eventName, handler);
  }



  function getFireTarget(element) {
    if (element !== document) return element;
    if (document.createEvent && !element.dispatchEvent)
      return document.documentElement;
    return element;
  }

  function fire(element, eventName, memo, bubble) {
    element = getFireTarget($(element));
    if (Object.isUndefined(bubble)) bubble = true;
    memo = memo || {};

    var event = fireEvent(element, eventName, memo, bubble);
    return Event.extend(event);
  }

  function fireEvent_DOM(element, eventName, memo, bubble) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent('dataavailable', bubble, true);

    event.eventName = eventName;
    event.memo = memo;

    element.dispatchEvent(event);
    return event;
  }

  function fireEvent_IE(element, eventName, memo, bubble) {
    var event = document.createEventObject();
    event.eventType = bubble ? 'ondataavailable' : 'onlosecapture';

    event.eventName = eventName;
    event.memo = memo;

    element.fireEvent(event.eventType, event);
    return event;
  }

  var fireEvent = document.createEvent ? fireEvent_DOM : fireEvent_IE;



  Event.Handler = Class.create({
    initialize: function(element, eventName, selector, callback) {
      this.element   = $(element);
      this.eventName = eventName;
      this.selector  = selector;
      this.callback  = callback;
      this.handler   = this.handleEvent.bind(this);
    },


    start: function() {
      Event.observe(this.element, this.eventName, this.handler);
      return this;
    },

    stop: function() {
      Event.stopObserving(this.element, this.eventName, this.handler);
      return this;
    },

    handleEvent: function(event) {
      var element = Event.findElement(event, this.selector);
      if (element) this.callback.call(this.element, event, element);
    }
  });

  function on(element, eventName, selector, callback) {
    element = $(element);
    if (Object.isFunction(selector) && Object.isUndefined(callback)) {
      callback = selector, selector = null;
    }

    return new Event.Handler(element, eventName, selector, callback).start();
  }

  Object.extend(Event, Event.Methods);

  Object.extend(Event, {
    fire:          fire,
    observe:       observe,
    stopObserving: stopObserving,
    on:            on
  });

  Element.addMethods({
    fire:          fire,

    observe:       observe,

    stopObserving: stopObserving,

    on:            on
  });

  Object.extend(document, {
    fire:          fire.methodize(),

    observe:       observe.methodize(),

    stopObserving: stopObserving.methodize(),

    on:            on.methodize(),

    loaded:        false
  });

  if (GLOBAL.Event) Object.extend(window.Event, Event);
  else GLOBAL.Event = Event;

  GLOBAL.Event.cache = {};

  function destroyCache_IE() {
    GLOBAL.Event.cache = null;
  }

  if (window.attachEvent)
    window.attachEvent('onunload', destroyCache_IE);

  DIV = null;
  docEl = null;
})(this);

(function(GLOBAL) {
  /* Code for creating leak-free event responders is based on work by
   John-David Dalton. */

  var docEl = document.documentElement;
  var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'onmouseenter' in docEl
    && 'onmouseleave' in docEl;

  function isSimulatedMouseEnterLeaveEvent(eventName) {
    return !MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED &&
     (eventName === 'mouseenter' || eventName === 'mouseleave');
  }

  function createResponder(uid, eventName, handler) {
    if (Event._isCustomEvent(eventName))
      return createResponderForCustomEvent(uid, eventName, handler);
    if (isSimulatedMouseEnterLeaveEvent(eventName))
      return createMouseEnterLeaveResponder(uid, eventName, handler);

    return function(event) {
      if (!Event.cache) return;

      var element = Event.cache[uid].element;
      Event.extend(event, element);
      handler.call(element, event);
    };
  }

  function createResponderForCustomEvent(uid, eventName, handler) {
    return function(event) {
      var element = Event.cache[uid].element;

      if (Object.isUndefined(event.eventName))
        return false;

      if (event.eventName !== eventName)
        return false;

      Event.extend(event, element);
      handler.call(element, event);
    };
  }

  function createMouseEnterLeaveResponder(uid, eventName, handler) {
    return function(event) {
      var element = Event.cache[uid].element;

      Event.extend(event, element);
      var parent = event.relatedTarget;

      while (parent && parent !== element) {
        try { parent = parent.parentNode; }
        catch(e) { parent = element; }
      }

      if (parent === element) return;
      handler.call(element, event);
    }
  }

  GLOBAL.Event._createResponder = createResponder;
  docEl = null;
})(this);

(function(GLOBAL) {
  /* Support for the DOMContentLoaded event is based on work by Dan Webb,
     Matthias Miller, Dean Edwards, John Resig, and Diego Perini. */

  var TIMER;

  function fireContentLoadedEvent() {
    if (document.loaded) return;
    if (TIMER) window.clearTimeout(TIMER);
    document.loaded = true;
    document.fire('dom:loaded');
  }

  function checkReadyState() {
    if (document.readyState === 'complete') {
      document.detachEvent('onreadystatechange', checkReadyState);
      fireContentLoadedEvent();
    }
  }

  function pollDoScroll() {
    try {
      document.documentElement.doScroll('left');
    } catch (e) {
      TIMER = pollDoScroll.defer();
      return;
    }

    fireContentLoadedEvent();
  }


  if (document.readyState === 'complete') {
    fireContentLoadedEvent();
    return;
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
  } else {
    document.attachEvent('onreadystatechange', checkReadyState);
    if (window == top) TIMER = pollDoScroll.defer();
  }

  Event.observe(window, 'load', fireContentLoadedEvent);
})(this);


Element.addMethods();
/*------------------------------- DEPRECATED -------------------------------*/

Hash.toQueryString = Object.toQueryString;

var Toggle = { display: Element.toggle };

Element.Methods.childOf = Element.Methods.descendantOf;

var Insertion = {
  Before: function(element, content) {
    return Element.insert(element, {before:content});
  },

  Top: function(element, content) {
    return Element.insert(element, {top:content});
  },

  Bottom: function(element, content) {
    return Element.insert(element, {bottom:content});
  },

  After: function(element, content) {
    return Element.insert(element, {after:content});
  }
};

var $continue = new Error('"throw $continue" is deprecated, use "return" instead');

var Position = {
  includeScrollOffsets: false,

  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = Element.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = Element.cumulativeScrollOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = Element.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },


  cumulativeOffset: Element.Methods.cumulativeOffset,

  positionedOffset: Element.Methods.positionedOffset,

  absolutize: function(element) {
    Position.prepare();
    return Element.absolutize(element);
  },

  relativize: function(element) {
    Position.prepare();
    return Element.relativize(element);
  },

  realOffset: Element.Methods.cumulativeScrollOffset,

  offsetParent: Element.Methods.getOffsetParent,

  page: Element.Methods.viewportOffset,

  clone: function(source, target, options) {
    options = options || { };
    return Element.clonePosition(target, source, options);
  }
};

/*--------------------------------------------------------------------------*/

if (!document.getElementsByClassName) document.getElementsByClassName = function(instanceMethods){
  function iter(name) {
    return name.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + name + " ')]";
  }

  instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath ?
  function(element, className) {
    className = className.toString().strip();
    var cond = /\s/.test(className) ? $w(className).map(iter).join('') : iter(className);
    return cond ? document._getElementsByXPath('.//*' + cond, element) : [];
  } : function(element, className) {
    className = className.toString().strip();
    var elements = [], classNames = (/\s/.test(className) ? $w(className) : null);
    if (!classNames && !className) return elements;

    var nodes = $(element).getElementsByTagName('*');
    className = ' ' + className + ' ';

    for (var i = 0, child, cn; child = nodes[i]; i++) {
      if (child.className && (cn = ' ' + child.className + ' ') && (cn.include(className) ||
          (classNames && classNames.all(function(name) {
            return !name.toString().blank() && cn.include(' ' + name + ' ');
          }))))
        elements.push(Element.extend(child));
    }
    return elements;
  };

  return function(className, parentElement) {
    return $(parentElement || document.body).getElementsByClassName(className);
  };
}(Element.Methods);

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator, context) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator, context);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set($A(this).concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set($A(this).without(classNameToRemove).join(' '));
  },

  toString: function() {
    return $A(this).join(' ');
  }
};

Object.extend(Element.ClassNames.prototype, Enumerable);

/*--------------------------------------------------------------------------*/

(function() {
  window.Selector = Class.create({
    initialize: function(expression) {
      this.expression = expression.strip();
    },

    findElements: function(rootElement) {
      return Prototype.Selector.select(this.expression, rootElement);
    },

    match: function(element) {
      return Prototype.Selector.match(element, this.expression);
    },

    toString: function() {
      return this.expression;
    },

    inspect: function() {
      return "#<Selector: " + this.expression + ">";
    }
  });

  Object.extend(Selector, {
    matchElements: function(elements, expression) {
      var match = Prototype.Selector.match,
          results = [];

      for (var i = 0, length = elements.length; i < length; i++) {
        var element = elements[i];
        if (match(element, expression)) {
          results.push(Element.extend(element));
        }
      }
      return results;
    },

    findElement: function(elements, expression, index) {
      index = index || 0;
      var matchIndex = 0, element;
      for (var i = 0, length = elements.length; i < length; i++) {
        element = elements[i];
        if (Prototype.Selector.match(element, expression) && index === matchIndex++) {
          return Element.extend(element);
        }
      }
    },

    findChildElements: function(element, expressions) {
      var selector = expressions.toArray().join(', ');
      return Prototype.Selector.select(selector, element || document);
    }
  });
})();

"use strict";
/*	============================================================================
									Gibson Research Corporation
				UHEPRNG - Ultra High Entropy Pseudo-Random Number Generator
	============================================================================
	This is GRC's cryptographically strong PRNG (pseudo-random number generator)
	for JavaScript. It is driven by 1536 bits of entropy, stored in an array of
	48, 32-bit JavaScript variables.  Since many applications of this generator,
	including ours with the "Off The Grid" Latin Square generator, may require
	the deteriministic re-generation of a sequence of PRNs, this PRNG's initial
	entropic state can be read and written as a static whole, and incrementally
	evolved by pouring new source entropy into the generator's internal state.
	----------------------------------------------------------------------------
	ENDLESS THANKS are due Johannes Baagoe for his careful development of highly
	robust JavaScript implementations of JS PRNGs.  This work was based upon his
	JavaScript "Alea" PRNG which is based upon the extremely robust Multiply-
	With-Carry (MWC) PRNG invented by George Marsaglia. MWC Algorithm References:
	http://www.GRC.com/otg/Marsaglia_PRNGs.pdf
	http://www.GRC.com/otg/Marsaglia_MWC_Generators.pdf
	----------------------------------------------------------------------------
	The quality of this algorithm's pseudo-random numbers have been verified by
	multiple independent researchers. It handily passes the fermilab.ch tests as
	well as the "diehard" and "dieharder" test suites.  For individuals wishing
	to further verify the quality of this algorithm's pseudo-random numbers, a
	256-megabyte file of this algorithm's output may be downloaded from GRC.com,
	and a Microsoft Windows scripting host (WSH) version of this algorithm may be
	downloaded and run from the Windows command prompt to generate unique files
	of any size:
	The Fermilab "ENT" tests: http://fourmilab.ch/random/
	The 256-megabyte sample PRN file at GRC: https://www.GRC.com/otg/uheprng.bin
	The Windows scripting host version: https://www.GRC.com/otg/wsh-uheprng.js
	----------------------------------------------------------------------------
	Qualifying MWC multipliers are: 187884, 686118, 898134, 1104375, 1250205,
	1460910 and 1768863. (We use the largest one that's < 2^21)
	============================================================================ */

function uheprng() {
	return (function() {
  		var o = 48;					// set the 'order' number of ENTROPY-holding 32-bit values
		var c = 1;					// init the 'carry' used by the multiply-with-carry (MWC) algorithm
		var p = o;					// init the 'phase' (max-1) of the intermediate variable pointer
		var s = new Array(o);	// declare our intermediate variables array
		var i,j,k=0;				// general purpose locals

		// when our "uheprng" is initially invoked our PRNG state is initialized from the
		// browser's own local PRNG. This is okay since although its generator might not
		// be wonderful, it's useful for establishing large startup entropy for our usage.		
		var mash = Mash();		// get a pointer to our high-performance "Mash" hash
		for (i = 0; i < o; i++) s[i] = mash( Math.random() );	// fill the array with initial mash hash values

		// this PRIVATE (internal access only) function is the heart of the multiply-with-carry
		// (MWC) PRNG algorithm. When called it returns a pseudo-random number in the form of a
		// 32-bit JavaScript fraction (0.0 to <1.0) it is a PRIVATE function used by the default
		// [0-1] return function, and by the random 'string(n)' function which returns 'n'
		// characters from 33 to 126.
		function rawprng() {
			if (++p >= o) p = 0;
			var t = 1768863 * s[p] + c * 2.3283064365386963e-10; // 2^-32
      	return s[p] = t - (c = t | 0);
		};
		
		// this EXPORTED function is the default function returned by this library.
		// The values returned are integers in the range from 0 to range-1. We first
		// obtain two 32-bit fractions (from rawprng) to synthesize a single high
		// resolution 53-bit prng (0 to <1), then we multiply this by the caller's
		// "range" param and take the "floor" to return a equally probable integer.
		var random = function( range ) {
			return Math.floor(range * (rawprng() + (rawprng() * 0x200000 | 0) * 1.1102230246251565e-16)); // 2^-53
		};

		// this EXPORTED function 'string(n)' returns a pseudo-random string of
		// 'n' printable characters ranging from chr(33) to chr(126) inclusive.
		random.string = function( count ) {
			var i, s='';
			for ( i=0; i<count; i++ ) s += String.fromCharCode( 33+random(94) );
			return s;
		};

		// this PRIVATE "hash" function is used to evolve the generator's internal
		// entropy state. It is also called by the EXPORTED addEntropy() function
		// which is used to pour entropy into the PRNG.
		function hash() {
			var args = Array.prototype.slice.call(arguments)
			for (i = 0; i < args.length; i++) {
				for (j = 0; j < o; j++) {
					s[j] -= mash(args[i]);
					if (s[j] < 0) s[j] += 1;
				}
			}
		};

		// this EXPORTED "clean string" function removes leading and trailing spaces and non-printing
		// control characters, including any embedded carriage-return (CR) and line-feed (LF) characters,
		// from any string it is handed. this is also used by the 'hashstring' function (below) to help
		// users always obtain the same EFFECTIVE uheprng seeding key.
		random.cleanString = function( inStr ) {
			inStr = inStr.replace(/(^\s*)|(\s*$)/gi,""); // remove any/all leading spaces
			inStr = inStr.replace(/[\x00-\x1F]/gi,"");	// remove any/all control characters
			inStr = inStr.replace(/\n /,"\n");				// remove any/all trailing spaces
			return inStr;											// return the cleaned up result
		}
		
		// this EXPORTED "hash string" function hashes the provided character string after first removing
		// any leading or trailing spaces and ignoring any embedded carriage returns (CR) or Line Feeds (LF)
		random.hashString = function( inStr ) {
			inStr = random.cleanString( inStr );
			mash( inStr );											// use the string to evolve the 'mash' state
			for ( i = 0; i < inStr.length; i++) {			// scan through the characters in our string
				k = inStr.charCodeAt( i );						// get the character code at the location
				for (j = 0; j < o; j++) {						//	"mash" it into the UHEPRNG state
					s[j] -= mash( k );
					if (s[j] < 0) s[j] += 1;
				}
			}
		};
				
		// this handy exported function is used to add entropy to our uheprng at any time
		random.addEntropy = function( /* accept zero or more arguments */ ) {
			var args = [];
			for ( i = 0; i < arguments.length; i++ ) args.push( arguments[i] );
			hash( (k++) + (new Date().getTime()) + args.join('') + Math.random() );
		};
		
		// if we want to provide a deterministic startup context for our PRNG,
		// but without directly setting the internal state variables, this allows
		// us to initialize the mash hash and PRNG's internal state before providing
		// some hashing input
		random.initState = function() {
			mash();													// pass a null arg to force mash hash to init
			for (i = 0; i < o; i++) s[i] = mash( ' ' );	// fill the array with initial mash hash values
			c = 1;													// init our multiply-with-carry carry
			p = o;													// init our phase
		};
		
		// we use this (optional) exported function to signal the JavaScript interpreter
		// that we're finished using the "Mash" hash function so that it can free up the
		// local "instance variables" is will have been maintaining.  It's not strictly
		// necessary, of course, but it's good JavaScript citizenship.
		random.done = function() {
			mash = null;
		};

		// when our main outer "uheprng" function is called, after setting up our
		// initial variables and entropic state, we return an "instance pointer"
		// to the internal anonymous function which can then be used to access
		// the uheprng's various exported functions.  As with the ".done" function
		// above, we should set the returned value to 'null' once we're finished
		// using any of these functions.
		return random;
  } ());
};

/*	============================================================================
	This is based upon Johannes Baagoe's carefully designed and efficient hash
	function for use with JavaScript.  It has a proven "avalanche" effect such
	that every bit of the input affects every bit of the output 50% of the time,
	which is good.	See: http://baagoe.com/en/RandomMusings/hash/avalanche.xhtml
	============================================================================
*/
function Mash() {
	var n = 0xefc8249d;
	var mash = function(data) {
		if ( data ) {
			data = data.toString();
			for (var i = 0; i < data.length; i++) {
				n += data.charCodeAt(i);
				var h = 0.02519603282416938 * n;
				n = h >>> 0;
				h -= n;
				h *= n;
				n = h >>> 0;
				h -= n;
				n += h * 0x100000000; // 2^32
			}
			return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
		} else n = 0xefc8249d;
	};
  return mash;
}

/*
 * osweb 
 *  
 * An experiment research tool written in Javascript and HTML to be used in 
 * Qualtrics or other web-based tools. Based upon OpenSesame.         
 *
 * Author: drs. J. Bos
 *
 * Copyright (c) University of Groningen 
 * Faculty of Behavioural and Social Sciences
 * Technical Support Service 
 *
 */

// Use strict mode.     
"use strict";

// Set osweb namespace.
this.osweb = this.osweb||{};

// Definition of osweb version constants. 
osweb.VERSION_NAME   = 'osweb';
osweb.VERSION_NUMBER = '0.041 (19-07-2016)';

// Definition of osweb class utility methods.
osweb.extendClass = function(sub_class, super_class) {
    function o() { 
        this.constructor = sub_class; 
    }
    o.prototype = super_class.prototype;
    return (sub_class.prototype = new o());
}; 

osweb.isClass = function(class_name) {
    // Return true if the classname is defined within the osweb namespace.
    return (this[class_name] !== undefined);
};

osweb.newItemClass = function(type, experiment, name, string) {
    // Create the element.
    var element = new this[type](experiment, name, string);
   
    // Set the type of the item.
    element.type = type;
    
    // Return the element
    return element;
};

osweb.newElementClass = function(type, sketchpad, string) {
    // Create the element.
    var element = new this[type](sketchpad, string);
    
    // Return the element
    return element;
};

osweb.newWidgetClass = function(type, form, variables) {
    // Create the element.
    var widget = new this[type](form, variables);
   	
    // Return the element
    return widget;
}; 

osweb.promoteClass = function(sub_class, prefix) {
    var subP = sub_class.prototype, supP = (Object.getPrototypeOf&&Object.getPrototypeOf(subP))||subP.__proto__;
    if (supP) {
    	subP[(prefix+="_") + "constructor"] = supP.constructor; 
    	for (var n in supP) {
            if (subP.hasOwnProperty(n) && (typeof supP[n] === "function")) {
                subP[prefix + n] = supP[n]; 
            }
	}
    }
    return sub_class;
}; 


(function() {
    // Definition of the class constants.
    function constants() {
    	throw 'The class constants cannot be instantiated!';
    }

    // Definition of error constants. 
    constants.ERROR_001 = 'osweb has stopped running due a fatal error.';
    constants.ERROR_002 = 'No content parameter specified.';
    constants.ERROR_003 = 'No context parameter specified.';
    constants.ERROR_004 = 'Invalid scriptID or scriptURL for retrieving script from external location.';
    constants.ERROR_005 = 'Failure to retrieve script from external location (Ajax call error).';
    constants.ERROR_006 = 'Failure to retrieve script from external location (database response error)';
    constants.ERROR_007 = 'Failure to retrieve script from external location (database retrieve error).';
    constants.ERROR_008 = 'Invalid script definition, parsing error.';
    constants.ERROR_009 = 'Unknown class definition within osweb script - ';

    // Definition of message constants. 
    constants.MESSAGE_001 = 'Os';
    constants.MESSAGE_002 = 'web - version ';
    constants.MESSAGE_003 = 'Start up osweb experiment session.';
    constants.MESSAGE_004 = 'Retrieving stimuli files.';
    constants.MESSAGE_005 = 'Retrieving input parameters.';
    constants.MESSAGE_006 = 'Press with the mouse on this screen to continue.';
    constants.MESSAGE_007 = 'Warning: this method is not implemented in the current version of OsWeb - ';
    constants.MESSAGE_008 = 'Retrieving session information.';

    // Definition of general constants. 
    constants.STATUS_NONE = 0;                   // Running status of an item.   
    constants.STATUS_BUILD = 1;
    constants.STATUS_INITIALIZE = 2;
    constants.STATUS_EXECUTE = 3;
    constants.STATUS_FINALIZE = 4;
    constants.PARSER_NONE = 0;                   // Running status of the parser.
    constants.PARSER_EXECUTE = 1;
    constants.STATUS_PENDING = 2;
    constants.STATUS_DONE = 3;
    constants.PRESSES_ONLY = 1;                  // Type of used collection mode.           
    constants.RELEASES_ONLY = 2;
    constants.PRESSES_AND_RELEASES = 3;
    constants.RESPONSE_NONE = 0;                 // Type of response used.
    constants.RESPONSE_DURATION = 1;
    constants.RESPONSE_KEYBOARD = 2;
    constants.RESPONSE_MOUSE = 3;
    constants.RESPONSE_SOUND = 4;
    constants.RESPONSE_AUTOKEYBOARD = 5;
    constants.RESPONSE_AUTOMOUSE = 6;
    constants.UPDATE_NONE = 0;                  // Item update status flag.
    constants.UPDATE_ONSET = 1;
    constants.UPDATE_OFFSET = 2;
    constants.SEQUENTIAL = 0;                   // Loop randomization type.
    constants.RANDOM = 1;
    constants.RANDOMREPLACEMENT = 2;

    // Bind the constants class to the osweb namespace.
    osweb.constants = constants;
}()); 


(function() {
// Definition of the class canvas.
    function canvas(experiment, auto_prepare) {
	// set the class public properties.
        this.auto_prepare = (typeof auto_prepare === 'undefined') ? true : auto_prepare;              // Set autoprepare toggle (not supported yet). 	
        this.experiment = (typeof experiment === 'undefined') ? osweb.runner.experiment : experiment; // Anchor to the experiment object.
		
        // Set the public properties. 
    	this.background_color = this.experiment.vars.background;                         // Backgropund color of canvas.     
        this.bidi = (this.experiment.vars.bidi === 'yes');                               // If true bidi mode is enabled.
        this.color = this.experiment.vars.foregound;                                     // Foreground color of canvas.
        this.fill = false;                                                               // If true fill mode is used.
        this.font_bold = (this.experiment.vars.font_bold === 'yes');                     // If true font style bold is enabled.
        this.font_family = (this.experiment.vars.font_family);                           // Family name of the font used.
        this.font_italic = (this.experiment.vars.font_italic === 'yes');                 // If true font style italic is enabled.
        this.font_size = (this.experiment.vars.font_size);                               // Size of the font in pixels.
        this.font_underline = (this.experiment.vars.font_underline === 'yes');           // If true font style underline is enabled.
        this.html = true;                                                                // If true html is used (not supported yet).
        this.penwidth = 1;                                                               // Default penwidth for drawing shapes. 
        
        // Set the private properties.  
    	this._container = new createjs.Container();                                      // EASELJS: Container which holds the shapes
        this._font_string = 'bold 18px Courier New';                                     // EASELJS: Default font definition string.
	this._height = osweb.runner._canvas.height;                                      // Height of the HTML canvas used for drawing.
	this._width = osweb.runner._canvas.width;                                        // Width of the HTML canvas used for drawing.
    }; 
	
    // Extend the class from its base class.
    var p = canvas.prototype;
    
    // Definition of public properties. 
    p.auto_prepare= false;
    p.experiment = null;
    p.uniform_coordinates = false;
	
    // Definition of private methods. 
    
    p._arrow_shape = function(sx, sy, ex, ey, body_length, body_width, head_width) {
        // Length
        var d = Math.sqrt(Math.pow(ey - sy,2) + Math.pow(sx - ex,2));
        var angle = Math.atan2(ey - sy, ex - sx);
	var _head_width = (1 - body_width) / 2.0;
	body_width = body_width / 2.0;
	
        // calculate coordinates
	var p4 = [ex, ey];
	var p1 = [sx + body_width * head_width * Math.cos(angle - Math.PI / 2), sy + body_width * head_width * Math.sin(angle - Math.PI / 2)];
	var p2 = [p1[0] + body_length * Math.cos(angle) * d, p1[1] + body_length * Math.sin(angle) * d];
	var p3 = [p2[0] + _head_width * head_width * Math.cos(angle - Math.PI / 2), p2[1] + _head_width * head_width * Math.sin(angle - Math.PI / 2)];
	var p7 = [sx + body_width * head_width * Math.cos(angle + Math.PI / 2), sy + body_width * head_width * Math.sin(angle + Math.PI / 2)];
	var p6 = [p7[0] + body_length * Math.cos(angle) * d, p7[1] + body_length * Math.sin(angle) * d];
	var p5 = [p6[0] + _head_width * head_width * Math.cos(angle + Math.PI / 2), p6[1] + _head_width * head_width * Math.sin(angle + Math.PI / 2)];
	
        return [p1, p2, p3, p4, p5, p6, p7];
    };    
        
    // Definition of public methods. 
    
    p.arrow = function (sx, sy, ex, ey, color, penwidth, body_length, body_width, head_width, fill) {
        var points = this._arrow_shape(sx, sy, ex, ey, body_width, body_length, head_width);
    	var shape = new createjs.Shape();
	shape.graphics.setStrokeStyle(penwidth);
	shape.graphics.beginStroke(color);
        
        shape.graphics.moveTo(points[0][0],points[0][1]);
	shape.graphics.lineTo(points[1][0],points[1][1]);
	shape.graphics.lineTo(points[2][0],points[2][1]);
	shape.graphics.lineTo(points[3][0],points[3][1]);
	shape.graphics.lineTo(points[4][0],points[4][1]);
	shape.graphics.lineTo(points[5][0],points[5][1]);
	shape.graphics.lineTo(points[6][0],points[6][1]);
	shape.graphics.lineTo(points[0][0],points[0][1]);
	
       	// Add the line item to container.
	this._container.addChild(shape); 
    }; 
    		
    p.circle = function(x, y, r, fill, color, penwidth) {
	var shape = new createjs.Shape();
	shape.graphics.setStrokeStyle(penwidth);
	shape.graphics.beginStroke(color);
	if (fill == 1)
	{
            shape.graphics.beginFill(color);
	}
	shape.graphics.drawCircle(x, y, r);
		
	// Add the line item to container.
	this._container.addChild(shape); 
    };

    p.clear = function(backround_color) {
	// Remove the container from the stage object.
	osweb.runner._stage.removeChild(this._container);
	
        // Remove the children from the container.
        this._container.removeAllChildren();
    };

    p.close_display = function(experiment) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'canvas.close_display().');
    };

    p.copy = function(canvas) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'canvas.copy().');
    };

    p.ellipse = function(x, y, w, h, fill, color, penwidth) {
	var shape = new createjs.Shape();
	shape.graphics.setStrokeStyle(penwidth);
	shape.graphics.beginStroke(color);
	if (fill == 1)
	{
            shape.graphics.beginFill(color);
	}
	shape.graphics.drawEllipse(x, y, w, h); 

	// Add the text item to the parten frame.
	this._container.addChild(shape);
    };

    p.fixdot = function(x, y, color, style) {
        // Check the color and style arguments.      
        color = (typeof color === 'undefined') ? 'white' : color;
        style = (typeof style === 'undefined') ? 'default' : style;
        
        if (typeof x === 'undefined') {
            if (this.uniform_coordinates === true) {
		x = 0;
            }
            else {
                x = this._width / 2;
            }
	}
	if (typeof y === 'undefined') {
            if (this.uniform_coordinates === true) {
		y = 0;
            }
            else {
		y = this._height / 2;
            }	
	}
		
	var s = 4;
	var h = 2;
	if (style.indexOf('large') !== -1) {
            s = 16;
	}
	else if ((style.indexOf('medium') !== -1) || (style === 'default')) {
            s = 8;
	}
	else if (style.indexOf('small') !== -1) {
            s = 4;
	}
	else {
            osweb.debug.addError('Unknown style: ' + style);
	}	
		
	if ((style.indexOf('open') !== -1) || (style === 'default')) {	
            this.ellipse(x - s, y - s, 2 * s, 2 * s, 1, color, 1);
            this.ellipse(x - h, y - h, 2 * h, 2 * h, 1, 'black', 1);
	}
	else if (style.indexOf('filled') !== -1)	{	
            this.ellipse(x - s, y - s, 2 * s, 2 * s, 1, color, 1);
	}
        else if (style.indexOf('cross') !== -1)	{
            this.line(x, y - s, x, y + s);
            this.line(x - s, y, x + s, y);
	}
	else {
            osweb.debug.addError('Unknown style: ' + style);
	}	
    };

    p.gabor = function(x, y, orient, freq, env, size, stdev, phase, color1, color2, bgmode) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'canvas.gabor().');
    };

    p.height = function() {
    	return this._heigth();
    };

    p.image = function(fname, center, x, y, scale) {
	// Set the class private properties. 
	var image = new createjs.Bitmap();
        image.image = fname.data;
	image.scaleX = scale;
        image.scaleY = scale;
        image.snapToPixel = true;
        image.x = x - ((image.image.width  * scale) / 2);
    	image.y = y - ((image.image.height * scale) / 2);
	
	// Add the text item to the parten frame.
	this._container.addChild(image);
    };
	
    p.init_display = function(experiment) {
	// Set the dimension properties.
	this._height = experiment.vars.height;
    	this._width  = experiment.vars.width;
	
	// Initialize the display dimensions.
	osweb.runner._canvas.height = experiment.vars.height;
	osweb.runner._canvas.width  = experiment.vars.width;
		
	// Initialize the display color.
	osweb.runner._canvas.style.background = experiment.vars.background;

        // Set the cursor visibility to none (default).
        osweb.runner._canvas.style.cursor = 'none';

        // Set focus to the experiment canvas.
        osweb.runner._canvas.focus(); 
    };

    p.line = function(sx, sy, ex, ey, color, penwidth) {
    	var shape = new createjs.Shape();
	shape.graphics.setStrokeStyle(penwidth);
	shape.graphics.beginStroke(color);
	shape.graphics.moveTo(sx, sy);
	shape.graphics.lineTo(ex, ey); 

	// Add the line item to container..
	this._container.addChild(shape); 
    };
	
    p.noise_patch = function(pX, pY, pEnv, pSize, pStdev, pColor1, pColor2, pBgmode) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'canvas.noise_patch().');
    };
	
    p.polygon = function(verticles) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'canvas.polygon().');
    };
	
    p.prepare = function() {
    };
	
    p.rect = function(x, y, w, h, fill, color, penwidth) {
    	var shape = new createjs.Shape();
	shape.graphics.setStrokeStyle(penwidth);
	shape.graphics.beginStroke(color);
	if (fill == 1)
	{
            shape.graphics.beginFill(color);
	}
	shape.graphics.rect(x, y, w, h); 

	// Add the line item to container..
	this._container.addChild(shape); 
    };
	
    p.set_font = function(family, size, italic, bold, underline) {
   	// Define the the font styles.
    	var font_bold = (bold === true) ? 'bold ' : '';
        var font_italic = (italic === true) ? 'italic ' : '';
        var font_underline = (underline === true) ? 'underline ' : '';
        
        // Set the font string.
        this._font_string = font_bold + font_italic + font_underline + size + 'px ' + family; 
     };
        
    p.show = function() {
    	// Add the container to the stage object and update the stage.
	osweb.runner._stage.addChild(this._container);
	osweb.runner._stage.update(); 

	// Return the current time.
	if (this.experiment != null) {
            return this.experiment.clock.time();
        }    
        else {    
            return null;
        }
    };
	
    p.size = function() {
    	// Create object tuple.
    	var size = {width: this._width, height: this._height};
	return size;
    };
	
    p.text = function(text, center, x, y , color, html) {
	// Create the text element.          
	var text_element = new createjs.Text(text, this._font_string, color);

	// Set the text element properties.
	text_element.x = x - (text_element.getMeasuredWidth() / 2);
	text_element.y = y - (text_element.getMeasuredHeight() / 2);
		 
	// Add the text item to the parten frame.
	this._container.addChild(text_element);
    };

    p.text_size = function(text, max_width, style_args) {
        // Return the text size in pixels.
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'canvas.text_size().');
    };

    // Bind the canvas class to the osweb namespace.
    osweb.canvas = canvas;
}());



(function() {
    // Definition of the class clock.
    function clock(experiment) {
        // Definition of private properties. 
        this._startTime = this._now();                     // Start time anchor of the experiment.
		
        // Set the class public properties. 
	this.experiment = experiment;                      // Anchor to the experiment object.
    }; 
	
    // Extend the class from its base class.
    var p = clock.prototype;
    
    // Definition of public properties. 
    p.experiment = null;

    // Definition of private methods.   
    
    p._now = function() {
	// Get the current time stamp using the best available timing method.
	if (window.performance.now) {
            return Math.round(window.performance.now());
	} 
	else if (window.performance.webkitNow) {
            return Math.round(window.performance.webkitNow());
	} 
	else {
            return new Date().getTime();
	}
    };

    // Definition of public methods.   

    p.initialize = function() {
        // Set the absolute start time of the expeirment.
        this._startTime = this._now();
    };

    p.sleep = function(duration) {
        // Sleeps (pauses) for a duration (in milliseconds).
	if (this.experiment !==  null) {
            // Set the event processor.
            osweb.events._run(this, duration, osweb.constants.RESPONSE_DURATION, null);
	}
    };
	
    p.time = function() {
        // Gives the current timestamp in milliseconds. 
        if (this._startTime !== -1) {
            return (this._now() - this._startTime);
        }    
        else {
            return 0;
        }    
    };
 	
    // Bind the clock class to the osweb namespace.
    osweb.clock = clock;
}());



(function() {
    // Definition of the class keyboard.
    function keyboard(experiment, timeout, keylist) {
        // Set the public properties. 
	this.experiment = experiment;                                          // Anchor to the experiment object. 
	this.keylist = (typeof keylist === 'undefined') ? [] : keylist;	       // List of acceptable response keys. 
	this.timeout = (typeof timeout === 'undefined') ? null : timeout;      // Duration in millisecond for time-out.
    }; 
	
    // Extend the class from its base class.
    var p = keyboard.prototype;
    
    // Definition of public properties. 
    p.experiment = null;
    p.keylist = [];
    p.timeout = null;
	
    // Definition of the synoniem map for all keys.                                  
    p.SYNONIEM_MAP = [[' ','space','SPACE'],['"','quotedbl','QUOTEDBL'],['!','exclaim','EXCLAIM'],['#','hash','HASH'],
        ['$','dollar','DOLLAR'],['&','ampersand','AMPERSAND'],["'",'quote','QUOTE'],['(','leftbracket','leftparen','LEFTBRACKET','LEFTPAREN'],
        [')','rightbracket','rightparen','RIGHTBRACKET','RIGHTPAREN'],['*','asteriks','ASTERISK'],['+','plus','PLUS'],[',','comma','COMMA'],
        ['-','minus','MINUS'],['.','period','PERIOD'],['/','slash','SLASH'],
        ['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['0'],['=','equals','EQUALS'],
        [':','colon','COLON'],[';','semicolon','SEMICOLON'],['<','less','LESS'],['>','greater','GREATER'],
        ['?','question','QUESTION'],['@','at','AT'],
        ['a','A'],['b','B'],['c','C'],['d','D'],['e','E'],['f','F'],
        ['g','G'],['h','H'],['i','I'],['j','J'],['k','K'],['l','L'],
        ['m','M'],['n','N'],['o','O'],['p','P'],['q','Q'],['r','R'],
        ['s','S'],['t','T'],['u','U'],['v','V'],['w','W'],['x','X'],
        ['y','Y'],['z','Z'],
        ['kp0','KP0'],['kp1','KP1'],['kp2','KP2'],['kp3','KP3'],['kp4','KP4'],['kp5','KP5'],['kp6','KP6'],['kp7','KP7'],['kp8','KP8'],['kp9','KP9'],  
        ['kp_divide','KP_DIVIDE'],['kp_enter','KP_ENTER'],['kp_equals','KP_EQUALS'],['kp_minus','KP_MINUS'],['kp_multiply','KP_MULTIPLY'],['kp_period','KP_PERIOD'],['kp_plus','KP_PLUS'],
        ['\\','backslash','BACKSLASH'],['^','power','caret','POWER','CARET'],['_','underscore','UNDERSCORE'],['`','backquote','BACKQUOTE'],
        ['f1','F1','help','HELP'],['f2','F2'],['f3','F3'],['f4','F4'],['f5','F5'],['f6','F6'],
        ['f7','F7'],['f8','F8'],['f9','F9'],['f10','F10'],['f11','F11'],['f12','F12'],
        ['f13','F13'],['f14','F14'],['f15','F15'],
        ['up','UP'],['down','DOWN'],['left','LEFT'],['right','RIGHT'],['menu','MENU'],
        ['lshift','left shift','LSHIFT','LEFT SHIFT'],['lctrl','left ctrl','LCTRL','LEFT CTRL'],['lalt','left alt','LALT','LEFT ALT'],
        ['rshift','right shift','RSHIFT','RIGHT SHIFT'],['rctrl','right ctrl','RCTRL','RIGHT CTRL'],['ralt','right alt','alt gr','RALT','RIGHT ALT','ALT GR'],
        ['page up','pageup','PAGE UP','PAGEUP'],['page down','pagedown','PAGE DOWN','PAGEDOWN'],['pause','PAUSE'],
        ['scroll lock','scrollock','SCROLL LOCK','SCROLLOCK'],['caps lock','capslock','CAPS LOCK','CAPSLOCK'],['nummlock','NUMMLOCK'],
        ['clear','CLEAR'],['enter','ENTER','return','RETURN'],['tab','TAB'],['backspace','BACKSPACE'],['end','END'],['home','HOME'],['insert','INSERT'],['delete','DELETE'],
        ['sysreq','sys req','SYSREQ','SYS REQ'],['break','BREAK'],['escape','ESCAPE'],['print','PRINT'],['print screen','PRINT SCREEN'],
        ['lmeta','left meta','LMETA','LEFT META',,'lsuper','LSUPER','left super','LEFT SUPER'],                  
        ['rmeta','right meta','RMETA','RIGHT META','rsuper','right super','RSUPER','RIGHT SUPER'],                  
        // key defined below are not supported yet.
        ['euro','EURO'],['first','FIRST'],['last','LAST'],['kp enter','KP ENTER'],['kp equals','KP EQUALS'],
        ['mode','MODE'],['unknown','UNKNOWN'],['unknown key','UNKNOWN KEY']];  

    // Definition of private methods.

    p._get_default_from_synoniem = function(responses) {
        var defaults = [];
        for (var i = 0;i < responses.length; i++) {
            var synoniem = this.synonyms(responses[i]);
            defaults.push(synoniem[0]);
        }
        return defaults;    
    };
    
    // Definition of public methods.

    p.default_config = function() {
        // Return the default configuration.
	return {'timeout': null, 'keylist': []};
    };
    
    p.flush = function() {
	// Clear all pending keyboard input, not limited to the keyboard.
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'keyboard.flush().');
    };
 	
    p.get_key = function(timeout, keylist) {
	// Collects a single key press.
	this.keylist = (typeof keylist === 'undefined') ? this.keylist : keylist;	
	this.timeout = (typeof timeout === 'undefined') ? this.timeout : timeout;
		
	if (this.experiment != null) {
            // Set the event processor.
            osweb.events._run(this, this.timeout, osweb.constants.RESPONSE_KEYBOARD, this.keylist);
	};
    };

    p.get_mods = function() {
    	var moderators = [];
        if (osweb.events._keyboard_event !== null) {
            if (osweb.events._keyboard_event.shiftKey === true) {
                moderators.push('shift');
            };    
            if (osweb.events._keyboard_event.ctrlKey === true) {
                moderators.push('ctrl');
            };    
            if (osweb.events._keyboard_event.altKey === true) {
                moderators.push('alt');
            };    
        } 
        return moderators;    
    };

    p.set_config = function(timeout, keylist) {
	// Set the properties.
	this.keylist = keylist;	
	this.timeout = timeout;
    };
	
    p.show_virtual_keyboard = function(visible) {
        // Shows or hides a virtual keyboard.		
    	if (visible === true) {
            // Hack to show the virutal keyboard. ## Must be tested!
            osweb.runner._canvas.setfocus();
	}
	else {
            // Hack to hide the virtual keyboard. ## Must be tested!
            var tmp = document.createElement("input");
            document.body.appendChild(tmp);
            tmp.focus();
            document.body.removeChild(tmp);
	}
    };

    p.synonyms = function(button) {
        if (typeof button !== 'undefined') {
            for (var i = 0;i < this.SYNONIEM_MAP.length;i++) {
                for (var j = 0;j < this.SYNONIEM_MAP[i].length; j++) {
                    if (this.SYNONIEM_MAP[i][j] == button) {
                        return this.SYNONIEM_MAP[i];
                        break;
                    }
                }   
            }
        }
        else {
            return null;
        }    
    };

    // Bind the keyboard class to the osweb namespace.
    osweb.keyboard = keyboard;
}());


(function() {
    // Definition of the class log.
    function log(experiment, path) {
        // Set the class private properties. 
    	this._all_vars = null;                             // If true all variables are written to the log.  
	this._header_written = false;	                   // If true the header has been written to the log.
	this._log = [];                                    // Array containing the log entries.
	this._path = '';                                   // Path to wich the log is written.

        // Set the class public properties. 
	this.experiment = experiment;                      // Anchor to the experiment object.
    	this.experiment.vars.logfile = path;               // Store the path location into the vars list.   
    }; 
	
    // Extend the class from its base class.
    var p = log.prototype;
    
    // Definition of public properties. 
    p.experiment = null;
	
    // Definition of public methods.   

    p.all_vars = function() {
	// Retrieves a list of all variables that exist in the experiment.
	if (this._all_vars === null) {
            this._all_vars = this.experiment.vars.inspect();
	}
	return this._all_vars;
    };

    p.close = function() {
	// Closes the current log.
	if (this._log.length > 0) {
            // Echo the data to the runner.
            osweb.runner.data = this._log.join('');    
        };

	// Clear the log file.
	this._log = [];
    };

    p.flush = function() {
    	// Flush the log file.
        this._log = [];
    };

    p.open = function(path) {	
	// Opens the current log. If a log was already open, it is closed.
	this._header_written = false;
	this._path = path; 
	
	// Check for old data.
	if (this._log !== null) {
            // Clear the old data.
            this.close();
	}
    };

    p.write = function(msg, new_line) {
    	// Write one message to the log.
	new_line = (typeof new_line === 'undefined') ? true : new_line;
	
	// Write a new line.
	if (new_line === true) {
            this._log.push(msg + '\n');
	}
	else {
            // Write the Message line.
            this._log.push(msg);
	}
    };

    p.write_vars = function(var_list) {
    	// Writes variables to the log.
	var_list = (typeof var_list === 'undefined') ? null : var_list;
		
	var value; 
	var l = [];
        // If no var list defines, retrieve all variable.
	if (var_list == null) {
            var_list = this.all_vars();
	}

        // Sort the var list.
        var_list.sort();
        
	// Add the header to the log file.
        if (this._header_written === false) {
            for (var i = 0; i < var_list.length; i++) {
		l.push('"' + var_list[i] + '"');
            }		
            this.write(l.join());
            this._header_written = true;
	}
		
        // Add the data entries to the log file.        
        l = [];
	for (var i = 0; i < var_list.length; i++) {
            value = this.experiment.vars.get(var_list[i], 'NA', false);
            l.push('"' + value + '"');
	}
        this.write(l.join());
    };
 	
    // Bind the log class to the osweb namespace.
    osweb.log = log;
}());


(function() {
    // Definition of the class mouse.
    function mouse(experiment, timeout, buttonlist, visible)
    {
        // Set the class public properties. 
	this.experiment = experiment;                                               // Anchor to the experiment object.
	this.timeout = (typeof timeout === 'undefined') ? null : timeout;           // Duration in millisecond for time-out. 
	this.buttonlist = (typeof buttonlist === 'undefined') ? null : buttonlist;  // List of acceptable response buttons.	
	this.visible = (typeof visible === 'undefined') ? false : visible;	    // if true the mouse cursor is visible.
    }; 
	
    // Extend the class from its base class.
    var p = mouse.prototype;
    
    // Definition of public properties. 
    p.experiment = null;
    p.buttonlist = [];
    p.timeout = -1;
    p.visible = false;
	
    // Definition of the synoniem map for all keys.                                  
    p.SYNONIEM_MAP = [['1','left_button'], ['2','middle_button'], ['3','right_button'], ['4','scroll_up'], ['5','scroll_down']];
        
    // Definition of private methods.

    p._get_default_from_synoniem = function(responses) {
        // Return the default synoniem value from a response.
        var defaults = [];
        for (var i = 0;i < responses.length;i++) {
            var synoniem = this.synonyms(responses[i]);
            defaults.push(synoniem[0]);
        }
        return defaults;    
    };

    // Definition of class public methods.
    
    p.default_config = function() {
        // Return the default configuration.
        return {'timeout': null, 'buttonlist': null, 'visible': false};
    };

    p.flush = function() {
	// Clears all pending mouse input, not limited to the mouse.
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'mouse.flush().');
    };
 	
    p.get_click = function(timeout, buttonlist, visible) {
	// Collects a single mouse click.
	this.timeout = (typeof timeout === 'undefined') ? this.timeout : timeout;
	this.buttonlist = (typeof buttonlist === 'undefined') ? this.buttonlist : buttonlist;	
	this.visible = (typeof visible === 'undefined') ? this.visible : visible;	

	if (this.experiment != null) {
            // Hide or show the mouse.
            this.show_cursor(this.visible);
	
            // Set the event processor.
            osweb.events._run(this, this.timeout, osweb.constants.RESPONSE_MOUSE, this.buttonlist);
	};
    };

    p.get_pos = function() {
    	// Returns the current mouse position. !Warning: this methods uses the state in the last known mouse respone, not the current state.
        if (osweb.events._mouse_move !== null) {
            return {'rtTime': osweb.events._mouse_move.rtTime, 'x': osweb.events._mouse_move.event.clientX, 'y': osweb.events._mouse_move.event.clientY};
        }
        else {
            return {'rtTime': -1, 'x': -1, 'y': -1};
        }    
    };

    p.get_pressed = function() {
        // Returns the current button state of the mouse buttons. !Warning: this methods uses the state in the last known mouse respone, not the current state.
        if (osweb.events._mouse_press !== null) {
            return { 'buttons': [(osweb.events._mouse_press.button === 0), (osweb.events._mouse_press.button === 1), (osweb.events._mouse_press.button === 2)]};
        }
        else {
            return { 'buttons': [null, null, null]};
        }    
    };

    p.set_config = function(timeout, buttonlist, visible) {
	// Set mouse properties.          
	this.timeout = timeout;
	this.buttonlist = buttonlist;	
	this.visible = visible;	
    };

    p.set_pos = function(pos) {
    	// Returns the current position of the cursor.	
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'mouse.set_pos().');
    };

    p.show_cursor = function(visible) {
    	// Set the property
	this.visible = visible;
		
	// Immediately changes the visibility of the mouse cursor.	
	if (visible === true) {
            // Show the mouse cursor.
            osweb.runner._stage.canvas.style.cursor = "default";
	}
	else {
            // Set the cursor visibility to none.
            osweb.runner._stage.canvas.style.cursor = "none";
        }
    };

    p.synonyms = function(button)
    {
        if (typeof button !== 'undefined') {
            for (var i = 0;i < this.SYNONIEM_MAP.length;i++) {
                for (var j = 0;j < this.SYNONIEM_MAP[i].length;j++) {
                    if (this.SYNONIEM_MAP[i][j] == button) {
                        return this.SYNONIEM_MAP[i];
                        break;
                    }
                }   
            }
        }
        else {
            return null;
        }    
    };

    // Bind the mouse class to the osweb namespace.
    osweb.mouse = mouse;
}()); 



(function() {
    // Definition of the class sampler.
    function sampler(experiment, src, volume, pitch, pan, duration, fade, block) {
      	// Set the class public properties. 
	this.experiment = experiment;
	
	// Check if optional parameters are defined.
	this.block = (typeof block === 'undefined') ? false : block;	
	this.duration = (typeof duration === 'undefined') ? 'sound' : duration;	
	this.fade = (typeof fade === 'undefined') ? 0 : fade;	
	this.pan = (typeof pan === 'undefined') ? 0 : pan;	
	this.pitch = (typeof pitch === 'undefined') ? 1 : pitch;	
	this.src = (typeof src === 'undefined') ? '' : src;	
	this.volume = (typeof volume   === 'undefined') ? 1 : volume;	

	// Create the sound instance
	if (src !== null) {
            // Set the sound object.
            this._instance = src.data;
		
            // Set the event anchor for 
            this._instance.on("ended", osweb.events._audioEnded.bind(this));
    	}
    }; 
	
    // Extend the class from its base class.
    var p = sampler.prototype;
    
    // Definition of public properties. 
    p.duration = 'sound';	
    p.block = false;
    p.fade = '0';
    p.pan = '0';
    p.pitch = '1';
    p.src = null;
    p.volume = 1;
    
    // Definition of public methods.

    p.play = function(volume, pitch, pan, duration, fade, block) {
	// Check if optional parameters are defined.
	this.block = (typeof block === 'undefined') ? this.block : block;	
	this.duration = (typeof duration === 'undefined') ? this.duration : duration;	
	this.fade = (typeof fade === 'undefined') ? this.fade : fade;	
	this.pan = (typeof pan === 'undefined') ? this.pan : pan;	
	this.pitch = (typeof pitch === 'undefined') ? this.pitch : pitch;	
	this.volume = (typeof volume === 'undefined') ? this.volume : volume;	

	// Set the sound properties.
	this._instance.volume = this.volume;
		
	// Play the actual sound.
	this._instance.play();	
    };

    p.wait = function() {
        // Set the blocking of the sound.
        osweb.events._run(this, -1, osweb.constants.RESPONSE_SOUND,[]);
    };
    
    // Bind the sampler class to the osweb namespace.
    osweb.sampler_backend = sampler;
}());



(function() {
    // Definition of the class video.
    function video(experiment, src) {
      	// Set the class public properties. 
	this.experiment = experiment;
	
        // Set the class pivate properties. 
        this._playing = false; 
        this._script = null;

	// Create the video instance
	if (src !== null) {
            // Set the video object.
            this._ctx = osweb.runner._canvas.getContext('2d');
            this._video = src.data;
            
            // Set the event anchors.
            this._video.on("ended", osweb.events._videoEnded.bind(this));
            this._video.on("play" , osweb.events._videoPlay.bind(this));
    	}
    }; 
	
    // Extend the class from its base class.
    var p = video.prototype;
    
    // Definition of public properties. 
    p.audio = true;
    p.duration = 'keypress';	
    p.full_screen = false;
    
    // Definition of private methods.
    
    p._update_video_canvas = function() {
        // Clip the content of the video to the canvas.
        if (this._playing === true) {    
            this._ctx.drawImage(this._video, 0, 0);

            // execute script.
            if ((this._script !== null) && (this._event_handler_always === true)) {
                // Start the parser
                osweb.parser._run(null, this._script);    		
            }    
        }    
    };    
    
    // Definition of public methods.
    
    p.play = function() {
	// Play the actual video.
        this._video.play();
        
        // Set the volume
        this._video.volume = (this.audio === true) ? 1 : 0;
        
        // Check if the video must be scaled.
        if (this.full_screen == true) {    
            // Draw the first image with scaling.
            var xScale = (this.experiment._canvas._width  / this._video.videoWidth);
            var yScale = (this.experiment._canvas._height / this._video.videoHeight);
            this._ctx.scale(xScale,yScale);
        }
        
        // Draw the first frame.
        this._ctx.drawImage(this._video, 0, 0);
        
        // Set the play toggle.
        this._playing = true;
    };

    p.stop = function() {
	// Pause the actual sound.
	this._video.pause();
        this._playing = false;
    };

    p.wait = function() {
        // Set the blocking of the sound.
        osweb.events._run(this, -1, osweb.constants.RESPONSE_VIDEO,[]);
    };
    
    // Bind the video class to the osweb namespace.
    osweb.video_backend = video;
}());


(function() {
    // Definition of the class debug.
    function debug() {
    	throw 'The class debug cannot be instantiated!';
    }

    // Definition of public properties.
    debug.enabled = false;                        // Enable the debugger  
    debug.error = false;                         // true if an error occured.
    debug.messageLog = new Array();              // Arraty with alle log messages.

    // Definition of class private methods.               
   
    debug._initialize = function() {
    	// Enabled/disable the debugger.
    	this.debug = osweb.runner.debug;
    	// Clear the log.
        this.messageLog = [];
    };	

    debug._finalize = function() {
	// If enabled push the messages to the javascript console.
	if (this.enabled === true) {
            console.log(this.messageLog);			
	}

	// Clear the log.
	this.messageLog = [];
    };

    // Definition of the public methods.               
   
    debug.addError = function(error_text) {
    	// Set the error flag.
    	this.error = true;

        // Show the fatal error warning.
	console.log(error_text);
	console.log(osweb.constants.ERROR_001);

	// Throw the exception.
	throw new Error(error_text);	
    };
	
    debug.addMessage = function(message_text) {
        // Push the error message to the log.
	this.messageLog.push(message_text);		
	
	if (debug.enabled === true) {
            console.log(message_text);
        }    
    };

    debug.msg = function(message_text) {
	// Push the error message to the log.
	this.addMesage(message_text);
    };

    // Bind the debug class to the osweb namespace.
    osweb.debug = debug;
}());


/*
 * Definition of the class file_pool_store.
 */

(function() 
{
    function file_pool_store()
    {
    	throw "The class file_pool_store cannot be instantiated!";
    }; 
	
    // Definition of private class properties.
    file_pool_store._data  = [];
    file_pool_store._items = [];  
	
    /*
     * Definition of private class methods.   
     */

    file_pool_store.add_from_local_source = function(pItem)
    {
        var ext = pItem.filename.substr(pItem.filename.lastIndexOf('.') + 1);
        
        if ((ext == 'jpg') || (ext == 'png'))
	{
            // Create a new file pool mage item.
            var img = new Image();
            img.src = pItem.toDataURL();
            var item = {data: img, folder: pItem.filename, name: pItem.filename.replace(/^.*[\\\/]/, ''), size: pItem.length, type: 'image'};
	}
        else if ((ext == 'wav') || (ext == 'ogg'))
	{
            var ado = new Audio();
            ado.src = pItem.toDataURL();
            var item = {data: ado, folder: pItem.filename, name: pItem.filename.replace(/^.*[\\\/]/, ''), size: pItem.length, type: 'sound'};
	}
	else if (ext == 'ogv')
        {
            var ado = document.createElement("VIDEO");
            ado.src = pItem.toDataURL();
            var item = {data: ado, folder: pItem.filename, name: pItem.filename.replace(/^.*[\\\/]/, ''), size: pItem.length, type: 'video'};
        }    
        
	// Add the item to the pool.
	this._items.push(item);

	// Link the item as property
	this[item.name] = item;
    };

    file_pool_store.add_from_server_source = function(pPath, pFiles)
    {
        console.log('--');
        console.log(pFiles);

        // Check if there are stimuli files.
        if (pFiles.length > 0)
	{
            // Set the preloader.
            this._queue = new createjs.LoadQueue(false);
            createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);  // need this so it doesn't default to Web Audio
            this._queue.installPlugin(createjs.Sound);
 		
            this._queue.on("fileload", this._file_complete, this);
            this._queue.on("complete", this._load_complete, this);

            // Add the stimuli information to the loader.
            for (var i=0;i < pFiles.length;i++)
            {
                var re = /(?:\.([^.]+))?$/;
                var extention = re.exec(pFiles[i]);
                console.log(extention);
                
                if (extention[0] == '.ogg')
                {
                    console.log('sound');
                    this._queue.loadFile({id: pFiles[i], src: pPath + pFiles[i], type: createjs.AbstractLoader.SOUND});
                }    
                else
                { 
                    this._queue.loadFile({id: pFiles[i], src: pPath + pFiles[i], type: createjs.AbstractLoader.IMAGE});
                }        
            }
	
            // Load the stimuli files.
            this._queue.load();
        }
        else
        {
            // Build the experiment objects using the given script.
            osweb.runner._buildExperiment();
        } 
    }; 
    
    file_pool_store._file_complete = function(pEvent)
    {
	// Update the loader text.
	osweb.runner._updateIntroScreen(osweb.constants.MESSAGE_007);

        // Push the stimulus item to the stimuli object.
        var item = {data: pEvent.result, folder: pEvent.item.id, name: pEvent.item.id.replace(/^.*[\\\/]/, ''), size: pEvent.item.id, type: 'image'};
        
        // Add the item to the pool.
	this._items.push(item);

	// Link the item as property
	this[item.name] = item;
    };	
	
    file_pool_store._load_complete = function()
    {
	// Update the loader text.
	osweb.runner._updateIntroScreen(osweb.constants.MESSAGE_006);

        console.log(this._items);

	// Building is done, go to next phase.
        osweb.runner._buildExperiment();
    };	

    /*
     * Definition of public class methods.   
     */

    file_pool_store.add = function(pPath, pNew_Name)
    {
    	// Copies a file to the file pool. 
    };
	
    file_pool_store.fallback_folder = function()
    {	
    	// The full path to the fallback pool folder.
    };
	
    file_pool_store.files = function()
    {
    	// Returns all files in the file pool.
    };

    file_pool_store.folder = function()
    {
    	// The full path to the (main) pool folder.
    };
	
    file_pool_store.folders = function()
    {
    	// Gives a list of all folders that are searched when retrieving the full path to a file. 
    };

    file_pool_store.in_folder = function(pPath)
    {
    	// Checks whether path is in the pool folder. 
    };

    file_pool_store.rename = function(pOld_path, pNew_path)
    {
	// Renames a file in the pool folder.
    };
	
    file_pool_store.size = function()
    {
	// The combined size in bytes of all files in the file pool.
    };

    // Bind the stack file_pole_store to the osweb namespace.
    osweb.pool = file_pool_store;
}());

/*
 * Definition of the class heartbeat.
 */

(function() 
{
    function heartbeat(pExperiment, pInterval)
    {
        // Set the class public properties. 
    	this.experiment = pExperiment;
	this.interval   = (typeof pInterval === 'undefined') ? 1 : pInterval;	
    }; 
	
    // Extend the class from its base class.
    var p = heartbeat.prototype;
    
    // Define the class public properties. 
    p.experiment = null;
    p.interval   = -1;

    /*
     * Definition of class private methods.   
     */

    p.beat = function()
    {
    };

    p.run = function()
    {
    };

    p.start = function()
    {
    };
	
    // Bind the heartbeat class to the osweb namespace.
    osweb.heartbeat = heartbeat;
}());


/*
 * Definition of the class item_stack.
 */

(function() 
{
    function item_stack()
    {
   	throw "The class item_stack cannot be instantiated!";
    }; 
	
    // Definition of private class properties.
    item_stack._items = [];  
	
    /*
     * Definition of public class methods.   
     */

    item_stack.clear = function()
    {
    	// Clears the stack.
	this._items = [];
    };

    item_stack.push = function(pItem, pPhase)
    {
    	// Create the stack item.
	var StackItem = {'item': pItem, 'phase': pPhase};

	// Push the item onto the stack.
	this._items.push(StackItem);
    };	

    item_stack.pop = function()
    {
	// Pops the last item from the stack.
	return this._items.pop();
    };

    // Bind the item_stack class to the osweb namespace.
    osweb.item_stack = item_stack;
}());


/*
 * Definition of the class item_store.
 */

(function() 
{
    function item_store()
    {
	throw "The class item_store cannot be instantiated!";
    } 
		
    // Set the class private properties. 
    item_store._experiment = null;
    item_store._items      = {};
    
    /*
     * Definition of public methods - running item.         
     */
    
    item_store.execute = function(pName, pParent)
    {
	// Executes the run and prepare phases of an item, and updates the item stack.
	this.prepare(pName);
	this.run(pName, pParent);
    };

    item_store.items = function()
    {
	// Create a list o keys.
        var items = [];
        for (var key in this._items) 
        {
            items.push([key ,this._items[key]]);
        }    
        
        // Returns a list of item names.
	return items;
    };

    item_store.keys = function()
    {
	// Create a list o keys.
        var keys = [];
        for (var key in this._items) 
        {
            keys.push(key);
        }    
        
        // Returns a list of item names.
	return keys;
    };

    item_store.new = function(pType, pName, pScript)
    {
	// Check if the element is part of the osweb name space
	if (osweb.isClass(pType) == true)
	{
            // Add the new item as property of items.
            this._items[pName] = osweb.newItemClass(pType, this._experiment, pName, pScript);
        }
	else
	{
            // Unkwone class definition, show error message.
            osweb.debug.addError(osweb.constants.ERROR_009 + pType);
	}
    };
    
    item_store.prepare = function(pName, pParent)
    {
        // Executes the prepare phase of an item, and updates the item stack.
	osweb.item_stack.push(pName, 'prepare');
        
        this._items[pName]._parent = pParent;
        this._items[pName].prepare();
    };	

    item_store.run = function(pName, pParent)
    {
	// Set the current and its parent item.
	osweb.events._current_item         = this._items[pName];
	osweb.events._current_item._parent = pParent;
		
	// Executes the run phase of an item, and updates the item stack.
	osweb.item_stack.push(pName, 'run');
	this._items[pName].run();
    };

    item_store.valid_name = function(pItem_type, pSuggestion)
    {
        // Check the optional parameters.
        pSuggestion = (typeof pSuggestion === 'undefined') ? null : pSuggestion;
        
        if (pSuggestion == null)
        {
            var name = 'new_' + pItem_type;
        }
        else
        {
            var name = this._experiment.syntax.sanitize(pSuggestion, true, false);
        }   
        
        // Create a unique name.
        var i     = 1;
        var _name = name;
        while (this._items.hasOwnProperty(_name) == true)
        {
            _name = name + '_' + String(i);
	    i++;
        } 

        // Return function result
        return _name; 
    };    
    
    item_store.values = function()
    {
  	// Create a list o keys.
        var values = [];
        for (var key in this._items) 
        {
            values.push(this._items[key]);
        }    
        
        // Returns a list of item names.
	return values;
    };

    // Bind the item_store class to the osweb namespace.
    osweb.item_store = item_store;
}());


/*
 * Definition of the class python_workspace.
 */

(function() 
{
    function python_workspace()
    {
    	throw "The class python_workspace cannot be instantiated!";
    }; 
	
    /*
     * Definition of public class methods.   
     */
    
    python_workspace._eval = function(pBytecode)
    {
        // Check wich type of expression must be evaled.
        if (typeof pBytecode === 'boolean')    
        {
            return pBytecode;
        }
        else if (typeof pBytecode === 'string')
        {
            // Open sesame script, first check for paramter values. 
            pBytecode = osweb.syntax.eval_text(pBytecode);

            // Evaluate the expression.
            return eval(osweb.syntax.remove_quotes(pBytecode));    
        }
        else
        {
            console.log('>python script - not supported yet');
            return eval(pBytecode);
        }    
    };
	
    python_workspace.init_globals = function()
    {
    };
	
    // Bind the python_workspace class to the osweb namespace.
    osweb.python_workspace = python_workspace;
}());


(function() {
    // Definition of the class python_workspace.
    function python_workspace_api() {
    	throw 'The class python_workspace_api cannot be instantiated!';
    }; 
	
    // Definition of private methods.   

    python_workspace_api._initialize = function() {
	// Create the global function calls for use in the inlide script item.
	window['canvas'] = this.canvas;
	window['copy_sketchpad'] = this.copy_sketchpad;
	window['keyboard'] = this.keyboard;
	window['mouse'] = this.mouse;
	window['pause'] = this.pause;
	window['reset_feedback'] = this.reset_feedback;	
	window['sampler'] = this.sampler;
	window['set_response'] = this.set_response;
	window['set_subject_nr'] = this.set_subject_nr;	
	window['sometimes'] = this.sometimes;
	window['synth'] = this.synth;
	window['xy_circle'] = this.xy_circle;
	window['xy_distance'] = this.xy_distance;
	window['xy_from_polar'] = this.xy_from_polar;
	window['xy_grid'] = this.xy_grid;
	window['xy_random'] = this.xy_random;
	window['xy_to_polar'] = this.xy_to_polar;
    };

    // Definition of public methods - global functions.   

    python_workspace_api.canvas = function(auto_prepare, style_args) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'canvas().');
    };

    python_workspace_api.copy_sketchpad = function(name) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'copy_sketchpad().');
    };

    python_workspace_api.keyboard = function(resp_args) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'keyboard().');
    };

    python_workspace_api.mouse = function(resp_args) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'mouse().');
    };

    python_workspace_api.pause = function() {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'pause().');
    };

    python_workspace_api.reset_feedback = function() {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'pause().');
    };

    python_workspace_api.sampler = function(src, playback_args) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'pause().');
    };

    python_workspace_api.set_response = function(response, response_time, correct) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'pause().');
    };
	
    python_workspace_api.set_subject_nr = function(nr) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'pause().');
    };

    python_workspace_api.sometimes = function(p) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'pause().');
    };

    python_workspace_api.synth = function(osc, freq, length, attack, decay) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'pause().');
    };

    python_workspace_api.xy_circle = function(n, rho, phi0, pole) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'cy_circle().');
    };

    python_workspace_api.xy_distance = function(x1, y1, x2, y2) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'xy_distance().');
    };

    python_workspace_api.xy_from_polar = function(rho, phi, pole) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'xy_from_polar().');
    };

    python_workspace_api.xy_grid = function(n, spacing, pole) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'xy_grid().');
    };

    python_workspace_api.xy_random = function(n, width, height, min_dist, pole) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'xy_random().');
    };

    python_workspace_api.xy_to_polar = function(x, y, pole) {
        osweb.debug.addMessage(osweb.constants.MESSAGE_007 + 'xy_to_polar().');
    };

    // Bind the python_workspace_api class to the osweb namespace.
    osweb.python_workspace_api = python_workspace_api;
}());


(function() {
    // Definition of the class response_info.
    function response_info(response_store, response, correct, response_time, item, feedback) {
    }; 
	
    // Extend the class from its base class.
    var p = response_info.prototype;
    
    // Definition of public methods - properties.   

    p.match = function(kwdict) {
    };    
        
    p.matchnot = function(kwdict) {
    };    
	
    // Bind the response_info class to the osweb namespace.
    osweb.response_info = response_info;
}());


(function() {
    // Definition of the class response_store.
    function response_store(experiment) {
        // Definition of private properties.
        this._experiment = experiment;
	this._feedback_from = 0;
	this._responses = [];
    }; 
	
    // Extend the class from its base class.
    var p = response_store.prototype;
    
    // Definition of public methods - properties.   

    p.acc = function() {
    };    
        
    p.avg_rt = function() {
    };    
        
    p.correct = function() {
    };    

    p.feedback = function() {
    };    

    p.item = function() {
    };    
        
    p.response = function() {
    };    
        
    p.response_time = function() {
    };    
    
    p.var = function() {
    };    
        
    // Definition of public methods - edit.   

    p.add = function(response, correct, response_time, item,feedback) {
    };    
        
    p.clear = function() {
    };    
        
    p.reset_feedback = function() {
    };    
	
    // Bind the response_store class to the osweb namespace.
    osweb.response_store = response_store;
}());

 
/*
 * Definition of the class syntax.
 */

(function() 
{
    function syntax()
    {
    	throw "The class syntax cannot be instantiated!";
    }; 

    /*
     * Definition of private class methods.   
     */

    syntax._convertPython = function(pScript)
    {
    	return pScript;
    };

    syntax.isNumber = function(n)
    {
        return Number(n) == n; // aangepast van == naar === en weer terug naar '==' anders werkt duration niet.
    };

    syntax.isFloat = function(n)
    {
        return Number(n) === n && n % 1 !== 0;
    };

    syntax.remove_quotes = function(pString)
    {
        if (pString == '""')
        {
            return '';
        }    
        else if ((pString[0] == '"') && (pString[pString.length - 1] == '"'))
	{
            return pString.slice(1, pString.length - 1);
	}
	else
	{
            return pString;
	}	
    };

    /*
     * Definition of public class methods.   
     */
    
    syntax.compile_cond = function(pCnd, pBytecode)
    {
	// Check for conditional paramters.
	pBytecode = (typeof pBytecode === 'undefined') ? true : pBytecode;	
		
	if (pCnd == 'always')
	{
            return true;
	} 
	else if (pCnd == 'never')
	{
            return false;
	} 
        else
	{
            if (pCnd.substring(0,1) == '=')
            {
                // Python script, compile it to an ast tree.
                console.log('python script is not supported yet');
            } 
            else
            {
                // opensesame script, convert it to javascript.
                pCnd = pCnd.replace(/[^(!=)][=]/g, '==');
            }
        }    

        return pCnd;
    };
	
    syntax.eval_text = function(pTxt, pVars, pRound_float, pVar)
    {
	// Evaluates variables and inline Python in a text string.
	var result     = pTxt;
	var processing = result.search(/[^[\]]+(?=])/g);
		
	while (processing != -1)
	{
            // Replace the found value with the variable.
            var variable = result.slice(processing,result.indexOf(']'));
           
            if (typeof pVars === 'undefined')
            {
                var value = osweb.runner.experiment.vars[variable];
            }
            else
            {
                var value = pVars[variable];
            } 
            
            result	 = result.replace('[' + variable + ']',value);			
            processing   = result.search(/[^[\]]+(?=])/g);
        }

        return result;
    };

    syntax.parse_cmd = function(pString)
    {
	// split the astring.
	var tokens = this.split(pString);
	tokens.shift();
	tokens.shift();
	return tokens;
    };

    syntax.sanitize = function(pString, pStrict, pAllowVars)
    {
	// Removes invalid characters (notably quotes) from the string.
	return pString;
    };

    syntax.split = function(pLine)
    {
    	// Return an array with tokens ignoring whitespaces within. 
	var result = pLine.match(/(?:[^\s"]+|"[^"]*")+/g);
        
        return (result != null) ? result : [];
    };    

    // Bind the syntax class to the osweb namespace.
    osweb.syntax = syntax;
}());


/*
 * Definition of the class var_store.
 */

(function() 
{
    function var_store(pItem, pParent)
    {
        // Set the class properties. 
        this._item   = pItem;
        this._parent = pParent;
    }; 
	
    // Extend the class from its base class.
    var p = var_store.prototype;
    
    // Set the class default properties. 
    p._item   = null;
    p._parent = null;        
	
    /*
     * Definition of public class methods.   
     */

    p.get = function(pVar, pDefault, pEval, pValid)
    {
	// Set the optional arguments
	pDefault = (typeof pDefault === 'undefined') ? null : pDefault;
	pEval    = (typeof pEval === 'undefined')    ? true : pEval;
	pValid   = (typeof pValid === 'undefined')   ? null : pValid;
		
	var value = null;

	// Gets an experimental variable.
	if (pVar in this)
	{
            if (typeof this[pVar] == 'string')
            {
	 	value = osweb.syntax.eval_text(this[pVar]);
            }
            else
            {
 		value = this[pVar];
            }
 	}

	// Return function result.
	return value;
    };

    p.inspect = function()
    {
	var keys = [];
	for(var key in this)
  	{
            keys.push(key);
   	}
   		
   	// Slide default properties. 
   	keys = keys.slice(2,keys.length - 3);
   		
	return keys;
    };

    p.set = function(pVar, pVal)
    {
	// Sets and experimental variable.
	this[pVar] = pVal;
    };
	
    // Bind the vars class to the osweb namespace.
    osweb.var_store = var_store;
}());

	
/*
 * Definition of the class item.
 */

(function() 
{
    function item(pExperiment, pName, pScript)
    {
	// Set the class private properties.
	this._get_lock = null;
	this._parent   = null;
	this._status   = osweb.constants.STATUS_NONE;

        // Set the class public properties.
	this.count      = 0;	
	this.debug	= osweb.debug.enabled;
	this.experiment = (pExperiment == null) ? this : pExperiment;
	this.name       = pName;	
	this.vars 	= (this.vars) ? this.vars : new osweb.var_store(this, null);

        // Set the object realted properties.
	this.clock            = this.experiment._clock;		
	this.log              = this.experiment._log;
	this.python_workspace = this.experiment._python_workspace;	
        this.syntax           = this.experiment._syntax; 	
	
        // Read the item definition string.	
	this.from_string(pScript);
    } 
	
    // Extend the class from its base class.
    var p = item.prototype;

    // Definition of class public properties. 
    p.clock            = null;
    p.comments         = null;
    p.count            = 0;
    p.debug            = false;
    p.experiment       = null;
    p.log              = null;
    p.name             = '';
    p.syntax           = null;
    p.python_workspace = null;
    p.vars             = null;
    p.variables        = null;

    /*
     * Definition of public methods - general function.
     */

    p.dummy = function()
    {
    	// Dummy function, continue execution of an item directly.
    };
   
    p.resolution = function()
    {
    	/* // Returns the display resolution and checks whether the resolution is valid.
        var w = this.vars.get('width');
	var h = this.vars.get('height');
	if ((typeof w !== 'number') || (typeof h !== 'number'))
	{
            osweb.debug.addError('(' + String(w) + ',' + String(h) + ') is not a valid resolution');
        }
        
        return [w, h]; */
    };
   
    p.set_response = function(pResponse, pResponse_time, pCorrect)
    {
	// Processes a response in such a way that feedback variables are updated as well.
        console.log('warning: method "item.set_response" not implemented yet.');
    };
 
    p.sleep = function(pMs)
    {
	// Pauses the object execution. !WARNING This function can not be implemented due the script blocking of javascript.
	this.clock.sleep(pMs);
    };

    p.time = function()
    {
	// Returns the current time.
    	return this.clock.time();
    };

     /*
     * Definition of public methods - build cycle.         
     */

    p.from_string = function(pString)
    {
	// Parses the item from a definition string.
	osweb.debug.addMessage('');
        this.variables = {};
	this.reset();
	this.comments = [];
	this.reset();
		
	// Split the string into an array of lines.  
	if (pString != null)
	{
            var lines = pString.split('\n');
            for (var i=0; i < lines.length; i++)
            {
                if ((lines[i] != '') && (this.parse_variable(lines[i]) == false))
		{
                   
                    this.parse_line(lines[i]);
                }
            }
	}					
    };
	
    p.parse_comment = function(pLine)
    {
	// Parses comments from a single definition line, indicated by # // or '.
	pLine = pLine.trim();
	if ((pLine.length > 0) && (pLine.charAt(0) == '#'))
	{
            // Add comments to the array removing the first character.
            this.comments.push(pLine.slice(1));

            return true;
	}	
	else if ((pLine.length > 1) && (pLine.charAt(0) == '/'))
	{
            // Add comments to the array removing the first two characters.
            this.comments.push(pLine.slice(2));
            
            return true;			
	}
	else
	{
            return false;
	}
    };	
	
    p.parse_keyword = function(pLine, pFrom_ascii, pEval)
    {
    };

    p.parse_line = function(pLine)
    {
	// Allows for arbitrary line parsing, for item-specific requirements.
    };

    p.parse_variable = function(pLine)
    {
        // Reads a single variable from a single definition line.
        if (this.parse_comment(pLine))
        {
            return true;
        }
        else
        {
            var tokens = osweb.syntax.split(pLine);
            if ((tokens != null) && (tokens.length > 0) && (tokens[0] == 'set'))
            {
		if (tokens.length != 3)
		{
                    osweb.debug.addError('Error parsing variable definition: ' + pLine);
		}	
            	else
		{
                    // Rettrieve the value of the variable, remove additional quotes.
                    var value = osweb.syntax.remove_quotes(tokens[2]);
                 
                    // Check for number types.
                    value = osweb.syntax.isNumber(value) ? Number(value) : value;
                    
                    this.vars.set(tokens[1], value);

                    return true;
		}
            }
            else
            {
		return false;
            }
        }	
    };
	
    /*
     * Definition of public methods - runn cycle. 
     */
    
    p.reset = function()
    {
	// Resets all item variables to their default value.
    };

    p.prepare = function()
    {
	// Implements the prepare phase of the item.
	this.experiment.vars.set('count_' + this.name, this.count);
	this.count++;
		
	// Set the status to initialize.
	this._status = osweb.constants.STATUS_INITIALIZE;
    	
        // For debugging.
        osweb.debug.addMessage('prepare' + this.name);
        
        // Implements the complete phase of the item (to support blocking script in the prepare phase).
	if ((this._parent !== null) && (this.type !== 'feedback'))
	{
            // Prepare cycle of parent.
            this._parent.prepare_complete();
        }
    };

    p.prepare_complete = function()
    {
        // Dummy function for completion process.
    };

    p.set_item_onset = function(pTime)
    {
 	// Set a timestamp for the item's executions
	var time = (pTime != null) ? pTime : this.clock.time();
	this.experiment.vars.set('time_' + this.name, time);
    };	

    p.run = function()
    {
    	// Implements the run phase of the item.
        osweb.debug.addMessage('run' + this.name);
    };

    p.update = function()
    {
    	// Implements the update phase of the item.
    };
    
    p.update_response = function(pResponse)
    {
	// Implements the update_response phase of an item.
    };	

    p.complete = function()
    {
    	// Implements the complete phase of the item.
	if (this._parent !== null)
	{
            // Return the process control to the parent of the element.
            osweb.events._current_item = this._parent;
            osweb.events._current_item.run();  
	}
    };
  
    // Bind the item class to the osweb namespace.
    osweb.item = item;
}());


/*
 * Definition of the class generic_response.
 */

(function() 
{
    function generic_response(pExperiment, pName, pScript)
    {
	// Inherited create.
	this.item_constructor(pExperiment, pName, pScript);
	
	// Definition of private properties.
	this._allowed_responses = null;
	this._duration          = 0;
	this._duration_func 	= null;
	this._keyboard		= null;
	this._mouse             = null;
	this._responsetype	= osweb.constants.RESPONSE_NONE;
	this._timeout           = -1;
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(generic_response, osweb.item);

    // Definition of public properties.
    p.auto_response    = "a";
    p.process_feedback = false;
    p.synonyms         = null;
  
    /*
     * Definition of public methods - build cycle. 
     */

    p.auto_responser = function()
    {
    };

    p.auto_responser_mouse = function()
    {
    };

    p.prepare_allowed_responses = function()
    {
        // Prepare the allowed responses..
        if (this.vars.get('allowed_responses') == null)
	{
            this._allowed_responses = null;
	}
	else
	{	
            // Create a list of allowed responses that are separated by semicolons. Also trim any whitespace.
            var allowed_responses = String(this.vars.allowed_responses).split(';');
            
            if (this.vars.duration == 'keypress')
            {	
		//this._allowed_responses = allowed_responses;
                this._allowed_responses = this._keyboard._get_default_from_synoniem(allowed_responses);
            }
            else if (this.vars.duration == 'mouseclick')
            {
                // For mouse responses, we don't check if the allowed responses make sense.
            	this._allowed_responses = this._mouse._get_default_from_synoniem(allowed_responses);
            }
            
            // If allowed responses are provided, the list should not be empty.
            if (this._allowed_responses.length == 0)
            {
		osweb.debug.addError(this.vars.get('allowed_responses') + ' are not valid allowed responses in keyboard_response '+ this.name);	
            } 
	}
    };
		
    p.prepare_duration = function()
    {
	// Prepare the duration.
        if (this.vars.get('duration') != null)
	{
            if (typeof this.vars.duration == 'number')
            {
        	// Prepare a duration in milliseconds
		this._duration = this.vars.duration;
		if (this._duration == 0)
		{
                    this._responsetype = osweb.constants.RESPONSE_NONE;
		}
		else
		{	
                    this._responsetype = osweb.constants.RESPONSE_DURATION;
		}
            }
            else
            {
		this._duration = -1;
		if (this.vars.duration == 'keypress')
		{
                    this.prepare_duration_keypress();
                    this._responsetype = osweb.constants.RESPONSE_KEYBOARD;
		}
		else if (this.vars.duration == 'mouseclick')
		{
                    this.prepare_duration_mouseclick();
                    this._responsetype = osweb.constants.RESPONSE_MOUSE;
		}
                else if (this.vars.duration == 'sound')
                {
                    this._responsetype = osweb.constants.RESPONSE_SOUND;
                } 
                else if (this.vars.duration == 'video')
                {
                    this._responsetype = osweb.constants.RESPONSE_VIDEO;
                } 
            }		
	}
    };
	
    p.prepare_duration_keypress = function()
    {
        // Prepare a keyboard duration.
	this._keyboard = new osweb.keyboard(this.experiment);
	if (this.experiment.auto_response == true)
	{
            this._duration_func = this.auto_responder;
	}
	else
	{
            var final_duration = (this._timeout != -1) ? this._timeout : this._duration;
            this._keyboard.set_config(final_duration, this._allowed_responses);
	}
    };
	
    p.prepare_duration_mouseclick = function(self)
    {
	// Prepare a mouseclick duration.
	this._mouse = new osweb.mouse(this.experiment);
	if (this.experiment.auto_response == true)
	{
            this._duration_func = this.auto_responder_mouse;
	}
	else
	{
            var final_duration = (this._timeout != -1) ? this._timeout : this._duration;
            this._mouse.set_config(final_duration, this._allowed_responses, false);
	}
    };	

    p.prepare_timeout = function()
    {
	// Prepare the timeout.
	if (this.vars.get('timeout') != null) 
	{
            if (typeof this.vars.timeout == 'number')
            {
		// Prepare a duration in milliseconds
            	this._timeout = this.vars.timeout;
            }
            else
            {
		this._timeout = -1;
            }		
	}
    };	
    
    /*
     * Definition of public methods - run cycle. 
     */

    p.process_response_keypress = function(pRetval)
    {
	this.experiment._start_response_interval = this.sri;
	this.experiment._end_response_interval   = pRetval.rtTime;
	this.experiment.vars.response            = this.syntax.sanitize(pRetval.resp);
	this.synonyms                            = this._keyboard.synonyms(this.experiment.vars.response); 
	this.response_bookkeeping();
    };
	
    p.process_response_mouseclick = function(pRetval)
    {
 	this.experiment._start_response_interval = this.sri;
	this.experiment._end_response_interval   = pRetval.rtTime;
	this.experiment.vars.response		 = pRetval.resp;
	this.synonyms                            = this._mouse.synonyms(this.experiment.vars.response);
	this.experiment.vars.cursor_x            = pRetval.event.clientX;
	this.experiment.vars.cursor_y            = pRetval.event.clientY;
	this.response_bookkeeping();
    };

    p.response_bookkeeping = function()
    {
	// The respone and response_time variables are always set, for every response item
	this.experiment.vars.set('response_time', this.experiment._end_response_interval - this.experiment._start_response_interval);
	this.experiment.vars.set('response_' + this.name, this.experiment.vars.get('response'));
	this.experiment.vars.set('response_time_' + this.name, this.experiment.vars.get('response_time'));
	this.experiment._start_response_interval = null;

	// But correctness information is only set for dedicated response items, such as keyboard_response items, because otherwise we might confound the feedback
	if (this.process_feedback == true)
	{
            // debug.msg(u"processing feedback for '%s'" % self.name)
            if (this.vars.correct_response != null)
            {
                // If a correct_resbponse has been defined, we use it to determine accuracy etc.
		if (this.synonyms != null)  
		{
                    if (this.synonyms.indexOf(String(this.vars.get('correct_response'))) != -1)
                    { 
                        this.experiment.vars.correct       = 1;
			this.experiment.vars.total_correct = this.experiment.vars.total_correct + 1;
                    }
                    else
                    {
                        this.experiment.vars.correct = 0;
                    }
		}	
		else
		{
                    this.experiment.vars.correct = 'undefined';
                    /* if self.experiment.response in (correct_response, safe_decode(correct_response)):
                    	self.experiment.var.correct = 1
			self.experiment.var.total_correct += 1
                    else:
                    	self.experiment.var.correct = 0 */
		}
            }
            else
            {
                // If a correct_response hasn't been defined, we simply set correct to undefined.
		this.experiment.vars.correct = 'undefined';
            }	

            // Do some response bookkeeping
            this.experiment.vars.total_response_time   = this.experiment.vars.total_response_time + this.experiment.vars.response_time;
            this.experiment.vars.total_responses       = this.experiment.vars.total_responses + 1;
            this.experiment.vars.accuracy              = Math.round(100.0 * this.experiment.vars.total_correct / this.experiment.vars.total_responses);
            this.experiment.vars.acc        	       = this.experiment.vars.accuracy;
            this.experiment.vars.average_response_time = Math.round(this.experiment.vars.total_response_time / this.experiment.vars.total_responses);
            this.experiment.vars.avg_rt                = this.experiment.vars.average_response_time;
            this.experiment.vars.set('correct_' + this.name, this.vars.correct); 
	} 
    };	
	
    p.process_response = function()
    {
        // Start stimulus response cycle.
   	switch (this._responsetype)
   	{
            case osweb.constants.RESPONSE_NONE:
 		// Duration is 0, so complete the stimulus/response cycle.
 		this._status = osweb.constants.STATUS_FINALIZE;
                this.complete();
           
            break;
            case osweb.constants.RESPONSE_DURATION:
		this.sleep_for_duration();
            
            break;
            case osweb.constants.RESPONSE_KEYBOARD:
                this._keyboard.get_key();
            
            break;
            case osweb.constants.RESPONSE_MOUSE:
                this._mouse.get_click();
            
            break;
            case osweb.constants.RESPONSE_SOUND:
               this._sampler.wait();

            break;
            case osweb.constants.RESPONSE_VIDEO:
               this._video.wait();
            
            break;
   	}		
    };

    p.set_sri = function(pReset)
    {
	// Sets the start of the response interval.
	if (pReset == true)
	{
            this.sri = self.vars.get('time_' + this.name);
            this.experiment._start_response_interval = this.vars.get('time_' + this.name);
	}
	
	if (this.experiment._start_response_interval == null)
	{
            this.sri = this.experiment.vars.get('time_' + this.name);
	}
	else
	{
            this.sri = this.experiment._start_response_interval;
	}
    };		

    p.sleep_for_duration = function()
    {
	// Sleep for a specified time.
	this.sleep(this._duration);		
    };
   
    /*
     * Definition of public methods - running item. 
     */
    
    p.prepare = function()
    {
	// Implements the prepare phase of the item.
	this.prepare_timeout();
	this.prepare_allowed_responses();
	this.prepare_duration();
    
        // Inherited.	
	this.item_prepare();
    };
    
    p.update_response = function(pResponse)
    {
        // Implements the update response phase of the item.
	if ((this._responsetype == osweb.constants.RESPONSE_KEYBOARD) && (pResponse.type == osweb.constants.RESPONSE_KEYBOARD)) 
	{
            this.process_response_keypress(pResponse);
	}
	else if ((this._responsetype == osweb.constants.RESPONSE_MOUSE) && (pResponse.type == osweb.constants.RESPONSE_MOUSE)) 
	{
            this.process_response_mouseclick(pResponse);     
	}
    }; 

    // Bind the generic_response class to the osweb namespace.
    osweb.generic_response = osweb.promoteClass(generic_response, "item");
}());


/*
 * Definition of the class experiment.
 */

(function() 
{
    function experiment(pExperiment, pName, pScript, pPool_folder, pExperiment_path, pFullscreen, pAuto_response, pLogfile, pSubject_nr, pWorkspace, pResources, pHeartbeat_interval)
    {
	// Set the items property for this experiment.
	osweb.item_store._experiment = this;

	// Set the optional arguments
	pLogfile = (typeof pLogfile === 'undefined') ? null : pLogfile;

	// Set the private properties. 
	this._end_response_interval   = null;
	this._start_response_interval = null;
	this._syntax                  = osweb.syntax;
	this._python_workspace        = (pWorkspace) ? pWorkspace : osweb.python_workspace;

	// Set the public properties. 
	this.auto_response      = (pAuto_response) ? pAuto_response : false;
	this.cleanup_functions  = [];
	this.heartbeat_interval = (pHeartbeat_interval) ? pHeartbeat_interval : 1;
	this.items              = osweb.item_store;
	this.output_channel 	= null;
	this.paused 		= false;
	this.plugin_folder 	= 'plugins';
	this.pool               = osweb.file_pool_store;
	this.resources 		= (pResources) ? pResources : {};
	this.restart 		= false;
	this.running		= false;
	this.vars               = new osweb.var_store(this, null);
		
	// Set default variables
	this.vars.start               = 'experiment';
	this.vars.title               = 'My Experiment';
	this.vars.bidi                = 'no';
	this.vars.round_decimals      = 2;
	this.vars.form_clicks         = 'no';
	this.vars.uniform_coordinates = 'no';

        // Sound parameters.
	this.vars.sound_freq          = 48000;
	this.vars.sound_sample_size   = -16; 
	this.vars.sound_channels      = 2;
	this.vars.sound_buf_size      = 1024;

	// Default backend
	this.vars.canvas_backend      = 'xpyriment';

	// Display parameters.
	this.vars.width               = 1024;
	this.vars.height              = 768;
	this.vars.background          = 'black';
	this.vars.foreground          = 'white';
	this.vars.fullscreen          = (pFullscreen) ? 'yes' : 'no';

	// Font parameters.
	this.vars.font_size           = 18;
	this.vars.font_family         = 'mono';
	this.vars.font_italic         = 'no';
	this.vars.font_bold 	      = 'no';
	this.vars.font_underline      = 'no'; 

	// Logfile parameters
	this.logfile = pLogfile;
	this.debug   = osweb.debug.enabled;

	// Create the backend objects.
	this._canvas = new osweb.canvas(this);
	this._clock  = new osweb.clock(this);
	this._log    = new osweb.log(this, this.logfile);
	
        // Set the global anchors.
        window['clock'] = this._clock;
        window['log']   = this._log;    
        
	// Inherited.
	this.item_constructor(pExperiment, pName, pScript);
    } 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(experiment, osweb.item);
  
    // Definition of public properties. 
    p.auto_response      = false;
    p.cleanup_functions  = [];
    p.heartbeat_interval = 1;
    p.items              = null;
    p.output_channel     = null;
    p.paused             = false;
    p.plugin_folder      = '';
    p.pool               = null;
    p.resources          = null;
    p.restart            = false;
    p.running            = false;
  	
    /*
     * Definition of public methods - general function.
     */

    p.item_prefix = function()
    {
	// A prefix for the plug-in classes, so that [prefix][plugin] class is used instead of the [plugin] class.
	return '';		
    };

    p.reset_feedback = function()
    {
	// Resets the feedback variables (acc, avg_rt, etc.)."""
	this.vars.total_responses       = 0;
	this.vars.total_correct         = 0;
	this.vars.total_response_time   = 0;
	this.vars.avg_rt                = 'undefined';
	this.vars.average_response_time = 'undefined';
	this.vars.accuracy              = 'undefined';
	this.vars.acc                   = 'undefined';
    };

    p.set_subject = function(pNr)
    {
	// Sets the subject number and parity (even/ odd). This function is called automatically when an experiment is started, so you do not generally need to call it yourself.
	this.vars.subject_nr = pNr;
	if ((pNr % 2) == 0)
	{
            this.vars.subject_parity = 'even';
	}
	else
	{
            this.vars.subject_parity = 'odd';
	}
    };
  
    /*
     * Definition of public methods - building item.         
     */

    p.read_definition = function(pString)
    {
    	// Extracts a the definition of a single item from the string.
	var line = pString.shift();
	var def_str = '';
    	while ((line != null) && (line.length > 0) && (line.charAt(0) == '\t'))
	{
            def_str = def_str + line + '\n';
            line = pString.shift();
	}	
	return def_str;
    };	

    p.from_string = function(pString)
    {
    	// Set debug message.
	osweb.debug.addMessage('building experiment');
		
	// Split the string into an array of lines.  
	if (pString != null)
	{
            this._source = pString.split('\n');
            var l = this._source.shift();
            while (l != null)
            {
		// Set the processing of the next line.
		var get_next = true;

                try
		{
                    // Split the single line into a set of tokens.
                    var t = osweb.syntax.split(l);					
		}
		catch(e)
		{
                    // u"Failed to parse script. Maybe it contains illegal characters or unclosed quotes?", \
		}	

		if ((t != null) && (t.length > 0))
		{
                    // Try to parse the line as variable (or comment)
                    if (this.parse_variable(l) == false)
                    {
                        if (t[0] == 'define') 
			{
                            if (t.length == 3)
                            {
				// Get the type, name and definition string of an item.
				var item_type = t[1];
                                var item_name = osweb.syntax.sanitize(t[2]);
				var def_str = this.read_definition(this._source);
					
				osweb.item_store.new(item_type, item_name, def_str); 
                            }
                            else
                            {
                                // raise osexception(u'Failed to parse definition',line=line);
                            }
			}
                    }
		}

		// Get the next line.
		if (get_next == true)
		{
                    l = this._source.shift();
		}
            }
	};
    };
    
    /*
     * Definition of public methods - backends.
     */

    p.init_clock = function()
    {
	// Initializes the clock backend.
	this._clock.initialize;
    };	

    p.init_display = function()
    {
	// Initializes the canvas backend.
	this._canvas.init_display(this);

        this._python_workspace['win'] = window;
    };

    p.init_heartbeat = function()
    {
	// Initializes heartbeat.
	if ((this.heartbeat_interval <= 0) || (this.vars.fullscreen == 'yes') || (this.output_channel == null))
	{
            this.heartbeat = null;
	}
	else
	{
            this.heartbeat = new osweb.heartbeat(this, 1); 	
            this.heartbeat.start();
	}
    };	

    p.init_log = function()
    {
    	// Open a connection to the log file.
	this._log.open(this.logfile); 	
    };

    p.init_random = function()
    {
	// Initializes the random number generators. For some reason
	/* import random
	random.seed()
	try:
            # Don't assume that numpy is available
            import numpy
            numpy.random.seed()
            except:
            pass */
    };

    p.init_sound = function()
    {
	// Intializes the sound backend.
	/* from openexp import sampler
	sampler.init_sound(self) */
    };

    /*
     * Definition of public methods - running item.         
     */

    p.run = function()
    {
	// Inherited.	
	this.item_run();
	
	// Runs the experiment.
        switch (this._status)
        {
            case osweb.constants.STATUS_INITIALIZE:

                // Set the status to finalize.
		this._status = osweb.constants.STATUS_FINALIZE;

		// Save the date and time, and the version of OpenSesame
		this.vars.datetime = new Date().toString();
		this.vars.opensesame_version  = osweb.VERSION_NUMBER; 
		this.vars.opensesame_codename = osweb.VERSION_NAME; 
		this.running = true;
		this.init_random();
		this.init_display();
		this.init_clock();
		this.init_sound();
		this.init_log();
		this.python_workspace.init_globals();
		this.reset_feedback();
		this.init_heartbeat(); 
	
		// Add closing message to debug system.
		osweb.debug.addMessage('experiment.run(): experiment started at ' + new Date().toUTCString()); 

		if (osweb.item_store._items[this.vars.start] != null)
		{
                    osweb.item_stack.clear();
                    osweb.item_store.prepare(this.vars.start, this);
                    //osweb.item_store.execute(this.vars.start, this);
		}
		else
		{
                    osweb.debug.addError('Could not find item ' + self.vars.start +  ' , which is the entry point of the experiment');
		}

            break;
            case osweb.constants.STATUS_FINALIZE:

		// Add closing message to debug system.
                osweb.debug.addMessage('experiment.run(): experiment finished at ' +  new Date().toUTCString());

		// Complete the run process.
		this.end();
	
            break;
        }; 
    };

    p.end = function()
    {
	// Disable the run toggle.
        this.running = false;
	
        // Close the log file.
        this._log.close();
		
	// Disable the processing unit.
	osweb.events._current_item = null;
	
	// Clear the exprimental stage and enabled the mouse.
	osweb.runner._canvas.style.cursor = 'default';
        osweb.runner._stage.update(); 
			
	// Finalize the parent (runner).	
    	osweb.runner._finalize();
    };

    // Bind the experiment class to the osweb namespace.
    osweb.experiment = osweb.promoteClass(experiment, "item");
}());


/*
 * Definition of the class inline_script.
 */

(function() 
{
    function inline_script(pExperiment, pName, pScript)
    {
	// Inherited.
	this.item_constructor(pExperiment, pName, pScript);
	
	// Define and set the public properties. 
	this._prepare_run  = false;   
        this._prepare_tree = null;
	this._run_tree     = null;
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(inline_script, osweb.item);

    // Define and set the public properties. 
    p.description = 'Executes Python code';

    /*
     * Definition of private methods - compiling script.
     */

    p._compile = function(pScript)
    {
        if (pScript != '')
        {
            var locations = false;
            var parseFn   = filbert_loose.parse_dammit;
            var ranges    = false;
        		
            try 
	    {
        	var code  = pScript;
         	var ast   = parseFn(code, { locations: locations, ranges: ranges });
        
	       	return ast;
    	    }
       	    catch (e) 
            {
        	console.log('error');
        	console.log(e.toString());
    	   	
                return null;
            }
	}
	else
	{
            return null;
        }	   	
    };

    /*
     * Definition of public methods - building item.         
     */
		
    p.reset = function()
    {
	// Resets all item variables to their default value.
	this._var_info     = null;
	this.vars._prepare = '';
	this.vars._run     = '';
    };

    p.from_string = function(pString)
    {
    	// Parses a definition string.
	this.reset();
		
	// Split the string into an array of lines.  
	if (pString != null)
	{
            var read_run_lines     = false;
            var read_prepare_lines = false;
            var lines = pString.split('\n');
            for (var i=0; i < lines.length; i++)
            {
		var tokens = osweb.syntax.split(lines[i]);
			
		if ((tokens != null) && (tokens.length > 0))
		{
                    switch (tokens[0])
                    {
			case 'set': 
                            this.parse_variable(lines[i]);
                            
                        break;
			case '__end__':
                            read_run_lines     = false;
                            read_prepare_lines = false;
                            
			break;	
			case '___prepare__':
                            read_prepare_lines = true;
                            
			break;
			case '___run__':
                            read_run_lines = true;
                            
			break;
			default:
                            if (read_run_lines == true)
                            {
				this.vars._run = this.vars._run + lines[i] + '\n';
                            }
                            else if (read_prepare_lines == true)
                            {
                            	this.vars._prepare = this.vars._prepare + lines[i] + '\n';
                            }
                    }
		}
		else 
		{
                    if (read_run_lines == true)
                    {
			this.vars._run = this.vars._run + lines[i] + '\n';
                    }
                    else if (read_prepare_lines == true)
                    {
			this.vars._prepare = this.vars._prepare + lines[i] + '\n';
                    }
            	} 
            }
	}
    };

    /*
     * Definition of public methods - running item.         
     */

    p.prepare = function()
    {
        // Compile the script code to ast trees.
        this._prepare_tree = osweb.parser._prepare(this.vars._prepare);
        this._run_tree     = osweb.parser._prepare(this.vars._run);
	
        // Execute the run code.
 	if (this._prepare_tree != null)
    	{
            // Set the current item.
            osweb.events._current_item = this;
            
            // Set the prepare run toggle.
            this._prepare_run = true;
            
            // Start the parser
            osweb.parser._run(this, this._prepare_tree);    		
        }
        else
        {
            // Inherited.	
            this.item_prepare();
        }    
    };

    p.run = function()
    {
    	// Inherited.	
	this.item_run();
        
        // Record the onset of the current item.
	this.set_item_onset(); 

        // Execute the run code.
 	if (this._run_tree != null)
    	{
            // Set the prepare run toggle.
            this._prepare_run = false;
            
            // Start the parser
            osweb.parser._run(this, this._run_tree);    		
    	}
    };

    p.complete = function()
    {
        // Check if the parser is ready. 
        if (osweb.parser._status == 1)
        {
            // Process the current active node.
            osweb.parser._process_node();
        }
        else
        {    
            if (this._prepare_run === true)             
            {
                // Inherited prepare.	
                this.item_prepare();
            }    
            else
            { 
                // Inherited.           
                this.item_complete();
            }
        }    
    }; 
	
    p.complete_script = function()
    {
        // Added for video script functionaliry.
        this.complete();
    };

    // Bind the Sequence class to the osweb namespace.
    osweb.inline_script = osweb.promoteClass(inline_script, "item");
}());


/*
 * Definition of the class keyboard_response.
 */

(function() 
{
    function keyboard_response(pExperiment, pName, pScript)
    {
	// Inherited create.
	this.generic_response_constructor(pExperiment, pName, pScript);

        // Definition of private properties. 
	this._flush    = 'yes';
	this._keyboard = new osweb.keyboard(this.experiment); 
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(keyboard_response, osweb.generic_response);

        // Definition of public properties. 
    p.description = 'Collects keyboard responses';
	
    /*
     * Definition of public methods - build cycle.
     */

    p.reset = function()
    {
	// Resets all item variables to their default value.
	this.auto_response          = 'space';
	this.process_feedback       = true; 
	this.vars.allowed_responses = null;
	this.vars.correct_response  = null;
	this.vars.duration          = 'keypress';
	this.vars.flush             = 'yes';
	this.vars.timeout           = 'infinite';
    };

    /*
     * Definition of public methods - run cycle.
     */

    p.prepare = function()
    {	
	// Set the internal flush property.
	this._flush = (this.vars.flush) ? this.vars.flush : 'yes';

    	// Inherited.	
	this.generic_response_prepare();
    };

    p.run = function()
    {
	// Inherited.	
	this.generic_response_run();

        // Record the onset of the current item.
	this.set_item_onset(); 
	
	// Flush responses, to make sure that earlier responses are not carried over.
        if (this._flush == 'yes')
	{	
            this._keyboard.flush();
	}		
	
        this.set_sri();
	this.process_response();
    };
	
    // Bind the keyboard_response class to the osweb namespace.
    osweb.keyboard_response = osweb.promoteClass(keyboard_response, "generic_response");
}());


/*
 * Definition of the class logger.
 */

(function() 
{
    function logger(pExperiment, pName, pScript)
    {
	// Inherited create.
	this.item_constructor(pExperiment, pName, pScript);
	
        // Definition of private properties. 
	this._logvars = null;
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(logger, osweb.item);

    // Definition of public properties. 
    p.description = 'Logs experimental data';
    p.logvars	  = [];
	
    /*
     * Definition of public class methods - build cycle.
     */

    p.reset = function()
    {
        // Resets all item variables to their default value.
	this._logvars      = null;
	this.logvars       = [];
	this.vars.auto_log = 'yes';
    };

    p.from_string = function(pString)
    {
	// Parses a definition string.
	this.variables = {};
	this.comments  = [];
	this.reset();

	// Split the string into an array of lines.  
	if (pString != null)
	{
            var lines = pString.split('\n');
            for (var i=0; i < lines.length; i++)
            {
		if ((lines[i] != '') && (this.parse_variable(lines[i]) == false))
		{
                    var tokens = osweb.syntax.split(lines[i]);
                    if ((tokens[0] == 'log') && (tokens.length > 0))
                    {
			this.logvars.push(tokens[1]);
                    }	
		}
            }
        }
    };	

    /*
     * Definition of public class methods - run cycle.
     */

    p.run = function()
    {
	// Inherited.	
	this.item_run();
		
	// Run item only one time.   
	if (this._status != osweb.constants.STATUS_FINALIZE)
	{
            // item is finalized.
            this._status = osweb.constants.STATUS_FINALIZE;

            this.set_item_onset();
            if (this._logvars == null)
            {
		if (this.vars.auto_log == 'yes')
		{
                    this._logvars = this.experiment._log.all_vars();
		}
		else
		{
                    this._logvars = [];
                    for (variable in this.logvars)
                    {
 			if ((variable in this._logvars) == false)
 			{
                            this._logvars.push(variable);
			}
                    }
                    this._logvars.sort();		
		}
            }
            this.experiment._log.write_vars(this._logvars); 

            // Complete the cycle.
            this.complete();
        };
    };

    p.complete = function()
    {
        // Inherited.	
        this.item_complete();
    };

    // Bind the logger class to the osweb namespace.
    osweb.logger = osweb.promoteClass(logger, "item");
}());


/*
 * Definition of the class loop.
 */

(function() 
{
    function loop(pExperiment, pName, pScript)
    {
	// Inherited create.
	this.item_constructor(pExperiment, pName, pScript);

        // Definition of private properties. 
        this._break_if = '';
        this._cycles   = [];
        this._index    = -1;
        this._keyboard = null;
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(loop, osweb.item);

    // Definition of public properties. 
    p.description = 'Repeatedly runs another item';
    p.matrix      = null;

    /*
     * Definition of public methods - building cycle.         
     */

    p.reset = function()
    {
	// Resets all item variables to their default value.
	this.matrix        = {};
	this.vars.cycles   = 1;
	this.vars.repeat   = 1;
	this.vars.skip     = 0;
	this.vars.offset   = 'no';
	this.vars.order    = 'random';
	this.vars.item     = '';
	this.vars.break_if = 'never';
    };

    p.from_string = function(pString)
    {
    	// Creates a loop from a definition in a string.
    	this.comments  = [];
	this.variables = {};
	this.reset();
		
	// Split the string into an array of lines.  
	if (pString != null)
	{
            var lines = pString.split('\n');
            for (var i=0; i < lines.length; i++)
            {
		if ((lines[i] != '') && (this.parse_variable(lines[i]) == false))
		{
                    var tokens = osweb.syntax.split(lines[i]);
                    if ((tokens[0] == 'run') && (tokens.length > 1))
                    {
                    	this.vars.item = tokens[1];
                    }	
                    else if ((tokens[0] == 'setcycle') && (tokens.length > 3))
                    {
			var cycle = tokens[1];
			var name  = tokens[2];
			var value = osweb.syntax.remove_quotes(tokens[3]);
					
			// Check if the value is numeric
                        value = osweb.syntax.isNumber(value) ? Number(value) : value;

                        // Convert the python expression to javascript.
			if (value[0] == '=')
			{
                            // Parse the python statement. 
                            value = osweb.parser._prepare(value.slice(1));
                            
                            if (value !== null)        
                            {
                                value = value.body[0];
                            }    
			}

                        if (this.matrix[cycle] == undefined)
			{
                            this.matrix[cycle] = {};
			}
			
                        this.matrix[cycle][name] = value;
                    }	
		}
            }	
	}
    };
  
    /*
     * Definition of public methods - runn cycle.         
     */

    p.shuffle = function(list)
    {
        var i, j, t;
	for (i = 1; i < list.length; i++) 
	{
	    j = Math.floor(Math.random() * (1 + i));  
	    if (j != i) 
	    {
	        t       = list[i];                        
                list[i] = list[j];
	        list[j] = t;
            }
	}			
    };

    p.apply_cycle = function(cycle)
    {
	// Sets all the loop variables according to the cycle.
	if (cycle in this.matrix)
	{
            for (var variable in this.matrix[cycle])
            {
		// Get the value of the variable.
		var value = this.matrix[cycle][variable];

		// Check for python expression.
		if (typeof value === 'object')
                {
                    // value contains ast tree, run the parser.
                    try
                    {	
                        // Evaluate the expression
                        value = osweb.parser._runstatement(value);
                    }
                    catch (e)
                    {
                        // Error during evaluation.
                        osweb.debug.addError('Failed to evaluate ' + value + ' in loop item ' + this.name);
                    }						
                }
				
                // Set the variable.
                this.experiment.vars.set(variable, value);
            }
	}
    };
	
    p.prepare = function()
    {
	// Prepare the break if condition.
	if ((this.vars.break_if != '') && (this.vars.break_if != 'never'))
	{
            this._break_if = this.syntax.compile_cond(this.vars.break_if);
        }
	else
	{
            this._break_if = null;
	}

	//  First generate a list of cycle numbers
	this._cycles = [];
	this._index  = 0;
		
	// Walk through all complete repeats
	var whole_repeats = Math.floor(this.vars.repeat);
	for (var j = 0; j < whole_repeats; j++)
	{
            for (var i = 0; i < this.vars.cycles; i++)
            {
		this._cycles.push(i);
            }
	}
				
	// Add the leftover repeats.
	var partial_repeats = this.vars.repeat - whole_repeats;
	if (partial_repeats > 0)
	{
            var all_cycles = Array.apply(null, {length: this.vars.cycles}).map(Number.call, Number);    
            var remainder  = Math.floor(this.vars.cycles * partial_repeats);
            for (var i = 0; i < remainder; i++)
            {
                // Calculate random position.
                var position = Math.floor(Math.random() * all_cycles.length);     
                // Add position to cycles.
                this._cycles.push(position);
                // Remove position from array.
                all_cycles.splice(position,1);
            }
	}		

	// Randomize the list if necessary.
	if (this.vars.order == 'random')
	{
            this.shuffle(this._cycles);
	}	
	else
	{
            // In sequential order, the offset and the skip are relevant.
            if (this._cycles.length < this.vars.skip)  
            {
		osweb.debug.addError('The value of skip is too high in loop item ' + this.name + '. You cannot skip more cycles than there are.');
            }
            else
            {
		if (this.vars.offset == 'yes')
		{
                    // Get the skip elements.
                    var skip = this._cycles.slice(0, this.vars.skip);
					
                    // Remove the skip elements from the original location.
                    this._cycles = this._cycles.slice(this.vars.skip);

                    // Add the skip element to the end.
                    this._cycles = this._cycles.concat(skip);										
		}
		else
		{
                    this._cycles = this._cycles.slice(this.vars.skip);
		}
            }
	}
		
	// Create a keyboard to flush responses between cycles.
	this._keyboard = new osweb.keyboard(this.experiment);
	
        // Make sure the item to run exists.
	if (this.experiment.items._items[this.vars.item] === 'undefined')
        {
            osweb.debug.addError('Could not find item ' + this.vars.item + ', which is called by loop item ' + this.name);
        }    

        // Inherited.	
	this.item_prepare();
	
	// Set the onset time.
	this.set_item_onset();
    };

    p.run = function()
    {
        // Inherited.	
        this.item_run();

        if (this._cycles.length > 0)
        {
            var exit = false;
            this._index = this._cycles.shift();
            this.apply_cycle(this._index);
		
            if (this._break_if != null)
            {
                this.python_workspace['this'] = this;
                
                var break_if = osweb.syntax.eval_text(this._break_if); 
                
                if (this.python_workspace._eval(break_if) == true)
                {
                    exit = true;
                }	
            }
			
            if (exit == false)
            {
		this.experiment.vars.repeat_cycle = 0;
		
                osweb.item_store.prepare(this.vars.item, this);
                //osweb.item_store.execute(this.vars.item, this);
            }
            else
            {
                // Break the loop.
                this.complete();
            }
        }
        else
        {
            // Break the loop.
            this.complete();
        }
    };	

    p.complete = function()
    {
        // Check if if the cycle must be repeated.
	if (this.experiment.vars.repeat_cycle == 1)
	{
            osweb.debug.msg('repeating cycle ' + this._index);
			
            this._cycles.push(this._index);
            
            if (this.vars.order == 'random')
            {
		this.shuffle(this._cycles);
            }
    	}
        else
        {
            // All items are processed, set the status to finalized.
            this._status = osweb.constants.STATUS_FINALIZE;

            // Inherited.	
            this.item_complete();
        }    
    };

    // Bind the loop class to the osweb namespace.
    osweb.loop = osweb.promoteClass(loop, "item");
}());


/*
 * Definition of the class mouse_response.
 */

(function() 
{
    function mouse_response(pExperiment, pName, pScript)
    {
	// Inherited create.
	this.generic_response_constructor(pExperiment, pName, pScript);

        // Definition of private properties. 
	this._flush = 'yes';
	this._mouse = new osweb.mouse(this.experiment);
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(mouse_response, osweb.generic_response);

    // Definition of public properties. 
    p.description = 'Collects mouse responses';
    p.resp_codes  = {};
	
    /*
     * Definition of public methods - build cycle.
     */
	
    p.reset = function()
    {
	// Resets all item variables to their default value.
	this.auto_response          = 1;
	this.process_feedback       = true;
	this.resp_codes             = {};
	this.resp_codes['0']        = 'timeout';
	this.resp_codes['1']        = 'left_button';
	this.resp_codes['2']        = 'middle_button';
	this.resp_codes['3']        = 'right_button';
	this.resp_codes['4']        = 'scroll_up';
	this.resp_codes['5']        = 'scroll_down';
	this.vars.allowed_responses = null;
	this.vars.correct_response  = null;
	this.vars.duration          = 'mouseclick';
	this.vars.flush             = 'yes';
	this.vars.show_cursor       = 'yes';
	this.vars.timeout           = 'infinite';
    };

    /*
     * Definition of public methods - run cycle.
     */

    p.prepare = function()
    {	
	// Set the internal flush property.
	this._flush = (this.vars.flush) ? this.vars.flush : 'yes';
 
        // Inherited.	
	this.generic_response_prepare();
   };

    p.run = function()
    {
	// Inherited.	
	this.generic_response_run();

        // Record the onset of the current item.
	this.set_item_onset(); 
        
	// Show the cursor if defined.
        if (this.vars.show_cursor == 'yes')
	{	
            this._mouse.show_cursor(true);
        }

	// Flush responses, to make sure that earlier responses are not carried over.
	if (this._flush == 'yes')
	{	
            this._mouse.flush();
	}		
    
        this.set_sri();
        this.process_response();
    };

    p.complete = function()
    {
        // Hide the mouse cursor.    
        this._mouse.show_cursor(false);
       
        // Inherited.	
        this.generic_response_complete();
    };

    // Bind the mouse_response class to the osweb namespace.
    osweb.mouse_response = osweb.promoteClass(mouse_response, "generic_response");
}());


/*
 * Definition of the class sampler.
 */

(function() 
{
    function sampler(pExperiment, pName, pScript)
    {
	// Inherited.
	this.generic_response_constructor(pExperiment, pName, pScript);

    	// Definition of private properties.
        this._sample  = null;
        this._sampler = null;
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(sampler, osweb.generic_response);

    // Definition of public properties.
    p.block	  = false;
    p.description = 'Plays a sound file in .wav or .ogg format';
    
    /*
     * Definition of public methods - build cycle. 
     */

    p.reset = function()
    {
	// Resets all item variables to their default value.
	this.block           = false;
	this.vars.sample     = '';
	this.vars.pan        = 0;
	this.vars.pitch      = 1;
	this.vars.fade_in    = 0;
	this.vars.stop_after = 0;
	this.vars.volume     = 1;
	this.vars.duration   = 'sound';
    };

    /*
     * Definition of public methods - run cycle. 
     */

    p.prepare = function()
    {
        // Create the sample
	if (this.vars.sample != '')
	{
            // Retrieve the content from the file pool.
            this._sample         = osweb.pool[this.syntax.eval_text(this.vars.sample)];  
            this._sampler        = new osweb.sampler_backend(this.experiment, this._sample);
            this._sampler.volume = this.vars.volume;
	}
	else
	{
            /* raise osexception(
            u'No sample has been specified in sampler "%s"' % self.name) */
	}
    
        // Inherited.	
	this.generic_response_prepare();
    };

    p.run = function()
    {
    	this.set_item_onset();
	this.set_sri();
	this._sampler.play();
	this.process_response();
    };	

    // Bind the sampler class to the osweb namespace.
    osweb.sampler = osweb.promoteClass(sampler, "generic_response");
}());


/*
 * Definition of the class sequence.
 */

(function() 
{
    function sequence(pExperiment, pName, pScript)
    {
	// Inherited create.
	this.item_constructor(pExperiment, pName, pScript);
	
        // Definition of private properties. 
	this._index         = -1;
	this._index_prepare = -1;
        this._items         = null;
        this._keyboard      = null;    
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(sequence, osweb.item);

    // Definition of public properties. 
    p.description    = 'Runs a number of items in sequence';
    p.flush_keyboard = 'yes';
    p.items          = null;
	
    /*
     * Definition of public methods - build cycle.         
     */

    p.reset = function()
    {
	// Resets all item variables to their default value..
	this.items               = [];
	this.vars.flush_keyboard = 'yes';
    };

    p.from_string = function(pString)
    {
	// Parses a definition string.
	this.variables = {};
	this.comments  = [];
	this.reset();
		
	// Split the string into an array of lines.  
	if (pString != null)
	{
            var lines = pString.split('\n');
            for (var i=0; i < lines.length; i++)
            {
		if ((lines[i] != '') && (this.parse_variable(lines[i]) == false))
		{
                    var tokens = osweb.syntax.split(lines[i]);
                    if ((tokens.length > 0) && (tokens[0] == 'run'))
                    {
                        var item = tokens[1];
			var cond = 'always';
			if (tokens.length > 2)
			{
                            cond = tokens[2];
			}	

			// Push the item and condition definition to the items list.
			this.items.push({'item': item, 'cond': cond});
                    }	
            	} 
            }
	}					
    };

    /*
     * Definition of public methods - run cycle.         
     */

    p.prepare = function()
    {
	// Inherited.	
	this.item_prepare();
	
        // Create a keyboard to flush responses at the start of the run phase
	if (this.vars.flush_keyboard == 'yes')
        {	
            this._keyboard = new osweb.keyboard(this.experiment);
        }
        else
        {    
            this._keyboard = null;
        }    
	
        // Generate the items list for the run cycle.
        this._index = 0;
	this._items = [];
        
        // Prepare the items.
        this.prepare_complete();
        
                /* this._items = [];
	for (var i=0; i < this.items.length; i++)
	{
            if ((this.items[i].item in osweb.item_store._items) === false)
            {
		osweb.debug.addError('Could not find item ' + this.items[i].item.name + ' which is called by sequence item ' + this.name);
            }
            else 
            {
                // Prepare the items.
                osweb.item_store.prepare(this.items[i].item);
		
                // Add the item to the internal list.
                this._items.push({'item': this.items[i].item, 'cond': osweb.syntax.compile_cond(this.items[i].cond)});
            }
	} */	
    };
    
    p.prepare_complete = function()
    {
        // Generate the items list for the run cycle.
        if (this._index < this.items.length)
        {
            if ((this.items[this._index].item in osweb.item_store._items) === false)
            {
		osweb.debug.addError('Could not find item ' + this.items[this._index].item.name + ' which is called by sequence item ' + this.name);
            }
            else 
            {
                // Increase the current index.
                this._index++;
                
                // Add the item to the internal list.
                this._items.push({'item': this.items[this._index - 1].item, 'cond': osweb.syntax.compile_cond(this.items[this._index - 1].cond)});
                
                // Prepare the item.
                osweb.item_store.prepare(this.items[this._index - 1].item, this);
	    }
        }
        else
        {
            // Prepare process is done, start execution.
            this._index = 0;
            
            // Remove the prepare phase form the stack.    
            osweb.item_stack.pop();
    
  	    // Execute the next cycle of the sequnce itself.
            osweb.item_store.run(this.name, this._parent);
        }    
    };
    
    p.run = function()
    {
        // Inherited.	
        this.item_run();

        // Check if all items have been processed.
        if (this._index < this._items.length)
        {
            // Flush the keyboard at the beginning of the sequence.
            if ((this._index == 0) && (this.vars.flush_keyboard == 'yes'))
            {
                this._keyboard.flush();
            }

            // Increase the current index.
            this._index++;

            // Set the workspace.
            osweb.python_workspace['self'] = this;

            // Check if the item may run.                            
            if (osweb.python_workspace._eval(this._items[this._index - 1].cond) == true) 
            {   
                // run the current item of the sequence object.
		osweb.item_store.run(this._items[this._index - 1].item, this);
            }
  	    else
  	    {
  	    	// Execute the next cycle of the sequnce itself.
  	    	this.run();	
  	    }
	}
	else
	{
            // sequence is finalized.
            this.complete();
        }
    };
	
    p.complete = function()
    {
        // sequence is finalized.
        this._status = osweb.constants.STATUS_FINALIZE;
 
        // Inherited.	
        this.item_complete();
    };

    // Bind the sequence class to the osweb namespace.
    osweb.sequence = osweb.promoteClass(sequence, "item");
}());

/*
 * Definition of the class sketchpad.
 */

(function() 
{
    function sketchpad(pExperiment, pName, pScript)
    {
	// Set publice properties.
    	this.canvas   = new osweb.canvas(pExperiment, false);
	this.elements = [];

	// Inherited create.
	this.generic_response_constructor(pExperiment, pName, pScript);
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(sketchpad, osweb.generic_response);

    // Definition of public properties. 
    p.canvas   = null;
    p.elements = [];

    /*
     * Definition of private methods - build cycle.         
     */
    
    p._compare = function(a,b) 
    {
        // Sort function used for determining the draw index (z-index) of alle elemente.
        if (a.z_index() < b.z_index())
            return 1;
        else if (a.z_index() > b.z_index())
            return -1;
        else 
            return 0;
    };
    
    /*
     * Definition of public methods - build cycle..         
     */

    p.reset = function()
    {
    	// Resets all item variables to their default value.
    	this.elements      = [];
	this.vars.duration = 'keypress';
    };

    p.from_string = function(pString)
    {
        // Define and reset variables to their defaults.
        this.variables = {};
        this.comments  = [];
 	this.reset();
		
	// Split the string into an array of lines.  
	if (pString != null)
	{
            var lines = pString.split('\n');
            for (var i=0; i < lines.length; i++)
            {
		if ((lines[i] != '') && (this.parse_variable(lines[i]) == false))
		{
                    var tokens = osweb.syntax.split(lines[i]);
                    if ((tokens.length > 0) && (tokens[0] == 'draw'))
                    {
			if (osweb.isClass(tokens[1]) == true)
			{
                            var element = osweb.newElementClass(tokens[1], this, lines[i]);
                            this.elements.push(element);	
			}	
                        else
			{
                            // error.
			}
                    }
		}
            }

            // Sort the elements usin the z-index.
            this.elements.sort(this._compare);
        }					
    };
	
    /*
     * Definition of public methods - runn cycle.         
     */

    p.prepare = function()
    {
        // Draw the elements. 
	for (var i=0; i < this.elements.length; i++)
	{
            if (this.elements[i].is_shown() == true)
            {
		this.elements[i].draw();
            }			
	}				
    
        // Inherited.	
	this.generic_response_prepare();
    };

    p.run = function()
    {
	// Inherited.	
	this.generic_response_run();
		
        // Set the onset and start the stimulus response process.        
	this.set_item_onset(this.canvas.show()); 
	this.set_sri(false);
	this.process_response();
    };
	
    p.complete = function()
    {
	// Clear the canvas.
	this.canvas.clear();
		
	// Inherited.	
	this.generic_response_complete();
    };

    // Bind the sketchpad class to the osweb namespace.
    osweb.sketchpad = osweb.promoteClass(sketchpad, "generic_response");
}());


/*
 * Definition of the class feedback.
 */

(function() 
{
    function feedback(pExperiment, pName, pScript)
    {
	// Inherited create.
	this.sketchpad_constructor(pExperiment, pName, pScript);
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(feedback, osweb.sketchpad);

    // Definition of public properties. 
    p.description = 'Provides feedback to the participant';

    /*
     * Definition of public methods - build cycle.
     */

    p.reset = function()
    {
    	// Resets all item variables to their default value.
	this.sketchpad_reset();
	this.vars.reset_variables = 'yes';
    };	
    
    /*
     * Definition of public methods - run cycle.
     */

    p.prepare = function()
    {
        // Prepares the item.
        this._parent.prepare_complete();
    };

    p.run = function()
    {
    	// Inherited.	
	this.sketchpad_prepare();
	this.sketchpad_run();
    };

    p.complete = function()
    {
    	// Inherited.	
	this.sketchpad_complete();

	// Reset feedback variables.
	if (this.vars.reset_variables == 'yes')
	{
            this.experiment.reset_feedback();
	}
    };

    // Bind the feedback class to the osweb namespace.
    osweb.feedback = osweb.promoteClass(feedback, "sketchpad");
}());


/*
 * Definition of the class synth.
 */

(function() 
{
    function synth(pExperiment, pName, pScript)
    {
	// Inherited.
	this.sampler_constructor(pExperiment, pName, pScript);
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(synth, osweb.sampler);

    // Define and set the public properties. 
    p.description = 'A basic sound synthesizer';

    /*
     * Definition of public class methods.
     */

    // Bind the synth class to the osweb namespace.
    osweb.synth = osweb.promoteClass(synth, "sampler");
}());


/*
 * Definition of the class advanced_delay.
 */

(function() 
{
    function advanced_delay(pExperiment, pName, pScript)
    {
	// Inherited.
	this.item_constructor(pExperiment, pName, pScript);
    
        // Set private properties.
        this._duration = -1;
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(advanced_delay, osweb.item);

    // Define and set the public properties. 
    p.description = 'Waits for a specified duration';

    /*
     * Definition of public class methods - build cycle.
     */

    p.reset = function()
    {
    	// Resets all item variables to their default value.
	this.vars.duration    = 1000;
	this.vars.jitter      = 0;
	this.vars.jitter_mode = 'Uniform';
    }; 
    
    /*
     * Definition of public class methods - run cycle.
     */

    p.prepare = function()
    {
	this._duration = this.vars.duration;
        /* # Sanity check on the duration value, which should be a positive numeric
	# value.
	if type(self.var.duration) not in (int, float) or self.var.duration < 0:
		raise osexception(
			u'Duration should be a positive numeric value in advanced_delay %s' \
			% self.name)
	if self.var.jitter_mode == u'Uniform':
		self._duration = random.uniform(self.var.duration-self.var.jitter/2,
			self.var.duration+self.var.jitter/2)
	elif self.var.jitter_mode == u'Std. Dev.':
		self._duration = random.gauss(self.var.duration, self.var.jitter)
	else:
		raise osexception(
			u'Unknown jitter mode in advanced_delay %s' % self.name)
	# Don't allow negative durations.
	if self._duration < 0:
		self._duration = 0
	self._duration = int(self._duration)
	self.experiment.var.set(u'delay_%s' % self.name, self._duration)
	debug.msg(u"delay for %s ms" % self._duration) */

        // Inherited.	
	this.item_prepare();
    };
    
    p.run = function() 
    {
        // Inherited.	
    	this.item_run();

        // Set the onset time.
        this.set_item_onset(this.time());
        this.sleep(this._duration);		
    };

    // Bind the advanced_delay class to the osweb namespace.
    osweb.advanced_delay = osweb.promoteClass(advanced_delay, "item");
}());


/*
 * Definition of the class form_base.
 */

(function() 
{
    function form_base(pName, pExperiment, pScript, pItem_type, pDescription)
    {
	// Inherited.
	this.item_constructor(pExperiment, pName, pScript);

        // Set the class private properties.
        this._form_text = false;
    
        // Set the class public properties.
        this.description = pDescription;
        this.item_type   = pItem_type;
    }   
	
    // Extend the class from its base class.
    var p = osweb.extendClass(form_base, osweb.item);

    // Define and set the public properties. 
    p.cols        = [];
    p.description = 'A generic form plug-in';
    p.form        = null;
    p.rows        = [];
    
    /*
     * Definition of public class methods - build cycle.
     */

    p.reset = function() 
    {
  	// Resets all item variables to their default value.
  	this.vars.cols        = '2;2';
	this.vars.rows        = '2;2';
	this.vars.spacing     = 10;
	this.vars._theme      = 'gray';
	this.vars.only_render = 'no';
	this.vars.timeout     = 'infinite';
	this.vars.margins     = '50;50;50;50';
	this._variables       = [];   
	this._widgets         = [];
    };    

    p.parse_line = function(pString)
    {
        // Split the line in tokens.
        var list = this.syntax.split(pString);

        if ((this._form_text == true) && (list[0] != '__end__'))
        {
            this.vars['form_text'] = this.vars['form_text'] + pString.replace('\t','');
        };

        // Check for widget definition.
        if (list[0] == 'widget')
        {
            // Remove widget command.
            list.shift();

            // Add widget to the list.
            this._widgets.push(list);
        }
        else if (list[0] == '__form_text__')
        {
            this.vars['form_text'] = '';
            this._form_text        = true;
        }
        else if (list[0] == '__end__')
        {
            this._form_text = false;
        }
        
        /* if u'var' in kwdict:
	 self._variables.append(kwdict[u'var'])   */  
    };

    /*
     * Definition of public class methods - run cycle.
     */

    p.prepare = function()
    {
        // Inherited.	
    	this.item_prepare();

        // Retrieve the column, rows and margins.
        var cols    = this.vars.cols.split(';');
        var rows    = this.vars.rows.split(';');
        var margins = this.vars.margins.split(';'); 
        
        // Get the time out paramter.
        if (this.vars.timeout == 'infinite')
        {                
            var timeout = null;
        }    
        else
        {    
            var timeout = this.vars.timeout;
        }    
        
        // Create the basic form.    
        this.form = new osweb.form(this.experiment, cols, rows, this.vars.spacing, margins, this.vars._theme, this, timeout, this.vars.form_clicks == 'yes');

        for (var i=0;i < this._widgets.length; i++)
        {
            this.focus_widget = null;
            var kwdict = {};
            var parameters = [];
            parameters.push(this.form);
            if (this._widgets[i].length > 5) 
            {
                for (var j=5;j < this._widgets[i].length;j++)
                {
                    var varName  = String(this._widgets[i][j]).substr(0,String(this._widgets[i][j]).indexOf('='));
                    var varValue = String(this._widgets[i][j]).substring(String(this._widgets[i][j]).indexOf('=') + 1,String(this._widgets[i][j]).length);
                    kwdict[varName] = osweb.syntax.remove_quotes(varValue);
                    kwdict[varName] = osweb.syntax.eval_text(kwdict[varName], this.vars);
                
                    parameters.push(osweb.syntax.remove_quotes(varValue));
                } 
            }

            /* # Process focus keyword
            focus = False
            if u'focus' in kwdict:
                if kwdict[u'focus'] == u'yes':
                    focus = True
                del kwdict[u'focus'] */
            
            // Parse arguments
            var _type   = this._widgets[i][4];
            var col     = this._widgets[i][0];
            var row     = this._widgets[i][1];
            var colspan = this._widgets[i][2];
            var rowspan = this._widgets[i][3];
	
            // Create the widget.
            try 
            {
                var _w = osweb.newWidgetClass(_type, this.form, kwdict);
                //console.log(parameters);
                //var _w = osweb.newWidgetClass(_type, parameters);
            }
            catch(e)
            {
                osweb.debug.addError('Failed to create widget ' + _type + ', error:' + e);
            }    
                
            // Set the width position and form.                    
            this.form.set_widget(_w, [col, row], colspan, rowspan);
            
            // Add as focus widget
            if (focus == true) 
            {
            	if (this.focus_widget != null)
                {
                    osweb.debug.addError('Osweb error: You can only specify one focus widget');
                } 
                else
                {
                    this.focus_widget = _w;
                }
            }    
        }
    };

    p.run = function() 
    {
        // Inherited.	
    	this.item_run();

        // Set dimensions.
        this.form._parentform.style.width      = osweb.runner._canvas.width;
        this.form._parentform.style.height     = osweb.runner._canvas.height;
        this.form._parentform.style.background = this.experiment.vars.background;
                
        // Hide the canvas, show the form.
        osweb.runner._canvas.style.display  = 'none';
        this.form._parentform.style.display = 'block';
        this.form._form.style.display       = 'block';
    };

    p.complete = function()
    {
        // Hide the form
        this.form._parentform.style.display = 'none';
        this.form._form.style.display       = 'none';
        osweb.runner._canvas.style.display  = 'inline';

        // form is finalized.
        this._status = osweb.constants.STATUS_FINALIZE;

        // Inherited.	
        this.item_complete();
    };

    // Bind the form_base class to the osweb namespace.
    osweb.form_base = osweb.promoteClass(form_base, "item");
}());


/*
 * Definition of the class form_consent.
 */

(function() 
{
    function form_consent(pExperiment, pName, pScript)
    {
        // Inherited.
	this.form_base_constructor(pName, pExperiment, pScript, 'form_consent', 'A simple consent form');
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(form_consent, osweb.form_base);

    // Define and set the public properties. 
    p.description = 'A simple consent form';

    /*
     * Definition of public class methods - run cycle.
     */

    p.run = function() 
    {
        // Inherited.	
    	this.form_base_run();
    };

    p.complete = function()
    {
        // Inherited.	
    	this.form_base_complete();
    };

    // Bind the form_consent class to the osweb namespace.
    osweb.form_consent = osweb.promoteClass(form_consent, "form_base");
}());


/*
 * Definition of the class form_multiple_choice.
 */

(function() 
{
    function form_multiple_choice(pExperiment, pName, pScript)
    {
	// Inherited.
	this.item_constructor(pExperiment, pName, pScript);
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(form_multiple_choice, osweb.item);
    
    // Define and set the public properties. 
    p.description = 'A simple multiple choice item';

    // Bind the form_base class to the osweb namespace.
    osweb.form_multiple_choice = osweb.promoteClass(form_multiple_choice, "item");
}());


/*
 * Definition of the class form_text_display.
 */

(function() 
{
    function form_text_display(pExperiment, pName, pScript)
    {
        // Inherited.
	this.form_base_constructor(pName, pExperiment, pScript, 'form_text_display', 'A simple text display form');
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(form_text_display, osweb.form_base);

    // Define and set the public properties. 
    p.description = 'A simple text display form';

    /*
     * Definition of public class methods - run cycle.
     */

    p.run = function() 
    {
        // Inherited.	
    	this.form_base_run();
     };

    p.complete = function()
    {
        // Inherited.	
    	this.form_base_complete();
    };

    // Bind the form_text_display class to the osweb namespace.
    osweb.form_text_display = osweb.promoteClass(form_text_display, "form_base");
}());


/*
 * Definition of the class form_text_input.
 */

(function() 
{
    function form_text_input(pExperiment, pName, pScript)
    {
	// Inherited.
	this.form_base_constructor(pExperiment, pName, pScript);
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(form_text_input, osweb.form_base);

    // Define and set the public properties. 
    p.description = 'A simple text input form';

    // Bind the form_base class to the osweb namespace.
    osweb.form_text_input = osweb.promoteClass(form_text_input, "form_base");
}());


/*
 * Definition of the class form_text_render.
 */

(function() 
{
    function form_text_render(pExperiment, pName, pScript)
    {
	// Inherited.
	this.form_base_constructor(pExperiment, pName, pScript);
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(form_text_render, osweb.form_base);

    // Define and set the public properties. 
    p.description = 'A simple text display form';

    // Bind the form_base class to the osweb namespace.
    osweb.form_text_render = osweb.promoteClass(form_text_render, "form_base");
}());


/*
 * Definition of the class media_player_vlc.
 */

(function() 
{
    function media_player_vlc(pExperiment, pName, pScript)
    {
	// Inherited.
	this.generic_response_constructor(pExperiment, pName, pScript);
    
        // Define and set the private properties. 
        this._script_executed = false;
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(media_player_vlc, osweb.generic_response);

    // Define and set the public properties. 
    p.description = 'A video player';

    /*
     * Definition of public class methods - run cycle.
     */

    p.prepare = function()
    {
        // Opens the video file for playback.
        this._video        = osweb.pool[this.vars.get('video_src')];  
        this._video_player = new osweb.video_backend(this.experiment, this._video);
        
        // Set the inline code options.
        if (this.vars.event_handler !== '')
        {
            this._video_player._script = osweb.parser._prepare(this.vars.event_handler);
        }
        this._video_player._event_handler_always = (this.vars.event_handler_trigger == 'after every frame');
		
        // Set the audio option.
        this._video_player.audio = (this.vars.get('playaudio') == 'yes');
        
        // Set the full screen option (if enabled).
        this._video_player.full_screen = (this.vars.get('resizeVideo') == 'yes');
	
      	// Inherited.	
	this.generic_response_prepare();
    };    
    
    p.run = function() 
    {
        // Set the onset time.
        this.set_item_onset();
	this.set_sri();

        // Start the video player.
        this._video_player.play();    

        // Start response processing.
        this.process_response();
    };

    p.complete = function() 
    {
        if (this._script_executed == false)
        {
            // Stop the video playing.  
            this._video_player.stop();
	
            // execute script.
            if ((this._video_player._script !== null) && (this.vars.get('event_handler_trigger') == 'on keypress'))
            {
                // Set the execute toggle.
                this._script_executed = true;
            
                // Execute the script code.
                osweb.parser._run(this, this._video_player._script);
            }   
            else
            {    
                // Inherited.	
                this.generic_response_complete();
            }
        }
        else
        {
            // Inherited.	
            this.generic_response_complete();
        };    
    };    

    p.update = function()
    {
        // Update the video canvas.
        this._video_player._update_video_canvas();
    };
    
    // Bind the media_player_vlc class to the osweb namespace.
    osweb.media_player_vlc = osweb.promoteClass(media_player_vlc, "generic_response");
}());


/*
 * Definition of the class notepad.
 */

(function() 
{
    function notepad(pExperiment, pName, pScript)
    {
	// Inherited.
	this.item_constructor(pExperiment, pName, pScript);
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(notepad, osweb.item);

    // Define and set the public properties. 
    p.description = 'A simple notepad to document your experiment. This plug-in does nothing.';
    p.note        = '';

    /*
     * Definition of public class methods - run cycle.
     */

    p.run = function() 
    {
        // Inherited.	
    	this.item_run();

	// Show the information of the notepad on the console.
	//osweb.debug.addMessage(this.note);

        // Complete the current cycle.
        this.complete();
    };

    p.complete = function()
    {
        // sequence is finalized.
        this._status = osweb.constants.STATUS_FINALIZE;
 
        // Inherited.	
        this.item_complete();
    };

    // Bind the notepad class to the osweb namespace.
    osweb.notepad = osweb.promoteClass(notepad, "item");
}());


/*
 * Definition of the class repeat_cycle.
 */

(function() 
{
    function repeat_cycle(pExperiment, pName, pScript)
    {
    	// Inherited.
	this.item_constructor(pExperiment, pName, pScript);
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(repeat_cycle, osweb.item);

   // Define and set the public properties. 
    p.description = 'Optionally repeat a cycle from a loop';
    
    /*
     * Definition of public class methods - run cycle.
     */

    p.prepare = function()
    {
        // Prepare the condtion for which the repeat_cycle must fire.
        this._condition = osweb.syntax.compile_cond(this.vars.get('condition'));

        // Inherited.	
	this.item_prepare();
    }; 

    p.run = function()
    {
    	// Inherited.	
	this.item_run();
		
	// Run item only one time.   
	if (this._status != osweb.constants.STATUS_FINALIZE)
        {
            if (osweb.python_workspace._eval(this._condition) == true) 
            {            
                this.experiment.vars.repeat_cycle = 1;
            }
            
            // Complete the current cycle.
            this.complete();
        }
    };

    p.complete = function()
    {
        // sequence is finalized.
        this._status = osweb.constants.STATUS_FINALIZE;
 
        // Inherited.	
        this.item_complete();
    };
    
    // Bind the repeat_cycle class to the osweb namespace.
    osweb.repeat_cycle = osweb.promoteClass(repeat_cycle, "item");
}());


/*
 * Definition of the class reset_feedback.
 */

(function() 
{
    function reset_feedback(pExperiment, pName, pScript)
    {
    	// Inherited.
	this.item_constructor(pExperiment, pName, pScript);
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(reset_feedback, osweb.item);

    // Define and set the public properties. 
    p.description = 'Resets the feedback variables, such as "avg_rt" and "acc"';

    /*
     * Definition of public class methods - run cycle.
     */

    p.run = function()
    {
    	// Inherited.	
	this.item_run();
		
	// Run item only one time.   
	if (this._status != osweb.constants.STATUS_FINALIZE)
	{
            // Run the item.
            this.experiment.reset_feedback();

            // Complete the current cycle.
            this.complete();
        }
    };

    p.complete = function()
    {
        // sequence is finalized.
        this._status = osweb.constants.STATUS_FINALIZE;
 
        // Inherited.	
        this.item_complete();
    };
    
    // Bind the reset_feedback class to the osweb namespace.
    osweb.reset_feedback = osweb.promoteClass(reset_feedback, "item");
}());


/*
 * Definition of the class touch_response.
 */

(function() 
{
    function touch_response(pExperiment, pName, pScript)
    {
	// Inherited.
	this.mouse_response_constructor(pExperiment, pName, pScript);
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(touch_response, osweb.mouse_response);

    // Define and set the public properties. 
    p.description = 'A grid-based response item, convenient for touch screens';

    /*
     * Definition of public methods - build cycle.
     */
	
    p.reset = function()
    {
        // Inherited.
        this.mouse_response_reset();
        this.vars.set('allowed_responses',null);
	
        // Resets all item variables to their default value.
        this.vars._ncol = 2;
	this.vars._nrow = 1;
    };

    /*
     * Definition of public methods - run cycle.
     */
    
    p.prepare = function()
    {
        // Temp hack
        this.experiment.vars.correct = -1;
   
        // Inherited.
        this.mouse_response_prepare();
    };
        
    p.process_response_mouseclick = function(pRetval)
    {
        // Processes a mouseclick response.
	this.experiment._start_response_interval = this.sri;
	this.experiment._end_response_interval   = pRetval.rtTime;
	this.experiment.vars.response		 = pRetval.resp;
	this.synonyms                            = this._mouse.synonyms(this.experiment.vars.response);
	this.experiment.vars.cursor_x            = pRetval.event.clientX;
	this.experiment.vars.cursor_y            = pRetval.event.clientY;
	
        var rect = osweb.runner._canvas.getBoundingClientRect();
        if (this.experiment.vars.uniform_coordinates == 'yes')
        {
            this._x = pRetval.event.clientX + (this.experiment.vars.width / 2);
	    this._y = pRetval.event.clientY + (this.experiment.vars.height / 2);
        }
        else
        {
            this._x = pRetval.event.clientX - rect.left;
	    this._y = pRetval.event.clientY - rect.top;
        }    
        
        // Calulate the row, column and cell. 
        this.col  = Math.floor(this._x / (this.experiment.vars.width  / this.vars._ncol));
	this.row  = Math.floor(this._y / (this.experiment.vars.height / this.vars._nrow));
	this.cell = this.row * this.vars._ncol + this.col + 1;
        this.experiment.vars.response = this.cell;
        this.synonyms                 = [String(this.experiment.vars.response)];
                
        // Do the bookkeeping 
        this.response_bookkeeping();
    };            

    // Bind the touch_response class to the osweb namespace.
    osweb.touch_response = osweb.promoteClass(touch_response, "mouse_response");
}());


/*
 * Definition of the class base_element.
 */

(function() 
{
    function base_element(pSketchpad, pScript, pDefaults)
    {
	// Set the public properties.		
	this.canvas           = pSketchpad.canvas;
	this.defaults         = pDefaults;
	this.defaults.show_if = 'always';
	this.defaults.z_index = 0;
        this.experiment       = pSketchpad.experiment;
	this.fix_coordinates  = (pSketchpad.vars.uniform_coordinates == 'yes');
	this.name             = pSketchpad.name;
	this.only_keywords    = false;
	this.pool             = pSketchpad.experiment.pool;
	this.sketchpad        = pSketchpad;
	this.syntax           = pSketchpad.syntax;
	this.vars             = pSketchpad.vars;

        // Set the private properties.		
        this._properties      = null;   

        // Read the definition string.
	this.from_string(pScript);
    }; 
	
    // Extend the class from its base class.
    var p = base_element.prototype;

    // Set the class public properties. 
    p.defaults        = {};
    p.fix_coordinates = true;
    p.only_keywords   = false;
    p.properties      = {};
    p.sketchpad       = null;	
    p.vars            = null;
	        	
    /*
     * Definition of public methods - building cycle.         
     */

    p.from_string = function(pString)
    {
	var tokens = osweb.syntax.parse_cmd(pString);
	
	// Set the default properties.
	this.properties = {};
			
	// Set the define properties.
	for (var i=0; i < tokens.length; i++)
	{
            var name  = tokens[i].slice(0,tokens[i].indexOf('='));
            var value = tokens[i].slice(tokens[i].indexOf('=') + 1,tokens[i].length);
            var value = osweb.syntax.remove_quotes(value);
			
            // Set (and overwrite) the properties.
            this.properties[name] = value;
	}
    };

    /*
     * Definition of public methods - running cycle.         
     */

    p.z_index = function()
    {
    	//  Determines the drawing order of the elements. 
    	return this.properties.z_index;
    };

    p.eval_properties = function()
    {
	// Evaluates all properties and return them.
	this._properties = {};
		
	var xc = this.experiment.vars.width / 2;
	var yc = this.experiment.vars.height / 2;

    	for (var property in this.properties) 
	{
            var value = this.sketchpad.syntax.eval_text(this.properties[property]);
            /* if var == u'text':
			round_float = True
                else:
			round_float = False
		val = self.sketchpad.syntax.auto_type(
			self.sketchpad.syntax.eval_text(val, round_float=round_float))
		if self.fix_coordinates and type(val) in (int, float): */
            if ((property  == 'x') || (property  == 'x1') || (property  == 'x2'))
            {
            	value = Number(value) + xc;
            };
            if ((property  == 'y') || (property  == 'y1') || (property  == 'y2'))
            {
		value = Number(value) + yc;
            };

            this._properties[property] = value; 
	}
    };		
		
    p.is_shown = function()
    {
        // Set the self of the current workspace.
        this.experiment.python_workspace['self'] = this.sketchpad;
        
        // Determines whether the element should be shown, based on the show-if statement.
	return this.experiment.python_workspace._eval(this.experiment.syntax.compile_cond(this.properties['show_if']));
    };
	
    p.draw = function()
    {
        // Calculate the dynamic properties.
        this.eval_properties();
    };

    // Bind the base_element class to the osweb namespace.
    osweb.base_element = base_element;
}());


/*
 * Definition of the class arrow.
 */

(function() 
{
    function arrow(pSketchpad, pScript)
    {
	// Set the default properties.
	this.defaults		        = {};
	this.defaults.arrow_body_length = 0.8;
	this.defaults.arrow_body_width  = 0.5;
	this.defaults.arrow_head_width  = 30;
	this.defaults.fill     		= 1;
	this.defaults.color    		= pSketchpad.vars.get('foreground');
	this.defaults.penwidth 		= 1;
	this.defaults.x1       		= null;
	this.defaults.y1       		= null;
	this.defaults.x2                = null;
	this.defaults.y2       		= null;

	// Inherited.
	this.base_element_constructor(pSketchpad, pScript, this.defaults);
    } 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(arrow, osweb.base_element);

    /*
     * Definition of public methods - run cycle.   
     */

    p.draw = function()
    {
        // Inherited.	
	this.base_element_draw();
		
	// Draw the arrow element to the canvas of the sketchpad.
	this.sketchpad.canvas.arrow(this._properties.x1, this._properties.y1, this._properties.x2, this._properties.y2, this._properties.color, this._properties.penwidth, 
                                    this._properties.arrow_head_width, this._properties.arrow_body_width, this._properties.arrow_body_length, this._properties.fill);
    };
    
    // Bind the Arrow class to the osweb namespace.
    osweb.arrow = osweb.promoteClass(arrow, "base_element");
}());


/*
 * Definition of the class circle.
 */

(function() 
{
    function circle(pSketchpad, pScript)
    {
	// Set the default properties.
	this.defaults          = {};
	this.defaults.color    = pSketchpad.vars.get('foreground');
	this.defaults.fill     = 0;
	this.defaults.penwidth = 1;
	this.defaults.x        = null;
	this.defaults.y        = null;
	this.defaults.r        = null;
		
	// Inherited.
	this.base_element_constructor(pSketchpad, pScript, this.defaults);
    } 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(circle, osweb.base_element);

    /*
     * Definition of public methods - run cycle.   
     */
	
    p.draw = function()
    {
        // Inherited.	
	this.base_element_draw();
		
	// Draw the circle element to the canvas of the sketchpad.
	this.sketchpad.canvas.circle(this._properties.x, this._properties.y, this._properties.r, this._properties.fill, this._properties.color, this._properties.penwidth);
    };
    
    // Bind the Circle class to the osweb namespace.
    osweb.circle = osweb.promoteClass(circle,"base_element");
}());


/*
 * Definition of the class ellipse.
 */

(function() 
{
    function ellipse(pSketchpad, pScript)
    {
	// Set the default properties.
	this.defaults          = {};
	this.defaults.fill     = 1;
	this.defaults.color    = pSketchpad.vars.get('foreground');
	this.defaults.penwidth = 1;
	this.defaults.x        = null;
	this.defaults.y        = null;
	this.defaults.w        = null;
	this.defaults.h        = null;

	// Inherited.
	this.base_element_constructor(pSketchpad, pScript, this.defaults);
    } 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(ellipse, osweb.base_element);

    /*
     * Definition of public methods - run cycle.   
     */
	
    p.draw = function()
    {
        // Inherited.	
	this.base_element_draw();
		
	// Draw the ellipse element to the canvas of the sketchpad.
        this.sketchpad.canvas.ellipse(Number(this._properties.x), Number(this._properties.y), Number(this._properties.w), Number(this._properties.h), 
                                      this._properties.fill, this._properties.color, this._properties.penwidth);
    };
    
    // Bind the ellipse class to the osweb namespace.
    osweb.ellipse = osweb.promoteClass(ellipse,"base_element");
}());


/*
 * Definition of the class fixdot.
 */

(function() 
{
    function fixdot(pSketchpad, pScript)
    {
	// Set the default properties.
	this.defaults          = {};
	this.defaults.color    = pSketchpad.vars.get('foreground');
	this.defaults.style    = 'default';
	this.defaults.x        = null;
	this.defaults.y        = null;

	// Inherited.
	this.base_element_constructor(pSketchpad, pScript, this.defaults);
    } 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(fixdot, osweb.base_element);

    /*
     * Definition of public methods - running cycle.         
     */
	
    p.draw = function()
    {
        // Inherited.	
	this.base_element_draw();
		
	// Draw the fixdot element to the canvas of the sketchpad.
	this.sketchpad.canvas.fixdot(this._properties.x, this._properties.y, this._properties.color, this._properties.style);
    };
    
    // Bind the fixdot class to the osweb namespace.
    osweb.fixdot = osweb.promoteClass(fixdot,"base_element");
}());


/*
 * Definition of the class gabor.
 */

(function() 
{
    function gabor(pSketchpad, pScript)
    {
	// Set the default properties.
	this.defaults        = {};
	this.defaults.bgmode = 'avg';
	this.defaults.color1 = 'white';
	this.defaults.color2 = 'black';
	this.defaults.env    = 'gaussian';
	this.defaults.freq   = 1;
	this.defaults.orient = 0;
	this.defaults.phase  = 0;
	this.defaults.size   = 96;
	this.defaults.stdev  = 12;
	this.defaults.x      = null;
	this.defaults.y      = null;

	// Inherited.
	this.base_element_constructor(pSketchpad, pScript, this.defaults);
    } 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(gabor, osweb.base_element);

    /*
     * Definition of public methods (run cycle).   
     */

    p.draw = function()
    {
        // Inherited.	
    	this.base_element_draw();
		
	// Draw the gabor element to the canvas of the sketchpad.
	this.sketchpad.canvas.gabor(this._properties.x, this._properties.y, this._properties.orient, this._properties.freq, this._properties.env, 
                                    this._properties.size, this._properties.stdev, this._properties.phase, this._properties.color1, this._properties.color2, this._properties.bgmode);
    };
    
    // Bind the gabor class to the osweb namespace.
    osweb.gabor = osweb.promoteClass(gabor,"base_element");
}());


/*
 * Definition of the class image.
 */

(function() 
{
    function image(pSketchpad, pScript)
    {
	// Set the class public properties.
	this.defaults	     = {};
	this.defaults.center = 1;
	this.defaults.file   = null;
	this.defaults.scale  = 1;
	this.defaults.x      = null;
	this.defaults.y      = null;

	// Set the class private properties. 
	this._file           = null;
		
	// Inherited.
	this.base_element_constructor(pSketchpad, pScript, this.defaults);
    } 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(image, osweb.base_element);

    /*
     * Definition of public methods - run cycle.   
     */

    p.draw = function()
    {
        // Inherited.	
	this.base_element_draw();

    	// Retrieve the content from the file pool.
	this._file = osweb.pool[this._properties['file']];  

	// Draw the image element to the canvas of the sketchpad.
	this.sketchpad.canvas.image(this._file, this._properties.center, this._properties.x, this._properties.y, this._properties.scale);
    };
    
    // Bind the image class to the osweb namespace.
    osweb.image = osweb.promoteClass(image, "base_element");
}());


/*
 * Definition of the class line.
 */

(function() 
{
    function line(pSketchpad, pScript)
    {
	// Set the default properties.
	this.defaults          = {};
	this.defaults.color    = pSketchpad.vars.get('foreground');
	this.defaults.penwidth = 1;
	this.defaults.x1       = null;
	this.defaults.y1       = null;
	this.defaults.x2       = null;
	this.defaults.y2       = null;

	// Inherited.
	this.base_element_constructor(pSketchpad, pScript, this.defaults);
    } 

    // Extend the class from its base class.
    var p = osweb.extendClass(line, osweb.base_element);

    /*
     * Definition of public methods - run cycle.   
     */
	
    p.draw = function()
    {
        // Inherited.	
	this.base_element_draw();
		
	// Draw the line element to the canvas of the sketchpad.
	this.sketchpad.canvas.line(this._properties.x1, this._properties.y1, this._properties.x2, this._properties.y2, 
                                   this._properties.color, this._properties.penwidth);
    };
        
    // Bind the line class to the osweb namespace.
    osweb.line = osweb.promoteClass(line,"base_element");
}());


/*
 * Definition of the class noise.
 */

(function() 
{
    function noise(pSketchpad, pScript)
    {
	// Set the default properties.
	this.defaults	     = {};
	this.defaults.color1 = 'white';
	this.defaults.color2 = 'black';
	this.defaults.env    = 'gaussian';
	this.defaults.size   = 96;
	this.defaults.stdev  = 12;
	this.defaults.x      = null;
	this.defaults.y      = null;
	this.defaults.bgmode = 'avg';

        // Inherited.
	this.base_element_constructor(pSketchpad, pScript, this.defaults);
    } 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(noise, osweb.base_element);

    /*
     * Definition of public methods (run cycle).   
     */

    p.draw = function()
    {
        // Inherited.	
    	this.base_element_draw();
		
	// Draw the noise element to the canvas of the sketchpad.
	this.sketchpad.canvas.noise(this._properties.x, this._properties.y, this._properties.env, this._properties.size, 
                                    this._properties.stdev, this._properties.color1, this._properties.color2, this._properties.bgmode);
    };
    
    // Bind the noise class to the osweb namespace.
    osweb.noise = osweb.promoteClass(noise,"base_element");
}());


/*
 * Definition of the class rect.
 */

(function() 
{
    function rect(pSketchpad, pScript)
    {
	// Set the default properties.
	this.defaults          = {};
	this.defaults.fill     = 1;
	this.defaults.color    = pSketchpad.vars.get('foreground');
	this.defaults.penwidth = 1;
	this.defaults.x        = null;
	this.defaults.y        = null;
	this.defaults.w        = null;
	this.defaults.h        = null;

	// Inherited.
	this.base_element_constructor(pSketchpad, pScript, this.defaults);
    } 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(rect, osweb.base_element);
	
    /*
     * Definition of public methods - run cycle.   
     */

    p.draw = function()
    {
        // Inherited.	
    	this.base_element_draw();
		
	// Draw the rectangle element to the canvas of the sketchpad.
	this.sketchpad.canvas.rect(this._properties.x, this._properties.y, this._properties.w, this._properties.h, 
                                   this._properties.fill, this._properties.color, this._properties.penwidth);
    };
    
    // Bind the Rect class to the osweb namespace.
    osweb.rect = osweb.promoteClass(rect,"base_element");
}());


/*
 * Definition of the class textline.
 */

(function() 
{
    function textline(pSketchpad, pScript)
    {
        // Set the default properties.
	this.defaults             = {};
	this.defaults.center      = 1;
	this.defaults.color       = pSketchpad.vars.get('foreground');
	this.defaults.font_family = pSketchpad.vars.get('font_family');
	this.defaults.font_size   = pSketchpad.vars.get('font_size');
	this.defaults.font_bold   = pSketchpad.vars.get('font_bold');
	this.defaults.font_italic = pSketchpad.vars.get('font_italic');
	this.defaults.html        = 'yes';
	this.defaults.text        = null;
	this.defaults.x           = null;
	this.defaults.y           = null;

	// Inherited.
	this.base_element_constructor(pSketchpad, pScript, this.defaults);
    } 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(textline, osweb.base_element);
	
    /*
     * Definition of public methods - running cycle.         
     */

    p.draw = function()
    {
        // Inherited.	
    	this.base_element_draw();
		
    	// Set the font style and draw the text element to the canvas of the sketchpad.
	this.sketchpad.canvas.set_font(this._properties.font_family, this._properties.font_size, this._properties.font_italic == 'yes', this._properties.font_bold == 'yes', this._properties.font_underline == 'yes');		
        this.sketchpad.canvas.text(this._properties.text, this._properties.center, this._properties.x, this._properties.y, this._properties.color, this._properties.html);
    };
    
    // Bind the Text class to the osweb namespace.
    osweb.textline = osweb.promoteClass(textline, "base_element");
}());

	
/*
 * Definition of the class form.
 */

(function() 
{
    function form(pExperiment, pCols, pRows, pSpacing, pMargins, pTheme, pItem, pTimeout, pClicks)
    {
        // Set the class public properties.
        this.clicks     = pClicks;
	this.experiment = pExperiment;
	this.height     = this.experiment.vars.height;
	this.item       = (pItem != null) ? pItem : pExperiment;
	this.margins    = pMargins;
        this.spacing    = pSpacing;
	this.span       = [];
        this.timeout    = pTimeout;
	this.widgets    = []; 
        this.width      = this.experiment.vars.width;
        
        // Set the class public properties - columns and rows.
        var colSize = 0;
        for (var i=0;i < pCols.length;i++)
        {
            colSize = colSize + Number(pCols[i]);
        }
        this.cols = [];
        for (var i=0;i < pCols.length;i++)
        {
            this.cols.push(Math.round((pCols[i] / colSize) * 100));
        }    
        var rowSize = 0;
        for (var i=0;i < pRows.length;i++)
        {
            rowSize = rowSize + Number(pRows[i]);
        }
        this.rows = [];
        for (var i=0;i < pRows.length;i++)
        {
            this.rows.push(Math.round((pRows[i] / rowSize) * 100));
        }

        // Set the class private properties.
        this._parentform         = document.getElementById('osweb_form');
        this._form               = document.createElement("DIV");
        this._form.style.height  = '100%';
        this._form.style.width   = '100%';
        this._form.style.display = 'none';
        
        // Set the table properties and content.
        this._table                  = document.createElement("TABLE");
        this._table.style.padding    = this.margins[0] + 'px ' + this.margins[1] + 'px ' + this.margins[2] + 'px ' + this.margins[3] + 'px';
        this._table.style.height     = '100%';
        this._table.style.width      = '100%';
        this._table.style.fontStyle  = this.experiment.vars.font_italic == 'yes' ? 'italic' : 'normal'; 
        this._table.style.fontWeight = this.experiment.vars.font_bold   == 'yes' ? 'bold'   : 'normal'; 
        this._table.style.fontFamily = this.experiment.vars.font_family;
        this._table.style.color      = this.experiment.vars.foreground;
        this._table.style.fontSize   = this.experiment.vars.font_size + 'px';
        
        for (var i=0;i < this.rows.length;i++)
        {
            // Insert the row into the table.
            var row          = this._table.insertRow();
            row.style.height = this.rows[i] + '%';
            
            // Inser the cells.
            for (var j=0;j < this.cols.length;j++)
            {
                var cell = row.insertCell(j);
                cell.style.width   = this.cols[j] + '%';
                cell.style.padding = '5px';
            }    
        }        

        // Append the table to the form.
        this._parentform.appendChild(this._form);
        this._form.appendChild(this._table);
        
        // Dynamically load the theme object
	/* theme_mod = __import__(u'libopensesame.widgets.themes.%s' % theme, fromlist=[u'dummy'])
	theme_cls = getattr(theme_mod, theme)
	self.theme_engine = theme_cls(self) */
    } 
	
    // Extend the class from its base class.
    var p = form.prototype;

    // Definition of class public properties. 
    p.clicks     = null;
    p.experiment = null;
    p.height     = -1;
    p.item       = null;
    p.spacing    = null;
    p.timeout    = -1;
    p.width      = -1;
    
    /*
     * Definition of public methods - general function.
     */

    p._exec = function(pFocus_widget)
    {
    };   

    p.timed_out = function()
    {
    };

    p.cell_index = function(pPos)
    {
    };

    p.validate_geometry = function()
    {
    };

    p.get_cell = function(pIndex)
    {
    };
    
    p.get_rect = function(pIndex)
    {
    };

    p.render = function()
    {
	this.validate_geometry();
	this.canvas.clear();
	for (var widget in this.widgets)
	{
            if (widget !== null)
            {
                widget.render();
            }    
        }		
        
        this.canvas.show();
    };    

    p.set_widget = function(pWidget, pPos, pColspan, pRowspan)
    {
        // Get the row postition of the widget.
        var row  = this._table.rows[Number(pPos[1])];
        var cell = row.cells[Number(pPos[0])]; 
        if (Number(pColspan) > 1)
        {
            cell.colSpan = Number(pColspan);
        }
        if (Number(pRowspan) > 1)
        {
            cell.rowSpan = Number(pRowspan);
        }
        
        // Append widget to the cell.
        cell.appendChild(pWidget._element);
        
        /* var index = this.cell_index(nPos;)
	if (index >= len(this.widgets)
        {
            // raise osexception(u'Widget position (%s, %s) is outside of the form' % pos)
        }
        if type(colspan) != int or colspan < 1 or colspan > len(self.cols):
			raise osexception( \
				u'Column span %s is invalid (i.e. too large, too small, or not a number)' \
				% colspan)
		if type(rowspan) != int or rowspan < 1 or rowspan > len(self.rows):
			raise osexception( \
				u'Row span %s is invalid (i.e. too large, too small, or not a number)' \
				% rowspan) 
	this.widgets[index] = widget;
	this.span[index]    = colspan, rowspan
        this.widget.set_rect(this.get_rect(index)) */
    };

    p.xy_to_index = function(pXy)
    {
    };
  
    // Bind the form class to the osweb namespace.
    osweb.form = form;
}());

	
/*
 * Definition of the class widget.
 */

(function() 
{
    function widget(pForm)
    {
        // Set the class public properties.
	this.focus = false;
	this.form  = pForm;
	this.rect  = null;
	this.type  = 'widget';
	this.vars  = null;
    } 
	
    // Extend the class from its base class.
    var p = widget.prototype;

    // Definition of class public properties. 
    p.form  = null;
    p.focus = false;
    p.rect  = null;
    p.type  = '';	
    p.vars  = null;

    /*
     * Definition of public methods - general function.
     */

    p.box_size = function()
    {
        return null;
    };            

    p.theme_engine = function()
    {
        return null;
    };
    
    p.draw_frame = function(pRect, pStyle)
    {
    };    

    p.on_mouse_click = function(pevent)
    {
    };        

    p.render = function()
    {
    };

    p.set_rect = function(pRect)
    {
    };
    
    p.set_var = function(pVal, pVar)
    {
        // Sets an experimental variable.
        if (pVar == null)
        {
            pVar = this.vars;
        }    
	
        if (pVar != null)
        {
            this.form.experiment.vars.set(pVar, pVal);  
        }  
    };    
    
    // Bind the widget class to the osweb namespace.
    osweb.widget = widget;
}());


/*
 * Definition of the class button.
 */

(function() 
{
    function button(pForm, pProperties)
    {
	// Inherited create.
	this.widget_constructor(pForm);
	
        // Set the class private properties.
        this._element = document.createElement("BUTTON");
        this._element.style.width  = '100%';
        this._element.style.height = '100%';
        this._element.textContent = pProperties['text'];
        this._element.style.fontStyle  = this.form.experiment.vars.font_italic == 'yes' ? 'italic' : 'normal'; 
        this._element.style.fontWeight = this.form.experiment.vars.font_bold   == 'yes' ? 'bold'   : 'normal'; 
        this._element.style.fontFamily = this.form.experiment.vars.font_family;
        this._element.style.color      = this.form.experiment.vars.foreground;
        this._element.style.fontSize   = this.form.experiment.vars.font_size + 'px';

        // Add event listener to the element.
        this._element.addEventListener("click", this.response.bind(this));

        // Set the class public properties.
	this.center  = (typeof pProperties['center'] == 'boolean') ? pProperties['center'] : false; 
        this.frame   = (typeof pProperties['frame']  == 'boolean') ? pProperties['frame']  : false; 
        this.tab_str = '    ';
	this.type    = 'button';
	this.x_pad   = 8;
	this.y_pad   = 8;
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(button, osweb.widget);

    // Definition of public properties. 
    p.center  = false;
    p.frame   = null;
    p.tab_str = '';
    p.text    = '';
    p.x_pad   = 0;
    p.y_pad   = 0;

    /*
     * Definition of public class methods - build cycle.
     */

    p.response = function(event)
    {
        console.log(this);
        // Complete the parent form.
        this.form.item.complete();
    };

    p.draw_text = function(pText, pHtml)
    {
        // Draws text inside the widget.
	pText = this.form.experiment.syntax.eval_text(pText);
	pText = safe_decode(pText).replace('\t', this.tab_str);

        if (this.center == true)
        {
            var x = this.rect.x + this.rect.w / 2;
            var y = this.rect.y + this.rect.h / 2;
        }  
        else
        {        
            var x = this.rect.x + this.x_pad;
            var y = this.rect.y + this.y_pad;
        }
        
        var w = this.rect.w - 2 * this.x_pad;
        
	this.form.canvas.text(pText, this.center, x, y, w, pHtml);
    };    

    p.render = function()
    {
	// Draws the widget.
        if (this.frame == true)
        {    
            this.draw_frame(this.rect);
        }
        
        this.draw_text(this.text); 
    };            
                
    // Bind the button class to the osweb namespace.
    osweb.button = osweb.promoteClass(button, "widget");
}());


/*
 * Definition of the class checkbox.
 */

(function() 
{
    function checkbox(pForm, pProperties)
    {
	// Inherited create.
	this.widget_constructor(pForm);
	
        // Set the class private properties.
        this._element       = document.createElement("LABEL"); 
        this._element_check = document.createElement("INPUT");
        this._element_check.setAttribute("type", "checkbox");
        this._element.style.width      = '100%';
        this._element.style.height     = '100%';
        this._element.textContent        = pProperties['text'];
        
        //this._element.innerHTML        = pProperties['text'];
        this._element.style.fontStyle  = this.form.experiment.vars.font_italic == 'yes' ? 'italic' : 'normal'; 
        this._element.style.fontWeight = this.form.experiment.vars.font_bold   == 'yes' ? 'bold'   : 'normal'; 
        this._element.style.fontFamily = this.form.experiment.vars.font_family;
        this._element.style.color      = this.form.experiment.vars.foreground;
        this._element.style.fontSize   = this.form.experiment.vars.font_size + 'px';
        this._element.appendChild(this._element_check);

        // Add event listener to the element.
        this._element.addEventListener("click", this.on_mouse_click.bind(this));

        console.log('---');
        console.log(pProperties);

        // Set the class public properties.
	this.click_accepts = (typeof pProperties.click_accepts === 'undefined') ? false : pProperties.click_accepts;
	this.group         = (typeof pProperties.group === 'undefined') ? null : pProperties.group;
	this.type          = 'checkbox';
        this.var           = (typeof pProperties.var === 'undefined') ? null : pProperties.var;
        this.checked       = (typeof pProperties.checked === 'checked') ? false  : pProperties.checked;
        
        // Set the current status of the checkbox.
        this.set_var(this.checked);
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(checkbox, osweb.widget);

    // Definition of public properties. 
    p.center  = false;
    p.frame   = null;
    p.tab_str = '';
    p.text    = '';
    p.x_pad   = 0;
    p.y_pad   = 0;

    /*
     * Definition of public class methods.
     */

    p.on_mouse_click = function(event)
    {
       console.log('checkbox clicked'); 
    
    };
                
    // Bind the checkbox class to the osweb namespace.
    osweb.checkbox = osweb.promoteClass(checkbox, "widget");
}());


/*
 * Definition of the class label.
 */

(function() 
{
    function label(pForm, pProperties)
    {
	// Inherited create.
	this.widget_constructor(pForm);
	
        // Set the class private properties.
        this._element = document.createElement("SPAN");
        this._element.innerHTML = pProperties['text'];
        
        // Set the class public properties.
	this.center  = (typeof pProperties['center'] == 'boolean') ? pProperties['center'] : false; 
        this.frame   = (typeof pProperties['frame']  == 'boolean') ? pProperties['frame']  : false; 
        this.tab_str = '    ';
	this.type    = 'label';
	this.x_pad   = 8;
	this.y_pad   = 8;
    }; 
	
    // Extend the class from its base class.
    var p = osweb.extendClass(label, osweb.widget);

    // Definition of public properties. 
    p.center  = false;
    p.frame   = false;
    p.tab_str = '';
    p.text    = '';
    p.x_pad   = 0;
    p.y_pad   = 0;

    /*
     * Definition of public class methods - build cycle.
     */

    p.draw_text = function(pText, pHtml)
    {
        // Draws text inside the widget.
	pText = this.form.experiment.syntax.eval_text(pText);
	pText = safe_decode(pText).replace('\t', this.tab_str);

        if (this.center == true)
        {
            var x = this.rect.x + this.rect.w / 2;
            var y = this.rect.y + this.rect.h / 2;
        }  
        else
        {        
            var x = this.rect.x + this.x_pad;
            var y = this.rect.y + this.y_pad;
        }
        
        var w = this.rect.w - 2 * this.x_pad;
        
	this.form.canvas.text(pText, this.center, x, y, w, pHtml);
    };    

    p.render = function()
    {
	// Draws the widget.
        if (this.frame == true)
        {    
            this.draw_frame(this.rect);
        }
        
        this.draw_text(this.text); 
    };            
                
    // Bind the label class to the osweb namespace.
    osweb.label = osweb.promoteClass(label, "widget");
}());


(function() {
    // Class events - processing all user and system evens within osweb.
    function events() {
    	throw 'The class events cannot be instantiated!';
    }; 
	
    // Definition of private properties.
    events._active = false;                                // If true event processing is active.
    events._caller = null;                                 // The caller object (clock, keyboard, mouse).
    events._current_item = null;			   // Contain the current active item. 			
    events._keyboard_mode = osweb.constants.PRESSES_ONLY;  // Keyboard collecting mode (down/up/both).
    events._keyboard_event = null;                         // Contains the last known keyboard event.
    events._mouse_mode = osweb.constants.PRESSES_ONLY;     // Mouse collecting mode (down/up/both).
    events._mouse_move = null;                             // Contains the last known mouse move event (used within the mouse class).
    events._mouse_press = null;				   // Contains the last known mouse press event (used within the mouse class).	
    events._response_given = false;			   // Valid response toggle
    events._response_type = -1;				   // Set type of response (0 = none, 1 = keyboard, 2 = mouse, 3 = sound). 
    events._response_list = null;	                   // Items to respond on.
    events._sound_ended = false;			   // Sound play is finished.
    events._timeout = -1;                                  // Duration for timeout.
    events._video_ended = false;			   // Video play is finished.
    
    // Definition of the conversion table to convert keycodes to OpenSesame codes.
    events.KEY_CODES = ['','','','','','','help','','backspace','tab','','','clear','enter','enter_special','','shift','ctrl','alt','pause',         // 00  .. 19
        'caps','','','','','','','escape','','','','','space','page up','page down','end','home','left','up','right',                                // 20  .. 39
        'down','select','print','execute','print screen','insert','delete','','0','1','2','3','4','5','6','7','8','9',':',';',                       // 40  .. 59
        '<','=','>','?','@','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o',                                                             // 60  .. 79
        'p','q','r','s','t','u','v','w','x','y','z','left meta','right meta','menu','','','kp0','kp1','kp2','kp3',                                   // 80  .. 99
        'kp4','kp5','kp6','kp7','kp8','kp9','kp_multiply','kp_plus','','kp_minus','kp_period','kp_divide','f1','f2','f3','f4','f5','f6','f7','f8',   // 100 .. 119
        'f9','f10','f11','f12','','','','','','','','','','','','','','','','',                                                                      // 120 .. 139
        '','','','','numlock','scrollock','','','','','','','','','','','','','','',                                                                 // 140 .. 159
        '^','!','"','#','$','%','&','_','(',')','*','+','|','_','{','}','~','','','',                                                                // 160 .. 179
        '','','','','','',';','=',',','-','.','/','`','','','','','','','',                                                                          // 180 .. 199
        '','','','','','','','','','','','','','','','','','','','[',                                                                                // 200 .. 219
        '\\',']','\'','','','','','','','','','','','','','','','','','',                                                                            // 220 .. 239
        '','','','','','','','','','','','','','','',''];                                                                                            // 240 .. 255
    // Definition of the conversion table to convert shift keycodes to OpenSesame codes.
    events.KEY_SCODES = ['','','','','','','','','','','','','','','','','','','','pause',                                                           // 00  .. 19
        '','','','','','','','','','','','','','','','','','','','',                                                                                 // 20  .. 39
        '','','','','','','','',')','!','@','#','$','%','^','&','*','(','',':',                                                                      // 40  .. 59
        '','+','','','','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o',                                                                 // 60  .. 79
        'p','q','r','s','t','u','v','w','y','z','','','','','','','','','','',                                                                       // 80  .. 99
        '','','','','','','','','','','','','','','','','','','','',                                                                                 // 100 .. 119
        '','','','','','','','','','','','','','','','','','','','',                                                                                 // 120 .. 139
        '','','','','','','','','','','','','','','','','','','','',                                                                                 // 140 .. 159
        '','','','','','','','','','','','','','_','','','','','','',                                                                                // 160 .. 179
        '','','','','','','','','<','','>','?','~','','','','','','','',                                                                             // 180 .. 199
        '','','','','','','','','','','','','','','','','','','','{',                                                                                // 200 .. 219
        '|','}','"','','','','','','','','','','','','','','','','','',                                                                              // 220 .. 239
        '','','','','','','','','','','','','','','',''];                                                                                            // 240 .. 255
   
    // Definition of methods for general event processing.    

    events._initialize = function() {
	// Initialize the keyboard event listeners.
        window.addEventListener("keydown", this._keyDown.bind(this), false); 
        window.addEventListener("keyup", this._keyUp.bind(this), false);

	// Initialize the mouse event listeners.
    	osweb.runner._canvas.addEventListener("mousedown", this._mouseDown.bind(this), false);
	osweb.runner._canvas.addEventListener("mousemove", this._mouseMove.bind(this), false);
	osweb.runner._canvas.addEventListener("mouseup", this._mouseUp.bind(this), false);
        
    	// Initialize the mouse context event listeners.
        osweb.runner._canvas.addEventListener("contextmenu", this._mouseContext.bind(this), false);

	// Initialize the tick event listener.
	createjs.Ticker.setInterval(15);
	createjs.Ticker.addEventListener("tick", this._tick.bind(this));	
    };
 
    events._finalize = function() {
    	// Finalize the tick event listener.             
	createjs.Ticker.removeEventListener("tick");

	// Finalize the mouse context event listeners.
	osweb.runner._canvas.removeEventListener("contextmenu", this._mouseContext, false);

	// Finalize the mouse event listeners.
	osweb.runner._canvas.removeEventListener("mousedown", this._mouseDown, false);
	osweb.runner._canvas.removeEventListener("mousemove", this._mouseMove, false); 
	osweb.runner._canvas.removeEventListener("mouseup", this._mouseUp, false); 

	// Finalize the keyboard event listeners.
        window.removeEventListener("keydown", this._keyDown, false);
	window.removeEventListener("keyup", this._keyUp, false);
    };
	
    events._run = function(caller, timeout, response_type, response_list) {
	// Set the event running properties.     
	this._caller = caller;
	this._response_list = response_list;
	this._response_type = response_type;
	this._timeout = timeout;

	// Activate the event running.  
	this._response_given = false;
	this._sound_ended = false;							    
	this._video_ended = false;
        this._active = true;	
    };

    events._update = function() {
    	// Check if the duration is finisdhed.
   	if (((this._timeout === -1) && ((this._response_given === true) || (this._sound_ended === true) || (this._video_ended === true))) ||
            ((this._timeout > 0) && ((this._response_type === osweb.constants.RESPONSE_KEYBOARD) || (this._response_type === osweb.constants.RESPONSE_MOUSE)) && (this._response_given === true)) ||
            (((this._timeout > 0) && (this._current_item.clock.time() - this._current_item.experiment.vars.get('time_' + this._current_item.name)) > this._timeout))) {
            // Set the status of the current item to finalize.
            this._current_item._status = osweb.constants.STATUS_FINALIZE;
  	}
        else {
            // Update the current item.
            this._current_item.update();
        }    
    };
    
    events._complete = function() {
        // Disable the ticker
        this._active = false;
        
        // Remove the items from the general stack.
	osweb.item_stack.pop();

        // Execute the post-run phase after duration is finished or response is received.
	this._current_item.complete();
    };

    // Definition of methods for keyboard event processing.
	
    events._convertKeyCode = function(event)
    {
        // Check for special characters
        var key = '';
        if ((event.shiftKey === true) && (event.keyCode !== 16))
        {
            // Shift key pressed with other key, so convert shift keys.
            key = this.KEY_SCODES[event.keyCode];
        } 
        else if ((event.shiftKey === true) && (event.keyCode === 16))
        {
            // Shift code pressed, check for location (left or right)
            key = (event.location == 1) ? 'lshift' : 'rshift'; 
        } 
        else if ((event.ctrlKey === true) && (event.keyCode === 17))
        {
            // Ctrl code pressed, check for location (left or right)
            key = (event.location == 1) ? 'lctrl' : 'rctrl'; 
        } 
        else if ((event.altKey === true) && (event.keyCode === 18))
        {
            // Alt code pressed, check for location (left or right)
            key = (event.location == 1) ? 'lalt' : 'ralt'; 
        } 
        else
        {
            // Convert standard keycode.
            key  = this.KEY_CODES[event.keyCode];
        } 
        
        // Return function result.
        return key;
    };
        
    events._keyDown = function(event) {
        // Store the keyboard event.    
	this.keyboard_event = event;

        // Only select this event when the collection mode is set for this.
    	if ((this._keyboard_mode === osweb.constants.PRESSES_ONLY) || (this._keyboard_mode === osweb.constants.PRESSES_AND_RELEASES)) {
            // Process the event.
            this._processKeyboardEvent(event, 1);
    	} 
    };	 

    events._keyUp = function(event) {
    	// Only select this event when the collection mode is set for this.
    	if ((this._keyboard_mode === osweb.constants.RELEASES_ONLY) || (this._keyboard_mode === osweb.constants.PRESSES_AND_RELEASES)) {
            // Process the event.
            this._processKeyboardEvent(event, 0);
    	} 	 
    };

    events._processKeyboardEvent = function(event, keyboard_state) {
        // Create a new keyboard response object.
        var KeyboardResponses = {'event': event, 'rtTime':  osweb.runner.experiment.clock.time(), 'state': keyboard_state, 'type': osweb.constants.RESPONSE_KEYBOARD};
      
        // Convert response to proper keyboard token. 
        KeyboardResponses.resp = this._convertKeyCode(event);
        
        // Process the response to the current object.
        if ((this._response_type === osweb.constants.RESPONSE_KEYBOARD) && ((this._response_list === null) || (this._response_list.indexOf(KeyboardResponses.resp) >= 0))) {
            // Process the current item.
	    if (this._current_item !== null) {
                // Process the response.
                this._current_item.update_response(KeyboardResponses);
            } 	 
        
            // Set the valid response given toggle.
            this._response_given = true;
        }
    };
	
    // Definition of methods for mouse event processing.
 
    events._mouseContext = function(event) {
        // Prevent default action. 
        event.preventDefault();
        
        // Return false to prevent the context menu from pushing up.
        return false;
    };            
 
    events._mouseDown = function(event) {
        // Store the mouse press status for use in the mousee class.
        this._mouse_press = event;

	// Only select this event when the collection mode is set for this.
    	if ((this._mouse_mode === osweb.constants.PRESSES_ONLY) || (this._mouse_mode === osweb.constants.PRESSES_AND_RELEASES)) {
            // Process the event.
            this._processMouseEvent(event, 1);
    	}	
    };	

    events._mouseMove = function(event) {
        // Store the mouse move event and its timestamp for use in the mouse class.
        this._mouse_move = {'event': event, 'rtTime': osweb.runner.experiment.clock.time()};
    };	

    events._mouseUp = function(event) {
	// Only select this event when the collection mode is set for this.
    	if ((this._mouse_mode === osweb.constants.RELEASES_ONLY) || (this._mouse_mode === osweb.constants.PRESSES_AND_RELEASES)) {
            // Process the event.
            this._processMouseEvent(event, 0);
    	} 	
    };

    events._processMouseEvent = function(event, mouse_state) {
        // Create a new mouse response object.
        var MouseResponses = {'event': event, 'rtTime': osweb.runner.experiment.clock.time(), 'state': mouse_state, 'type': osweb.constants.RESPONSE_MOUSE};
     	
     	// Adjust mouse response.  
     	MouseResponses.resp = String(event.button + 1);  
     	 
        // Process the response to the current object.
        if ((this._response_type === osweb.constants.RESPONSE_MOUSE) && ((this._response_list === null) || (this._response_list.indexOf(MouseResponses.resp) >= 0))) {
            // Process the response to the current object.
            if (this._current_item !== null) {
                this._current_item.update_response(MouseResponses);
            }   

            // Set the valid response given toggle.
            this._response_given = true;
	}
    };
	
    // Definition of methods for sound event processing.

    events._audioEnded = function() {
        // If duration isequal to sound exit the sound item.
        osweb.events._sound_ended = true;
    };

    // Definition of methods for video event processing.

    events._videoEnded = function() {
        osweb.events._video_ended = true;
    };

    events._videoPlay = function(event) {
    };

    // Definition of methods for tick event processing (timing).
 
    events._tick = function(event) {
    	// Only check for status if there is a current item and the ticker is activated.
        if ((this._current_item !== null) && (this._active === true)) {
            switch (this._current_item._status) {
                case osweb.constants.STATUS_FINALIZE:
                   // End action. Complete current active item.
                    events._complete();
                break;
		default:
                    // Default action, update section of the current active item.
                    events._update();
            }
	}
    };	 

    // Bind the events class to the osweb namespace.
    osweb.events = events;
}());


(function() {
    // Definition of the class functions.
    function functions() {
	throw 'The class functions cannot be instantiated!';
    }

    // Definition of private methods.   

    functions._initialize = function() {
	// Create the general function calls for use in the inlide script item.
	window['print'] = this.print;
	window['randint'] = this.randint;
    };
		
    // Definition of public methods - global inline functions.

    functions.print = function(text) {
	console.log('print output:' + text);
    };

    functions.randint = function(start, end) {
        var multiplier = end - start;
        var rand = Math.floor(Math.random() * multiplier);
        return rand + start;
    };

    // Bind the functions class to the osweb namespace.
    osweb.functions = functions;
}()); 



(function() {
    // Definition of the class Parameters.
    function parameters() {
	throw 'The class parameters cannot be instantiated!';
    } 

    // Define the private properties. 
    parameters._itemCounter = 0;
    parameters._parameters  = new Array();

    // Define the public properties. 
    parameters.displaySummary   = false;
    parameters.useDefaultValues = false;

    // Definition of private methods - initialize parameters.   

    parameters._initialize = function() {
      	// Set properties if defined.
    	var parameter = {dataType: '0', defaultValue: '0', name: 'subject_nr', prompt: 'Please enter the subject number', promptEnabled: true};
        
        // Add the subject parameter to the parameters list.
        this._parameters.push(parameter);
    };

    // Definition of private methods - process parameters.   
    
    parameters._processParameters = function() {
    	// Process all items for which a user input is required.
        if (this._itemCounter < this._parameters.length) {	
            // Process the Parameter.
            if (this.useDefaultValues == false) {
                this._processParameter(this._parameters[this._itemCounter]);
            }
            else {
                // Transfer the startup info to the context.
                this._transferParameters();
            }    
        }
        else {
            // All items have been processed, contine the Runner processing.
            if (this.displaySummary == true) {
                // Show a summary of the the startup information. 
                this._showParameters();
            }
            else {            
                // Transfer the startup info to the context.
                this._transferParameters();
            }
        }
    };

    parameters._processParameter = function(parameter) {
        // Check if a user request is required.
        if (parameter.promptEnabled == true) {
            this._showDialog(parameter.dataType);

            // Set the dialog interface.
            if (parameter.response == '') {
            	document.getElementById('qpdialoginput').value = parameter.defaultValue;
            }
            else {
            	document.getElementById('qpdialoginput').value = parameter.defaultValue;
            }

            document.getElementById('dialogboxhead').innerHTML = parameter.prompt;
            document.getElementById('qpbuttonyes').onclick = function() {
                // Get the response information
                parameter.response = document.getElementById('qpdialoginput').value;
                            
                // Close the dialog.
                this._hideDialog();
            
                // Increase the counter.
                this._itemCounter++;

                // Continue processing.
                this._processParameters();

            }.bind(this);
        	
            document.getElementById('qpbuttonno').onclick = function() {
                // Close the dialog.
	        this._hideDialog();
                
   		// Finalize the introscreen elements.
		osweb.runner._exit();
            }.bind(this);
        }
        else {
            // Assign default value to the Startup item.
            parameter.response = parameter.defaultValue;
           
            // Increase the counter.
            this._itemCounter++;

            // Continue processing.
            this._processParameters();
        }    
    };

    parameters._showParameters = function() {
        document.getElementById('dialogboxhead').innerHTML = 'Summary of startup info';
        document.getElementById('qpbuttonyes').onclick = function() {
            // Close the dialog.
	    this._hideDialog();
                        
            // Transfer the startup info to the context.
            this._transferParameters(); 
        
        }.bind(this);    
        
        document.getElementById('qpbuttonno').onclick = function() {
            // Close the dialog.
            this._hideDialog();
                       
            // Reset the item counter.
            this._itemCounter = 0;
                        
            // Restat the input process.    
            this._processParameters(); 
            
        }.bind(this);    

        document.getElementById('qpbuttoncancel').onclick = function() {
            // Close the dialog.
	    this._hideDialog();
        
            // Finalize the introscreen elements.
            osweb.runner._exit();
        }.bind(this);    
       
  	// Set the dialog interface.
        var TmpString = '';
        for (var i = 0;i < this._parameters.length; i++) {
            if ((this._parameters[i].enabled != 0) && (this._parameters[i].promptEnabled != 0)) {
		TmpString = TmpString + this._parameters[i].name + ': ' + this._parameters[i].response + '\r\n';  	        	
            }
        }

        document.getElementById('qpdialogtextarea').innerHTML = TmpString;
    };

    parameters._transferParameters = function() {
    	// Transfer the startup info items to the context.
        for (var i = 0;i < this._parameters.length; i++) {
            osweb.runner.experiment.vars.set(this._parameters[i].name,this._parameters[i].response);
        }
        
	// Parameters are processed, next phase.
        osweb.runner._prepareStartScreen();
    };
    
     // Definition of class methods (dialogs).   
     
    parameters._showDialog = function(dialog_type) {
        var dialogoverlay = document.getElementById('dialogoverlay');
	var dialogbox = document.getElementById('dialogbox');
		                
	dialogoverlay.style.display = "block";
	dialogoverlay.style.height = window.innerHeight + "px";
	dialogbox.style.left = (window.innerWidth / 2) - (400 * .5) + "px";
	dialogbox.style.top = "200px";
	dialogbox.style.display = "inline";

	switch (dialog_type) {
	    case "0": 
                document.getElementById('dialogboxbody').innerHTML = '<input id="qpdialoginput"></input>';
	    	document.getElementById('dialogboxfoot').innerHTML = '<button id="qpbuttonyes">Ok</button><button id="qpbuttonno">Cancel</button>';
                document.getElementById('qpdialoginput').focus();
            break;
            case "1": 
	        document.getElementById('dialogboxbody').innerHTML = '<input id="qpdialoginput"></input>';
		document.getElementById('dialogboxfoot').innerHTML = '<button id="qpbuttonyes">Ok</button><button id="qpbuttonno">Cancel</button>';
                document.getElementById('qpdialoginput').focus();
            break;
            case "2": 
	        document.getElementById('dialogboxbody').innerHTML = '<input id="qpdialoginput"></input>';
		document.getElementById('dialogboxfoot').innerHTML = '<button id="qpbuttonyes">Ok</button><button id="qpbuttonno">Cancel</button>';
                document.getElementById('qpdialoginput').focus();
            break;
            case "3": 
	        document.getElementById('dialogboxbody').innerHTML = '<textarea id="qpdialogtextarea"></textarea>';
                document.getElementById('dialogboxfoot').innerHTML = '<button id="qpbuttonyes">Yes</button><button id="qpbuttonno">No</button><button id="qpbuttoncancel">Cancel</button>';
                document.getElementById('qpdialogtextarea').focus();
            break;
	}
    };
	 
    parameters._hideDialog = function() {
        dialogoverlay.style.display = "none";
	dialogbox.style.display = "none";
	document.getElementById('dialogboxbody').innerHTML = '';
	document.getElementById('dialogboxfoot').innerHTML = '';
    };	

    // Bind the parameters class to the osweb namespace.
    osweb.parameters = parameters;
}());


(function() {
    // Definition of the class session.
    function parser() {
	throw 'The class parser cannot be instantiated!';
    }

    // Definition of private properties.
    parser._ast_tree = null;    
    parser._current_node = null;
    parser._inline_script = null;
    parser._status = 0;                      
                
    // Definition of private methods - prepare cycle.   

    parser._prepare = function(script) {
        if (script !== '') {
            var locations = false;
            var parseFn = filbert_loose.parse_dammit;
            var ranges = false;
        		
	    try {
                var code = script;
           	var ast = parseFn(code, { locations: locations, ranges: ranges });
	        return ast;
    	    }
       	    catch (e) {
        	console.log('error');
        	console.log(e.toString());
                return null;
            }
        } else
	{
            return null;
        }	   	
    };
    
    // Definition of private methods - general parser functions.

    parser._set_return_value = function(node, value) {
        var index = 0;
        while (typeof node['returnvalue' + String(index)] !== 'undefined') {
            index++;
        }    
        
        // Set the return value\
        node['returnvalue' + String(index)] = value;
    };
    
    // Definition of private methods - node processing.
    
    parser._node_binary_expression = function() {
        // Initialize status property.
        this._current_node.status = (typeof this._current_node.status === 'undefined') ? 0  : this._current_node.status; 
        
        // Process the current status.
        switch (this._current_node.status) {
            case 0: 
                // process right expression;
                this._current_node.status = 1;
                this._current_node.right.parent = this._current_node;
                this._current_node = this._current_node.right;

                // Return to the node processessor.
                this._process_node();
            break;        
            case 1: 
                // process right expression;
                this._current_node.status = 2;
                this._current_node.left.parent = this._current_node;
                this._current_node = this._current_node.left;

                // Return to the node processessor.
                this._process_node();
            break;        
            case 2: 
                var left,right;
                if  (typeof window[this._current_node.returnvalue0] === 'undefined') {
                    var right = this._current_node.returnvalue0;
                }
                else {
                    var right = window[this._current_node.returnvalue0];
                }
                var left,right;
                if  (typeof window[this._current_node.returnvalue1] === 'undefined') {
                    var left = this._current_node.returnvalue1;
                }
                else {
                    var left = window[this._current_node.returnvalue1];
                }
            
                // Select the binary operator to perform.
                switch (this._current_node.operator) {
                    case '-':
                        // Process call - check for blocking methods.
                        this._set_return_value(this._current_node.parent,left - right);
                    break;
                }

                // Set parent node.
                this._current_node.status = 3;
                this._current_node = this._current_node.parent;

                // Return to the node processessor.
                this._process_node();
            break;        
        }    
    };    

    parser._node_call_expression = function() {
        // Initialize status property.
        this._current_node.arguments = (typeof this._current_node.arguments === 'undefined') ? [] : this._current_node.arguments;
        this._current_node.index = (typeof this._current_node.index === 'undefined') ? 0  : this._current_node.index; 
        this._current_node.status = (typeof this._current_node.status === 'undefined') ? 0  : this._current_node.status; 
        
        // Process the current status.
        switch (this._current_node.status) {
            case 0: 
                // Process arguments.
                if (this._current_node.index < this._current_node.arguments.length) {
                    // Set current node to next node in list.
                    this._current_node.index++;
                    this._current_node.arguments[this._current_node.index - 1].parent = this._current_node;
                    this._current_node = this._current_node.arguments[this._current_node.index - 1];
        
                    // Return to the node processessor.
                    this._process_node();
                } 
                else { 
                    // Set parent node.
                    this._current_node.status = 1;

                    // Return to the node processessor.
                    this._process_node();
                }
            break;
            case 1: 
                // Set parent node.
                this._current_node.status = 2;
                this._current_node.callee.parent = this._current_node;
                this._current_node = this._current_node.callee;

                // Return to the node processessor.
                this._process_node();
            break;    
            case 2: 
                // Set status of node.
                this._current_node.status = 3;
            
                // Create the aruments array.
                var tmp_arguments = [];
                for (var i=0;i< this._current_node.arguments.length; i++) {
                    if (typeof window[this._current_node['returnvalue' + String(i)]] !== 'undefined') {
                        tmp_arguments.push(window[this._current_node['returnvalue' + String(i)]]);
                    }    
                    else {    
                        tmp_arguments.push(this._current_node['returnvalue' + String(i)]);
                    }    
                }    
                    
                // Select the type of call to process
                var callee = this._current_node['returnvalue' + String(this._current_node.arguments.length)];
                var returnvalue = null;
                if (callee.type == 'function') {
                    // function call
                    returnvalue = window[callee.obj].apply(null, tmp_arguments);
                    
                    // Process call - check for blocking methods.
                    this._current_node.parent['returnvalue' + String(this._current_node.arguments.length)] = returnvalue;
                
                    // Return to the node processessor.
                    this._process_node();
                }    
                else if (callee.type == 'object') {
                    if ((callee.obj == 'clock') && (callee.prop == 'sleep')) {
                        // Process special calls with blocking (no direct result processing).
                        window[callee.obj][callee.prop].apply(window[callee.obj], tmp_arguments);
                    }    
                    else {    
                        // object methods calls.
                        returnvalue = window[callee.obj][callee.prop]();
                    
                        // Process call - check for blocking methods.
                        this._current_node.parent['returnvalue' + String(this._current_node.arguments.length)] = returnvalue;
                
                        // Return to the node processessor.
                        this._process_node();
                    }        
                }
                else {
                    switch (callee) {   
                        case 'canvas':
                            returnvalue = new osweb.canvas();
                        break;    
                    }    
                  
                    // Process call - check for blocking methods.
                    this._current_node.parent['returnvalue' + String(this._current_node.arguments.length)] = returnvalue;
                
                    // Return to the node processessor.
                    this._process_node();
                }    
            break;    
            case 3: 
                // Set parent node.
                this._current_node.status = 4;
                this._current_node = this._current_node.parent;

                // Return to the node processessor.
                this._process_node();
            break;        
        }    
    };

    parser._node_expression_statement = function() {
        // Initialize status property.
        this._current_node.status = (typeof this._current_node.status === 'undefined') ? 0  : this._current_node.status; 
        
        // Process the current status.
        switch (this._current_node.status) {
            case 0: 
                // Set parent node.
                this._current_node.status = 1;
                this._current_node.expression.parent = this._current_node;
                this._current_node = this._current_node.expression;

                // Return to the node processessor.
                 this._process_node();
            break;
            case 1: 
                // Set parent node.
                this._current_node.status = 2;
                this._current_node = this._current_node.parent;

                // Return to the node processessor.
                this._process_node();
            break;
        ;}    
    };

    parser._node_identifier = function() {
        // Return function result.
        if (typeof window[this._current_node.name] === 'undefined') {
            // Item is undefined, create it without value/type definition.
            window[this._current_node.name] = null;
        }
        
        // Set the return value.
        this._set_return_value(this._current_node.parent, this._current_node.name);

        // Set parent node.
        this._current_node = this._current_node.parent;

        // Return to the node processessor.
        this._process_node();
    };

    parser._node_literal = function()
    {
        // Set the return value.
        this._set_return_value(this._current_node.parent, this._current_node.value);
        
        // Set parent node.
        this._current_node = this._current_node.parent;

        // Return to the node processessor.
        this._process_node();
    };

    parser._node_member_expression = function()
    {
        // Initialize status property.
        this._current_node.status = (typeof this._current_node.status === 'undefined') ? 0 : this._current_node.status; 
        
        // Process the current status.
        switch (this._current_node.status) {
            case 0: 
                // Process object.
                this._current_node.status = 1;
                this._current_node.object.parent = this._current_node;
                this._current_node = this._current_node.object;
                
                // Return to the node processessor.
                this._process_node();
            break;    
            case 1: 
                // Process object.
                this._current_node.status = 2;
                this._current_node.property.parent = this._current_node;
                this._current_node = this._current_node.property;

                // Return to the node processessor.
                this._process_node();
            break;    
            case 2: 
                // Set the return value.
                //console.log('member->');
                //console.log(typeof this._current_node.returnvalue0);
                    
                if (typeof this._current_node.returnvalue0 == 'object') {
                    this._set_return_value(this._current_node.parent,{ 'obj': this._current_node.returnvalue1, 'prop': null, 'type': 'function'});
                }
                else {    
                    this._set_return_value(this._current_node.parent,{ 'obj': this._current_node.returnvalue0, 'prop': this._current_node.returnvalue1,'type':'object'});
                }
                
                // Set parent node.
                this._current_node.status = 3;
                this._current_node = this._current_node.parent;

                // Return to the node processessor.
                this._process_node();
            break;    
        }        
    };

    parser._node_program = function()
    {
        // Initialize index counter only the fitst time.
        this._current_node.index = (typeof this._current_node.index === 'undefined') ? 0 : this._current_node.index; 
        this._current_node.status = (typeof this._current_node.status === 'undefined') ? 0 : this._current_node.status; 
        
        // Process the current status.
        switch (this._current_node.status) {
            case 0: 
                // Check if all nodes in script have been processed.
                if (this._current_node.index < this._current_node.body.length) {
                    // Set current node to next node in list.
                    this._current_node.index++;
                    this._current_node.body[this._current_node.index - 1].parent = this._current_node;
                    this._current_node = this._current_node.body[this._current_node.index - 1];

                    // Return to the node processessor.
                    this._process_node();
                }
                else {
                    // End status.
                    this._current_node.status = 1;
                
                    // Return to the node processessor.
                    this._process_node();
                }    
            break;
            case 1:
                // Change the node stats.                                
                this._current_node.status = 2;

                // All nodes are processed, set status to finished.
                this._status = 2;
        
                // Complete the inline item.    
                if (this._inline_script != null) {    
                    this._inline_script.complete();
                }    
            break;    
        }   
    };    

    parser._node_variable_declaration = function()
    {
        // Initialize index counter only the fitst time.
        this._current_node.index = (typeof this._current_node.index === 'undefined') ? 0 : this._current_node.index; 
        this._current_node.status = (typeof this._current_node.status === 'undefined') ? 0 : this._current_node.status; 
        
        // Process the current status.
        switch (this._current_node.status) {
            case 0: 
                // Check if all nodes in script have been processed.
                if (this._current_node.index < this._current_node.declarations.length) {
                    // Set current node to next node in list.
                    this._current_node.index++;
                    this._current_node.declarations[this._current_node.index - 1].parent = this._current_node;
                    this._current_node = this._current_node.declarations[this._current_node.index - 1];

                    // Return to the node processessor.
                    this._process_node();
                } 
                else {
                    // Change the node stats.                                
                    this._current_node.status = 1;

                    // Return to the node processessor.
                    this._process_node();
                }    
            break; 
            case 1:
                // Change the node stats.                                
                this._current_node.status = 2;

                // Set parent node.
                this._current_node = this._current_node.parent;

                // Return to the node processessor.
                this._process_node();
            break;
        }   
    };

    parser._node_variable_declarator = function()
    {
        // Initialize status property.
        this._current_node.status = (typeof this._current_node.status === 'undefined') ? 0 : this._current_node.status; 
        
        // Process the current status.
        switch (this._current_node.status) {
            case 0: 
                // Process init.
                this._current_node.status      = 1;
                this._current_node.init.parent = this._current_node;
                this._current_node             = this._current_node.init;
                
                // Return to the node processessor.
                this._process_node();
            break;    
            case 1: 
                // process id.
                this._current_node.status    = 2;
                this._current_node.id.parent = this._current_node;
                this._current_node           = this._current_node.id;

                // Return to the node processessor.
                this._process_node();
            break;    
            case 2: 
                // Set variable.
                window[this._current_node.returnvalue1] = this._current_node.returnvalue0;      
                
                // Set parent node.
                this._current_node.status = 3;
                this._current_node = this._current_node.parent;

                // Return to the node processessor.
                this._process_node();
            break;    
        }
    };

    // Definition of private methods - general node processing.

    parser._process_node = function() {
        console.log('processing node');
        console.log(this._current_node);
        
        // Select the type of node to process
        switch(this._current_node.type) { 
            case 'BinaryExpression':
                this._node_binary_expression();
            break;
            case 'CallExpression':
                this._node_call_expression();
            break;
            case 'ExpressionStatement':
                this._node_expression_statement();
            break;
            case 'Identifier':
                this._node_identifier();
            break;
            case 'Literal':
                this._node_literal();
            break;
            case 'MemberExpression':
                this._node_member_expression();
            break;
            case 'Program':
                this._node_program();
            break;
            case 'VariableDeclaration':
                this._node_variable_declaration();
            break; 
            case 'VariableDeclarator':
                this._node_variable_declarator();
            break; 
        }
    };

    // Definition of private methods - run cycle.

    parser._runstatement = function(node) {
        // Call the expression statement en return the value.       
        return this._node_call_expression(node.expression);
    };
    
    parser._run = function(inline_script, ast_tree) {
        // Set the inline item. 
	this._inline_script = inline_script;
	
	// Set the first node and its parent.
	this._current_node = ast_tree;
        this._current_node.parent = null;
        this._status = 1;
        
    	// Process the nodes. 
	osweb.parser._process_node();
    };

    // Bind the parser class to the osweb namespace.
    osweb.parser = parser;
}()); 


/*
 * Definition of the class prng.
 */

(function() 
{
    function prng()
    {
    	throw "The class prng cannot be instantiated!";
    }; 
	
    // Set the class private properties. 
    prng._previous = 0;
    prng._prng     = uheprng();    
    prng._seed     = '0';

    /*
     * Definition of class methods - run cycle.   
     */
    
    prng._initialize = function()
    {
        // Create the random seed. 
        this._prng.initState();
        this._prng.hashString(this._seed); 
    };

    /*
     * Definition of class methods.   
     */

    prng._getNext = function() 
    {
        // Get the next random number.
        this._previous = (this._prng(1000000000000000) / 1000000000000000);
        
        // Return function result.
        return this._previous;
	};

    prng._getPrevious = function() 
    {
        // Return function result.
        return this._previous;
    };

    prng._getSeed = function() 
    {
        // Return the current seed value.
        return this._seed;        
    };

    prng._random = function(pMin, pMax) 
    {
        // Calculate the range devider.
        var devider = (1 / ((pMax - pMin) + 1));
         
        // Get the random number and devide it.
        this._previous = ((this._prng(1000000000000000) / 1000000000000000));
        
        // Set the devider.
        this._previous = pMin + Math.floor(this._previous / devider);
               
        // Return function result. 
        return this._previous;
    };

    prng._reset = function() 
    {
        // Set the random seed value to 0. 
        this._seed = '0';

        // Reset the PRNG range.
        this._prng.initState();
        this._prng.hashString(String(this._seed));
    };
    
    prng._setSeed = function(pSeed) 
    {
        // Set the random seed value. 
        this._seed = String(pSeed);
        
        // Reset the PRNG range.
        this._prng.initState();
        this._prng.hashString(this._seed);
    };

    // Bind the prng class to the osweb namespace.
    osweb.prng = prng;
}());


(function() {
    // Definition of the class session - store user session information. 
    function session() {
    	throw 'The class session cannot be instantiated!';
    }

    // Definition of private methods.   

    session._initialize = function() {
    	// Update the loader text.
    	osweb.runner._updateIntroScreen(osweb.constants.MESSAGE_008);
	
    	// Get the session information.
	this._getSessionInformation();
    };

    session._getSessionInformation = function() {
    	// Get the session information from the client system.
    	this._date = new Date();
	this._session = {
            'browser': {
                'codename': navigator.appCodeName,
                'name': navigator.appName,
                'version': navigator.appVersion
            },
            'date': {
                'startdate': ('0' + this._date.getDate()).slice(-2) + '-' + ('0' + this._date.getMonth()).slice(-2) + '-' + ('0' + this._date.getFullYear()).slice(-2),
                'starttime': ('0' + this._date.getHours()).slice(-2) + ':' + ('0' + this._date.getMinutes()).slice(-2) + ':' + ('0' + this._date.getSeconds()).slice(-2),
                'startdateUTC' : ('0' + this._date.getUTCDate()).slice(-2) + '-' + ('0' + this._date.getUTCMonth()).slice(-2) + '-' + ('0' + this._date.getUTCFullYear()).slice(-2)
            },
            'experiment': {
		'debug': 0,
                'parameters': 0,
		'pilot': 0,
                'taskname': 0,
                'taskversion': 0
            },
            'screen': {
                'availableHeight': screen.availHeight,
                'availableWidth': screen.availWidth,
                'colorDepth': screen.colorDepth,
                'height': screen.height,
                'outerheight': window.outerheight,
                'outerwidth': window.outerwidth,
                'pixelDepth': screen.pixelDepth,
                'screenX': window.screenX,
                'screenY': window.screenY,
                'width': screen.width
            },
            'system': {
                'os': navigator.platform
            }
        };
    };

    // Bind the session class to the osweb namespace.
    osweb.session = session;
}()); 


(function() {
    // Definition of the class runner.
    function runner() {
    	throw 'The class runner cannot be instantiated!';
    };

    // Show library name and library version number in the console.
    console.log(osweb.VERSION_NAME + ' - ' + osweb.VERSION_NUMBER);	

    // Definition of private properties.
    runner._canvas = null;                       // Canvas on which the experiment is shown.
    runner._qualtrics = null;                    // Link to the qualtrics interface (optional)
    runner._stage = null;                        // Links to the stage object (CreateJS).

    // Definition of public properties.
    runner.data = null;                          // Container for the experiment result data (if defined).
    runner.debug = false;                        // Debug toggle.
    runner.experiment = null;                    // The root experiment object to run.           
    runner.onFinished = null;                    // Event triggered on finishing the experiment.
    runner.screenIntro = true;                   // Show introscreen toggle.
    runner.screenClick = true;                   // Show clickscreen toggle
    runner.script = null;                        // Container for the JSON script definition of the experiment.
    runner.scriptID = 0;                         // Id used when retrieving the script from the database.
    runner.scriptURL = '';                       // Path pointing to the AMFPHP database files.
    runner.session = null;                       // Container for the JSON session information.
    
    /*
    // Definition of private methods - setup runner.      
     */

    runner._setupContent = function(content) {
    	// Check if the experiment container is defined.                     
	if (typeof content !== "undefined") {
            // Get the canvas from the DOM Element tree.
            this._canvas = (typeof content === 'string') ? document.getElementById(content) : content; 		
		
            // Set the stage object (easelJS). 
            this._stage = new createjs.Stage(this._canvas);
            this._stage.snapToPixelEnabled = true;
            this._stage.regX = -.5;
            this._stage.regY = -.5;
		
            // Build the initialization screen.
            this._setupIntroScreen();
	}
	else {
            osweb.debug.addError(osweb.constants.ERROR_002);
	}
    };

    runner._setupContext = function(context) {
	// Check if the script parameter is defined.                        
	if (typeof context !== "undefined") {
            // Initialize the context parameters.
            this.debug = (typeof context.debug !== 'undefined') ? context.debug : false; 
            this.file = (typeof context.file !== 'undefined') ? context.file : null;
            this.onFinished = (typeof context.onFinished !== 'undefined') ? context.onFinished : null;
            this.screenClick = (typeof context.screenClick !== 'undefined') ? context.screenClick : true;				      
            this.screenIntro = (typeof context.screenIntro !== 'undefined') ? context.screenIntro : true; 
            this.script = (typeof context.script !== 'undefined') ? context.script : null;      
            this.scriptID = (typeof context.scriptID !== 'undefined') ? context.scriptID : 0;         
            this.scriptURL = (typeof context.scriptURL !== 'undefined') ? context.scriptURL : '';		 
            this.session = (typeof context.session !== 'undefined') ? context.session : null;
					
            // Check if an osexp script is given as parameter.                            
            if (this.script !== null) {	
                // Start building the experiment structure.      
		this._buildExperiment();
            }
            // Check if an osexp file is given as parameter. 
            else if (this.file !== null) {
                this._setupScriptFromFile();
            }	
            else {
                // Retrieve the script from an external location.
		this._setupScriptFromDatabase();
            }
	}
	else {
            osweb.debug.addError(osweb.constants.ERROR_003);
	}
    };

    runner._setupScriptFromFile = function() {
        // Check for binary or text file definition.
        if (this.file.substring(0,3) == '---') {
            this.script = String(this.file);
        } 
        else {
            // Decompress the gizp file and splitt the tar result.	
            GZip.loadlocal(this.file, function(h) {
                var tar = new TarGZ;
                tar.parseTar(h.data.join(''));
                tar.files.forEach(this.setupScriptFromFileResult.bind(this)); 
            }.bind(this), this.setupScriptFromFileProgress, this.setupScriptFromFileAlert);
        }    
        
        // Start building the experiment structure.      
	this._buildExperiment();
    };

    runner.setupScriptFromFileAlert = function() {
    };

    runner.setupScriptFromFileProgress = function() {
    };

    runner.setupScriptFromFileResult = function(pFile) {
	// Check if the file is the scriptfile.
    	if (pFile.filename === 'script.opensesame') {
            // Create the script.
            this.script = String(pFile.data);
   	}
	else if ((pFile.data !== null) && (pFile.data !== '')) {
            // Create a file pool element.
            osweb.pool.add_from_local_source(pFile);			
	}
    };

    runner._setupScriptFromDatabase = function() {
	// Check if the URL and ID is propertly defined.
       	if ((this.scriptID >= 0) && (this.scriptURL !== '')) {
            var url = this.scriptURL + '/php/index.php?/ajax/group/get_status';
            var parameters = {group_id: 99, task_number: this.scriptID};
		
            new Ajax.Request(url, {
            	parameters: parameters,
		onCreate: function(response) {
                    var t = response.transport;
                    t.setRequestHeader = t.setRequestHeader.wrap(function(original, k, v) {
			if (/^(accept|accept-language|content-language)$/i.test(k))
                            return original(k, v);
			if (/^content-type$/i.test(k) &&
                            /^(application\/x-www-form-urlencoded|multipart\/form-data|text\/plain)(;.+)?$/i.test(v))
                            return original(k, v);
			return;
                    });
		},
		onSuccess: function(transport) {
                    // Process the response
                    if (transport.responseText) {
                        // Retrieve the response text.
			var jsonresponse = JSON.parse(transport.responseText);
					
			// Check if the task is available.
			if (jsonresponse.task_available === '1') {
                            // Set the script parameter.
                            this.script = jsonresponse.data_available;
                            this.files  = jsonresponse.file_available.split('\r\n');    
                                    
                            // Create a file pool element.
                            osweb.pool.add_from_server_source(this.scriptURL + '/user/4/', this.files);			
                        }
			else {
                            // Show erorr message within the concole.
                            osweb.debug.addError(osweb.constants.ERROR_007);
			}
                    }	
                    else {
			// Show erorr message within the concole.
			osweb.debug.addError(osweb.constants.ERROR_006);
                    }
		}.bind(this),
		onFailure: function() {
                    // Show erorr message within the concole.
                    osweb.debug.addError(osweb.constants.ERROR_005);
		}.bind(this) 
            }); 
	}
	else {
            // Show erorr message within the concole.
            osweb.debug.addError(osweb.constants.ERROR_004);
	} 
    };

    // Definition of private methods - Introduction screen.

    runner._setupIntroScreen =  function() {
    	// Set the introscreen elements.
	if (this.screenIntro === true) {
            this._introScreen  = new createjs.Shape();
            this._introScreen.graphics.beginFill('#000000').drawRect(0,0,this._stage.width,this._stage.height);
            this._introLine    = new createjs.Shape();
            this._introLine.graphics.beginFill('#AAAAAA').drawRect(200,155,400,1);
            this._introText1   = new createjs.Text('OS', "24px bold Times", "#FF0000");
            this._introText1.x = 200;
            this._introText1.y = 135;
            this._introText2   = new createjs.Text(osweb.constants.MESSAGE_002 + osweb.VERSION_NUMBER, "14px Arial", "#FFFFFF");
            this._introText2.x = 231;
            this._introText2.y = 142;
            this._introText3   = new createjs.Text(osweb.constants.MESSAGE_003,"12px Arial", "#FFFFFF");
            this._introText3.x = 200;
            this._introText3.y = 168;
            this._stage.addChild(this._introScreen,this._introLine,this._introText1,this._introText2,this._introText3);
            this._stage.update();
	}
    };
	
    runner._clearIntroScreen = function(){
        // Update the introscreen elements.
	if (this.screenIntro === true) {
            this._stage.removeChild(this._introScreen,this._introLine,this._introText1,this._introText2,this._introText3);
            this._stage.update();
	}		
    };
	
    runner._updateIntroScreen = function(text) {
	// Update the introscreen elements.
	if (this.screenIntro === true) {
            this._introText3.text = text;
            this._stage.update();
	}		
    };

    // Definition of the private methods - build cycle.      

    runner._buildExperiment = function() {
    	// Build the base experiment object.
	this.experiment = new osweb.experiment(null, 'test', this.script);
	
        // Create the global static object classes.
	window['items'] = osweb.item_store;
	window['pool']  = osweb.file_pole_store;
	window['vars']  = this.experiment.vars;
		
	// Pepare the experiment to run.
	this._prepare();
    };

    // Definition of private methods - prepare cycle.   

    runner._prepare = function() {
	// Update inroscreen.
	this._updateIntroScreen(osweb.constants.MESSAGE_004);
		
	// Start the stimuli loader.
	osweb.parameters._initialize();
        osweb.functions._initialize();
	osweb.python_workspace_api._initialize();
        osweb.session._initialize();

        // Start the parameter screen (subject number).
        this._prepareParameters();
    };

    runner._prepareParameters = function() {
        // Update inroscreen.
	this._updateIntroScreen(osweb.constants.MESSAGE_005);

	// Check if items must be processed. 
	if (osweb.parameters._parameters.length > 0) {
		// Process the Parameters.        
   	    osweb.parameters._processParameters();
	}
	else { 
            // Start the experiment.
   	    this._prepareStartScreen();
	}
    };

    runner._prepareStartScreen = function() {
        // Check if the experiment must be clicked to start.
        if (this.screenClick === true) {
            // Update inroscreen.
            this._updateIntroScreen(osweb.constants.MESSAGE_006);
		
            // Setup the mouse click response handler.
            var clickHandler = function(event) {
		// Remove the handler.
		this._canvas.removeEventListener("click", clickHandler);

		// Finalize the introscreen elements.
		this._clearIntroScreen();

                // Start the task.
		this._initialize();
            }.bind(this); 

            // Set the temporary mouse click.
            this._canvas.addEventListener("click", clickHandler, false);
	}
	else {
            // Finalize the introscreen elements.
            this._clearIntroScreen();

            // Start the runner.
            this._initialize(); 
	}
    };

    // Definition of private methods - run cycle.   
    
    runner._initialize = function() {
	// Initialize the debugger. 
	osweb.debug._initialize();

        // Initialize the devices.
	osweb.events._initialize();

        // Prepare and execute the experiment item.
	this.experiment.prepare();
	this.experiment.run();
    };
	
    runner._finalize = function() {   
        // Finalize the devices.
    	osweb.events._finalize();
        
    	// Finalize the debugger. 
	osweb.debug._finalize();

        // Exit the application.
        this._exit();
    };

    runner._exit = function() {
        // Clear the canvas.
        this._stage.clear();
        
        // Set the cursor visibility to default.
        this._stage.canvas.style.cursor = "default";

        // Check if an event handler is attached.
	if (this.onFinished) {
            // Execute.
            this.onFinished(this.data, osweb.session._session);
	}
    };

    // Definition of public methods - run cycle.      

    runner.run = function(content, context) {
        // Initialize the content container.
	this._setupContent(content);

	// Initialize the context parameter
	this._setupContext(context);
    };

    // Bind the runner class to the osweb namespace.
    osweb.runner = runner;
}()); 
