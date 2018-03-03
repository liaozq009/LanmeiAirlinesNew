
var LanmeiAirlinesSiteMap = {
	init:function(){
		this.toggleMap();
		this.addEvent();
	},

	/* 展开和收缩网站地图 */
	toggleMap:function(){
		$('.js-title-toggle').click(function(){
			$(this).find('img').toggle();
			$(this).siblings('.site-map-content').slideToggle('400');
		});
	},

	/* 其他事件 */
	addEvent:function(){
		// 点击查询
	},
};

$(document).ready(function($) {
	LanmeiAirlinesSiteMap.init();
});