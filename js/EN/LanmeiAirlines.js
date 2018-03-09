
var LanmeiAirlines = {
	init:function(){
		this.leftAside();
		this.ticketSelect();
		this.selectPeople();
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
		var $box = $('.js-popup-box'); //c3动画最外层
		var $content = $('.js-popup-content'); //c3动画内容

		var $fromInput = $('.js-from-input'); //出发地
		var $toInput = $('.js-to-input'); //目的地
		var $date = $('.js-date-result'); //日期
		var $people = $('.js-ticket-people'); //人数

		var $fromMenuSub = $('.js-from-menu'); //出发地下拉菜单
		var $toMenuSub = $('.js-to-menu'); //目的地下拉菜单

		var $fromBox = $('.js-airport-from'); //出发地外层
		var $toBox = $('.js-airport-to'); //目的地外层
		var $dateBox = $('.js-popup-date'); //日期外层
		var $peopleBox = $('.js-popup-people'); //人数选择外层

		var $selectWay = $('.js-select-way'); //选择单程往返
		var $ticketFrom = $('.js-ticket-from'); //出发地div
		var $popupContent = $('.popup-content'); 

		var $zoom = $('.js-ticket-to,.js-ticket-date,.js-ticket-people,.js-flight-cancel,.js-flight-search');

		// c3动画
		var popupShow = function(){
			$mask.fadeIn(); //显示遮罩层
			$box.addClass('popup-box-before'); //展示小箭头
			$content.removeClass('popup-inactive').addClass('popup-active'); 
		};
		var popupHide = function(){
			$content.removeClass('popup-active').addClass('popup-inactive'); 
			$box.removeClass('popup-box-before'); //隐藏小箭头
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
		}

		var today  = new Date();
		var todayTime = formatDate(today.getDate())+' '+formatMonth((today.getMonth()+1));
		var startTimeStr = new Date(today.getTime()+86400000*1); 
		var startTime = formatDate(startTimeStr.getDate())+' '+formatMonth((startTimeStr.getMonth()+1));  
		var endTimeStr = new Date(today.getTime()+86400000*2); 
		var endTime = formatDate(endTimeStr.getDate())+' '+formatMonth((endTimeStr.getMonth()+1));  
		var maxTime = formatDate(today.getDate())+' '+formatMonth((today.getMonth()+1));
		
		var singleDate = function(single){
			$('.js-date-result').daterangepicker({
				parentEl:'.popup-date',
				format: 'D MMM',
				startDate: startTime,
				endDate: endTime,
				minDate: todayTime,
				// maxDate:'2018-06-02',
	      singleDatePicker: single, //单日期
	      showDropdowns: false, //下拉选择月份和年份
	      showWeekNumbers: false, //显示周
	      autoApply: true, //自动关闭日期
				language :'en',
			},function(start, end, label) {//格式化日期显示框  
					if(this.singleDatePicker){
						$('.js-date-result').html(start.format('D MMM'));
					}else{
						$('.js-date-result').html(start.format('D MMM') + ' - ' + end.format('D MMM'));
					}

					// 操作外层box移动
					$box.css('left',950);
					$dateBox.slideUp(function(){ //出发地隐藏
						$peopleBox.slideDown(); //目的地显示
					}); 
			  } 
			);
		};
		singleDate(false);

		// 单程往返切换
		$('.js-select-way>a').click(function(event) {
			$(this).addClass('active').siblings('a').removeClass('active');
			var data = $(this).attr('data-way');
			switch (data) {
				case 'round':
					singleDate(false);
					break;
				case 'one':
					singleDate(true);
					break;
			}
		});

		// 获取屏幕尺寸
		var winWidth = $(window).width();

		// 点击出发地
		var zoomShow = true;
		$fromInput.click(function(){
			if(winWidth>1350){
				$box.css('left',0);
			}else if(winWidth<=1350){
				$box.css('top',-90);
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
		});

		// 点击目的地
		$toInput.click(function(e){
			if(winWidth>1350){
				$box.css('left',350);
			}else if(winWidth<=1350){
				$box.css('left',350);
			}
			popupShow(); //增加c3动画
			$popupContent.css('z-index','1'); //覆盖cancel按钮
			$toBox.show();
			$fromBox.hide(); $dateBox.hide(); $peopleBox.hide();
		});

		// 点击日期
		$date.click(function(event) {
			if(winWidth>1350){
				$box.css('left',700);
			}else if(winWidth<=1350){
				$box.css('top',-10);
			}
			popupShow(); //增加c3动画
			$popupContent.css('z-index','1'); //覆盖cancel按钮
			$dateBox.show();
			$fromBox.hide(); $toBox.hide(); $peopleBox.hide();
		});

		// 点击人数
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

		// 点击遮罩层
		$mask.click(function(){
			popupHide(); //增加c3动画
			$(this).fadeOut();
			$box.css('left',0);
			$popupContent.css('z-index','-1'); //为了不覆盖cancel按钮
			zoomShow = false; //不展示目的地、日期、人数的动画
		});

		// 点击取消
		$('.js-flight-cancel').click(function(){
			$zoom.addClass('animated fadeOutDown');
			// $zoom.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',$zoom.css('visibility','hidden'));
			$selectWay.css({'height':'0','margin-top':'0'}).addClass('animated fadeOutDown'); //隐藏单程往返
			$mask.fadeOut(); //隐藏遮罩层
			popupHide(); //隐藏弹出内容层
			zoomShow = true; //重新点击出发地时再次显示目的地、日期、人数的动画
			$box.css('left',0); //下拉框归零
			setTimeout(function(){
	      $zoom.removeClass('animated fadeOutDown');
	      $selectWay.removeClass('animated fadeOutDown');
	      $zoom.css('visibility','hidden');
	    }, 2200);
		});

		// 出发地选择
		$fromMenuSub.on('click','>li',function(){
			var text = $(this).html().split('/');
			$fromInput.val(text[0]+'/'+text[1]);
			$box.css('left',350);
			$fromBox.slideUp(function(){ //出发地隐藏
				$toBox.slideDown(); //目的地显示
			}); 
		});

		// 目的地选择
		$toMenuSub.on('click','>li',function(){
			var text = $(this).html().split('/');
			$toInput.val(text[0]+'/'+text[1]);
			$box.css('left',700);
			$toBox.slideUp(function(){ //出发地隐藏
				$('.js-date-result').click(); //日期展示
				$dateBox.slideDown(); //目的地显示
			}); 
		});

		// 模糊匹配
		var fromcityData = ['Sihanoukville/KOS/ Cambodia','Macao/MFM/Macao,China','Phnom Penh/PNH/Cambodia','Siem Reap/REP/Cambodia','Palau/ROR/The Republic of Palau'];
		var tocityData =   ['Sihanoukville/KOS/ Cambodia','Macao/MFM/Macao,China','Phnom Penh/PNH/Cambodia','Siem Reap/REP/Cambodia','Palau/ROR/The Republic of Palau'];
		$fromInput.on('input',function(event) {
			var inputVal = $(this).val();
			var cityData;
			var data = $(this).attr('data');
			data=='js-from-menu' ? cityData=fromcityData : cityData=tocityData;
			var currentVal = inputVal.toLowerCase();
			var srdata = [];
			for (var i = 0; i < cityData.length; i++) {
				if (currentVal.trim().length > 0 && cityData[i].toLowerCase().indexOf(currentVal) > -1) {
					srdata.push(cityData[i]);
				}
			}

			$('.'+data).empty();
			$.each(srdata,function(i,val){
				var valReplace = val.replace(inputVal,'<span>'+inputVal+'</span>');
				console.log(valReplace,inputVal);
				$('.'+data).append('<li title="'+val+'">'+valReplace+'</li>');
			});
			if(currentVal===''){
				$.each(cityData,function(i,val){
					$('.'+data).append('<li title="'+val+'">'+valReplace+'</li>');
				});
			}
		});

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

