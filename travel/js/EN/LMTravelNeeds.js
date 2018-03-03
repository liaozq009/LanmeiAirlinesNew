
var LMTravelNeeds = {
	init:function(){
		this.timeSelect();
		this.moneySelect();
		this.hotelSelect();
		this.otherEvent();
	},

	/* 时间选择 */
	timeSelect:function(){
		$('#js-timeModal').modal();
		
		// 跳到金额模态框
		$('.js-time-next').click(function(){
			$('#js-timeModal').modal('hide');
			$('#js-moneyModal').modal();
		});
		$('.js-money-back').click(function(){
			$('#js-timeModal').modal('show');
			$('#js-moneyModal').modal('hide');
		});
		$('.js-money-next').click(function(){
			$('#js-hotelModal').modal();
			$('#js-moneyModal').modal('hide');
		});
		$('.js-hotel-back').click(function(){
			$('#js-hotelModal').modal('hide');
			$('#js-moneyModal').modal('show');
		});
		$('.js-hotel-next').click(function(){
			$('#js-hotelModal').modal('hide');
		});

		// 日期选择
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
		var endTimeStr = new Date(today.getTime()+86400000*3); 
		var endTime = formatDate(endTimeStr.getFullYear()+'-'+(endTimeStr.getMonth()+1)+'-'+(endTimeStr.getDate()));
		var minTime = parseInt((today.getTime()-86400000*1)/1000); 
		
		// 判断屏幕大小展示不同的日期格式
		// 判断屏幕大小展示不同的日期格式
		var winW = $(window).width();
		var dateRange = function(calNum){
			new pickerDateRange('select-date', {
				isTodayValid : true,
				startDate : startTime,
				endDate : endTime,
				minValidDate: minTime,
				// maxValidDate:
				stopToday : false, //和maxValidDate配合使用
				isTodayValid:true,//判断今天是否可选
				maxValidDate: 'maxTime',
				needCompare : false,
				defaultText : ' - ',
				autoSubmit : true,
				alwaysShow:false, //日期是否一直展示
				inputTrigger : 'input_trigger1',
				theme : 'ta',
				calendars:calNum,
				success : function(obj) {
					// console.log('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
				}
			});
		}

		if(winW>767){
			dateRange(2);
		}else{
			dateRange(1);
		}
	},

	/* 价钱选择 */
	moneySelect:function(){
		// 费用区间选择
		var rangeSlider = function(min,max){
			$('.range-slider').jRange({
				from: min,
				to: max,
				step: 50,
				showScale:false,
				format: '%s',
				width: 480,
				showLabels: true,
				isRange : true
			});
		}
		rangeSlider(0,1000);

		//其他金额， 注：金额选择放在jquery.range.js中
		$('.p-editor-money .max-money').change(function(){
			var optionVal = $('.p-editor-money .max-money  option:selected').val();  
			var $select = $('.slider-container,.p-editor-money .min-money,.p-editor-money .max-money');
			var $range = $('.range-slider');
			var $rangBtn = $('.s-range-btn');
			var $moneySymbol = $('.momey-symbol');

			$range.val('').click();

			// 只能输入数字
			$range.keyup(function(event) {
				$(this).val($(this).val().replace(/[^\d]/ig,''));
			});

			if(optionVal=='0'){
				$range.show();
				$select.hide();
				$moneySymbol.hide();
				$rangBtn.show();
			}else{
				$range.hide();
				$select.show();
			}

			// 返回范围选择
			$rangBtn.click(function(){
				$(this).hide();
				$range.hide();
				$moneySymbol.show();
				$select.show();
			});
		});
	},

	/* 酒店选择 */
	hotelSelect:function(){
		$('.h-scale-panel').jSingle({
			from: 0,
			to: 20,
			step: 1,
			format: '%s',
			showScale:false,
			width: 356,
			showLabels: true,
		});
	},

	/* 其他事件 */
	otherEvent:function(){
		
	},
};

$(document).ready(function($) {
	LMTravelNeeds.init();
});
