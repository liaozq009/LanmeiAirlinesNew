var lmFlightHotel = {
	cityData: LMComData.cityData,
	getCountryData: countryComData.countryData,
	seatmap: null,
	planeType: '',
	planeNo: '',
	winWidth: $(window).width(),
	init: function () {
		this.ajaxSeatData();
		this.isPc();
		this.flightInfo();
		this.flightCheckIn();
		this.complete();
		this.addEvend();
	},

	/** 获取座位数据 */
	ajaxSeatData: function () {
		this.seatmap = seat_data.seatmap.map;
		this.planeType = seat_data.planeType;
		this.planeNo = seat_data.planeNo;
	},

	/* 判断是PC端还是移动端 */
	isPc: function () {
		// 判断手机端或者PC端
		function IsPC() {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone"];
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

		if (flag) {
			this.pcEvent();
		} else {
			this.mobileEvent();
		}
	},

	/* 航班信息选择 */
	flightInfo: function () {
		var $dropdownMenu = $('.dropdownMenu-wrap');
		var $fromMenu = $('.js-fromMenu');

		$('body').click(function (event) {
			$dropdownMenu.hide();
		});

		var that = this;
		function cityFn() {
			$fromMenu.empty();
			$.each(that.cityData, function (i, val) {
				$fromMenu.append('<li title="' + val + '">' + val + '</li>');
			});
		};

		function dropdownFn(that) {
			$dropdownMenu.hide();
			$(that).siblings('.dropdownMenu-wrap').show();

			$(that).siblings('.dropdownMenu-wrap').addClass('animated2 moveInUp').show();
			setTimeout(function () {
				$(that).siblings('.dropdownMenu-wrap').removeClass('moveInUp');
			}, 500);
		}

		// 区号数据
		$.each(this.getCountryData, function (idx, val) {
			$('.js-codeMenu').append('<li title="' + val.region + '">' + val.chineseName + '(' + val.region + ')</li>');
		});

		//出发地选择
		$('.js-fromCity-input').click(function (event) {
			event.stopPropagation();
			cityFn();
			dropdownFn(this);
		});
		$('.js-fromMenu').on('click', '>li', function () {
			var text1 = $(this).attr('title');
			var text2 = text1.split('/');
			var $box = $(this).parents('.dropdownMenu-wrap');
			$box.hide();
			$box.siblings('input').val(text2[0] + '/' + text2[1]).attr('data-city', text2[1]);
		});

		// 模糊匹配
		this.autoComplete('.js-fromCity-input');

		// 护照和票号选择
		$('.js-select-option').click(function (event) {
			event.stopPropagation();
			dropdownFn(this);
		});
		$('.js-ticketMenu').on('click', '>li', function () {
			var text1 = $(this).attr('title');
			var id = $(this).attr('data-id');
			var $box = $(this).parents('.ticketMenu-wrap');
			var $input = $('.js-date-input');
			$box.hide();
			$box.siblings('span').html(text1);
			$input.attr('name', id);
			if (id == 'ticketNum') {
				$input.removeClass('passport-num');
			} else {
				$input.addClass('passport-num');
			}
		});

		$('.js-lastName-input').keyup(function (event) {
			$(this).val($(this).val().replace(/[^A-Za-z\/]/ig, ''));
		});

		$('.js-date-input').keyup(function (event) {
			$(this).val($(this).val().replace(/[^\w-]/ig, ''));
		});

		//搜索国家区号
		$('.js-search-code').click(function (e) {
			e.stopPropagation();
		});
		$('.js-codeMenu').on('click', '>li', function () {
			var text1 = $(this).attr('title');
			var $box = $(this).parents('.codeMenu-wrap');
			$box.siblings('span').html(text1).attr('title', text1);
		});
		this.autoComplete('.js-search-code'); //国家区号模糊匹配

		// 手机号只能输入数字
		$('.js-phone-input').keyup(function (event) {
			$(this).val($(this).val().replace(/[^\d]/ig, ''));
		});

		// 查询航班信息
		var $sectionInfo = $('.lm-section-info');
		var $sectionCheckIn = $('.lm-section-checkIn');
		var $sectionComplete = $('.lm-section-complete');
		var $mask = $('.header-mask,.footer-mask');

		$('.js-search-flight').click(function (event) {
			var $from = $('.js-fromCity-input');
			var $ticket = $('.js-date-input');
			var $name = $('.js-lastName-input');
			var $phone = $('.js-phone-input');

			if ($from.val() == '') {
				$from.addClass('warnTip');
				$from.focus();
				layer.open({
					title: '信息'
					, content: '请检查您的出发地是否正确'
				});
				return;
			} else {
				$from.removeClass('warnTip');
			}

			if ($ticket.val() == '') {
				$ticket.addClass('warnTip');
				$ticket.focus();
				layer.open({
					title: '信息'
					, content: '请检查您的票号或护照号是否正确'
				});
				return;
			} else {
				$ticket.removeClass('warnTip');
			}

			if ($name.val() == '') {
				$name.addClass('warnTip');
				$name.focus();
				layer.open({
					title: '信息'
					, content: '请检查您的姓名是否正确'
				});
				return;
			} else {
				$name.removeClass('warnTip');
			}
			if ($name.val().indexOf('/') === -1) {
				$name.addClass('warnTip');
				$name.focus();
				layer.open({
					title: '信息'
					, content: "请检查您的姓名的格式是否正确，必须是拼音，并且姓和名用'/'隔开，如：zhang/san"
				});
				return;
			} else {
				$name.removeClass('warnTip');
			}

			if ($phone.val() == '') {
				$phone.addClass('warnTip');
				$phone.focus();
				layer.open({
					title: '信息'
					, content: '请检查您的号码是否正确'
				});
				return;
			} else {
				$phone.removeClass('warnTip');
			}
		});

		// 下一步
		$('.lm-info').on('click', '.js-next-flight', function (event) {
			$sectionInfo.hide();
			$sectionCheckIn.show();
			$mask.show();
		});

		// 选择值机航班
		$('.lm-info-inner').click(function (event) {
			//state-wait未办理 state-ok已办理 state-no不可办理
			var state = $(this).attr('data-state');
			if (state === 'state-ok') {
				$('.js-select-radio').removeClass('select-ok');
				$(this).find('.js-select-radio').addClass('select-ok');
			}
		});
	},

	/* 座位选择 */
	flightCheckIn: function () {
		// 选中座位
		$('.seat-wrap-com').on('click', '>ul>li', function (event) {
			if (!$(this).hasClass('seat-sold') && !$(this).hasClass('row-num')) {
				$('.seat-wrap-com>ul>li').removeClass('seat-checked');
				$(this).addClass('seat-checked');
				var row = $(this).attr('data-row');
				var seatcolumn = $(this).attr('data-seatcolumn');
				var name = $.trim(String(row)) + $.trim(String(seatcolumn));
				$('.js-flight-num .s2').html(name);
				$('.js-pas-name .seat').html(name);
			}
		});

		// 定义外层机型机号class
		var planeNo = this.planeNo;
		var curentHeight = ''; // 拖拽
		var $sectionCheckIn = $('.lm-section-checkIn');
		if (planeNo === '919') {
			$sectionCheckIn.addClass('lm-A321-XU919');
			curentHeight = 3080; // 5600 A321 5330+270=5600
		} else if (planeNo === '961') {
			$sectionCheckIn.addClass('lm-A321-XU961');
			curentHeight = 3080; // 5600 A321
		} else if (planeNo === '971') {
			$sectionCheckIn.addClass('lm-A319-XU971');
			curentHeight = 2310; // 4180  A319 4180+270=4450
		} else if (planeNo === '901') {
			$sectionCheckIn.addClass('lm-A320-XU901');
			curentHeight = 2620; // 4668  A320 4668+270=4938
		} else if (planeNo === '903') {
			$sectionCheckIn.addClass('lm-A320-XU903');
			curentHeight = 2620; // 4668  A320
		} else if (planeNo === '978') {
			$sectionCheckIn.addClass('lm-A320-XU978');
			curentHeight = 2620; // 4668  A320
		}

		// 座位append
		var seatData = this.seatmap;

		for (var i = 0; i < seatData.length; i++) {
			var $child = '<ul class="row-' + seatData[i][0].seatRow + '">' +
				'<li class="cell-1" data-row="' + seatData[i][0].seatRow + '" data-seatColumn="' + seatData[i][0].seatColumn + '" data-seatStatus="' + seatData[i][0].seatStatus + '"></li>' +
				'<li class="cell-2" data-row="' + seatData[i][1].seatRow + '" data-seatColumn="' + seatData[i][1].seatColumn + '" data-seatStatus="' + seatData[i][1].seatStatus + '"></li>' +
				'<li class="cell-3" data-row="' + seatData[i][2].seatRow + '" data-seatColumn="' + seatData[i][2].seatColumn + '" data-seatStatus="' + seatData[i][2].seatStatus + '"></li>' +
				'<li class="row-num">' + seatData[i][0].seatRow + '</li>' +
				'<li class="cell-4" data-row="' + seatData[i][5].seatRow + '" data-seatColumn="' + seatData[i][5].seatColumn + '" data-seatStatus="' + seatData[i][5].seatStatus + '"></li>' +
				'<li class="cell-5" data-row="' + seatData[i][6].seatRow + '" data-seatColumn="' + seatData[i][6].seatColumn + '" data-seatStatus="' + seatData[i][6].seatStatus + '"></li>' +
				'<li class="cell-6" data-row="' + seatData[i][7].seatRow + '" data-seatColumn="' + seatData[i][7].seatColumn + '" data-seatStatus="' + seatData[i][7].seatStatus + '"></li>' +
				'</ul>';
			$('.js-seat-wrap').append($child);
		}

		// 收缩
		var $flightAside = $('.js-flight-aside');
		var $seatAside = $('.js-seat-aside');
		var $checkInAside = $('.js-checkIn-aside');
		var $flightArrow = $('.js-flight-arrow');
		var $seatArrow = $('.js-seat-arrow');
		var $checkInArrow = $('.js-checkIn-arrow');

		if (this.winWidth > 1200) {
			$flightArrow.click(function (event) {
				$(this).parent().css('left', -322);
			});
			$seatArrow.click(function (event) {
				$(this).parent().css('right', -250);
			});
			$checkInArrow.click(function (event) {
				$(this).parent().css('right', -250);
			});

		} else if (this.winWidth < 1200 && this.winWidth > 700) {
			$flightArrow.click(function (event) {
				event.stopPropagation();
				if ($flightAside.hasClass('flight-aside-scale')) {
					$flightAside.removeClass('flight-aside-scale');
				} else {
					$flightAside.addClass('flight-aside-scale');
				}
			});
			$seatArrow.click(function (event) {
				event.stopPropagation();
				if ($seatAside.hasClass('seat-aside-scale')) {
					$seatAside.removeClass('seat-aside-scale');
				} else {
					$seatAside.addClass('seat-aside-scale');
				}
			});
			$checkInArrow.click(function (event) {
				event.stopPropagation();
				if ($checkInAside.hasClass('checkIn-aside-scale')) {
					$checkInAside.removeClass('checkIn-aside-scale');
				} else {
					$checkInAside.addClass('checkIn-aside-scale');
				}
			});

			$flightAside.click(function (event) {
				$(this).removeClass('flight-aside-scale');
			});
			$seatAside.click(function (event) {
				$(this).removeClass('seat-aside-scale');
			});
			$checkInAside.click(function (event) {
				$(this).removeClass('checkIn-aside-scale');
			});

			var scrolltop = new Array();
			var i = 0;
			scrolltop[0] = 0;
			$(document).scroll(function () {
				i++;
				scrolltop[i] = $(document).scrollTop();
				if (scrolltop[i] > scrolltop[i - 1]) {
					//鼠标向下滚动
					if (scrolltop[i] > 150) {
						$flightAside.addClass('flight-aside-scale');
						$seatAside.addClass('seat-aside-scale');
						$checkInAside.addClass('checkIn-aside-scale');
					}
				} else {
					//鼠标向上滚动
					if (scrolltop[i] < 150) {
						$flightAside.removeClass('flight-aside-scale');
						$seatAside.removeClass('seat-aside-scale');
						$checkInAside.removeClass('checkIn-aside-scale');
					}
				};
			});

			$('.seat-wrap-com').on('click', '>ul>li', function (event) {
				$checkInAside.removeClass('checkIn-aside-scale');
			});
		}

		$flightAside.mouseenter(function (event) {
			$(this).css('left', 0);
		});
		$seatAside.mouseenter(function (event) {
			$(this).css('right', 0);
		});
		$checkInAside.mouseenter(function (event) {
			$(this).css('right', 0);
		});

		// 拖拽
		$('.js-miniMap-slide').myDrag({
			parent: '.js-miniMap-wrap', //定义拖动不能超出的外框,拖动范围
			randomPosition: true, //初始化随机位置
			fixedPosition: 0, //初始化固定位置
			direction: 'y', //方向
			handler: false, //把手
			dragStart: function (x, y) { }, //拖动开始 x,y为当前坐标
			dragEnd: function (x, y) {
				$('html, body').animate({ scrollTop: (y / 90) * curentHeight }, 'slow');
			}, //拖动停止 x,y为当前坐标
			dragMove: function (x, y) { //140 4180

			}
		});
		$(window).scroll(function () {
			var winHeigh = $(this).scrollTop(); //页面滚动的高度
			$('.js-miniMap-slide').css('top', (winHeigh / curentHeight) * 90);
		});

		/* 返回上一级 */
		var $sectionInfo = $('.lm-section-info');
		var $sectionComplete = $('.lm-section-complete');
		var $mask = $('.header-mask,.footer-mask');

		// 上一步 到首页
		$('.js-prev-btn').click(function (event) {
			$sectionInfo.show(); // 首页
			$sectionCheckIn.hide(); // 选座页面
			$mask.hide(); // 选座页面
			$('html, body').stop().animate({ scrollTop: 0 }, 'slow');
		});

		// 上一步 到选座页面
		$sectionComplete.on('click','.js-checkIn-prev',function (event) {
			$sectionCheckIn.show(); // 选座页面
			$mask.show(); // 选座页面
			$sectionComplete.hide(); // 支付页面
			$('html, body').stop().animate({ scrollTop: 0 }, 'slow');
		});

		var $payChild = '<div class="success-inner success-pay-inner">' +
			'<p class="select-radio js-select-radio select-ok"></p>' +
			'<div class="flight-airport">' +
			'<div class="from-airport airport-com">广州国际白云机场 <p>出发</p></div>' +
			'<div class="flight-num">' +
			'<span>LQ909</span>' +
			'<img src="../../images/resource/ticketHotel-line.png" class="pc-right-arrow">' +
			'<img src="../../images/resource/ticketHotel-line-mobile.png" class="mobile-right-arrow">' +
			'</div>' +
			' <div class="to-airport airport-com">金边国际机场 <p>到达</p></div>' +
			'</div>' +
			'<ul class="flight-info">' +
			' <li>2018-09-05<p>出发日期</p></li>' +
			' <li>8D<p>座位号</p></li>' +
			'<li class="price">￥466<p>价格</p></li>' +
			' </ul>' +
			'</div>' +
			' <div class="success-operation">' +
			' <a href="javascript:;" class="prev-checkIn js-checkIn-prev">上一步</a>' +
			' <a href="javascript:;" class="continue-checkIn js-checkIn-pay">支付</a>' +
			'</div>';

		var $successChild = '<div class="success-tips">' +
			'<div class="success-box">' +
			'<img src="../../images/checkIn/checkIn-success.png" alt="">' +
			'<div>' +
			' <h2>值机成功</h2>' +
			'<p>您已成功值机，请确认您的值机信息。</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="success-inner">' +
			'<p class="select-radio js-select-radio select-ok"></p>' +
			'<div class="flight-airport">' +
			'<div class="from-airport airport-com">广州国际白云机场 <p>出发</p></div>' +
			' <div class="flight-num">' +
			'<span>LQ909</span>' +
			' <img src="../../images/resource/ticketHotel-line.png" class="pc-right-arrow">' +
			'<img src="../../images/resource/ticketHotel-line-mobile.png" class="mobile-right-arrow">' +
			'</div>' +
			'<div class="to-airport airport-com">金边国际机场 <p>到达</p></div>' +
			'</div>' +
			'<ul class="flight-info">' +
			' <li>2018-09-05<p>出发日期</p></li>' +
			'<li>8D<p>座位号</p></li>' +
			'</ul>' +
			' </div>' +
			'<div class="success-operation">' +
			'<a href="javascript:;" class="export-PDF js-export-PDF">导出PDF</a>' +
			'<a href="javascript:;" class="continue-checkIn js-continue-checkIn">继续值机</a>' +
			'</div>';

		// 确定值机
		var checkInPrice = true;
		$('.js-checkIn-btn').click(function (event) {
			$sectionCheckIn.hide(); // 选座页面
			$sectionComplete.show(); // 支付页面
			$mask.hide(); // 选座页面
			if (checkInPrice) {
				$sectionComplete.html($payChild); //支付
			} else {
				$sectionComplete.html($successChild); //不用支付
			}
			$('html, body').stop().animate({ scrollTop: 0 }, 'slow');
		});

		// 点击支付
		$('.js-pay-checkIn').click(function () {
			$('#payModal').modal('hide');
			$sectionComplete.html($successChild); //不用支付
			$('html, body').stop().animate({ scrollTop: 0 }, 'slow');
		});
	},

	/* 完成或支付 */
	complete: function () {
		var $sectionInfo = $('.lm-section-info');
		var $sectionCheckIn = $('.lm-section-checkIn');
		var $sectionComplete = $('.lm-section-complete');
		var $mask = $('.header-mask,.footer-mask');

		$sectionComplete.on('click', '.js-continue-checkIn', function (event) {
			$sectionInfo.show();
			$sectionComplete.hide();
			$mask.hide();
			$('html, body').stop().animate({ scrollTop: 0 }, 'slow');
		});

		// 支付
		$sectionComplete.on('click', '.js-checkIn-pay', function (event) {
			$('#payModal').modal();
		});

		// 选择支付方式
		$('.js-pay-select>a').click(function (event) {
			$(this).addClass('active').siblings('a').removeClass('active');
			var dataPay = $(this).attr('data-pay');
			$('.js-pay-method').val(dataPay);
		});
	},

	/* pc端事件 */
	pcEvent: function () {
		// 定义滚动条
		// var nice = $("html").niceScroll({
		//     cursorborderradius: 0,
		//     cursorwidth: "8px",
		//     cursorfixedheight: 150,
		//     cursorcolor: "#1f2c5c",
		//     zindex: 9999,
		//     cursorborder: 0,
		//     scrollspeed: 26,
		//     mousescrollstep: 36,
		// });

		// 下一步 进入选座页面
		var $sectionCheckIn = $('.lm-section-checkIn');
		var that = this;
		$('.lm-info').on('click', '.js-next-flight', function (event) {
			setTimeout(function () {
				// $('.lm-cloud-wrap .img-01').addClass('animated3 fadeOutLeft');
				// $('.lm-cloud-wrap .img-02').addClass('animated3 fadeOutRight');
				// $('.lm-cloud-wrap .img-03').addClass('animated3 fadeOutLeft');
				// $('.lm-cloud-wrap .img-04').addClass('animated3 fadeOutRight');
			}, 1000);
			setTimeout(function () {
				$sectionCheckIn.addClass('checkIn-pos-top');
			}, 1000);
			setTimeout(function () {
				var planeType = that.planeType;
				if (planeType === '321') {
					$sectionCheckIn.addClass('checkIn-size-scale-321');
				} else if (planeType === '319') {
					$sectionCheckIn.addClass('checkIn-size-scale-319');
				} else if (planeType === '320') {
					$sectionCheckIn.addClass('checkIn-size-scale-320');
				}
			}, 2200);
			setTimeout(function () {
				$('.lm-seat-wrap').fadeIn();
			}, 3200);
			setTimeout(function () {
				$('html, body').stop().animate({ scrollTop: 500 }, 'slow');
			}, 4200);
		});
	},

	/* 移动端事件 */
	mobileEvent: function () {
		// 收缩
		var $flightAside = $('.js-flight-aside');
		var $checkInAside = $('.js-checkIn-aside');

		var scrolltop = new Array();
		var i = 0;
		scrolltop[0] = 0;
		$(document).scroll(function () {
			i++;
			scrolltop[i] = $(document).scrollTop();
			if (scrolltop[i] > scrolltop[i - 1]) {
				//鼠标向下滚动
				if (scrolltop[i] > 300) {
					$flightAside.addClass('flight-aside-toTop');
				}
			} else {
				//鼠标向上滚动
				$flightAside.removeClass('flight-aside-toTop');
			};
		});

		// 页面头部切换成上一步或者logo
		var $headerWrap = $('.header-wrap');
		var $returnArrow = $('.return-arrow-wrap');
		function headerHide() {
			$headerWrap.hide();
			$returnArrow.show();
		}
		function headerShow() {
			$headerWrap.show();
			$returnArrow.hide();
		}

		var $sectionInfo = $('.lm-section-info'); // 首页
		var $sectionCheckIn = $('.lm-section-checkIn'); // 选座页面
		var $mask = $('.header-mask,.footer-mask'); // 选座页面
		var $sectionComplete = $('.lm-section-complete'); // 支付页面

		// 上一步 到首页 移动端
		$returnArrow.on('click','.js-prev-btn',function (event) {
			headerShow();
			$(this).removeClass('js-prev-btn');
			$sectionInfo.show(); // 首页
			$sectionCheckIn.hide(); // 选座页面
			$mask.hide(); // 选座页面
			$('html, body').stop().animate({ scrollTop: 0 }, 'slow');
		});

		// 上一步 到选座页面 移动端
		$returnArrow.on('click','.js-checkIn-prev',function (event) {
			$(this).removeClass('js-checkIn-prev').addClass('js-prev-btn');
			$sectionCheckIn.show(); // 选座页面
			$mask.show(); // 选座页面
			$sectionComplete.hide(); // 支付页面
			$('html, body').stop().animate({ scrollTop: 0 }, 'slow');
		});

		// 下一步 进入选座页面
		$('.lm-info').on('click', '.js-next-flight', function (event) {
			headerHide();
			$('.return-arrow-wrap i').addClass('js-prev-btn').removeClass('js-checkIn-prev');
			$('.lm-seat-wrap').fadeIn();
			$('html, body').stop().animate({ scrollTop: 0 }, 'slow');
		});

		// 确认 进入支付页面
		$('.js-checkIn-btn,.js-prev-btn').click(function (event) {
			$('.return-arrow-wrap i').addClass('js-checkIn-prev').removeClass('js-prev-btn');
			headerHide();
		});

		// 支付 进入完成页面
		$('.js-pay-checkIn').click(function () {
			headerShow();
		});

		$('.seat-wrap-com').on('click', '>ul>li', function (event) {
			$checkInAside.addClass('checkIn-aside-scale');
		});
	},

	/* 模糊匹配 */
	autoComplete: function (id) {
		var that = this;
		var currenData = [];
		if (id == '.js-search-code') {
			currenData = [];
			for(var i=0; i<that.getCountryData.length; i++) {
				currenData.push(that.getCountryData[i].chineseName+'('+that.getCountryData[i].region+')');
			}
		} else if (id == '.js-fromCity-input') {
			currenData = that.cityData
		}
		/* 机票模糊匹配 */
		$(id).on('input', function (event) {
			var searchText = $(this).val();
			var data = $(this).attr('data');

			var currentVal = searchText.toLowerCase();
			var srdata = [];
			for (var i = 0; i < currenData.length; i++) {
				if (currentVal.trim().length > 0 && currenData[i].toLowerCase().indexOf(currentVal) > -1) {
					srdata.push(currenData[i]);
				}
			}

			$('.' + data).empty();
			var escapedSearchText, zregex, startpos, text, searchVal;
			$.each(srdata, function (i, val) {
				escapedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
				zregex = new RegExp(escapedSearchText, 'i');
				startpos = val.search(zregex);
				text = val.substr(0, startpos + searchText.length) + '</span>' + val.substr(startpos + searchText.length);
				searchVal = text.substr(0, startpos) + '<span>' + text.substr(startpos);

				$('.' + data).append('<li title="' + val + '">' + searchVal + '</li>');
			});
			if (srdata.length == 0) {
				$('.' + data).append('<li style="width:100%;">没有结果匹配 "' + searchText + '"</li>');
			}
			if (currentVal === '') {
				$('.' + data).empty();
				$.each(currenData, function (i, val) {
					$('.' + data).append('<li title="' + val + '">' + val + '</li>');
				});
			}
		});
	},

	/* 其他事件 */
	addEvend: function () {
	},
};

$(document).ready(function ($) {
	lmFlightHotel.init();
	$('.lm-loading').fadeOut();
});