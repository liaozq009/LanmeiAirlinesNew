
$(document).ready(function($) {
	var $header = '<div class="h-menu js-h-menu">'+
					'<span>导航</span>'+
					'</div>'+
					'<div class="menu-guide bounce-left">Click here to view more!</div>'+
					'<a href="http://lanmeiairlines.com" class="h-logo-wrap"></a>'+
					'<div class="h-right">'+
						'<div class="h-phone js-h-phone">'+
							'<div class="phone-menu js-phone-menu">'+
								'<h2>热线电话：</h2>'+
								'<p class="p1">+855 23981800</p>'+
							'</div>'+
						'</div>'+
						'<div class="v-line"><img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/CN/v-line.png" alt="line"></div>'+
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
						'<div class="dot-login"><img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/CN/dot-login.png" alt="dot-login"></div>'+
						'<div class="h-registered">'+
							'<a href="javascript:;" class="REGISTEREDBtn">'+
								'<img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/CN/registered.png" alt="registered">'+
								'<span>注册</span>'+
							'</a>'+
						'</div>'+
						'<div class="v-line v-line-2"><img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/CN/v-line.png" alt="line"></div>'+
						'<div class="h-lang js-h-lang">'+
							'<p class="js-choose-lang"></p>'+
							'<div class="lang-menu js-lang-menu">'+
								'<h2>Choose a language:</h2>'+
								'<a href="http://lanmeiairlines.com" class="lang-en" data="en">English</a>'+
								'<a href="http://lanmeiairlines.com/index_cn.html" class="lang-zh" data="zh">简体中文</a>'+
							'</div>'+
						'</div>'+
					'</div>';

	var $footer = '<div class="footer-left">'+
					'<p class="lm-logo"></p>'+
					'<p class="facebook">'+
						'<a href="https://www.facebook.com/lanmeiairlines/" target="_blank" class="a1"><i class="iconfont icon-facebook"></i></a>'+
						'<a href="http://weibo.com/lanmeiair" target="_blank"><i class="iconfont icon-wb"></i></a>'+
					'</p>'+
					'<p class="f-email"><i class="iconfont icon-email"></i><span>lm-ec@lanmeiairlines.com</span></p>'+
					'<p class="f-local">'+
						'<i class="iconfont icon-local"></i>'+
						'<a href="https://goo.gl/maps/7pyBze8BFe52" target="_Blank">柬埔寨金边市俄罗斯大道575号</a>'+
					'</p>'+
					'<p class="copyright">© Copyright 2017 Lanmei Airlines. All Rights Reserved. ICP:Guangdong Province <a href="http://www.miitbeian.gov.cn" target="_Blank" rel="nofollow">ICP-17005494-1</a></p>'+
				'</div>'+
				'<div class="footer-right">'+
					'<div class="footer-box-1 footer-box">'+
						'<h2>旅行准备</h2>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMVisa.html" target="_blank" title="护照和签证">护照和签证/a>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMTransport.html" target="_blank" title="General conditions of carriage">General conditions of carriage</a>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMSpecialPassengers.html" target="_blank" title="Special services">Special services</a>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMNoticePassengers.html" target="_blank" title="Notice to passengers">Notice to passengers</a>'+
					'</div>'+
					'<div class="footer-box-2 footer-box">'+
						'<h2>Check In</h2>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMCheckOnline.html" target="_blank" title="Check in online">Check in online</a>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMCheckAirport.html" target="_blank" title="Check in at airport">Check in at airport</a>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMCheckTime.html" target="_blank"  title="Check-in and baggage drop-off times">Check-in and baggage drop-off times</a>'+
					'</div>'+
					'<div class="footer-box-3 footer-box">'+
						'<h2>Your Baggage</h2>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMMisBaggage.html" target="_blank" title="Mishandled baggage">Mishandled baggage</a>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMExcessBaggage.html" target="_blank" title="Excess baggage service">Excess baggage service</a>'+
					'</div>'+
					'<div class="footer-box-4 footer-box">'+
						'<h2>ABOUT US</h2>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/aboutUs/LMSiteMap.html" target="_blank" title="Sitemap">Sitemap</a>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/aboutUs/LMHistory.html" target="_blank" title="Lanmei History">Lanmei History</a>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/aboutUs/LMContact.html" target="_blank" title="Contact Us">Contact Us</a>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/aboutUs/LMHire.html" target="_blank" title="Join Us">Join Us</a>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/aboutUs/LMPrivacy.html" target="_blank">Privacy Policy</a>'+
					'</div>'+
				'</div>'+
				'<div class="footer-bottom">'+
					'<p class="f-local">'+
						'<i class="iconfont icon-local"></i>'+
						'<a href="https://goo.gl/maps/7pyBze8BFe52" target="_Blank">No.575 D&amp;E, Russian Federation Boulevard, Phnom Penh, Cambodia</a>'+
					'</p>'+
					'<p class="copyright">© Copyright 2017 Lanmei Airlines. All Rights Reserved. ICP:Guangdong Province <a href="http://www.miitbeian.gov.cn" target="_Blank" rel="nofollow">ICP-17005494-1</a></p>'+
				'</div>';

	var $getTop = '<div class="top">'+
					'<img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/CN/ToTop-icon-active.png" class="img02">'+
					'<p>UP</p>'+
				'</div>';

	$('.lm-header').html($header);
	$('.lm-footer').html($footer);
	$('.BackToTop').html($getTop);
});