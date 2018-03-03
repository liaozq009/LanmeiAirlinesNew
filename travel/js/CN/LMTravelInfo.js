
var LMTravel = {
	init:function(){
		this.catelogScroll();
		this.addEvend();
	},

	/* 游记目录滚动 */
	catelogScroll:function(){ 

		var length = $(".t-catalog-content li").length;

		var catalogArr = [];
		for(var i=0; i<length; i++){
			if($("#t-catalog-"+i)[0]){
				catalogArr.push($("#t-catalog-"+i).offset().top); //元素距离页面顶部距离，包括隐藏部分
			}
		}

		// 隐藏最后一个li的横线
		$(".t-catalog-content li").last().children('b').hide();

		var rightTop = $('.t-inner-right').offset().top; 

		var windowH = $(window).height();  //窗口可见高度

		$(window).scroll(function(){
			var scroH = $(this).scrollTop(); //窗口上方隐藏部分高度
			// 固定侧边目录栏
			if(rightTop<=scroH){
				$('.t-inner-right').addClass('t-fixed');
			}else{
				$('.t-inner-right').removeClass('t-fixed');
			}

			// 激活右侧目录栏状态
			for(var i=0; i<length; i++){
				if(catalogArr[i]){
					if(scroH>=(catalogArr[i]-windowH)){
						// console.log(222);
						set_cur(".t-catalog-"+i);
					}else{
						remove_cur(".t-catalog-"+i);
					}
				}
			}

		});
		
		$(".t-catalog-content li a").click(function() {
			var el = $(this).attr('class');
			if($("#"+el)[0]){
				$('html, body').animate({
			    	scrollTop: $("#"+el).offset().top-20
				}, 300);
			}
	 	});

	 	function set_cur(n){
	 		$(n).parent().addClass('t-active');
	 	}
	 	function remove_cur(n){
	 		$(n).parent().removeClass('t-active');
	 	}
	},

	/* 其他事件 */
	addEvend:function(){
		//分页调用
		$(".t-comment-page").createPage({
		    pageCount:10,
		    current:1,
		    previous:'Previous',
		    next:'Next',
		    backFn:function(p){
		        
		    }
		});

		// 音乐播放
		$("#jquery_jplayer_1").jPlayer({
			ready: function (event) {
				$(this).jPlayer("setMedia", {
					title: "Bubble",
					mp3: "../../libs/lmPlayer/music/myMusic.mp3",
				}).jPlayer("play"); // 自动播
			},
			loop:true,
			swfPath: "../../libs/lmPlayer/jplayer",
			cssSelectorAncestor: "#jp_container_1",
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: false,
			toggleDuration: true,
		});


		// 弹出全景图
		$('.js-pano-1').click(function(e){ 
			e.preventDefault();
			layer.open({
				type: 1, //Page层类型
				area: ['80%', '600px'],
				title: false,
				shadeClose: true, //点击遮罩关闭
				shade: 0.6, //遮罩透明度
				maxmin: false, //允许全屏最小化
				anim: 1, //0-6的动画形式，-1不开启
				content: '<div id="myPano" class="pano">'+
							'<div class="controls">'+
								'<a href="javascript:void(0)" class="left">&laquo;</a>'+
								'<a href="javascript:void(0)" class="right">&raquo;</a>'+
							'</div>'+
						'</div>',
				success: function(layero, index){
				    $("#myPano").pano({
				    	img: "../../libs/pano360/img/pano1.jpg",
				    });
				}
			});    
		});
		$('.js-pano-2').click(function(e){ 
			e.preventDefault();
			layer.open({
				type: 1, //Page层类型
				area: ['80%', '600px'],
				title: false,
				shadeClose: true, //点击遮罩关闭
				shade: 0.6, //遮罩透明度
				maxmin: false, //允许全屏最小化
				anim: 1, //0-6的动画形式，-1不开启
				content: '<div id="myPano" class="pano">'+
							'<div class="controls">'+
								'<a href="javascript:void(0)" class="left">&laquo;</a>'+
								'<a href="javascript:void(0)" class="right">&raquo;</a>'+
							'</div>'+
						'</div>',
				success: function(layero, index){
				    $("#myPano").pano({
				    	img: "../../libs/pano360/img/pano2.jpg",
				    });
				}
			});    
		});

		$('.lm-panorama').mouseover(function(event) {
			layer.tips('查看全景', '.lm-panorama',{
				tips: [1, '#8ec060'],
				time: 3000
			});
		});

		// 自定义滚动条
		$(".t-guide-wrap").panel({iWheelStep:32});

		// 图片懒加载
		$("img.lazy").lazyload({effect: "fadeIn"});

		/* 文字滚动 */
		$(".t-guide-content").slideUp();
		
	},
};

$(document).ready(function($) {
	LMTravel.init();
});

(function($){
	// 文字滚动
	$.fn.extend({
		"slideUp":function(value){
			
			var docthis = this;
			//默认参数
			value=$.extend({
				"li_h":"56",
				"time":3000,
				"movetime":1000
			},value);
			
			//向上滑动动画
			function autoani(){
				$("li:first",docthis).animate({"margin-top":-value.li_h},value.movetime,function(){
					$(this).css("margin-top",0).appendTo(".t-guide-content");
				});
			}
			
			//自动间隔时间向上滑动
			// var anifun = setInterval(autoani,value.time);
			
			//悬停时停止滑动，离开时继续执行
			// $(docthis).children("li").hover(function(){
			// 	clearInterval(anifun);			//清除自动滑动动画
			// },function(){
			// 	anifun = setInterval(autoani,value.time);	//继续执行动画
			// });
		}	
	});
})(jQuery);
