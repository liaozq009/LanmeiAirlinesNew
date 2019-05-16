var LanmeiAirlinesPersonalCenter = {
    init: function () {
        this.reviewStar();
        this.addEvend();
        this.ticketSearch();
        this.ticketOrder();
        this.travelDiary();
        this.loadingColse();
    },

    /*机票订单*/
    ticketOrder: function () {
            //订单查询

            //个人机票查询
            $('.rightInfo').on('click', '.personalTicket-btn', function () {
                var name = $('.rightInfo .ticket-name').val();
                var ticketNumber = $('.rightInfo .ticket-number').val();
                if (name == null || name == "" || name == "undefined") {
                    $('.rightInfo #personalTicket').find('.ticket-content-inner').html("");
                    $('.rightInfo .ticket-name').val("请输入查询条件");
                    return;
                }
                if (ticketNumber == null || ticketNumber == "" || ticketNumber == "undefined") {
                    $('.rightInfo #personalTicket').find('.ticket-content-inner').html("");
                    $('.rightInfo .ticket-number').val("请输入查询条件");
                    return;
                }
                //隐藏补充说明
                $('.rightInfo .notes').hide();
                $.ajax({
                    type: "POST",
                    url: "../flightOrder/personerTicket.jhtml",
                    async: true,
                    dataType: "json",
                    data: {
                        "name": name,
                        "idNo": ticketNumber
                    },
                    success: function (data) {
                        if (data.MESSAGE == 'SUCCESS') {
                            orderEvent(data.order, 1, name, ticketNumber);
                        }
                        if (data.MESSAGE == 'NONE') {
                            $('.rightInfo #personalTicket').find('.ticket-content-inner').html("");
                            layer.alert("没有您要查询的信息");
                        }
                        if (data.MESSAGE == 'DATA_NULL') {
                            $('.rightInfo #personalTicket').find('.ticket-content-inner').html("");
                            layer.alert("请检查您的查询条件");
                        }
                    }
                });
            });

            //机票订单查询
            $('.rightInfo').on('click', '.ticketOrder-btn', function () {

                var mobile = $('.rightInfo .ticket-phone').val();
                var email = $('.rightInfo .ticket-email').val();
                var regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                if (!regEmail.test(email)) {
                    layer.alert("请确认你的您的邮箱是否正确");
                    return;
                }
                if (email.length > 20) {
                    layer.alert("邮箱格式不合法！");
                    return;
                }
                if (mobile.length > 20) {
                    layer.alert("电话号码格式不合法");
                    return;
                }
                //隐藏补充说明
                $('.rightInfo .notes').hide();
                $.ajax({
                    type: "POST",
                    url: "../flightOrder/flightOrder.jhtml",
                    async: true,
                    dataType: "json",
                    data: {
                        "mobile": mobile,
                        "email": email
                    },
                    success: function (data) {
                        if (data.MESSAGE == 'SUCCESS') {
                            orderEvent(data.order, 2, mobile, email);
                        }
                        if (data.MESSAGE == 'NONE') {
                            $('.rightInfo #personalTicket').find('.ticket-content-inner').html("");
                            layer.alert("没有您要查询的信息");
                        }
                        if (data.MESSAGE == 'DATA_NULL') {
                            $('.rightInfo #personalTicket').find('.ticket-content-inner').html("");
                            layer.alert("没有您要查询的信息");
                        }
                    }
                });
            });

            //查询结果集展示
            var orderEvent = function (data, status, object1, object2) {
                var html = "";
                $.each(data, function (index, order) {
                    html += '<div class="ticket-content-box">' +
                    '<div class="c-box-title">' +
                    '<p class="orderNum">订单号: <span>' + order.lmFlightOrder.orderID + ' </span></p>' +
                    '<p class="orderDate">' + order.lmFlightOrder.book_time + '</p>' +
                    '</div>';
//							'<div class="c-box-content">';
$.each(order.segList, function (index, seg) {
    html += '<div class="c-box-content"><div class="b-content-left">' +
    '<p class="from-time">( ' + seg.dep_time + ' )</p>' +
    '<p class="from-code">' + seg.dep_city + '</p>' +
    '<p class="from-local">航班号:' + seg.flight_No + '</p>' +
    '</div>' +
    '<div class="b-content-middle">' +
    '<img src="/lanmeiairlines2.0/default/images/EN/ticket-arrow.png" class="iconImg">' +
    '<img src="/lanmeiairlines2.0/default/images/EN/ticket-arrow-gray.png" class="iconImg-gray">' +
    '</div>' +
    '<div class="b-content-right">' +
    '<p class="to-time">( ' + seg.arr_time + ' )</p>' +
    '<p class="to-code">' + seg.arr_city + '</p>' +
    '<p class="to-local">旅行日期:' + seg.date + '</p>' +
    '</div>' +
    '</div>';
});
html += '</div>';
html += '<div class="ticket-price">' +
                        //'<button class="t-changes">Changes and Refund</button>'+
                        '<button class="t-details" data-status="' + status + '" data-name="' + object1 + '" data-idno="' + object2 + '" data-id="' + order.lmFlightOrder.orderID + '">详情</button>' +
                        //'<p class="total-price">Total : $<span>'+order.lmFlightOrder.pay_price+'</span></p>'+
                        '</div>';
                    });
                if (status == 1) {
                    //显示查询个人机票结果
                    $('.rightInfo #personalTicket').find('.ticket-content-inner').html("");
                    $('.rightInfo #personalTicket').find('.ticket-content-inner').html(html);
                } else {
                    //显示机票订单结果
                    $('.rightInfo #ticketOrder').find('.ticket-content-inner').html("");
                    $('.rightInfo #ticketOrder').find('.ticket-content-inner').html(html);
                }
            }

            $('.rightInfo').on('click', '.t-details', function () {
                var that = this;
                var status = $(that).attr('data-status');
                var obj1 = $(that).attr('data-name');
                var obj2 = $(that).attr('data-idno');
                var orderId = $(that).attr('data-id');
                if (status == 1) {
                    window.open('../flightOrder/personalDetail.jhtml?name=' + obj1 + '&idNo=' + obj2 + '&orderId=' + orderId + '&ln=CN');
                } else if (status == 2) {
                    //订单查询
                    window.open('../flightOrder/orderDetails.jhtml?contact=' + obj1 + '&email=' + obj2 + '&orderId=' + orderId + '&ln=CN');
                }

            });

        },
        /* 机票订单查询 */
        ticketSearch: function () {
            $('.rightInfo').on('click', '.ticket-title li a', function (e) {
                e.preventDefault();
                $('.ticket-title li img').hide();
                $(this).siblings('img').show();
                var id = $(this).attr('href');
                $(id).show().siblings('.ticket-menu').hide();
            });
        },


        /* 游记内容 */
        travelDiary: function () {
            //弹出模态框
            $('#rightInfo').on('click', '.myTravel > li > img', function (e) {
                var myJourney = $('#myJourney-wrapper').attr('class');
                if (myJourney != 'active') {
                    $('.lm-loading').show();
                    $('#js-diaryModal').modal({backdrop: 'static', keyboard: false});
                    var travelId = $(this)[0].parentElement.getAttribute('data-footprint_travelid');
                    if (travelId == null || travelId == '' || travelId == 'null') {
                        travelId = $(this)[0].parentElement.getAttribute('data-travelid');
                    }
                    $(".d-downLoad").attr("data-travelId", travelId);

                    // 弹出模态框后调用函数
                    $('#js-diaryModal').on('shown.bs.modal', function () {

                        var iframe = '<iframe src="../travelDiary/travelModal.jhtml" frameborder="0" id="diaryIframe" style="width:100%;height: 860px;"></iframe>';
                        $('.ifram-content').html(iframe);

                        // 传参至iframe中
                        var childFrameObj = document.getElementById('diaryIframe');
                        childFrameObj.contentWindow.paramFromParent = travelId;

                    });
                    $('.close-diary').click(function () {
                        $('#js-diaryModal').modal('hide');
                    });
                } else {
                    /**路线预览**/
                    $("#js-previewModal .modal-header").css("background", "url()");
                    $('.previewModal').show();
                    $.ajax({
                        url: "../travel/previewPlan.jhtml",
                        type: "post",
                        dataType: "json",
                        data: {"travelId": $(this).parent().attr("data-planid")},
                        success: function (data) {
                            $(".preview-routes-wrap").find(".p-day:eq(0)").nextAll().remove();
                            if (data != null) {
                                $(".preview-routes-wrap").find(".s-local").html(data.citys);
                                $(".preview-routes-wrap").find(".preview-time span").html(data.startTime + "~" + data.endTime);
                                $(".preview-routes-wrap").find(".preview-days span").html(data.day);
                                var mapUrls = data.mapUrls;
                                var sightNames = data.sightNames;
                                for (var i = 0; i < mapUrls.length; i++) {
                                    if (i != 0 && i < mapUrls.length) {
                                        var div_p_day = $(".preview-routes-wrap").find(".p-day:eq(0)").clone(true);
                                        $(".preview-routes-wrap").append(div_p_day);
                                    }
                                    var p_day = $(".preview-routes-wrap").find(".p-day:eq(" + i + ")");
                                    p_day.attr("data-day-index", i);
                                    p_day.find("h2").html("Day" + (i + 1));
                                    p_day.find("img").attr("src", mapUrls[i]);
                                    var ahref = "";
                                    var sights = [];
                                    sights = sightNames[i].split(",");
                                    for (var j = 0; j < sights.length; j++) {
                                        ahref += '<a href="javascript:void(0)"><span class="s-num">' + (j + 1) + '</span><span class="s-scenic">' + sights[j] + '</span></a>';
                                    }
                                    p_day.find(".p-day-inner").html(ahref);
                                }
                            }
                            $('#js-previewModal').modal();
                        }
                    });
                }

            });

        },

        loadingColse: function () {
            $('.lm-loading').hide();
        },
        /** 商品评论**/
        reviewStar: function () {
            var oStar = document.getElementById("js-reviews-star");
            var aLi = oStar.getElementsByTagName("li");
            var oUl = oStar.getElementsByTagName("ul")[0];
            var oSpan = oStar.getElementsByTagName("span")[0];
            var oP = oStar.getElementsByTagName("p")[0];
            var i = iScore = iStar = 0;

            var aMsg = [

            "很不满意|与卖家描述的严重不符",

            "不满意|部分有破损，与卖家描述的不符",

            "一般|质量一般",

            "满意|质量不错",

            "非常满意|质量非常好"

            ]

            for (i = 1; i <= aLi.length; i++) {
                aLi[i - 1].index = i;
                //鼠标移过显示分数
                aLi[i - 1].onmouseover = function () {
                    fnPoint(this.index);
                    //浮动层显示
                    oP.style.display = "block";
                    //计算浮动层位置
                    oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";
                    //匹配浮动层文字内容
                    oP.innerHTML = "<em><b>" + this.index + "</b> 分 " + aMsg[this.index - 1].match(/(.+)\|/)[1] + "</em>" + aMsg[this.index - 1].match(/\|(.+)/)[1]
                };

                //鼠标离开后恢复上次评分
                aLi[i - 1].onmouseout = function () {
                    fnPoint();
                    //关闭浮动层
                    oP.style.display = "none"
                };

                //点击后进行评分处理
                aLi[i - 1].onclick = function () {
                    iStar = this.index;
                    oP.style.display = "none";
                    oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1].match(/\|(.+)/)[1] + ")";
                    $('.getStar').val(this.index);
                }

            }

            //评分处理
            function fnPoint(iArg) {
                //分数赋值
                iScore = iArg || iStar;
                for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";
            }
    },


    /* 其他事件 */
    addEvend: function () {

        /* 个人中心信息修改 */
        $('.personalSetting').click(function () {
            $('#personalModal').modal();
        });

        /*密码修改*/
        $('.js-c-password').click(function () {
            $('#personalModal').modal('hide');
            $('#c-passwordModal').modal();
        });

        /* 个人信息修改页面判断，性别判断，选中 */
        var sex = $("#gender_data").val();
        $("input[name='m_gender'][value='" + sex + "']").prop("checked",
            "checked");

            // 生日选择
            $("#p-birth").jeDate({
                isinitVal: true,
                festival: false,
                ishmsVal: false,
                minDate: '1900-06-16',
                maxDate: $.nowDate({
                    DD: 0
                }),
                format: "YYYY-MM-DD",
                zIndex: 3000,
            });

            // 护照有效期选择
            $("#passport_No_date").jeDate({
                isinitVal: true,
                festival: false,
                ishmsVal: false,
                minDate: $.nowDate(0),
                format: "YYYY-MM-DD",
                zIndex: 3000,
            });

            // 国籍选择下拉框
            $('#p-nation').click(function (e) {
                e.stopPropagation();
                $(this).siblings('ul').show();
            });

            var cityData = {};
            $('.js-nation-input').one('click', function () {
                $.ajax({
                    type: "POST",
                    url: "../member/findNationality.jhtml",
                    data: {}, // 要发送的数据
                    dataType: "json",
                    success: function (data) {
                        var n = data.nationality;
                        //console.log(n);
                        for (var i = 0; i < n.length; i++) {
                            cityData[n[i].detail_name] = n[i].detail_id;
                        }
                        //console.log(cityData);
                    }
                })
            })


            // 模糊匹配
            $('.js-nation-input').on('keyup', function (event) {
                $(this).siblings('ul').empty();

                var currentVal = $(this).val().toLowerCase();

                var srdata = {};
                for (var key in cityData) {
                    if (currentVal.trim().length > 0 && key.toLowerCase().indexOf(currentVal) > -1) {
                        srdata[key] = cityData[key];
                    }
                }
                //console.log(srdata);
                var that = this;
                for (var key in srdata) {
                    $(that).siblings('ul').append('<li><a href="#" data-val="' + srdata[key] + '">' + key + '</a></li>');
                }
                //$.each(srdata,function(i,val){
                //$(that).siblings('ul').append('<li><a href="#" data-val="${nationality.detail_id}">'+val.name+'</a></li>');
                //});

                if (currentVal === '') {
                    for (var key in cityData) {
                        $(that).siblings('ul').append('<li><a href="#"  data-val="' + cityData[key] + '">' + key + '</a></li>');
                    }
                    ;
                }
            });


            $('.form-nation').on('click', '.menu-com a', function (e) {
                // e.preventDefault();e.stopPropagation();
                var $parent = $(this).parents('.menu-com');
                var val = $(this).text();
                var data = $(this).attr('data-val');
                $parent.siblings('.js-nation-input').val(val); //显示
                $parent.siblings('#nationality_id').val(data); //传送
                // $parent.hide();
            });
            $('html').click(function () {
                $('.form-nation .menu-com').hide();
            });


            // 订单切换
            $('.infoContent>li>a').click(
                function () {
                    $(this).parent('li').addClass('active').siblings('li')
                    .removeClass('active');
                });

            var pageCount = 10;

            //机票订单详情
            function ticketOrderAppen() {
                var str = '<div class="ticket-wrapper">';
                str += '<ul class="ticket-title">' +
                '<li class="personal-ticket">' +
                '<a href="#personalTicket">个人机票信息</a>' +
                '<img src="/lanmeiairlines2.0/default/images/EN/ticket-select-bg.png">' +
                '</li>' +
                '<li class="ticket-order">' +
                '<a href="#ticketOrder">机票订单查询</a>' +
                '<img src="/lanmeiairlines2.0/default/images/EN/ticket-select-bg.png">' +
                '</li>' +
                '</ul>';
                str += '<div class="ticket-menu" id="personalTicket">';
                str += '<ul class="ticket-search">' +
                '<li class="n1">' +
                '<p><img src="/lanmeiairlines2.0/default/images/EN/adult.png">姓名</p>' +
                '<input class="ticket-name" onkeyup="this.value=this.value.toUpperCase()" placeholder="请输入姓名的拼音字母(Lisi)" type="text" name="" value="" >' +
                '</li>' +
                '<li class="n2">' +
                '<p><img src="/lanmeiairlines2.0/default/images/EN/passport.png">护照号</p>' +
                '<input type="text" class="ticket-number" onkeyup="this.value=this.value.toUpperCase()" placeholder="请输入你的证件号码" name="" value="" >' +
                '</li>' +
                '<li class="n3">' +
                '<button class="personalTicket-btn">查	询</button>' +
                '</li>' +
                '</ul>';
                str += '<div class="ticket-content-wrap">' +
                '<div class="ticket-content-inner t-inner-valid">' +
                    //个人机票
                    '</div>';
                    str += '</div></div>'

                    str += '<div class="ticket-menu" id="ticketOrder">' +
                    '<ul class="ticket-search">' +
                    '<li class="n1">' +
                    '<p><img src="/lanmeiairlines2.0/default/images/EN/ticket-phone.png">预订电话</p>' +
                    '<input type="text" class="ticket-phone" placeholder="13388888888" name="" value="" >' +
                    '</li>' +
                    '<li class="n2">' +
                    '<p><img src="/lanmeiairlines2.0/default/images/EN/ticket-email.png">订票邮箱</p>' +
                    '<input type="text" class="ticket-email" placeholder="lm-ec@lanmeiairlines.com" name="" value="" >' +
                    '</li>' +
                    '<li class="n3">' +
                    '<button class="ticketOrder-btn">查	询</button>' +
                    '</li>' +
                    '</ul>' +
                    '<div class="ticket-content-wrap">' +
                    '<div class="ticket-content-inner t-inner-valid">' +
                    //机票订单
                    '</div></div>' +
                    '</div>';
                    str += '<div class="notes"><p><span>说明:</span>只能查询2018年5月11日起的订单数据</p></div>';
                    str += '</div>';
                    $("#rightInfo").html(str);
                };

            // 我的优惠券
            function myCoupon(memberId, pageNumber, async) {
                $.ajax({
                    type: "POST",
                    url: "../coupon/myCoupon.jhtml",
                    async: async,
                    data: {
                        "memberId": memberId,
                        "pageNumber": pageNumber,
                    }, // 要发送的数据<li>是否使用 </li><li>使用日期</li>
                    dataType: "json",
                    success: function (data) {
                        pageCount = data.coupon.totalPage;

                        var list = data.coupon.list;

                        var str = '<div class="coupon-screen commonTitle-wrap"><p data="total" class="active">全部</p><p data="not-expired">未过期</p><p data="expired">已过期</p></div>';
                        str += '<ul class="coupon-wrap"><li class="n5"><ul><li>名称</li><li>优惠码</li><li>过期日期</li></ul></li>';
                        if (pageCount == 0) {
                            str += '<div class="no-flight-info" >';
                            str += '<img src="/lanmeiairlines2.0/default/images/CN/no_data.png"/>';
                            str += '<p class="no-flight-info-tips">没数据！</p >';
                            $(".p-comment-page").hide();
                        } else {
                            for (var i = 0; i < list.length; i++) {
                                str += '<li class="n6"><ul>';
                                str += '<li title="name">' + list[i].name + '</li>';
                                str += '<li title="code">' + list[i].code + '</li>';
                                //str += '<li title="status">' + list[i].EReturnState
                                //+ '</li>';
                                //str += '<li title="use">';
                                //if (list[i].used_date != null) {
                                // str += list[i].used_date;
                                //} else {
                                // str += "-- --";
                                // }
                                //str += '</li>';
                                var endDate = list[i].end_date;

                                var curDate = new Date().getTime();
                                var targetDate = (new Date(endDate.replace(new RegExp("-","gm"),"/"))).getTime();
                                if(targetDate>curDate){ //未过期
                                    str += '<li title="date" class="not-expired">' + endDate.substring(0, endDate.indexOf(' ')) + '</li>';
                                }else{
                                    str += '<li title="date" class="expired">' + endDate.substring(0, endDate.indexOf(' ')) + '</li>';
                                }

                                str += '</ul></li>';
                            }
                        }
                        str += '<input type="hidden"  id="couponPage" value="'
                        + data.coupon.totalPage + '">';
                        str += '</ul>';
                        $("#rightInfo").html(str);
                    }
                });
            }
            //优惠券过期情况切换
            $("#rightInfo").on('click','.coupon-screen>p',function(){
                $(this).addClass('active').siblings('p').removeClass('active');
                var data = $(this).attr('data');
                if(data=='total'){
                    $('.coupon-wrap>li').show();
                }else if(data=='not-expired'){ //未过期
                    $('.coupon-wrap .not-expired').parent().parent().show();
                    $('.coupon-wrap .expired').parent().parent().hide();
                }else if(data=='expired'){ //已过期
                    $('.coupon-wrap .not-expired').parent().parent().hide();
                    $('.coupon-wrap .expired').parent().parent().show();
                }
            });

            /* 澜湄汇会员 */
            function lanmeiMember(){
            	$.ajax({
            		type: "POST",
                    url: "../coins/getCoins.jhtml",
                    async: false,
                    dataType: "json",
                    success: function (data) {
                        var $child = '<div class="member-wrap commonTitle-wrap"><p data="member-level" class="active">会员等级</p><p data="coin-detail">澜湄币明细</p></div>'+
                        '<div class="member-content-wrap commonContent-wrap">'+
                        '<div class="member-level">'+
                        '<div class="member-opera">'+
                        '<a href="javascript:;" class="member-download" style="display:none;"><img src="/lanmeiairlines2.0/default/images/personalCenter/download-card.png"/>会员卡下载</a>'+
                        '<a href="/lanmeiairlines2.0/default/menus/CN/community/LMMemberManual.html" target="_blank" class="member-instructions">会员手册</a>'+
                        '<a href="javascript:;" class="coin-register">澜湄币补登</a>'+
                        '</div>'+
                        '<h2 class="title">'+data.rank+'</h2>'+
                        '<p class="date">有效期至'+data.expiration+'</p>'+
                        '<div class="progressBar">'+
                        '<span class="progress_back"></span>'+
                        '<span class="progress" style="width:'+data.progress+';"></span>'+
                        '<span class="integral">'+data.coins.effective_score+'/60</span>'+
                        '<span class="ordinary-card card" title="普卡会员"><img src="/lanmeiairlines2.0/default/images/personalCenter/ordinary-level.png"/></span>'+
                        '<span class="silver-card card" title="银卡会员"><img src="/lanmeiairlines2.0/default/images/personalCenter/silver-level.png"/></span>'+
                        '<span class="golden-card card" title="金卡会员"><img src="/lanmeiairlines2.0/default/images/personalCenter/golden-level.png"/></span>'+
                        '<span class="platinum-card card" title="白金卡会员"><img src="/lanmeiairlines2.0/default/images/personalCenter/platinum-level.png"/></span>'+
                        '</div>'+
                        '<p class="upgrade-tips">再获取<span>'+data.differ+'</span>定级航段升级为'+data.card+'</p>'+
                        '<p class="tips">有效期更新后会员等级重新评定 <a href="/lanmeiairlines2.0/default/menus/CN/community/LMMemberEvaluate.html" target="_blank">查看详情&gt;</a></p>'+
                        '</div>'+
                        '<div class="coin-detail">'+
                        '<table class="bag-table table table-hover">'+
                        '<thead>'+
                        '<tr>'+
                        '<th>获取日期</th>'+
                        '<th>澜湄币数</th>'+
                        '<th>定级航段数</th>'+
                        '<th>航班日期</th>'+
                        '<th>详细说明</th>'+
                        '</tr>'+
                        '</thead>'+
                        '<tbody>';
                        for(var i = 0;i<data.coinsList.length;i++){
                          $child +='<tr>'+
                          '<td>'+data.coinsList[i].create_date+'</td>'+
                          '<td>'+data.coinsList[i].score+'</td>'+
                          '<td></td>'+
                          '<td></td>'+
                          '<td>'+data.coinsList[i].describe+'</td>'+
                          '</tr>';
                      }
                      $child += '</tbody>'+
                      '</table>'+                                 
                      '</div>'+
                      '</div>';
                      $("#rightInfo").html($child);
                  }
              });
            };
            // 会员等级和澜湄币明细切换
            $("#rightInfo").on('click','.member-wrap>p',function(){
                $(this).addClass('active').siblings('p').removeClass('active');
                var data = $(this).attr('data');
                $('.member-content-wrap>div').hide();
                if(data=='member-level'){
                    $('.member-content-wrap>.member-level').show();
                }else if(data=='coin-detail'){ //会员详情
                    $('.member-content-wrap>.coin-detail').show();
                }
            });
            // 会员卡下载
            $("#rightInfo").on('click','.member-download',function(){
            	
            	var level = $('.js-card-lever').val();
            	var num = $('.js-card-num').val();
            	
                layer.open({
                  type: 1, //Page层类型
                  area: ['380px', '200px'],
                  title: false,
                  shadeClose: true, //点击遮罩关闭
                  shade: 0.6, //遮罩透明度
                  maxmin: false, //允许全屏最小化
                  anim: 1, //0-6的动画形式，-1不开启
                  content: '<div class="member-download-wrap"><div class="member-img"><img src="/lanmeiairlines2.0/default/images/personalCenter/'+level+'-card-download.png" /><p class="member-num">'+num+'</p></div><a href="javascript:;" class="js-member-download"><img src="/lanmeiairlines2.0/default/images/personalCenter/download-card-2.png" />下载会员卡</a></div>',
                  success: function(layero, index){
                    // 会员卡下载样式调整
                    var $layerMember = $('.member-download-wrap').parent();
                    $layerMember.parent().css('border-radius','6px');
                    $layerMember.css('overflow','inherit');
                    $layerMember.siblings('.layui-layer-setwin').css('display','none');
                }
            }); 
            });
            // 澜湄币补登
            $("#rightInfo").on('click','.coin-register',function(){
                layer.open({
                  type: 1, //Page层类型
                  area: ['380px', 'auto'],
                  title: false,
                  shadeClose: true, //点击遮罩关闭
                  shade: 0.6, //遮罩透明度
                  maxmin: false, //允许全屏最小化
                  anim: 1, //0-6的动画形式，-1不开启
                  content: '<div class="coin-register-wrap" style="text-align:left;color:#1f2c5c;font-size:16px;"><p>1、2019年2月1日起的航班可累积澜湄币和定级航段；</p><p>2、2019年2月1日起的航班，如有澜湄币或定级航段遗漏，请于乘机之日起1个月内发邮件至<span style="color: #00908C;">lanmeiclub@lanmeiairlines.com</span>申请补登,以避免影响会员升级或保级。</p></div>'
              }); 
            });


            /* 常旅客管理 */
            var getCountryData = countryComData.countryData; //国家数据
            var documentTypeData = ['护照','台胞证','港澳通行证','回乡证','赴台通行证','因公港澳通行证','澳门特别行政区旅行证']; //证件类型
            var memberNum = String($.trim($('.card-num>span').html()));

            // 个人资料模态框签发地 
            $.each(getCountryData,function(idx,val){
                $('.form-IssueAt ul').append('<li><a href="javascript:void(0)">'+val.chineseName+'</a></li>');
            });
            $('#p-IssueAt').click(function(e) {
                e.stopPropagation();
                $(this).siblings('ul').show();
            });
            $('.form-IssueAt').on('click', '.menu-com a', function (e) {
                var $parent = $(this).parents('.menu-com');
                var val = $(this).text();
                $('#p-IssueAt').val(val);
            });
            $('html').click(function () {
                $('.form-IssueAt .menu-com').hide();
            });

            // 整体结构
            function passManagement(){
                var $child = '<div class="passManagement-wrap commonTitle-wrap"><p data="pass-info" class="active">常旅客信息</p><p data="pass-contacts">常用联系人</p></div>'+
                '<div class="passenger-content-wrap commonContent-wrap"></div>';
                $("#rightInfo").html($child);
                passengerInfo();
            };

            /* 常旅客 */
            // 常旅客信息列表和模糊查询公共方法
            function passengerListOrLike(like){
                var index = layer.load(2,{shade: 0.1});
                $.ajax({
                    type: "POST",
                    url: "../member/flyman/flyManLists.jhtml",
                    dataType: "json",
                    data: {'memberNum':memberNum,like:like},
                    success: function (data) {
                        var $child = '<div class="passenger-info">'+
                        '<div class="passenger-operation">'+
                        '<span>旅客姓名：</span>'+
                        '<input type="text" class="passenger-name" placeholder="旅客姓名(拼音)"/>'+
                        '<button class="passenger-search">查询</button>'+
                        '<a href="javascript:;" class="passenger-add add">新增常旅客</a>'+
                        '<a href="javascript:;" class="passenger-delete delete">删除常旅客</a>'+
                        '</div>'+
                        '<table class="bag-table table table-hover">'+
                        '<thead>'+
                        '<tr>'+
                        '<th class="checkAll-passenger"><input type="checkbox"></th>'+
                        '<th>姓名</th>'+
                        '<th>护照号</th>'+
                        '<th>性别</th>'+
                        '<th>操作</th>'+
                        '</tr>'+
                        '</thead>'+
                        '<tbody class="passenger-tbody">'+

                        '</tbody>'+
                        '</table>'+  
                        '</div>';
                        $('.passenger-content-wrap').html($child);
                        $('.passenger-operation .passenger-name').val(like);

                        if(data.status==400){
                            $('.passenger-info tbody').append('<tr><td>没有旅客信息！</td></tr>');
                            layer.close(index);
                            return;
                        }

                        var list = data.contactsList;
                        var listLength = list.length;
                        if(listLength==0){
                            $('.passenger-info tbody').append('<tr><td>没有旅客信息！</td></tr>');
                        }
                        $.each(list,function(inx,val){
                            var sex = val.gender;
                            if(sex=='0'){sex='先生'}
                            if(sex=='1'){sex='女士'}
                            if(sex=='2'){sex='小姐'}
                            var str = '<tr>';
                            str += '<td><input type="checkbox" name="check-passenger" rid="'+val.id+'"></td>';
                            str += '<td>'+val.name+'</td>';
                            str +='<td>'+val.passportNo+'</td>';
                            str += '<td>'+sex+'</td>';
                            str += '<td><a href="javascript:;" class="see-info">查看</a><a href="javascript:;" class="modify-info">修改</a><a href="javascript:;" class="delete-info">删除</a></td>'+
                            '</tr>';
                            $('.passenger-info tbody').append(str);
                        });
                        layer.close(index);
                    },
                    error: function(){
                        $('.passenger-content-wrap').html('<p style="text-align:center">服务器繁忙，请稍后再试！</p>');
                        layer.close(index);
                    }
                });
            };

            // 常旅客信息列表
            function passengerInfo(){
                passengerListOrLike('');
            };

            // 编辑单个常旅客
            function passengerEdit(title){
                var $child = '<div class="passenger-edit edit-wrap">'+
                '<h2>'+title+'</h2>'+
                '<div class="lastName-box"><p>姓氏(拼音)</p><input type="text" class="lastName js-lastName" placeholder="姓氏(拼音)" autocomplete="off"></div>'+
                '<div class="firstName-box"><p>名字(拼音)</p><input type="text" class="firstName js-firstName" placeholder="名字(拼音)" autocomplete="off"></div>'+
                '<div class="passenger-menuBox"><p>证件类型</p><input type="text" class="passport js-passportType-input" placeholder="证件类型" readonly><ul class="passenger-menuCom js-documentType-menu"></ul></div>'+
                '<div class="passport-box"><p>证件号</p><input type="text" class="passport js-passport" placeholder="证件号" autocomplete="off"></div>'+
                '<div class="passenger-menuBox issueAt-box"><p>签发地</p><input type="text" class="js-issueAt-input" placeholder="签发地" readonly><ul class="passenger-menuCom js-IssueAt-menu"></ul></div>'+
                '<div class="passportNodate-box"><p>有效期</p><input type="text" class="js-passportNodate-input" readonly></div>'+
                '<div class="passenger-menuBox"><p>国籍</p><input type="text" class="js-nationality-input" placeholder="国籍" readonly><ul class="passenger-menuCom js-nationality-menu"></ul></div>'+
                '<div class="birth-box"><p>出生日期</p><input type="text" class="js-birth-input" readonly></div>'+
                '<div class="gender-box">'+
                '<p>性别</p>'+
                '<label class="radio-inline"><input type="radio" value="0" name="m_gender" checked="">先生</label>'+
                '<label class="radio-inline"><input type="radio" name="m_gender" value="1">女士</label>'+
                '<label class="radio-inline"><input type="radio" name="m_gender" value="2">小姐</label>'+
                '</div>'+
                '<div class="passenger-save-wrap">'+
                '<input type="hidden" class="js-passenger-id">'+
                '<button type="button" class="passenger-save">保存</button>'+
                '<button type="button" class="passenger-cancle">取消</button>'+
                '</div>'+
                '</div>';
                $('.passenger-content-wrap').html($child);

                $.each(documentTypeData,function(idx,val){
                    $('.js-documentType-menu').append('<li><a href="javascript:void(0)">'+val+'</a></li>');
                });
                $.each(getCountryData,function(idx,val){
                    $('.js-IssueAt-menu,.js-nationality-menu').append('<li><a href="javascript:void(0)">'+val.chineseName+'</a></li>');
                });

                $(".js-birth-input").jeDate({
                    isinitVal: true,
                    festival: false,
                    ishmsVal: false,
                    minDate: '1900-06-16',
                    maxDate: $.nowDate({
                        DD: 0
                    }),
                    format: "YYYY-MM-DD",
                    zIndex: 3000,
                });
                $(".js-passportNodate-input").jeDate({
                    isinitVal: true,
                    festival: false,
                    ishmsVal: false,
                    minDate: $.nowDate(0),
                    format: "YYYY-MM-DD",
                    zIndex: 3000,
                });
            };

            // 查看单个常旅客
            function passengerSee(title){
                var $child = '<div class="passenger-edit edit-wrap">'+
                '<h2>'+title+'</h2>'+
                '<div class="lastName-box"><p>姓氏(拼音)</p><input type="text" class="lastName js-lastName" placeholder="姓氏(拼音)" disabled></div>'+
                '<div class="firstName-box"><p>名字(拼音)</p><input type="text" class="firstName js-firstName" placeholder="名字(拼音)" disabled></div>'+
                '<div class="passenger-menuBox"><p>证件类型</p><input type="text" class="passport js-passportType-input" placeholder="证件类型" disabled></div>'+
                '<div class="passport-box"><p>证件号</p><input type="text" class="passport js-passport" placeholder="证件号" disabled></div>'+
                '<div class="passenger-menuBox issueAt-box"><p>签发地</p><input type="text" class="js-issueAt-input" placeholder="签发地" disabled></div>'+
                '<div class="passportNodate-box"><p>有效期</p><input type="text" class="js-passportNodate-input" disabled></div>'+
                '<div class="passenger-menuBox"><p>国籍</p><input type="text" class="js-nationality-input" placeholder="国籍" disabled></div>'+
                '<div class="birth-box"><p>出生日期</p><input type="text" class="js-birth-input" disabled></div>'+
                '<div class="gender-box">'+
                '<p>性别</p>'+
                '<label class="radio-inline"><input type="radio" value="0" name="m_gender" checked="" disabled>先生</label>'+
                '<label class="radio-inline"><input type="radio" name="m_gender" value="1" disabled>女士</label>'+
                '<label class="radio-inline"><input type="radio" name="m_gender" value="2" disabled>小姐</label>'+
                '</div>'+
                '<div class="passenger-save-wrap">'+
                '<button type="button" class="passenger-cancle">取消</button>'+
                '</div>'+
                '</div>';
                $('.passenger-content-wrap').html($child);
            };

            // 新增或编辑单个常旅客公共方法
            function passengerSaveOrEdit(url,tips,passengerID){
                var $lastName = $('.js-lastName');
                var $firstName = $('.js-firstName');
                var $passportType = $('.js-passportType-input');
                var $passport = $('.js-passport');
                var $issueAt = $('.js-issueAt-input');
                var $passportNodate = $('.js-passportNodate-input');
                var $nationality = $('.js-nationality-input');
                var $birth = $('.js-birth-input');

                var lastName = $.trim($lastName.val());
                var firstName = $.trim($firstName.val());
                var name = String(lastName)+'/'+String(firstName);
                var passportType = $.trim($passportType.val());
                var passport = $.trim($passport.val());
                var issueAt = $.trim($issueAt.val());
                var passportNodate = $.trim($passportNodate.val());
                var nationality = $.trim($nationality.val());
                var birth = $.trim($birth.val());
                var gender = $.trim($('.gender-box input:radio[name="m_gender"]:checked').val());

                if(lastName==''){layer.msg('姓氏不能为空！', {icon: 6}); $lastName.focus();return;}
                if(firstName==''){layer.msg('名字不能为空！', {icon: 6}); $firstName.focus();return;}
                if(passportType==''){layer.msg('证件类型不能为空！', {icon: 6}); $passportType.focus();return;}
                if(passport==''){layer.msg('证件号不能为空！', {icon: 6}); $passport.focus();return;}
                if(issueAt==''){layer.msg('签发地不能为空！', {icon: 6}); $issueAt.focus();return;}
                if(passportNodate==''){layer.msg('有效期不能为空！', {icon: 6}); $passportNodate.focus();return;}
                if(nationality==''){layer.msg('国籍不能为空！', {icon: 6}); $nationality.focus();return;}
                if(birth==''){layer.msg('出生日期不能为空！', {icon: 6}); $birth.focus();return;}

                // 证件号
                var reg1 = /^[A-Za-z0-9]+$/; 
                if (!reg1.test(passport)) {
                    layer.msg('证件号格式不正确！', {icon: 6});
                    $passport.focus();
                    return;
                }

                var dataArray;
                if(tips=='save'){
                    dataArray = {memberNum:memberNum,name: name,credentialType:passportType,passportNo:passport,placeOfIssue:issueAt,validityOfPassport:passportNodate,nationality:nationality,birth:birth,gender:gender};
                }else if(tips=='edit'){
                    dataArray = {memberNum:memberNum,id: passengerID,name: name,credentialType:passportType,passportNo:passport,placeOfIssue:issueAt,validityOfPassport:passportNodate,nationality:nationality,birth:birth,gender:gender};
                }

                var layerLoading = layer.msg('正在保存', {icon: 16,shade: 0.01,time: false});
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: dataArray,
                    success: function (data) {
                        var message = '';
                        if(tips=='save'){
                            if(data.status==200){message='添加成功！'}
                            if(data.status==400){message='添加失败！'}
                            if(data.status==420){message='格式错误！'}
                            if(data.status==422){message='旅客信息达到上限！'}
                            if(data.status==423){message='有相同联系人！'}
                        }else if(tips=='edit'){
                            if(data.status==200){message='修改成功！'}
                            if(data.status==400){message='修改失败！'}
                        }
                        
                        layer.open({
                            title: '提示信息',
                            content: message,
                            btn: ['确定'],
                            yes: function (index, layero) {
                                layer.close(index);
                                if(data.status==200){
                                    passengerInfo();
                                }
                            }
                        });
                        layer.close(layerLoading);
                    },
                    error: function(){
                        layer.close(layerLoading);
                        layer.msg('服务器繁忙，请稍后再试！', {icon: 6,shade: 0.01,time: 3000});
                    }
                });
            };

            // 模糊查询常旅客
            $("#rightInfo").on('click','.passenger-operation .passenger-search',function(){
                passengerListOrLike($.trim($(this).siblings('input').val()));
            });

            //新增常旅客信息
            $("#rightInfo").on('click','.passenger-add',function(){
                passengerEdit('新增常旅客信息');
                $('.passenger-edit .passenger-save').attr('data','save');
            });

            // 查看常旅客信息
            $("#rightInfo").on('click','.passenger-tbody .see-info',function(){
                var rid = $(this).parent('td').siblings('td').children('input').attr('rid');
                $.ajax({
                    type: "POST",
                    url: "../member/flyman/findOneFlyMan.jhtml",
                    dataType: "json",
                    data: {id:rid},
                    success: function (data) {
                        passengerSee('常旅客信息');
                        var listData = data.contactsList;
                        $('.js-lastName').val(listData.name.split('/')[0]);
                        $('.js-firstName').val(listData.name.split('/')[1]);
                        $('.js-passportType-input').val(listData.credentialType);
                        $('.js-passport').val(listData.passportNo);
                        $('.js-issueAt-input').val(listData.placeOfIssue);
                        $('.js-passportNodate-input').val(listData.validityOfPassport);
                        $('.js-nationality-input').val(listData.nationality);
                        $('.js-birth-input').val(listData.birth.split(' ')[0]);
                        $('.js-birth-input').val(listData.birth.split(' ')[0]);

                        var gender = listData.gender;
                        function selectRadio(name,val){
                            $(".gender-box input[name="+name+"]").each(function(){
                                $(this).prop("checked",false);
                            });
                            $(".gender-box input[value="+val+"]").prop("checked",true);
                        }
                        selectRadio('m_gender',gender);
                    },
                    error:function(){
                        layer.msg('服务器繁忙，请稍后再试！', {icon: 6}); 
                    }
                });
            });

            // 修改常旅客信息
            $("#rightInfo").on('click','.passenger-tbody .modify-info',function(){
                var rid = $(this).parent('td').siblings('td').children('input').attr('rid');
                $.ajax({
                    type: "POST",
                    url: "../member/flyman/findOneFlyMan.jhtml",
                    dataType: "json",
                    data: {id:rid},
                    success: function (data) {
                        passengerEdit('编辑常旅客信息');
                        $('.passenger-edit .passenger-save').attr('data','edit');
                        var listData = data.contactsList;
                        $('.js-lastName').val(listData.name.split('/')[0]);
                        $('.js-firstName').val(listData.name.split('/')[1]);
                        $('.js-passportType-input').val(listData.credentialType);
                        $('.js-passport').val(listData.passportNo);
                        $('.js-issueAt-input').val(listData.placeOfIssue);
                        $('.js-passportNodate-input').val(listData.validityOfPassport);
                        $('.js-nationality-input').val(listData.nationality);
                        $('.js-birth-input').val(listData.birth.split(' ')[0]);
                        $('.js-passenger-id').val(rid);

                        var gender = listData.gender;
                        function selectRadio(name,val){
                            $(".gender-box input[name="+name+"]").each(function(){
                                $(this).prop("checked",false);
                            });
                            $(".gender-box input[value="+val+"]").prop("checked",true);
                        }
                        selectRadio('m_gender',gender);
                    },
                    error:function(){
                        layer.msg('服务器繁忙，请稍后再试！', {icon: 6}); 
                    }
                });
            });

            // 删除常旅客信息
            $("#rightInfo").on('click','.passenger-delete',function(){
                var $input = $('.passenger-tbody input');
                var rid = [];
                $.each($input,function(index, el) {
                    if($(el).is(':checked')){
                      rid.push($(el).attr('rid'));
                  }
              });
                if(rid.length==0){
                    layer.msg('请选择删除的旅客信息！', {icon: 6}); 
                    return;
                }
                layer.open({
                    title: '提示信息',
                    content: '确定要删除吗？',
                    btn: ['确定'],
                    yes: function (index, layero) {
                        layer.close(index);
                        $.ajax({
                            type: "POST",
                            url: "../member/flyman/flyManDelete.jhtml",
                            dataType: "json",
                            data: {id:rid.join(',')},
                            success: function (data) {
                                var message = '';
                                if(data.status==200){message='删除成功！'}
                                    if(data.status==580){message='删除失败！'}
                                        layer.open({
                                            title: '提示信息',
                                            content: message,
                                            btn: ['确定'],
                                            yes: function (index, layero) {
                                                layer.close(index);
                                                if(data.status==200){
                                                    passengerInfo();
                                                }
                                            }
                                        });
                                },
                                error:function(){
                                    layer.msg('服务器繁忙，请稍后再试！', {icon: 6}); 
                                }
                            });
                    }
                });
            });
            $("#rightInfo").on('click','.passenger-tbody .delete-info',function(){
                var rid = $(this).parent('td').siblings('td').children('input').attr('rid');
                layer.open({
                    title: '提示信息',
                    content: '确定要删除吗？',
                    btn: ['确定'],
                    yes: function (index, layero) {
                        layer.close(index);
                        $.ajax({
                            type: "POST",
                            url: "../member/flyman/flyManDelete.jhtml",
                            dataType: "json",
                            data: {id:rid},
                            success: function (data) {
                                var message = '';
                                if(data.status==200){message='删除成功！'}
                                    if(data.status==580){message='删除失败！'}
                                        layer.open({
                                            title: '提示信息',
                                            content: message,
                                            btn: ['确定'],
                                            yes: function (index, layero) {
                                                layer.close(index);
                                                if(data.status==200){
                                                    passengerInfo();
                                                }
                                            }
                                        });
                                },
                                error:function(){
                                    layer.msg('服务器繁忙，请稍后再试！', {icon: 6}); 
                                }
                            });
                    }
                });
            });

            //保存新增的常旅客信息
            $("#rightInfo").on('click','.passenger-save',function(){
                var data = $(this).attr('data');
                var passengerID = $(this).siblings('input').val();
                if(data=='save'){
                    passengerSaveOrEdit('../member/flyman/flyManAdd.jhtml','save','');
                }else if(data=='edit'){
                    passengerSaveOrEdit('../member/flyman/flyManUpdate.jhtml','edit',passengerID);
                }
            });
            // 取消保存常旅客信息
            $("#rightInfo").on('click','.passenger-cancle',function(){
                passengerInfo();
            });

            /* 联系人 */
            // 联系人信息列表和模糊查询公共方法
            function contactsListOrLike(like){
                var index = layer.load(2,{shade: 0.1});
                $.ajax({
                    type: "POST",
                    url: '../member/contactsInfo/contacrsInfoList.jhtml',
                    dataType: "json",
                    data: {memberNum: memberNum,like:like},
                    success: function (data) {
                        var $child = '<div class="passenger-contacts">'+
                        '<div class="passenger-operation">'+
                        '<span>联系人姓名：</span>'+
                        '<input type="text" class="contacts-name" placeholder="联系人姓名"/>'+
                        '<button class="contacts-search">查询</button>'+
                        '<a href="javascript:;" class="contacts-add add">新增联系人</a>'+
                        '<a href="javascript:;" class="contacts-delete delete">删除联系人</a>'+
                        '</div>'+
                        '<table class="bag-table table table-hover">'+
                        '<thead>'+
                        '<tr>'+
                        '<th class="checkAll-contacts"><input type="checkbox"></th>'+
                        '<th>姓名</th>'+
                        '<th>国家或地区区号</th>'+
                        '<th>手机号/电话</th>'+
                        '<th>邮箱</th>'+
                        '<th>操作</th>'+
                        '</tr>'+
                        '</thead>'+
                        '<tbody class="contacts-tbody">'+

                        '</tbody>'+
                        '</table>'+                                  
                        '</div>';
                        $('.passenger-content-wrap').html($child);
                        $('.passenger-operation .contacts-name').val(like);

                        if(data.status==400){
                            $('.passenger-contacts tbody').append('<tr><td>没有联系人信息！</td></tr>');
                            layer.close(index);
                            return;
                        }

                        var list = data.list;
                        var listLength = list.length;
                        if(listLength==0){
                            $('.passenger-contacts tbody').append('<tr><td>没有联系人信息！</td></tr>');
                        }
                        $.each(list,function(inx,val){
                            var str = '<tr>';
                            str += '<td><input type="checkbox" name="check-contacts" rid="'+val.id+'"></td>';
                            str += '<td style="position:relative;">'+val.name+'<p class="default-address default-address-'+val.status+'">默认</p></td>';
                            str += '<td>'+val.countryCode+'</td>';
                            str += '<td>'+val.mobile+'</td>';
                            str += '<td>'+val.email+'</td>';
                            str += '<td><a href="javascript:;" class="see-info">查看</a><a href="javascript:;" class="modify-info">修改</a><a href="javascript:;" class="delete-info">删除</a></td>';
                            str += '</tr>';
                            $('.passenger-contacts tbody').append(str);
                        });
                        layer.close(index);
                    },
                    error: function(){
                        $('.passenger-content-wrap').html('<p style="text-align:center">服务器繁忙，请稍后再试！</p>');
                        layer.close(index);
                    }
                });
            };

            // 联系人信息列表
            function passengerContacts(){
                contactsListOrLike('');
            };

            // 编辑单个联系人
            function contactsEdit(title){
                var $child = '<div class="contacts-edit edit-wrap">'+
                '<h2>'+title+'</h2>'+
                '<div class="lastName-box"><p>姓氏(拼音)</p><input type="text" class="lastName js-lastName" placeholder="姓氏(拼音)" autocomplete="off"></div>'+
                '<div class="firstName-box"><p>名字(拼音)</p><input type="text" class="firstName js-firstName" placeholder="名字(拼音)" autocomplete="off"></div>'+
                '<div class="passenger-menuBox"><p>国家或地区区号</p><input type="text" class="js-country" placeholder="国家或地区区号" readonly><ul class="passenger-menuCom js-country-menu"></ul></div>'+
                '<div class="phone-box"><p>手机号/电话</p><input type="text" class="js-phone" placeholder="手机号/电话" autocomplete="off"></div>'+
                '<div class="email-box"><p>邮箱</p><input type="text" class="js-email" placeholder="邮箱" autocomplete="off"></div>'+
                '<label>'+
                '<input type="checkbox" class="js-contacts-checkbox">设为默认联系人'+
                '</label>'+
                '<div class="passenger-save-wrap">'+
                '<input type="hidden" class="js-contacts-id">'+
                '<button class="contacts-save">保存</button>'+
                '<button class="contacts-cancle">取消</button>'+
                '</div>'+
                '</div>';
                $('.passenger-content-wrap').html($child);

                $.each(getCountryData,function(idx,val){
                    $('.js-country-menu').append('<li><a href="javascript:void(0)">'+val.chineseName+'('+val.region+')</a></li>');
                });
            };

            // 查看单个联系人
            function contactsSee(){
                var $child = '<div class="passenger-edit edit-wrap">'+
                '<h2>联系人信息</h2>'+
                '<div class="lastName-box"><p>姓氏(拼音)</p><input type="text" class="lastName js-lastName" placeholder="姓氏(拼音)" disabled></div>'+
                '<div class="firstName-box"><p>名字(拼音)</p><input type="text" class="firstName js-firstName" placeholder="名字(拼音)" disabled></div>'+
                '<div class="passenger-menuBox"><p>国家或地区区号</p><input type="text" class="js-country" placeholder="国家或地区区号" disabled></div>'+
                '<div class="phone-box"><p>手机号/电话</p><input type="text" class="js-phone" placeholder="手机号/电话" disabled></div>'+
                '<div class="email-box"><p>邮箱</p><input type="text" class="js-email" placeholder="邮箱" disabled></div>'+
                '<div class="passenger-save-wrap">'+
                '<button class="contacts-cancle">取消</button>'+
                '</div>'+
                '</div>';
                $('.passenger-content-wrap').html($child);
            };

            // 新增或编辑单个联系人公共方法
            function contactsSaveOrEdit(url,tips,contactsID){
                var $lastName = $('.js-lastName');
                var $firstName = $('.js-firstName');
                var $country = $('.js-country');
                var $phone = $('.js-phone');
                var $email = $('.js-email');

                var lastName = $.trim($lastName.val());
                var firstName = $.trim($firstName.val());
                var name = String(lastName)+'/'+String(firstName);
                var country = $.trim($country.val());
                var phone = $.trim($phone.val());
                var email = $.trim($email.val());
                var status = '0';
                if($('.contacts-edit input[type="checkbox"]').is(':checked')){
                    status = '1';
                }

                if(lastName==''){layer.msg('姓氏不能为空！', {icon: 6}); $lastName.focus();return;}
                if(firstName==''){layer.msg('名字不能为空！', {icon: 6}); $firstName.focus();return;}
                if(country==''){layer.msg('国家或地区区号不能为空！', {icon: 6}); $country.focus();return;}
                if(phone==''){layer.msg('手机号/电话不能为空！', {icon: 6}); $phone.focus();return;}
                if(email==''){layer.msg('邮箱不能为空！', {icon: 6}); $email.focus();return;}

                // 手机
                var reg2 = /^[0-9-+ ]+$/;
                if (!reg2.test(phone)) {
                    layer.msg('手机/电话格式不正确！', {icon: 6});
                    $phone.focus();
                    return;
                }
                //email
                var reg3 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮箱
                if (!reg3.test(email)) {
                    layer.msg('邮箱格式不正确！', {icon: 5});
                    $email.focus();
                    return;
                }

                var dataArray;
                if(tips=='save'){
                    dataArray = {memberNum:memberNum,name: name,countryCode:country,mobile:phone,email:email,status:status};
                }else if(tips=='edit'){
                    dataArray = {memberNum:memberNum,id: contactsID,name: name,countryCode:country,mobile:phone,email:email,status:status};
                }

                var layerLoading = layer.msg('正在保存', {icon: 16,shade: 0.01,time: false});
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: dataArray,
                    success: function (data) {
                        var message = '';
                        if(tips=='save'){
                            if(data.status==200){message='添加成功！'}
                            if(data.status==400){message='添加失败！'}
                            if(data.status==420){message='格式错误！'}
                            if(data.status==422){message='联系人信息达到上限！'}
                            if(data.status==423){message='有相同联系人！'}
                        }else if(tips=='edit'){
                            if(data.status==200){message='修改成功！'}
                            if(data.status==400){message='修改失败！'}
                        }
                        
                        layer.open({
                            title: '提示信息',
                            content: message,
                            btn: ['确定'],
                            yes: function (index, layero) {
                                layer.close(index);
                                if(data.status==200){
                                    passengerContacts();
                                }
                            }
                        });
                        layer.close(layerLoading);
                    },
                    error: function(){
                        layer.close(layerLoading);
                        layer.msg('服务器繁忙，请稍后再试！', {icon: 6,shade: 0.01,time: 3000});
                    }
                });
            };

            // 模糊查询联系人信息列表
            $("#rightInfo").on('click','.passenger-operation .contacts-search',function(){
                contactsListOrLike($.trim($(this).siblings('input').val()));
            });

            //新增联系人信息
            $("#rightInfo").on('click','.contacts-add',function(){
                contactsEdit('新增常联系人信息');
                $('.contacts-edit .contacts-save').attr('data','save');
            });

            // 查看单个联系人信息
            $("#rightInfo").on('click','.contacts-tbody .see-info',function(){
                var rid = $(this).parent('td').siblings('td').children('input').attr('rid');
                $.ajax({
                    type: "POST",
                    url: "../member/contactsInfo/findOneContacrsInfo.jhtml",
                    dataType: "json",
                    data: {id:rid},
                    success: function (data) {
                        contactsSee();
                        var listData = data.infoEntity;
                        $('.js-lastName').val(listData.name.split('/')[0]);
                        $('.js-firstName').val(listData.name.split('/')[1]);
                        $('.js-country').val(listData.countryCode);
                        $('.js-phone').val(listData.mobile);
                        $('.js-email').val(listData.email);
                    },
                    error:function(){
                        layer.msg('服务器繁忙，请稍后再试！', {icon: 6}); 
                    }
                });
            });

            // 修改联系人信息
            $("#rightInfo").on('click','.contacts-tbody .modify-info',function(){
                var rid = $(this).parent('td').siblings('td').children('input').attr('rid');
                $.ajax({
                    type: "POST",
                    url: "../member/contactsInfo/findOneContacrsInfo.jhtml",
                    dataType: "json",
                    data: {id:rid},
                    success: function (data) {
                        contactsEdit('编辑联系人信息');
                        $('.contacts-edit .contacts-save').attr('data','edit');
                        var listData = data.infoEntity;
                        $('.js-lastName').val(listData.name.split('/')[0]);
                        $('.js-firstName').val(listData.name.split('/')[1]);
                        $('.js-country').val(listData.countryCode);
                        $('.js-phone').val(listData.mobile);
                        $('.js-email').val(listData.email);
                        $('.js-contacts-id').val(rid);
                        if(listData.status=='1'){
                            $('.js-contacts-checkbox').prop("checked", true);
                        }
                    },
                    error:function(){
                        layer.msg('服务器繁忙，请稍后再试！', {icon: 6}); 
                    }
                });
            });

            // 删除常旅客信息
            $("#rightInfo").on('click','.contacts-delete',function(){
                var $input = $('.contacts-tbody input');
                var rid = [];
                $.each($input,function(index, el) {
                    if($(el).is(':checked')){
                      rid.push($(el).attr('rid'));
                  }
              });
                if(rid.length==0){
                    layer.msg('请选择删除的联系人信息！', {icon: 6}); 
                    return;
                }
                layer.open({
                    title: '提示信息',
                    content: '确定要删除吗？',
                    btn: ['确定'],
                    yes: function (index, layero) {
                        layer.close(index);
                        $.ajax({
                            type: "POST",
                            url: "../member/contactsInfo/contactsInfoDelate.jhtml",
                            dataType: "json",
                            data: {id:rid.join(',')},
                            success: function (data) {
                                var message = '';
                                if(data.status==200){message='删除成功！'}
                                    if(data.status==580){message='删除失败！'}
                                    layer.open({
                                        title: '提示信息',
                                        content: message,
                                        btn: ['确定'],
                                        yes: function (index, layero) {
                                            layer.close(index);
                                            if(data.status==200){
                                                passengerContacts();
                                            }
                                        }
                                    });
                            },
                            error:function(){
                                layer.msg('服务器繁忙，请稍后再试！', {icon: 6}); 
                            }
                        });
                    }
                });
            });
            $("#rightInfo").on('click','.contacts-tbody .delete-info',function(){
                var rid = $(this).parent('td').siblings('td').children('input').attr('rid');
                layer.open({
                    title: '提示信息',
                    content: '确定要删除吗？',
                    btn: ['确定'],
                    yes: function (index, layero) {
                        layer.close(index);
                        $.ajax({
                            type: "POST",
                            url: "../member/contactsInfo/contactsInfoDelate.jhtml",
                            dataType: "json",
                            data: {id:rid},
                            success: function (data) {
                                var message = '';
                                if(data.status==200){message='删除成功！'}
                                    if(data.status==580){message='删除失败！'}
                                        layer.open({
                                            title: '提示信息',
                                            content: message,
                                            btn: ['确定'],
                                            yes: function (index, layero) {
                                                layer.close(index);
                                                if(data.status==200){
                                                    passengerContacts();
                                                }
                                            }
                                        });
                                },
                                error:function(){
                                    layer.msg('服务器繁忙，请稍后再试！', {icon: 6}); 
                                }
                            });
                    }
                });
            });

            //保存联系人信息
            $("#rightInfo").on('click','.contacts-save',function(){
                var data = $(this).attr('data');
                var contactsID = $(this).siblings('input').val();
                if(data=='save'){
                    contactsSaveOrEdit('../member/contactsInfo/contactsInfoAdd.jhtml','save','');
                }else if(data=='edit'){
                    contactsSaveOrEdit('../member/contactsInfo/ContacrsInfoUpdate.jhtml','edit',contactsID);
                }
            });
            // 取消保存联系人信息
            $("#rightInfo").on('click','.contacts-cancle',function(){
                passengerContacts();
            });


            // 常旅客信息和常用联系人切换
            $("#rightInfo").on('click','.passManagement-wrap>p',function(){
                $(this).addClass('active').siblings('p').removeClass('active');
                var data = $(this).attr('data');
                if(data=='pass-info'){
                    passengerInfo();
                }else if(data=='pass-contacts'){
                    passengerContacts();
                }
            });

            // 全选
            $("#rightInfo").on('click','.checkAll-passenger input',function() {
                $("input[name='check-passenger']").prop("checked", this.checked);
            });
            $("#rightInfo").on('click','.checkAll-contacts input',function() {
                $("input[name='check-contacts']").prop("checked", this.checked);
            });

            // 下拉框事件
            $("#rightInfo").on('click','.passenger-menuBox input',function(e) {
                e.stopPropagation();
                $(this).parent('div').siblings('div').children('ul').slideUp();
                $(this).siblings('ul').slideDown();
            });
            $("#rightInfo").on('click','.passenger-menuBox li a',function() {
                $(this).parents('.passenger-menuCom').siblings('input').val($(this).text());
            });
            $('html').click(function(event) {
                $('.passenger-menuCom').slideUp();
            });

            // 姓名只能为字母
            $("#rightInfo").on('keyup','.js-lastName,.js-firstName,.passenger-name',function(event) {
               $(this).val($(this).val().replace(/[^A-Za-z\/]/ig,''));
           });


            // 订单首页
            function findOrderPage(memberId, status, pageNumber, async) {
                $.ajax({
                    type: "POST",
                    url: "../order/findOrderPage.jhtml",
                    async: async,
                    data: {
                        "memberId": memberId,
                        "status": status,
                        "pageNumber": pageNumber

                    }, // 要发送的数据
                    dataType: "json",
                    success: function (data) {
                        pageCount = data[0].totalPage;

                        var str = '<ul><li class="n1"><ul><li>编码</li><li style="width: 150px">商品</li><li>收货人</li><li>订单金额($)</li><li>状态</li><li>商品数量</li><li style="width: 50px">操作</li></ul></li>';
                        if (pageCount == 0) {
                            str += '<div class="no-flight-info" >';
                            str += '<img  src="/lanmeiairlines2.0/default/images/CN/no_data.png"/>';
                            str += '<p class="no-flight-info-tips">没数据！</p >';
                            $(".p-comment-page").hide();
                        } else {

                            for (var i = 1; i < data.length; i++) {
                                str += '<li class="n2"><ul>';
                                str += '<li title="' + data[i].sn + '">' + data[i].sn + '</li>';
                                str += '<li style="width: 150px;height:40px" title="image">';
                                for (var j = 0; j < data[i].orderItem.length; j++) {
                                    str += '<a href="/goods/lmshopDetailPage/'
                                    + data[i].orderItemId[j].oiId
                                    + '.jhtml" target=_blank > <img src=" '
                                    + data[i].orderItem[j].thumbnail
                                    + '"></img><a>';
                                }
                                str += '</li>';
                                str += '<li title="' + data[i].consignee + '">' + data[i].consignee + '</li>';
                                str += '<li title="' + data[i].amount + '">' + data[i].amount + '</li>';

                                var createTime = new Date(data[i].createTime);
                                var nowTime = new Date();
                                var status = "";
                                if (data[i].status == 0 && ((nowTime.getTime() - createTime.getTime()) / 1000 / 60) < 30) {
                                    status = '等待付款';
                                } else if (data[i].status == 0 && ((nowTime.getTime() - createTime.getTime()) / 1000 / 60) >= 30) {
                                    status = '交易已关闭';
                                } else if (data[i].status == 1) {
                                    status = '等待审核';
                                } else if (data[i].status == 2) {
                                    status = '等待发货';
                                } else if (data[i].status == 3) {
                                    status = '已发货';
                                } else if (data[i].status == 4) {
                                    status = '已收货';
                                } else if (data[i].status == 5) {
                                    status = '已完成';
                                } else if (data[i].status == 6) {
                                    status = '已失败';
                                } else if (data[i].status == 7) {
                                    status = '已取消';
                                } else if (data[i].status == 8) {
                                    status = '已拒绝';
                                }

                                str += '<li title="' + status + '">' + status + '</li>';
                                str += '<li title="' + data[i].quantity + '">' + data[i].quantity + '</li>';
                                if (data[i].status == 0 && ((nowTime.getTime() - createTime.getTime()) / 1000 / 60) < 30) {
                                    str += '<li style="width: 50px" title="pay">  <a href="../order/rePay.jhtml?sn=' + data[i].sn + '" style="color:#00908c;">[支付]<a><li>';
                                } else {
                                    str += '<li style="width: 50px" title="detail">  <a href="javascript:void(0)" onclick="checkOrder('
                                    + data[i].id
                                    + ')"  style="color:#00908c;">[查看]<a><li>';
                                }

                                str += '</ul></li>';
                            }
                            $(".p-comment-page").show();
                        }
                        str += '<input type="hidden" name="pageNumber" id="orderPage" value="'
                        + data[0].totalPage + '">';
                        str += '</ul>';

                        $("#rightInfo").html(str);

                    }
                });
}

