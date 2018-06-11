
var LanmeiAirlines = {
	init:function(){
		this.otherEvent();
	},
	otherEvent:function(){
		var winWidth = $(window).width();
		if(winWidth>992){
			$('.js-hotSearch-box li:nth-child(12n+1)').css('margin-left','0');
			$('.js-searchList-wrap .searchList-box:nth-child(3n+2)').addClass('searchList-center');
		}
	},
}

$(function() {
	LanmeiAirlines.init();
});