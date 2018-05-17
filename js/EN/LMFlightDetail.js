
var LanmeiAirlinesTickit = {
    cityData: ['Bangkok/BKK/Thailand','Changsha/CSX/China','Guangzhou/CAN/China','Hanoi/HAN/Vietnam','HongKong/HKG/HongKong,China','Ho Chi Minh/SGN/Vietnam','Macao/MFM/Macao,China','Nanning/NNG/China','Phnom Penh/PNH/Cambodia','Shijiazhuang/SJW/China','Siem Reap/REP/Cambodia','Sihanoukville/KOS/Cambodia','Singapore/SIN/Singapore'],
    fNumberData: ['LQ315','LQ316','LQ317','LQ318','LQ332','LQ333','LQ502','LQ503','LQ660','LQ661','LQ666','LQ667','LQ670','LQ671','LQ780','LQ781','LQ806','LQ807','LQ916','LQ917','LQ970','LQ971','LQ9302','LQ9303','LQ9508','LQ9509'],
    init: function () {
        this.flightInfo();
        this.addEvend();
    },

    simpleDate:function(single,id,container){
        // 日期选择
        var formatDate = function(num) { //日期格式化
            return num < 10 ? (num = '0' + num) : num;
        };

        var formatMonth = function(month){
            var monthEn;
            switch (month) {
                case 1: monthEn = 'Jan';break;
                case 2: monthEn = 'Feb';break;
                case 3: monthEn = 'Mar';break;
                case 4: monthEn = 'Apr';break;
                case 5: monthEn = 'May';break;
                case 6: monthEn = 'Jun';break;
                case 7: monthEn = 'Jul';break;
                case 8: monthEn = 'Aug';break;
                case 9: monthEn = 'Sep';break;
                case 10: monthEn = 'Oct';break;
                case 11: monthEn = 'Nov';break;
                case 12: monthEn = 'Dec';break;
            }
            return monthEn;
        };

        var winWidth = $(window).width();

        var today = new Date();
        var todayTime = formatDate(today.getDate()) + ' ' + formatMonth((today.getMonth() + 1));
        var startTimeStr = new Date(today.getTime() + 86400000 * 1);
        // var dateTime = $('#f_time').val();
        // var startTimeStr = new Date(new Date(dateTime).getTime()); 
        var startTimeInit =  startTimeStr.getFullYear()+ '-' +(startTimeStr.getMonth() + 1)+ '-' + formatDate(startTimeStr.getDate());
        var startTime = formatDate(startTimeStr.getDate()) + ' ' + formatMonth((startTimeStr.getMonth() + 1));
        var endTimeStr = new Date(today.getTime() + 86400000 * 2);
        var endTimeInit =  endTimeStr.getFullYear()+ '-' +(endTimeStr.getMonth() + 1)+ '-' + formatDate(endTimeStr.getDate());
        var endTime = formatDate(endTimeStr.getDate()) + ' ' + formatMonth((endTimeStr.getMonth() + 1));
        var maxTime = formatDate(today.getDate()) + ' ' + formatMonth((today.getMonth() + 1));

        // 初始化日期的值
        if (single) {
            $(id).attr('data-start',startTimeInit);
        } else {
            $(id).attr('data-start',startTimeInit);
            $(id).attr('data-end',endTimeInit);
        }
        
        var that = this;
        $(id).daterangepicker({
            parentEl:container,
            format: 'D MMM',
            startDate: startTime,
            endDate: endTime,
            minDate: todayTime,
            // maxDate:'2018-06-02',
            singleDatePicker: single, //单日期
            singleDatePicker_2: true, //单日期单日历
            outsideClickHide: true, //点击空白隐藏日期控件
            showDateTitle: false,
            showDropdowns: false, //下拉选择月份和年份
            showWeekNumbers: false, //显示周
            autoApply: true, //自动关闭日期
            language :'en',
            },function(start, end, label) {//格式化日期显示框  
                $('.cityMenu-wrap').hide();
                if (this.singleDatePicker) {
                    $(id).html(start.format('D MMM'));
                    $(id).attr('data-start',start.format('YYYY-MM-DD'));
                } else {
                    $(id).html(start.format('D MMM') + ' - ' + end.format('D MMM'));
                    $(id).attr('data-start',start.format('YYYY-MM-DD')).attr('data-end',end.format('YYYY-MM-DD'));
                }
            }
        );

        // 隐藏日期的apply和cancel按钮
        $('.js-date-ok').hide();
    },

    /* 模糊匹配 */
    autoComplete:function(id){
        var that = this;
        /* 机票模糊匹配 */
        $(id).on('input',function(event) {
            var searchText = $(this).val();
            console.log(searchText);
            var currenData;
            var data = $(this).attr('data');

            switch (data) {
                case 'fromcityMenu':
                    currenData=that.cityData
                    break;
                case 'tocityMenu':
                    currenData=that.cityData
                    break;
                case 'flightMenu':
                    currenData=that.fNumberData
                    break;
            }

            var currentVal = searchText.toLowerCase();
            var srdata = [];
            for (var i = 0; i < currenData.length; i++) {
                if (currentVal.trim().length > 0 && currenData[i].toLowerCase().indexOf(currentVal) > -1) {
                    srdata.push(currenData[i]);
                }
            }

            $('.'+data).empty();
            var escapedSearchText,zregex,startpos,text,searchVal;
            $.each(srdata,function(i,val){
                escapedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                zregex = new RegExp(escapedSearchText, 'i');
                startpos = val.search(zregex);
                text = val.substr(0, startpos + searchText.length) + '</span>' + val.substr(startpos + searchText.length);
                searchVal = text.substr(0, startpos) + '<span>' + text.substr(startpos);

                $('.'+data).append('<li title="'+val+'">'+searchVal+'</li>');
            });
            if(srdata.length==0){ 
                $('.'+data).append('<li>No results match "'+searchText+'"</li>');
            }
            if(currentVal===''){
                $('.'+data).empty();
                $.each(currenData,function(i,val){
                    $('.'+data).append('<li title="'+val+'">'+val+'</li>');
                });
            }
        });
    },

    /* 航班信息显示 */
    flightInfo: function () {
        //去掉日期选择最后一个li的右边线
        $('.f-time-select li:last a').css("border", "none");

        // 航班查询结果，偶数行背景颜色
        $('.i-content-inner li:odd').css('background', '#F1F3F9');

        // 根据不同日期显示不同的航班信息
        $('.js-time-select').on('click', '>li a', function () {
            $(this).parent('li').addClass('active').siblings('li').removeClass('active');
        });

        // 航班号和路线选择切换
        $('.selectWay a').click(function(e){
            e.preventDefault();
            $(this).addClass('active').siblings('a').removeClass('active');
            var selectWay = $(this).attr('data-way');
            var dataMulti = $(this).attr('data-Multi');

            switch (selectWay){
                case 'b-route':
                    $('.localSelectStart,.localSelectEnd').show();
                    $('.flightSelectStart').hide();
                    break;
                case 'f-num':
                    $('.flightSelectStart').show();
                    $('.localSelectStart,.localSelectEnd').hide();
                    break;
            }
        });

        /* 删除数组中某个元素 */
        Array.prototype.indexOf = function (val) {
            for(var i = 0; i < this.length; i++){
                if(this[i] == val){return i;}
            }
            return -1;
        };
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if(index > -1){this.splice(index,1);}
        };

        /* 设置出发地下拉的值 */
        var fromCityVal = function(text){ 
            var fromcityArr = that.cityData.slice(0);
            fromcityArr.remove(text);
            $('.fromcityMenu').empty();
            $.each(fromcityArr,function(i,val){
                $('.fromcityMenu').append('<li title="'+val+'">'+val+'</li>');
            });
        };

        /* 设置目的地下拉的值 */
        var toCityVal = function(text){
            var tocityArr = that.cityData.slice(0);
            tocityArr.remove(text);
            $('.tocityMenu').empty();
            $.each(tocityArr,function(i,val){
                $('.tocityMenu').append('<li title="'+val+'">'+val+'</li>');
            }); 
        };

        // 点击input的时候下拉   
        var that = this;
        $('.selectAirCommon').on('click','.inputDown',function(e){
            e.stopPropagation();
            var id = $(this).attr('id');
            switch (id) {
                case 'fromcity':
                    fromCityVal($('#tocity').val());
                    break;
                case 'tocity':
                    toCityVal($('#fromcity').val());
                    break;
                case 'f-num-select':
                    // 出发地的值
                    $('.flightMenu').empty();
                    $.each(that.fNumberData,function(i,val){
                        $('.flightMenu').append('<li title="'+val+'">'+val+'</li>');
                    });
                    break;
            }
            
            $('.selectAirCommon .cityMenu-wrap,.selectAirCommon ul').hide();
            $(this).siblings('.cityMenu-wrap').show().children('ul').show();;
        });

        // 点击下拉框选项后
        $('.cityMenu-wrap').on('click','.menu-com li',function(e){
            var val = $(this).attr('title');
            $(this).parents('.cityMenu-wrap').hide().siblings('input').val(val);

            var data = $(this).parent('.menu-com').attr('data');
            switch (data) {
                case 'from-menu':
                    fromCityVal($('#tocity').val());
                    $('#tocity').click();
                    break;
                 case 'to-menu':
                    toCityVal($('#fromcity').val());
                    $('#f-timeFrom').click();
                    break;
                case 'flight-menu':
                    $('#f-timeFrom').click();
                    break;
            }
        });

        $('.fromcityMenu').on('click', 'li', function(event) {
            event.preventDefault();
            $('#tocity').click();
        });

        $('.tocityMenu').on('click', 'li', function(event) {
            event.preventDefault();
            $('#f-timeFrom').click();
        });

        // 出发地和目的地切换
        $('#localChangeImg').click(function(){
            var fromcity = $('#fromcity').val();
            var tocity = $('#tocity').val();
            $('#fromcity').val(tocity);
            $('#tocity').val(fromcity);
        });

        this.autoComplete('#f-num-select');
        this.autoComplete('#fromcity');
        this.autoComplete('#tocity');

        // 点击空白隐藏
        $('html').click(function(){
            $('.cityMenu-wrap').hide();
        });
        $('.cityMenu-wrap').click(function(e){
            e.stopPropagation();
        });
    },

    /* 其他事件 */
    addEvend: function () {
        // 日期选择
        this.simpleDate(true,'#f-timeFrom','.js-flightStatusDate-container');
    },
};

