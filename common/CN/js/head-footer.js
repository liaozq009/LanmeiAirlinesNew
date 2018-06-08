
$(document).ready(function($) {
	var $header = '<a href="/index_cn.html" class="h-logo-wrap"></a>'+
						'<div class="h-right">'+
							'<div class="h-phone js-h-phone">'+
								'<div class="phone-menu js-phone-menu">'+
									'<h2>热线电话:</h2>'+
									'<p class="p1">+855 23981800</p>'+
								'</div>'+
							'</div>'+
							'<div class="v-line"><img src="../../images/CN/v-line.png" alt="line"></div>'+
							'<div class="h-login">'+
								'<a href="javascript:;" class="loginBtn">'+
									'<p class="head-portrait"></p>'+
									'<span>登录</span>'+
								'</a>'+
								'<div class="login-menu js-login-menu">'+
									'<a href="javascript:;" class="lm-personal-center">个人中心</a>'+
									'<a href="javascript:;" class="lm-logout">注销</a>'+
								'</div>'+
							'</div>'+
							'<div class="dot-login"><img src="../../images/CN/dot-login.png" alt="dot-login"></div>'+
							'<div class="h-registered">'+
								'<a href="javascript:;" class="REGISTEREDBtn">'+
									'<img src="../../images/CN/registered.png" alt="registered">'+
									'<span>注册</span>'+
								'</a>'+
							'</div>'+
							'<div class="v-line v-line-2"><img src="../../images/CN/v-line.png" alt="line"></div>'+
							'<div class="h-lang js-h-lang">'+
								'<p class="js-choose-lang"></p>'+
								'<div class="lang-menu js-lang-menu">'+
									'<h2>选择语言:</h2>'+
									'<a href="/index.html" class="lang-en" data="en">English</a>'+
									'<a href="/index_cn.html" class="lang-zh" data="zh">简体中文</a>'+
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
					'<img src="../../images/CN/ToTop-icon-active.png" class="img02">'+
					'<p>置顶</p>'+
				'</div>';

	$('.lm-sub-header').html($header);
	$('.lm-footer').html($footer);
	$('.BackToTop').html($getTop);
});