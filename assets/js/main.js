var yt = yt || {};
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    WebOs: function() {
        return navigator.userAgent.match(/WebOs/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.WebOs() || isMobile.Windows());
    }
};

yt = {
	
    init : function(){

        wW = $(window).width();
        wH = $(window).height();


    }, //init


    home :{
        init : function() {},
        resize: function () {}
    },
    contact :{
        init : function() {},
        resize: function () {}
    },
    resize :{
		init : function() { }
    },
	load :{
		init : function() {
			$('#wrapper').removeClass('displayNone');
			var itemOptions = [
				{
					obj1: {
						startLeft:'0%',
						endLeft:'45%',
						startTop:'20%',
						endTop:'50%',
						startOpacity:1,
						endOpacity:1,
						startTime:500,
						endTime:500,
						animateName:"easeOutExpo"
					},
					obj2: {
						startLeft:'20%',
						endLeft:'35%',
						startTop:'40%',
						endTop:'60%',
						startOpacity:1,
						endOpacity:1,
						startTime:500,
						endTime:500,
						animateName:"easeOutQuint"
					},
					obj3: {
						startLeft:'40%',
						endLeft:'70%',
						startTop:'100%',
						endTop:'60%',
						startOpacity:1,
						endOpacity:1,
						startTime:500,
						endTime:500,
						animateName:"easeInCubic"
					}
				},
				{
					obj1: {
						startLeft:'0%',
						endLeft:'45%',
						startTop:'20%',
						endTop:'50%',
						startOpacity:1,
						endOpacity:1,
						startTime:500,
						endTime:500,
						animateName:"easeInQuart"
					},
					obj2: {
						startLeft:'20%',
						endLeft:'35%',
						startTop:'40%',
						endTop:'60%',
						startOpacity:1,
						endOpacity:1,
						startTime:500,
						endTime:500,
						animateName:"easeInOutBack"
					},
				},
				{
					obj1: {
						startLeft:'10%',
						endLeft:'45%',
						startTop:'20%',
						endTop:'50%',
						startOpacity:1,
						endOpacity:1,
						startTime:500,
						endTime:500,
						animateName:"easeOutBounce"
					},
					obj2: {
						startLeft:'20%',
						endLeft:'35%',
						startTop:'40%',
						endTop:'60%',
						startOpacity:1,
						endOpacity:1,
						startTime:500,
						endTime:500,
						animateName:"easeOutExpo"
					},
				},
				{
					obj1: {
						startLeft:'10%',
						endLeft:'45%',
						startTop:'20%',
						endTop:'50%',
						startOpacity:1,
						endOpacity:1,
						startTime:500,
						endTime:500,
						animateName:"easeOutExpo"
					},
					obj2: {
						startLeft:'20%',
						endLeft:'35%',
						startTop:'40%',
						endTop:'60%',
						startOpacity:1,
						endOpacity:1,
						startTime:500,
						endTime:500,
						animateName:"easeOutExpo"
					},
				}
			]
			
			
			$('.banner__carousel').ytCarousel({
				animationTime:6000,
				auto:true,
				itemObject:itemOptions
			});
			
			
		}
	}
	
	
};

$(function(){

	yt.init();
	
}); //ready

$(window).on('load', function(){
	yt.load.init();
});
$(window).on('resize', function(){
	yt.resize.init();
});