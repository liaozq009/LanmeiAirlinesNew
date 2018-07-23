
var LMShop = {
	init:function(){
		this.pdSlider();
		this.discountSelect();
		this.addCart();
		this.cartInfoEdit();
		this.addressSel();
		this.pdPay();
		this.addEvend();

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

		if(flag){
			this.pcEvent();
		}else{
			this.mEvent();
		}
	},

	/* 商品滚动 */
	pdSlider:function(){
		//计算有几个ul
		var page=1;
		var page_last=$('.pd-slider-large>ul').length;

		// 定义滚动容器
		var $sliderContainer = $('.pd-slider-large');

		// 小容器宽
		var slideWidth = $('.pd-slider-main').width();

		// 大容器宽度
		$sliderContainer.width(slideWidth*page_last);

		// 左边箭头点击
		$('.pd-list-select .next-arrow').click(function(){
			if(page==page_last){
				$sliderContainer.animate({marginLeft:'0px'},400);
				page=1;
			}else{
				$sliderContainer.animate({marginLeft:'-='+940}, 400);
				page++;
			}
			$('.page-num').html(page);
		});

		// 右边箭头点击
		$('.pd-list-select .prev-arrow').click(function(){
			if(page==1){
				$sliderContainer.animate({marginLeft:'-='+940*(page_last-1)},400);
				page=page_last;
			}else{
				$sliderContainer.animate({marginLeft:'+='+940}, 400);
				page--;
			}
			$('.page-num').html(page);
		});

	},

	/* 优惠券选择 */
	discountSelect:function(){
		$('.pd-sales-list-1').find('.pd-sales-img1').hide().siblings('.pd-sales-img2').show();

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

	/* 一级菜单 加入购物车 */
	addCart:function(){
		// 获取屏幕高度
		var changeHeight = function(){
			var winHeight = $(window).height();
			var  h1 = document.documentElement.clientHeight;
			$('.lm-pd-cart').height(winHeight);
			$('.pd-cart-detail-wrapper .pd-cart-detail').height(winHeight);
			$('.pd-cart-pay-wrapper').height(winHeight);
			$('.pd-cart-pay-inner').height(winHeight-160);
		};
		// changeHeight();
		$(window).resize(function(event) {
			// changeHeight();
		});

		// 移动宽度设置
		var sildeWidth;
		var winWidth = $(window).width();
		winWidth>350 ? sildeWidth='100%' : sildeWidth=350;
		console.log(winWidth);
		$('.lm-pd-cart,.pd-cart-title,.pd-cart-price-box').css('left',-winWidth); //初始化购物车位置
		// $(window).resize(function(){
		// 	$('.lm-pd-cart,.pd-cart-title,.pd-cart-price-box').css('left',-winWidth); //初始化购物车位置
		// });

		// 购物车缩进
		var $lmPdCart = $('.lm-pd-cart');
		var $pdCartTitle = $('.pd-cart-title');
		var $pdCartPriceBox = $('.pd-cart-price-box');
		// 遮罩
		var $shopMask = $('.shopping-mask');

		var pdBoxSlider = function(){
			$lmPdCart.animate({left:0},300);
			$pdCartTitle.animate({left:0},300);
			$pdCartPriceBox.animate({left:0},300);
		};

		// 购物车收进
		$('.pd-cart-title .cart-arrow,.shopping-mask').click(function(){
			$('html,body').removeClass('ovfHiden'); //使网页恢复可滚

			// 遮罩隐藏
			$shopMask.hide();

			if($('.lm-pd-cart').css('left')=="-"+sildeWidth){
				pdBoxSlider();
			}else{
				$lmPdCart.animate({left:"-"+sildeWidth},300);
				$pdCartTitle.animate({left:"-"+sildeWidth},300);
				$pdCartPriceBox.animate({left:"-"+sildeWidth},300,function(){
					if(winWidth>767){
						$('.lm-pd-cart .pd-cart-view').animate({left:"0px"},300).children('.pd-cart-select-num').animate({left:"66px"},800);
					}else{
						$('.lm-pd-cart .pd-cart-view').animate({left:"0px"},300).children('.pd-cart-select-num').animate({left:"36px"},800);
					}
				});
				// 商品详情和地址页面隐藏
				$('.pd-cart-detail-wrapper>div,.pd-cart-pay-wrapper').hide('slow');
				$('.pd-cart-box>div').removeClass('active');
			}
		});

		// 展开购物车
		$('.lm-pd-cart .pd-cart-view,.m-shopping-cart').click(function(){
			// 遮罩显示
			$shopMask.show();

			pdBoxSlider();

			if(winWidth>767){
				$(this).animate({left:"-90px"},300).children('.pd-cart-select-num').animate({left:"-66px"},800);
			}else{
				$(this).animate({left:"-90px"},300).children('.pd-cart-select-num').animate({left:"-36px"},800);
			}
		});

		// 点击加入购物车
		$('.add-cart-btn').click(function(e){
			var parent = $(this).parent().parent().parent();
			var imgsrc = parent.parent().find('.add-cart-small-img').attr('src');
			var txt = parent.children('.pd-detail-title').text();
			var price = parent.children('.pd-price').children('.new-price').text();
			var size = parent.children('.pd-model-select').find('.active').text();
			var color = parent.children('.pd-color-select').find('.active').text();

			$('#pd-cart-box-id').append('<div class="pd-cart-select"><div class="pd-cart-clear-toggle"><input type="checkbox" class="pd-checkBox"><i class="pd-cart-clear">X</i></div><a href="#" class="pd-get-detail-page"><img src="'+imgsrc+'" class="pd-img"><b></b></a><div class="pd-info" date-pd-id="pd-cart-detail-1"><h2>'+txt+'</h2><div class="pd-info-param"><span class="pd-info-param-model">'+size+'</span><span class="pd-info-param-color">'+color+'</span></div><div class="pd-price-box"><span class="pd-price">'+price+'</span><p class="pd-taxes">+(Taxes:<span>5%</span>)</p><p class="pd-num">X<span>1</span></p></div></div><img src="images/EN/pd-cart-select-arrow.png" class="pd-cart-select-arrow"></div>');

			// 计算商品数量
			$('.pd-cart-view .pd-cart-select-num').html($('.pd-cart-box .pd-cart-select').length);

			// 计算商品飞入的位置
			var left = 0;
			var top = 360;
			if($('.lm-pd-cart').css('left')=="0px"){
				left = 340; top = 30;
			}

			// ie兼容性判断
			if (document.all && document.addEventListener && !window.atob) {
				// alert('IE9');
			}else if (document.all && document.querySelector && !document.addEventListener) {
				// alert('IE8');
			}else{
				add(event,left,top,imgsrc);
			}
		});

		// 飞起来
		function add(event,left,top,imgsrc) {
		    // var offset=$('.pd-cart-title h2').offset(); //落脚点
		    var _this=$(event.target);
		    var flyer=$('<img src="'+imgsrc+'" width=50 style="border-radius:50%"/>');
		    //利用插件
		    flyer.fly({
		        start:{left:event.clientX,top:event.clientY},//鼠标当时所在的位置
		        end:{left:left,top:top,width:20,height:20},//落脚点及落脚时的尺寸
		        onEnd:function(){//落脚时的动画效果，及后期处理方式
		        	flyer.fadeOut('slow',function(){
		        		$(this).remove();
		        	});
		        }
		    });
		}

		// 全选
		$('.pd-price-totle .pd-checkAll').click(function() {
			$('.pd-cart-select .pd-checkBox').prop("checked", this.checked);
		});

		$('.pd-cart-select .pd-checkBox').click(function() {
			var $subs = $('.pd-cart-select .pd-checkBox');
			$('.pd-price-totle .pd-checkAll').prop("checked" , $subs.length == $subs.filter(":checked").length ? true :false);
		});

		// 删除商品
		$('.pd-cart-delete').click(function(){
			var $cartSel = $('.pd-cart-box .pd-cart-select');

			$.each($cartSel,function(i,v){
				if($(v).find('.pd-checkBox').is(':checked')){
					$(v).remove();
				}
			});

			// 计算商品数量
			$('.pd-cart-view .pd-cart-select-num').html($('.pd-cart-box .pd-cart-select').length);
		});
	},

	/* 二级菜单 修改购物车信息 */
	cartInfoEdit:function(){
		// 点击展示购物车快捷详情页
		$('#pd-cart-box-id').on('click','.pd-info',function(){
			var id = $(this).attr('date-pd-id');
			$(this).parent().addClass('active').siblings().removeClass('active');
			$('.pd-cart-detail,.pd-cart-pay-wrapper').hide();
			$('#'+id).show();

			// 调用swiper
			var swiper3 = new Swiper('.m-pd-img-large', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				freeMode: false
			});
		});

		// 图片放大镜
		var imgZoom = function(){
			$('#pd-cart-detail-1').imgZoom({
				winSelector:'winSelector-1',
				midImg:'pd-mid-img-1',
				largeImg:'pd-large-img-1',
			});
			$('#pd-cart-detail-2').imgZoom({
				winSelector:'winSelector-2',
				midImg:'pd-mid-img-2',
				largeImg:'pd-large-img-2',
			});
		};
		imgZoom();
	},

	/* 二级菜单 用户地址和商品数量 */
	addressSel:function(){

		// 隐藏添加地址
		var addHide = function(){
			$('.pd-cart-address-complete,.address-add-inner').slideUp('slow');
			$('.pd-cart-address-icon,.pd-cart-address-edit').slideDown('slow');
		};

		// 优惠券选择
		$('#use-coupons').click(function(){
			if($(this).is(':checked')){
				$('.pd-cart-select-coupons').show();
			}else{
				$('.pd-cart-select-coupons').hide();
			}
		});

		$('.pd-cart-select-coupons').click(function(e){
			e.stopPropagation();
			$(this).children('.select-coupons-menu').show();
		});
		$('.select-coupons-menu li').click(function(e){
			e.stopPropagation();
			var $parent = $(this).parent();
			var val = $(this).html();
			$parent.hide();
			$parent.siblings('.couponsVal').html(val);
		});

		// 地址选择
		$('.pd-cart-address-inner').on('click','.pd-cart-address-detail',function(){
			$(this).addClass('active').siblings().removeClass('active');

			// 修改编辑地址信息
			var name = $(this).find('.pd-address-name').html();
			var phone = $(this).find('.pd-address-phone').html();
			var detail = $(this).find('.pd-address-detail').html();

			// 赋值
			$('.edit-address-name').val(name);
			$('.edit-address-phone').val(phone);
			$('.edit-address-info').val(detail);

		});

		$('.pd-cart-address-1').show(); //默认显示
		var addreToggle = true;
		var $addreDetail = $('.pd-cart-address-detail'); //获取所有的地址

		//显示更多地址
		$('.pd-cart-address-more').click(function(){ 
			if(addreToggle){
				$addreDetail.slideDown('slow');
				addreToggle = false;
			}else{
				$addreDetail.slideUp('slow');
				
				$.each($addreDetail,function(i,v){
					$(v).hasClass('active') && $(v).slideDown('slow');
				});
				addreToggle = true;
			}
		});

		//选择收获地址
		function initAddress(){
			$('.address-edit-btn,.address-edit-btn-OK,.pd-cart-address-detail,.pd-cart-address-1 .pd-address-perInfo,.pd-cart-address-add,.pd-cart-address-edit').hide();
			$('.pd-cart-address-1').show();
			$('.pd-cart-address-1 .pd-address-detail').html('No.575 D&E, Russian Federation Boulevard, Phnom Penh, Cambodia');
		}
		initAddress();
		$('.pd-select-address .dropdown-menu a').on('click', function(e) {
			e.preventDefault();
			$('.pd-select-address .btn .s1').html($(this).text());
			var data = $(this).attr('data-country');
			switch (data) {
				case 'Cambodia':
					initAddress();
					break;
				case 'China':
					$('.address-edit-btn').show();
					break;
			}
		});

		// 编辑地址
		var addressEdit = true;
		$('.pd-cart-address-title .address-edit-btn').click(function(e){
			e.preventDefault();
			$(this).hide().siblings('a').show();
			$('.pd-cart-address-add,.pd-cart-address-edit').slideDown('slow');

			// 添加地址显示隐藏
			addHide();

			// 获取选中地址内容
			$.each($addreDetail,function(i,v){
				if($(v).hasClass('active')){
					var name = $(v).find('.pd-address-name').html();
					var phone = $(v).find('.pd-address-phone').html();
					var detail = $(v).find('.pd-address-detail').html();

					// 赋值
					$('.edit-address-name').val(name);
					$('.edit-address-phone').val(phone);
					$('.edit-address-info').val(detail);
				}
			});
		});

		// 保存地址
		$('.pd-cart-address-title .address-edit-btn-OK').click(function(e){
			e.preventDefault();
			$(this).hide().siblings('a').show();
			$('.pd-cart-address-add,.pd-cart-address-edit').slideUp('slow');

			// 取值
			var name = $('.edit-address-name').val();
			var phone = $('.edit-address-phone').val();
			var detail = $('.edit-address-info').val();

			// 编辑完成后赋值
			$.each($addreDetail,function(i,v){
				if($(v).hasClass('active')){
					// 赋值
					$(v).find('.pd-address-name').html(name);
					$(v).find('.pd-address-phone').html(phone);
					$(v).find('.pd-address-detail').html(detail);
				}
			});

		});

		// 添加地址
		$('.pd-cart-address-icon').click(function(){
			$('.pd-cart-address-complete,.address-add-inner').slideDown('slow');
			$('.pd-cart-address-icon,.pd-cart-address-edit').slideUp('slow');
			// 清空内容
			// $('.add-address-name').val(''); $('.add-address-phone').val(''); $('.add-address-info').val('');
		});

		$('.address-complete').click(function(){ //确定
			var name = $('.add-address-name').val();
			var phone = $('.add-address-phone').val();
			var detail = $('.add-address-info').val();

			if(name=='' || phone=='' || detail==''){
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
					  content: '<div style="text-align:center;line-height: 202px;font-size:20px">Please input address information</div>',
					  yes: function(index, layero){
						layer.close(index); //如果设定了yes回调，需进行手工关闭
					}
				}); 
			}else{
				$('.pd-cart-address-inner').append('<div class="pd-cart-address-detail" style="display:block"><div class="pd-address-perInfo">-(<h2 class="pd-address-name">'+name+'</h2>) <p class="pd-address-phone">'+phone+'</p></div><div class="pd-address-detail">'+detail+'</div></div>');

				// 添加地址显示隐藏
				addHide();

				$addreDetail = $('.pd-cart-address-detail'); //获取所有的地址
			} 

		});

		$('.address-cancel').click(function(){ //取消
			addHide();
		});

		// 选择支付方式
		$('.pd-cart-ok').click(function(){
			$('#payModal').modal();
		});
		$('.js-pay-select>a').click(function(event) {
		    $(this).addClass('active').siblings('a').removeClass('active');
		    var dataPay = $(this).attr('data-pay');
		    $('.js-pay-method').val(dataPay);
		});
	},

	/* 点击支付 */
	pdPay:function(){
		$('.pd-cart-price-box .pd-pay').click(function(){
			$('.pd-cart-detail').hide();
			$('.pd-cart-pay-wrapper').show();
		});
	},

	/* 其他事件 */
	addEvend:function(){
		// 轮播
		$('.LM-hiSlider').hiSlider({
			isFlexible: true,
			isShowTitle: false,
			isAuto: true,
			intervalTime: 3000,
			isSupportTouch: true,
			prevImg:'images/EN/prev-arrow.png',
			nextImg:'images/EN/next-arrow.png',
			titleAttr: function(curIdx){
				return $('img', this).attr('alt');
			}
		});

		// 搜索框缩放
		$('.pd-search input').click(function(event) {
			$(this).parent().animate({width: '60%'}, 'slow');
			$(this).animate({width: '80%'}, 'slow');
		});
	},

	/* PC端事件 */
	pcEvent:function(){
		
	},

	/* 移动端事件 */
	mEvent:function(){
		// 移动端商品滑动 
		var swiper1 = new Swiper('.m-swiper-container', {
			pagination: '.swiper-pagination',
			slidesPerView: 2,
			paginationClickable: true,
			spaceBetween: 10,
			freeMode: true
		});

		// 移动端优惠券滑动 
		var swiper2 = new Swiper('.m-sales-container', {
			pagination: '.swiper-pagination',
			slidesPerView: 2,
			paginationClickable: true,
			slidesPerColumn: 2,
			spaceBetween: 10,
			freeMode: true
		});

		// 优惠券
		$('.pd-sales-list img').on('click',function(e) {
			$('.pd-sales-img1').hide();
			$('.pd-sales-img2').show();
			$(this).parent().parent().siblings('dl').find('.pd-sales-img1').show().siblings('.pd-sales-img2').hide();
		});

		// 开关侧边栏菜单
		$('.mobile-menu').click(function(event) {
			$('.m-nav-mask').fadeIn(300);
			$('.m-nav-menu').show().animate({left: 0}, 300);

			$('html,body').addClass('ovfHiden'); //使网页不可滚动
		});

		$('.m-nav-menu-close,.m-nav-mask').click(function(event) {
			$('.m-nav-mask').fadeOut(300);
			$('.m-nav-menu').animate({left: -100+'%'}, 300);

			$('html,body').removeClass('ovfHiden'); //使网页恢复可滚
		}); 

		// 打开购物车 ==> 在PC端代码上操作
		$('.m-shopping-cart').click(function(){
			$('.m-nav-mask').fadeOut(300);
			$('.m-nav-menu').animate({left: -100+'%'}, 300);
		});
	},
};

