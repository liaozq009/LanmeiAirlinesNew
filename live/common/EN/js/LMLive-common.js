
var LMLiveCommon = {
	init:function(){
		this.navbarSilder();
		this.getTop();
		this.showPlayBtn();
		this.reginSelect();
		this.otherEvent();
	},

	/* 导航菜单切换 */
	navbarSilder:function(){
		$('.LMCompanyInfo>ul>li').mouseover(function(e){
			$(this).children('a').addClass('active').siblings('li').children('a').removeClass('active');
			$(this).children('ul').show().siblings('li').children('ul').hide();
			$(this).children('ul').css('left',-$(this)[0].offsetLeft);
		});
		$('.LMCompanyInfo>ul>li').mouseout(function(e){
			$(this).children('a').removeClass('active');
			$(this).children('ul').hide();
		});
	},

	/* 置顶按钮 */
	getTop:function(){
		var getBottom; 
		$(window).scroll(function() {
			$(window).scrollTop()>300 ? $('.lm-toTop').fadeIn('slow') : $('.lm-toTop').fadeOut('slow');

			getBottom = $(document).height() - $(window).height() - $(window).scrollTop();
			if(getBottom<320){
				$('.lm-toTop').css('bottom',370-getBottom);
			}else{
				$('.lm-toTop').css('bottom',70);
			}
		});

		$('.lm-toTop').click(function(){
			$('html, body').animate({scrollTop:0}, 'slow');
		});
	},

	/* 鼠标hover时，播放按钮显示 */
	showPlayBtn:function(){
		$('.v-detail-inner').on('mouseenter','.v-detail-content',function(){
			$(this).children('.v-detail-content-bg').stop().fadeIn('slow');
		}).on('mouseleave','.v-detail-content',function(){
			$(this).children('.v-detail-content-bg').stop().fadeOut('slow');
		});
	},

	/* 区域选择下拉菜单 */
	reginSelect:function(){
		$('.v-search-left').on('click','>div',function(e){
			e.stopPropagation();
			$(this).children('ul').slideToggle();
			$(this).siblings('div').children('ul').slideUp('slow');
		}).on('click','>div li',function(){
			var val = $(this).html();
			$(this).parent().slideDown('slow').siblings('span').html(val);
		});

		$('html').click(function(){
			$('.v-search-left>div ul').slideUp('slow');
		});
	},

	/* 其他事件 */
	otherEvent:function(){

	},
};

$(document).ready(function($) {
	LMLiveCommon.init();
});