function pendingReviews(memberId, pageNumber, async) {
    $.ajax({
        type: "POST",
        url: "../review/pendingReviews.jhtml",
        async: async,
        data: {
            "memberId": memberId,
            "isReview": "false",
            "pageNumber": pageNumber
                    }, // 要发送的数据
                    dataType: "json",
                    success: function (data) {
                        pageCount = data[0].totalPage;
                        var str = '<ul><li class="n1"><ul><li>订单号</li><li style="width: 150px">商品图片</li><li>收件人</li><li>订单总额($)</li><li>状态</li><li>商品数量</li><li style="width: 50px">操作</li></ul></li>';
                        if (pageCount == 0) {
                            str += '<div class="no-flight-info" >';
                            str += '<img  src="/lanmeiairlines2.0/default/images/EN/no_data.png"/>';
                            str += '<p class="no-flight-info-tips">No data!</p >';
                            $(".p-comment-page").hide();
                        } else {
                            for (var i = 1; i < data.length; i++) {
                                str += '<li class="n2"><ul>';
                                str += '<li>' + data[i].sn + '</li>';
                                str += '<li style="width: 150px">';
                                str += '<a href="/goods/lmshopDetailPage/'
                                + data[i].oiId
                                + '.jhtml" target=_blank > <img src=" '
                                + data[i].orderItem.thumbnail
                                + '"></img><a>';
                                str += '</li>';
                                str += '<li>' + data[i].consignee + '</li>';
                                str += '<li>' + data[i].amount + '</li>';

                                var status = "";
                                if (data[i].status == 0) {
                                    status = 'No comment';
                                } else if (data[i].status == 1) {
                                    status = 'Commented';
                                }
                                str += '<li>' + status + '</li>';
                                str += '<li>' + data[i].quantity + '</li>';
                                str += '<li style="width: 50px"> ';
                                str += '<a class="addReview" data-goodsId="' + data[i].goodsId + '" data-orderItemId="' + data[i].orderItemId + '" href="javascript:void(0)" style="color:#00908c;">[add]<a><li>';
                                str += '</ul></li>'
                            }
                            $(".p-comment-page").show();
                        }
                        str += '<input type="hidden" name="pageNumber" id="reviewsPage" value="'
                        + data[0].totalPage + '">';
                        str += '</ul>';
                        $("#rightInfo").html(str);
                    }
                })
}

