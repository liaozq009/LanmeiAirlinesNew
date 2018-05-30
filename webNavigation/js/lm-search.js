
var LanmeiAirlines = {
	init:function(){
		this.otherEvent();
	},
	otherEvent:function(){
		$('.js-hotSearch-box li:nth-child(10n+1)').css('margin-left','0');
		$('.js-searchList-wrap .searchList-box:nth-child(3n+2)').addClass('searchList-center');
	},
}

$(function() {
	LanmeiAirlines.init();
});