
var LMLive = {
	init:function(){
		this.changeVideo();
		this.addEvend();
	},

	/* 切换视频 */
	changeVideo:function(){
		$('.video-list-inner').on('click','>li',function(){
			$(this).addClass('active').siblings('li').removeClass('active');
			var data = $(this).attr('data-id');
			switch (data) {
				case 'v-list-1':
					$('#videoSource').prop('src', '../../video/LMVideo-1.mp4');
					break;
				case 'v-list-2':
					$('#videoSource').prop('src', '../../video/LMVideo-2.mp4');
					break;
			}
		});
	},

	/* 其他事件 */
	addEvend:function(){
		var winWidth = $(window).width();
		if(winWidth<992){
			$('.video-list-active img').attr('src','../../live/images/EN/v-list-m-active.png');
		}
	},
};

$(document).ready(function($) {
	LMLive.init();
});


