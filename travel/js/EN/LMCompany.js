
var LMTravelList = {
	init:function(){
		this.travelDiary();
	},

	/* 游记内容 */
	travelDiary:function(){
        // 获取父页面传来的参数
        var param = window.paramFromParent;
        // alert(param);

		// var child = "<div>111</div><div>222</div><div>333</div><div>111</div><div>222</div><div>333</div><div>111</div><div>222</div><div>333</div><div>111</div><div>222</div><div>333</div>";

		// $('#bookcontent').html(child);
		
    	// 游记翻页
    	function loadApp() {
    		var $flipbook = $('.flipbook');

    	    // Create the flipbook
    	    $flipbook.turn({
    	            // Width
    	            width:1260,
    	            // Height
    	            height:760,
    	            // Elevation
    	            elevation: 50,
    	            duration: 2000,
    	            // Enable gradients
    	            gradients: true,
    	            // Auto center this flipbook
    	            autoCenter: true
    	    });

    	    var resizeW = function(){
    	    	var winW = $(window).width();

    	    	if(winW<1300){
    	    		$flipbook.turn("display", "single");
    	    		$flipbook.turn("size", 630, 760); 
    	    	}else{
    	    		$flipbook.turn("display", "double");
    	    		$flipbook.turn("size",1260, 760);
    	    	}

    	    }
    	    resizeW();

    	    $(window).resize(function () {
    	    	resizeW();
    	    });

    	    var pageCount = $flipbook.turn("pages");//总页数

    	    // 下一页
    	    $('.page-toolbar .d-right,.modal-body .lg-d-right').click(function(){
    	    	$flipbook.turn("next");
    	    });

    	    // 上一页
    	    $('.page-toolbar .d-left,.modal-body .lg-d-left').click(function(){
    	    	$flipbook.turn("previous");
    	    });

    	    // 第一页
    	    $('.page-toolbar .d-start').click(function(){
    	    	$flipbook.turn("page", 1);
    	    });

    	    // 上一页
    	    $('.page-toolbar .d-end').click(function(){
    	    	$flipbook.turn("page", pageCount);
    	    });

            // 定义dom
            var $page2Img0 = $('.animate-title');
            var $page2Img1 = $('.animate-img-1');
            var $page2Img2 = $('.animate-img-2');
            var $page2Img3 = $('.animate-img-3');
            var $page2Img4 = $('.animate-img-4');
            var $page2Img5 = $('.animate-img-5');

            // 显示或隐藏元素
            var showElement = function(e){
                e.css('visibility','visible');
            };
            var hideElement = function(e){
                e.css('visibility','hidden');
            };
            hideElement($page2Img0);
            hideElement($page2Img1);
            hideElement($page2Img2);
            hideElement($page2Img3);
            hideElement($page2Img4);
            hideElement($page2Img5);

    	    // 翻到指定页码触发事件
    	    $('.d-page .s2').html(pageCount);
    	    $flipbook.bind("turning", function(event, page, view) {
    	     	var len = view.length;
                console.log(page);
    	     	if(len==1){
    	     		$('.d-page .s1').html(view[0]);
    	     	}else{
    	     		if(view[0]==0){
    	     			$('.d-page .s1').html(view[1]);
    	     		}else if(view[1]==0){
    	     			$('.d-page .s1').html(view[0]);
    	     		}else{
    	     			$('.d-page .s1').html(view[0]+'-'+view[1]);
    	     		}
    	     	}

                if(page == 2 || page == 3){
                    setTimeout(function(){
                        showElement($page2Img0);
                        $page2Img0.addClass('animated fadeIn');
                        showElement($page2Img1);
                        $page2Img1.addClass('animated zoomIn');
                        showElement($page2Img2);
                        $page2Img2.addClass('animated rotateIn');
                        showElement($page2Img3);
                        $page2Img3.addClass('animated slideInRight');
                    },2000);

                    setTimeout(function(){
                        showElement($page2Img4);
                        $page2Img4.addClass('animated slideInLeft');
                        showElement($page2Img5);
                        $page2Img5.addClass('animated rotateIn');
                    },2500);

                    setTimeout(function(){
                        $page2Img0.removeClass('fadeIn');
                        $page2Img1.removeClass('zoomIn');
                        $page2Img2.removeClass('rotateIn');
                        $page2Img3.removeClass('slideInRight');
                        $page2Img4.removeClass('slideInLeft');
                        $page2Img5.removeClass('rotateIn');
                    },4000);
                }else{
                    setTimeout(function(){
                        hideElement($page2Img0);
                        hideElement($page2Img1);
                        hideElement($page2Img2);
                        hideElement($page2Img3);
                        hideElement($page2Img4);
                        hideElement($page2Img5);
                    },2000);
                }
    	    });
    	}
    	// Load the HTML4 version if there's not CSS transform
    	yepnope({
    	    test : Modernizr.csstransforms,
    	    yep: ['../../libs/diary/turn/turn.js'],
    	    nope: ['../../libs/diary/turn/turn.html4.min.js'],
    	    both: ['../../libs/diary/turn/basic.css'],
    	    complete: loadApp
    	});


		// 游记声音播放和暂停
		$('.d-voice img').click(function(){
			$(this).hide().siblings('img').show();
		});
	},

};

$(document).ready(function($) {
	LMTravelList.init();
});