function reviewManagement(memberId, pageNumber, async) {
    $.ajax({
        type: "POST",
        url: "../review/reviewManagement.jhtml",
        async: async,
        data: {
            "memberId": memberId,
            "isReview": "true",
            "pageNumber": pageNumber
                    }, // 要发送的数据
                    dataType: "json",
                    success: function (data) {
                        pageCount = data[0].totalPage;
                        var str = '<ul><li class="n1"><ul><li style="width: 250px">内容</li><li style="width: 100px">商品图片</li><li style="width: 150px">商品名称</li><li>评价人</li><li style="width: 100px">操作</li></ul></li>';
                        if (pageCount == 0) {
                            str += '<div class="no-flight-info" >';
                            str += '<img  src="/lanmeiairlines2.0/default/images/EN/no_data.png"/>';
                            str += '<p class="no-flight-info-tips">No data!</p >';
                            $(".p-comment-page").hide();
                        } else {
                            for (var i = 1; i < data.length; i++) {
                                str += '<li class="n2"><ul>';
                                str += '<li style="width: 250px">' + data[i].reviewChild.content + '</li>';
                                str += '<li style="width: 100px">';
                                str += '<a href="/goods/lmshopDetailPage/'
                                + data[i].oiId
                                + '.jhtml" target=_blank > <img src=" '
                                + data[i].orderItem.thumbnail
                                + '"></img><a>';
                                str += '</li>';
                                str += '<li style="width: 150px">' + data[i].goodsName + '</li>';
                                str += '<li>' + data[i].reviewChild.member_name + '</li>';
                                str += '<li style="width: 100px"> ';
                                if (data[i].review.is_reply) {
                                    str += '<a class="reviewManagementSave" data-reviewId="' + data[i].reviewId + '" href="javascript:void(0)" style="color:#00908c;">[reply]</a>';
                                } else {
                                    str += '<a class="reviewManagementCheck" data-reviewId="' + data[i].reviewId + '" href="javascript:void(0)" style="color:#00908c;">[check]</a>';
                                }
                                str += '</li>';
                                str += '</ul></li>'
                            }
                            $(".p-comment-page").show();
                        }
                        str += '<input type="hidden" name="pageNumber" id="reviewManagementPage" value="'
                        + data[0].totalPage + '">';
                        str += '</ul>';
                        $("#rightInfo").html(str);
                    }
                })
}

            //订单评论
            function pendingReviews(memberId, pageNumber, async) {
                $.ajax({
                    type: "POST",
                    url: "../review/pendingReviews.jhtml",
                    async: async,
                    data: {
                        "memberId": memberId,
                        "isReview": "false",
                        "pageNumber": pageNumber
                    }, // 要发送的数据
                    dataType: "json",
                    success: function (data) {
                        pageCount = data[0].totalPage;
                        var str = '<ul><li class="n1"><ul><li>订单编号</li><li style="width: 150px">商品</li><li>用户</li><li>订单金额($)</li><li>状态</li><li>购买数量</li><li style="width: 50px">操作</li></ul></li>';
                        if (pageCount == 0) {
                            str += '<div class="no-flight-info" >';
                            str += '<img  src="/lanmeiairlines2.0/default/images/EN/no_data.png"/>';
                            str += '<p class="no-flight-info-tips">No data!</p >';
                            $(".p-comment-page").hide();
                        } else {
                            for (var i = 1; i < data.length; i++) {
                                str += '<li class="n2"><ul>';
                                str += '<li>' + data[i].sn + '</li>';
                                str += '<li style="width: 150px">';
                                str += '<a href="/goods/lmshopDetailPage/'
                                + data[i].oiId
                                + '.jhtml" target=_blank > <img src=" '
                                + data[i].orderItem.thumbnail
                                + '"></img><a>';
                                str += '</li>';
                                str += '<li>' + data[i].consignee + '</li>';
                                str += '<li>' + data[i].amount + '</li>';

                                var status = "";
                                if (data[i].status == 0) {
                                    status = 'No comment';
                                } else if (data[i].status == 1) {
                                    status = 'Commented';
                                }
                                str += '<li>' + status + '</li>';
                                str += '<li>' + data[i].quantity + '</li>';
                                str += '<li style="width: 50px"> ';
                                str += '<a class="addReview" data-goodsId="' + data[i].goodsId + '" data-orderItemId="' + data[i].orderItemId + '" href="javascript:void(0)" style="color:#00908c;">[add]<a><li>';
                                str += '</ul></li>'
                            }
                            $(".p-comment-page").show();
                        }
                        str += '<input type="hidden" name="pageNumber" id="reviewsPage" value="'
                        + data[0].totalPage + '">';
                        str += '</ul>';
                        $("#rightInfo").html(str);
                    }
                })
            }

            //评论管理
            function reviewManagement(memberId, pageNumber, async) {
                $.ajax({
                    type: "POST",
                    url: "../review/reviewManagement.jhtml",
                    async: async,
                    data: {
                        "memberId": memberId,
                        "isReview": "true",
                        "pageNumber": pageNumber
                    }, // 要发送的数据
                    dataType: "json",
                    success: function (data) {
                        pageCount = data[0].totalPage;
                        var str = '<ul><li class="n1"><ul><li style="width: 250px">内容</li><li style="width: 100px">商品</li><li style="width: 150px">商品名称</li><li>回复人</li><li style="width: 100px">操作</li></ul></li>';
                        if (pageCount == 0) {
                            str += '<div class="no-flight-info" >';
                            str += '<img  src="/lanmeiairlines2.0/default/images/EN/no_data.png"/>';
                            str += '<p class="no-flight-info-tips">No data!</p >';
                            $(".p-comment-page").hide();
                        } else {
                            for (var i = 1; i < data.length; i++) {
                                str += '<li class="n2"><ul>';
                                str += '<li style="width: 250px">' + data[i].reviewChild.content.substr(0, 20) + '...' + '</li>';
                                str += '<li style="width: 100px">';
                                str += '<a href="/goods/lmshopDetailPage/'
                                + data[i].oiId
                                + '.jhtml" target=_blank > <img src=" '
                                + data[i].orderItem.thumbnail
                                + '"></img><a>';
                                str += '</li>';
                                str += '<li style="width: 150px">' + data[i].goodsName + '</li>';
                                str += '<li>' + data[i].reviewChild.member_name + '</li>';
                                str += '<li style="width: 100px"> ';
                                if (!data[i].reviewChild.isreply) {
                                    str += '<a class="reviewManagementSave" data-reviewId="' + data[i].reviewId + '" href="javascript:void(0)" style="color:#00908c;">[回复]</a>';
                                } else {
                                    str += '<a class="reviewManagementCheck" data-reviewId="' + data[i].reviewId + '" href="javascript:void(0)" style="color:#00908c;">[查看]</a>';
                                }
                                str += '</li>';
                                str += '</ul></li>'
                            }
                            $(".p-comment-page").show();
                        }
                        str += '<input type="hidden" name="pageNumber" id="reviewManagementPage" value="'
                        + data[0].totalPage + '">';
                        str += '</ul>';
                        $("#rightInfo").html(str);
                    }
                })
            }


            // 逾重行李
            function myExcessBaggagePage(pageNumber) {
                $.ajax({
                    url: '../baggage/myBaggage.jhtml',
                    async: false,
                    type: "POST",
                    data: {
                        "pageNumber": pageNumber,
                        "language": "CN",
                    },
                    success: function (data) {
                        var str = '<ul><li class="n1"><ul><li>护照号 </li><li> 重量(kg)</li><li>价格(美元) </li><li>航班号</li><li>起飞时间</li><li>支付状态</li><li>订单号</li></ul></li>';
                        var list = data.bagggage.list;

                        for (var i = 0; i < list.length; i++) {
                            str += '<li class="n2"><ul>';

                            str += '<li>' + list[i].pass_port + '</li>';
                            str += '<li>' + list[i].kilograms + '</li>';
                            str += '<li>' + list[i].count + '</li>';
                            str += '<li>' + list[i].flight_No + '</li>';
                            str += '<li>' + list[i].fly_date + '</li>';

                            if (list[i].pay_status == 0) {
                                str += '<li><a href="../baggage/repay.jhtml?id=' + list[i].id + '&payType=' + list[i].pay_type + '" target=_blank>【未支付】</a></li>';
                            } else if (list[i].pay_status == 1) {
                                str += '<li>已支付</li>';
                            }

                            var orderId = list[i].order_id;
                            if (orderId != null && orderId.length > 8) {
                                orderId = orderId.substring(0, 8) + "..."
                            }
                            str += '<li title="' + list[i].order_id + '" >' + orderId + '</li>';
                            str += '</ul></li>'
                        }
                        str += '</ul>';

                        $(".p-comment-page").show();
                        str += '<input type="hidden" name="pageNumber" id="excessBaggagePage" value="' + data.totalPage + '">';
                        $("#rightInfo").html(str);
                    },
                    error: function () {
                        layer.open({
                            title: 'Prompt'
                            , content: 'Abnormal server,Please try again later!'
                        });
                    }
                });

            }

            // 我的餐食
            function myOnBoardMeals(pageNumber) {
                $.ajax({
                    url: '../onBoardMeals/myOnBoardMeals.jhtml',
                    async: false,
                    type: "POST",
                    data: {
                        "language": "CN"
                    },
                    success: function (data) {
                        var list = data.list;
                        var str = '<ul><li class="n1"><ul><li>航线</li><li >类型</li><li>单号</li><li>下单时间</li><li>状态</li><li>总金额</li><li>操作</li></ul></li>';
                        for (var i = 0; i < list.length; i++) {
                            var orderTime = list[i].orderTime
                            var ot = orderTime.substring(0, orderTime.indexOf(" "));
                            var flightDate = list[i].flight_date
                            var fd = flightDate.substring(0, flightDate.indexOf(" "));
                            var payment_state = list[i].payment_state
                            var invalid = list[i].invalid
                            var state = '';
                            if (invalid == 0) {
                                if (payment_state == '1') {
                                    state = '支付成功'
                                } else {
                                    state = '<a  href="../onBoardMeals/personalCenterPay.jhtml?passengerId=' + list[i].id + '&payType=' + list[i].payType + '&language=' + list[i].language + '"   style="color:red;" target="_blank" >[ 未支付 ]</a>';
                                }
                            } else {
                                state = '<span>已失效</span>'
                            }

                            str += '<li class="n2"><ul>';
                            str += '<li>' + list[i].flight_no + '</li>';
                            str += '<li>' + fd.replace(/-/g, "") + '</li>';
                            str += '<li>' + list[i].passport_no + '</li>';
                            str += '<li>' + ot.replace(/-/g, "") + '</li>';
                            str += '<li>' + state + '</li>';
                            if (list[i].currency_type == 0) {
                                str += '<li>$ ' + list[i].aggregateAmount + '</li>';
                            } else {
                                str += '<li>￥ ' + list[i].aggregateAmount + '</li>';
                            }
                            str += '<li><a class="onBoardMealsDetails" data-id="' + list[i].id + '" href="javascript:void(0)" style="color:#00908c;">[ 详情 ]</a></li>';
                            str += '</ul></li>'
                        }
                        str += '</ul>';

                        $(".p-comment-page").show();
                        str += '<input type="hidden" name="pageNumber" id="onBoardMealsPage" value="' + data.totalPage + '">';
                        $("#rightInfo").html(str);
                    },
                    error: function () {
                        layer.open({
                            title: 'Prompt'
                            , content: 'Abnormal server,Please try again later!'
                        });
                    }
                });

            }

            // 餐食订单详情 查看
            $('#rightInfo').on('click', '.onBoardMealsDetails', function () {
                var passengerId = $(this).attr("data-id");
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "../onBoardMeals/onBoardMealsDetails.jhtml",
                    data: {
                        "passengerId": passengerId
                    }, // 要发送的数据
                    dataType: "json",
                    success: function (data) {
                        var foodDetails = data.foodDetails;
                        var passenger = data.passenger;

                        var str = '';
                        str += '<div class="d1"><ul><li>订单号：' + passenger.order_number + '  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
                        var status = '';
                        if (passenger.invalid == 0) {

                            if (passenger.payment_state == 0) {
                                status = '<a  href="../onBoardMeals/personalCenterPay.jhtml?passengerId=' + passenger.id + '&payType=' + passenger.payment_type + '&language=' + passenger.language + '"   style="color:red;" target="_blank">[ 未支付 ]</a>';
                            } else if (passenger.payment_state == 1) {
                                status = '<span style="color:#00908c;"> 已支付 <span>';
                            }
                        } else {
                            status = '<span>已失效</span>'
                        }
                        var paymentType = '';
                        if (passenger.payment_type == 0) {
                            paymentType = '支付宝'
                        } else if (passenger.payment_type == 1) {
                            paymentType = 'PayPal'
                        }
                        var currencyType = ''
                        if (passenger.payment_currency_type == 0) {
                            currencyType = '$'
                        } else if (passenger.payment_currency_type == 1) {
                            currencyType = '￥'
                        }
                        str += '状态：&nbsp&nbsp&nbsp' + status;
                        str += '</font></li>';
                        str += '<br><li>尊敬的客户，祝您购餐愉快！</li></ul></div>';
                        str += '<br><div class="d2"><ul><li>创建日期：&nbsp' + passenger.order_time + '</li>';
                        // str += '<li>货币类型：&nbsp' + currencyType + '</li>';
                        str += '<li>支付方式：&nbsp' + paymentType + '</li>';
                        str += '<li>总价格(' + currencyType + ')：&nbsp' + data.statisticalAmount + '</li>';
                        str += '<br><div class="d4"><ul>';
                        str += '    <table style="width: 100%;border-collapse: collapse;margin-top: 30px;">';
                        str += '   <caption  style="font-size: 18px;color: #1a1a1a;text-align: left;font-weight: bold;border-left: 2px solid #8ec060;padding-left: 10px;margin-bottom:10px;">  餐食信息 ';
                        str += '   </caption>';
                        str += '       <thead>';
                        str += '       <tr style="color: #808080;font-size: 14px;">';
                        str += '      <th style="padding: 8px;">食物名称</th>';
                        str += '      <th style="padding: 8px;">冷/热</th>';
                        str += '      <th style="padding: 8px;"> 餐食单价</th>';
                        str += '       <th style="padding: 8px;">购买数量</th>';
                        str += '       </tr>';
                        str += '       </thead>';
                        str += '       <tbody>';
                        for (var i = 0; i < foodDetails.length; i++) {
                            var food = foodDetails[i];
                            str += '   <tr style="color: #666;font-size:14px;">';
                            str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + food.foodNameCn + '</th>';
                            if (food.hotOrCold == 0) {
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">冷</th> ';
                            } else {
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">热</th> ';
                            }
                            str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + food.preferentialPrice + '</th> ';
                            str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + food.foodCount + '</th>';
                            str += '   </tr>';
                        }
                        str += '     </tbody>';
                        str += '     </table>';

                        str += '</ul></div>';
                        $("#logonModal2 .rightInfo").html(str);
                    }
                })

