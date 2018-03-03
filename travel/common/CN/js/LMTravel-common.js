
var LMShopCommon = {
	init:function(){
		this.navbarSilder();
		this.isPc();
		this.otherEvent();

		// ie兼容性判断
		if (document.all && document.querySelector && !document.addEventListener) {
			// alert('IE8');
		}else{
			this.rem();
		}
	},

	/* 判断是PC端还是移动端 */
	isPc:function(){
		// 判断手机端或者PC端
		function IsPC() {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
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
			this.getTop();
		}else{
			this.mTop();
		}
	},

	/* 导航菜单切换 */
	navbarSilder:function(){
		$('.LMCompanyInfo>ul>li').mouseover(function(e){
			$(this).children('a').addClass('active').siblings('li').children('a').removeClass('active');
			$(this).children('ul').show().siblings('li').children('ul').hide();
			$(this).children('ul').css('left',-$(this)[0].offsetLeft);
		});
		$('.LMCompanyInfo>ul>li').mouseout(function(e){
			$(this).children('a').removeClass('active');
			$(this).children('ul').hide();
		});

		$('.lm-nav li a').click(function(e){
			e.preventDefault();
		})
	},

	/* 置顶按钮 */
	getTop:function(){
		var getBottom; 
		$(window).scroll(function() {
			// $(window).scrollTop()>300 ? $('.lm-toTop').fadeIn('slow') : $('.lm-toTop').fadeOut('slow');

			getBottom = $(document).height() - $(window).height() - $(window).scrollTop();
			if(getBottom<320){
				$('.lm-toTop').css('bottom',300-getBottom);
			}else{
				$('.lm-toTop').css('bottom',70);
			}
		});

		$('.lm-toTop').click(function(){
			$('html, body').animate({scrollTop:0}, 'slow');
		});
	},

	/* 移动端置顶按钮 */
	mTop:function(){
		$('.lm-m-toTop').click(function(){
			$('html, body').animate({scrollTop:0}, 'slow');
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

	/* 其他事件 */
	otherEvent:function(){
		// 滚动条自定义
		// $("html,body").panel({iWheelStep:32});
	},
};

$(document).ready(function($) {
	LMShopCommon.init();
});
