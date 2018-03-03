
var LanmeiAirlinesSiteMap = {
	init:function(){
		this.toggleMap();
		this.addEvent();
	},

	/* 展开和收缩网站地图 */
	toggleMap:function(){
		$('.js-title-toggle').click(function(){
			var $img = $(this).children('img');
			if($($img[0]).css('display')=='none' && $($img[1]).css('display')=='none'){
							
			}else{
				$(this).children('img').toggle();
			}
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