$('#logonModal2').modal();
})


            // 我的 机+酒
            function myAirTicketsHotel(pageNumber) {
                $.ajax({
                    url: '../lmAircraftHotel/myAirTicketsHotel.jhtml',
                    async: false,
                    type: "POST",
                    data: {
                        "language": "CN"
                    },
                    success: function (data) {
                        var list = data.lmAhOrderDetailsList;
                        var str = '<ul><li class="n1"><ul><li>航班号</li><li >行程</li><li>类型</li><li>单号</li><li>总金额</li><li>支付状态</li><li>操作</li></ul></li>';
                        for (var i = 0; i < list.length; i++) {
                            var orderDetails = list[i];
                            str += '<li class="n2"><ul>';
                            str += '<li >' + orderDetails.flight_number + '</li>';
                            str += '<li >' + orderDetails.fromAirportCode + '/' + orderDetails.toAirportCode + '</li>';
                            if (orderDetails.strokeType == "OW") {
                                str += '<li> 单程 </li>';
                            } else if (orderDetails.strokeType == "RT") {
                                str += '<li> 往返 </li>';
                            }
                            str += '<li title="' + orderDetails.orderNo + '">' + orderDetails.orderNo + '</li>';
                            str += '<li>' + orderDetails.totalAmountPaid + '</li>';
                            var status = '';
                            if (orderDetails.paymentStatus == 1) {
                                status = '<span style="color:#00908c;"> 已支付 <span>';
                            } else {
                                if (data.min > 30) {
                                    status = '<span style="color:#00908c;"> 已失效<span>';
                                } else {
                                    status = '<a  href="../lmAircraftHotel/payByAircraftHotelPersonal.jhtml?id=' + orderDetails.id + '"   style="color:red;" target="_blank">[ 未支付 ]</a>';
                                }
                            }
                            str += '<li>' + status + '</li>';
                            str += '<li><a class="AhOrderDetails" data-id="' + list[i].id + '" href="javascript:void(0)" style="color:#00908c;">[ 详情 ]</a></li>';
                            str += '</ul></li>'
                        }
                        str += '</ul>';
                        $(".p-comment-page").show();
                        str += '<input type="hidden" name="pageNumber" id="myAirTicketsHotelPage" value="' + data.totalPage + '">';
                        $("#rightInfo").html(str);
                    },
                    error: function () {
                        layer.open({
                            title: 'Prompt'
                            , content: 'Abnormal server,Please try again later!'
                        });
                    }
                });
            }

            // 机+酒 订单详情 查看
            $('#rightInfo').on('click', '.AhOrderDetails', function () {
                var orderDetailId = $(this).attr("data-id");
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "../lmAircraftHotel/getAircraftHotelOrderDetail.jhtml",
                    data: {
                        "id": orderDetailId
                        }, // 要发送的数据
                        dataType: "json",
                        success: function (data) {
                            var orderDetail = data.orderDetail;
                            var min = data.min;
                            var str = '';
                            str += '<!--startprint-->';
                            str += '<div style="margin-bottom: 20px;"><img src="http://lanmeiairlines.com/lanmeiairlines/default/images/EN/lanmeiLogo.png"></div>';
                            str += '<h2 style="color:#1f2c5c;font-weight: bold;font-size:24px;text-align:center;padding-bottom:30px;">机票和酒店订单信息</h2>';
                            str += '<div class="d1"><ul><li>订单号：' + orderDetail.order_number + '  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
                            var status = '';
                            if (orderDetail.payment_state == 1) {
                                status = '<span style="color:#00908c;"> 已支付 <span>';
                            } else {
                                if (min > 30) {
                                    status = '<span style="color:#00908c;"> 已失效<span>';
                                } else {
                                    status = '<a  href="../lmAircraftHotel/payByAircraftHotelPersonal.jhtml?id=' + orderDetails.id + '"   style="color:red;" target="_blank">[ 未支付 ]</a>';
                                    rightInfo                      }
                                }
                                var paymentType = '';
                                if (orderDetail.payment_type == 0) {
                                    paymentType = '支付宝'
                                } else if (orderDetail.payment_type == 1) {
                                    paymentType = 'PayPal'
                                }
                                str += '创建日期：&nbsp&nbsp&nbsp' + orderDetail.order_time + ' &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
                                str += '状态：&nbsp&nbsp&nbsp' + status
                                str += '</li>';
                                str += '<br><li>尊敬的客户，祝您旅途愉快！</li></ul></div>';
                                str += '<div class="d2"><ul><li>'
                                if (orderDetail.payment_status == 1) {
                                    str += ' 支付流水号： &nbsp' + orderDetail.payment_numberp + ' &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
                                    str += ' 支付日期：&nbsp' + orderDetail.payment_time + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
                                // str += '<li>货币类型：&nbsp' + currencyType + '</li>';
                                str += '支付方式：&nbsp' + paymentType + ' &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
                                str += '总价格($)：&nbsp' + orderDetail.total_amount_paid + '</li>';
                            }
                            str += '<div class="d4"><ul>';
                            str += '    <table style="width: 100%;border-collapse: collapse;margin-top: 10px;">';
                            str += '   <caption  style="font-size: 18px;color: #1a1a1a;text-align: left;font-weight: bold;border-left: 2px solid #8ec060;padding-left: 10px;margin-bottom:10px;">  航线信息 ';
                            str += '   </caption>';
                            str += '       <thead>';
                            str += '       <tr style="color: #666;font-size: 14px;">';
                            str += '      <th style="padding: 8px;">航班号</th>';
                            str += '      <th style="padding: 8px;">航线</th>';
                            str += '      <th style="padding: 8px;"> 规则</th>';
                            str += '       <th style="padding: 8px;">起飞时间</th>';
                            str += '       <th style="padding: 8px;">到达时间</th>';
                            str += '       </tr>';
                            str += '       </thead>';
                            str += '       <tbody>';
                            var lmAhRouteList = data.lmAhRouteList;
                            for (var i = 0; i < lmAhRouteList.length; i++) {
                                var lmAhRoute = lmAhRouteList[i];
                                str += '   <tr style="color: #666;font-size:14px;">';
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + lmAhRoute.flightNumber + '</th>';
                                var routeStr = lmAhRoute.fromRouteCity + '(' + lmAhRoute.fromRouteAirport + ')--' + lmAhRoute.toRouteCity + '(' + lmAhRoute.toRouteAirport + ')';
                                var routeCityStr = lmAhRoute.fromRouteCity + '--' + lmAhRoute.toRouteCity;
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;"> <span title="' + routeStr + '">' + routeCityStr + '</span></th> ';
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;"> <a href="javascript:;">退改签</a></th>';
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + lmAhRoute.DT + '</th>';
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + lmAhRoute.MT + '</th>';
                                str += '   </tr>';
                            }
                            str += '     </tbody>';
                            str += '     </table>';
                            str += '</ul></div>';
                            str += '<br><div class="d4"><ul>';
                            str += '    <table style="width: 100%;border-collapse: collapse;margin-top: 10px;">';
                            str += '   <caption  style="font-size: 18px;color: #1a1a1a;text-align: left;font-weight: bold;border-left: 2px solid #8ec060;padding-left: 10px;margin-bottom:10px;">  酒店信息 ';
                            str += '   </caption>';
                            str += '       <tbody>';
                            str += '   <tr style="color: #666;font-size:14px;">';
                            str += '   <th style="border-bottom: 1px solid #ddd;padding: 8px;">酒店：' + data.hotelNameCn + '</th>';
                            str += '   <th style="border-bottom: 1px solid #ddd;padding: 8px;">房型：' + data.roomTypeNameCn + '</th> ';
                            str += '   <th style="border-bottom: 1px solid #ddd;padding: 8px;">详情：' + '</th>';
                            str += '   </tr>';
                            str += '   <tr style="color: #666;font-size:14px;">';
                            str += '   <th style="border-bottom: 1px solid #ddd;padding: 8px;">房间数：' + data.adultNum + '</th>';
                            str += '   <th style="border-bottom: 1px solid #ddd;padding: 8px;">成人数：' + data.adultNum + '</th>';
                            str += '   <th style="border-bottom: 1px solid #ddd;padding: 8px;">儿童数：' + data.childNum + '</th>';
                            str += '   </tr>';
                            str += '   <tr style="color: #666;font-size:14px;">';
                            str += '   <th style="border-bottom: 1px solid #ddd;padding: 8px;">入住城市：' + data.cityNameCn + '</th>';
                            str += '   <th style="border-bottom: 1px solid #ddd;padding: 8px;">入住时间' + data.startHotelDate + '</th>';
                            str += '   <th style="border-bottom: 1px solid #ddd;padding: 8px;">离店日期：' + data.endHotelDate + '</th>';
                            str += '   </tr>';
                            str += '     </tbody>';
                            str += '     </table>';
                            str += '</ul></div>';
                            str += '<br><div class="d4"><ul>';
                            str += '    <table style="width: 100%;border-collapse: collapse;margin-top: 10px;">';
                            str += '   <caption  style="font-size: 18px;color: #1a1a1a;text-align: left;font-weight: bold;border-left: 2px solid #8ec060;padding-left: 10px;margin-bottom:10px;">  乘客信息 ';
                            str += '   </caption>';
                            str += '       <thead>';
                            str += '       <tr style="color: #666;font-size: 14px;">';
                            str += '      <th style="padding: 8px;">名字</th>';
                            str += '      <th style="padding: 8px;">护照号</th>';
                            str += '      <th style="padding: 8px;"> 性别</th>';
                            // str += '      <th style="padding: 8px;"> 国籍</th>';
                            str += '       <th style="padding: 8px;">出身日期</th>';
                            str += '       <th style="padding: 8px;">护照有效期</th>';
                            str += '       <th style="padding: 8px;">联系邮箱</th>';
                            str += '       <th style="padding: 8px;">票号</th>';
                            str += '       </tr>';
                            str += '       </thead>';
                            str += '       <tbody>';
                            var passengerInfoList = data.passengerInfoList;
                            for (var i = 0; i < passengerInfoList.length; i++) {
                                var passenger = passengerInfoList[i];
                                str += '   <tr style="color: #666;font-size:14px;">';
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + passenger.purchaser_name + '</th>';
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + passenger.passport_number + '</th> ';
                                var gender = '男';
                                if (passenger.gender == 0) {
                                    gender = '女';
                                }
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + gender + '</th>';
                                // str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + gender + '</th>';
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + passenger.birthday + '</th>';
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + passenger.passport_expiry_date + '</th>';
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + passenger.passenger_email + '</th>';
                                var ticket_number = ''
                                if (ticket_number != null) {
                                    ticket_number = passenger.ticket_number
                                }
                                str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + ticket_number + '</th>';
                                str += '   </tr>';
                            }
                            str += '     </tbody>';
                            str += '     </table>';
                            str += '</ul></div>';
                            str += '<br><div class="d4"><ul>';
                            str += '    <table style="width: 100%;border-collapse: collapse;margin-top: 10px;">';
                            str += '   <caption  style="font-size: 18px;color: #1a1a1a;text-align: left;font-weight: bold;border-left: 2px solid #8ec060;padding-left: 10px;margin-bottom:10px;">  联系人信息 ';
                            str += '   </caption>';
                            str += '       <thead>';
                            str += '       <tr style="color: #666;font-size: 14px;">';
                            str += '      <th style="padding: 8px;">姓名</th>';
                            str += '      <th style="padding: 8px;">手机号</th>';
                            str += '      <th style="padding: 8px;"> 邮箱</th>';
                            str += '       </tr>';
                            str += '       </thead>';
                            str += '       <tbody>';
                            str += '   <tr style="color: #666;font-size: 14px;"><th style="border-top: 1px solid #ddd;padding: 8px;">' + orderDetail.contact_name + '</th>';
                            str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + orderDetail.contact_phone + '</th>';
                            str += '   <th style="border-top: 1px solid #ddd;padding: 8px;">' + orderDetail.contact_email + '</th>';
                            str += '   </tr>';
                            str += '     </tbody>';
                            str += '     </table>';
                            str += '</ul></div>';
                            str += '<div style="padding-top: 30px;overflow: hidden;"><div style="float:right;width:120px;text-align: center;"><img src="http://lanmeiairlines.com/lanmeiairlines/default/images/EN/QR-official.png" style="width:100px;height:100px;"><p style="font-size:12px;color:#808080;font-weight: bold;margin:0;">微信公众号</p></div><div style="float:right;width:120px;text-align: center;"><img src="http://lanmeiairlines.com/lanmeiairlines/default/images/EN/lanmei_QR_en.png" style="width:100px;height:100px;"><p style="font-size:12px;color:#808080;font-weight: bold;margin:0;">澜湄官网</p></div></div>';
                            str += '<!--endprint-->';
                            str += '<div style="text-align: center;margin-top: 30px;"><button class="print-btn" onclick="doPrint()">打印</button></div>';
                            $("#logonModal2 .rightInfo").html(str);
                        }
                    })
