function mailsome1(){
	var userValue = $(".userName").val();
	var emailValue = $(".email").val();
	var subjectValue = $(".subject").val();
	var messageValue = $(".message").val();

	if(userValue==''){
		$(".userName").focus();
		return;
	}
	if(emailValue==''){
		$(".email").focus();
		return;
	}
	if(subjectValue==''){
		$(".subject").focus();
		return;
	}
	if(messageValue==''){
		$(".message").focus();
		return;
	}
	if(!validateEmail(emailValue)){
		layer.open({
		  title: '提示信息',
		  content: '邮箱不正确，请重新输入！',
		  btn:['确定'],
		  yes: function(index, layero){
		  	layer.close(index);
		  	$('.email').focus();
		   }
		}); 
		return;
	}
	if(isNotBlank(userValue)&&isNotBlank(emailValue)&&isNotBlank(subjectValue)&&isNotBlank(messageValue)){
		$('.submitBtn span').text('正在提交');
		$('.lm-loading-timer').css('display','inline-block');
		$.ajax({
			url:"/email/save.jhtml",
			async: false,
			type: "POST",
			data:{"userName":userValue,"email":emailValue,"subject":subjectValue,"message":messageValue},
			//$("#submitForm").serialize(),
			success:function(result){
				if(result){
					$('.submitBtn span').text('提交');
					$('.lm-loading-timer').css('display','none');
					$(".userName").val("");
					$(".email").val("");
					$(".subject").val("");
					$(".message").val("");
					layer.open({
					  title: '提示信息'
					  ,content: '提交成功',
					  btn:['确定']
					  ,yes: function(index, layero){
					  	layer.close(index);
					   }
					}); 
				}
			}
		});
	}
	
}

function validateEmail(obj){
	var regMail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	if(!regMail.test(obj)){
		return false;
	}else{
		return true;
	}
}

function isNotBlank(str){
	if(str!=null && str!="" && str!="undefined"){
		return true;
	}else{
		return false;
	}
}