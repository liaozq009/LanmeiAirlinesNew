
var LanmeiAirlines = {
	init:function(){
		this.leftAside();
		this.ticketSelect();
		this.hotelSelect();
		this.selectPeople();
		this.hotelSelectPeople();
		this.otherEvent();
	},

	/* 左侧边栏切换 */
	leftAside:function(){
		var $slide = $('.js-aside-flight>li>a');
		var $blurImg = $('.js-aside-blur>img');
		// 滑动动画
		function animate(top){
			$('.li-slide').animate({top:top}, 300);
		}

		$slide.click(function(){
			$(this).addClass('active').parent().siblings().children('a').removeClass('active');

			var href;
			$slide.each(function(i,v){
				if($(v).hasClass('active')){
					href = $(this).attr('data-href');
				}
			})
			switch (href) {
				case "ticket-content":
				animate(30);
				$blurImg.fadeOut();
				$('.blur-img-ticket').fadeIn();
				break;
				case "hotel-content":
				animate(130);
				$blurImg.fadeOut();
				$('.blur-img-hotel').fadeIn();
				break;
				case "car-content":
				animate(230);
				$blurImg.fadeOut();
				$('.blur-img-car').fadeIn();
				break;
				case "flight-content":
				animate(330);
				$blurImg.fadeOut();
				$('.blur-img-flight').fadeIn();
				break;
			}
		});
	},

	/* 机票选择 */
	ticketSelect:function(){
		/* 出发地和目的地选择 */
		var $mask = $('.js-flight-mask'); //遮罩层
		var $mask2 = $('.js-flight-mask2'); //遮罩层2
		var $box = $('.js-popup-box'); //c3动画最外层
		var $hotelBox = $('.js-hotelPopup-box'); //酒店c3动画最外层
		var $content = $('.js-popup-content'); //c3动画内容
		var $hotelContent = $('.js-hotelPopup-content'); //酒店c3动画内容

		// 输入框
		var $fromInput = $('.js-from-input'); //机票出发地
		var $hotelFromInput = $('.js-hotelFrom-input'); //酒店出发地
		var $toInput = $('.js-to-input'); //机票目的地
		var $date = $('.js-date-result'); //机票日期
		var $hotelDate = $('.js-hotelDate-result'); //酒店日期
		var $people = $('.js-ticket-people'); //机票人数
		var $hotelPeople = $('.js-hotel-people'); //酒店人数

		var $fromMenuSub = $('.js-from-menu'); //出发地下拉菜单
		var $toMenuSub = $('.js-to-menu'); //目的地下拉菜单

		// 下拉菜单外层
		var $fromBox = $('.js-airport-from'); //出发地外层
		var $hotelFromBox = $('.js-hotelPopup-from'); //酒店出发地外层
		var $toBox = $('.js-airport-to'); //目的地外层
		var $dateBox = $('.js-popup-date'); //日期外层
		var $hotelDateBox = $('.js-hotelPopup-date'); //酒店日期外层
		var $peopleBox = $('.js-popup-people'); //人数选择外层
		var $hotelPeopleBox = $('.js-hotelPopup-people'); //酒店人数选择外层

		var $selectWay = $('.js-select-way'); //选择单程往返
		var $ticketFrom = $('.js-ticket-from'); //出发地div
		var $hotelFrom = $('.js-hotel-from'); //酒店出发地div
		var $popupContent = $('.popup-content'); 

		var $zoom = $('.js-ticket-to,.js-ticket-date,.js-ticket-people,.js-ticket-cancel,.js-ticket-search');
		var $hotelZoom = $('.js-hotel-date,.js-hotel-people,.js-hotel-cancel,.js-hotel-search');

		// c3动画
		var popupShow = function(){
			$mask.fadeIn(); //显示遮罩层
			$mask2.fadeIn(); //显示遮罩层
			$box.addClass('popup-box-before'); //展示小箭头
			$content.removeClass('popup-inactive').addClass('popup-active'); 
		};
		var popupHide = function(){
			$content.removeClass('popup-active').addClass('popup-inactive'); 
			$box.removeClass('popup-box-before'); //隐藏小箭头
		};
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

		var today  = new Date();
		var todayTime = formatDate(today.getDate())+' '+formatMonth((today.getMonth()+1));
		var startTimeStr = new Date(today.getTime()+86400000*1); 
		var startTime = formatDate(startTimeStr.getDate())+' '+formatMonth((startTimeStr.getMonth()+1));  
		var endTimeStr = new Date(today.getTime()+86400000*2); 
		var endTime = formatDate(endTimeStr.getDate())+' '+formatMonth((endTimeStr.getMonth()+1));  
		var maxTime = formatDate(today.getDate())+' '+formatMonth((today.getMonth()+1));
		
		var singleDate = function(single,id,container,showTotleDay,box,dateBox,peopleBox){
			$(id).daterangepicker({
				parentEl:container,
				format: 'D MMM',
				startDate: startTime,
				endDate: endTime,
				minDate: todayTime,
				// maxDate:'2018-06-02',
	      singleDatePicker: single, //单日期
	      showTotleDay: showTotleDay, //是否显示已经选择的天数
	      showDropdowns: false, //下拉选择月份和年份
	      showWeekNumbers: false, //显示周
	      autoApply: true, //自动关闭日期
				language :'en',
			},function(start, end, label) {//格式化日期显示框  
					if(this.singleDatePicker){
						$(id).html(start.format('D MMM'));
					}else{
						$(id).html(start.format('D MMM') + ' - ' + end.format('D MMM'));
					}

					// 操作外层box移动
					if(showTotleDay){ //酒店
						if(winWidth>1350){
							box.css('left',610);
						}else if(winWidth<=1350){
							box.css({'top':-10,'left':350});
						}
					}else{
						if(winWidth>1350){
							box.css('left',950);
						}else if(winWidth<=1350){
							box.css({'top':-10,'left':350});
						}
					}
					
					dateBox.slideUp(function(){ //出发地隐藏
						peopleBox.slideDown(); //目的地显示
					}); 
			  } 
			);
		};
		singleDate(false,'.js-date-result','.js-popup-date',false,$box,$dateBox,$peopleBox);
		singleDate(false,'.js-hotelDate-result','.js-hotelPopup-date',true,$hotelBox,$hotelDateBox,$hotelPeopleBox);

		// 单程往返切换
		$('.js-select-way>a').click(function(event) {
			$(this).addClass('active').siblings('a').removeClass('active');
			var data = $(this).attr('data-way');
			switch (data) {
				case 'round':
					singleDate(false,'.js-date-result','.js-popup-date',false,$box,$dateBox,$peopleBox);
					break;
				case 'one':
					singleDate(true,'.js-date-result','.js-popup-date',false,$box,$dateBox,$peopleBox);
					break;
			}
		});

		// 获取屏幕尺寸
		var winWidth = $(window).width();

		// 点击机票出发地
		var zoomShow = true;
		var oneClick = true;
		$fromInput.click(function(){
			if(oneClick){ //防止点击取消后，快速点击出发地产生的bug
				if(winWidth>1350){
					$box.css('left',0);
				}else if(winWidth<=1350){
					$box.css({'top':-90,'left':0});
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
			      $ticketFrom.removeClass('animated fadeInUp');
			      $selectWay.removeClass('animated fadeInUp');
			    }, 2200);
				}
			}
		});

		// 点击酒店出发地
		var hotelZoomShow = true;
		var hotelOneClick = true;
		$hotelFromInput.click(function(){
			if(hotelOneClick){ //防止点击取消后，快速点击出发地产生的bug
				if(winWidth>1350){
					$hotelBox.css('left',0);
				}else if(winWidth<=1350){
					$hotelBox.css({'top':-90,'left':0});
				}
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
			      $hotelFrom.removeClass('animated fadeInUp');
			    }, 2200);
				}
			}
		});

		// 点击机票目的地
		$toInput.click(function(e){
			if(winWidth>1350){
				$box.css('left',350);
			}else if(winWidth<=1350){
				$box.css({'top':-90,'left':350});
			}
			popupShow(); //增加c3动画
			$popupContent.css('z-index','1'); //覆盖cancel按钮
			$toBox.show();
			$fromBox.hide(); $dateBox.hide(); $peopleBox.hide();
		});

		// 点击机票日期
		$date.click(function(event) {
			if(winWidth>1350){
				$box.css('left',700);
			}else if(winWidth<=1350){
				$box.css({'top':-10,'left':0});
			}
			popupShow(); //增加c3动画
			$popupContent.css('z-index','1'); //覆盖cancel按钮
			$dateBox.show();
			$fromBox.hide(); $toBox.hide(); $peopleBox.hide();
		});

		// 点击酒店日期
		$hotelDate.click(function(event) {
			if(winWidth>1350){
				$hotelBox.css('left',700);
			}else if(winWidth<=1350){
				$hotelBox.css({'top':-10,'left':0});
			}
			hotelPopupShow(); //增加c3动画
			$hotelBox.removeClass('hotelPeople-popup-box'); //移动before小箭头
			$('.popup-box::before').css('left',500);
			$hotelContent.css('z-index','1'); //覆盖cancel按钮
			$hotelDateBox.show();
			$hotelFromBox.hide(); $hotelPeopleBox.hide();
		});

		// 点击机票人数
		$people.click(function(event) {
			if(winWidth>1350){
				$box.css('left',950);
			}else if(winWidth<=1350){
				$box.css({'top':-10,'left':350});
			}
			popupShow(); //增加c3动画
			$popupContent.css('z-index','1'); //覆盖cancel按钮
			$peopleBox.show();
			$fromBox.hide(); $toBox.hide(); $dateBox.hide();
		});

		// 点击酒店人数
		$hotelPeople.click(function(event) {
			console.log(222);
			if(winWidth>1350){
				$hotelBox.css('left',610);
			}else if(winWidth<=1350){
				$hotelBox.css({'top':-10,'left':350});
			}
			hotelPopupShow(); //增加c3动画
			$hotelBox.addClass('hotelPeople-popup-box'); //移动before小箭头
			$hotelContent.css('z-index','1'); //覆盖cancel按钮
			$hotelPeopleBox.show();
			$hotelFromBox.hide(); $hotelDateBox.hide();
		});

		var cancel = function(){
			oneClick = false; //防止快速点击出发地
			$zoom.addClass('animated fadeOutDown');
			$selectWay.css({'height':'0','margin-top':'0'}).addClass('animated fadeOutDown'); //隐藏单程往返
			$mask.fadeOut(); //隐藏遮罩层
			$mask2.fadeOut(); //隐藏遮罩层
			popupHide(); //隐藏弹出内容层
			zoomShow = true; //重新点击出发地时再次显示目的地、日期、人数的动画
			$box.css('left',0); //下拉框归零
			setTimeout(function(){
	      $zoom.removeClass('animated fadeOutDown');
	      $selectWay.removeClass('animated fadeOutDown');
	      $zoom.css('visibility','hidden');
	      oneClick = true; //可以继续点击出发地
	    }, 2200);
		};
		// 点击遮罩层
		$mask.click(function(){
			cancel();
		});
		$mask2.click(function(){
			popupHide(); //隐藏弹出内容层
			$(this).fadeOut();
		});

		// 点击机票取消
		$('.js-ticket-cancel').click(function(){
			cancel();
		});

		// 机票出发地选择
		$fromMenuSub.on('click','>li',function(){
			var text = $(this).attr('title').split('/');
			$fromInput.val(text[0]+'/'+text[1]);
			$box.css('left',350);
			$fromBox.slideUp(function(){ //出发地隐藏
				$toBox.slideDown(); //目的地显示
			}); 
		});

		// 机票目的地选择
		$toMenuSub.on('click','>li',function(){
			var text = $(this).html().split('/');
			$toInput.val(text[0]+'/'+text[1]);
			if(winWidth>1350){
				$box.css('left',700);
			}else if(winWidth<=1350){
				$box.css({'top':-10,'left':0});
			}
			$toBox.slideUp(function(){ //出发地隐藏
				$('.js-date-result').click(); //日期展示
				$dateBox.slideDown(); //目的地显示
			}); 
		});

		// 机票模糊匹配
		var fromcityData = ['Sihanoukville/KOS/Cambodia','Ho Chi Minh/SGN/Vietnam','Macao/MFM/Macao,China','Hanoi/HAN/Vietnam','Phnom Penh/PNH/Cambodia','HongKong/HKG/HongKong,China','Siem Reap/REP/Cambodia','SEOUL/ICN/Korea'];
		var tocityData =   ['Sihanoukville/KOS/Cambodia','Ho Chi Minh/SGN/Vietnam','Macao/MFM/Macao,China','Hanoi/HAN/Vietnam','Phnom Penh/PNH/Cambodia','HongKong/HKG/HongKong,China','Siem Reap/REP/Cambodia','SEOUL/ICN/Korea'];
		$('.js-from-input,.js-to-input').on('input',function(event) {
			var searchText = $(this).val();
			var cityData;
			var data = $(this).attr('data');
			data=='js-from-menu' ? cityData=fromcityData : cityData=tocityData;
			var currentVal = searchText.toLowerCase();
			var srdata = [];
			for (var i = 0; i < cityData.length; i++) {
				if (currentVal.trim().length > 0 && cityData[i].toLowerCase().indexOf(currentVal) > -1) {
					srdata.push(cityData[i]);
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
				$.each(cityData,function(i,val){
					$('.'+data).append('<li title="'+val+'">'+val+'</li>');
				});
			}
		});
	},

	/* 酒店选择 */
	hotelSelect:function(){
		/* 年龄选择 */
		$('.js-hotelPopup-people').on('click','.js-age-result',function(e){
			e.stopPropagation();
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

		var roomsNum = 1;
		$('.js-add-rooms').click(function(event) {
			if(roomsNum<=2){
				roomsNum++;
				var $roomStr = '<div class="s-room-com s-people-com animated fadeInUp" id="js-room'+roomsNum+'-inner">'+
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

			var roomsTotletNum = $roomsResult.html();
			roomsTotletNum--;
			$roomsResult.html(roomsTotletNum);

			$('#'+id).remove();
			$(this).parent('p').remove();

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
			var $hotelContent = $('.js-hotelPopup-content');
			var $hotelPeople = $('.js-hotelPopup-people');
			
			// 动态增减年龄
			var changeAge = function(that,childNum){
				var $age1 = that.parents('.js-childRooms-content').siblings('.js-age-1');
				var $age2 = that.parents('.js-childRooms-content').siblings('.js-age-2');
				var $age3 = that.parents('.js-childRooms-content').siblings('.js-age-3');

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
					$(this).addClass('off-sub-operation');
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
				$(this).siblings('.add-people').removeClass('off-sub-operation');
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

	/* 人数选择 */
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
		}

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
		}

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
		}
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
		}
		tipFn('.adult-tip','Adult',showAdultTip);
		tipFn('.child-tip','Passengers who have not reached their 12th birthday by the date of the last flight are considered child passengers Children 7 years old and older can travel alone with the consent of their parents.',showChildTip);
		tipFn('.infant-tip','Passengers 7 days old up to those who have not reached their 2nd birthday travel with infant status.',showInfantTip);
	},

	/* 酒店人数选择 */
	hotelSelectPeople:function(){
		
	},

	/* 其他事件 */
	otherEvent:function(){
		// 首屏自适应高度
		var winHeight = $(window).height();
		$('.js-section-main').height(winHeight);
	},
};

$(function() {
	LanmeiAirlines.init();
});

