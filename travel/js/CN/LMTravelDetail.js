
var LMTravelList = {
	init:function(){
		this.reginSelect();
		this.otherEvent();
	},

	/* 区域选择下拉菜单 */
	reginSelect:function(){
		$('.t-country').on('click','.t-country-val',function(e){
			e.stopPropagation();
			$(this).siblings('ul').slideToggle();
		}).on('click','.t-menu>li',function(){
			var val = $(this).html();
			$(this).parent().slideDown('slow').siblings('span').html(val);
		});

		$('html').click(function(){
			$('.t-country ul').slideUp('slow');
		});
	},

	/* 其他事件 */
	otherEvent:function(){
		// 轮播
		$('.LM-hiSlider').hiSlider({
			isFlexible: true,
			isShowTitle: false,
			isAuto: true,
			intervalTime: 3000,
			isSupportTouch: true,
			// prevImg:'../../images/EN/prev-arrow.png',
			// nextImg:'../../images/EN/next-arrow.png',
			titleAttr: function(curIdx){
				return $('img', this).attr('alt');
			}
		});

		//分页调用
		$(".t-comment-page").createPage({
		    pageCount:10,
		    current:1,
		    previous:'Previous',
		    next:'Next',
		    backFn:function(p){
		        
		    }
		});

		// 获取容器的宽
		var getWidth = function(){
			var $li = $('.t-imgs>li');

			var $width3 = $('.t-imgs .n1');

			elementW3 = parseInt($width3.width());

			$li.height(elementW3);
		};
		getWidth();

		var _time = null;
		$(window).resize(function(){
			if (_time) clearTimeout(_time);
	    	_time = setTimeout(function() {
	    		getWidth();	
            }, 1000);
		});
	},
};

$(document).ready(function($) {
	LMTravelList.init();
});
