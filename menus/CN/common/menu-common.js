var LanmeiAirlinesCommon = {
	init:function(){
		this.getTop();
		this.common();
		this.otherEvent();

		// ie兼容性判断
		if (document.all && document.querySelector && !document.addEventListener) {
			// alert('IE8');
		}else{
			this.rem();
		}
	},

	common:function(){
		var $header = '<a href="https://lanmeiairlines.com/index_cn.html" class="h-logo-wrap"></a>'+
						'<div class="h-right">'+
							'<div class="h-phone js-h-phone">'+
								'<div class="phone-menu js-phone-menu">'+
									'<h2>热线电话:</h2>'+
									'<p class="p1">+855 23981800</p>'+
								'</div>'+
							'</div>'+
							'<div class="h-lang js-h-lang">'+
								'<p class="js-choose-lang"></p>'+
								'<div class="lang-menu js-lang-menu">'+
									'<h2>选择语言:</h2>'+
									'<a href="https://lanmeiairlines.com/index.html" class="lang-en" data="en">English</a>'+
									'<a href="https://lanmeiairlines.com/index_cn.html" class="lang-zh" data="zh">简体中文</a>'+
								'</div>'+
							'</div>'+
						'</div>';

		var $footer = '<p class="lm-logo"></p>'+
						'<p class="facebook">'+
							'<a href="https://www.facebook.com/lanmeiairlines/" class="a1" target="_Blank"><i class="iconfont icon-facebook"></i></a>'+
							'<a href="http://weibo.com/lanmeiair" target="_Blank"><i class="iconfont icon-wb"></i></a>'+
						'</p>'+
						'<p class="f-email"><i class="iconfont icon-email"></i><span>lm-ec@lanmeiairlines.com</span></p>'+
						'<p class="f-local">'+
							'<i class="iconfont icon-local"></i>'+
							'<a href="https://goo.gl/maps/7pyBze8BFe52" target="_Blank">柬埔寨金边市俄罗斯大道575号</a>'+
						'</p>'+
						'<p class="copyright">© Copyright 2017 澜湄航空 粤 <a href="http://www.miitbeian.gov.cn" target="_Blank" rel="nofollow">ICP-17005494-1</a></p>';

		
		var $getTop = '<div class="top">'+
						'<img src="../../../images/CN/ToTop-icon-active.png" class="img02">'+
						'<p>置顶</p>'+
					'</div>';

		$('.lm-sub-header').html($header);
		$('.lm-footer').html($footer);
		$('.BackToTop').html($getTop);
	},

	/* 置顶按钮 */
	getTop:function(){
		var getBottom; 
		var _tick = null;
		$(window).scroll(function() {
			if (_tick) clearTimeout(_tick);
			_tick = setTimeout(function() {
				var winWidth = $(window).width();
				if(winWidth>=992){
					$(window).scrollTop()>300 ? $('.BackToTop').fadeIn('slow') : $('.BackToTop').fadeOut('slow');
					
					getBottom = $(document).height() - $(window).height() - $(window).scrollTop();
					if(getBottom<320){
						$('.BackToTop').css('bottom',300-getBottom);
					}else{
						$('.BackToTop').css('bottom',70);
					}
				}
			}, 100);
		});

		$('.BackToTop').click(function(){
			$('html, body').stop().animate({scrollTop:0}, 'slow');
		});
	},

	/* 其他事件 */
	otherEvent:function(){
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
		$('.js-lang-menu>a').click(function(event) {
			var data = $(this).attr('data');
			switch (data) {
				case 'en':
				$('.js-choose-lang').attr('src','../../../images/CN/lang-en.png');
				$langMenu.hide();
				break;
				case 'zh':
				$('.js-choose-lang').attr('src','../../../images/CN/lang-zh.png');
				$langMenu.hide();
				break;
			}
		});

		/* 电话 */
		var $phoneMenu = $('.js-phone-menu');
		$('.js-h-phone').mouseenter(function(event) {
			$phoneMenu.show();
		}).mouseleave(function(event) {
			$phoneMenu.hide();
		});
		$('.js-h-phone').click(function(e) {
			e.stopPropagation();
			$('.js-phone-menu').show();
		});
		$('html').click(function(event) {
			$('.js-lang-menu').hide();
			$('.js-phone-menu').hide();
		});

		// 日期选择--动态加载
		var formatDate = function(ymd) { //日期格式化
		    return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function(ymdFormatDate, y, m, d){
		        m < 10 && (m = '0' + m);
		        d < 10 && (d = '0' + d);
		        return y + '-' + m + '-' + d;
		    });
		};
		var today  = new Date();
		var startTimeStr = new Date(today.getTime()+86400000*1); 
		var startTime = formatDate(startTimeStr.getFullYear()+'-'+(startTimeStr.getMonth()+1)+'-'+startTimeStr.getDate());  //新增代码2017-10-09
		// 搜索航班跳转
		$('.a-search-flight').click(function(event) {
			event.preventDefault(); 
			window.open('http://b2c.lanmeiairlines.com/lqWeb/reservation/AVQuery.do?orgcity=PNH&dstcity=MFM&language=CN&CURRENCY=USD&tripType=OW&takeoffDate='+startTime+'&cabinType=ECONOMY&adultCount=1&childCount=0&returnDate=');
		});
	},

	/* 屏幕适配 */
	rem:function(){
		;(function(win) {
			var doc = win.document;
			var docEl = doc.documentElement;
			var tid;

			function refreshRem() {
				var width = docEl.getBoundingClientRect().width;
		        if (width > 540) { // 最大宽度
		        	width = 540;
		        }
		        var rem = width / 3.2; 
		        docEl.style.fontSize = rem + 'px';
		        // console.log(width,rem);
		    }

		    win.addEventListener('resize', function() {
		    	clearTimeout(tid);
		    	tid = setTimeout(refreshRem, 300);
		    }, false);
		    win.addEventListener('pageshow', function(e) {
		    	if (e.persisted) {
		    		clearTimeout(tid);
		    		tid = setTimeout(refreshRem, 300);
		    	}
		    }, false);

		    refreshRem();

		})(window);
	},

};

$(document).ready(function($) {
	LanmeiAirlinesCommon.init();
});