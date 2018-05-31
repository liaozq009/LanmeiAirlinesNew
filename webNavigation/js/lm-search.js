
var LanmeiAirlines = {
	init:function(){
		this.common();
		this.otherEvent();
	},
	common:function(){
		var $header = '<a href="http://lanmeiairlines.com/index_cn.html" class="h-logo-wrap"></a>'+
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
									'<a href="http://lanmeiairlines.com" class="lang-en" data="en">English</a>'+
									'<a href="http://lanmeiairlines.com/index_cn.html" class="lang-zh" data="zh">简体中文</a>'+
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
						'<img src="images/ToTop-icon-active.png" class="img02">'+
						'<p>置顶</p>'+
					'</div>';

		$('.lm-sub-header').html($header);
		$('.lm-footer').html($footer);
		$('.BackToTop').html($getTop);
	},
	otherEvent:function(){
		var winWidth = $(window).width();
		if(winWidth>992){
			$('.js-hotSearch-box li:nth-child(10n+1)').css('margin-left','0');
			$('.js-searchList-wrap .searchList-box:nth-child(3n+2)').addClass('searchList-center');
		}
	},
}

$(function() {
	LanmeiAirlines.init();
});