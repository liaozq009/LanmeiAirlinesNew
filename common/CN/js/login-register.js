
var LMComLoginReg = {
	init:function(){
		this.commonHtml();
		this.login();
		this.register();
	},
	commonHtml:function(){
		var $login = '<div class="modal-dialog" role="document">'+
		        '<div class="modal-content">'+
		            '<div class="modal-header">'+
		                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">关闭<span aria-hidden="true">&times;</span></button>'+
		            '</div>'+
		            '<div class="modal-body">'+
		                '<h2 class="loginTitle">登录</h2>'+
		                '<span class="verifyInfo">帐户或密码错误！</span>'+
		                '<form id="loginForm" method="POST" action="">'+
		                   ' <div class="form-group">'+
		                        '<input type="text" class="form-control" id="LanmeiUserName" placeholder="邮箱账号" autocomplete="off"/>'+
		                       ' <ul class="login_on_changes on_changes">'+
		                            '<li email="@gmail.com"></li>'+
		                            '<li email="@qq.com"></li>'+
		                           ' <li email="@sina.com"></li>'+
		                            '<li email="@163.com"></li>'+
		                            '<li email="@hotmail.com"></li>'+
		                            '<li email="@126.com"></li>'+
		                            '<li email="@yahoo.com"></li>'+
		                        '</ul>'+
		                    '</div>'+
		                    '<div class="form-group">'+
		                        '<input type="password" class="form-control" id="LanmeiPassword" placeholder="密码" autocomplete="off"/>'+
		                    '</div>'+
		                    '<div class="agree form-group">'+
		                        '<span class=""></span>'+
		                        '<p>30天内无需密码登录 ！</p>'+
		                        '<a href="#" class="forgetBtn">忘了？</a>'+
		                    '</div>'+
		                    '<div class="form-group">'+
		                        '<button type="button" class="btn userLoginBtn">登录</button>'+
		                    '</div>'+
		                '</form>'+
		            '</div>'+
		            '<div class="modal-footer">还是没有帐号？立即 <a href="javascript:void(0)" class="regBtn">注册</a>'+
		            '</div>'+
		        '</div>'+
		    '</div>';

		var $register = '<div class="modal-dialog" role="document">'+
		        '<div class="modal-content">'+
		            '<div class="modal-header">'+
		               ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">关闭<span aria-hidden="true">&times;</span></button>'+
		            '</div>'+
		           ' <div class="modal-body">'+
		                '<form class="registerWrapper" method="POST" action="">'+
		                    '<h2>注册</h2>'+
		                    '<div class="registerContent">'+
		                       ' <div class="registerInfo">'+
		                           '<input type="text" name="" value="" id="registerUserName" placeholder="请输入邮箱账号" autocomplete="off"/>'+
		                            '<img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/CN/register-email.png"/>'+
		                            '<p>此邮箱已被注册！</p>'+
		                            '<ul class="register_on_changes on_changes">'+
		                                '<li email="@gmail.com"></li>'+
		                                '<li email="@qq.com"></li>'+
		                                '<li email="@sina.com"></li>'+
		                                '<li email="@163.com"></li>'+
		                                '<li email="@hotmail.com"></li>'+
		                                '<li email="@126.com"></li>'+
		                                '<li email="@yahoo.com"></li>'+
		                            '</ul>'+
		                        '</div>'+
		                        '<div class="registerPassword">'+
		                            '<input type="password" name="" value="" id="registerPassword" placeholder="8-16个字符的密码" autocomplete="off"/>'+
		                            '<img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/CN/register-password.png">'+
		                            '<p>密码强度： <span><i class="i1"></i><i class="i2"></i><i class="i3"></i><i class="i4"></i><i class="i5"></i><i class="i6"></i></span></p>'+
		                       ' </div>'+
		                       ' <div class="repeatPassword">'+
		                            '<input type="password" name="" value="" id="repeatPassword" placeholder="请重复输入密码" autocomplete="off"/>'+
		                            '<img src="https://lanmeiairlines.com/lanmeiairlines2.0/default/images/CN/register-password.png">'+
		                            '<p>密码不匹配！</p>'+
		                            '<span>密码为不少于8为数的两种字符结合，数字（0-9），小写字母，大写字母（A-Z）字母（a-z）或特殊字符</span>'+
		                        '</div>'+
		                        '<div class="agree">'+
		                            '<span></span>'+
		                            '<p>我同意 <a href="#">澜湄航空的条款和条件</a></p>'+
		                        '</div>'+
		                        '<div class="registerBtn">'+
		                            '<button id="registerBtn">注册</button>'+
		                        '</div>'+
		                    '</div>'+
		                '</form>'+
		            '</div>'+
		        '</div>'+
		    '</div>';

		var $forgetPassword = '<div class="modal-dialog" role="document">'+
		        '<div class="modal-content">'+
		            '<div class="modal-header">'+
		                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">关闭<span aria-hidden="true">&times;</span></button>'+
		            '</div>'+
		            '<div class="modal-body">'+
		                '<h2 class="loginTitle">忘记密码</h2>'+
		                '<span class="verifyInfo">帐户或密码错误！</span>'+
		                '<form id="f-loginForm" method="POST" action="">'+
		                    '<div class="form-group">'+
		                        '<input type="text" class="form-control" id="f-LanmeiUserName" placeholder="邮箱账号" autocomplete="off"/>'+
		                        '<ul class="forget_on_changes on_changes">'+
		                            '<li email="@gmail.com"></li>'+
		                            '<li email="@qq.com"></li>'+
		                            '<li email="@sina.com"></li>'+
		                            '<li email="@163.com"></li>'+
		                            '<li email="@hotmail.com"></li>'+
		                            '<li email="@126.com"></li>'+
		                            '<li email="@yahoo.com"></li>'+
		                        '</ul>'+
		                    '</div>'+
		                    '<div class="form-group">'+
		                        '<input type="password" class="form-control" id="f-LanmeiPassword" placeholder="密码" autocomplete="off"/>'+
		                       ' <button type="button" id="f-getPasswordBtn">获取密码</button>'+
		                    '</div>'+
		                    '<div class="agree form-group">'+
		                       '<p>请注意查收电子邮件信息。</p>'+
		                    '</div>'+
		                    '<div class="form-group">'+
		                        '<button type="button" class="btn f-userLoginBtn">登录</button>'+
		                    '</div>'+
		                '</form>'+
		            '</div>'+
		            '<div class="modal-footer">'+
		                '<a href="#" class="a_login">登录</a><a href="javascript:void(0)" class="a_registered">注册</a>'+
		            '</div>'+
		        '</div>'+
		    '</div>';

		$('#logonModal').html($login);
		$('#registerModal').html($register);
		$('#forgetModal').html($forgetPassword);
	},

	login:function(){
	    var reg1=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/; //邮箱
	    var reg2=/^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/; //密码

	    //正则验证
	    var userNameVerify = function(val){
	        var tips = $('.verifyInfo');
	        tips.addClass('visible');
	        if(reg1.test(val)){
	            tips.html('通过验证');
	            tips.css('color','#8ec060');
	        }else{
	            tips.html("您的输入是不合格的。请再次输入！");
	            tips.css('color','#d0011b');
	        }
	    };
	    
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

	    //保持疑问 开始
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

	    //保持疑问结束
	    // 记住密码
	    $('.agree span').click(function(){
	        $(this).toggleClass('active');
	    });
	    $('.agree p').click(function(){
	        $(this).siblings('span').toggleClass('active');
	    });

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
	            tips.html('通过验证');
	            tips.css('color','#8ec060');
	        }else{
	            tips.html("您的输入是不合格的。请再次输入！");
	            tips.css('color','#d0011b');
	        }
	    });

	    // 忘记密码
	    $('.forgetBtn').click(function(e){
	        e.preventDefault();
	        $('#logonModal').modal('hide');
	        $('#forgetModal').modal();
	        $(".verifyInfoForget").html("");
	        $("#f-LanmeiUserName").val("");
	        $("#f-LanmeiPassword").val("");
	    });
	    // 在忘记密码界面登录
	    $('.a_login').click(function(e){
	        e.preventDefault();
	        $('#forgetModal').modal('hide');
	        $('#logonModal').modal('show');
	        $(".verifyInfo").html("");
	        $("#LanmeiUserName").val("");
	        $("#LanmeiPassword").val("");
	    });

	    //在忘记密码模态框中点击注册（右下角）
	    $('.a_registered').click(function(){
	        $('#forgetModal').modal('hide');
	        $('#registerModal').modal();
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
	            tips.html('通过验证');
	            tips.css('color','#8ec060');
	        }else{
	            tips.html("您的输入是不合格的。请再次输入！");
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
	            tips.html('通过验证');
	            tips.css('color','#8ec060');
	        }else{
	            tips.html("您的输入是不合格的。请再次输入！");
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
	            tips.html('通过验证');
	            tips.css('color','#8ec060');
	        }else{
	            tips.html("您的输入是不合格的。请再次输入！");
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

	    //登录模态框中点击登录
	    $(".userLoginBtn").click(function(){
	        var email = $.trim($("#LanmeiUserName").val());
	        var pwd  = $.trim($("#LanmeiPassword").val());
	        //邮箱
	        var tips = $('.verifyInfo');
	        tips.addClass("visible");
	        tips.html("");
	        if(email == "" || pwd == ""){
	            tips.html("您的输入是不合格的。请再次输入！");
	            tips.css('color','#d0011b');
	            return;
	        }
	        
	        var regEmail=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/; 
	        if(!regEmail.test(email)){
	            tips.html("输入无效，请再次输入！");
	            tips.css('color','#d0011b');
	            return;
	        }
	        //密码
	        var regPwd=/^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/; 
	        if(!regPwd.test(pwd)){
	            tips.html("输入无效，请再次输入！");
	            tips.css('color','#d0011b');
	            return;
	        }
	        
	        var remberFlag = 0;
	        if($(".form-group span").eq(0).hasClass("active")){
	            remberFlag = 1;
	        }
	        $.ajax({
	            url: '/login/loginSubmit.jhtml',
	            async: false,
	            type: "POST",
	            data:{"email":email,"pwd":pwd},
	            success:function(data){
	                var code = data.code;
	                //code 0000登录成功; 0001 、0004服务器异常； 0002、0003用户名或者密码不正确
	                if(code == "0000"){
	                    window.location.reload();
	                }else if(code == "0001" || code == "0004"){
	                    $('.verifyInfo').addClass('visible').html("用户名或密码不正确！").css('color','#d0011b');
	                }else if(code == "0002" || code == "0003"){
	                    $('.verifyInfo').addClass('visible').html("用户异常！").css('color','#d0011b');
	                }
	            },
	            error:function(){
	                $('.verifyInfo').addClass('visible').html("服务器异常！").css('color','#d0011b');  
	            }
	        });
	    });
	    
	    //按回车键自动登录
	    $('#LanmeiPassword').keydown(function(e){
	        if(e.keyCode==13){
	           $('.userLoginBtn').click();
	        }
	    });
	    
	    //登录或注册以后用户名显示，并且把注册按钮内容更改为注销
	    if(null != $.cookie("lanmei_username") && undefined != $.cookie("lanmei_username")){
	        //$("#loginAndLoginoutBtn span").html($.cookie("lanmei_username")).attr('title',$.cookie("lanmei_username"));
	        $("#loginAndLoginoutBtn span").html($.cookie("lanmei_username"));
	        $("#loginAndLoginoutBtn .head-portrait").css('background-image','url('+$.cookie("user_avatar")+')');
	        $("#registerAndAccountBtn span").html("注销"); //改为注销
	        $(".h-login").addClass("success-h-login");
	        var winWidth = $(window).width();
	        if(winWidth>993){
	            layer.tips('Enter personal center!', '#loginAndLoginoutBtn img',{
	                tips: [3, '#8ec060'],
	                time: 6000
	            });
	        }
	    }else if(null != $.cookie("lanmei_nickname") && undefined != $.cookie("lanmei_nickname")){
	        $("#loginAndLoginoutBtn span").html($.cookie("lanmei_nickname"));
	        $("#loginAndLoginoutBtn img").attr('src','/lanmeiairlines/default/images/CN/login-icon.png');
	        $("#registerAndAccountBtn span").html("注销"); //改为注销
	        
	        var winWidth = $(window).width();
	        if(winWidth>993){
	            layer.tips('进入个人中心！', '#loginAndLoginoutBtn img',{
	                tips: [3, '#8ec060'],
	                time: 6000
	            });
	        }
	    }
	    
	    //忘记密码登录
	    $(".f-userLoginBtn").click(function(){
	        var email = $.trim($("#f-LanmeiUserName").val());
	        var pwd  = $.trim($("#f-LanmeiPassword").val());
	        //邮箱
	        var tips = $('.verifyInfoForget');
	        tips.addClass("visible");
	        tips.html("");
	        if(email == "" || pwd == ""){
	            tips.html("您的输入是不合格的。请再次输入！");
	            tips.css('color','#d0011b');
	            return;
	        }
	        
	        var regEmail=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/; 
	        if(!regEmail.test(email)){
	            tips.html("输入无效，请重新输入！");
	            tips.css('color','#d0011b');
	            return;
	        }
	        //密码
	        var regPwd=/^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/; 
	        if(!regPwd.test(pwd)){
	            tips.html("输入无效，请重新输入!");
	            tips.css('color','#d0011b');
	            return;
	        }
	        
	        var remberFlag = 0;
	        if($(".form-group span").eq(0).hasClass("active")){
	            remberFlag = 1;
	        }
	        $.ajax({
	            url: '/login/loginSubmit.jhtml',
	            async: false,
	            type: "POST",
	            data:{"email":email,"pwd":pwd},
	            success:function(data){
	                var code = data.code;
	                //code 0000登录成功; 0001 、0004服务器异常； 0002、0003用户名或者密码不正确
	                if(code == "0000"){
	                    window.location.reload();
	                }else if(code == "0001" || code == "0004"){
	                    $('.verifyInfoForget').addClass('visible').html("用户名或密码不正确！").css('color','#d0011b');
	                }else if(code == "0002" || code == "0003"){
	                    $('.verifyInfoForget').addClass('visible').html("用户异常！").css('color','#d0011b');
	                }
	            },
	            error:function(){
	                $('.verifyInfoForget').addClass('visible').html("服务器异常！").css('color','#d0011b');  
	            }
	        });
	    })
	    
	    //邮箱验证
	    $("#f-LanmeiUserName").on("change", function(){
	        checkEmail($(this).val());
	    });
	    //验证E-mail
	    function checkEmail(email){
	        var $verifyInfoForget = $(".verifyInfoForget");
	        $verifyInfoForget.css({"visibility":"hidden","color":"rgb(208, 1, 27)"}).html("");
	        if(email == undefined || email == "" || $.trim(email) == "" ){
	            $verifyInfoForget.css("visibility", "visible");
	            $verifyInfoForget.html("E-mail is required!");
	            return false;
	        }
	        
	        var regEmail=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/; 
	        if(!regEmail.test(email)){
	            $verifyInfoForget.css("visibility", "visible");
	            $verifyInfoForget.html("输入无效，请重新输入！");
	            return false;
	        }
	        $verifyInfoForget.css("visibility", "hidden");
	        return true;
	    }
	    
	    //Get Password按钮绑定点击事件
	    $("#f-getPasswordBtn").click(function(){
	        $(".verifyInfoForget").css({"visibility":"hidden","color":"rgb(208, 1, 27)"}).html("");
	        var email = $("#f-LanmeiUserName").val();
	        var checkEmailFlag = checkEmail(email);
	        if(!checkEmailFlag){
	            return;
	        }
	        //ajax验证email用户是否存在,并修改密码
	        $.ajax({
	            url: '/password/getLmPassword.jhtml',
	            async: false,
	            type: "POST",
	            data:{"email":email,
	                 "language":"EN"        
	            },
	            success:function(data){
	                var code = data.code;
	                var $verifyInfoForget = $(".verifyInfoForget");
	                //code 0000修改密码成功并已发送邮件; 0001该用户不存在 ；0004邮箱格式不正确； 0002服务器异常
	                if(code == "0000"){
	                    settime();
	                    $verifyInfoForget.css({"visibility":"visible","color":"rgb(142, 192, 96)"}).html(" 更改密码成功！已发送新密码到" + email + "，请检查！");
	                }else if(code == "0001"){
	                    $verifyInfoForget.css("visibility","visible").html("用户不存在！");
	                }else if(code == "0002"){
	                    $verifyInfoForget.css("visibility","visible").html("异常的服务器。请稍后再试。");
	                }else if(code == "0004"){
	                    $verifyInfoForget.css("visibility","visible").html("输入无效，请重新输入！");
	                }
	            },
	            error:function(){
	                $(".verifyInfoForget").css("visibility","visible").html("异常的服务器。请稍后再试...");
	            }
	        });
	        
	    });

	    //倒计时
	    var countdown = 120;
	    function settime(){
	        if(countdown == 0){
	            $("#f-getPasswordBtn").attr("disabled",false);
	            $("#f-getPasswordBtn").html("获取密码");
	            countdown =60;
	            return;
	        }else{
	            $("#f-getPasswordBtn").attr("disabled",true);
	            $("#f-getPasswordBtn").html("Resend!("+countdown+"s)");
	            countdown--;
	        }
	        setTimeout(function(){settime();},1000);
	    }
	    
	    //登录后  点击用户名跳转个人中心#loginAndLoginoutBtn,
	    $(".lm-personal-center").click(function(){
	        if(null != $.cookie("lanmei_username") && undefined != $.cookie("lanmei_username")){
	            //open一个页面
	            window.open("/member/indexCN.jhtml");
	        }else{
	            $(".verifyInfo").html("");
	            $("#LanmeiUserName").val("");
	            $("#LanmeiPassword").val("");
	            $('#logonModal').modal();
	        }
	    });
	    
	    $("#loginAndLoginoutBtn").click(function(){
	        if(null == $.cookie("lanmei_username") && undefined == $.cookie("lanmei_username")){
	            $(".verifyInfo").html("");
	            $("#LanmeiUserName").val("");
	            $("#LanmeiPassword").val("");
	            $('#logonModal').modal();
	        }
	    });
	    
	    //注册和注销
	    $("#registerAndAccountBtn,.lm-logout").click(function(){
	        var lanmeiUsername = $.cookie("lanmei_username");
	        //未登录时候跳转到注册页面，登录以后跳转到个人中心
	        if(null == lanmeiUsername || undefined == lanmeiUsername || "" == lanmeiUsername){
	            $('#registerModal').modal();
	        }else{
	            window.location.href = "/logout/indexCN.jhtml";  //注销用户名
	        }
	    });
	    
	    $(".memberInfo").click(function(){
	    	if(null != $.cookie("lanmei_username") && undefined != $.cookie("lanmei_username")){
	    		window.open("../member/indexCN.jhtml?info="+$(this).attr("data-type"));
	        }else{
	        	 $(".verifyInfo").html("");
	             $("#LanmeiUserName").val("");
	             $("#LanmeiPassword").val("");
	             $('#logonModal').modal();
	        }
		});
	    
	    $(".myCoupon").click(function(){
	    	if(null != $.cookie("lanmei_username") && undefined != $.cookie("lanmei_username")){
	    		window.open("../member/indexCN.jhtml?coupon="+$(this).attr("data-type"));
	        }else{
	        	 $(".verifyInfo").html("");
	             $("#LanmeiUserName").val("");
	             $("#LanmeiPassword").val("");
	             $('#logonModal').modal();
	        }
		});
	    
	    $(".myOrder").click(function(){
	    	if(null != $.cookie("lanmei_username") && undefined != $.cookie("lanmei_username")){
	    		window.open("../member/indexCN.jhtml?order="+$(this).attr("data-type"));
	        }else{
	        	 $(".verifyInfo").html("");
	             $("#LanmeiUserName").val("");
	             $("#LanmeiPassword").val("");
	             $('#logonModal').modal();
	        }
		});
	},

	register:function(){
		$("#registerBtn").click(function(){
			//同意条款
			var $agree = $('.agree>span');
			if(!$agree.hasClass("agreeConditions")){
				$agree.next().next().html("请先阅读澜湄服务条款！").css('color','#d0011b');
				return;
			}else{
				$agree.next().next().html("验证通过").css('color','#8ec060');
			}
			//email
			if(!LanmeiAirlinesRegister.userNameVerify($("#registerUserName").val())){
				return;
			}
			//密码
			var regPwd=/^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/; 
			var $registerPassword = $('#registerPassword');
			if(regPwd.test($.trim($registerPassword.val()))){
				$registerPassword.siblings('p').html('验证通过').css('color','#8ec060');
			}else{
				$registerPassword.siblings('p').html('您的输入不符合要求，请重新输入！').css('color','#d0011b');
				return;
			}
			// 再次输入密码验证
			var $repeatPassword = $('#repeatPassword');
			if($.trim($repeatPassword.val()) == $.trim($('#registerPassword').val())){
				$repeatPassword.siblings('p').html('验证通过').css('color','#8ec060');
			}else{
				$repeatPassword.siblings('p').html('您的输入不符合要求，请重新输入！').css('color','#d0011b');
				return;
			}
			
			var registeFlag = false;
			$.ajax({
				url: '/register/regSave.jhtml',
				async: false,
				type: "POST",
				data:{"email":$.trim($("#registerUserName").val()),"pwd":$.trim($('#repeatPassword').val())},
				success:function(data){
					var code = data.code;
					//code 0000注册成功，并已经登录; 0001该邮箱已被注册； 0002密码格式不正确
					if(code == "0000"){
						registeFlag = true;
						layer.open({
							  title: '注册提示',
							  content: '注册成功！',
							  btn: ['确定'],
							  yes: function(index, layero){
								  window.location.reload();
							     layer.close(index);
							  }
						});
					}else if(code == "0001" ){
						$('#registerUserName').siblings('p').html("该邮箱已被注册，请重新输入！").css('color','#d0011b');
						registeFlag = false;
					}else if(code == "0002"){
						$registerPassword.siblings('p').html('您的输入不符合要求，请重新输入！').css('color','#d0011b');
						$repeatPassword.siblings('p').html('您的输入不符合要求，请重新输入！').css('color','#d0011b');
						registeFlag = false;
					}
				},
				error:function(){
					layer.open({
						  title: '注册提示'
						  ,content: '服务器繁忙，请稍后再试......'
					});    
				}
			});
			if(!registeFlag){
				return;
			}	
		});
	},
}

$(function() {
	LMComLoginReg.init();
});