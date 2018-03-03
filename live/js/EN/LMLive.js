
var LMLive = {
	init:function(){
		this.changeVideo();
		this.addEvend();
	},

	/* 切换视频 */
	changeVideo:function(){
		$('.video-list-inner').on('click','>li',function(){
			$(this).addClass('active').siblings('li').removeClass('active');
		});
	},

	/* 其他事件 */
	addEvend:function(){
		
	},
};

$(document).ready(function($) {
	LMLive.init();
});


