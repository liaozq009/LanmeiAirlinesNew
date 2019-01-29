
$(document).ready(function($) {
	var $header = '<div class="h-menu js-h-menu">'+
					'<span>Navigation</span>'+
					'</div>'+
					'<div class="menu-guide bounce-left">Click here to view more!</div>'+
					'<a href="https://lanmeiairlines.com/index.html?lang=en" class="h-logo-wrap"></a>'+
					'<div class="h-right">'+
						'<div class="h-phone js-h-phone">'+
							'<div class="phone-menu js-phone-menu">'+
								'<h2>Hotline:</h2>'+
								'<p class="p1">+855 23981363</p>'+
							'</div>'+
						'</div>'+
						'<div class="v-line"><img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/EN/v-line.png" alt="line"></div>'+
						'<div class="h-login">'+
							'<a href="javascript:;" class="loginBtn">'+
								'<p class="head-portrait"></p>'+
								'<span>Login</span>'+
							'</a>'+
							'<div class="login-menu js-login-menu">'+
								'<a href="javascript:;" class="lm-personal-center">Personal center</a>'+
								'<a href="javascript:;" class="lm-logout">Logout</a>'+
							'</div>'+
						'</div>'+
						'<div class="dot-login"><img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/EN/dot-login.png" alt="dot-login"></div>'+
						'<div class="h-registered">'+
							'<a href="javascript:;" class="REGISTEREDBtn">'+
								'<img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/EN/registered.png" alt="registered">'+
								'<span>Sign up</span>'+
							'</a>'+
						'</div>'+
						'<div class="v-line v-line-2"><img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/EN/v-line.png" alt="line"></div>'+
						'<div class="h-lang js-h-lang">'+
							'<p class="js-choose-lang"></p>'+
							'<div class="lang-menu js-lang-menu">'+
								'<h2>Choose a language:</h2>'+
								'<a href="https://lanmeiairlines.com/index.html?lang=en" class="lang-en" data="en">English</a>'+
								'<a href="https://lanmeiairlines.com/index_cn.html?lang=cn" class="lang-zh" data="zh">简体中文</a>'+
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
						'<a href="https://goo.gl/maps/7pyBze8BFe52" target="_Blank">No.575 D&amp;E, Russian Federation Boulevard, Phnom Penh, Cambodia</a>'+
					'</p>'+
					'<p class="copyright">© Copyright 2017 Lanmei Airlines. All Rights Reserved. ICP:Guangdong Province <a href="http://www.miitbeian.gov.cn" target="_Blank" rel="nofollow">ICP-17005494-1</a></p>'+
				'</div>'+
				'<div class="footer-right">'+
					'<div class="footer-box-1 footer-box">'+
						'<h2>Travel Preparation</h2>'+
						'<a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/experience/LMVisa.html" target="_blank" title="Passport and visa">Passport and visa</a>'+
						'<a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/experience/LMTransport.html" target="_blank" title="General conditions of carriage">General conditions of carriage</a>'+
						'<a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/experience/LMSpecialPassengers.html" target="_blank" title="Special services">Special services</a>'+
						'<a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/experience/LMNoticePassengers.html" target="_blank" title="Notice to passengers">Notice to passengers</a>'+
						'<a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/aboutUs/LMFAQ.html" target="_blank" title="Q&A">Q & A</a>'+
					'</div>'+
					'<div class="footer-box-2 footer-box">'+
						'<h2>Check In</h2>'+
						'<a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/experience/LMCheckOnline.html" target="_blank" title="Check in online">Check in online</a>'+
						'<a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/experience/LMCheckAirport.html" target="_blank" title="Check in at airport">Check in at airport</a>'+
						'<a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/experience/LMCheckTime.html" target="_blank"  title="Check-in and baggage drop-off times">Check-in and baggage drop-off times</a>'+
					'</div>'+
					'<div class="footer-box-3 footer-box">'+
						'<h2>Your Baggage</h2>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/experience/LMMisBaggage.html" target="_blank" title="Mishandled baggage">Mishandled baggage</a>'+
						'<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/experience/LMExcessBaggage.html" target="_blank" title="Excess baggage service">Excess baggage service</a>'+
					'</div>'+
					'<div class="footer-box-4 footer-box">'+
						'<h2>ABOUT US</h2>'+
						'<a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/aboutUs/LMSiteMap.html" target="_blank" title="Sitemap">Sitemap</a>'+
						'<a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/aboutUs/LMHistory.html" target="_blank" title="Lanmei History">Lanmei History</a>'+
						'<a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/aboutUs/LMContact.html" target="_blank" title="Contact Us">Contact Us</a>'+
						'<a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/aboutUs/LMHire.html" target="_blank" title="Join Us">Join Us</a>'+
						'<a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/aboutUs/LMPrivacy.html" target="_blank">Privacy Policy</a>'+
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
					'<img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/EN/ToTop-icon-active.png" class="img02">'+
					'<p>UP</p>'+
				'</div>';

	$('.lm-header').html($header);
	$('.lm-footer').html($footer);
	$('.BackToTop').html($getTop);
});