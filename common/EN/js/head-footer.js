
$(document).ready(function($) {
	var $header = '<a href="http://lanmeiairlines.com" class="h-logo-wrap"></a>'+
					'<div class="h-right">'+
						'<div class="h-phone js-h-phone">'+
							'<div class="phone-menu js-phone-menu">'+
								'<h2>Hotline:</h2>'+
								'<p class="p1">+855 23981800</p>'+
							'</div>'+
						'</div>'+
						'<div class="h-lang js-h-lang">'+
							'<p class="js-choose-lang"></p>'+
							'<div class="lang-menu js-lang-menu">'+
								'<h2>Choose a language:</h2>'+
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
						'<a href="https://goo.gl/maps/7pyBze8BFe52" target="_Blank">No.575 D&amp;E, Russian Federation Boulevard, Phnom Penh, Cambodia</a>'+
					'</p>'+
					'<p class="copyright">© Copyright 2017 Lanmei Airlines. All Rights Reserved. ICP:Guangdong Province <a href="http://www.miitbeian.gov.cn" target="_Blank" rel="nofollow">ICP-17005494-1</a></p>';

	var $getTop = '<div class="top">'+
					'<img src="../../images/EN/ToTop-icon-active.png" class="img02">'+
					'<p>UP</p>'+
				'</div>';

	$('.lm-sub-header').html($header);
	$('.lm-footer').html($footer);
	$('.BackToTop').html($getTop);
});