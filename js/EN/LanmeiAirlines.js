
var LanmeiAirlines = {
	init:function(){
		this.otherEvent();
	},


	/* 后期优化新增 */
	otherEvent:function(){
		// 首屏自适应高度
		var winHeight = $(window).height();
		$('.js-section-main').height(winHeight);
	},
};

$(function() {
	LanmeiAirlines.init();
});

