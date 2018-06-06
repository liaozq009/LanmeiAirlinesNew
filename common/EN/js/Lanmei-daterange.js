
//检测此前是否已经引入了jquery.js
if(!window.jQuery){
	throw new Error("本函数库必须依赖于jQuery");
}

;(function($,window,document,undefined){
	//需要设置为直接的名字
	var pluginName = "simpleDate";
	//默认配置项
	var defaults = {
		single : true,
	};
	//插件类
	function Plugin(element,options){
		//拿到dom元素，获得对应jq对象，要$(element)
		this.element = $(element);
		//覆盖默认配置项
		this.options = $.extend({},defaults,options);
		
		this.single = options.single;
		this.container = options.container;

		//调用初始函数
		this.init();
	}
	Plugin.prototype.init = function(){
		//做你想做的事情
		/*
		1、初始化事件，比如点击触发事件
		2、构建DOM
		3、绑定事件
		 */
		var formatDate = function(num) { //日期格式化
		    return num < 10 ? (num = '0' + num) : num;
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
		};

		var today = new Date();
		var todayTime = formatDate(today.getDate()) + ' ' + formatMonth((today.getMonth() + 1));
		var startTimeStr = new Date(today.getTime() + 86400000 * 1);
		// var dateTime = $('#f_time').val();
		// var startTimeStr = new Date(new Date(dateTime).getTime()); 
		var startTimeInit =  startTimeStr.getFullYear()+ '-' +(startTimeStr.getMonth() + 1)+ '-' + formatDate(startTimeStr.getDate());
		var startTime = formatDate(startTimeStr.getDate()) + ' ' + formatMonth((startTimeStr.getMonth() + 1));
		var endTimeStr = new Date(today.getTime() + 86400000 * 2);
		var endTimeInit =  endTimeStr.getFullYear()+ '-' +(endTimeStr.getMonth() + 1)+ '-' + formatDate(endTimeStr.getDate());
		var endTime = formatDate(endTimeStr.getDate()) + ' ' + formatMonth((endTimeStr.getMonth() + 1));
		var maxTime = formatDate(today.getDate()) + ' ' + formatMonth((today.getMonth() + 1));

		// 初始化日期的值
		if (this.single) {
		    this.element.attr('data-start',startTimeInit);
		} else {
		    this.element.attr('data-start',startTimeInit);
		    this.element.attr('data-end',endTimeInit);
		}
		
		var that = this;
		this.element.daterangepicker({
		    parentEl:thas.container,
		    format: 'D MMM',
		    startDate: startTime,
		    endDate: endTime,
		    minDate: todayTime,
		    // maxDate:'2018-06-02',
		    singleDatePicker: thas.single, //单日期
		    singleDatePicker_2: true, //单日期单日历
		    outsideClickHide: true, //点击空白隐藏日期控件
		    showDateTitle: false,
		    showDropdowns: false, //下拉选择月份和年份
		    showWeekNumbers: false, //显示周
		    autoApply: true, //自动关闭日期
		    language :'en',
		    },function(start, end, label) {//格式化日期显示框  
		        $('.cityMenu-wrap').hide();
		        if (this.singleDatePicker) {
		            that.element.html(start.format('D MMM'));
		            that.element.attr('data-start',start.format('YYYY-MM-DD'));
		        } else {
		            that.element.html(start.format('D MMM') + ' - ' + end.format('D MMM'));
		            that.element.attr('data-start',start.format('YYYY-MM-DD')).attr('data-end',end.format('YYYY-MM-DD'));
		        }
		    }
		);

		// 隐藏日期的apply和cancel按钮
		$('.js-date-ok').hide();
	};
	
	//fn就是prototype
	$.fn[pluginName] = function(options){
		//each表示对多个元素调用，用return 是为了返回this，进行链式调用
		return this.each(function(){
			//判断有没有插件名字 如果你不愿意加if 直接new就好了
			if(!$.data(this,'plugin_'+pluginName)){
				//生成插件类实例。
				$.data(this,'plugin_'+pluginName,new Plugin(this,options));
			}
		});
	};
})(jQuery,window,document);