$(document).ready(function ($) {
    LanmeiAirlinesTickit.init();
});


function flightFind(time) {
    /*选中日期时，把日期同步到  日期选项中*/

    var fromcity2 = $("#fromcity").val();
    var tocity2 = $("#tocity").val();
    var fNumber = $("#f-num-select").val();
    $.ajax({
        type: "post",
        url: "../flight/findFlight.jhtml",
        data: {
            "fromCity": fromcity2,
            "toCity": tocity2,
            "flightNum": fNumber,
            "timeFrom": time,
            "language": "EN"

        }, // 要发送的数据
        dataType: "json",
        success: function (data) {
            var str = '';
            var str2 = '';
            var str3 = '';
            str += '<li>';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[0].ymd + '>';
            str += '	<p class="f-set-out">Set out</p>';

            str += '<p class="f-date">' + data.dateDate[0].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[0].week + '</p>';
            str += '</a>';
            str += '</li>';
            str += '<li>';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[1].ymd + '>';
            str += '<p class="f-set-out">Set out</p>';
            str += '<p class="f-date">' + data.dateDate[1].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[1].week + '</p>';
            str += '</a>';
            str += '</li>';
            str += '<li>';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[2].ymd + '>';
            str += '<p class="f-set-out">Set out</p>';
            str += '<p class="f-date">' + data.dateDate[2].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[2].week + '</p>';
            str += '</a>';
            str += '</li>';
            str += '<li class="active">';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[3].ymd + '>';
            str += '<p class="f-set-out">Set out</p>';
            str += '<p class="f-date">' + data.dateDate[3].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[3].week + '</p>';
            str += '</a>';
            str += '</li>';
            str += '<li>';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[4].ymd + '>';
            str += '<p class="f-set-out">Set out</p>';
            str += '<p class="f-date">' + data.dateDate[4].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[4].week + '</p>';
            str += '</a>';
            str += '</li>';
            str += '<li>';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[5].ymd + '>';
            str += '<p class="f-set-out">Set out</p>';
            str += '<p class="f-date">' + data.dateDate[5].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[5].week + '</p>';
            str += '</a>';
            str += '</li>';
            str += '<li>';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[6].ymd + '>';
            str += '<p class="f-set-out">Set out</p>';
            str += '<p class="f-date">' + data.dateDate[6].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[6].week + '</p>';
            str += '</a>';
            str += '</li>';
            $("#date_ul").html(str);
            if (data.fligtData.length > 0) {
                for (var i = 0; i < data.fligtData.length; i++) {
                    var flight = data.fligtData[i]
                    str2 += '<li>';
                    str2 += '<span class="c-inner-no">' + flight.fightnumber
                        + '</span>';
                    str2 += '<span class="d-inner-plan">' + flight.FlyAt + '</span>';
                    str2 += '<span class="d-inner-arrival">' + flight.FlyOffCityEnglishName + '</span>';
                    str2 += '<span class="a-inner-plan">' + flight.LandAt + '<b style="font-size: 14px;color:#F44336;">' + flight.lanDate + '</b> </span>';
                    str2 += '<span class="a-inner-arrival">' + flight.DestinationCityEnglishName + '</span>';
                    str2 += ' <span class="c-inner-time">' + flight.flightTime + '</span>';
                    str2 += '<span class="c-inner-remarks">Plan</span>';
                    str2 += '</li>';
                }

                str3 += '<span class="f-from-city">' + data.returnFlyOff + '</span>to';
                str3 += '<span class="f-to-city">' + data.returnDestination + '</span>';
            } else {
                str2 += '<li>';
                str2 += '<font color="red" size="4">Sorry, your query data does not exist.</font>';
                str2 += '</li>';

                str3 += '<span class="f-to-city"></span>';
            }

            $("#data_flight").html(str2);
            $("#where_data").html(str3);
        }

    });

}

