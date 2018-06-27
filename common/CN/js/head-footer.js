
$(document).ready(function($) {
	var $header = '<div class="h-menu js-h-menu">'+
					'<span>导航</span>'+
					'</div>'+
					'<div class="menu-guide bounce-left">点击这里查看更多服务</div>'+
					'<a href="http://192.168.1.19/LanmeiAirlinesNew/index_cn.html?lang=cn" class="h-logo-wrap"></a>'+
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
								'<h2>选择语言：</h2>'+
								'<a href="http://192.168.1.19/LanmeiAirlinesNew/index.html?lang=en" class="lang-en" data="en">English</a>'+
								'<a href="http://192.168.1.19/LanmeiAirlinesNew/index_cn.html?lang=cn" class="lang-zh" data="zh">简体中文</a>'+
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
					'<p class="copyright">© Copyright 2017 澜湄航空 粤 <a href="http://www.miitbeian.gov.cn" target="_Blank" rel="nofollow">ICP-17005494-1</a></p>'+
				'</div>'+
				'<div class="footer-right">'+
			        '<div class="footer-box-1 footer-box">'+
			            '<h2>旅行准备</h2>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMVisa.html" target="_blank" title="护照和签证">护照和签证</a>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMTransport.html" target="_blank" title="运输总条件">运输总条件</a>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMSpecialPassengers.html" target="_blank" title="特殊旅客服务">特殊旅客服务</a>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMNoticePassengers.html" target="_blank" title="旅客须知">旅客须知</a>'+
			        '</div>'+
			        '<div class="footer-box-2 footer-box">'+
			            '<h2>办理值机</h2>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMCheckOnline.html" target="_blank" title="网上值机">网上值机</a>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMCheckAirport.html" target="_blank" title="机场办理值机">机场办理值机</a>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMCheckTime.html" target="_blank" title="登机和行李托运时间">登机和行李托运时间</a>'+
			        '</div>'+
			        '<div class="footer-box-3 footer-box">'+
			            '<h2>您的行李</h2>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMMisBaggage.html" target="_blank" title="行李事故">行李事故</a>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/experience/LMExcessBaggage.html" target="_blank" title="逾重行李服务">逾重行李服务</a>'+
			        '</div>'+
			        '<div class="footer-box-4 footer-box">'+
			            '<h2>关于我们</h2>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/aboutUs/LMSiteMap.html" target="_blank" title="网站地图">网站地图</a>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/aboutUs/LMHistory.html" target="_blank" title="澜湄历史">澜湄历史</a>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/aboutUs/LMContact.html" target="_blank" title="联系我们">联系我们</a>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/aboutUs/LMHire.html" target="_blank" title="招贤纳士">招贤纳士</a>'+
			            '<a href="http://lanmeiairlines.com/lanmeiairlines2.0/default/menus/CN/aboutUs/LMPrivacy.html" target="_blank" title="隐私条款">隐私条款</a>'+
			        '</div>'+
			    '</div>'+
				'<div class="footer-bottom">'+
					'<p class="f-local">'+
						'<i class="iconfont icon-local"></i>'+
						'<a href="https://goo.gl/maps/7pyBze8BFe52" target="_Blank">柬埔寨金边市俄罗斯大道575号</a>'+
					'</p>'+
					'<p class="copyright">© Copyright 2017 澜湄航空 粤 <a href="http://www.miitbeian.gov.cn" target="_Blank" rel="nofollow">ICP-17005494-1</a></p>'+
				'</div>';

	var $getTop = '<div class="top">'+
					'<img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/CN/ToTop-icon-active.png" class="img02">'+
					'<p>置顶</p>'+
				'</div>';

	$('.lm-header').html($header);
	$('.lm-footer').html($footer);
	$('.BackToTop').html($getTop);
});