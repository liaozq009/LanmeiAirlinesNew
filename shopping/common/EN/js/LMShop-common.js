
var LMShopCommon = {
	init:function(){
		this.navbarSilder();
		this.getTop();
		this.pdModelSlider();
		this.pdSliderEvent();
		this.pdDeatil();
		this.otherEvent();
	},

	/* 解决移动端延迟300ms问题 */
	fastClick:function(dom){
		FastClick.attach(dom[0]);
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
			$(window).scrollTop()>300 ? $('.lm-toTop').show() : $('.lm-toTop').hide();

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

	/* 商品尺寸选择滚动 */
	pdModelSlider:function(){
		
		var that = this;
		var pdSlider2 = function(ulBox,id){
			// 初始化大容器ul宽度
			var $ul = $(ulBox+'>ul');
			console.log($ul);
			$.each($ul,function(i,v){
				if(id=='width'){
					$(v).width($(v).children('li').length * $(v).children('li').width()); //ul宽度
				}else if(id='height'){
					$(v).height($(v).children('li').length * ($(v).children('li').height()+22)); //ul高度
				}

				$(v).children('.n2').addClass('active');  // 默认激活
			});
		};

		pdSlider2('.img-small-select-box','height'); //放大镜的小图切换
		
		pdSlider2('.pd-model-main','width'); //商品类型切换
	},

	pdSliderEvent:function(){
		var that = this;
		
		var pdSliderEvent = function(ulBox,prev,next,id){
			// 大小图src切换
			var imgSrc = function($li){
				var src = $li.children('img').attr('src');
				var parent = $li.parent().parent().parent();
				parent.siblings('.pd-img-large-rf').children('img').attr('src',src);
				parent.siblings('.pd-large-img').children('img').attr('src',src);
			};

			// 右边或者下边箭头点击
			$(next).click(function(e){
				var $page = $(this).siblings('.pd-model-select-page');
				var $curUl = $(this).siblings(ulBox).find('ul');

				var page = $page.val();
				var page_last=$(this).siblings(ulBox).find('li').length;
				
				if(page==page_last-1){
					if(id=='width'){
						$curUl.animate({marginLeft:'100px'},200);
					}else if(id='height'){
						$curUl.animate({marginTop:'110px'},200);
					}
					
					$page.val(0);

					$curUl.find('.n1').addClass('active').siblings('li').removeClass('active');

					imgSrc($curUl.find('.n1'));

				}else{
					if(id=='width'){
						$curUl.animate({marginLeft:'-='+100}, 200);
					}else if(id='height'){
						$curUl.animate({marginTop:'-='+110}, 200);
					}
					
					page++;

					$page.val(page);
					$curUl.children('.n'+(page+1)).addClass('active').siblings('li').removeClass('active');

					imgSrc($curUl.children('.n'+(page+1)));

				}
			});

			// 左边或者上边箭头点击
			$(prev).click(function(e){
				var $page = $(this).siblings('.pd-model-select-page');
				var $curUl = $(this).siblings(ulBox).find('ul');

				var page = $page.val();
				var page_last=$(this).siblings(ulBox).find('li').length;

				if(page==0){
					if(id=='width'){
						$curUl.animate({marginLeft:'-='+100*(page_last-1)},200);
					}else if(id='height'){
						$curUl.animate({marginTop:'-='+110*(page_last-1)},200);
					}
					
					$page.val(page_last-1);

					$curUl.children('.n'+(page_last)).addClass('active').siblings('li').removeClass('active');

					imgSrc($curUl.children('.n'+(page_last)));

				}else{
					if(id=='width'){
						$curUl.animate({marginLeft:'+='+100}, 200);
					}else if(id='height'){
						$curUl.animate({marginTop:'+='+110}, 200);
					}
					
					page--;

					$page.val(page);
					$curUl.children('.n'+(page+1)).addClass('active').siblings('li').removeClass('active');

					imgSrc($curUl.children('.n'+(page+1)));

				}
			});

			// 点击尺寸激活
			$(ulBox+' ul li').click(function(e){
				$(this).addClass('active');
				if($(this).next('li').hasClass('active')){
					// $sliderContainer.animate({marginLeft:'100px'},200);
					$(this).siblings('li').removeClass('active');
					// page--;
				}else{
					// $sliderContainer.animate({marginLeft:'-100px'},200);
					$(this).siblings('li').removeClass('active');
					// page++;
				}
			});
		}

		pdSliderEvent('.img-small-select-box','.pd-img-large-lf .prev-img','.pd-img-large-lf .next-img','height'); //放大镜的小图切换
		pdSliderEvent('.pd-model-main','.pd-silder-select .prev-arrow-model','.pd-silder-select .next-arrow-model','width'); //商品类型切换

		// 商品点击后
		$('.pd-cart-detail-wrapper').on('click','.img-small-select li',function(){
			$(this).children('b').show();
			$(this).addClass('active').siblings().removeClass('active');

			var src = $(this).children('img').attr('src');
			var parent = $(this).parent().parent().parent();
			parent.siblings('.pd-img-large-rf').children('img').attr('src',src);
			parent.siblings('.pd-large-img').children('img').attr('src',src);
		});
	},

	/* 点击显示的商品详情页 */
	pdDeatil:function(){
		// 点击购物车展示详情页
		$('.pd-add-cart-img').click(function(e){
			e.stopPropagation();
			$('.pd-list-inner .pd-detail-select').hide();
			$(this).next('.pd-detail-select').toggle();
		});
		$('.pd-close').click(function(e){
			$(this).parent().parent().hide();
			$('.pd-cart-select').removeClass('active');//删除左边加入购物车active
		});

		// 点击空白处隐藏详情页
		$('html').click(function(){
			$('.pd-list-inner .pd-detail-select').hide();
		});
		$('.pd-detail-select').click(function(e){
			e.stopPropagation();
		});

		// 产品数量增减
		this.fastClick($('.cart-add-num'));
		this.fastClick($('.cart-subtract-num'));
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
	},

	/* 其他事件 */
	otherEvent:function(){
		
	},
};

$(document).ready(function($) {
	LMShopCommon.init();
});

/* 屏幕适配 */	
;(function(win) {
	var doc = win.document;
	var docEl = doc.documentElement;
	var tid;

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;
        if (width > 540) { // 最大宽度
        	width = 540;
        }
        var rem = width / 3.2; 
        docEl.style.fontSize = rem + 'px';
        // console.log(width,rem);
    }

    win.addEventListener('resize', function() {
    	clearTimeout(tid);
    	tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
    	if (e.persisted) {
    		clearTimeout(tid);
    		tid = setTimeout(refreshRem, 300);
    	}
    }, false);

    refreshRem();

})(window);