$('.js-time-select').on('click', '>li a', function () {
    var time = $(this).attr('date');
    var f_time = $(this).children('.f-date').text();
    
    // 去掉空格
    var trim = function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    flightFind(trim(time));
});


$("#clickSeekTwo").click(function () {
    var $selectWay = $(".selectWay a");
    var fromcity = $("#fromcity").val();
    var tocity = $("#tocity").val();
    var fn = $("#f-num-select").val();

    $selectWay.each(function (i, v) {
        if ($(v).hasClass("active")) {
            var href = $(v).attr("data-way");
            if (href == "b-route") {
                if (fromcity == null || fromcity == undefined
                    || fromcity == "") {
                    layer.tips("Destination is required！", $("#fromcity"), {
                        tips: [3, '#8ec060'],
                        time: 3000
                    })
                    return;
                }
                if (tocity == null || tocity == undefined
                    || tocity == "") {
                    layer.tips("Departure is required！", $("#tocity"), {
                        tips: [3, '#8ec060'],
                        time: 3000
                    });
                    return;
                }
                $("#f-num-select").val("");
                flightFind2();
            } else if (href == "f-num") {
                if (fn == null || fn == undefined || fn == "") {
                    layer.tips("Flight No. is required!", $("#f-num-select"), {
                        tips: [3, '#8ec060'],
                        time: 3000
                    });
                    return;
                }
                $("#fromcity").val("");
                $("#tocity").val("");
                flightFind2();
            }
        }
    });
});

