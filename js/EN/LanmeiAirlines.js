
var LanmeiAirlines = {
	init:function(){
		this.ticketSelect();
		this.selectPeople();
		this.otherEvent();
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

		var $fromMenuSub = $('.js-from-menu>li'); //出发地下拉菜单
		var $toMenuSub = $('.js-to-menu>li'); //目的地下拉菜单

		var $fromBox = $('.js-airport-from'); //出发地外层
		var $toBox = $('.js-airport-to'); //目的地外层
		var $dateBox = $('.js-popup-date'); //日期外层
		var $peopleBox = $('.js-popup-people'); //人数选择外层

		var $zoom = $('.js-ticket-to,.js-ticket-date,.js-ticket-people,.js-search-flight');

		// c3动画
		var popupShow = function(){
			$mask.fadeIn(); //显示遮罩层
			$box.addClass('popup-box-before');
			$content.removeClass('popup-inactive').addClass('popup-active'); 
		};
		var popupHide = function(){
			$content.removeClass('popup-active').addClass('popup-inactive'); 
		};

		// 点击出发地
		$fromInput.click(function(){
			$fromBox.parents('.js-popup-box').css('left',0);
			popupShow(); //增加c3动画
			$fromBox.show();
			$toBox.hide(); $dateBox.hide(); $peopleBox.hide();
			$zoom.addClass('animated zoomIn').css('visibility','visible');
			setTimeout(function(){
	      $zoom.removeClass('animated zoomIn');
	    }, 1000);
		});

		// 点击目的地
		$toInput.click(function(e){
			$toBox.parents('.js-popup-box').css('left',350);
			popupShow(); //增加c3动画
			$toBox.show();
			$fromBox.hide(); $dateBox.hide(); $peopleBox.hide();
		});

		// 点击日期
		$date.click(function(event) {
			$dateBox.parents('.js-popup-box').css('left',700);
			popupShow(); //增加c3动画
			$dateBox.show();
			$fromBox.hide(); $toBox.hide(); $peopleBox.hide();
		});

		// 点击人数
		$people.click(function(event) {
			$peopleBox.parents('.js-popup-box').css('left',950);
			popupShow(); //增加c3动画
			$peopleBox.show();
			$fromBox.hide(); $toBox.hide(); $dateBox.hide();
		});

		// 点击遮罩层
		$mask.click(function(){
			$(this).fadeOut();
			popupHide(); //增加c3动画
			$box.removeClass('popup-box-before'); //隐藏小箭头
			$box.css('left',0);
		});

		// 点击取消
		$('.js-flight-cancel').click(function(){
			$zoom.addClass('animated zoomOut');
			// $zoom.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',$zoom.css('visibility','hidden'));
			setTimeout(function(){
	      $zoom.removeClass('animated zoomOut');
	      $zoom.css('visibility','hidden');
	    }, 1500);
		});

		// 出发地选择
		$fromMenuSub.click(function(){
			var text = $(this).html();
			$fromInput.val(text);
			$box.css('left',350);
			$fromBox.slideUp(function(){ //出发地隐藏
				$toBox.slideDown(); //目的地显示
			}); 
		});

		// 目的地选择
		$toMenuSub.click(function(){
			var text = $(this).html();
			$toInput.val(text);
			$box.css('left',700);
			$toBox.slideUp(function(){ //出发地隐藏
				$('.js-date-result').click(); //日期展示
				$dateBox.slideDown(); //目的地显示
			}); 
		});

		/* 日期选择--动态加载 */
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

				// 操作外层box移动
				$box.css('left',950);
				$dateBox.slideUp(function(){ //出发地隐藏
					$peopleBox.slideDown(); //目的地显示
				}); 
		  } 
		);
	},

	/* 人数选择 */
	selectPeople:function(){
		var adultNum = 1;
		var childNum = 0;
		var infantNum = 0;

		// 成人
		var adult = function(){
			$('.js-adult-add').click(function(){
				adultNum++;
				$(this).siblings('span').html(adultNum);
				adultNum==2 && $(this).siblings('.sub-people').removeClass('off-sub-operation');
			});
			$('.js-adult-sub').click(function(){
				adultNum--;
				if(adultNum<2){
					adultNum=1;
					$(this).addClass('off-sub-operation');
				}
				$(this).siblings('span').html(adultNum);
			});
		}

		// 小孩
		var child = function(){
			$('.js-child-add').click(function(){
				childNum++;
				$(this).siblings('span').html(childNum);
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
			});
		}

		// 婴儿
		var infant = function(){
			$('.js-infant-add').click(function(){
				infantNum++;
				$(this).siblings('span').html(infantNum);
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

