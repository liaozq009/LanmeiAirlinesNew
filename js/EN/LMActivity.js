
$(document).ready(function(){
	function getServerDate(){
	    return new Date($.ajax({async: false}).getResponseHeader("Date"));
	}

	var formatDateTime = function (date) {  
	    var y = date.getFullYear();  
	    var m = date.getMonth() + 1;  
	    m = m < 10 ? ('0' + m) : m;  
	    var d = date.getDate();  
	    d = d < 10 ? ('0' + d) : d;  
	    var h = date.getHours();  
	    h=h < 10 ? ('0' + h) : h;  
	    var minute = date.getMinutes();  
	    minute = minute < 10 ? ('0' + minute) : minute;  
	    var second=date.getSeconds();  
	    second=second < 10 ? ('0' + second) : second;  
	    // return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
	    return m + '/' + d + '/' + y+' '+h+':'+minute+':'+second;  
	};  


	console.log(formatDateTime(getServerDate()));

	var endDate = '06/28/2018 15:00:00';
	// 首页倒计时
	$('.js-countdown').downCount({
	    date: endDate,
	    offset: +7, //时区偏移值
	}, function () {
	     $('.js-countdown .activity-day').html('Activity has started !');
	});
});
