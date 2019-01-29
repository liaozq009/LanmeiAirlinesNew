
var LMComLoginReg = {
	init:function(){
		this.commonHtml();
		this.login();
		this.register();
	},
	commonHtml: function () {
        var $login = '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">Close<span aria-hidden="true">&times;</span></button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<h2 class="loginTitle">Login</h2>' +
            '<span class="verifyInfo">Account or password error !</span>' +
            '<form id="loginForm" method="POST" action="">' +
            '<div class="form-group">' +
            '<input type="text" class="form-control" id="LanmeiUserName" placeholder="Email" autocomplete="off">' +
            ' <ul class="login_on_changes on_changes">' +
            '<li email="@gmail.com"></li>' +
            '<li email="@qq.com"></li>' +
            '<li email="@sina.com"></li>' +
            '<li email="@163.com"></li>' +
            '<li email="@hotmail.com"></li>' +
            '<li email="@126.com"></li>' +
            '<li email="@yahoo.com"></li>' +
            '</ul>' +
            '</div>' +
            '<div class="form-group">' +
            '<input type="password" class="form-control" id="LanmeiPassword" placeholder="Password" autocomplete="off">' +
            '</div>' +
            '<div class="agree form-group">' +
            '<span class="" style="display:none;"></span>' +
            '<p style="display:none;">Remember me next 30 days</p>' +
            '<a href="#" class="forgetBtn">Forget ?</a>' +
            '</div>' +
            '<div class="getVerCode getVerCode-login">'+
                '<input type="text" name="captcha" value="" class="captcha-input" placeholder="Security Code" autocomplete="off">'+
                '<img src="/admin/common/captcha.jhtml?width=100&height=34&fontsize=30" class="captcha-image" alt="Security Code" style="cursor:pointer;">'+
            '</div>'+
            '<div class="form-group">' +
            '<button type="button" class="btn userLoginBtn">Login</button>' +
            '</div>' +
            '</form>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<a href="javascript:void(0)" class="regBtn">Sign up Now !</a>' +
            '</div>' +
            '</div>' +
            '</div>';

        var $register = '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">Close<span aria-hidden="true">&times;</span></button>' +
            '</div>' +
            '<div class="modal-body">' +
            ' <form class="registerWrapper" method="POST" action="">' +
            '<h2>Sign up</h2>' +
            '<span class="verifyInfoRegis"></span>' +
            '<div class="registerContent">' +
            '<div class="registerInfo">' +
            '<input type="text" name="" value="" id="registerUserName" placeholder="Please enter email address" autocomplete="off">' +
            '<p>This email is already in use !</p>' +
            '<ul class="register_on_changes on_changes">' +
            '<li email="@gmail.com"></li>' +
            '<li email="@qq.com"></li>' +
            '<li email="@sina.com"></li>' +
            '<li email="@163.com"></li>' +
            '<li email="@hotmail.com"></li>' +
            '<li email="@126.com"></li>' +
            '<li email="@yahoo.com"></li>' +
            '</ul>' +
            '</div>' +
            '<div class="registerName">'+
                 '<input type="text" class="lastName js-lastName" placeholder="Surname" autocomplete="off"/>'+
                 '<input type="text" class="firstName js-firstName" placeholder="First&Middle Name" autocomplete="off"/>'+
                 '<input type="hidden" class="js-name" name="name_EN" value=""/>'+
            ' </div>'+
            '<div class="registerPassport">'+
                '<input type="text" class="passport js-passport" placeholder="Passport No." autocomplete="off"/>'+
                '<p>Full name and passport no. must be the same as passport info to avoid the effect on member rights.</p>'+
            ' </div>'+
            '<div class="registerPassword">' +
            ' <input type="password" name="" value="" id="registerPassword" placeholder="Password with 8-16 characters" autocomplete="off">' +
            '<p>Password strength : <span><i class="i1"></i><i class="i2"></i><i class="i3"></i><i class="i4"></i><i class="i5"></i><i class="i6"></i></span></p>' +
            '</div>' +
            '<div class="repeatPassword">' +
            '<input type="password" name="" value="" id="repeatPassword" placeholder="Please repeat password" autocomplete="off">' +
            ' <p>Passwords don’t match !</p>' +
            '<span>Password must be with 3 or 4 combination with number (0-9), lowercase letter (a-z), uppercase letter (A-Z) or special characters.</span>' +
            '</div>' +
            '<div class="getVerCode">' +
            /*  '<input type="text" name="" value="" id="getVerCode-input" placeholder="Security Code" autocomplete="off">'+*/
            '<input type="text" name="captcha" value="" id="captcha-input" class="captcha-input" placeholder="Email safety code" autocomplete="off">' +
            /*'<img class="captcha-image" src="/admin/common/captcha.jhtml?width=100&height=34&fontsize=30" title="Security Code")}" style="cursor:pointer"/>' +*/
            '<button type="button" class="getVerCode-btn">Get Captcha</button>' +
            '<p style="margin-top: 10px;"></p>' +
            '</div>' +
            '<div class="agree">' +
            '<span></span>' +
            '<p>I hereby agree to <a href="https://lanmeiairlines.com/lanmeiairlines2.0/default/menus/EN/aboutUs/LMPrivacy.html" target="_blank">Lanmeiairlines’ terms and conditions</a></p>' +
            '</div>' +
            '<div class="registerBtn">' +
            '<button id="registerBtn">Sign up</button>' +
            '</div>' +
            '</div>' +
            '</form>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<a href="javascript:void(0)" class="reg-loginBtn">Login Now !</a>' +
            '</div>' +
            '</div>' +
            '</div>';

        var $forgetPassword = '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">Close<span aria-hidden="true">&times;</span></button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<h2 class="loginTitle">Forget Password</h2>' +
            '<span class="verifyInfoForget">Account or password error !</span>' +
            '<form id="f-loginForm" method="POST" action="">' +
            '<div class="form-group">' +
            '<input type="text" class="form-control" id="f-LanmeiUserName" placeholder="Email" autocomplete="off">' +
            '<ul class="forget_on_changes on_changes">' +
            '<li email="@gmail.com"></li>' +
            '<li email="@qq.com"></li>' +
            '<li email="@sina.com"></li>' +
            '<li email="@163.com"></li>' +
            '<li email="@hotmail.com"></li>' +
            '<li email="@126.com"></li>' +
            '<li email="@yahoo.com"></li>' +
            '</ul>' +
            '</div>' +
            '<div class="form-group">' +
            '<input type="password" class="form-control" id="f-LanmeiPassword" placeholder="Password" autocomplete="off">' +
            '<button type="button" id="f-getPasswordBtn">Get Password</button>' +
            '</div>' +
            '<div class="getVerCode getVerCode-login">'+
            '<input type="text" name="captcha" value="" class="captcha-input" placeholder="Security Code" autocomplete="off">'+
            '<img src="/admin/common/captcha.jhtml?width=100&height=34&fontsize=30" class="captcha-image" alt="Security Code" style="cursor:pointer;">'+
            '</div>'+
            ' <div class="agree form-group">' +
            '<p>Please pay attention to the E-mail information</p>' +
            '</div>' +
            '<div class="form-group">' +
            ' <button type="button" class="btn f-userLoginBtn">Login</button>' +
            ' </div>' +
            '</form>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<a href="#" class="a_login">Login</a><a href="javascript:void(0)" class="a_registered">Sign up</a>' +
            '</div>' +
            '</div>' +
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
	            tips.html('Passed validation');
	            tips.css('color','#8ec060');
	        }else{
	            tips.html("Your input is unqualified. Please input again!");
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
	        if(null == $.cookie("lanmei_username") && undefined == $.cookie("lanmei_username")){
	        	$('#logonModal').modal();
	        }
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

	    // 在注册页面中登录
	    $('.reg-loginBtn').click(function(e){
	        $('#registerModal').modal('hide');
	        $('#logonModal').modal('show');
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

	    var loginCode = false;
	    $('.loginBtn').click(function(){
	    	loginCode = true;
	    });
	    $('#LanmeiUserName').one('click',function(){
	    	if(!loginCode){return}
	    	//登录模态框中点击登录
	    	$(".userLoginBtn").click(function(){
	    		alert('点击登录');
	    	    var email = $.trim($("#LanmeiUserName").val());
	    	    var pwd  = $.trim($("#LanmeiPassword").val());
	    	    //邮箱
	    	    var tips = $('.verifyInfo');
	    	    tips.addClass("visible");
	    	    tips.html("");
	    	    if(email == "" || pwd == ""){
	    	        tips.html("Your input is unqualified. Please input again!");
	    	        tips.css('color','#d0011b');
	    	        return;
	    	    }
	    	    
	    	    var regEmail=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/; 
	    	    if(!regEmail.test(email)){
	    	        tips.html("Enter unqualified. Please input again!");
	    	        tips.css('color','#d0011b');
	    	        return;
	    	    }
	    	    //密码
	    	    var regPwd=/^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/; 
	    	    if(!regPwd.test(pwd)){
	    	        tips.html("Enter unqualified. Please input again!");
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
	    	                $('.verifyInfo').addClass('visible').html("The user name or password is incorrect!").css('color','#d0011b');
	    	            }else if(code == "0002" || code == "0003"){
	    	                $('.verifyInfo').addClass('visible').html("The user is abnormal!").css('color','#d0011b');
	    	            }
	    	        },
	    	        error:function(){
	    	            $('.verifyInfo').addClass('visible').html("The server is abnormal!").css('color','#d0011b');  
	    	        }
	    	    });
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
	        $(".loginBtn span").html($.cookie("lanmei_username"));
	        $(".loginBtn .head-portrait").css('background-image','url('+$.cookie("user_avatar")+')');
	        $(".REGISTEREDBtn span").html("LOGOUT"); //改为注销
	        $(".h-login").addClass("success-h-login");
	        var winWidth = $(window).width();
	        if(winWidth>993){
	            layer.tips('Enter personal center!', '#loginAndLoginoutBtn img',{
	                tips: [3, '#8ec060'],
	                time: 6000
	            });
	        }
	    }else if(null != $.cookie("lanmei_nickname") && undefined != $.cookie("lanmei_nickname")){
	        $(".loginBtn span").html($.cookie("lanmei_nickname"));
	        $(".loginBtn img").attr('src','/lanmeiairlines/default/images/EN/login-icon.png');
	        $(".REGISTEREDBtn span").html("LOGOUT"); //改为注销
	        
	        var winWidth = $(window).width();
	        if(winWidth>993){
	            layer.tips('Enter personal center!', '#loginAndLoginoutBtn img',{
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
	            tips.html("Your input is unqualified. Please input again!");
	            tips.css('color','#d0011b');
	            return;
	        }
	        
	        var regEmail=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/; 
	        if(!regEmail.test(email)){
	            tips.html("Enter unqualified. Please input again!");
	            tips.css('color','#d0011b');
	            return;
	        }
	        //密码
	        var regPwd=/^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/; 
	        if(!regPwd.test(pwd)){
	            tips.html("Enter unqualified. Please input again!");
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
	                    $('.verifyInfoForget').addClass('visible').html("The user name or password is incorrect!").css('color','#d0011b');
	                }else if(code == "0002" || code == "0003"){
	                    $('.verifyInfoForget').addClass('visible').html("The user is abnormal!").css('color','#d0011b');
	                }
	            },
	            error:function(){
	                $('.verifyInfoForget').addClass('visible').html("The server is abnormal！").css('color','#d0011b');  
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
	            $verifyInfoForget.html("Enter unqualified. Please input again!");
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
	                    $verifyInfoForget.css({"visibility":"visible","color":"rgb(142, 192, 96)"}).html(" Password changing succeeds! New password has been sent to" + email + "，Please  check!");
	                }else if(code == "0001"){
	                    $verifyInfoForget.css("visibility","visible").html("he user non-existent!");
	                }else if(code == "0002"){
	                    $verifyInfoForget.css("visibility","visible").html("Abnormal server. Please try again later!");
	                }else if(code == "0004"){
	                    $verifyInfoForget.css("visibility","visible").html("Enter unqualified. Please input again!");
	                }
	            },
	            error:function(){
	                $(".verifyInfoForget").css("visibility","visible").html("Abnormal server. Please try again later!s");
	            }
	        });
	        
	    });

	    //倒计时
	    var countdown = 120;
	    function settime(){
	        if(countdown == 0){
	            $("#f-getPasswordBtn").attr("disabled",false);
	            $("#f-getPasswordBtn").html("Get Password");
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
	            window.open("/member/index.jhtml");
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
	    $(".REGISTEREDBtn,.lm-logout").click(function(){
	        var lanmeiUsername = $.cookie("lanmei_username");
	        //未登录时候跳转到注册页面，登录以后跳转到个人中心
	        if(null == lanmeiUsername || undefined == lanmeiUsername || "" == lanmeiUsername){
	            $('#registerModal').modal();
	        }else{
	            window.location.href = "/logout/index.jhtml";  //注销用户名
	        }
	    });
	    
	    $(".memberInfo").click(function(){
	    	if(null != $.cookie("lanmei_username") && undefined != $.cookie("lanmei_username")){
	    		window.open("../member/index.jhtml?info="+$(this).attr("data-type"));
	        }else{
	        	 $(".verifyInfo").html("");
	             $("#LanmeiUserName").val("");
	             $("#LanmeiPassword").val("");
	             $('#logonModal').modal();
	        }
		});
	    
	    $(".myCoupon").click(function(){
	    	if(null != $.cookie("lanmei_username") && undefined != $.cookie("lanmei_username")){
	    		window.open("../member/index.jhtml?coupon="+$(this).attr("data-type"));
	        }else{
	        	 $(".verifyInfo").html("");
	             $("#LanmeiUserName").val("");
	             $("#LanmeiPassword").val("");
	             $('#logonModal').modal();
	        }
		});
	    
	    $(".myOrder").click(function(){
	    	if(null != $.cookie("lanmei_username") && undefined != $.cookie("lanmei_username")){
	    		window.open("../member/index.jhtml?order="+$(this).attr("data-type"));
	        }else{
	        	 $(".verifyInfo").html("");
	             $("#LanmeiUserName").val("");
	             $("#LanmeiPassword").val("");
	             $('#logonModal').modal();
	        }
		});
	},

	register:function(){
		//正则验证
		 function userNameVerify(val){
			var tips = $('#registerUserName').siblings('p');
			var reg1=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/; //邮箱
			tips.addClass('visible');
			if(reg1.test(val)){
				tips.html('Passed validation');
				tips.css('color','#8ec060');
				return true;
			}else{
				tips.html("Your input is unqualified. Please input again!");
				tips.css('color','#d0011b');
				return false;
			}
		};

		var loginCode = false;
		$('.REGISTEREDBtn').click(function(){
			loginCode = true;
		});
		$('#registerUserName').one('click',function(){
			if(!loginCode){return}
			$("#registerBtn").click(function(){
				//email
				if(!userNameVerify($("#registerUserName").val())){
					return;
				}
				//密码
				var regPwd=/^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/; 
				var $registerPassword = $('#registerPassword');
				if(regPwd.test($.trim($registerPassword.val()))){
					$registerPassword.siblings('p').html('Passed validation').css('color','#8ec060');
				}else{
					$registerPassword.siblings('p').html('Your input is unqualified. Please input again!').css('color','#d0011b');
					return;
				}

				// 再次输入密码验证
				var $repeatPassword = $('#repeatPassword');
				if($.trim($repeatPassword.val()) == $.trim($('#registerPassword').val())){
					$repeatPassword.siblings('p').html('Passed validation').css('color','#8ec060');
				}else{
					$repeatPassword.siblings('p').html('Your input is unqualified. Please input again!').css('color','#d0011b');
					return;
				}

				//同意条款
				var $agree = $('.registerContent .agree>span');
				if(!$agree.hasClass("active")){
					layer.open({
						  title: 'Tips',
						  content: 'Please read Lanmei service terms!',
						  btn: ['OK'],
						  yes: function(index, layero){
						     layer.close(index);
						  }
					});
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
								  title: 'Register prompt.',
								  content: 'Register Successful!',
								  btn: ['Confirm'],
								  yes: function(index, layero){
									  window.location.reload();
								     layer.close(index);
								  }
							});
						}else if(code == "0001" ){
							$('#registerUserName').siblings('p').html("The e-mail has been registered. Please input again!").css('color','#d0011b');
							registeFlag = false;
						}else if(code == "0002"){
							$registerPassword.siblings('p').html('The e-mail has been registered. Please input again!').css('color','#d0011b');
							$repeatPassword.siblings('p').html('The e-mail has been registered. Please input again!').css('color','#d0011b');
							registeFlag = false;
						}
					},
					error:function(){
						layer.open({
							  title: 'Register prompt.'
							  ,content: 'The server is busy. Please try again later！.'
							  ,btn:["Confirm"]
						});    
					}
				});
				if(!registeFlag){
					return;
				}	
			});
		});
	},
}

$(function() {
	LMComLoginReg.init();
});