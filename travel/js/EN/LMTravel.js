
var LMTravel = {
	init:function(){
		// this.animate();
		this.isPc();
		this.banner();
		this.recTravel();
		this.reginSelect();
		this.otherEvent();
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
			
		}else{ //移动
			// 移动端地图滑动 
			var swiper1 = new Swiper('.js-m-boxMap', {
				pagination: '.swiper-pagination',
				slidesPerView: 2,
				paginationClickable: true,
				spaceBetween: 10,
				freeMode: true
			});
		}
	},

	/* 解决延迟300ms问题 */
	fastClick:function(dom){
		FastClick.attach(dom[0]);
	},

	/* banner */
	banner:function(){
		/* banner的地球和小人 */
		var reload = function(){
			var winW = $(window).width();
			var earthW = $('.earth-d2').width();
			$('.lm-banner-right').height(winW*600/1920);
			$('.earth-d2').height(earthW*374/384);
		}
		reload();
		$(window).resize(function(){
			reload();
		});

		var rollEarth = function(){
			var $content = $("#earth-content");
			var $oBox = $("#earth-box");
			var $oBoxImg = $("#earth-box .img2-1");
			var oBoxImgW = $oBoxImg[0].clientWidth;
			var step = 0;
			var auto;
			function moving(){
				auto = setInterval(function(){
					step--;
					if($oBox[0].offsetLeft<=-oBoxImgW){
						step=0;
					}
					$oBox.css('left',step+"px");
				},60);
			}
			
			moving();
			
			$content.mousemove(function(event){
				if(!(navigator.appVersion.match(/9./i)=="9.")&&(navigator.appVersion.match(/MSIE/gi)=="MSIE")){
					event = event || window.event;
					var x = event.offsetX;
					var y = event.offsetY;
					var tmp =Math.abs(x-150)*Math.abs(x-150)+Math.abs(y-150)*Math.abs(y-150);
					if(tmp<150*150){
						clearInterval(auto);
					}
				}
				else{
					clearInterval(auto);
				}
			});
			
			$content.mouseout(function(){
				moving();
			});
		};
		rollEarth();

		// var card1 = $(".lm-banner-right .img2");
		// var card3 = $(".lm-banner-right .img4");

		// $('.lm-banner').on("mousemove",function(e) {  
		// 	var ax1 = -parseInt(($(this).innerWidth()- e.pageX)/90);
		// 	var ay1 = -parseInt(($(this).innerHeight()- e.pageY)/60);

		// 	var ax3 = -parseInt(($(this).innerWidth()- e.pageX)/60);
		// 	var ay3 = -parseInt(($(this).innerHeight()- e.pageY)/60);
		// 	// console.log(ay);

		// 	var winW = $(window).width();
		// 	var height = winW*600/1920;

		// 	card1.attr("style", "transform: rotateY("+ax1+"deg) rotateX("+ay1+"deg)");
		// 	card3.attr("style", "transform: rotateY("+ax3+"deg) rotateX("+ay3+"deg)");
		// });
	},

	/* 动画特效 */
	animate:function(){
		// 推荐旅游动画
		$('.js-pre-1').click(function(){//1隐藏,2显示，箭头1改为2
			$('.s4-inner-1').addClass('animated bounceOutLeft');
			setTimeout(function(){
				$('.s4-inner-1').removeClass('animated bounceOutLeft');
			}, 1500);
			$('.s4-inner-1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				$(this).hide();
				$('.s4-arrow-prev').removeClass('js-pre-1').addClass('js-pre-2');
				$('.s4-arrow-next').removeClass('js-nex-1').addClass('js-nex-2');
				$('.s4-inner-2').show().addClass('animated bounceInRight');
				setTimeout(function(){
					$('.s4-inner-2').removeClass('animated bounceInRight');
				}, 1500);
			});
		});
		$('.s4-content').on('click','.js-pre-2',function(){ //2隐藏,3显示，箭头2改为3
			$('.s4-inner-2').addClass('animated bounceOutLeft');
			setTimeout(function(){
				$('.s4-inner-2').removeClass('animated bounceOutLeft');
			}, 1500);
			// $(this).fadeOut(600);
			
			$('.s4-inner-2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				$(this).hide();
				$('.s4-arrow-prev').removeClass('js-pre-2').addClass('js-pre-3');
				$('.s4-arrow-next').removeClass('js-nex-2').addClass('js-nex-3');
				$('.s4-inner-3').show().addClass('animated bounceInRight');
				setTimeout(function(){
					$('.s4-inner-3').removeClass('animated bounceInRight');
				}, 1500);
			});
		});

		$('.s4-content').on('click','.js-pre-3',function(){ //3隐藏,2显示，箭头3改为2
			$('.s4-inner-3').addClass('animated bounceOutLeft');
			setTimeout(function(){
				$('.s4-inner-3').removeClass('animated bounceOutLeft');
			}, 1500);
			// $(this).fadeOut(600);
			
			$('.s4-inner-3').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				$(this).hide();
				$('.s4-arrow-prev').removeClass('js-pre-3').addClass('js-pre-2');
				$('.s4-arrow-next').removeClass('js-nex-3').addClass('js-nex-2');
				$('.s4-inner-2').show().addClass('animated bounceInRight');
				setTimeout(function(){
					$('.s4-inner-2').removeClass('animated bounceInRight');
				}, 1500);
			});
		});

		$('.js-nex-1').click(function(){//1隐藏,2显示，箭头1改为2
			$('.s4-arrow-prev').fadeIn(600);
			$('.s4-inner-1').addClass('animated bounceOutRight');
			setTimeout(function(){
				$('.s4-inner-1').removeClass('animated bounceOutRight');
			}, 1500);
			
			$('.s4-inner-1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				$(this).hide();
				$('.s4-arrow-prev').removeClass('js-pre-1').addClass('js-pre-2');
				$('.s4-arrow-next').removeClass('js-nex-1').addClass('js-nex-2');
				$('.s4-inner-2').show().addClass('animated bounceInLeft');
				setTimeout(function(){
					$('.s4-inner-2').removeClass('animated bounceInLeft');
				}, 1500);
			});
		});
		$('.s4-content').on('click','.js-nex-2',function(){//2隐藏,3显示，箭头2改为3
			$('.s4-inner-2').addClass('animated bounceOutRight');
			setTimeout(function(){
				$('.s4-inner-2').removeClass('animated bounceOutRight');
			}, 1500);
			// $(this).fadeOut(600);
			
			$('.s4-inner-2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				$(this).hide();
				$('.s4-arrow-prev').removeClass('js-pre-2').addClass('js-pre-3');
				$('.s4-arrow-next').removeClass('js-nex-2').addClass('js-nex-3');
				$('.s4-inner-3').show().addClass('animated bounceInLeft');
				setTimeout(function(){
					$('.s4-inner-3').removeClass('animated bounceInLeft');
				}, 1500);
			});
		});

		$('.s4-content').on('click','.js-nex-3',function(){//3隐藏,3显示，箭头3改为2
			$('.s4-inner-3').addClass('animated bounceOutRight');
			setTimeout(function(){
				$('.s4-inner-3').removeClass('animated bounceOutRight');
			}, 1500);
			// $(this).fadeOut(600);
			
			$('.s4-inner-3').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				$(this).hide();
				$('.s4-arrow-prev').removeClass('js-pre-3').addClass('js-pre-2');
				$('.s4-arrow-next').removeClass('js-nex-3').addClass('js-nex-2');
				$('.s4-inner-2').show().addClass('animated bounceInLeft');
				setTimeout(function(){
					$('.s4-inner-2').removeClass('animated bounceInLeft');
				}, 1500);
			});
		});
	},

	/* 推荐旅游 */
	recTravel:function(){
		var slide = function(){
			$('.s4-arrow-prev').hide();
			//计算有几个ul
			var page=1;
			var page_last=$('.s4-slide-large>div').length;

			// 定义滚动容器
			var $sliderContainer = $('.s4-slide-large');

			// 定义外层容器
			var $s4Wrap = $('.s4-wrapper');

			var winW,wrapW;
			var $img = $('.s4-slide-large > div > a > img');
			var $rightDiv = $('.s4-slide-large > div > div');
			// 适配
			var resize = function(){
				// 获取窗口宽度
				winW = $(window).width();
				wrapW = Math.ceil(winW*0.7); /* 2018-01-08增加，解决ie浏览器不兼容问题 */
				// 小容器宽
				if(winW>992){
					$s4Wrap.width(wrapW);
					// 大容器宽度
					$sliderContainer.width(wrapW*page_last);
					// 大容器中的div宽度
					$sliderContainer.children('div').width(wrapW);

					// 右边文字div的宽度
					var imgH = $img.height();
					$rightDiv.height(imgH);
				}else if(winW>768){
					$s4Wrap.width(winW);
					$sliderContainer.width(winW);
					// 大容器中的div宽度
					$sliderContainer.children('div').width(winW*0.5-20);

					$rightDiv.height(34);
				}else{
					$s4Wrap.width(winW);
					$sliderContainer.children('div').width(winW-20);

					$rightDiv.height(34);
				}
			}
			resize();

			var $next = $('.s4-arrow-next');
			var $prev = $('.s4-arrow-prev');

			$(window).resize(function(){
				resize();
			});

			// 左边箭头点击
			$next.click(function(){
				$prev.fadeIn();
				$sliderContainer.animate({marginLeft:'-='+wrapW}, 400);
				page==page_last-1 && $next.fadeOut();
				page++;
			});

			// 右边箭头点击
			$prev.click(function(){
				$next.fadeIn();
				$sliderContainer.animate({marginLeft:'+='+wrapW}, 400);
				page==2 && $(this).fadeOut();
				page--;
			});
		}
		slide();

		var bgMove = function(){
			var bgHeight = function(){
				var winWidth = $(window).width();
			}
			bgHeight();

			$(window).resize(function(){
				bgHeight();
			});

			// 页面滚动时，banner固定滚动
			$(window).scroll(function(){
				var sTop = $(window).scrollTop();
				var offsetTop = $('.section-4').offset().top; //总高度
				var scrollTop = $(document).scrollTop(); //隐藏高度
				var windowHeight = $(window).height();//可见窗口

				var totleH = scrollTop+windowHeight;

				if(totleH>=offsetTop && totleH<=offsetTop+windowHeight+570){
					var y = totleH-offsetTop;
					$('.section-4').css('backgroundPosition','center '+(parseInt(y/3)-430)+'px');
				}else{
					// console.log(222);
					// $('.section-4').css('backgroundPosition','center 0');
				}
			});
		}
		bgMove();
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
		var carousel = new LMCarousel('s-carousel',
		{
			className: "LMCarousel",//最外层样式
			offsetPages : 3,//默认可视最大条数
			direct : "left",//滚动的方向
			initPage : 1,//默认当前显示第几条
			autoPlay : true, //自动播放
			autoWidth : true,//默认不用设置宽
			width : 1600,//最外层宽，需要使用的时候在传,默认由程序自动判断
			height : 'auto',//最外层高  
			delay : 3600,//滚动间隔（毫秒）
			speed : 500 //滚动速度毫秒
		},
		[

		{"img":"images/EN/m-s2-2.jpg","title":"","url":""},

		{"img":"images/EN/m-s2-1.jpg","title":"","url":""},

		{"img":"images/EN/m-s2-3.jpg","title":"","url":""},

		{"img":"images/EN/m-s2-1.jpg","title":"","url":""},

		]

		);

		//点击地图中的view
		$('#boxMap .s6-view').click(function(){
			var $boxMap = $('#boxMap ul>li span');
			$.each($boxMap,function(index, el) {
				var opacity = $(el).css('opacity');
				if(opacity=='1'){
					// console.log($(el).html());
				}
			});
		});

		// 登录
		$('.loginBtn').click(function(){
			$('#travel-logonModal').modal();
		});
		// 注册
		$('.registerBtn').click(function(){
			$('#travel-registerModal').modal();
		});
		// 忘记密码
		$('.forgetBtn').click(function(){
			$('#travel-forgetModal').modal();
			$('#travel-logonModal').modal('hide');
		});
		// 登录界面里面点击注册
		$('.regBtn').click(function(){
			$('#travel-logonModal').modal('hide');
			$('#travel-registerModal').modal();
		});

	},
};

$(document).ready(function($) {
	LMTravel.init();
});
