
var LMTravelList = {
	init:function(){
		this.reginSelect();
		this.travelList();
		this.travelDiary();
		this.travelShare();
		this.otherEvent();
	},

	/* 热度选择下拉菜单 */
	reginSelect:function(){
		$('.modal-hot').on('click','.modal-hot-val',function(e){
			e.stopPropagation();
			$(this).siblings('ul').slideToggle();
		}).on('click','.modal-hot-menu>li',function(){
			var val = $(this).html();
			$(this).parent().slideDown('slow').siblings('span').html(val);
		});

		$('.modal-content').click(function(){
			$('.modal-hot ul').slideUp('slow');
		});
	},

	/* 游记列表 */
	travelList:function(){
		// 弹出模态框
		$('.img-com').click(function(){
			var local = $(this).attr('data-local');
			$('#js-'+local).modal();
		});
	},

	/* 游记内容 */
	travelDiary:function(){
		$('.travel-modal').on('click','.t-content > li > div',function(){
			$('.lm-loading').show();
			$('#js-diaryModal').modal({backdrop: 'static', keyboard: false});
			
			var id = $(this).attr('data-id');
			$('#js-diaryModal').on('shown.bs.modal', function () {
				// document.getElementById('diaryIframe').contentWindow.location.reload(true);
				var iframe = '<iframe src="LMTravelDiaryModal.html" frameborder="0" id="diaryIframe" style="width:100%;height: 860px;"></iframe>';
				$('.ifram-content').html(iframe);

				// 传参至iframe中
				var childFrameObj = document.getElementById('diaryIframe');
				childFrameObj.contentWindow.paramFromParent = id;

				setTimeout(function(){
					$('.lm-loading').hide();
				},2000)
			});

		});
		$('.close-diary').click(function(){
			$('#js-diaryModal').modal('hide');
		});
	},

	/* 分享游记和计划旅行 */
	travelShare:function(){
		$('.travel-nav .t-share,.travel-nav .t-plan').click(function(){
			$('#js-shareModal').modal();
		});

		// 定义DOM
		var $clear = $('.search-clear');
		var $input = $('.search-input');
		var $hot = $('.search-hot');
		var $title = $('.search-title');
		var $menu = $('.search-menu');

		// 清除按钮显示或隐藏
		$input.keyup(function(event) {
			if($(this).val() != ""){
				$clear.show();
				$hot.hide();
				$title.show();
				$menu.show();
			}else{
				$clear.hide();
				$hot.show();
				$title.hide();
				$menu.hide();
			}
		});

		// 清除输入框
		$clear.click(function(){
			$input.val('');
			$(this).hide();
			$hot.show();
			$title.hide();
			$menu.hide();
		});
	},

	/* 其他事件 */
	otherEvent:function(){
		
		// 点击游记缩放特效
		$('.img-com').mousedown(function(event) {
			$(this).css('transform','scale(0.8)');
		}).mouseup(function(event) {
			$(this).css('transform','scale(1)');
		});

	},
};

$(document).ready(function($) {
	LMTravelList.init();
});
