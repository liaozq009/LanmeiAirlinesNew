
var LanmeiAirlinesCommon = {
	init:function(){
		this.login();
		this.getTop();
		this.otherEvent();

		// ie兼容性判断
		if (document.all && document.querySelector && !document.addEventListener) {
			// alert('IE8');
		}else{
			this.rem();
		}
	},

	/* 登录 */
	login:function(){
		var reg1=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/; //邮箱
		var reg2=/^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/; //密码

		//邮箱自动补全
		$("#LanmeiUserName").changeTips({
			divTip:".on_changes"
		}); 
		$("#LanmeiUserName").changeTips({  //注册页面点击登录页面的邮箱自动补全
			divTip:".login_on_changes"
		}); 
		$("#f-LanmeiUserName").changeTips({  //忘记密码页面点击登录页面的邮箱自动补全
			divTip:".forget_on_changes"
		}); 

		/* 注册 */
		//注册邮箱自动补全
		$("#registerUserName").changeTips({ 
			divTip:".register_on_changes"
		}); 

		// 点击登录
		$('.loginBtn,.m-user-btn').click(function(e){
			e.preventDefault();
			$('#logonModal').modal();
			// $('html,body').addClass('ovfHiden'); //使网页不可滚动
		});

		// 点击注册 
		$('.REGISTEREDBtn').click(function(e){
			e.preventDefault();
			$('#registerModal').modal();
		});

		// 记住密码
		$('.agree span').click(function(){
			$(this).toggleClass('active');
		});
		$('.agree p').click(function(){
			$(this).siblings('span').toggleClass('active');
		});

		//正则验证
		var userNameVerify = function(val){
			var tips = $('.verifyInfo');
			tips.addClass('visible');
			if(reg1.test(val)){
				tips.html('Passed validation');
				tips.css('color','#8ec060');
			}else{
				tips.html("Your input is unqualified. Please input again!");
				tips.css('color','#d0011b');
			}
		};
		$('#LanmeiUserName').blur(function(){
			var val = $(this).val();
			userNameVerify(val);
		});
		$('.on_changes>li').click(function(){
			var val = $(this).html();
			userNameVerify(val);
		});

		$('#LanmeiPassword').blur(function(){
			var tips = $('.verifyInfo');
			tips.addClass('visible');
			var val = $(this).val();
			if(reg2.test(val)){
				tips.html('Passed validation');
				tips.css('color','#8ec060');
			}else{
				tips.html("Your input is unqualified. Please input again!");
				tips.css('color','#d0011b');
			}
		});

		// 忘记密码
		$('.forgetBtn').click(function(e){
			e.preventDefault();
			$('#logonModal').modal('hide');
			$('#forgetModal').modal();
		});
		// 在忘记密码界面登录
		$('.a_login').click(function(e){
			e.preventDefault();
			$('#forgetModal').modal('hide');
			$('#logonModal').modal('show');
		});

		// 在登录界面点击注册
		$('.regBtn').click(function(e){
			$('#logonModal').modal('hide');
			$('#registerModal').modal('show');
		});

		/* 注册 */
		//正则验证
		var userNameVerify2 = function(val){
			var tips = $('#registerUserName').siblings('p');
			tips.addClass('visible');
			if(reg1.test(val)){
				tips.html('Passed validation');
				tips.css('color','#8ec060');
			}else{
				tips.html("Your input is unqualified. Please input again!");
				tips.css('color','#d0011b');
			}
		};
		$('#registerUserName').blur(function(){
			var val = $(this).val();
			userNameVerify2(val);
		});
		$('.on_changes>li').click(function(){
			var val = $(this).html();
			userNameVerify2(val);
		});

		// 密码验证
		$('#registerPassword').blur(function(event) {
			var tips = $(this).siblings('p');
			tips.addClass('visible');
			var val = $(this).val();
			if(reg2.test(val)){
				tips.html('Passed validation');
				tips.css('color','#8ec060');
			}else{
				tips.html("Your input is unqualified. Please input again!");
				tips.css('color','#d0011b');
			}
		});

		// 再次输入密码验证
		$('#repeatPassword').blur(function(event) {
			var tips = $(this).siblings('p');
			tips.addClass('visible');
			var val1 = $('#registerPassword').val();
			var val2 = $(this).val();
			if(val1==val2){
				tips.html('Passed validation');
				tips.css('color','#8ec060');
			}else{
				tips.html("Your input is unqualified. Please input again!");
				tips.css('color','#d0011b');
			}
		});

		// 当忘记密码界面输入用户信息时，显示时间倒计时
		$('#f-LanmeiUserName').change(function(e){
			// console.log('change');
		});

		// 禁用button提交按钮
		$('#registerBtn').click(function(e){
			e.preventDefault();
		});

		//按回车键自动登录
		$('#LanmeiPassword').keydown(function(e){
			if(e.keyCode==13){
			   $('.userLoginBtn').click();
			}
		});
	},

	/* 置顶按钮 */
	getTop:function(){
		var getBottom; 
		var _tick = null;
		$(window).scroll(function() {
			if (_tick) clearTimeout(_tick);
			_tick = setTimeout(function() {
				var winWidth = $(window).width();
				// if(winWidth>=992){
					// $(window).scrollTop()>300 ? $('.BackToTop').fadeIn('slow') : $('.BackToTop').fadeOut('slow');
					
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