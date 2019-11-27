(function($, window, document, undefined) {

	function YTCarousel(element, options) {
		
		this.settings = null;
		
		this.options = $.extend({}, YTCarousel.Defaults, options);
		
		this.$element = $(element);
		
		this._handlers = {};
		
		this._count = this.$element.children().length;
		
		this._children = this.$element.children();
		
		this._plugins = {};
		
		this._index = 0;
		
		this._isAnimate = false;
		
		this.animateTimer = null;
	
		this._count = this.$element.children().length;
		
		$.each([ 'resize', 'onResizeTimer' ], $.proxy(function(i, handler) {
            this._handlers[handler] = $.proxy(this[handler], this);
        }, this));
		
		$.each(YTCarousel.Plugins, $.proxy(function(key, plugin) {
            this._plugins[key.charAt(0).toLowerCase() + key.slice(1)] = new plugin(this);
        }, this));		
					
		this.setup();
		
		this.init();
		
	}
	
	YTCarousel.Defaults = {
        items: 3,
		animationTime:6000,
		auto:false,
		itemObject:[]
    };
	
	YTCarousel.Plugins = {};
	
	YTCarousel.prototype.setup = function(){
		this.settings = $.extend({}, this.options);
		this.registerEventHandlers();
	}
	
	YTCarousel.prototype.init = function(){
		
		this.$element
			.wrap('<div class="yt__wrapper"></div>')
			.css({'width':(this.viewport()*this._count)})
			.children().css({'width':this.viewport()});
			
		this.$element.parent().append('<div class="yt__nav"><span class="yt_prev">‹</span><span class="yt_next">›</span></div>');
		
		$(document).on('click', '.yt_prev', $.proxy(function(e) {
			e.preventDefault();
			this.prev();
		}, this));
		
		$(document).on('click', '.yt_next', $.proxy(function(e) {
			e.preventDefault();	
			this.next();
		}, this));
		
		this.setObjectPosition("next", this._index);
		this.doAnimate("start", this._index);
		
		if(this.settings.auto) { this.autoPlay(); }
	}
	
	YTCarousel.prototype.autoPlay = function(){
		window.clearTimeout(this.animateTimer);
		this.animateTimer = window.setInterval($.proxy(function(e) {
			this.next();
		},this),this.settings.animationTime);
	}
	
	YTCarousel.prototype.viewport = function(){
		var width;
		if(window.innerWidth) { width = window.innerWidth; } 
		else if(document.documentElement && document.documentElement.clientWidth) { width = document.documentElement.clientWidth; }
		else{ console.warn('Can not detect viewport width.'); }
		return width;
	}
	
	YTCarousel.prototype.destroy = function(){
		this.$element
			.unwrap('.yt__wrapper')
			.removeAttr('style')
			.children().removeAttr('style')
			.removeData('yt__carousel');
	}
	
	YTCarousel.prototype.onResizeTimer = function() {
		window.clearTimeout(this.resizeTimer);
		this.resizeTimer = window.setTimeout(this._handlers.resize, this.settings.responsiveRefreshRate);
	};

	YTCarousel.prototype.on = function(element, event, listener, capture) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, capture);
		} else if (element.attachEvent) {
			element.attachEvent('on' + event, listener, capture);
		}
	};
	
	YTCarousel.prototype.off = function(element, event, listener, capture) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, capture);
		} else if (element.detachEvent) {
			element.detachEvent('on' + event, listener, capture);
		}
	};
	
	YTCarousel.prototype.registerEventHandlers = function() {
		if (this.settings.responsive !== false) {
			this.on(window, 'resize', this._handlers.onResizeTimer);
		}
	};
	
	YTCarousel.prototype.resize = function(){
		this.$element
			.css({'width':(this.viewport()*this._count)})
			.children().css({'width':this.viewport()});
		this.change(100);	
	}
	
	YTCarousel.prototype.change = function(animateTime){
		this.$element.animate({
			left: -(this.viewport()*this._index)
		}, animateTime, $.proxy(function(e) { 
			this.doAnimate("start", this._index)
		},this));
	}
	
	YTCarousel.prototype.setObjectPosition = function(direction, getIndex){
		for(var thisCount = 0; this._count>thisCount; thisCount++)
		{
			var objLenght = Object.getOwnPropertyNames(this.settings.itemObject[thisCount]).length;
			for(var i = 0; objLenght > i; i++)
			{
				var getObjName = Object.getOwnPropertyNames(this.settings.itemObject[thisCount])[i];
				
				switch(getObjName) {
					case "obj1":
						setObjName = this.settings.itemObject[thisCount].obj1
					break;
					case "obj2":
						setObjName = this.settings.itemObject[thisCount].obj2
					break;
					case "obj3":
						setObjName = this.settings.itemObject[thisCount].obj3
					break;
					case "obj4":
						setObjName = this.settings.itemObject[thisCount].obj4
					break;
					case "obj5":
						setObjName = this.settings.itemObject[thisCount].obj5
					break;
					case "obj6":
						setObjName = this.settings.itemObject[thisCount].obj6
					break;
					case "obj7":
						setObjName = this.settings.itemObject[thisCount].obj7
					break;
					default:
				}
				this._children.eq(thisCount).find('.' + getObjName).css({'left':setObjName.startLeft, 'top':setObjName.startTop, 'opacity':setObjName.startOpacity});
			}
		}
	}
	
	YTCarousel.prototype.prev = function(){
		this.autoPlay();
		if(this._isAnimate){
			if(this._index !== 0){
				this._index = this._index-1;
				this.doAnimate("prev", (this._index+1));
			}
		}
	}
	
	YTCarousel.prototype.next = function(){
		this.autoPlay();
		if(this._index !== (this._count-1)){
			if(this._isAnimate){
				this._index = this._index+1;
				this.doAnimate("prev", (this._index-1));
			}
		}
		else{
			this._index = 0;
			this.doAnimate("prev", (this._count-1));
		}
	}
	
	YTCarousel.prototype.outAnimate = function(getIndex){
		var animateTime,
			p = 0;
		var objLenght = Object.getOwnPropertyNames(this.settings.itemObject[getIndex]).length;
		var k = (objLenght - 1);
		
		
		for(k; k >= 0; k--)
		{
			var getObjName = Object.getOwnPropertyNames(this.settings.itemObject[getIndex])[k];
			switch(getObjName) {
				case "obj1":
					setObjName = this.settings.itemObject[getIndex].obj1
				break;
				case "obj2":
					setObjName = this.settings.itemObject[getIndex].obj2
				break;
				case "obj3":
					setObjName = this.settings.itemObject[getIndex].obj3
				break;
				case "obj4":
					setObjName = this.settings.itemObject[getIndex].obj4
				break;
				case "obj5":
					setObjName = this.settings.itemObject[getIndex].obj5
				break;
				case "obj6":
					setObjName = this.settings.itemObject[getIndex].obj6
				break;
				case "obj7":
					setObjName = this.settings.itemObject[getIndex].obj7
				break;
				default:
			}
			animateTime += setObjName.startTime;
			this._children.eq(getIndex).find('.' + getObjName).delay(animateTime).animate({
				left: setObjName.startLeft,
				top: setObjName.startTop,
				opacity: setObjName.startOpacity
			}, setObjName.startTime, setObjName.animateName, $.proxy(function(e) {
				p = p + 1;
				if(p === objLenght)
				{
					setTimeout($.proxy(function(e){
						this.change(300);
					},this),300) 
				}
			},this));
		}
	}
	
	YTCarousel.prototype.inAnimate = function(getIndex){
		this._isAnimate = false;
		this.setObjectPosition("next", getIndex);
		var animateTime,
			t = 0;
		var objLenght = Object.getOwnPropertyNames(this.settings.itemObject[getIndex]).length;
		for(var i = 0; objLenght > i; i++)
		{
			var getObjName = Object.getOwnPropertyNames(this.settings.itemObject[getIndex])[i];
			
			switch(getObjName) {
				case "obj1":
					setObjName = this.settings.itemObject[getIndex].obj1
				break;
				case "obj2":
					setObjName = this.settings.itemObject[getIndex].obj2
				break;
				case "obj3":
					setObjName = this.settings.itemObject[getIndex].obj3
				break;
				case "obj4":
					setObjName = this.settings.itemObject[getIndex].obj4
				break;
				case "obj5":
					setObjName = this.settings.itemObject[getIndex].obj5
				break;
				case "obj6":
					setObjName = this.settings.itemObject[getIndex].obj6
				break;
				case "obj7":
					setObjName = this.settings.itemObject[getIndex].obj7
				break;
				default:
			}
			animateTime += setObjName.startTime;
			this._children.eq(getIndex).find('.' + getObjName).delay((i === 0 ? 0 : (animateTime-setObjName.endTime))).animate({
				left: setObjName.endLeft,
				top: setObjName.endTop,
				opacity: setObjName.endOpacity
			}, setObjName.endTime, setObjName.animateName, $.proxy(function(e) {
				t = t + 1;
				if(t === objLenght)
				{
					this._isAnimate = true;
				}
			},this));
		}
	}
	
	YTCarousel.prototype.doAnimate = function(direction, getIndex){
		if(direction === "prev"){ this.outAnimate(getIndex); }
		else if("start"){ this.inAnimate(getIndex); }
		else{ this.outAnimate(getIndex); }
	}

	$.fn.ytCarousel = function(option) {
		return this.each(function() {
			var $this = $(this), data = $this.data('yt__carousel');
			if(!data){
				data = new YTCarousel(this, typeof option == 'object' && option);
				$this.data('yt__carousel', data);
			}
		});	
	};

	$.fn.ytCarousel.Constructor = YTCarousel;

})(window.jQuery, window, document);