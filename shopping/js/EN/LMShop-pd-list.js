
var LMShopPdList = {
	init:function(){
		this.addEvent();
	},

	/* 商品尺寸选择滚动 */


	/* 其他事件 */
	addEvent:function(){
		// 商品列表最左边的元素margin-left:0
		$('.pd-list-inner li:nth-child(4n+1)').css('margin-left','0');

		// 商品列表详情页最后两个靠左
		$('.pd-list-inner li:nth-child(4n+3) .pd-detail-select,.pd-list-inner li:nth-child(4n+4) .pd-detail-select').css('cssText','right:66px');

		//分页调用
		$(".p-comment-page").createPage({
		    pageCount:10,
		    current:1,
		    previous:'Previous',
		    next:'Next',
		    backFn:function(p){
		        
		    }
		});
	},
};

$(document).ready(function($) {
	LMShopPdList.init();
});
