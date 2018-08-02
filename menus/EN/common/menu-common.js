var lmMenuCom = {
	init:function(){
		this.otherEvent();
	},

	/* 其他事件 */
	otherEvent:function(){
		/* 语言选择 */
		var $langMenu = $('.js-lang-menu');
		$('.js-h-lang').mouseenter(function(event) {
			$langMenu.show();
		}).mouseleave(function(event) {
			$langMenu.hide();
		});
		$('.js-choose-lang').click(function(e) {
			e.stopPropagation();
			$('.js-lang-menu').show();
		});

		/* 电话 */
		var $phoneMenu = $('.js-phone-menu');
		$('.js-h-phone').mouseenter(function(event) {
			$phoneMenu.show();
		}).mouseleave(function(event) {
			$phoneMenu.hide();
		});
		$('.js-h-phone').click(function(e) {
			e.stopPropagation();
			$('.js-phone-menu').show();
		});
		$('html').click(function(event) {
			$('.js-lang-menu').hide();
			$('.js-phone-menu').hide();
		});

		// 日期选择--动态加载
		var formatDate = function(ymd) { //日期格式化
		    return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function(ymdFormatDate, y, m, d){
		        m < 10 && (m = '0' + m);
		        d < 10 && (d = '0' + d);
		        return y + '-' + m + '-' + d;
		    });
		};
		var today  = new Date();
		var startTimeStr = new Date(today.getTime()+86400000*1); 
		var startTime = formatDate(startTimeStr.getFullYear()+'-'+(startTimeStr.getMonth()+1)+'-'+startTimeStr.getDate());  //新增代码2017-10-09
		// 搜索航班跳转
		$('.a-search-flight').click(function(event) {
			event.preventDefault();
			window.open('http://b2c.lanmeiairlines.com/lqWeb/reservation/AVQuery.do?orgcity=PNH&dstcity=CAN&language=US&CURRENCY=USD&tripType=OW&takeoffDate='+startTime+'&cabinType=ECONOMY&adultCount=1&childCount=0&returnDate=');
			// window.location.href = 'http://b2c.lanmeiairlines.com/lqWeb/reservation/AVQuery.do?orgcity=PNH&dstcity=CAN&language=US&CURRENCY=USD&tripType=OW&takeoffDate='+startTime+'&cabinType=ECONOMY&adultCount=1&childCount=0&returnDate=';
		});
	},
};

$(document).ready(function($) {
	lmMenuCom.init();
});