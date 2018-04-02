
var LanmeiAirlines = {
	fromCityData: ['Sihanoukville/KOS/Cambodia','Macao/MFM/Macao,China','Phnom Penh/PNH/Cambodia','Siem Reap/REP/Cambodia','Ho Chi Minh/SGN/Vietnam','Hanoi/HAN/Vietnam','HongKong/HKG/HongKong,China','SEOUL/ICN/Korea','Bangkok/BKK/Thailand','Shijiazhuang/SJW/China','Singapore/SIN/Singapore'],
	toCityData: ['Sihanoukville/KOS/Cambodia','Macao/MFM/Macao,China','Phnom Penh/PNH/Cambodia','Siem Reap/REP/Cambodia','Ho Chi Minh/SGN/Vietnam','Hanoi/HAN/Vietnam','HongKong/HKG/HongKong,China','SEOUL/ICN/Korea','Bangkok/BKK/Thailand','Shijiazhuang/SJW/China','Singapore/SIN/Singapore'],
	hotelCityData: ['Hong Phann Guest House','Phkar Chhouk Tep Monireth Hotel','Tt Guest House','Phkar Chhouk Tep 2 Hotel'],
	fNumberData: ['LQ9503','LQ503','LQ9502','LQ502','LQ806','LQ807'],
	indexLiFrom: 0, //定义键盘移动index 
	indexLiTo: 0,
	init:function(){
		this.selectPeople();
		this.selectHotelRooms();
		this.banner();
		this.selectCoupons();
		this.lowestFares();
		this.recommendTravel();
		this.recommendHotel();
		this.lmNews();
		this.otherEvent();
		this.isPc();
		this.isIE();
	},

	/* 判断是PC端还是移动端 */
	isPc:function(){
		// 判断手机端或者PC端
		function IsPC() {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone"];
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break;
				}
			}
			return flag;
		}

		var flag = IsPC(); //true为PC端，false为手机端

		if(flag){
			this.pcEvent();
			this.leftAside();
			this.asideMenu();
			this.ticketSelect();
		}else{
			this.mobileEvent();
			this.mLeftAside();
			this.mAsideMenu();
			this.mTicketSelect();
		}
	},

	/* 判断ie版本 */
	isIE:function(){
		// ie兼容性判断
		if(document.all && document.addEventListener && !window.atob){ // IE9
			
		}else if (document.all && document.querySelector && !document.addEventListener) { //IE8
			var screen = window.screen.width;
			if(screen<=1480){
				$('.content-com-wrap').hide();
				$('.js-ticket-content').width(700);
				$('.flight-com').css('top',100);
			}
		}
	},

	/* PC端事件 */
	pcEvent:function(){
		// 定义滚动条
		var nice = $("html").niceScroll({
			cursorborderradius: 0,
			cursorwidth: "8px",
			cursorfixedheight: 150,
			cursorcolor: "#8ec060",
			zindex: 9999,
			cursorborder: 0,
			scrollspeed: 26,
			mousescrollstep: 36,
		});

		/* 澜湄服务背景特效 */
		$(window).scroll(function(){
			var sTop = $(window).scrollTop();
			var offsetTop = $('.js-section-service').offset().top; //总高度
			var scrollTop = $(document).scrollTop(); //隐藏高度
			var windowHeight = $(window).height();//可见窗口

			var totleH = scrollTop+windowHeight;

			if(totleH>=offsetTop && totleH<=offsetTop+windowHeight+300){
				var y = totleH-offsetTop;
				$('.js-section-service').css('backgroundPosition','center '+(parseInt(y/3)-660)+'px');
			}else{
				// console.log(222);
				// $('.section-4').css('backgroundPosition','center 0');
			}
		});
	},

	/* 移动端事件 */
	mobileEvent:function(){
		$('.js-h-lang>img').click(function(e) {
			e.stopPropagation();
			$(this).siblings('.js-lang-menu').show();
		});
		$('.js-h-phone>img').click(function(e) {
			e.stopPropagation();
			$(this).siblings('.js-phone-menu').show();
		});
		$('html').click(function(event) {
			$('.js-phone-menu,.js-lang-menu').hide();
		});

		$('.js-from-input,.js-to-input,.js-hotel-from').attr('readonly','readonly');
		$('.js-select-way').css('visibility','visible');
		$('.js-select-way').addClass('animated fadeInUp');
	},

	/* 导航栏 */
	asideMenu:function(){
		var $container = $('.js-nav-container');
		var $firstMenu = $('.js-nav-first');
		var $secondMenu = $('.js-nav-second');
		var $threeMenu = $('.js-nav-three');
		var winWidth = $(window).width();

		// 关闭侧边栏方法
		var closeAside = function(){
			if(winWidth>992){
				$container.width(270);
				$secondMenu.css('left',-300);
				$threeMenu.css('left',-300);
				$container.css('left',-270);
			}else{
				$container.width(240);
				$secondMenu.css('left',-260);
				$threeMenu.css('left',-260);
				$container.css('left',-240);
			}
			$('.js-nav-first li,.js-nav-second li').removeClass('active');
		};

		// 打开导航栏
		$('.js-h-menu').click(function(e){
			e.stopPropagation();
			$container.css('left',0);
		});
		$('.js-menu-close').click(function(event) {
			closeAside();
		});

		// 阻止冒泡
		$container.click(function(e) {
			e.stopPropagation();
		});
		$('html').click(function(event) {
			closeAside();
		});

		// 点击一级菜单
		$('.js-nav-first a').click(function(event) {
			if(winWidth>992){
				$container.width(570);
				$secondMenu.css('left',270);
				$threeMenu.css('left',-300);
			}else{
				$container.width(500);
				$secondMenu.css('left',240);
				$threeMenu.css('left',-260);
			}

			$(this).parent('li').addClass('active').siblings('li').removeClass('active');
			var id = $(this).attr('href');
			$(id).show().siblings('ul').hide();
			$('.js-nav-second li').removeClass('active');
		});

		// 点击二级菜单
		$('.js-nav-second a').click(function(event) {
			if(!$(this).attr('data-href')){
				if(winWidth>992){
					$container.width(870);
					$threeMenu.css('left',570);
				}else{
					$container.width(760);
					$threeMenu.css('left',500);
				}

				$(this).parent('li').addClass('active').siblings('li').removeClass('active');
				var id = $(this).attr('href');
				$(id).show().siblings('ul').hide();
			}
		});
	},

	/* 移动端导航栏切换 */
	mAsideMenu:function(){
		var $container = $('.js-nav-container');
		var $box = $('.js-nav-box');
		var $backSecond = $('.js-navBack-second');
		var $backThree = $('.js-navBack-three');
		var $close = $('.js-menu-close');
		var $firstMenu = $('.js-nav-first');
		var $secondMenu = $('.js-nav-second');
		var $threeMenu = $('.js-nav-three');
		var $setting = $('.js-nav-settings');
		var $mask = $('.js-nav-mask');
		var winWidth = $(window).width();

		// 关闭侧边栏方法
		var closeAside = function(){
			$container.css('left',-270);
			$mask.hide();
		};

		// 打开导航栏
		$('.js-h-menu').click(function(e){
			e.stopPropagation();
			$container.css('left',0);
			$mask.show();
		});
		$close.click(function(event) {
			closeAside();
			$mask.hide();
		});

		// 阻止冒泡
		$container.click(function(e) {
			e.stopPropagation();
		});
		$mask.click(function(event) {
			closeAside();
		});

		// 点击一级菜单
		$('.js-nav-first a').click(function(event) {
			$close.hide();
			$backSecond.show();
			$firstMenu.css('left',270);
			$setting.fadeOut();
			$secondMenu.css('left',0);

			var id = $(this).attr('href');
			$(id).show().siblings('ul').hide();
		});

		// 点击二级菜单
		$('.js-nav-second a').click(function(event) {
			if(!$(this).attr('data-href')){
				$backSecond.hide();
				$backThree.show();
				$secondMenu.css('left',270);
				$threeMenu.css('left',0);

				var id = $(this).attr('href');
				$(id).show().siblings('ul').hide();
			}
		});

		// 返回到一级菜单
		$backSecond.click(function(event) {
			$close.show();
			$backSecond.hide();
			$firstMenu.css('left',0);
			$setting.fadeIn();
			$secondMenu.css('left',-270);
		});
		// 返回到二级菜单
		$backThree.click(function(event) {
			$backThree.hide();
			$backSecond.show();
			$threeMenu.css('left',-270);
			$secondMenu.css('left',0);
		});


	},

	/* 左侧边栏切换 */
	leftAside:function(){
		var $slide = $('.js-aside-flight>li>a');
		var $blurImg = $('.js-aside-blur>img');
		var $loader = $('.js-flight-loading');
		// 滑动动画
		function animate(top){
			$('.li-slide').animate({top:top}, 300);
		}

		var that = this;
		$slide.click(function(){
			$loader.fadeIn();
			$(this).addClass('active').parent().siblings().children('a').removeClass('active');

			var href = $(this).attr('data-href');
			switch (href) {
				case "ticket-content":
				$('.js-flight-com').hide();
				$('.js-ticket-wrap').show();
				animate(30);
				$blurImg.fadeOut();
				$loader.fadeOut();
				$('.blur-img-ticket').fadeIn();
				break;
				case "hotel-content":
				$('.js-flight-com').hide();
				$('.js-hotel-wrap').show();
				animate(130);
				$blurImg.fadeOut();
				$('.blur-img-hotel').fadeIn();
				$loader.fadeOut();
				break;
				case "car-content":
				$('.js-flight-com').hide();
				$('.js-car-wrap').show();
				animate(230);
				$blurImg.fadeOut();
				$('.blur-img-car').fadeIn();
				$loader.fadeOut();
				break;
				case "flight-content":
				$('.js-flight-com').hide();
				$('.js-fStatus-wrap').show();
				animate(330);
				$blurImg.fadeOut();
				$('.blur-img-flight').fadeIn();
				$loader.fadeOut();
				break;
			}
		}).one('click',function(){
			var href = $(this).attr('data-href');
			switch (href) {
				case "ticket-content":

				break;
				case "hotel-content":
				that.hotelSelect();
				break;
				case "car-content":

				break;
				case "flight-content":
				that.fStatusSelect();
				break;
			}
		});
	},

	/* 移动端左侧边栏切换 */
	mLeftAside:function(){
		var that = this;
		var $slide = $('.js-aside-flight>li>a');
		var $loader = $('.js-flight-loading');
		// 滑动动画
		$slide.click(function(){
			$loader.fadeIn();
			$(this).addClass('active').parent().siblings().children('a').removeClass('active');

			var href = $(this).attr('data-href');
			switch (href) {
				case "ticket-content":
				$('.js-flight-com').hide();
				$('.js-ticket-wrap').show();
				$loader.fadeOut();
				break;
				case "hotel-content":
				$('.js-flight-com').hide();
				$('.js-hotel-wrap').show();
				$loader.fadeOut();
				break;
				case "car-content":
				$('.js-flight-com').hide();
				$('.js-car-wrap').show();
				$loader.fadeOut();
				break;
				case "flight-content":
				$('.js-flight-com').hide();
				$('.js-fStatus-wrap').show();
				$loader.fadeOut();
				break;
			}
		}).one('click',function(){
			var href = $(this).attr('data-href');
			switch (href) {
				case "ticket-content":

				break;
				case "hotel-content":
				that.mHotelSelect();
				break;
				case "car-content":

				break;
				case "flight-content":
				that.mfStatusSelect();
				break;
			}
		});
	},

	/* 日期选择 */
	dateSelect:function(single,id,container,showTotleDay,box,dateBox,peopleBox,showDateTitle1,showDateTitle2){
		// 日期选择
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

		var winWidth = $(window).width();

		var today = new Date();
		var todayTime = formatDate(today.getDate()) + ' ' + formatMonth((today.getMonth() + 1));
		var startTimeStr = new Date(today.getTime() + 86400000 * 1);
		var startTimeInit =  startTimeStr.getFullYear()+ '-' +(startTimeStr.getMonth() + 1)+ '-' + formatDate(startTimeStr.getDate());
		var startTime = formatDate(startTimeStr.getDate()) + ' ' + formatMonth((startTimeStr.getMonth() + 1));
		var endTimeStr = new Date(today.getTime() + 86400000 * 2);
		var endTimeInit =  endTimeStr.getFullYear()+ '-' +(endTimeStr.getMonth() + 1)+ '-' + formatDate(endTimeStr.getDate());
		var endTime = formatDate(endTimeStr.getDate()) + ' ' + formatMonth((endTimeStr.getMonth() + 1));
		var maxTime = formatDate(today.getDate()) + ' ' + formatMonth((today.getMonth() + 1));

		// 初始化日期的值
		if (single) {
			$(id).attr('data-start',startTimeInit);
		} else {
			$(id).attr('data-start',startTimeInit);
			$(id).attr('data-end',endTimeInit);
		}
		
		var that = this;
		$(id).daterangepicker({
			parentEl:container,
			format: 'D MMM',
			startDate: startTime,
			endDate: endTime,
			minDate: todayTime,
			// maxDate:'2018-06-02',
      singleDatePicker: single, //单日期
      showTotleDay: showTotleDay, //是否显示已经选择的天数
      showDateTitle: true,
      showDateTitle1:showDateTitle1,
      showDateTitle2:showDateTitle2,
      showDropdowns: false, //下拉选择月份和年份
      showWeekNumbers: false, //显示周
      autoApply: true, //自动关闭日期
      language :'en',
		},function(start, end, label) {//格式化日期显示框  
			if (this.singleDatePicker) {
				$(id).html(start.format('D MMM'));
				$(id).attr('data-start',start.format('YYYY-MM-DD'));
			} else {
				$(id).html(start.format('D MMM') + ' - ' + end.format('D MMM'));
				$(id).attr('data-start',start.format('YYYY-MM-DD')).attr('data-end',end.format('YYYY-MM-DD'));
			}

				// 操作外层box移动
				if(showTotleDay){ //酒店
					if(winWidth>1300){
						box.css('left',610);
						that.changeWidth();
						setTimeout(function(){
							box.addClass('hotelPeople-popup-box'); //移动before小箭头
						},600);
					}else if(winWidth<=1300){
						box.css({'top':-10,'left':-90});
						setTimeout(function(){
							box.addClass('hotelPeople-popup-box'); //移动before小箭头
						},600);
					}
				}else{
					if(peopleBox!=='0'){
						if(winWidth>1300){
							box.css('left',950);
						}else if(winWidth<=1300){
							box.css({'top':-10,'left':350});
						}
					}
				} 
				if(peopleBox!=='0'){
					dateBox.slideUp(function(){ //日期地隐藏
						peopleBox.slideDown(); //人数显示
					}); 
				}else{
					$('.js-fStatusPopup-content').removeClass('popup-active').addClass('popup-inactive'); 
					$('.js-fStatusPopup-box').removeClass('popup-box-before'); //隐藏小箭头
				}
			} 
			);
	},

	/* 简洁日期选择 */
	simpleDate:function(single,id,container){
		// 日期选择
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

		var winWidth = $(window).width();

		var today = new Date();
		var todayTime = formatDate(today.getDate()) + ' ' + formatMonth((today.getMonth() + 1));
		var startTimeStr = new Date(today.getTime() + 86400000 * 1);
		var startTimeInit =  startTimeStr.getFullYear()+ '-' +(startTimeStr.getMonth() + 1)+ '-' + formatDate(startTimeStr.getDate());
		var startTime = formatDate(startTimeStr.getDate()) + ' ' + formatMonth((startTimeStr.getMonth() + 1));
		var endTimeStr = new Date(today.getTime() + 86400000 * 2);
		var endTimeInit =  endTimeStr.getFullYear()+ '-' +(endTimeStr.getMonth() + 1)+ '-' + formatDate(endTimeStr.getDate());
		var endTime = formatDate(endTimeStr.getDate()) + ' ' + formatMonth((endTimeStr.getMonth() + 1));
		var maxTime = formatDate(today.getDate()) + ' ' + formatMonth((today.getMonth() + 1));

		// 初始化日期的值
		if (single) {
			$(id).attr('data-start',startTimeInit);
		} else {
			$(id).attr('data-start',startTimeInit);
			$(id).attr('data-end',endTimeInit);
		}
		
		var that = this;
		$(id).daterangepicker({
			parentEl:container,
			format: 'D MMM',
			startDate: startTime,
			endDate: endTime,
			minDate: todayTime,
			// maxDate:'2018-06-02',
	    singleDatePicker: single, //单日期
	    showDateTitle: true,
	    showDropdowns: false, //下拉选择月份和年份
	    showWeekNumbers: false, //显示周
	    autoApply: true, //自动关闭日期
	    language :'en',
		},function(start, end, label) {//格式化日期显示框  
			if (this.singleDatePicker) {
				$(id).html(start.format('D MMM'));
				$(id).attr('data-start',start.format('YYYY-MM-DD'));
			} else {
				$(id).html(start.format('D MMM') + ' - ' + end.format('D MMM'));
				$(id).attr('data-start',start.format('YYYY-MM-DD')).attr('data-end',end.format('YYYY-MM-DD'));
			}
		});
	},

	/* 移动端日期选择 */
	mDateSelect:function(single,id,container,showTotleDay){
		// 日期选择
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

		var winWidth = $(window).width();

		var today = new Date();
		var todayTime = formatDate(today.getDate()) + ' ' + formatMonth((today.getMonth() + 1));
		var startTimeStr = new Date(today.getTime() + 86400000 * 1);
		var startTimeInit =  startTimeStr.getFullYear()+ '-' +(startTimeStr.getMonth() + 1)+ '-' + formatDate(startTimeStr.getDate());
		var startTime = formatDate(startTimeStr.getDate()) + ' ' + formatMonth((startTimeStr.getMonth() + 1));
		var endTimeStr = new Date(today.getTime() + 86400000 * 2);
		var endTimeInit =  endTimeStr.getFullYear()+ '-' +(endTimeStr.getMonth() + 1)+ '-' + formatDate(endTimeStr.getDate());
		var endTime = formatDate(endTimeStr.getDate()) + ' ' + formatMonth((endTimeStr.getMonth() + 1));
		var maxTime = formatDate(today.getDate()) + ' ' + formatMonth((today.getMonth() + 1));

		// 初始化日期的值
		if (single) {
			$(id).attr('data-start',startTimeInit);
		} else {
			$(id).attr('data-start',startTimeInit);
			$(id).attr('data-end',endTimeInit);
		}
		
		var that = this;
		$(id).daterangepicker({
			parentEl:container,
			format: 'D MMM',
			startDate: startTime,
			endDate: endTime,
			minDate: todayTime,
			// maxDate:'2018-06-02',
      singleDatePicker: single, //单日期
      showTotleDay: showTotleDay, //是否显示已经选择的天数
      showDateTitle: true,
      showDropdowns: false, //下拉选择月份和年份
      showWeekNumbers: false, //显示周
      autoApply: true, //自动关闭日期
      language :'en',
		},function(start, end, label) {//格式化日期显示框  
			if (this.singleDatePicker) {
				$(id).html(start.format('D MMM'));
				$(id).attr('data-start',start.format('YYYY-MM-DD'));
			} else {
				$(id).html(start.format('D MMM') + ' - ' + end.format('D MMM'));
				$(id).attr('data-start',start.format('YYYY-MM-DD')).attr('data-end',end.format('YYYY-MM-DD'));
			}
			$('.popup-container').removeClass('is-show');
			$('html,body').removeClass('ovfHiden'); //使网页可滚动
		});
	},

	/* 模糊匹配 */
	autoComplete:function(id){
		var that = this;
		/* 机票模糊匹配 */
		$(id).on('input',function(event) {
			var searchText = $(this).val();
			var currenData;
			var data = $(this).attr('data');

			switch (data) {
				case 'js-from-menu':
					currenData=that.fromCityData
					break;
				case 'js-routeFrom-menu':
					currenData=that.fromCityData
					break;
				case 'js-to-menu':
					currenData=that.toCityData
					break;
				case 'js-routeTo-menu':
					currenData=that.toCityData
					break;
				case 'js-fNumber-menu':
					currenData=that.fNumberData
					break;
			}

			var currentVal = searchText.toLowerCase();
			var srdata = [];
			for (var i = 0; i < currenData.length; i++) {
				if (currentVal.trim().length > 0 && currenData[i].toLowerCase().indexOf(currentVal) > -1) {
					srdata.push(currenData[i]);
				}
			}

			$('.'+data).empty();
			var escapedSearchText,zregex,startpos,text,searchVal;
			$.each(srdata,function(i,val){
				escapedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
				zregex = new RegExp(escapedSearchText, 'i');
				startpos = val.search(zregex);
				text = val.substr(0, startpos + searchText.length) + '</span>' + val.substr(startpos + searchText.length);
				searchVal = text.substr(0, startpos) + '<span>' + text.substr(startpos);

				$('.'+data).append('<li title="'+val+'">'+searchVal+'</li>');
			});
			if(srdata.length==0){ 
				$('.'+data).append('<li>No results match "'+searchText+'"</li>');
			}
			if(currentVal===''){
				$('.'+data).empty();
				$.each(currenData,function(i,val){
					$('.'+data).append('<li title="'+val+'">'+val+'</li>');
				});
			}
		});
	},

	/* 键盘事件 */
	keyEvent:function(input,ul,indexLi){
		var that = this;
		var $box = $('.js-popup-box'); //c3动画最外层
		var $fromBox = $('.js-airport-from'); //出发地外层
		var $dateBox = $('.js-popup-date'); //日期外层
		var $toBox = $('.js-airport-to'); //目的地外层
		var $fromInput = $('.js-from-input'); //机票出发地
		var $toInput = $('.js-to-input'); //机票目的地
		var $toMenuSub = $('.js-to-menu'); //目的地下拉菜单

		/* 设置出发地的值 */
		var fromCityVal = function(text1,text2){ 
			$fromInput.val(text2[0]+'/'+text2[1]);
			$box.css('left',350);
			var tocityArr = that.toCityData;
			tocityArr.remove(text1);

			$toMenuSub.empty();
			$.each(tocityArr,function(i,val){
				$toMenuSub.append('<li title="'+val+'">'+val+'</li>');
			});
			$toInput.focus();
			$('.js-to-menu>li:first').addClass('active');
			keyDown('.js-to-input','.js-to-menu',that.indexLiTo); //绑定键盘事件

			$fromBox.slideUp(function(){ //出发地隐藏
				$toBox.slideDown(); //目的地显示
			}); 
		};

		/* 设置目的地的值 */
		var toCityVal = function(text1,text2){
			$toInput.val(text2[0]+'/'+text2[1]);
			$box.css('left',700);

			$toBox.slideUp(function(){ //出发地隐藏
				$('.js-date-result').click(); //日期展示
				$dateBox.slideDown(); //目的地显示
			}); 
		};

		/* 键盘上下选择城市 */
		var keyDown = function(input,ul,indexLi){
			var $input = $(input);

			// 定义UL下拉菜单
			var $fUl = $(ul);

			function keychang(up){
				if(up == "up"){ //向上
					if(indexLi == 0){
						indexLi = $fUl.children().length-1;
					}else{
						indexLi--;
					}
				}else{//向下
					if(indexLi ==  $fUl.children().length-1){
						indexLi = 0;
					}else{
						indexLi++;
					}
				}
				$fUl.children('li').eq(indexLi).addClass("active").siblings('li').removeClass('active');		
			}

			//按键盘的上下移动LI的背景色
			$input.keydown(function(event){
				if(event.which == 38){//向上
					event.preventDefault();
					keychang("up");
				}else if(event.which == 40){//向下
					keychang();
				}else if(event.which == 13){ //回车
					var text1 = $fUl.children().eq(indexLi).attr('title');
					var text2 = text1.split('/');
					if(input=='.js-from-input'){
						fromCityVal(text1,text2);
					}else if(input=='.js-to-input'){
						toCityVal(text1,text2);
					}
				}
			});	
		};
		keyDown(input,ul,indexLi);
	},

	/* 机票选择 */
	ticketSelect:function(){
		/* 最外层div */
		var $mask = $('.js-ticket-mask'); //遮罩层
		var $mask2 = $('.js-ticket-mask2'); //遮罩层2
		var $box = $('.js-popup-box'); //c3动画最外层
		var $content = $('.js-popup-content'); //c3动画内容
		
		// 输入框
		var $fromInput = $('.js-from-input'); //机票出发地
		var $toInput = $('.js-to-input'); //机票目的地
		var $date = $('.js-date-result'); //机票日期
		var $people = $('.js-ticket-people'); //机票人数

		// 下拉菜单
		var $fromMenuSub = $('.js-from-menu'); //机票出发地下拉菜单
		var $toMenuSub = $('.js-to-menu'); //目的地下拉菜单
		var $ticketChange = $('.js-ticket-change'); //切换机票出发地和目的地

		// 下拉菜单外层
		var $fromBox = $('.js-airport-from'); //出发地外层
		var $toBox = $('.js-airport-to'); //目的地外层
		var $dateBox = $('.js-popup-date'); //日期外层
		var $peopleBox = $('.js-popup-people'); //人数选择外层
		
		/* 切换状态 */
		var $selectWay = $('.js-select-way'); //选择单程往返
		
		/* 第一个div，点击后展示其他div */
		var $ticketFrom = $('.js-ticket-from'); //出发地div
		var $zoom = $('.js-ticket-to,.js-ticket-date,.js-ticket-people,.js-ticket-cancel,.js-ticket-search');
		
		var $popupContent = $('.popup-content'); 

		/* c3动画 */
		var popupShow = function(){
			$mask.fadeIn(); //显示遮罩层
			$mask2.fadeIn(); //显示遮罩层
			$ticketChange.show(); //显示出发地和目的地切换
			$box.addClass('popup-box-before'); //展示小箭头
			$content.removeClass('popup-inactive').addClass('popup-active'); 
		};
		var popupHide = function(){
			$content.removeClass('popup-active').addClass('popup-inactive'); 
			$box.removeClass('popup-box-before'); //隐藏小箭头
		};
		
		/* 日期选择 */
		var that = this;
		this.dateSelect(false,'.js-date-result','.js-popup-date',false,$box,$dateBox,$peopleBox,'Choose your departure date :','Choose your return date :');
		
		/* 单程往返切换 */
		$('.js-select-way>a').click(function(event) {
			event.stopPropagation();
			$(this).addClass('active').siblings('a').removeClass('active');
			var data = $(this).attr('data-way');
			switch (data) {
				case 'round':
				that.dateSelect(false,'.js-date-result','.js-popup-date',false,$box,$dateBox,$peopleBox,'Choose your departure date :','Choose your return date :');
					$('.js-date-result').click(); //日期展示
					break;
					case 'one':
					that.dateSelect(true,'.js-date-result','.js-popup-date',false,$box,$dateBox,$peopleBox,'Choose your departure date :','Choose your return date :');
					$('.js-date-result').click(); //日期展示
					break;
				}
			});

		/* 出发地和目的地切换 */
		$ticketChange.click(function(event) {
			var fVal = $fromInput.val();
			var tVal = $toInput.val();
			$fromInput.val(tVal);
			$toInput.val(fVal);
		});

		/* 获取屏幕尺寸 */
		var winWidth = $(window).width();

		/* 定义出发地和目的地的值 */
		var fromCityData = ['Sihanoukville/KOS/Cambodia','Macao/MFM/Macao,China','Phnom Penh/PNH/Cambodia','Siem Reap/REP/Cambodia','Ho Chi Minh/SGN/Vietnam','Hanoi/HAN/Vietnam','HongKong/HKG/HongKong,China','SEOUL/ICN/Korea','Bangkok/BKK/Thailand','Shijiazhuang/SJW/China','Singapore/SIN/Singapore'];
		var toCityData = ['Sihanoukville/KOS/Cambodia','Macao/MFM/Macao,China','Phnom Penh/PNH/Cambodia','Siem Reap/REP/Cambodia','Ho Chi Minh/SGN/Vietnam','Hanoi/HAN/Vietnam','HongKong/HKG/HongKong,China','SEOUL/ICN/Korea','Bangkok/BKK/Thailand','Shijiazhuang/SJW/China','Singapore/SIN/Singapore'];

		/* 设置出发地的值 */
		var fromCityVal = function(text1,text2){ 
			$fromInput.val(text2[0]+'/'+text2[1]);
			$box.css('left',350);
			var tocityArr = that.toCityData;
			tocityArr.remove(text1);

			$toMenuSub.empty();
			$.each(tocityArr,function(i,val){
				$toMenuSub.append('<li title="'+val+'">'+val+'</li>');
			});
			$toInput.focus();
			$('.js-to-menu>li:first').addClass('active');

			$fromBox.slideUp(function(){ //出发地隐藏
				$toBox.slideDown(); //目的地显示
			}); 
		};

		/* 设置目的地的值 */
		var toCityVal = function(text1,text2){
			$toInput.val(text2[0]+'/'+text2[1]);
			$box.css('left',700);

			$toBox.slideUp(function(){ //出发地隐藏
				$('.js-date-result').click(); //日期展示
				$dateBox.slideDown(); //目的地显示
			}); 
		};

		/* 点击机票出发地 */
		var zoomShow = true;
		var oneClick = true;
		$fromInput.click(function(){
			if(oneClick){ //防止点击取消后，快速点击出发地产生的bug
				// alert(window.screen.width);
				// alert(winWidth);
				if(winWidth>1300){
					$box.css('left',0);
				}else if(winWidth<=1300){
					$box.css({'top':-88,'left':0});
				}
				popupShow(); //增加c3动画

				$fromBox.show();
				$toBox.hide(); $dateBox.hide(); $peopleBox.hide();

				$popupContent.css('z-index','1'); //覆盖cancel按钮
				if(zoomShow){
					$selectWay.css({'height':'auto','margin-top':'40px'}).addClass('animated fadeInUp'); //展示单程往返
					$zoom.addClass('animated fadeInUp').css('visibility','visible');
					zoomShow = false; //重新点击出发地时再次显示目的地、日期、人数的动画
					setTimeout(function(){
						$zoom.removeClass('animated fadeInUp');
					}, 2200);
				}
			}
		}).one('click',function(){
			$fromMenuSub.empty();
			$.each(fromCityData,function(i,val){
				$fromMenuSub.append('<li title="'+val+'">'+val+'</li>');
			});
			// $('.js-from-menu>li:first').addClass('active');
			that.keyEvent('.js-from-input','.js-from-menu',that.indexLiFrom); //绑定键盘事件
		});

		/* 点击机票目的地 */
		$toInput.click(function(e){
			var fromVal = $fromInput.val();
			$toMenuSub.empty();
			if(fromVal==''){
				$toMenuSub.append('<li title="No results found">No results found</li>');
			}else{
				var tocityArr = toCityData;
				tocityArr.remove(fromVal);

				$toMenuSub.empty();
				$.each(tocityArr,function(i,val){
					$toMenuSub.append('<li title="'+val+'">'+val+'</li>');
				});
				// $('.js-to-menu>li:first').addClass('active');
			}
			if(winWidth>1300){
				$box.css('left',350);
			}else if(winWidth<=1300){
				$box.css({'top':-88,'left':350});
			}
			popupShow(); //增加c3动画
			$popupContent.css('z-index','1'); //覆盖cancel按钮
			$toBox.show();
			$fromBox.hide(); $dateBox.hide(); $peopleBox.hide();
		});

		/* 点击机票日期 */
		$date.click(function(event) {
			if(winWidth>1300){
				$box.css('left',700);
			}else if(winWidth<=1300){
				$box.css({'top':-10,'left':0});
			}
			popupShow(); //增加c3动画
			$popupContent.css('z-index','1'); //覆盖cancel按钮
			$dateBox.show();
			$fromBox.hide(); $toBox.hide(); $peopleBox.hide();
		});

		/* 点击机票人数 */
		$people.click(function(event) {
			if(winWidth>1300){
				$box.css('left',950);
			}else if(winWidth<=1300){
				$box.css({'top':-10,'left':350});
			}
			popupShow(); //增加c3动画
			$popupContent.css('z-index','1'); //覆盖cancel按钮
			$peopleBox.show();
			$fromBox.hide(); $toBox.hide(); $dateBox.hide();
		});

		/* 点击取消 */
		var cancel = function(){
			oneClick = false; //防止快速点击出发地

			$zoom.addClass('animated fadeOutDown');

			$selectWay.css({'height':'0','margin-top':'0'}).addClass('animated fadeOutDown'); //隐藏单程往返

			$mask.fadeOut(); //隐藏遮罩层
			$mask2.fadeOut(); //隐藏遮罩层

			popupHide(); //隐藏弹出内容层
			$ticketChange.hide(); //隐藏出发地和目的地切换

			zoomShow = true; //重新点击出发地时再次显示目的地、日期、人数的动画

			$box.css('left',0); //下拉框归零
			setTimeout(function(){
				$zoom.removeClass('animated fadeOutDown');

				$selectWay.removeClass('animated fadeOutDown');

				$zoom.css('visibility','hidden');

	      oneClick = true; //可以继续点击出发地
	    }, 2200);
		};

		/* 点击遮罩层 */
		$mask.click(function(){
			cancel();
		});
		$mask2.click(function(){
			popupHide(); //隐藏弹出内容层
			$(this).fadeOut();
		});
		$('.js-select-way,.js-tips-com').click(function(event) {
			popupHide(); //隐藏弹出内容层
			$mask2.fadeOut();
		});

		/* 点击取消 */
		$('.js-ticket-cancel').click(function(){
			cancel();
		});

		/* 删除数组中某个元素 */
		Array.prototype.indexOf = function (val) {
			for(var i = 0; i < this.length; i++){
				if(this[i] == val){return i;}
			}
			return -1;
		};
		Array.prototype.remove = function (val) {
			var index = this.indexOf(val);
			if(index > -1){this.splice(index,1);}
		};

		/* 机票出发地选择 */
		$fromMenuSub.on('click','>li',function(){
			var text1 = $(this).attr('title');
			var text2 = text1.split('/');
			fromCityVal(text1,text2);
		});

		/* 机票目的地选择 */
		$toMenuSub.on('click','>li',function(){
			var text = $(this).html().split('/');
			$toInput.val(text[0]+'/'+text[1]);
			if(winWidth>1300){
				$box.css('left',700);
			}else if(winWidth<=1300){
				$box.css({'top':-10,'left':0});
			}
			$toBox.slideUp(function(){ //出发地隐藏
				$('.js-date-result').click(); //日期展示
				$dateBox.slideDown(); //目的地显示
			}); 
		});

		// 模糊匹配
		this.autoComplete('.js-from-input');
		this.autoComplete('.js-to-input');

	},

	/* 移动端机票选择 */
	mTicketSelect:function(){
		var that = this;

		// 最外层容器
		var $container = $('.js-popup-container');
		var $box = $('.js-popup-box');

		// 关闭容器按钮
		var $close = $('.js-popup-close');

		// 出发地和目的地外层
		var $cityFrom = $('.js-ticket-from');
		var $cityTo = $('.js-ticket-to');

		// 输入框
		var $fromInput = $('.js-from-input'); //机票出发地
		var $fromSpan = $('.js-m-Fcity');
		var $toInput = $('.js-to-input'); //机票目的地
		var $toSpan = $('.js-m-Tcity');
		var $date = $('.js-date-result'); //机票日期
		var $people = $('.js-ticket-people'); //机票人数

		var $searchInput = $('.js-city-search'); //模糊搜索框
		var $searchTitle = $('.js-popup-title'); //标题

		// 下拉菜单
		var $fromMenuSub = $('.js-from-menu'); //机票出发地下拉菜单
		var $toMenuSub = $('.js-to-menu'); //目的地下拉菜单
		var $ticketChange = $('.js-ticket-change'); //切换机票出发地和目的地

		var winHeight = $(window).height();

		var hideContainer = function(){
			$container.removeClass('is-show');
			$('html,body').removeClass('ovfHiden'); //使网页可滚动
		};
		var ovfHiden = function(){
			$('html,body').addClass('ovfHiden'); //使网页不可滚动
		};

		// 关闭弹出框
		$close.click(function(event) {
			hideContainer();
		});

		// 点击出发地
		$cityFrom.click(function(event) {
			$fromMenuSub.empty();
			$('.js-popup-content>div').hide(); //初始化隐藏出发地、目的地、日期、人数
			$('.js-airport-from').show();
			var toVal = $toInput.attr('data-city'); //获取目的地的值进行过滤
			$.each(that.fromCityData,function(i,val){
				$fromMenuSub.append('<li title="'+val+'">'+val+'</li>');
			});
			$fromMenuSub.children('li:contains('+toVal+')').remove(); //过滤

			ovfHiden(); //使网页不可滚动
			$box.height(winHeight-108);
			$searchInput.attr('data','js-from-menu').val('');
			$searchTitle.html('Select origin');

			$container.addClass('is-show');
		});

		// 机票出发地选择 
		$fromMenuSub.on('click','>li',function(){
			var text1 = $(this).attr('title');
			var text2 = text1.split('/');
			$fromInput.val(text2[1]).attr('data-city',text1).parent().addClass('m-city-result');
			$fromSpan.text(text2[0]+'/'+text2[2]);
			hideContainer();
		});

		// 点击目的地
		$cityTo.click(function(event) {
			$toMenuSub.empty();
			$('.js-popup-content>div').hide(); //初始化隐藏出发地、目的地、日期、人数
			$('.js-airport-to').show();
			var fromVal = $fromInput.attr('data-city'); //获取出发地的值进行过滤
			$.each(that.toCityData,function(i,val){
				$toMenuSub.append('<li title="'+val+'">'+val+'</li>');
			});

			$toMenuSub.children('li:contains('+fromVal+')').remove(); //过滤

			ovfHiden(); //使网页不可滚动
			$box.height(winHeight-108);
			$searchInput.attr('data','js-to-menu').val('');
			$searchTitle.html('Select destination');

			$container.addClass('is-show');
		});

		// 机票目的地选择 
		$toMenuSub.on('click','>li',function(){
			var text1 = $(this).attr('title');
			var text2 = text1.split('/');
			$toInput.val(text2[1]).attr('data-city',text1).parent().addClass('m-city-result');
			$toSpan.text(text2[0]+'/'+text2[2]);
			hideContainer();
		});

		// 出发地和目的地切换
		$('.js-mTicket-change').click(function(event) {
			var fVal = $fromInput.val();
			var fSpan = $fromSpan.text();
			var tVal = $toInput.val();
			var tSpan = $toSpan.text();
			$fromInput.val(tVal); $fromSpan.text(tSpan);
			$toInput.val(fVal); $toSpan.text(fSpan);
		});

		// 模糊匹配
		this.autoComplete('.js-city-search');

		// 日期选择
		this.mDateSelect(false,'.js-date-result','.js-popup-date',false);
		$date.click(function(event) {
			$('.js-popup-content>div').hide(); //初始化隐藏出发地、目的地、日期、人数
			$('.js-popup-date').show();

			ovfHiden(); //使网页不可滚动

			$searchInput.hide();
			$searchTitle.text('Select dates');
			$box.height(winHeight-58);

			$container.addClass('is-show');
		});

		// 单程往返切换 
		$('.js-select-way>a').click(function(event) {
			event.stopPropagation();
			$(this).addClass('active').siblings('a').removeClass('active');
			var data = $(this).attr('data-way');
			switch (data) {
				case 'round':
					that.mDateSelect(false,'.js-date-result','.js-popup-date',false);
					break;
					case 'one':
					that.mDateSelect(true,'.js-date-result','.js-popup-date',false);
					break;
				}
			});

		// 人数选择
		$people.click(function(event) {
			$('.js-popup-content>div').hide(); //初始化隐藏出发地、目的地、日期、人数
			$('.js-popup-people').show();
			ovfHiden(); //使网页不可滚动
			$searchInput.hide();
			$searchTitle.text('Select people');
			$box.height(winHeight-58);
			$container.addClass('is-show');
		});
		// 确认人数选择
		$('.js-mSelect-people').click(function(event) {
			hideContainer();
		});
	},

	/* 酒店选择 */
	hotelSelect:function(){
		var $mask = $('.js-hotel-mask'); //遮罩层
		var $mask2 = $('.js-hotel-mask2'); //遮罩层2
		var $hotelBox = $('.js-hotelPopup-box'); //酒店c3动画最外层
		var $hotelContent = $('.js-hotelPopup-content'); //酒店c3动画内容

		/* 输入框 */
		var $hotelFromInput = $('.js-hotelFrom-input'); //酒店出发地
		var $hotelDate = $('.js-hotelDate-result'); //酒店日期
		var $hotelPeople = $('.js-hotel-people'); //酒店人数

		/* 下拉菜单 */
		var $hotelFromMenuSub = $('.js-hotelFrom-menu'); //酒店出发地下拉菜单

		/* 下拉菜单外层 */
		var $hotelFromBox = $('.js-hotelPopup-from'); //酒店出发地外层
		var $hotelDateBox = $('.js-hotelPopup-date'); //酒店日期外层
		var $hotelPeopleBox = $('.js-hotelPopup-people'); //酒店人数选择外层

		/* 点击第一个div,然后显示其他div  */
		var $hotelFrom = $('.js-hotel-from'); //酒店出发地div
		var $hotelZoom = $('.js-hotel-date,.js-hotel-people,.js-hotel-cancel,.js-hotel-search');

		/* css3动画 */
		var hotelPopupShow = function(){
			$mask.fadeIn(); //显示遮罩层
			$mask2.fadeIn(); //显示遮罩层
			$hotelBox.addClass('popup-box-before'); //展示小箭头
			$hotelContent.removeClass('popup-inactive').addClass('popup-active'); 
		};
		var hotelPopupHide = function(){
			$hotelContent.removeClass('popup-active').addClass('popup-inactive'); 
			$hotelBox.removeClass('popup-box-before'); //隐藏小箭头
		};

		/* 日期选择 */
		this.dateSelect(false,'.js-hotelDate-result','.js-hotelPopup-date',true,$hotelBox,$hotelDateBox,$hotelPeopleBox,'Choose your check in time :','Choose your check out time:');

		/* 获取屏幕尺寸 */
		var winWidth = $(window).width();

		/* 点击酒店出发地 */
		var hotelZoomShow = true;
		var hotelOneClick = true;
		$hotelFromInput.click(function(){
			if(hotelOneClick){ //防止点击取消后，快速点击出发地产生的bug
				if(winWidth>1300){
					$hotelBox.css('left',0);
				}else if(winWidth<=1300){
					$hotelBox.css({'top':-90,'left':0});
				}
				$('.js-hotelPopup-content').css('left',0); //防止位移偏差
				hotelPopupShow(); //增加c3动画
				$hotelBox.removeClass('hotelPeople-popup-box'); //移动before小箭头

				$hotelFromBox.show();
				$hotelDateBox.hide(); $hotelPeopleBox.hide();

				$hotelContent.css('z-index','1'); //覆盖cancel按钮
				if(hotelZoomShow){
					$hotelZoom.addClass('animated fadeInUp').css('visibility','visible');
					hotelZoomShow = false; //重新点击出发地时再次显示目的地、日期、人数的动画
					setTimeout(function(){
						$hotelZoom.removeClass('animated fadeInUp');
					}, 2200);
				}
			}
		});

		/* 点击酒店日期 */
		$hotelDate.click(function(event) {
			if(winWidth>1300){
				$hotelBox.css('left',700);
			}else if(winWidth<=1300){
				$hotelBox.css({'top':-10,'left':0});
			}
			$('.js-hotelPopup-content').css('left',0); //防止位移偏差
			hotelPopupShow(); //增加c3动画
			$hotelBox.removeClass('hotelPeople-popup-box'); //移动before小箭头
			$hotelContent.css('z-index','1'); //覆盖cancel按钮
			$hotelDateBox.show();
			$hotelFromBox.hide(); $hotelPeopleBox.hide();
		});

		/* 点击酒店人数 */
		var $that = this;
		$hotelPeople.click(function(event) {
			if(winWidth>1300){
				$hotelBox.css('left',610);
			}else if(winWidth<=1300){
				$hotelBox.css({'top':-10,'left':-90});
			}
			$that.changeWidth();
			hotelPopupShow(); //增加c3动画
			$hotelBox.addClass('hotelPeople-popup-box'); //移动before小箭头
			$hotelContent.css('z-index','1'); //覆盖cancel按钮
			$hotelPeopleBox.show();
			$hotelFromBox.hide(); $hotelDateBox.hide();
		});

		/* 点击取消 */
		var cancel = function(){
			hotelOneClick = false; //防止快速点击出发地

			$hotelZoom.addClass('animated fadeOutDown');

			$mask.fadeOut(); //隐藏遮罩层
			$mask2.fadeOut(); //隐藏遮罩层

			hotelPopupHide(); //隐藏弹出内容层

			hotelZoomShow = true; //重新点击出发地时再次显示目的地、日期、人数的动画

			$hotelBox.css('left',0); //下拉框归零
			setTimeout(function(){
				$hotelZoom.removeClass('animated fadeOutDown');
				$hotelZoom.css('visibility','hidden');
	      hotelOneClick = true; //可以继续点击出发地
	    }, 2200);
		};

		/* 点击遮罩层 */
		$mask.click(function(){
			cancel();
		});
		$mask2.click(function(){
			hotelPopupHide(); //隐藏弹出内容层
			$(this).fadeOut();
		});

		$('.js-tips-com').click(function(event) {
			hotelPopupHide(); //隐藏弹出内容层
			$mask2.fadeOut();
		});

		// 点击取消
		$('.js-hotel-cancel').click(function(){
			cancel();
		});

		/* 酒店出发地选择 */
		$hotelFromMenuSub.on('click','>li',function(){
			var text = $(this).attr('title');
			$hotelFromInput.val(text);
			if(winWidth>1300){
				$hotelBox.css('left',700);
			}else if(winWidth<=1300){
				$hotelBox.css({'top':-10,'left':0});
			}
			$hotelFromBox.slideUp(function(){ //酒店出发地隐藏
				$('.js-hotelDate-result').click(); //日期展示
				$hotelDateBox.slideDown(); //酒店日期显示
			}); 
		});

	},

	/* 移动端酒店选择 */
	mHotelSelect:function(){
		var that = this;
		var $container = $('.js-popup-container');
		var $hotelBox = $('.js-hotelPopup-box'); //酒店c3动画最外层
		var $hotelFromInput = $('.js-hotelFrom-input'); //酒店出发地
		var $hotelDate = $('.js-hotelDate-result'); //酒店日期
		var $hotelFromMenuSub = $('.js-hotelFrom-menu'); //酒店出发地下拉菜单
		var $hotelPeople = $('.js-hotel-people'); //酒店人数

		var $close = $('.js-hotelPopup-close');
		var $searchInput = $('.js-hotelCity-search'); //模糊搜索框
		var $searchTitle = $('.js-hotelPopup-title'); //标题

		var winHeight = $(window).height();

		var hideContainer = function(){
			$container.removeClass('is-show');
			$('html,body').removeClass('ovfHiden'); //使网页可滚动
		};
		var ovfHiden = function(){
			$('html,body').addClass('ovfHiden'); //使网页不可滚动
		};

		// 关闭弹出框
		$close.click(function(event) {
			hideContainer();
		});

		// 点击酒店
		$hotelFromInput.click(function(event) {
			$('.hotel-popup-content>div').hide(); //初始化隐藏出发地、目的地、日期、人数
			$('.js-hotelPopup-from').show();

			$hotelFromMenuSub.empty();
			$.each(that.hotelCityData,function(i,val){
				$hotelFromMenuSub.append('<li title="'+val+'">'+val+'</li>');
			});

			ovfHiden(); //使网页不可滚动
			$hotelBox.height(winHeight-108);
			$searchInput.val('');
			$searchTitle.html('Select destination');

			$container.addClass('is-show');
		});

		// 酒店选择 
		$hotelFromMenuSub.on('click','>li',function(){
			var text1 = $(this).attr('title');
			$hotelFromInput.val(text1);
			hideContainer();
		});

		// 日期选择
		this.mDateSelect(false,'.js-hotelDate-result','.js-hotelPopup-date',false);
		$hotelDate.click(function(event) {
			$('.js-hotelPopup-content>div').hide(); //初始化隐藏出发地、目的地、日期、人数
			$('.js-hotelPopup-date').show();

			ovfHiden(); //使网页不可滚动

			$searchInput.hide();
			$searchTitle.text('Select dates');
			$hotelBox.height(winHeight-58);

			$container.addClass('is-show');
		});

		// 房间选择
		$hotelPeople.click(function(event) {
			$('.js-hotelPopup-content>div').hide(); //初始化隐藏出发地、目的地、日期、人数
			$('.js-hotelPopup-people').show();

			ovfHiden(); //使网页不可滚动

			$searchInput.hide();
			$searchTitle.text('Select rooms');
			$hotelBox.height(winHeight-58);

			$container.addClass('is-show');
		});
		//房间保存
		$('.js-mSelect-rooms').click(function(event) {
			hideContainer();
		});

	},

	/* 航班动态选择 */
	fStatusSelect:function(){
		var $mask = $('.js-fStatus-mask'); //遮罩层
		var $mask2 = $('.js-fStatus-mask2'); //遮罩层2
		var $fStatusBox = $('.js-fStatusPopup-box'); //航班动态c3动画最外层
		var $fStatusContent = $('.js-fStatusPopup-content'); //航班动态c3动画内容

		/* 输入框 */
		var $fNumberFromInput = $('.js-fNumber-input'); //航班动态出发地
		var $routeFromInput = $('.js-routeFrom-input'); //航班动态出发地
		var $routeToInput = $('.js-routeTo-input'); //航班动态查询目的地
		var $numDate = $('.js-numDate-result'); //航班动态日期
		var $routeDate = $('.js-routeDate-result'); //航班动态日期

		/* 下拉菜单 */
		var $fNumberFromMenuSub = $('.js-fNumber-menu'); //航班号下拉菜单 --- 航班动态
		var $routeFromMenuSub = $('.js-routeFrom-menu'); //航班号下拉菜单 --- 航班动态
		var $routeToMenuSub = $('.js-routeTo-menu'); //航班号下拉菜单 --- 航班动态

		/* 下拉菜单外层 */
		var $routeFromBox = $('.js-routeBox-from'); //航班动态出发地外层
		var $routeToBox = $('.js-routeBox-to'); //航班动态目的地外层
		var $routeDateBox = $('.js-routePopup-date'); //航班动态日期外层
		var $fNumFromBox = $('.js-fNumBox-from'); //航班动态出发地外层
		var $numDateBox = $('.js-numPopup-date'); //航班动态日期外层

		/* 切换状态 */
		var $selectFlightWay = $('.js-flight-way'); //选择航班号或路线

		/* 点击第一个div，然后显示其他div  */
		var $numZoom = $('.js-fStatus-date,.js-route-cancel,.js-route-search');
		var $routeZoom = $('.js-route-from,.js-route-to,.js-route-date,.js-route-cancel,.js-route-search');

		/* css3动画 */
		var fStatusPopupShow = function(){
			$mask.fadeIn(); //显示遮罩层
			$mask2.fadeIn(); //显示遮罩层
			$fStatusBox.addClass('popup-box-before'); //展示小箭头
			$fStatusContent.removeClass('popup-inactive').addClass('popup-active'); 
		};
		var fStatusPopupHide = function(){
			$fStatusContent.removeClass('popup-active').addClass('popup-inactive'); 
			$fStatusBox.removeClass('popup-box-before'); //隐藏小箭头
		};

		/* 日期选择 */
		this.dateSelect(true,'.js-numDate-result','.js-numPopup-date',false,$fStatusBox,$numDateBox,'0','Flight flight date :','');
		this.dateSelect(true,'.js-routeDate-result','.js-routePopup-date',false,$fStatusBox,$routeDateBox,'0','Flight flight date :','');

		// 航班号和地点查询切换
		$('.js-flight-way>a').click(function(event) {
			event.stopPropagation();
			$(this).addClass('active').siblings('a').removeClass('active');
			var data = $(this).attr('data-way');
			$('.js-status-com').hide();
			$('.'+data).show();
			switch (data) {
				case 'js-by-number':
				fStatusPopupHide();
				$('.js-fStatus-date').addClass('animated fadeInUp');
				setTimeout(function(){
					$('.js-fStatus-date').removeClass('animated fadeInUp');
				}, 2200);
				break;
				case 'js-by-route':
				fStatusPopupHide();
				break;
			}
		});

		/* 获取屏幕尺寸 */
		var winWidth = $(window).width();

		/* 点击航班动态 按航班号查询 出发地 */
		var numZoomShow = true;
		var numOneClick = true;
		$fNumberFromInput.click(function(){
			if(numOneClick){ //防止点击取消后，快速点击出发地产生的bug
				if(winWidth>1300){
					$fStatusBox.css('left',0);
				}else if(winWidth<=1300){
					$fStatusBox.css({'top':-90,'left':0});
				}
				fStatusPopupShow(); //增加c3动画

				$('.js-fStatusPopup-content>div').hide();
				$fNumFromBox.show();
				// $routeFromBox.hide(); $routeToBox.hide();$numDateBox.hide();$numDateBox.hide();

				$fStatusContent.css('z-index','1'); //覆盖cancel按钮
				if(numZoomShow){
					$selectFlightWay.css({'height':'auto','margin-top':'40px'}).addClass('animated fadeInUp'); //展示单程往返
					$numZoom.addClass('animated fadeInUp').css('visibility','visible');
					numZoomShow = false; //重新点击出发地时再次显示目的地、日期、人数的动画
					setTimeout(function(){
						$numZoom.removeClass('animated fadeInUp');
					}, 2200);
				}
			}
		});

		/* 点击航班动态 按地址查询 出发地 */
		$routeFromInput.click(function(){
			if(winWidth>1300){
				$fStatusBox.css('left',0);
			}else if(winWidth<=1300){
				$fStatusBox.css({'top':-90,'left':0});
			}
			fStatusPopupShow(); //增加c3动画

			$('.js-fStatusPopup-content>div').hide();
			$routeFromBox.show();
		});

		/* 点击航班动态 按地址查询 目的地 */
		$routeToInput.click(function(){
			if(winWidth>1300){
				$fStatusBox.css('left',350);
			}else if(winWidth<=1300){
				$fStatusBox.css({'top':-90,'left':350});
			}
			fStatusPopupShow(); //增加c3动画

			$('.js-fStatusPopup-content>div').hide();
			$routeToBox.show();
		});

		/* 点击航班号日期 --- 航班动态查询 */
		$numDate.click(function(event) {
			if(winWidth>1300){
				$fStatusBox.css('left',700);
			}else if(winWidth<=1300){
				$fStatusBox.css({'top':-10,'left':0});
			}
			fStatusPopupShow(); //增加c3动画
			$fStatusContent.css('z-index','1'); //覆盖cancel按钮
			$('.js-fStatusPopup-content>div').hide();
			$numDateBox.show();
		});

		/* 点击航班号日期 --- 目的地查询 */
		$routeDate.click(function(event) {
			if(winWidth>1300){
				$fStatusBox.css('left',700);
			}else if(winWidth<=1300){
				$fStatusBox.css({'top':-10,'left':0});
			}
			fStatusPopupShow(); //增加c3动画
			$fStatusContent.css('z-index','1'); //覆盖cancel按钮
			$('.js-fStatusPopup-content>div').hide();
			$routeDateBox.show();
		});

		/* 取消 */
		var cancel = function(){
			numOneClick = false; //防止快速点击出发地

			$numZoom.addClass('animated fadeOutDown');
			$routeZoom.addClass('animated fadeOutDown');

			$selectFlightWay.css({'height':'0','margin-top':'0'}).addClass('animated fadeOutDown'); //隐藏单程往返

			$mask.fadeOut(); //隐藏遮罩层
			$mask2.fadeOut(); //隐藏遮罩层

			fStatusPopupHide(); //隐藏弹出内容层
			// $ticketChange.hide(); //隐藏出发地和目的地切换

			numZoomShow = true; //重新点击出发地时再次显示目的地、日期、人数的动画

			$fStatusBox.css('left',0); //下拉框归零
			setTimeout(function(){
				$('.js-by-number').show();
				$('.js-flight-way>a:first').addClass('active');
				$('.js-flight-way>a:last').removeClass('active');
				
				$numZoom.removeClass('animated fadeOutDown');
				$routeZoom.removeClass('animated fadeOutDown');

				$selectFlightWay.removeClass('animated fadeOutDown');

				$numZoom.css('visibility','hidden');
	      // $routeZoom.css('visibility','hidden');
	      $('.js-by-route').hide();

	      numOneClick = true; //可以继续点击出发地
	    }, 2200);
		};

		/* 点击遮罩层 */
		$mask.click(function(){
			cancel();
		});
		$mask2.click(function(){
			fStatusPopupHide(); //隐藏弹出内容层
			$(this).fadeOut();
		});

		$('.js-flight-way').click(function(event) {
			fStatusPopupHide(); //隐藏弹出内容层
			$mask2.fadeOut();
		});

		/* 点击取消 */
		$('.js-route-cancel').click(function(){
			cancel();
		});

		/* 航班号选择 --- 航班动态查询 */
		$fNumberFromMenuSub.on('click','>li',function(){
			var text = $(this).attr('title');
			$fNumberFromInput.val(text);
			if(winWidth>1300){
				$fStatusBox.css('left',700);
			}else if(winWidth<=1300){
				$fStatusBox.css({'top':-10,'left':0});
			}
			$fNumFromBox.slideUp(function(){ //酒店出发地隐藏
				$('.js-numDate-result').click(); //日期展示
				$numDateBox.slideDown(); //酒店日期显示
			}); 
		});

		/* 航班号选择 --- 出发地查询 */
		$routeFromMenuSub.on('click','>li',function(){
			var text = $(this).attr('title');
			$routeFromInput.val(text);
			if(winWidth>1300){
				$fStatusBox.css('left',350);
			}else if(winWidth<=1300){
				$fStatusBox.css({'top':-90,'left':350});
			}
			$routeFromBox.slideUp(function(){ //酒店出发地隐藏
				$routeToBox.slideDown(); //酒店日期显示
			}); 
		});

		/* 航班号选择 --- 目的地查询 */
		$routeToMenuSub.on('click','>li',function(){
			var text = $(this).attr('title');
			$routeToInput.val(text);
			if(winWidth>1300){
				$fStatusBox.css('left',700);
			}else if(winWidth<=1300){
				$fStatusBox.css({'top':-10,'left':0});
			}
			$routeToBox.slideUp(function(){ //航班动态目的地隐藏
				$('.js-routeDate-result').click(); //日期展示
				$routeDateBox.slideDown(); //酒店日期显示
			}); 
		});
	},

	/* 移动端航班动态选择 */
	mfStatusSelect:function(){
		var that = this;

		var $container = $('.js-popup-container');
		var $fStatusBox = $('.js-fStatusPopup-box'); //航班动态c3动画最外层

		/* 输入框 */
		var $fNumberFromInput = $('.js-fNumber-input'); //航班动态出发地
		var $fromSpan = $('.js-m-fRouteCity');
		var $routeFromInput = $('.js-routeFrom-input'); //航班动态出发地
		var $toSpan = $('.js-m-tRouteCity');
		var $routeToInput = $('.js-routeTo-input'); //航班动态查询目的地
		var $numDate = $('.js-numDate-result'); //航班动态日期
		var $routeDate = $('.js-routeDate-result'); //航班动态日期

		/* 下拉菜单 */
		var $fNumberFromMenuSub = $('.js-fNumber-menu'); //航班号下拉菜单 --- 航班动态
		var $routeFromMenuSub = $('.js-routeFrom-menu'); //航班号下拉菜单 --- 航班动态
		var $routeToMenuSub = $('.js-routeTo-menu'); //航班号下拉菜单 --- 航班动态

		/* 下拉菜单外层 */
		var $routeFromBox = $('.js-routeBox-from'); //航班动态出发地外层
		var $routeToBox = $('.js-routeBox-to'); //航班动态目的地外层
		var $routeDateBox = $('.js-routePopup-date'); //航班动态日期外层
		var $fNumFromBox = $('.js-fNumBox-from'); //航班动态出发地外层
		var $numDateBox = $('.js-numPopup-date'); //航班动态日期外层

		var $close = $('.js-fStatusPopup-close');
		var $searchInput = $('.js-fStatusCity-search'); //模糊搜索框
		var $searchTitle = $('.js-fStatusPopup-title'); //标题

		var winHeight = $(window).height();

		var hideContainer = function(){
			$container.removeClass('is-show');
			$('html,body').removeClass('ovfHiden'); //使网页可滚动
		};
		var ovfHiden = function(){
			$('html,body').addClass('ovfHiden'); //使网页不可滚动
		};

		// 关闭弹出框
		$close.click(function(event) {
			hideContainer();
		});

		// 航班号和地点查询切换
		$('.js-flight-way>a').click(function(event) {
			event.stopPropagation();
			$(this).addClass('active').siblings('a').removeClass('active');
			var data = $(this).attr('data-way');
			$('.js-status-com').hide();
			$('.'+data).show();
			switch (data) {
				case 'js-by-number':
				$('.js-by-number').show();
				break;
				case 'js-by-route':
				$('.js-by-route').show();
				break;
			}
		});

		// 点击航班号
		$fNumberFromInput.click(function(event) {
			$('.js-fStatusPopup-content>div').hide(); 
			$('.js-fNumBox-from').show();

			$fNumberFromMenuSub.empty();
			$.each(that.fNumberData,function(i,val){
				$fNumberFromMenuSub.append('<li title="'+val+'">'+val+'</li>');
			});

			ovfHiden(); //使网页不可滚动
			$searchInput.show();
			$fStatusBox.height(winHeight-108);
			$searchInput.attr('data','js-fNumber-menu').val('');
			$searchTitle.html('Select destination');

			$container.addClass('is-show');

			// 模糊查询
			that.autoComplete('.js-fStatusCity-search');
		});

		// 航班号选择 
		$fNumberFromMenuSub.on('click','>li',function(){
			var text1 = $(this).attr('title');
			$fNumberFromInput.val(text1);
			hideContainer();
		});

		// 日期选择
		this.mDateSelect(false,'.js-numDate-result','.js-numPopup-date',false);
		$numDate.click(function(event) {
			$('.js-fStatusPopup-content>div').hide(); 
			$('.js-numPopup-date').show();

			ovfHiden(); //使网页不可滚动

			$searchInput.hide();
			$searchTitle.text('Select date');
			$fStatusBox.height(winHeight-58);

			$container.addClass('is-show');
		});

		// 点击出发地
		$routeFromInput.click(function(event) {
			$routeFromMenuSub.empty();
			$('.js-fStatusPopup-content>div').hide(); 
			$('.js-routeBox-from').show();
			var toVal = $routeToInput.attr('data-city'); //获取目的地的值进行过滤
			$.each(that.fromCityData,function(i,val){
				$routeFromMenuSub.append('<li title="'+val+'">'+val+'</li>');
			});
			$routeFromMenuSub.children('li:contains('+toVal+')').remove(); //过滤

			ovfHiden(); //使网页不可滚动
			$searchInput.show();
			$fStatusBox.height(winHeight-108);
			$searchInput.attr('data','js-routeFrom-menu').val('');
			$searchTitle.html('Select origin');

			$container.addClass('is-show');
		});

		// 机票出发地选择 
		$routeFromMenuSub.on('click','>li',function(){
			var text1 = $(this).attr('title');
			var text2 = text1.split('/');
			$routeFromInput.val(text2[1]).attr('data-city',text1).parent().addClass('m-city-result');
			$fromSpan.text(text2[0]+'/'+text2[2]);
			hideContainer();
		});

		// 点击目的地
		$routeToInput.click(function(event) {
			$routeToMenuSub.empty();
			$('.js-fStatusPopup-content>div').hide(); 
			$('.js-routeBox-to').show();
			var fromVal = $routeFromInput.attr('data-city'); //获取出发地的值进行过滤
			$.each(that.toCityData,function(i,val){
				$routeToMenuSub.append('<li title="'+val+'">'+val+'</li>');
			});

			$routeToMenuSub.children('li:contains('+fromVal+')').remove(); //过滤

			ovfHiden(); //使网页不可滚动
			$searchInput.show();
			$fStatusBox.height(winHeight-108);
			$searchInput.attr('data','js-routeTo-menu').val('');
			$searchTitle.html('Select destination');

			$container.addClass('is-show');
		});

		// 机票目的地选择 
		$routeToMenuSub.on('click','>li',function(){
			var text1 = $(this).attr('title');
			var text2 = text1.split('/');
			$routeToInput.val(text2[1]).attr('data-city',text1).parent().addClass('m-city-result');
			$toSpan.text(text2[0]+'/'+text2[2]);
			hideContainer();
		});

		// 出发地和目的地切换
		$('.js-mfStatus-change').click(function(event) {
			var fVal = $routeFromInput.val();
			var fSpan = $fromSpan.text();
			var tVal = $routeToInput.val();
			var tSpan = $toSpan.text();
			$routeFromInput.val(tVal); $fromSpan.text(tSpan);
			$routeToInput.val(fVal); $toSpan.text(fSpan);
		});

		// 模糊匹配
		this.autoComplete('.js-fStatusCity-search');

		// 日期选择
		this.mDateSelect(false,'.js-routeDate-result','.js-routePopup-date',false);
		$routeDate.click(function(event) {
			$('.js-fStatusPopup-content>div').hide(); 
			$('.js-routePopup-date').show();

			ovfHiden(); //使网页不可滚动

			$searchInput.hide();
			$searchTitle.text('Select date');
			$fStatusBox.height(winHeight-58);

			$container.addClass('is-show');
		});

	},

	/* 改变酒店选择人数 */
	changeWidth:function(){
		// 动态改变酒店房间外层div的宽度和left
		var $hotelContent = $('.js-hotelPopup-content');
		var $hotelPeople = $('.js-hotelPopup-people');
		var changeWidth = function(){
			var changeArray = [];
			var childArray = $('.js-hotelChild-num');
			$.each(childArray,function(idx,val){
				changeArray.push($(val).html());
			});
			var changeNum = Math.max.apply(Math,changeArray);

			// 外层移动
			if(changeNum==0){
				$hotelContent.css('left',0);
				$hotelPeople.width(710);
			}
			if(changeNum==1){
				$hotelContent.css('left',-200);
				$hotelPeople.width(910);
			}
			if(changeNum==2){
				$hotelContent.css('left',-400);
				$hotelPeople.width(1112);
			}
			if(changeNum==3){
				$hotelContent.css('left',-610);
				$hotelPeople.width(1320);
			}
		};
		changeWidth();
	},

	/* 机票人数选择 */
	selectPeople:function(){
		var adultNum = 1;
		var childNum = 0;
		var infantNum = 0;

		var $adultResult = $('.js-p-adult>span');
		var $childResult = $('.js-p-child>span');
		var $infantResult = $('.js-p-infant>span');

		// 成人
		var adult = function(){
			$('.js-adult-add').click(function(){
				adultNum++;
				$(this).siblings('span').html(adultNum);
				$adultResult.html(adultNum); //动态赋值
				adultNum==2 && $(this).siblings('.sub-people').removeClass('off-sub-operation');
			});
			$('.js-adult-sub').click(function(){
				adultNum--;
				if(adultNum<2){
					adultNum=1;
					$(this).addClass('off-sub-operation');
				}
				$(this).siblings('span').html(adultNum);
				$adultResult.html(adultNum); //动态赋值
			});
		};

		// 小孩
		var child = function(){
			$('.js-child-add').click(function(){
				childNum++;
				$(this).siblings('span').html(childNum);
				$childResult.html(childNum); //动态赋值
				if(childNum==1){
					$(this).siblings('.sub-people').removeClass('off-sub-operation');
					$(this).parent().removeClass('disable');
				}
			});
			$('.js-child-sub').click(function(){
				childNum--;
				if(childNum<1){
					childNum=0;
					$(this).addClass('off-sub-operation');
					$(this).parent().addClass('disable');
				}
				$(this).siblings('span').html(childNum);
				$childResult.html(childNum); //动态赋值
			});
		};

		// 婴儿
		var infant = function(){
			$('.js-infant-add').click(function(){
				infantNum++;
				$(this).siblings('span').html(infantNum);
				$infantResult.html(infantNum); //动态赋值
				if(infantNum==1){
					$(this).siblings('.sub-people').removeClass('off-sub-operation');
					$(this).parent().removeClass('disable');
				}
			});
			$('.js-infant-sub').click(function(){
				infantNum--;
				if(infantNum<1){
					infantNum=0;
					$(this).addClass('off-sub-operation');
					$(this).parent().addClass('disable');
				}
				$(this).siblings('span').html(infantNum);
				$infantResult.html(infantNum); //动态赋值
			});
		};
		adult();
		child();
		infant();

		/* 人数提示 */
		var showAdultTip = 0;
		var showChildTip = 0;
		var showInfantTip = 0;
		var tipFn = function(className,content,showTip){
			$(className).mouseenter(function(event) {
				showTip = layer.tips(content, className,{
					tips: [2, '#8ec060'],
					time: 0
				});
			}).mouseleave(function(event) {
				layer.close(showTip);
			});
		};
		tipFn('.adult-tip','Adult',showAdultTip);
		tipFn('.child-tip','Passengers who have not reached their 12th birthday by the date of the last flight are considered child passengers Children 7 years old and older can travel alone with the consent of their parents.',showChildTip);
		tipFn('.infant-tip','Passengers 7 days old up to those who have not reached their 2nd birthday travel with infant status.',showInfantTip);
	},

	/* 酒店房间和人数选择 */
	selectHotelRooms:function(){
		/* 年龄选择 */
		var $that = this;
		$('.js-hotelPopup-people').on('click','.js-age-result',function(e){
			e.stopPropagation();
			$('.js-age-box').slideUp();
			$(this).siblings('.js-age-box').slideDown();
		});
		$('.js-hotelPopup-people').on('click','.js-age-menu>li',function(){
			var text = $(this).html();
			$(this).parents('.js-age-box').siblings('span').html(text);
		});
		$('html').click(function(event) {
			$('.js-age-box').slideUp();
		});

		/* 增减房间数 */
		var $adultResult = $('.js-p-hotelAdult>span');
		var $childResult = $('.js-p-hotelChild>span');
		var $roomsResult = $('.js-p-hotelRooms>span');
		// 增加房间
		var roomsNum = 1;
		$('.js-add-rooms').click(function(event) {
			if(roomsNum<=2){
				roomsNum++;
				var $roomStr = '<div class="s-room-'+roomsNum+' s-room-com s-people-com animated fadeInUp" id="js-room'+roomsNum+'-inner">'+
				'<p class="rooms-title js-rooms-title">Room '+roomsNum+'</p>'+
				'<div class="adult-rooms-content rooms-content-com">'+
				'<div class="hotel-people-prompt people-prompt">'+
				'<p class="p1"><img src="images/EN/adult-icon.png">Adult</p>'+
				'</div>'+
				'<div class="hotel-people-number people-number">'+
				'<a href="javascript:;" class="sub-people off-sub-operation js-hotelAdult-sub"></a>'+
				'<span class="adult-num js-hotelAdult-num">1</span>'+
				'<a href="javascript:;" class="add-people js-hotelAdult-add"></a>'+
				'</div>'+
				'</div>'+
				'<div class="child-rooms-content rooms-content-com js-childRooms-content">'+
				'<div class="hotel-people-prompt people-prompt">'+
				'<p class="p1"><img src="images/EN/Child-icon.png">Child</p>'+
				'</div>'+
				'<div class="hotel-people-number people-number disable">'+
				'<a href="javascript:;" class="sub-people off-sub-operation js-hotelChild-sub"></a>'+
				'<span class="adult-num js-hotelChild-num">0</span>'+
				'<a href="javascript:;" class="add-people js-hotelChild-add"></a>'+
				'</div>'+
				'</div>'+
				'<div class="age-rooms-com rooms-content-com animated fadeInUp js-age-1">'+
				'<div class="hotel-people-prompt people-prompt">'+
				'<p class="p1">Age/1</p>'+
				'</div>'+
				'<div class="hotel-age-wrap people-number">'+
				'<span class="age-result js-age-result">1</span>'+
				'<div class="age-menu-box js-age-box">'+
				'<ul class="hotel-age-menu js-age-menu">'+
				'<li title="Age < 1 year old">&lt; 1</li>'+
				'<li>2</li>'+
				'<li>3</li>'+
				'<li>4</li>'+
				'<li>5</li>'+
				'<li>6</li>'+
				'<li>7</li>'+
				'<li>8</li>'+
				'<li>9</li>'+
				'<li>10</li>'+
				'<li>11</li>'+
				'<li>12</li>'+
				'</ul>'+
				'</div>'+
				'</div>'+
				'</div>'+
				'<div class="age-rooms-com rooms-content-com animated fadeInUp js-age-2">'+
				'<div class="hotel-people-prompt people-prompt">'+
				'<p class="p1">Age/2</p>'+
				'</div>'+
				'<div class="hotel-age-wrap people-number">'+
				'<span class="age-result js-age-result">1</span>'+
				'<div class="age-menu-box js-age-box">'+
				'<ul class="hotel-age-menu js-age-menu">'+
				'<li title="Age < 1 year old">&lt; 1</li>'+
				'<li>2</li>'+
				'<li>3</li>'+
				'<li>4</li>'+
				'<li>5</li>'+
				'<li>6</li>'+
				'<li>7</li>'+
				'<li>8</li>'+
				'<li>9</li>'+
				'<li>10</li>'+
				'<li>11</li>'+
				'<li>12</li>'+
				'</ul>'+
				'</div>'+
				'</div>'+
				'</div>'+
				'<div class="age-rooms-com rooms-content-com animated fadeInUp js-age-3">'+
				'<div class="hotel-people-prompt people-prompt">'+
				'<p class="p1">Age/3</p>'+
				'</div>'+
				'<div class="hotel-age-wrap people-number">'+
				'<span class="age-result js-age-result">1</span>'+
				'<div class="age-menu-box js-age-box">'+
				'<ul class="hotel-age-menu js-age-menu">'+
				'<li title="Age < 1 year old">&lt; 1</li>'+
				'<li>2</li>'+
				'<li>3</li>'+
				'<li>4</li>'+
				'<li>5</li>'+
				'<li>6</li>'+
				'<li>7</li>'+
				'<li>8</li>'+
				'<li>9</li>'+
				'<li>10</li>'+
				'<li>11</li>'+
				'<li>12</li>'+
				'</ul>'+
				'</div>'+
				'</div>'+
				'</div>'+
				'</div>';

				var $roomTab = '<p class="animated bounceIn" data-room="js-room'+roomsNum+'-inner"><span>Room '+roomsNum+'</span><b>×</b></p>';

				$('.js-rooms-container').append($roomStr);
				$('.js-add-roomsTab').append($roomTab);

				var adultNum = $adultResult.html();
				adultNum++;
				$adultResult.html(adultNum);

				var roomsTotletNum = $roomsResult.html();
				roomsTotletNum++;
				$roomsResult.html(roomsTotletNum);
			}
		});
		
		// 删减房间
		$('.js-add-roomsTab').on('click','b',function(){
			roomsNum--;
			var id = $(this).parent('p').attr('data-room');

			// 动态修改成人人数统计值
			var adultNum = $adultResult.html();
			var html = $('#'+id).find('.js-hotelAdult-num').html();
			adultNum-=Number(html);
			$adultResult.html(adultNum);

			// 动态修改小孩人数统计值
			var childNum = $childResult.html();
			var html = $('#'+id).find('.js-hotelChild-num').html();
			childNum-=Number(html);
			$childResult.html(childNum);

			// 动态修改房间数统计值
			var roomsTotletNum = $roomsResult.html();
			roomsTotletNum--;
			$roomsResult.html(roomsTotletNum);

			$('#'+id).remove();
			$(this).parent('p').remove();

			// 动态修改房间最外层宽度和left
			$that.changeWidth();

			// 动态修改房间数值
			$('.js-rooms-container>div:first').attr('id','js-room1-inner'); //第一个
			$('.js-rooms-container>div:first').children('.js-rooms-title').html('Room 1'); //第一个
			$('.js-rooms-container>div').eq(1).attr('id','js-room2-inner'); //第二个
			$('.js-rooms-container>div').eq(1).children('.js-rooms-title').html('Room 2'); //第二个

			$('.js-add-roomsTab>p:first').attr('data-room','js-room1-inner'); //第一个tab
			$('.js-add-roomsTab>p:first').children('span').html('Room 1'); //第一个tab的值
			$('.js-add-roomsTab>p').eq(1).attr('data-room','js-room2-inner'); //第二个tab
			$('.js-add-roomsTab>p').eq(1).children('span').html('Room 2'); //第二个tab的值
		});

		/* 增减人数 */
		// 成人
		var adult = function(){
			$('.js-hotelPopup-people').on('click','.js-hotelAdult-add',function(e){
				var adultNum = $(this).siblings('span').html();
				adultNum++;
				$(this).siblings('span').html(adultNum);

				adultNum==2 && $(this).siblings('.sub-people').removeClass('off-sub-operation');
				
				//动态赋值
				var spanVal = 0;
				var spanArray = $('.js-hotelAdult-num');
				$.each(spanArray,function(idx, val) {
					spanVal+=Number($(val).html());
				});
				$adultResult.html(spanVal); 
			});
			$('.js-hotelPopup-people').on('click','.js-hotelAdult-sub',function(e){
				var adultNum = $(this).siblings('span').html();
				adultNum--;
				if(adultNum<2){
					adultNum=1;
					$(this).addClass('off-sub-operation');
				}
				$(this).siblings('span').html(adultNum);
				
				//动态赋值
				var spanVal = 0;
				var spanArray = $('.js-hotelAdult-num');
				$.each(spanArray,function(idx, val) {
					spanVal+=Number($(val).html());
				});
				$adultResult.html(spanVal); 
			});
		};

		// 小孩
		var child = function(){
			// 动态增减年龄
			var changeAge = function(that,childNum){
				var $age1 = that.parents('.js-childRooms-content').siblings('.js-age-1');
				var $age2 = that.parents('.js-childRooms-content').siblings('.js-age-2');
				var $age3 = that.parents('.js-childRooms-content').siblings('.js-age-3');

				// 动态修改房间最外层宽度和left
				$that.changeWidth();

				// 显示隐藏
				if(childNum==0){
					$age1.hide();$age2.hide();$age3.hide();
				}
				if(childNum==1){
					$age2.hide();$age3.hide();
					setTimeout(function(){
						$age1.show();
					},200);
				}
				if(childNum==2){
					$age3.hide();
					setTimeout(function(){
						$age1.show();$age2.show();
					},200);
				}
				if(childNum==3){
					setTimeout(function(){
						$age1.show();$age2.show();$age3.show();
					},200);
				}
			};

			$('.js-hotelPopup-people').on('click','.js-hotelChild-add',function(e){
				var childNum = $(this).siblings('span').html();
				childNum++;
				
				if(childNum==1){
					$(this).siblings('.sub-people').removeClass('off-sub-operation');
					$(this).parent().removeClass('disable');
				}
				if(childNum>2){
					childNum=3
					$(this).addClass('off-add-operation');
				}
				$(this).siblings('span').html(childNum);

				//动态赋值
				var spanVal = 0;
				var spanArray = $('.js-hotelChild-num');
				$.each(spanArray,function(idx, val) {
					spanVal+=Number($(val).html());
				});
				$childResult.html(spanVal); 

				// 动态增减年龄
				var that = $(this);
				changeAge(that,childNum);
			});
			$('.js-hotelPopup-people').on('click','.js-hotelChild-sub',function(e){
				var childNum = $(this).siblings('span').html();
				childNum--;
				if(childNum<1){
					childNum=0;
					$(this).addClass('off-sub-operation');
					$(this).parent().addClass('disable');
				}
				$(this).siblings('.add-people').removeClass('off-add-operation');
				$(this).siblings('span').html(childNum);
				
				var spanVal = 0;
				var spanArray = $('.js-hotelChild-num');
				$.each(spanArray,function(idx, val) {
					spanVal+=Number($(val).html());
				});
				$childResult.html(spanVal); 

				// 动态增减年龄
				var that = $(this);
				changeAge(that,childNum);
			});
		};

		adult();
		child();
	},

	/* banner */
	banner:function(){
		$('.js-slick-banner').slick({
			dots: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 3000,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						autoplay: false,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						autoplay: false,
						touchMove:true,
					}
				}
			],
		});
	},

	/* 优惠券 */
	selectCoupons:function(){
		var ticketStr = '<div class="ticket-coupons" id="js-ticket-coupons">'+
		'<div class="slick-item slick-item-1">'+
		'<img src="images/EN/ticket-coupons.png" class="coupons-img">'+
		'<div class="slick-content">'+
		'<h2><span class="s1">$</span><span class="s2">200</span></h2>'+
		'<p class="p1">Air Ticket Coupon</p>'+
		'<p class="p2">Receive Immediately</p>'+
		'</div>'+
		'<a href="javascript:;"></a>'+
		'</div>'+
		'<div class="slick-item slick-item-2">'+
		'<img src="images/EN/ticket-coupons.png" class="coupons-img">'+
		'<div class="slick-content">'+
		'<h2><span class="s1">$</span><span class="s2">200</span></h2>'+
		'<p class="p1">Air Ticket Coupon</p>'+
		'<p class="p2">Receive Immediately</p>'+
		'</div>'+
		'<a href="javascript:;"></a>'+
		'</div>'+
		'<div class="slick-item slick-item-3">'+
		'<img src="images/EN/ticket-coupons.png" class="coupons-img">'+
		'<div class="slick-content">'+
		'<h2><span class="s1">$</span><span class="s2">200</span></h2>'+
		'<p class="p1">Air Ticket Coupon</p>'+
		'<p class="p2">Receive Immediately</p>'+
		'</div>'+
		'<a href="javascript:;"></a>'+
		'</div>'+
		'<div class="slick-item slick-item-4">'+
		'<img src="images/EN/ticket-coupons.png" class="coupons-img">'+
		'<div class="slick-content">'+
		'<h2><span class="s1">$</span><span class="s2">200</span></h2>'+
		'<p class="p1">Air Ticket Coupon</p>'+
		'<p class="p2">Receive Immediately</p>'+
		'</div>'+
		'<a href="javascript:;"></a>'+
		'</div>'+
		'</div>';

		var shoppingStr = '<div class="shopping-coupons" id="js-shopping-coupons">'+
		'<div class="slick-item slick-item-1">'+
		'<img src="images/EN/shopping-coupons.png" class="coupons-img">'+
		'<div class="slick-content">'+
		'<h2><span class="s1">$</span><span class="s2">200</span></h2>'+
		'<p class="p1">Air Ticket Coupon</p>'+
		'<p class="p2">Receive Immediately</p>'+
		'</div>'+
		'<a href="javascript:;"></a>'+
		'</div>'+
		'<div class="slick-item slick-item-2">'+
		'<img src="images/EN/shopping-coupons.png" class="coupons-img">'+
		'<div class="slick-content">'+
		'<h2><span class="s1">$</span><span class="s2">200</span></h2>'+
		'<p class="p1">Air Ticket Coupon</p>'+
		'<p class="p2">Receive Immediately</p>'+
		'</div>'+
		'<a href="javascript:;"></a>'+
		'</div>'+
		'<div class="slick-item slick-item-3">'+
		'<img src="images/EN/shopping-coupons.png" class="coupons-img">'+
		'<div class="slick-content">'+
		'<h2><span class="s1">$</span><span class="s2">200</span></h2>'+
		'<p class="p1">Air Ticket Coupon</p>'+
		'<p class="p2">Receive Immediately</p>'+
		'</div>'+
		'<a href="javascript:;"></a>'+
		'</div>'+
		'<div class="slick-item slick-item-4">'+
		'<img src="images/EN/shopping-coupons.png" class="coupons-img">'+
		'<div class="slick-content">'+
		'<h2><span class="s1">$</span><span class="s2">200</span></h2>'+
		'<p class="p1">Air Ticket Coupon</p>'+
		'<p class="p2">Receive Immediately</p>'+
		'</div>'+
		'<a href="javascript:;"></a>'+
		'</div>'+
		'</div>';

		var hotelStr = '<div class="hotel-coupons" id="js-hotel-coupons">'+
		'<div class="slick-item slick-item-1">'+
		'<img src="images/EN/hotel-coupons.png" class="coupons-img">'+
		'<div class="slick-content">'+
		'<h2><span class="s1">$</span><span class="s2">200</span></h2>'+
		'<p class="p1">Air Ticket Coupon</p>'+
		'<p class="p2">Receive Immediately</p>'+
		'</div>'+
		'<a href="javascript:;"></a>'+
		'</div>'+
		'<div class="slick-item slick-item-2">'+
		'<img src="images/EN/hotel-coupons.png" class="coupons-img">'+
		'<div class="slick-content">'+
		'<h2><span class="s1">$</span><span class="s2">200</span></h2>'+
		'<p class="p1">Air Ticket Coupon</p>'+
		'<p class="p2">Receive Immediately</p>'+
		'</div>'+
		'<a href="javascript:;"></a>'+
		'</div>'+
		'<div class="slick-item slick-item-3">'+
		'<img src="images/EN/hotel-coupons.png" class="coupons-img">'+
		'<div class="slick-content">'+
		'<h2><span class="s1">$</span><span class="s2">200</span></h2>'+
		'<p class="p1">Air Ticket Coupon</p>'+
		'<p class="p2">Receive Immediately</p>'+
		'</div>'+
		'<a href="javascript:;"></a>'+
		'</div>'+
		'<div class="slick-item slick-item-4">'+
		'<img src="images/EN/hotel-coupons.png" class="coupons-img">'+
		'<div class="slick-content">'+
		'<h2><span class="s1">$</span><span class="s2">200</span></h2>'+
		'<p class="p1">Air Ticket Coupon</p>'+
		'<p class="p2">Receive Immediately</p>'+
		'</div>'+
		'<a href="javascript:;"></a>'+
		'</div>'+
		'</div>';

		var slick = function(id){
			$(id).slick({
				dots: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: false,
				touchMove: false,
				variableWidth: true,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							// touchMove:true,
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							touchMove:true,
							infinite: true,
						}
					}
				],
			});
		};
		
		var $content = $('.js-coupons-content');
		$content.html(shoppingStr);
		slick('#js-shopping-coupons');

		// 切换优惠券
		var $loading = $('.js-coupons-loading');
		$('.js-coupons-anchor>a').click(function(e) {
			e.preventDefault();e.stopPropagation();
			// $loading.show();
			$(this).addClass('active').siblings('a').removeClass('active');
			var id = $(this).attr('href');

			var hideLoading = function(){
				setTimeout(function(){
					$loading.hide();
				},600);
			};
			switch (id) {
				case '#js-ticket-coupons':
				$content.html(ticketStr);
				slick('#js-ticket-coupons');
					// hideLoading();
					break;
					case '#js-shopping-coupons':
					$content.html(shoppingStr);
					slick('#js-shopping-coupons');
					// hideLoading();
					break;
					case '#js-hotel-coupons':
					$content.html(hotelStr);
					slick('#js-hotel-coupons');
					// hideLoading();
					break;
				}
			});
	},

	/* 特价机票 */
	lowestFares:function(){
		$('.js-fares-content').slick({
			dots: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: false,
			touchMove: false,
			variableWidth: true,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						// touchMove:true,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						touchMove:true,
						infinite: true,
					}
				},
			],
		});

		// 特价机票模态框
		$('.js-fares-modal').click(function(event) {
			$('#js-faresModal').modal();
		});

		this.simpleDate(false,'.js-faresDate-result','.js-faresDate-container');

		var $faresPeople = $('.js-faresPeople-container,.js-faresMenu-people');
		$('.js-fares-people').click(function(e) {
			e.stopPropagation();
			$faresPeople.show();
		});
		$('.js-faresPeople-container').click(function(e) {
			e.stopPropagation();
		});
		$('html').click(function(event) {
			$faresPeople.hide();
		});
	},

	/* 推荐旅游 */
	recommendTravel:function(){
		$('.js-travel-content').slick({
			dots: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: false,
			touchMove: false,
			variableWidth: true,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						// touchMove:true,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						touchMove:true,
						infinite: true,
					}
				},
			],
		});
	},

	/* 推荐酒店 */
	recommendHotel:function(){
		$('.js-comfortHotel-content').slick({
			dots: false,
			slidesToShow: 2,
			slidesToScroll: 1,
			infinite: false,
			touchMove: false,
			// variableWidth: true,
			responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: false,
					// touchMove: true,
				}
			}
			],
		});

		// 移动端
		$('.js-mComfortHotel-content').slick({
			dots: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			touchMove: true,
			variableWidth: true,
		});
	},

	/* 澜湄新闻 */
	lmNews:function(){
		var $newsInfo = $('.js-news-info');
		var $newsContent = $('.js-news-content');

		$newsContent.slick({
			dots: false,
			slidesToShow: 2,
			slidesToScroll: 1,
			infinite: true,
			touchMove: false,
			variableWidth: true,
			arrows:false,
			responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				}
			}
			],
		});

		var newsStr1 = '<div class="js-news-1 js-news-com"><h2 class="animated fadeInUp"><a href="javascript:;">Lanmei Airlines launches flights in Cambodia, sets up "sky highway" for Mekong countries</a></h2>'+
		'<p class="animated fadeInUp">2017-11-03 01:34:00</p>'+
		'<div class="news-info-detail">'+
		'<p class="animated fadeInUp">On Oct.9th, 2017, Lanmei Airlines (Cambodia) Co., Ltd. (referred as “Lanmei Airlines”) held a grand ceremony of Lanmei Six Nations Flights Launching and the “One-hundred Riel” Thanksgiving Foundation at Phnom Penh.</p>'+
		'</div></div>';
		var newsStr2 = '<div class="js-news-2 js-news-com"><h2 class="animated fadeInUp"><a href="javascript:;">Maiden flight of Lanmei Airlines has successfully completed and its commercial operation commenced.</a></h2>'+
		'<p class="animated fadeInUp">2017-11-03 01:34:00</p>'+
		'<div class="news-info-detail">'+
		'<p class="animated fadeInUp">On 29 September 2017, flight LQ9509 safely landed at Palau Koror International Airport, which indicates the maiden flight of Lanmei Airlines (Cambodia) Co.,Ltd (“Lanmei Airlines”) has successfully completed and its commercial operation commenced.</p>'+
		'</div></div>';
		var newsStr3 = '<div class="js-news-3 js-news-com"><h2 class="animated fadeInUp"><a href="javascript:;">Lanmei Airlines’s Stewardess Won the World’s Top 10 Stewardess Award in 2017</a></h2>'+
		'<p class="animated fadeInUp">2017-11-02 15:34:46</p>'+
		'<div class="news-info-detail">'+
		'<p class="animated fadeInUp">On September 15, “Press Conference of the 8th World Airline Ranking and the 7th World’s Stewardess’ Day Awarding Ceremony” was held in Hong Kong. The ceremony, sponsored by World Air Stewardess Association and Aviation Professional Committee of World Urban Cooperative Organization, totally published 15 ranking lists in terms of advantage study and assessment</p>'+
		'</div></div>';

		var page = 1;
		var totalPage = $('.js-news-pages>.s2').text();

		var changeInfo = function(){
			switch (page) {
				case 1:
				$newsInfo.html(newsStr1);
				break;
				case 2:
				$newsInfo.html(newsStr2);
				break;
				case 3:
				$newsInfo.html(newsStr3);
				break;
			}
		};

		$('.js-news-left').click(function(event) {
			$newsContent.slick('slickPrev');
			if(page<=1){
				page=(Number(totalPage)+1);
			}
			page--;
			$('.js-news-pages>.s1').text(page);

			changeInfo();
		});
		$('.js-news-right').click(function(event) {
			$newsContent.slick('slickNext');
			if(page>=totalPage){
				page=0;
			}
			page++;
			$('.js-news-pages>.s1').text(page);

			changeInfo();
		});

		// 动态改变mask的阴影
		var winResize = function(){
			var conWidth = $newsContent.width();
			var winWidth = $(window).width();
			if(winWidth<=1400){
				$('.js-news-mask').width(conWidth-558);
			}else{
				$('.js-news-mask').width(conWidth-684);
			}
		};
		winResize();
		var _tick = null;
		$(window).resize(function(){
			if (_tick) clearTimeout(_tick);
			_tick = setTimeout(function() {
				winResize();
			}, 1000);
		});
	},

	/* 其他事件 */
	otherEvent:function(){
		/* 首屏自适应高度 */
		var winHeight = $(window).height();
		$('.js-section-main').height(winHeight);
		$('.js-aside-code').height(winHeight-60);

		/* 右侧二维码 */
		// var enterTime;
		// var outTime;
		// var tickIn = null;
		// $('.js-aside-code').mouseenter(function(event) {
		// 	var that = $(this);
		// 	enterTime = new Date().getTime();
		// 	if(tickIn){
		// 		clearTimeout(tickIn);
		// 	}
		// 	tickIn = setTimeout(function(){
		// 		that.css('right',0);
		// 		$('.js-code-mask').show();
		// 	},10);
		// });
		// var tickOut = null;
		// $('.js-aside-code').mouseleave(function(event) {
		// 	var that = $(this);
		// 	outTime = new Date().getTime();
		// 	var diffTime = outTime-enterTime;
		// 	if(diffTime<10){ //鼠标快速移开的时候就清除定时器
		// 		clearTimeout(tickIn);
		// 	}
		// 	if(tickOut){
		// 		clearTimeout(tickOut);
		// 	}
		// 	tickOut = setTimeout(function(){
		// 		that.css('right',-200);
		// 		$('.js-code-mask').hide();
		// 	},10);
		// });

		/* 文字滚动 */
		var slideUp = function(){
			var docthis = $(".js-important-line");
			//默认参数
			value=$.extend({
				"li_h":"60",
				"time":3000,
				"movetime":1000
			});
			
			//向上滑动动画
			function autoani(){
				$("li:first",docthis).animate({"margin-top":-value.li_h},value.movetime,function(){
					$(this).css("margin-top",0).appendTo(".js-important-line");
				});
			}
			
			//自动间隔时间向上滑动
			var anifun = setInterval(autoani,value.time);
			
			//悬停时停止滑动，离开时继续执行
			$(docthis).children("li").hover(function(){
				clearInterval(anifun);			//清除自动滑动动画
			},function(){
				anifun = setInterval(autoani,value.time);	//继续执行动画
			});
		};
		slideUp();

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
		$('.js-h-phone').click(function(e) {
			e.stopPropagation();
			$('.js-phone-menu').show();
		});
		$('html').click(function(event) {
			console.log(222);
				$('.js-lang-menu').hide();
				$('.js-phone-menu').hide();
		});
		$('.js-lang-menu>a').click(function(event) {
			var data = $(this).attr('data');
			switch (data) {
				case 'en':
				$('.js-choose-lang').attr('src','images/EN/lang-en.png')
				$langMenu.hide();
				break;
				case 'zh':
				$('.js-choose-lang').attr('src','images/EN/lang-zh.png');
				$langMenu.hide();
				break;
			}
		});
	},
};

$(function() {
	LanmeiAirlines.init();
});
