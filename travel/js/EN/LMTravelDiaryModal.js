
var LMTravelList = {
	init:function(){
		this.travelDiary();
	},

	/* 游记内容 */
	travelDiary:function(){
        // 获取父页面传来的参数
        var param = window.paramFromParent;
        alert(param);

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

    	    // 翻到指定页码触发事件
    	    $('.d-page .s2').html(pageCount);
    	    $flipbook.bind("turning", function(event, page, view) {
    	     	var len = view.length;
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
