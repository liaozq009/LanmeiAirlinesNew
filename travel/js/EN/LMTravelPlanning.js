
var LMTravelPlanning = {
	init:function(){
		this.editor();
		this.toolbar();
		this.otherEvent();
		this.isMobile();
	},

	/* 移动端下才执行的操作 */
	isMobile:function(){
		var winW = $(window).width();
		if(winW<767){
			this.mobildAddScenic();
		}
	},

	/* 编辑信息框 */
	editor:function(){
		// 费用区间选择
		var rangeSlider = function(min,max){
			$('.range-slider').jRange({
				from: min,
				to: max,
				step: 50,
				showScale:false,
				format: '%s',
				width: 180,
				showLabels: true,
				isRange : true
			});
		}
		rangeSlider(0,1000);

		// 编辑框显示或隐藏
		$('.p-header-title .p-edit').click(function(){
			$('.p-editor').show();
		});
		$('.p-editor-ok button').click(function(){
			$('.p-editor').hide();
		});

		// 日期选择
		var formatDate = function(ymd) { //日期格式化
			return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function(ymdFormatDate, y, m, d){
				m < 10 && (m = '0' + m);
				d < 10 && (d = '0' + d);
				return y + '-' + m + '-' + d;
			});
		};
		var today  = new Date();
		var startTimeStr = new Date(today.getTime()+86400000*1); 
		var startTime = formatDate(startTimeStr.getFullYear()+'-'+(startTimeStr.getMonth()+1)+'-'+startTimeStr.getDate());  
		var endTimeStr = new Date(today.getTime()+86400000*3); 
		var endTime = formatDate(endTimeStr.getFullYear()+'-'+(endTimeStr.getMonth()+1)+'-'+(endTimeStr.getDate()));
		var minTime = parseInt((today.getTime()-86400000*1)/1000); 
		
		// 判断屏幕大小展示不同的日期格式
		var winW = $(window).width();
		var dateRange = function(calNum){
			new pickerDateRange('travel-edit-time', {
				isTodayValid : true,
				startDate : startTime,
				endDate : endTime,
				minValidDate: minTime,
				// maxValidDate:
				stopToday : false, //和maxValidDate配合使用
				isTodayValid:true,//判断今天是否可选
				maxValidDate: 'maxTime',
				needCompare : false,
				defaultText : ' - ',
				autoSubmit : true,
				inputTrigger : 'input_trigger1',
				theme : 'ta',
				calendars:calNum,
				success : function(obj) {
					// console.log('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
				}
			});
		}
		if(winW>767){
			dateRange(2);
		}else{
			dateRange(1);
		}

		// 人数选择
		var adultNum = 1;
		var childNum = 0;
		$('.people-add').click(function(){
			adultNum++;
			$(this).siblings('input').val(adultNum);
		});
		$('.people-sub').click(function(){
			if(adultNum>1){
				adultNum--;
				$(this).siblings('input').val(adultNum);
			}
		});
		$('.child-add').click(function(){
			childNum++;
			$(this).siblings('input').val(childNum);
		});
		$('.child-sub').click(function(){
			if(childNum>0){
				childNum--;
				$(this).siblings('input').val(childNum);
			}
		});

		//其他金额， 注：金额选择放在jquery.range.js中
		$('.p-editor-money .max-money').change(function(){
			var optionVal = $('.p-editor-money .max-money  option:selected').val();  

			var $select = $('.slider-container,.p-editor-money .min-money,.p-editor-money .max-money');
			var $range = $('.range-slider');
			$range.val('').click();

			// 只能输入数字
			$range.keyup(function(event) {
				$(this).val($(this).val().replace(/[^\d]/ig,''));
			});

			if(optionVal=='0'){
				$range.show();
				 $select.hide();
			}else{
				$range.hide();
				 $select.show();
			}
		});
	},

	/* 操作栏，包括路线、游记、保存、预览 */
	toolbar:function(){
		var $route = $('.p-section-route');
		var $diary = $('.p-section-diary');
		var $page = $('.t-comment-page');
		var $cover = $('.p-section-cover');
		var $bottomLine = $('.p-toolbar-left .bottom-line');
		var $preview = $('.p-toolbar-right .p-preview');
		var $next = $('.p-toolbar-right .p-next');
		var $pdf = $('.p-toolbar-right .p-pdf');
		var $save = $('.p-toolbar-right .p-save');
		var $publish = $('.p-toolbar-right .p-publish');

		var coverClick = function(){
			$bottomLine.animate({'left':'218px'}, 300);
			$route.hide();
			$diary.hide();
			$page.hide();
			$cover.show();
			$next.css('display','none');
			$pdf.css('display','none');
			$preview.css('display','none');
			$save.css('display','inline-block');
			$publish.css('display','inline-block');
		}

		var diaryClick = function(){
			$bottomLine.animate({'left':'114px'}, 300);
			$route.hide();
			$diary.show();
			$page.show();
			$cover.hide();
			$next.css('display','inline-block');
			$pdf.css('display','none');
			$save.css('display','none');
			$preview.css('display','none');
			$publish.css('display','none');
		}

		$('.p-toolbar-left>li>a').click(function(){
			var $parent =  $(this).parent('li');
			$parent.addClass('active').siblings('li').removeClass('active');

			var href = $(this).attr('href');
			switch (href) {
				case '#route':
					$bottomLine.animate({'left':'10px'}, 300);
					$route.show();
					$diary.hide();
					$page.hide();
					$cover.hide();
					$next.css('display','inline-block');
					$pdf.css('display','inline-block');
					$preview.css('display','inline-block');
					$publish.css('display','none');
					$next.attr('data-id','route');
					break;
				case '#diary':
					diaryClick();
					$next.attr('data-id','diary');
					break;
				case '#cover':
					coverClick();
					break;
			}
		});

		// 点击next
		$next.click(function(){
			var data = $(this).attr('data-id');
			switch (data) {
				case 'route':
					$('.p-toolbar-left>li.n2').addClass('active').siblings('li').removeClass('active');
					diaryClick();
					$(this).attr('data-id','diary');
					break;
				case 'diary':
					$('.p-toolbar-left>li.n3').addClass('active').siblings('li').removeClass('active');
					coverClick();
					break;
			}
		});
	},

	/* 移动端添加景点 */
	mobildAddScenic:function(){
		var fadeOut = function(){
			$('.p-section-right').fadeOut();
		}
		$('.p-section-right .m-section-close').click(function(event) {
			fadeOut();
		});

		$('.js-add-scenic').click(function(event) {
			$('.p-section-right').fadeIn();
		});

		/* 选择景点后隐藏整个景点div */
		$('.p-scenic-inner').on('click','.p-scenic-box .p-add',function(){
			fadeOut();
		});
		$('.s-route-inner').on('click','.s-route-add',function(){
			fadeOut();
		});
	},

	/* 其他事件 */
	otherEvent:function(){
		
	},
};

$(document).ready(function($) {
	LMTravelPlanning.init();
});
