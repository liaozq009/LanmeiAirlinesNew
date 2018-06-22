var LMComLogin = {
	/* 登录 */
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
};

$(function() {
	LMComLogin.login();
});
