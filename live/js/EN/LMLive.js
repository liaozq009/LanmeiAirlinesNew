
var LMLive = {
	init:function(){
		this.changeVideo();
		this.isPc();
		this.addEvend();
	},

	/* 判断是PC端还是移动端 */
	isPc:function(){
		// 判断手机端或者PC端
		function IsPC() {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break;
				}
			}
			return flag;
		}

		var flag = IsPC(); //true为PC端，false为手机端

		if(flag){ //PC
			$('.video-list-inner').on('click','>li',function(){
				$(this).addClass('active').siblings('li').removeClass('active');
				var data = $(this).attr('data-id');
				switch (data) {
					case 'v-list-1':
						$('#videoSource').prop('src', '../video/LMVideo-1.mp4');
						break;
					case 'v-list-2':
						$('#videoSource').prop('src', '../video/LMVideo-2.mp4');
						break;
				}
			});
		}else{ //移动
			$('.video-list-active img').attr('src','images/EN/v-list-m-active.png');
			$('#videoSource').prop('src', '../video/m-LMVideo-1.mp4');

			$('.video-list-inner').on('click','>li',function(){
				$(this).addClass('active').siblings('li').removeClass('active');
				var data = $(this).attr('data-id');
				switch (data) {
					case 'v-list-1':
						$('#videoSource').prop('src', '../video/m-LMVideo-1.mp4');
						break;
					case 'v-list-2':
						$('#videoSource').prop('src', '../video/m-LMVideo-2.mp4');
						break;
				}
			});
		}
	},

	/* 切换视频 */
	changeVideo:function(){
		
	},

	/* 其他事件 */
	addEvend:function(){
		
	},
};

$(document).ready(function($) {
	LMLive.init();
});