$(document).ready(function($) {
	LMShop.init();
});

/* 定义滑动插件 */
;(function($){
	
	/* 图片放大镜 */
	$.fn.extend({
		imgZoom:function(options){
	        //各种属性参数默认值
	        var defaults = {
	        	winSelector:'winSelector-1',
	        	midImg:'pd-mid-img-1',
	        	largeImg:'pd-large-img-1',
	        };

	        //定义变量
	        var options = $.extend(defaults, options);

	        var $this = $(this); //传入的元素
	        var winSelector = options.winSelector;
	        var midImg = options.midImg;
	        var largeImg = options.largeImg;
	        
        	// var winSelector = "winSelector";
        	// var largeImg = "pd-img-large-zoom";
        	// var midImg = "pd-mid-img";
            //大视窗看图
            function mouseover(e) {
            	if ($("#"+winSelector).css("display") == "none") {
            		$("#"+winSelector+",#"+largeImg).show();
            	}

            	$("#"+winSelector).css(fixedPosition(e));

            	e.stopPropagation();
            }

            function mouseOut(e) {
            	if ($("#"+winSelector).css("display") != "none") {
            		$("#"+winSelector+",#"+largeImg).hide();
            	}

            	e.stopPropagation();
            }


            $("#"+midImg).mouseover(mouseover); //中图事件

            $("#"+midImg+",#"+winSelector).mousemove(mouseover).mouseout(mouseOut); //选择器事件

            var $divWidth = $("#"+winSelector).width(); //选择器宽度
            var $divHeight = $("#"+winSelector).height(); //选择器高度
            var $imgWidth = $("#"+midImg).width(); //中图宽度
            var $imgHeight = $("#"+midImg).height(); //中图高度

            var $viewImgWidth = $viewImgHeight = $height = null; //IE加载后才能得到 大图宽度 大图高度 大图视窗高度

            $("#"+largeImg).scrollLeft(0).scrollTop(0);

            function fixedPosition(e) {

            	if (e == null) {
            		return;
            	}

                var $imgLeft = $("#"+midImg).offset().left; //中图左边距
                var $imgTop = $("#"+midImg).offset().top; //中图上边距

                X = e.pageX - $imgLeft - $divWidth / 2; //selector顶点坐标 X
                Y = e.pageY - $imgTop - $divHeight / 2; //selector顶点坐标 Y
                X = X < 0 ? 0 : X;
                Y = Y < 0 ? 0 : Y;
                X = X + $divWidth > $imgWidth ? $imgWidth - $divWidth : X;
                Y = Y + $divHeight > $imgHeight ? $imgHeight - $divHeight : Y;

                if ($viewImgWidth == null) {

                	$viewImgWidth = $("#"+largeImg+" img").outerWidth();
                	$viewImgHeight = $("#"+largeImg+" img").height();

                	if ($viewImgWidth < 200 || $viewImgHeight < 200) {
                		$viewImgWidth = $viewImgHeight = 800;
                	}
                	$height = $divHeight * $viewImgHeight / $imgHeight;

                	$("#"+largeImg).width('390');
                	$("#"+largeImg).height('390');
                }

                var scrollX = X * $viewImgWidth / $imgWidth;
                var scrollY = Y * $viewImgHeight / $imgHeight;

                $("#"+largeImg+" img").css({ "left": scrollX * -1, "top": scrollY * -1 });
                if($(window).width()<1280){
                	$("#"+largeImg).css({ "top": 0, "left": -400});
                }else{
                	$("#"+largeImg).css({ "top": 0, "right": -390});
                }

                return { left: X, top: Y };
            }
        }
    });

})(jQuery);