$('#logonModal2').modal();
}
)
var date = new Date();
var seperator1 = "-";
var seperator2 = ":";
var month = date.getMonth() + 1;
var strDate = date.getDate();
if (month >= 1 && month <= 9) {
    month = "0" + month;
}
if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
}
var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
+ " " + date.getHours() + seperator2 + date.getMinutes()
+ seperator2 + date.getSeconds();

            // 我的足迹 / 我的草稿
            function travels(status, sort, pageNumber) {  // status 游客是否发布 ；  sort 排列循序 ；

                var d1 = new Date(currentdate);

                $.ajax({
                    type: "post",
                    url: "../travel/myTravels.jhtml",
                    async: false,
                    data: {
                        "status": status, // 1:我的足迹 ；0:我的草稿箱
                        "sort": sort,
                        "language": "CN",
                        "pageNumber": pageNumber
                    }, // 要发送的数据
                    dataType: "json",
                    success: function (data) {
                        $('#cityId_LMTravel').val(data.cityId);
                        /* 游记列表 */
                        var travelsList = data.travelPage;
                        pageCount = travelsList.totalPage;
                        var str = '<div class="myTravel-wrapper">';
                        str += '<ul class="myTravel" >';
                        if (pageCount == 0) {
                            str += '<div class="no-flight-info" >';
                            str += '<img  src="/lanmeiairlines2.0/default/images/EN/no_data.png"/>';
                            str += '<p class="no-flight-info-tips">No data!</p >';
                            $(".p-comment-page").hide();
                        } else {
                            $(".p-comment-page").show();
                            for (var i = 0; i < travelsList.list.length; i++) {
                                var travle = travelsList.list[i];
                                var avatar = travle.member.avatar; // 会员头像
                                if (avatar == null) {
                                    avatar = "/lanmeiairlines2.0/default/images/EN/default-avatar.png";
                                }

                                if (status == 1) { //  我的足迹
                                    str += '<li class="footprint" data-footprint_travelId="' + travle.id + '">';
                                    str += '    <h2>' + travle.title + '</h2> ';
                                    str += '	<img src=' + travle.squarecover + '> ';
                                    str += '	<p> ';
                                    str += '	   <img src="/lanmeiairlines2.0/default/travel/images/EN/m-s5-local.png" class="m-s5-local">';
                                    str += '		<span class="s1">' + travle.city_cn + '</span>';
                                    str += '		<img src="/lanmeiairlines2.0/default/travel/images/EN/m-s5-see.png" class="m-s5-see">';
                                    str += '		<span class="s2">' + travle.browse + '</span>';
                                    str += '	</p>';
                                    str += '	<p class="editor-icon">';
                                    str += ' <a href="javascript:void()" class="diary-cancelPublish" title="取消发布"><img src="/lanmeiairlines2.0/default/travel/images/CN/travel_cancelTheRelease.png"></a>';
                                    str += ' </p>';

                                    var d2 = new Date(travle.modify_date);// 修改时间

                                    //console.log(parseInt(d1 - d2)/(1000*3600*24));//两个时间相差的天数
                                    var timeDifference = (d1 - d2) / (1000 * 3600);
                                    if (travle.status == 1 && travle.state == 1) {
                                        str += ' <p class="public-tips"><img src="/lanmeiairlines2.0/default/travel/images/CN/public-icon.png"><span>审批成功！</span></p>';
                                    }
                                    if (travle.status == 1 && travle.state != 1 && timeDifference < 48) {
                                        str += ' <p class="public-tips"><img src="/lanmeiairlines2.0/default/travel/images/CN/examine-icon.png"><span>待审批...</span></p>';
                                    }

                                    if (travle.status == 1 && travle.state != 1 && timeDifference > 48) {
                                        str += ' <p class="public-tips"><img src="/lanmeiairlines2.0/default/travel/images/CN/examine-fail-icon.png"><span>审批失败！!</span></p>';
                                    }


                                    str += '</li>';
                                } else if (status == 0) {  // 我的草稿
                                    str += '<li class="draft" data-travelid="' + travle.id + '">';
                                    str += '	<h2>' + travle.title + '</h2> ';
                                    if (travle.squarecover == null || travle.squarecover == 'null' || travle.squarecover == '') {
                                        str += '	<img src="/lanmeiairlines2.0/default/images/CN/230defaultcover.jpg"> ';
                                    } else {
                                        str += '	<img src=' + travle.squarecover + '> ';
                                    }
                                    str += '	<p>';
                                    str += '		<img src="/lanmeiairlines2.0/default/travel/images/EN/m-s5-local.png" class="m-s5-local">';
                                    str += '		<span class="s1">' + travle.city_cn + '</span>';
                                    str += '	</p>';
                                    str += '	<p class="editor-icon">';
                                    str += '       <a href="javascript:void()" class="diary-d-edit" title="编辑游记"><img src="/lanmeiairlines2.0/default/travel/images/CN/travel_travelEditor.png"></a>';
                                    str += '       <a href="javascript:void()" class="diary-diaryDelet" title="删除"><img src="/lanmeiairlines2.0/default/travel/images/EN/m-s5-delete.png"></a>';
                                    str += '    </p>';
                                    str += '</li>';
                                }
                            }
                            if (status == 1) {
                                str += '<input type="hidden" name="pageNumber" id="travelTrack" value="'
                                + pageCount + '">';
                            } else if (status == 0) {
                                str += '<input type="hidden" name="pageNumber" id="travelDraft" value="'
                                + pageCount + '">';
                            }
                            str += '</ul>';
                            str += '</div>';
                        }
                        $('#rightInfo').html(str);
                    }
                })
}

            //我的收藏
            function myTravelShouc(sort, pageNumber) {
                $.ajax({
                    type: "post",
                    url: "../travel/myTravelShouc.jhtml",
                    async: false,
                    data: {
                        "sort": sort,   //sort 排列循序 ；
                        "language": "CN",
                        "pageNumber": pageNumber
                    }, // 要发送的数据
                    dataType: "json",
                    success: function (data) {
                        $('#cityId_LMTravel').val(data.cityId);
                        /* 游记列表 */
                        var str = '<div class="myTravel-wrapper">';
                        str += '<ul class="myTravel" >';
                        if (data.MESSAGE == 'ERROR') {
                            str += '<div class="no-flight-info" >';
                            str += '<img  src="/lanmeiairlines2.0/default/images/EN/no_data.png"/>';
                            str += '<p class="no-flight-info-tips">No data!</p >';
                            $(".p-comment-page").hide();
                        } else if (data.MESSAGE == 'SUCCESS') {
                            var travelsList = data.travelPage;
                            pageCount = travelsList.totalPage;
                            $(".p-comment-page").show();
                            for (var i = 0; i < travelsList.list.length; i++) {
                                var travle = travelsList.list[i];
                                var avatar = travle.member.avatar; // 会员头像
                                if (avatar == null) {
                                    avatar = "/lanmeiairlines2.0/default/images/EN/default-avatar.png";
                                }
                                str += '	<li data-travelid=' + travle.id + '>';
                                str += '<input type="hidden" name="pageNumber" id="travelShouc" value="' + pageCount + '">';
                                str += '        <input hidden name="travelId" value="' + travle.id + '"> ';
                                str += '		<h2>' + travle.title + '</h2>';
                                str += '		<img src=' + travle.cover + '> ';
                                str += '		<p>';
                                str += '			<img  src="/lanmeiairlines2.0/default/travel/images/EN/m-s5-local.png" class="m-s5-local">';
                                str += '			<span class="s1">' + travle.city_cn + '</span>';
                                str += '			<img src="/lanmeiairlines2.0/default/travel/images/EN/m-s5-see.png" class="m-s5-see">';
                                str += '			<span class="s2">' + travle.browse + '</span>';
                                str += '		</p>';
                                str += '	<p class="editor-icon"> </p>';
                                str += '      <a href="javascript:void()" class="diary-cancelCollection" title="取消收藏"><img src="/lanmeiairlines2.0/default/travel/images/EN/diary-star.png"></a>';
                                str += '    </p>';
                                str += '	</li>';
                            }
                            str += '</ul>';
                            str += '</div> '
                        }
                        $('#rightInfo').html(str);
                    }
                })
            }

            //旅游计划
            function travelPlanPage(pageNumber, async) {
                $.ajax({
                    type: "POST",
                    url: "../travel/memberTravelPlan.jhtml",
                    async: async,
                    data: {
                        "pageNumber": pageNumber
                    }, // 要发送的数据
                    dataType: "json",
                    success: function (data) {
                        pageCount = data.pageMap.totalPage;
                        var list = data.pageMap.list;

                        // 判断是否存在已使用的路线（结束时间小于当前时间），提示...
                        for (var i = 0; i < list.length; i++) {
                            if (currentdate > list[i].end_time) {
                                //console.log('进来了 ！');
                                layer.msg('有已使用路线，请前往编辑游记。', {
                                    icon: 6
                                    , closeBtn: 1
                                    , title: '提示'
                                }, function (index) {
                                });
                                break;
                            }

                        }
                        var str = '<div class="myTravel-wrapper">';
                        str += '<ul class="myTravel" >';
                        if (pageCount == 0) {
                            str += '<div class="no-flight-info" >';
                            str += '<img  src="/lanmeiairlines2.0/default/images/EN/no_data.png"/>';
                            str += '<p class="no-flight-info-tips">No data!</p >';
                            $(".p-comment-page").hide();
                        } else {
                            $(".p-comment-page").show();
                            for (var i = 0; i < list.length; i++) {
                                //	                var travle = travelsList.list[i];
                                /* var avatar = travle.member.avatar; // 会员头像
                                if (avatar == null) {
                                    avatar = "/lanmeiairlines/default/images/EN/default-avatar.png";
                                }*/
                                str += '	<li class="plan" data-planid="' + list[i].id + '">';
                                str += '		<h2>' + list[i].title + '</h2>';
                                str += '		<img src=' + list[i].pic_url + '> ';
                                str += '		<p>';
                                str += '			<img  src="/lanmeiairlines2.0/default/travel/images/EN/m-s5-local.png" class="m-s5-local">';
                                str += '			<span class="s1">' + list[i].city_cn + '</span>';
                                str += '		</p>';
                                str += '     <p class="editor-icon">';
                                str += '	   <a href="javascript:void()" class="diary-planEdit" title="编辑路线"><img src="/lanmeiairline2.0s/default/travel/images/EN/travel_routeEditor.png"></a>';
                                str += '	   <a href="javascript:void()" class="diary-p-edit" title="编辑游记"><img src="/lanmeiairlines2.0/default/travel/images/EN/travel_travelEditor.png"></a>';
                                str += '       <a href="javascript:void()" class="diary-planDelet" title="删除"><img src="/lanmeiairlines2.0/default/travel/images/EN/m-s5-delete.png"></a>';
                                str += '	 </p>';
                                str += '	</li>';
                            }
                            str += '<input type="hidden" name="pageNumber" id="travelPlanPage" value="'
                            + pageCount + '">';
                        }
                        str += '</ul>';
                        str += '</div> '
                        $("#rightInfo").html(str);
                    }
                })
            }

            if ($("#review1").val() != null && $("#review1").val() == 1) {
                pendingReviews($("#memberId").val(), 1, false);
                $(".n3").addClass('active').siblings('li').removeClass('active');

            } else if ($("#reviewChild1").val() != null && $("#reviewChild1").val() == 1) {
                reviewManagement($("#memberId").val(), 1, false);
                $(".n4").addClass('active').siblings('li').removeClass('active');
            }
            else if ($("#travel").val() != null && $("#travel").val() != '') {
                $('.js-myTravel').addClass('active').siblings('li').removeClass('active');
                $('.js-myTravel').find('.travle-menu').slideToggle();
                switch ($("#travel").val()) {
                    case "Tracks"  :
                    $("#myDiary-wrapper").addClass("active");
                    travels(1, 'create_date', 1);
                    break;
                    case "Journey" :
                    $("#myJourney-wrapper").addClass("active");
                    travelPlanPage(1, false);
                    break;
                    case "Drafts"  :
                    $("#myDrafts-wrapper").addClass("active");
                    travels(0, 'create_date', 1);
                    break;
                    case "Favorite":
                    $("#myFavorite-wrapper").addClass("active");
                    myTravelShouc("create_date", 1);
                    break;
                }
            } else if ($('#info').val() != null && $('#info').val() != '') {
			// reviewManagement($("#memberId").val(), 1, false);
			// $(".n4").addClass('active').siblings('li').removeClass('active');
            ticketOrderAppen();
            $('.p-comment-page').hide();
        } else if ($('#coupon').val() != null && $('#coupon').val() != '') {
			// reviewManagement($("#memberId").val(), 1, false);
            myCoupon($("#memberId").val(), 1, false);
            $(".n1").addClass('active').siblings('li').removeClass('active');
        } else if ($('#order').val() != null && $('#order').val() != '') {
			// reviewManagement($("#memberId").val(), 1, false);
            findOrderPage($("#memberId").val(), 10, 1, false);
            $(".n2").addClass('active').siblings('li').removeClass('active');
        } else {
            ticketOrderAppen();
            $('.p-comment-page').hide();
			// myCoupon($("#memberId").val(), 1, false); // 初始化
        }

            // 分页调用
            var selectPage = function () {
                $(".p-comment-page").createPage({
                    pageCount: pageCount, // 显示页数量
                    current: 1, // 当前页
                    previous: '上一页', // 上一页
                    next: '下一页', // 下一页
                    backFn: function (p) { // 回调函数

                        var memberId = $("#memberId").val();
                        var status = 10;

                        if ($("#couponPage").val() != null) {
                            myCoupon(memberId, p, false)
                        } else if ($("#orderPage").val() != null) {
                            findOrderPage(memberId, status, p, false);
                        } else if ($("#reviewsPage").val() != null) {
                            pendingReviews(memberId, p, false);
                        } else if ($("#reviewManagementPage").val() != null) {
                            reviewManagement(memberId, p, false);
                        } else if ($("#travelPlanPage").val() != null) {
                            travelPlanPage(p, false);
                        } else if ($("#travelTrack").val() != null) {
                            travels(1, 'create_date', p);
                        } else if ($("#travelDraft").val() != null) {
                            travels(0, 'create_date', p);
                        } else if ($("#travelShouc").val() != null) {
                            myTravelShouc("create_date", p);
                        } else if ($("#excessBaggagePage").val() != null) {
                            myExcessBaggagePage(p);
                        } else if ($("#onBoardMealsPage").val() != null) {
                            myOnBoardMeals(p);
                        } else if ($("#myAirTicketsHotelPage").val() != null) {
                            myAirTicketsHotel(p);
                        }


                    }
                });
            }
            selectPage();

            $('.infoContent .n1 a').click(function () {
                myCoupon($("#memberId").val(), 1, false);
                selectPage();
            });

            $('.infoContent .n2 a').click(function () {
                findOrderPage($("#memberId").val(), 10, 1, false);
                selectPage();
            });

            $('.infoContent .n3 a').click(function () {
                pendingReviews($("#memberId").val(), 1, false);
                selectPage();
            });

            $('.infoContent .n4 a').click(function () {
                reviewManagement($("#memberId").val(), 1, false);
                selectPage();
            });

            //机票详情
            $('.infoContent .n5 a').click(function () {
                ticketOrderAppen();
                $('.p-comment-page').hide();
            });

            // 逾重行李
            $('.infoContent .n7 a').click(function () {
                myExcessBaggagePage(1);
			// $('.p-comment-page').hide();
        });

            // 餐食
            $('.infoContent .n8 a').click(function () {
                myOnBoardMeals(1);
                selectPage();
            });
            // 机 + 酒
            $('.infoContent .n9 a').click(function () {
                myAirTicketsHotel(1);
                selectPage();
            });

            // 常旅客管理
            $('.infoContent .lm-passManagement a').click(function () {
                passManagement();
                $('.p-comment-page').hide();
            });

            // 澜湄汇会员
            $('.infoContent .lm-coin a,.js-member-detail').click(function () {
                lanmeiMember();
                $('.p-comment-page').hide();
            });
            //下载会员卡片
            $(document).on('click','.js-member-download',function(){
            	var level = $('.js-card-lever').val();
            	var num = $('.js-card-num').val();
            	$.ajax({
            		url:"/member/downCard.jhtml",
            		type:"POST",
            		data:{
            			"memberNum":num,
            			"rank":level
            		},
            		dataType:"json",
            		success:function(data){
            			console.log(data);
            		}
            	});
            });
            //会员详情
            $('.js-member-detail').click(function(event) {
                $('.infoContent .lm-coin a').click();
            });

            // 我的足迹
            $('#myDiary-wrapper').click(function () {
                travels(1, 'create_date', 1);
                selectPage();
            })

            // 我的草稿
            $('#myDrafts-wrapper').click(function () {
                travels(0, 'create_date', 1);
                selectPage();
            })

            //我的旅游计划
            $('#myJourney-wrapper').click(function () {
                travelPlanPage(1, false);
                selectPage();
            });

            //我的收藏
            $('#myFavorite-wrapper').click(function () {
                myTravelShouc("create_date", 1);
                selectPage();
            })

            $('#rightInfo').on('click', '.addReview', function () {
                var html = '';
                html += '<input type="hidden" id="r_orderItemId" name="orderItemId" value="' + $(this).attr("data-orderItemId") + '"/>';
                html += '<input type="hidden" id="r_goodsId" name="goodsId" value="' + $(this).attr("data-goodsId") + '" />';
                html += '<input type="hidden" id="r_centerType" name="r_centerType" value="' + $("#centerType").val() + '" />';
                $("#r_orderItemId").remove();
                $("#r_goodsId").remove();
                $("#r_centerType").remove();
                $('#reviewForm').append(html);
                $('#reviewModal2').modal();
            });

            $('#rightInfo').on('click', '.reviewManagementSave', function () {
                var html = '<input type="hidden" id="reviewId" name="reviewId" value="' + $(this).attr("data-reviewId") + '" />';
                html += '<input type="hidden" id="rc_centerType" name="rc_centerType" value="' + $("#centerType").val() + '" />';
                $("#reviewId").remove();
                $("#rc_centerType").remove();
                $('#reviewManagementForm').append(html);
                $('#reviewManagementModel').modal();
            });

            $('#rightInfo').on('click', '.reviewManagementCheck', function () {
                var reviewId = $('.reviewManagementCheck').attr("data-reviewId");
                var html = '';
                $.ajax({
                    type: "POST",
                    url: "../review/reviewChildCheck.jhtml",
                    async: false,
                    data: {
                        "reviewId": reviewId,
                    },
                    dataType: "json",
                    success: function (data) {
                        html = $('<table>');
                        $.each(data, function (i, v) {
                            $(html).append('<tr><td align="right">' + v.member_name + '：</td><td>' + v.content + '</td><tr>');
                        });
                        $('.rcheck').html(html);
                        $('#rmCheckModal').modal();
                    }

                });
            });

            $("#reviewBtn").click(function () {
                $("#reviewForm").submit();
            });

            $("#reviewManagementBtn").click(function () {
                var html = '<a class="reviewManagementCheck" data-reviewId="' + $('#reviewId').val() + '" href="javascript:void(0)" style="color:#00908c;">[check]</a>';
                $(".reviewManagementSave").parent().html(html);
                $("#reviewManagementForm").submit();
            });

            //跳转旅游计划编辑
            $('#rightInfo').on('click', '.diary-planEdit', function () {
                var travelId = $(this).parent().parent().attr("data-planid");
                window.open("../travel/travelPlanning.jhtml?travelId=" + travelId + "&source=1");
            });

            //跳转旅游游记编辑
            $('#rightInfo').on('click', '.diary-p-edit', function () {
                var travelId = $(this).parent().parent().attr("data-planid");
                window.open("../travel/travelPlanning.jhtml?travelId=" + travelId + "&type=diary&source=1");
            });

            //跳转旅游游记编辑
            $('#rightInfo').on('click', '.diary-d-edit', function () {
                var travelId = $(this).parent().parent().attr("data-travelid");
                window.open("../travel/travelPlanning.jhtml?travelId=" + travelId + "&type=diary&source=1");
            });

            //删除旅游计划
            $('#rightInfo').on('click', '.diary-planDelet', function () {
                var travelId = $(this).parent().parent().attr("data-planid");
                layer.confirm('确定要删除吗?', {icon: 3, title: '提示'}, function (index) {
                    travelDelete(travelId, "journey");

                    layer.close(index);
                });
            });

            //删除旅游游记草稿
            $('#rightInfo').on('click', '.diary-diaryDelet', function () {
                var travelId = $(this).parent().parent().attr("data-travelid");
                layer.confirm('确定要删除吗?', {icon: 3, title: '提示'}, function (index) {
                    travelDelete(travelId, "drafts");

                    layer.close(index);
                });

            });

            function travelDelete(travelId, type) {
                $.ajax({
                    type: "POST",
                    url: "../travel/travelDelete.jhtml",
                    data: {
                        "travelId": travelId,
                        "type": type
                    }, // 要发送的数据
                    dataType: "json",
                    success: function (data) {
                        if (data.MESSAGE == 'SUCCESS') {
                            if (type == "journey") {
                                layer.msg("Delete Success", {time: 1000});
                                travelPlanPage(1, false);
                            } else if (type == "drafts") {
                                layer.msg("Delete Success", {time: 1000});
                                travels(0, 'create_date', 1); //0表示草稿
                            }
                        } else if (data.MESSAGE == 'ERROR') {
                            layer.msg("Delete Failure", {time: 1000});
                        }
                    }
                });
            }

            //取消收藏
            $('#rightInfo').on('click', '.diary-cancelCollection', function () {
                var travelId = $(this).parent().attr("data-travelid");
                layer.confirm('确定要取消吗?', {icon: 3, title: '提示'}, function (index) {
                    travelCancel(travelId, "collection");

                    layer.close(index);
                });
            });

            //取消发布
            $('#rightInfo').on('click', '.diary-cancelPublish', function () {
                var travelId = $(this).parent().parent().attr("data-footprint_travelid");
                layer.confirm('确定要取消吗?', {icon: 3, title: '提示'}, function (index) {
                    travelCancel(travelId, "publish");

                    layer.close(index);
                });
            });

            function travelCancel(travelId, type) {
                $.ajax({
                    type: "POST",
                    url: "../travel/travelCancel.jhtml",
                    data: {
                        "travelId": travelId,
                        "type": type
                    }, // 要发送的数据
                    dataType: "json",
                    success: function (data) {
                        if (data.MESSAGE == 'SUCCESS') {
                            layer.msg("Cancel Success", {time: 1000});
//								myTravelShouc("create_date",1);
} else if (data.MESSAGE == 'ERROR') {
    layer.msg("Cancel Failure", {time: 1000});
} else if (data.MESSAGE == 'UserNull') {
    layer.alert("please log in again");
}
}
});
            }
        },
    }
    ;

    $(document).ready(function ($) {
        LanmeiAirlinesPersonalCenter.init();

    });

    var memberId = $("#memberId").val();

