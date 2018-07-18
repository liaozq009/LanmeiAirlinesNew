
$(document).ready(function(){

	/* 日期选择--动态加载 */
	var formatDate = function(ymd) { //日期格式化
	    return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function(ymdFormatDate, y, m, d){
	        m < 10 && (m = '0' + m);
	        d < 10 && (d = '0' + d);
	        return y + '-' + m + '-' + d;
	    });
	};
	var today  = new Date();
	var startTimeStr = new Date(today.getTime()+86400000*1); 
	var startTime = formatDate(startTimeStr.getFullYear()+'-'+(startTimeStr.getMonth()+1)+'-'+startTimeStr.getDate());  

	/* 转盘抽奖 */
	var rotateTimeOut = function (){
	    $('#rotate').rotate({
	        angle:0,
	        animateTo:2160,
	        duration:8000,
	        callback:function (){
	            alert('网络超时，请检查您的网络设置！');
	        }
	    });
	};

	var bRotate = false;
	var rotateFn = function (result,angles,txt){
		 bRotate = !bRotate; //防止频繁重复点击
	    $('#lm-rotate').stopRotate();

	    $('#lm-rotate').rotate({
	        angle:0,
	        animateTo:angles+1800,
	        duration:6000,
	        callback:function (){
	            if(result=='succ'){
	            	$('.js-coupon-result').html(txt);
		            $('#succModal').modal();
	            }else if(result=='fail'){
	            	$('#failModal').modal();
	            }
	            bRotate = !bRotate; //释放点击
	        }
	    })
	};

	// 模态框隐藏后才可以继续抢购
	// $('#activityTipsModal,#succModal,#failModal,#nextOpportunityModal').on('hidden.bs.modal', function (e) {
	//   bRotate = !bRotate; //释放点击
	// })

	$('.lm-pointer').click(function (){
	    if(bRotate)return;

	    // 往后台请求，返回的值为随机数、角度和中奖信息，结果返回后开始调用rateFn
	    var item = rnd(0,7);
	    // var angle = {['fail',0,'谢谢参与！'],['succ',45,'100USD'],['fail',90,'谢谢参与！'],['succ',135,'50USD'],['succ',180,'40USD'],['fail',225,'谢谢参与！'],['succ',270,'30USD'],['succ',315,'20USD']};
	    // rotateFn(135, '未中奖');
	    // 获取结果
        switch (item) {
            case 0:
                rotateFn('fail' , 0, '谢谢参与！');
                break;
            case 1:
                rotateFn('succ' , 45, '650RMB');
                break;
            case 2:
                rotateFn('fail' , 90, '谢谢参与！');
                break;
            case 3:
                rotateFn('succ' , 135, '325RMB');
                break;
            case 4:
                rotateFn('succ' ,180, '260RMB');
                break;
            case 5:
                rotateFn('fail', 225, '谢谢参与！');
                break;
            case 6:
                rotateFn('succ', 270, '195RMB');
                break;
            case 7:
                rotateFn('succ', 315, '130RMB');
                break;
        }
	});

	function rnd(n, m){
	    return Math.floor(Math.random()*(m-n+1)+n)
	}

	/* 点击提示框中的登录或者注册 */
	$('.js-register-btn').click(function(){
		$('#activityTipsModal').modal('hide');
		$('#registerModal').modal();
	});
	$('.js-login-btn').click(function(){
		$('#activityTipsModal').modal('hide');
		$('#logonModal').modal();
	});

	// $('#activityTipsModal').modal();
	// $('#nextOpportunityModal').modal();
	$('#activityLoginModal').modal();

	//关闭模态框
	$('.activityTipsModal-close').click(function(event) {
		$('#activityTipsModal').modal('hide');
	});
	$('.activityLoginModal-close').click(function(event) {
		$('#activityLoginModal').modal('hide');
	});
	$('.succModal-close').click(function(event) {
		$('#succModal').modal('hide');
	});
	$('.failModal-close').click(function(event) {
		$('#failModal').modal('hide');
	});
	$('.nextOpportunityModal-close').click(function(event) {
		$('#nextOpportunityModal').modal('hide');
	});

	/* 倒计时 */
	var clock = $('.lm-clock').FlipClock({
        clockFace: 'DailyCounter',
        autoStart: false,
        language: 'chinese',
        callbacks: {
        	stop: function() {
        		// console.log('开始抢购！');
        	}
        }
    });

    var currentDate = function () {
        // get client's current date
        var date = new Date();

        // turn date to utc 得到国际标准时间  
        var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

        // set new Date object 时区的偏移量,后面的8为东八区
        var new_date = new Date(utc + (3600000*8));

        return new_date;
    };

	// var target_date = new Date('2017/11/11 11:11:00').getTime();
	var target_date = new Date('2018/7/3 20:00:00').getTime();
	var current_date = currentDate().getTime();

	 var difference =  Math.floor((target_date - current_date)/1000);
	 // console.log(difference);
	 if(difference>0){
	    clock.setTime(difference);
	 }
    clock.setCountdown(true);
    clock.start();

});
