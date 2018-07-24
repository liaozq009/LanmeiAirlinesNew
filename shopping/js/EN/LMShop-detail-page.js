
var LMShopDetailPage = {
	init:function(){
		this.addEvend();
	},

	/* 其他事件 */
	addEvend:function(){
		// 产品数量增减
		var pdNum = function(){
			$('.cart-add-num').click(function(e){
				$(this).siblings('span').html(parseInt($(this).siblings('span').html())+1);
			});
			$('.cart-subtract-num').click(function(e){
				if(parseInt($(this).siblings('span').html())>=2){
					$(this).siblings('span').html(parseInt($(this).siblings('span').html())-1);
				}
			});
		};
		pdNum();

		// 搜索框缩放
		$('.pd-search input').click(function(event) {
			$(this).parent().animate({width: 560}, 'slow');
			$(this).animate({width: 450}, 'slow');
		});
		//分页调用
		$(".shop-comments-details-pages").createPage({
		    pageCount:10,
		    current:1,
		    // previous:'Previous',
		    // next:'Next',
		    backFn:function(p){
		        
		    }
		});

		// 轮播
		 Carousel.init($('.carousel'));

		 //评论和详情切换
		 $('.pd-show-tab>a').click(function(e) {
		 	e.preventDefault();
		 	$(this).addClass('active').siblings('a').removeClass('active');
		 	var id = $(this).attr('data');
		 	$('.'+id).show().siblings('div').hide();
		 });
		 $('.pd-shop-detail').hide();
	},
};

$(document).ready(function($) {
	LMShopDetailPage.init();
});
