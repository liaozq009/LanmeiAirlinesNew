
$(document).ready(function(){
	function getServerDate(){
	    return new Date($.ajax({async: false}).getResponseHeader("Date"));
	}
	// 首页倒计时
	$('.js-countdown').downCount({
	    date: '06/30/2018 00:00:00',
	    offset: +8, //时区偏移值
	}, function () {
	     $('.js-countdown .activity-day').html('Activity has started !');
	});
});
