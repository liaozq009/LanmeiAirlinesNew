
var LMShopPdList = {
	init:function(){
		this.discountSelect();
		this.addEvent();
	},

	/* 解决移动端延迟300ms问题 */
	fastClick:function(dom){
		FastClick.attach(dom[0]);
	},

	/* 优惠券选择 */
	discountSelect:function(){
		$('.pd-sales-list-1').find('.pd-sales-img1').hide().siblings('.pd-sales-img2').show();

		this.fastClick($('.pd-sales-list img'));
		$('.pd-sales-list img').click(function(){
			$('.pd-sales-img1').hide();
			$('.pd-sales-img2').show();
			$(this).parent().parent().siblings('dl').find('.pd-sales-img1').show().siblings('.pd-sales-img2').hide();
		});

		// 优惠券hover效果
		$('.pd-discount-list>li').hover(function(){
		   $(this).find('.shade-img').stop().fadeIn();
		},function(){
		     $(this).find('.shade-img').stop().fadeOut();
		});

		// 优惠券领取
		$('.pd-discount-list>li').click(function(){
			var layerOpen = function(content){
				layer.open({
					  type: 1, //Page层类型
					  area: ['400px', '300px'],
					  title: 'prompt box',
					  shadeClose: true, //点击遮罩关闭
					  shade: 0.6, //遮罩透明度
					  maxmin: false, //允许全屏最小化
					  anim: 1, //0-6的动画形式，-1不开启
					  btn: ['YES'],
					  btnAlign: 'c',
					  content: '<div style="text-align:center;line-height: 202px;font-size:20px">'+content+'</div>',
					  yes: function(index, layero){
						layer.close(index); //如果设定了yes回调，需进行手工关闭
					}
				}); 
			};

			if($(this).children('.set-out-img').css('display')=='block'){
				layerOpen('优惠券已领完！');
			}else if($(this).children('.got-it-img').css('display')=='block'){
				layerOpen('不能重复领取优惠券！');
			}else{
				layerOpen('优惠券领取成功！');
				$(this).children('.got-it-img').show();
			}
		});
		// 售馨
		$('.pd-discount-list-2 .discount-1 .set-out-img').show();

		// 已领取
		$('.pd-discount-list-1 .discount-1 .got-it-img').show();
	},

	/* 其他事件 */
	addEvent:function(){
		// 商品列表最左边的元素margin-left:0
		$('.pd-discount-list li:nth-child(3n+2)').css({'marginLeft':'20px','marginRight':'20px'});

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