// findOrderPage(memberId);

// 分页id （当前所在页数）
var $pageNumber = $("#pageNumber");

// 订单 查看
function checkOrder(orderId) {
    $.ajax({
        type: "POST",
        url: "../order/checkOrder.jhtml",
        data: {
            "orderId": orderId
        }, // 要发送的数据
        dataType: "json",
        success: function (data) {
            var str = '';
            str += '<div class="d1"><ul><li>Code：'
            + data[0].sn
            + '  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
            var status = '';
            if (data[0].status == 0) {
                status = '等待付款';
            } else if (data[0].status == 1) {
                status = '等待审核';
            } else if (data[0].status == 2) {
                status = '等待发货';
            } else if (data[0].status == 3) {
                status = '已发货';
            } else if (data[0].status == 4) {
                status = '已收货';
            } else if (data[0].status == 5) {
                status = '已完成';
            } else if (data[0].status == 6) {
                status = '已失败';
            } else if (data[0].status == 7) {
                status = '已取消';
            } else if (data[0].status == 8) {
                status = '已拒绝';
            }

            str += '状态：&nbsp&nbsp&nbsp<font color="red">' + status;
            str += '</font></li>';
            str += '<br><li>尊敬的客户，祝您购物愉快！</li></ul></div>';
            str += '<br><div class="d2"><ul><li>创建日期：&nbsp'
            + data[0].create_date + '</li>';
            str += '<li>支付方式：&nbsp' + data[0].PaymentMethodName
            + '</li>';
            str += '<li>配送方式：&nbsp' + data[0].shippingMethodMame
            + '</li>';
            str += '<li>商品价格($)：&nbsp' + data[0].price + '</li>';
            str += '<li>订单金额($)：&nbsp' + data[0].amount + '</li>';
            str += '<li>赠送积分：&nbsp' + data[0].rewardPoint + '</li>';
            str += '<li>附言：</li></ul></div>';

            str += '<br><div class="d3"><ul><li>收货人：&nbsp'
            + data[0].consignee + '</li>';
//					str += '<li>邮编：&nbsp' + data[0].zip_code + '</li>';
str += '<li>地址：&nbsp' + data[0].address + '</li>';
str += '<li>电话：&nbsp' + data[0].phone + '</li></ul></div>';

str += '<br><div class="d4"><ul>';
str += '<li class="n1"><ul><li>商品编码</li><li>商品名称</li><li>商品价格($)</li><li>商品数量</li><li>小计</li></ul></li>';
for (var i = 0; i < data[0].orderItem.length; i++) {
    str += '<li class="n2"><ul>';
    str += '<li>' + data[0].orderItem[i].sn + '</li>';
    str += '<li>' + data[0].orderItem[i].name + '</li>';
    str += '<li>' + data[0].orderItem[i].price + '</li>';
    str += '<li>' + data[0].orderItem[i].quantity + '</li>';
                str += '<li>' + data[0].orderItem[i].price + '</li>';// 因为未知
                // 优惠等因数，所以先用
                // 商品价格代替，后期要完善
                str += '</ul></li>';
            }
            str += '</ul></div>';

            $("#logonModal2 .rightInfo").html(str);
        }
    })

    $('#logonModal2').modal();
}

