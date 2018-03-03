
var LMTravelList = {
	init:function(){
		this.reginSelect();
		this.pcTraval();
		this.traval();
		this.otherEvent();
	},

	/* 解决延迟300ms问题 */
	fastClick:function(dom){
		FastClick.attach(dom[0]);
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

	/* 移动端旅行日记 */
	traval:function(){

		this.fastClick($('.m-travel-inner .transformBox'));

		// 获取容器的宽
		var windowW,containerW,elementW;
		var getWidth = function(){
			windowW = $(window).width();

			containerW = $('.lm-travel .m-travel-inner').width();
			elementW = parseInt(containerW/2);
			
			$('.lm-travel .m-travel-inner').height(containerW);
			$('.lm-travel .m-travel-inner .t-maskBox').css({'line-height':elementW+'px','height':elementW+'px'});
			$('.lm-travel .m-travel-inner>div').css('height',elementW+'px');
		};

		getWidth();

		var _time = null;
		$(window).resize(function(){
			if (_time) clearTimeout(_time);
	    	_time = setTimeout(function() {
	    		getWidth();	
            }, 1000);
		});

		var flag = true;//防止连续点击造成bug
		$('.m-travel-inner .transformBox').click(function(){
			var that = this;
			var active = function(){
				$(that).addClass('active').siblings('.transformBox').removeClass('active');
			}
			if(flag){
				flag = false;
				if(!$(that).hasClass('active')){
					var left = parseInt($(that).css('left'));
					var top = parseInt($(that).css('top'));
					var child1,child2,child3;
					// console.log(left,top);
					var transformBox = $('.m-travel-inner .transformBox');
					var length = transformBox.length;
					for(var i=0; i<length; i++){
						var leftSub = parseInt($(transformBox[i]).css('left'));
						var topSub = parseInt($(transformBox[i]).css('top'));
						// console.log(leftSub,topSub);

						if(leftSub<=80 && topSub<=80){
							child1 = transformBox[i];
						}
						if(leftSub<=80 && topSub>=100){
							child3 = transformBox[i];
						}
						if(leftSub>=100 && topSub>=100){
							child4 = transformBox[i];
						}
					}

					if(left<=80 && top>=100){
						active();
						$(that).animate({top: 0}, 600);
						
						$(child1).animate({top: elementW}, 600);

					}

					if(left<=80 && top<=80){
						active();
						$(that).animate({top: elementW}, 600);
						
						$(child3).animate({top: 0}, 600);
					}

					if(left>=100 && top<=80){
						active();
						$(that).animate({left: 0}, 600);
						
						$(child1).animate({top: elementW}, 600);
						$('.m-travel-inner .nth-child2').animate({top: 0}, 600);
						$(child3).animate({left: elementW}, 600);

					}

					if(left>=100 && top>=100){
						active();
						$(that).animate({left:0}, 600);

						$(child1).animate({left: elementW}, 600);
						$('.m-travel-inner .nth-child2').animate({top: elementW}, 600);
						$(child3).animate({top: 0}, 600);

						
					}

					// 修改右侧说明
					var $title = $('.m-travel-inner .lm-travel-deltail-title');
					var $con = $('.m-travel-inner .lm-travel-detail-con');
					var $localURL = $('.m-travel-inner .lm-travel-detail-local');
					var $local = $('.m-travel-inner .lm-travel-detail-local').children('span');
					var $seeName = $('.m-travel-inner .lm-travel-see-left').children('span');
					var $seeNum = $('.m-travel-inner .lm-travel-see-right').children('span');

					var data = $(this).children('.t-maskBox').attr('data');

					switch (data) {
						case 'mask-1':
							$title.html('柬埔寨(金边皇宫)');
							$con.html('金边皇宫也称四臂湾大王宫，因位于上湄公河、洞里萨河、下湄公河与巴萨河的交汇处而得名，是诺罗敦国王于1866-1870年建造的，是柬埔寨国王的皇宫。<br> 王宫的建筑具有高棉传统建筑风格和宗教色彩，宫殿均有尖塔，代表繁荣；殿身涂以黄、白两色，黄色代表佛教，白色代表婆罗门教,大小宫殿二十多座。');
							$local.html('Phnom Penh');
							$localURL.attr('href','https://goo.gl/maps/SfKrMapEBXN2');
							$seeName.html('Lanmei Airlines');
							$seeNum.html('1729');
							break;
						case 'mask-2':
							$title.html('澳门');
							$con.html('澳门分为澳门半岛、氹仔岛和路环岛。它的历史感与现代感被西湾大桥、澳氹大桥、友谊大桥自然地连接起来。澳门半岛上聚集了大三巴、炮台、玫瑰堂等文化景点，步上长长的阶梯，仰望大三巴在天空中曲折的剪影；登上大炮台，从不同的视角俯瞰澳门美景；街道上狭窄的石子路，盘根错节的榕树，触手可及的斑驳墙壁，巴洛克式的雕花装饰，都藏着澳门诉不尽的故事。');
							$local.html('Macau');
							$localURL.attr('javascript:void(0)');
							$seeName.html('Lanmei Airlines');
							$seeNum.html('935');
							break;
						case 'mask-3':
							$title.html('暹粒');
							$con.html("暹粒市是柬埔寨暹粒省的首府，古迹吴哥窟、大吴哥位于暹粒市北郊。暹粒河从暹粒市流过，河流两旁，星级酒店林立。暹粒市人口大约14万人，大部分信奉佛教。这座小城与喧嚣的金边相比，显得安静而毫不起眼。令世界各地的旅行者对暹粒趋之若骛的是被列为世界文化遗产、世界七大奇迹之一的吴哥窟。当第一眼看到崩密列——这座未被完全发掘和整修的寺庙时，你完全能体会当年那个法国人发现吴哥窟时的惊讶和震撼。吴哥窟是对吴哥古迹群的统称，这是一座由宫殿、寺庙、花园、城堡组成的完整的城市，古高棉王国的首都。");
							$local.html('Siem Reap');
							$localURL.attr('href','javascript:void(0)');
							$seeName.html('Lanmei Airlines');
							$seeNum.html('1203');
							break;
					}

					// 改变flag的值
					var changeFlag = function(){
						flag = true;
					}
					setTimeout(changeFlag,600);
				}else{
					flag = true;
				}
			}

		});
	},

	/* PC端旅行日记 */
	pcTraval:function(){

		// 获取容器的宽
		var getWidth = function(){
			var $li = $('.t-imgs>li');

			var $width3 = $('.t-imgs .n1');

			elementW3 = parseInt($width3.width());

			$li.height(elementW3*0.75);
		};
		getWidth();

		var _time = null;
		$(window).resize(function(){
			if (_time) clearTimeout(_time);
	    	_time = setTimeout(function() {
	    		getWidth();	
            }, 1000);
		});

		/* PC端事件  */
		var flag = true;//防止连续点击造成bug
		var $nth2 = $('.pc-travel-inner .nth-child2'); //获取显示文字框

		$('.pc-travel-inner .transformBox').click(function(){
			var that = this;
			var active = function(){
				$(that).addClass('active').siblings('.transformBox').removeClass('active');
			}

			var animate = function(id,len){
				// console.log(len);
				id.animate({left: len}, 600);
			}

			if(flag){
				flag = false;
				if(!$(that).hasClass('active')){
					var left = parseInt($(that).css('left'));
					var nth2Left = parseInt($nth2.css('left')); //文字显示框的left
					var child1,child2,child3;
					// console.log(left);
					var transformBox = $('.pc-travel-inner .transformBox');
					var length = transformBox.length;
					for(var i=0; i<length; i++){
						var leftSub = parseInt($(transformBox[i]).css('left'));
						// console.log(leftSub);
						if(leftSub<=80){
							child1 = transformBox[i];
						}
						if(leftSub<=330 && leftSub>=130){
							child2 = transformBox[i];
						}
						if(leftSub<=570 && leftSub>=370){
							child3 = transformBox[i];
						}
						if(leftSub>=600){
							child4 = transformBox[i];
						}
					}

					if(left<=80){
						active();
						if(nth2Left<=570 && nth2Left>=370){ //在第三个位置
							animate($(child2),470);
							animate($nth2,235);
						}else{
							animate($(child2),470);
							animate($(child3),705);
							animate($nth2,235);
						}	
					}

					if(left<=330 && left>=130){
						active();
						animate($(child3),705);
						animate($nth2,470);
					}

					if(left<=570 && left>=370){
						active();
						animate($(that),235);
						animate($nth2,470);
					}

					if(left>=600){
						active();
						if(nth2Left<=330 && nth2Left>=130){ //在第二个位置
							animate($(child3),235);
							animate($(this),470);
							animate($nth2,705);
						}else{
							animate($(child4),470);
							animate($nth2,705);
						}	
					}

					// 修改右侧说明
					var $title = $('.pc-travel-inner .lm-travel-deltail-title');
					var $con = $('.pc-travel-inner .lm-travel-detail-con');
					var $localURL = $('.pc-travel-inner .lm-travel-detail-local');
					var $local = $('.pc-travel-inner .lm-travel-detail-local').children('span');
					var $seeName = $('.pc-travel-inner .lm-travel-see-left').children('span');
					var $seeNum = $('.pc-travel-inner .lm-travel-see-right').children('span');

					var data = $(this).children('.t-maskBox').attr('data');

					switch (data) {
						case 'mask-1':
							$title.html('柬埔寨(金边皇宫)');
							$con.html('金边皇宫也称四臂湾大王宫，因位于上湄公河、洞里萨河、下湄公河与巴萨河的交汇处而得名，是诺罗敦国王于1866-1870年建造的，是柬埔寨国王的皇宫。<br> 王宫的建筑具有高棉传统建筑风格和宗教色彩，宫殿均有尖塔，代表繁荣；殿身涂以黄、白两色，黄色代表佛教，白色代表婆罗门教,大小宫殿二十多座。');
							$local.html('Phnom Penh');
							$localURL.attr('href','https://goo.gl/maps/SfKrMapEBXN2');
							$seeName.html('Lanmei Airlines');
							$seeNum.html('1729');
							break;
						case 'mask-2':
							$title.html('澳门');
							$con.html('澳门分为澳门半岛、氹仔岛和路环岛。它的历史感与现代感被西湾大桥、澳氹大桥、友谊大桥自然地连接起来。澳门半岛上聚集了大三巴、炮台、玫瑰堂等文化景点，步上长长的阶梯，仰望大三巴在天空中曲折的剪影；登上大炮台，从不同的视角俯瞰澳门美景；街道上狭窄的石子路，盘根错节的榕树，触手可及的斑驳墙壁，巴洛克式的雕花装饰，都藏着澳门诉不尽的故事。');
							$local.html('Macau');
							$localURL.attr('javascript:void(0)');
							$seeName.html('Lanmei Airlines');
							$seeNum.html('935');
							break;
						case 'mask-3':
							$title.html('暹粒');
							$con.html("暹粒市是柬埔寨暹粒省的首府，古迹吴哥窟、大吴哥位于暹粒市北郊。暹粒河从暹粒市流过，河流两旁，星级酒店林立。暹粒市人口大约14万人，大部分信奉佛教。这座小城与喧嚣的金边相比，显得安静而毫不起眼。令世界各地的旅行者对暹粒趋之若骛的是被列为世界文化遗产、世界七大奇迹之一的吴哥窟。当第一眼看到崩密列——这座未被完全发掘和整修的寺庙时，你完全能体会当年那个法国人发现吴哥窟时的惊讶和震撼。吴哥窟是对吴哥古迹群的统称，这是一座由宫殿、寺庙、花园、城堡组成的完整的城市，古高棉王国的首都。");
							$local.html('Siem Reap');
							$localURL.attr('href','javascript:void(0)');
							$seeName.html('Lanmei Airlines');
							$seeNum.html('1203');
							break;
					}

					// 改变flag的值
					var changeFlag = function(){
						flag = true;
					}
					setTimeout(changeFlag,600);
				}else{
					flag = true;
				}
			}

		});
	},

	/* 其他事件 */
	otherEvent:function(){
		// 轮播
		$('.LM-hiSlider').hiSlider({
			isFlexible: true,
			isShowTitle: false,
			isShowPage:false,
			isAuto: false,
			intervalTime: 3000,
			isSupportTouch: true,
			// prevImg:'../../images/EN/prev-arrow.png',
			// nextImg:'../../images/EN/next-arrow.png',
			titleAttr: function(curIdx){
				return $('img', this).attr('alt');
			}
		});

		//分页调用
		// $(".t-comment-page").createPage({
		//     pageCount:10,
		//     current:1,
		//     previous:'Previous',
		//     next:'Next',
		//     backFn:function(p){
		        
		//     }
		// });

	},
};

$(document).ready(function($) {
	LMTravelList.init();
});
