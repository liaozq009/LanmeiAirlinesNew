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
		  title: 'Tips',
		  content: 'The mailbox is incorrect,Please input again!',
		  btn:['OK'],
		  yes: function(index, layero){
		  	layer.close(index);
		  	$('.email').focus();
		   }
		}); 
		
		return;
	}
	if(isNotBlank(userValue)&&isNotBlank(emailValue)&&isNotBlank(subjectValue)&&isNotBlank(messageValue)){
		$('.submitBtn span').text('Submitted');
		$('.lm-loading-timer').css('display','inline-block');
		$.ajax({
			url:"/email/save.jhtml",
			async: false,
			type: "POST",
			data:{"userName":userValue,"email":emailValue,"subject":subjectValue,"message":messageValue},
			//$("#submitForm").serialize(),
			success:function(result){
				if(result){
					$('.submitBtn span').text('Submit');
					$('.lm-loading-timer').css('display','none');
					$(".userName").val("");
					$(".email").val("");
					$(".subject").val("");
					$(".message").val("");
					layer.open({
					  title: 'Tips'
					  ,content: 'Submitted!',
					  btn:['OK']
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