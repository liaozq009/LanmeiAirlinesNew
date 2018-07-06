$(document).ready(function(){
	$('.lm-activity-tips>span').html('澜湄周二会员日！');
	// $('.lm-activity-tips>span').html('澜湄周六特惠-放肆嗨！');
	var startDate = '07/04/2018 09:20:22';
	var curDate = '07/04/2018 09:20:20';
	// 首页倒计时
	$('.js-countdown').downCount({
	    date: startDate,
	    curDate:curDate,
	    offset: +7, //时区偏移值
	}, function () {
	     $('.js-countdown li').hide();
	     $('.js-countdown .activity-day').html('活动已开始！<a href="https://lanmeiairlines.com/memberDay/memberActivePage.jhtml?language=CN" target="_blank"></a>').show();
	});

	// 周二会员日
	layer.open({
	  type: 1, //Page层类型
	  area: ['680px', 'auto'],
	  title: false,
	  shadeClose: true, //点击遮罩关闭
	  shade: 0.6, //遮罩透明度
	  maxmin: false, //允许全屏最小化
	  anim: 1, //0-6的动画形式，-1不开启
	  content: '<a href="https://lanmeiairlines.com/memberDay/memberActivePage.jhtml?language=CN" target="_blank"><img src="https://lanmeiairlines.com/upload/image/201806/1cn.jpg" class="lm-memberActive-Tue" style=""/></a>'
	}); 
});