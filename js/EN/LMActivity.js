
$(document).ready(function(){

	// $.ajax({
	//     type: "POST",
	//     url: "../memberDay/DisData.jhtml",
	//     async: false,
	//     dataType: "json",
	//     data: {

	//     },
	//     success: function (data) {
	//     	var endDate = '07/03/2018 21:00:00';
	//     	var curDate = '06/29/2018 10:50:00';
	//     	// 首页倒计时
	//     	$('.js-countdown').downCount({
	//     	    date: endDate,
	//     	    curDate:curDate,
	//     	    offset: +7, //时区偏移值
	//     	}, function () {
	//     	     $('.js-countdown li').hide();
	//     	     $('.js-countdown .activity-day').html('Activity has started !').show();
	//     	});
	//     }
	// });

	// $('.lm-activity-tips>span').html('Happy Lanmei Saturday !');
	$('.lm-activity-tips>span').html('Lanmei Member Day!');
	var startDate = '07/04/2018 09:20:22';
	var curDate = '07/04/2018 09:20:20';
	// 首页倒计时
	$('.js-countdown').downCount({
	    date: startDate,
	    curDate:curDate,
	    offset: +7, //时区偏移值
	}, function () {
	     $('.js-countdown li').hide();
	     $('.js-countdown .activity-day').html('Activity has started ! <a href="http://192.168.1.19/LanmeiAirlinesNew/tpls/EN/LMMemberActive-Tue.html" target="_blank"></a>').show();
	});

	// 周二会员日
	function layerMember(src,href){
	    layer.open({
	        type: 1, //Page层类型
	        area: ['680px', 'auto'],
	        title: false,
	        shadeClose: true, //点击遮罩关闭
	        shade: 0.6, //遮罩透明度
	        maxmin: false, //允许全屏最小化
	        anim: 1, //0-6的动画形式，-1不开启
	        content: '<a href='+href+'><img src='+src+' class="lm-memberActive-Tue"/></a>'
	    });
	};

	// 周六
	// layerMember("https://lanmeiairlines.com/upload/image/201809/1cn11.jpg","#scroll-anchors");

	// 双送
	// layerMember("https://lanmeiairlines.com/upload/image/201809/en7.jpg","http://lanmeiairlines.com/lanmeiairlines2.0/default/tpls/EN/LMFreeActivity.html");

	// 周二
	// layerMember("https://lanmeiairlines.com/upload/image/201806/2en.jpg","https://lanmeiairlines.com/memberDay/memberActivePage.jhtml?language=EN");
});
