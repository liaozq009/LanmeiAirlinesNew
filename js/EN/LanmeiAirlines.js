
var LanmeiAirlines = {
	init:function(){
		this.ticketSelect();
		this.otherEvent();
	},

	/* 机票选择 */
	ticketSelect:function(){
		// 日期选择--动态加载
		var formatDate = function(num) { //日期格式化
			return num < 10 && (num = '0' + num);
		};

		var formatMonth = function(month){
			var monthEn;
			switch (month) {
				case 1: monthEn = 'Jan';break;
				case 2: monthEn = 'Feb';break;
				case 3: monthEn = 'Mar';break;
				case 4: monthEn = 'Apr';break;
				case 5: monthEn = 'May';break;
				case 6: monthEn = 'Jun';break;
				case 7: monthEn = 'Jul';break;
				case 8: monthEn = 'Aug';break;
				case 9: monthEn = 'Sep';break;
				case 10: monthEn = 'Oct';break;
				case 11: monthEn = 'Nov';break;
				case 12: monthEn = 'Dec';break;
			}
			return monthEn;
		}

		var today  = new Date();
		var todayTime = formatMonth((today.getMonth()+1))+' '+formatDate(today.getDate());
		var startTimeStr = new Date(today.getTime()+86400000*1); 
		var startTime = formatMonth((startTimeStr.getMonth()+1))+' '+formatDate(startTimeStr.getDate());  
		var endTimeStr = new Date(today.getTime()+86400000*2); 
		var endTime = formatMonth((endTimeStr.getMonth()+1))+' '+formatDate(endTimeStr.getDate());
		var maxTime = formatMonth((today.getMonth()+1))+' '+formatDate(today.getDate());
		
		$('.js-date-result').daterangepicker({
			parentEl:'.popup-date',
			format: 'MMM D',
			startDate: startTime,
			endDate: endTime,
			minDate: todayTime,
			// maxDate:'2018-06-02',
      singleDatePicker: false, //单日期
      showDropdowns: false, //下拉选择月份和年份
      showWeekNumbers: false, //显示周
      autoApply: true, //自动关闭日期
			language :'en',
		},function(start, end, label) {//格式化日期显示框  
				if(this.singleDatePicker){
					$('.js-date-result').html(start.format('MMM D'));
				}else{
					$('.js-date-result').html(start.format('MMM D') + ' - ' + end.format('MMM D'));
				}
		  } 
		);
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