function flightFind2() {
    var fromCity = $("#fromcity").val();
    var toCity = $("#tocity").val();
    var timeFrom = $("#f-timeFrom").attr('data-start'); 
    var flightNum = $("#f-num-select").val();

    $.ajax({
        type: "post",
        url: "../flight/findFlight.jhtml",
        data: {
            "fromCity": fromCity,
            "toCity": toCity,
            "timeFrom": timeFrom,
            "flightNum": flightNum,
            "language": "EN"
        }, // 要发送的数据
        dataType: "json",
        success: function (data) {
            var str = '';
            var str2 = '';
            var str3 = '';
            str += '<li>';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[0].ymd + '>';
            str += '	<p class="f-set-out">Set out</p>';

            str += '<p class="f-date">' + data.dateDate[0].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[0].week + '</p>';
            str += '</a>';
            str += '</li>';
            str += '<li>';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[1].ymd + '>';
            str += '<p class="f-set-out">Set out</p>';
            str += '<p class="f-date">' + data.dateDate[1].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[1].week + '</p>';
            str += '</a>';
            str += '</li>';
            str += '<li>';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[2].ymd + '>';
            str += '<p class="f-set-out">Set out</p>';
            str += '<p class="f-date">' + data.dateDate[2].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[2].week + '</p>';
            str += '</a>';
            str += '</li>';
            str += '<li class="active">';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[3].ymd + '>';
            str += '<p class="f-set-out">Set out</p>';
            str += '<p class="f-date">' + data.dateDate[3].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[3].week + '</p>';
            str += '</a>';
            str += '</li>';
            str += '<li>';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[4].ymd + '>';
            str += '<p class="f-set-out">Set out</p>';
            str += '<p class="f-date">' + data.dateDate[4].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[4].week + '</p>';
            str += '</a>';
            str += '</li>';
            str += '<li>';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[5].ymd + '>';
            str += '<p class="f-set-out">Set out</p>';
            str += '<p class="f-date">' + data.dateDate[5].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[5].week + '</p>';
            str += '</a>';
            str += '</li>';
            str += '<li>';
            str += '<a href="javascript:void(0)" date=' + data.dateDate[6].ymd + '>';
            str += '<p class="f-set-out">Set out</p>';
            str += '<p class="f-date">' + data.dateDate[6].date + '</p>';
            str += '<p class="f-week">' + data.dateDate[6].week + '</p>';
            str += '</a>';
            str += '</li>';

            $("#date_ul").html(str);
            if (data.fligtData.length > 0) {
                for (var i = 0; i < data.fligtData.length; i++) {
                    var flight = data.fligtData[i]
                    str2 += '<li>';
                    str2 += '<span class="c-inner-no">' + flight.fightnumber
                        + '</span>';
                    str2 += '<span class="d-inner-plan">' + flight.FlyAt + '</span>';
                    str2 += '<span class="d-inner-arrival">' + flight.FlyOffCityEnglishName + '</span>';
                    str2 += '<span class="a-inner-plan">' + flight.LandAt + '<b style="font-size: 14px;color:#F44336;">' + flight.lanDate + '</b> </span>';
                    str2 += '<span class="a-inner-arrival">' + flight.DestinationCityEnglishName + '</span>';
                    str2 += ' <span class="c-inner-time">' + flight.flightTime + '</span>';
                    str2 += '<span class="c-inner-remarks">Plan</span>';
                    str2 += '</li>';
                }

                str3 += '<span class="f-from-city">' + data.returnFlyOff + '</span>to';
                str3 += '<span class="f-to-city">' + data.returnDestination + '</span>';
            } else {
                str2 += '<li>';
                str2 += '<font color="red" size="4">Sorry, your query data does not exist.</font>';
                str2 += '</li>';

                str3 += '<span class="f-to-city"></span>';
            }

            $("#data_flight").html(str2);
            $("#where_data").html(str3);
        }

    });

}