$('.n6').click(function () {
    $.ajax({
        type: "get",
        url: "../travel/myTravels.jhtml",
        data: {
            "sort": "create_date",
            "language": "CN"
        }, // 要发送的数据
        dataType: "json",
        success: function (data) {
            $('#cityId_LMTravel').val(data.cityId);
            /* 游记列表 */
            var travelsList = data.travelPage;
            var str = '<ul>';
            for (var i = 0; i < travelsList.list.length; i++) {
                var travle = travelsList.list[i];
                var avatar = travle.member.avatar; // 会员头像
                if (avatar == null) {
                    avatar = "/lanmeiairlines2.0/default/images/EN/default-avatar.png";
                }
                str += ' <li > ';
                str += ' <div> ';
                str += '     <h2>' + travle.title + '</h2> ';
                str += '     <img  style="width: 130px" src=' + travle.cover + '> ';
                str += '     <p> ';
                str += '         <img src="/lanmeiairlines2.0/default/travel/images/EN/m-s5-local.png" class="m-s5-local"> ';
                str += '        <span class="s1">' + travle.city_cn + '</span> ';
                str += '        <img src="/lanmeiairlines2.0/default/travel/images/EN/m-s5-see.png" class="m-s5-see"> ';
                str += '         <span class="s2">' + travle.browse + '</span> ';
                str += '     </p> ';
                str += '  </div> ';
                str += '   <h3><img style="width:20px;height:20px;border-radius:50%;" src=' + avatar + '><span>' + travle.member.nameEn + '</span></h3> ';
                str += ' </li> ';
            }
            str += '</ul>';
            $('#rightInfo').html(str);
        }
    })
})


//菜单切换
$('.js-myTravel>a').click(function (e) {
    e.preventDefault();
    $(this).siblings('.travle-menu').slideToggle();
});
// 移动端点击隐藏
if ($(window).width() < 992) {
    $('html').click(function () {
        $('.travle-menu').hide();
    });
}

//旅游内容切换
var $travelMenuA = $('.js-myTravel>.travle-menu a');
$travelMenuA.click(function (e) {
    e.preventDefault();
    $travelMenuA.removeClass('active');
    $(this).addClass('active');
    //var id = $(this).attr('href');
    //$(id).show().siblings('.myTravel').hide();
});

/* 判断是PC端还是移动端 */
function isPc() {
    // 判断手机端或者PC端
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
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

    } else {
        $('.travle-menu li').click(function () {
            $('.travle-menu').hide();
        });
    }
}

isPc();


