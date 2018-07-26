var LanmeiAirlinesCommon = {
	init:function(){
		this.getTop();
		this.otherEvent();

		// ie兼容性判断
		if (document.all && document.querySelector && !document.addEventListener) {
			// alert('IE8');
		}else{
			this.rem();
		}
	},

	/* 置顶按钮 */
	getTop:function(){
		var getBottom; 
		var _tick = null;
		$(window).scroll(function() {
			if (_tick) clearTimeout(_tick);
			_tick = setTimeout(function() {
				var winWidth = $(window).width();
				// if(winWidth>=1200){
					$(window).scrollTop()>300 ? $('.BackToTop').fadeIn('slow') : $('.BackToTop').fadeOut('slow');
					
					getBottom = $(document).height() - $(window).height() - $(window).scrollTop();
					if(getBottom<320){
						$('.BackToTop').css('bottom',300-getBottom);
					}else{
						$('.BackToTop').css('bottom',70);
					}
				// }
			}, 100);
		});

		$('.BackToTop').click(function(){
			$('html, body').stop().animate({scrollTop:0}, 'slow');
		});
	},

	/* 其他事件 */
	otherEvent:function(){
		
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