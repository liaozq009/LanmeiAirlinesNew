
var lmFlightHotel = {
    cityData: LMComData.cityData,
    winWidth: $(window).width(),
    init: function () {
        this.isPc();
        this.flightInfo();
        this.flightCheckIn();
        this.addEvend();
    },

    /* 判断是PC端还是移动端 */
    isPc:function(){
        // 判断手机端或者PC端
        function IsPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone"];
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

        if(flag){
            this.pcEvent();           
        }else{
            
        }
    },

    /* 航班信息选择 */
    flightInfo:function(){
        var $dropdownMenu = $('.dropdownMenu-wrap');
        var $fromMenu = $('.js-fromMenu');

        $('body').click(function(event) {
            $dropdownMenu.hide();
        });

        var that = this;
        function cityFn(){
            $fromMenu.empty();
            $.each(that.cityData,function(i,val){
                $fromMenu.append('<li title="'+val+'">'+val+'</li>');
            });
        };

        function dropdownFn(that){
            $dropdownMenu.hide();
            $(that).siblings('.dropdownMenu-wrap').show();

            $(that).siblings('.dropdownMenu-wrap').addClass('animated2 moveInUp').show();
            setTimeout(function(){
                $(that).siblings('.dropdownMenu-wrap').removeClass('moveInUp');
            }, 500);
        }

        //出发地选择
        $('.js-fromCity-input').click(function(event) {
            event.stopPropagation();
            cityFn();
            dropdownFn(this);
        });

        $('.js-fromMenu').on('click','>li',function(){
            var text1 = $(this).attr('title');
            var text2 = text1.split('/');
            var $box = $(this).parents('.dropdownMenu-wrap');
            $box.hide();
            $box.siblings('input').val(text2[0]+'/'+text2[1]).attr('data-city',text2[1]); 
        });

        // 模糊匹配
        $('.js-fromCity-input').autoComplete();

        // 护照和票号选择
        $('.js-select-option').click(function(event) {
           event.stopPropagation();
           dropdownFn(this);
        });

        $('.js-ticketMenu').on('click','>li',function(){
            var text1 = $(this).attr('title');
            var id = $(this).attr('data-id');
            var $box = $(this).parents('.ticketMenu-wrap');
            var $input = $('.js-date-input');
            $box.hide();
            $box.siblings('span').html(text1); 
            $input.attr('name',id);
            if(id=='ticketNum'){
                $input.removeClass('passport-num');
            }else{
                $input.addClass('passport-num');
            }
        });

        // 选择值机航班
        $('.js-select-radio').click(function(event) {
            $('.js-select-radio').removeClass('select-ok');
            $(this).addClass('select-ok');
        });

        //查询
        // $('.js-search-flight').click(function(event) {
        //     var $from = $('.js-fromCity-input');
        //     var $ticket = $('.js-date-input');
        //     var $name = $('.js-lastName-input');
        //     var $phone = $('.js-phone-input');

        //     if($from.val()==''){
        //         $from.addClass('warnTip');
        //         $from.focus();
        //         layer.open({
        //           title: '信息'
        //           ,content: '请检查您的出发地是否正确'
        //         });
        //         return;
        //     }else{
        //         $from.removeClass('warnTip');
        //     }
        //     if($ticket.val()==''){
        //         $ticket.addClass('warnTip');
        //         $ticket.focus();
        //         layer.open({
        //           title: '信息'
        //           ,content: '请检查您的票号或护照号是否正确'
        //         });
        //         return;
        //     }else{
        //         $ticket.removeClass('warnTip');
        //     }
        //     if($name.val()==''){
        //         $name.addClass('warnTip');
        //         $name.focus();
        //         layer.open({
        //           title: '信息'
        //           ,content: '请检查您的姓名是否正确'
        //         });
        //         return;
        //     }else{
        //         $name.removeClass('warnTip');
        //     }
        //     if($phone.val()==''){
        //         $phone.addClass('warnTip');
        //         $phone.focus();
        //         layer.open({
        //           title: '信息'
        //           ,content: '请检查您的号码是否正确'
        //         });
        //         return;
        //     }else{
        //         $phone.removeClass('warnTip');
        //     }
        // });
    },

    /* 座位选择 */
    flightCheckIn:function(){
        // 选中座位
        $('.seat-wrap-com').on('click','>ul>li',function(event) {
            if(!$(this).hasClass('seat-sold') && !$(this).hasClass('row-num')){
                $('.seat-wrap-com>ul>li').removeClass('seat-checked');
                $(this).addClass('seat-checked');
                var name = $(this).attr('data-name');
                $('.js-flight-num span').html(name);
            }
        });

        // 座位append
        var seatData_1 = {'row-1':[{'data_name':'1A','data_seatId':'seat-1A','seat_sold':'seat-sold'},{'data_name':'1B','data_seatId':'seat-1B','seat_sold':''},{'data_name':'1C','data_seatId':'seat-1C','seat_sold':''},{'data_name':'1D','data_seatId':'seat-1D','seat_sold':''},{'data_name':'1E','data_seatId':'seat-1E','seat_sold':''},{'data_name':'1F','data_seatId':'seat-1F','seat_sold':''}],
                           'row-2':[{'data_name':'2A','data_seatId':'seat-2A','seat_sold':''},{'data_name':'2B','data_seatId':'seat-2B','seat_sold':''},{'data_name':'2C','data_seatId':'seat-2C','seat_sold':'sold'},{'data_name':'2D','data_seatId':'seat-2D','seat_sold':''},{'data_name':'2E','data_seatId':'seat-2E','seat_sold':''},{'data_name':'2F','data_seatId':'seat-2F','seat_sold':''}],
                           'row-3':[{'data_name':'3A','data_seatId':'seat-3A','seat_sold':''},{'data_name':'3B','data_seatId':'seat-3B','seat_sold':''},{'data_name':'3C','data_seatId':'seat-3C','seat_sold':''},{'data_name':'3D','data_seatId':'seat-3D','seat_sold':''},{'data_name':'3E','data_seatId':'seat-3E','seat_sold':''},{'data_name':'3F','data_seatId':'seat-3F','seat_sold':''}],
                           'row-4':[{'data_name':'4A','data_seatId':'seat-4A','seat_sold':''},{'data_name':'4B','data_seatId':'seat-4B','seat_sold':''},{'data_name':'4C','data_seatId':'seat-4C','seat_sold':'seat-sold'},{'data_name':'4D','data_seatId':'seat-4D','seat_sold':''},{'data_name':'4E','data_seatId':'seat-4E','seat_sold':''},{'data_name':'4F','data_seatId':'seat-4F','seat_sold':''}],
                           'row-5':[{'data_name':'5A','data_seatId':'seat-5A','seat_sold':''},{'data_name':'5B','data_seatId':'seat-5B','seat_sold':''},{'data_name':'5C','data_seatId':'seat-5C','seat_sold':''},{'data_name':'5D','data_seatId':'seat-5D','seat_sold':''},{'data_name':'5E','data_seatId':'seat-5E','seat_sold':''},{'data_name':'5F','data_seatId':'seat-5F','seat_sold':''}],
                           'row-6':[{'data_name':'6A','data_seatId':'seat-6A','seat_sold':''},{'data_name':'6B','data_seatId':'seat-6B','seat_sold':''},{'data_name':'6C','data_seatId':'seat-6C','seat_sold':''},{'data_name':'6D','data_seatId':'seat-6D','seat_sold':''},{'data_name':'6E','data_seatId':'seat-6E','seat_sold':''},{'data_name':'6F','data_seatId':'seat-6F','seat_sold':''}],
                           'row-7':[{'data_name':'7A','data_seatId':'seat-7A','seat_sold':''},{'data_name':'7B','data_seatId':'seat-7B','seat_sold':'sold'},{'data_name':'7C','data_seatId':'seat-7C','seat_sold':''},{'data_name':'7D','data_seatId':'seat-7D','seat_sold':''},{'data_name':'7E','data_seatId':'seat-7E','seat_sold':''},{'data_name':'7F','data_seatId':'seat-7F','seat_sold':''}],
                           'row-8':[{'data_name':'8A','data_seatId':'seat-8A','seat_sold':''},{'data_name':'8B','data_seatId':'seat-8B','seat_sold':''},{'data_name':'8C','data_seatId':'seat-8C','seat_sold':''},{'data_name':'8D','data_seatId':'seat-8D','seat_sold':''},{'data_name':'8E','data_seatId':'seat-8E','seat_sold':''},{'data_name':'8F','data_seatId':'seat-8F','seat_sold':''}],
                           'row-9':[{'data_name':'9A','data_seatId':'seat-9A','seat_sold':''},{'data_name':'9B','data_seatId':'seat-9B','seat_sold':''},{'data_name':'9C','data_seatId':'seat-9C','seat_sold':''},{'data_name':'9D','data_seatId':'seat-9D','seat_sold':''},{'data_name':'9E','data_seatId':'seat-9E','seat_sold':''},{'data_name':'9F','data_seatId':'seat-9F','seat_sold':''}],
            };

        $.each(seatData_1,function(i,v){
            var num1 = i.split('-')[1];
            var $child = '<ul class="'+i+'">'+
                            '<li class="cell-1 '+v[0].seat_sold+'" data-name="'+v[0].data_name+'"  data-seatId="'+v[0].data_seatId+'"></li>'+
                            '<li class="cell-2 '+v[1].seat_sold+'" data-name="'+v[1].data_name+'"  data-seatId="'+v[1].data_seatId+'"></li>'+
                            '<li class="cell-3 '+v[2].seat_sold+'" data-name="'+v[2].data_name+'"  data-seatId="'+v[2].data_seatId+'"></li>'+
                            '<li class="row-num">'+num1+'</li>'+
                            '<li class="cell-4 '+v[3].seat_sold+'" data-name="'+v[3].data_name+'"  data-seatId="'+v[3].data_seatId+'"></li>'+
                            '<li class="cell-5 '+v[4].seat_sold+'" data-name="'+v[4].data_name+'"  data-seatId="'+v[4].data_seatId+'"></li>'+
                            '<li class="cell-6 '+v[5].seat_sold+'" data-name="'+v[5].data_name+'"  data-seatId="'+v[5].data_seatId+'"></li>'+
                        '</ul>';
            $('.seat-wrap-1').append($child);
        });

        var seatData_2 = {'row-10':[{'data_name':'10A','data_seatId':'seat-10A','seat_sold':''},{'data_name':'10B','data_seatId':'seat-10B','seat_sold':''},{'data_name':'10C','data_seatId':'seat-10C','seat_sold':''},{'data_name':'10D','data_seatId':'seat-10D','seat_sold':''},{'data_name':'10E','data_seatId':'seat-10E','seat_sold':''},{'data_name':'10F','data_seatId':'seat-10F','seat_sold':''}],
                           'row-11':[{'data_name':'11A','data_seatId':'seat-11A','seat_sold':''},{'data_name':'11B','data_seatId':'seat-11B','seat_sold':''},{'data_name':'11C','data_seatId':'seat-11C','seat_sold':'sold'},{'data_name':'11D','data_seatId':'seat-11D','seat_sold':''},{'data_name':'11E','data_seatId':'seat-11E','seat_sold':''},{'data_name':'11F','data_seatId':'seat-11F','seat_sold':''}],
                           'row-12':[{'data_name':'12A','data_seatId':'seat-12A','seat_sold':''},{'data_name':'12B','data_seatId':'seat-12B','seat_sold':'seat-sold'},{'data_name':'12C','data_seatId':'seat-12C','seat_sold':''},{'data_name':'12D','data_seatId':'seat-12D','seat_sold':''},{'data_name':'12E','data_seatId':'seat-12E','seat_sold':''},{'data_name':'12F','data_seatId':'seat-12F','seat_sold':''}],
                           'row-13':[{'data_name':'13A','data_seatId':'seat-13A','seat_sold':''},{'data_name':'13B','data_seatId':'seat-13B','seat_sold':''},{'data_name':'13C','data_seatId':'seat-13C','seat_sold':''},{'data_name':'13D','data_seatId':'seat-13D','seat_sold':''},{'data_name':'13E','data_seatId':'seat-13E','seat_sold':''},{'data_name':'13F','data_seatId':'seat-13F','seat_sold':''}],
                           'row-14':[{'data_name':'14A','data_seatId':'seat-14A','seat_sold':''},{'data_name':'14B','data_seatId':'seat-14B','seat_sold':''},{'data_name':'14C','data_seatId':'seat-14C','seat_sold':''},{'data_name':'14D','data_seatId':'seat-14D','seat_sold':'seat-sold'},{'data_name':'14E','data_seatId':'seat-14E','seat_sold':''},{'data_name':'14F','data_seatId':'seat-14F','seat_sold':''}],
                           'row-15':[{'data_name':'15A','data_seatId':'seat-15A','seat_sold':''},{'data_name':'15B','data_seatId':'seat-15B','seat_sold':''},{'data_name':'15C','data_seatId':'seat-15C','seat_sold':''},{'data_name':'15D','data_seatId':'seat-15D','seat_sold':''},{'data_name':'15E','data_seatId':'seat-15E','seat_sold':''},{'data_name':'15F','data_seatId':'seat-15F','seat_sold':''}],
                           'row-16':[{'data_name':'16A','data_seatId':'seat-16A','seat_sold':''},{'data_name':'16B','data_seatId':'seat-16B','seat_sold':'sold'},{'data_name':'16C','data_seatId':'seat-16C','seat_sold':''},{'data_name':'16D','data_seatId':'seat-16D','seat_sold':''},{'data_name':'16E','data_seatId':'seat-16E','seat_sold':''},{'data_name':'16F','data_seatId':'seat-16F','seat_sold':''}],
                           'row-17':[{'data_name':'17A','data_seatId':'seat-17A','seat_sold':''},{'data_name':'17B','data_seatId':'seat-17B','seat_sold':''},{'data_name':'17C','data_seatId':'seat-17C','seat_sold':''},{'data_name':'17D','data_seatId':'seat-17D','seat_sold':''},{'data_name':'17E','data_seatId':'seat-17E','seat_sold':''},{'data_name':'17F','data_seatId':'seat-17F','seat_sold':''}],
                           'row-18':[{'data_name':'18A','data_seatId':'seat-18A','seat_sold':''},{'data_name':'18B','data_seatId':'seat-18B','seat_sold':''},{'data_name':'18C','data_seatId':'seat-18C','seat_sold':''},{'data_name':'18D','data_seatId':'seat-18D','seat_sold':''},{'data_name':'18E','data_seatId':'seat-18E','seat_sold':''},{'data_name':'18F','data_seatId':'seat-18F','seat_sold':''}],
            };

        $.each(seatData_2,function(i,v){
            var num1 = i.split('-')[1];
            var $child = '<ul class="'+i+'">'+
                            '<li class="cell-1 '+v[0].seat_sold+'" data-name="'+v[0].data_name+'"  data-seatId="'+v[0].data_seatId+'"></li>'+
                            '<li class="cell-2 '+v[1].seat_sold+'" data-name="'+v[1].data_name+'"  data-seatId="'+v[1].data_seatId+'"></li>'+
                            '<li class="cell-3 '+v[2].seat_sold+'" data-name="'+v[2].data_name+'"  data-seatId="'+v[2].data_seatId+'"></li>'+
                            '<li class="row-num">'+num1+'</li>'+
                            '<li class="cell-4 '+v[3].seat_sold+'" data-name="'+v[3].data_name+'"  data-seatId="'+v[3].data_seatId+'"></li>'+
                            '<li class="cell-5 '+v[4].seat_sold+'" data-name="'+v[4].data_name+'"  data-seatId="'+v[4].data_seatId+'"></li>'+
                            '<li class="cell-6 '+v[5].seat_sold+'" data-name="'+v[5].data_name+'"  data-seatId="'+v[5].data_seatId+'"></li>'+
                        '</ul>';
            $('.seat-wrap-2').append($child);
        });

        var seatData_3 = {'row-19':[{'data_name':'19A','data_seatId':'seat-19A','seat_sold':''},{'data_name':'19B','data_seatId':'seat-19B','seat_sold':''},{'data_name':'19C','data_seatId':'seat-19C','seat_sold':''},{'data_name':'19D','data_seatId':'seat-19D','seat_sold':''},{'data_name':'19E','data_seatId':'seat-19E','seat_sold':''},{'data_name':'19F','data_seatId':'seat-19F','seat_sold':''}],
                           'row-20':[{'data_name':'20A','data_seatId':'seat-20A','seat_sold':''},{'data_name':'20B','data_seatId':'seat-20B','seat_sold':'seat-sold'},{'data_name':'20C','data_seatId':'seat-20C','seat_sold':'sold'},{'data_name':'20D','data_seatId':'seat-20D','seat_sold':''},{'data_name':'20E','data_seatId':'seat-20E','seat_sold':''},{'data_name':'20F','data_seatId':'seat-20F','seat_sold':''}],
                           'row-21':[{'data_name':'21A','data_seatId':'seat-21A','seat_sold':''},{'data_name':'21B','data_seatId':'seat-21B','seat_sold':''},{'data_name':'21C','data_seatId':'seat-21C','seat_sold':''},{'data_name':'21D','data_seatId':'seat-21D','seat_sold':''},{'data_name':'21E','data_seatId':'seat-21E','seat_sold':''},{'data_name':'21F','data_seatId':'seat-21F','seat_sold':''}],
                           'row-22':[{'data_name':'22A','data_seatId':'seat-22A','seat_sold':''},{'data_name':'22B','data_seatId':'seat-22B','seat_sold':'seat-sold'},{'data_name':'22C','data_seatId':'seat-22C','seat_sold':''},{'data_name':'22D','data_seatId':'seat-22D','seat_sold':''},{'data_name':'22E','data_seatId':'seat-22E','seat_sold':''},{'data_name':'22F','data_seatId':'seat-22F','seat_sold':''}],
                           'row-23':[{'data_name':'23A','data_seatId':'seat-23A','seat_sold':''},{'data_name':'23B','data_seatId':'seat-23B','seat_sold':''},{'data_name':'23C','data_seatId':'seat-23C','seat_sold':''},{'data_name':'23D','data_seatId':'seat-23D','seat_sold':''},{'data_name':'23E','data_seatId':'seat-23E','seat_sold':''},{'data_name':'23F','data_seatId':'seat-23F','seat_sold':''}],
                           'row-24':[{'data_name':'24A','data_seatId':'seat-24A','seat_sold':''},{'data_name':'24B','data_seatId':'seat-24B','seat_sold':''},{'data_name':'24C','data_seatId':'seat-24C','seat_sold':''},{'data_name':'24D','data_seatId':'seat-24D','seat_sold':''},{'data_name':'24E','data_seatId':'seat-24E','seat_sold':''},{'data_name':'24F','data_seatId':'seat-24F','seat_sold':''}],
                           'row-25':[{'data_name':'25A','data_seatId':'seat-25A','seat_sold':''},{'data_name':'25B','data_seatId':'seat-25B','seat_sold':'sold'},{'data_name':'25C','data_seatId':'seat-25C','seat_sold':''},{'data_name':'25D','data_seatId':'seat-25D','seat_sold':''},{'data_name':'25E','data_seatId':'seat-25E','seat_sold':''},{'data_name':'25F','data_seatId':'seat-25F','seat_sold':''}],
            };

        $.each(seatData_3,function(i,v){
            var num1 = i.split('-')[1];
            var $child = '<ul class="'+i+'">'+
                            '<li class="cell-1 '+v[0].seat_sold+'" data-name="'+v[0].data_name+'"  data-seatId="'+v[0].data_seatId+'"></li>'+
                            '<li class="cell-2 '+v[1].seat_sold+'" data-name="'+v[1].data_name+'"  data-seatId="'+v[1].data_seatId+'"></li>'+
                            '<li class="cell-3 '+v[2].seat_sold+'" data-name="'+v[2].data_name+'"  data-seatId="'+v[2].data_seatId+'"></li>'+
                            '<li class="row-num">'+num1+'</li>'+
                            '<li class="cell-4 '+v[3].seat_sold+'" data-name="'+v[3].data_name+'"  data-seatId="'+v[3].data_seatId+'"></li>'+
                            '<li class="cell-5 '+v[4].seat_sold+'" data-name="'+v[4].data_name+'"  data-seatId="'+v[4].data_seatId+'"></li>'+
                            '<li class="cell-6 '+v[5].seat_sold+'" data-name="'+v[5].data_name+'"  data-seatId="'+v[5].data_seatId+'"></li>'+
                        '</ul>';
            $('.seat-wrap-3').append($child);
        });

        // 收缩
        if(this.winWidth<1900){
            $('.js-flight-arrow').click(function(event) {
               $(this).parent().css('left',-332);
            });
            $('.js-seat-arrow').click(function(event) {
               $(this).parent().css('right',-260);
            });
            $('.js-checkIn-arrow').click(function(event) {
               $(this).parent().css('right',-260);
            });
        }else{
            $('.js-flight-arrow').click(function(event) {
               $(this).parent().css('left',-442);
            });
            $('.js-seat-arrow').click(function(event) {
               $(this).parent().css('right',-350);
            });
            $('.js-checkIn-arrow').click(function(event) {
               $(this).parent().css('right',-350);
            });
        }
        
        $('.js-flight-aside').mouseenter(function(event) {
           $(this).css('left',0);
        });
        $('.js-seat-aside').mouseenter(function(event) {
           $(this).css('right',0);
        });
        $('.js-checkIn-aside').mouseenter(function(event) {
           $(this).css('right',0);
        });

        // 拖拽
        var curentHeight = 3535;
        $('.js-miniMap-slide').myDrag({
            parent:'.js-miniMap-wrap', //定义拖动不能超出的外框,拖动范围
            randomPosition:true, //初始化随机位置
            fixedPosition:10, //初始化固定位置
            direction:'y', //方向
            handler:false, //把手
            dragStart:function(x,y){}, //拖动开始 x,y为当前坐标
            dragEnd:function(x,y){
                $('html, body').animate({scrollTop:(y/140)*curentHeight}, 'slow');
            }, //拖动停止 x,y为当前坐标
            dragMove:function(x,y){ //140 4180
               
            }
        });

        $(window).scroll(function(){
            var winHeigh = $(this).scrollTop(); //页面滚动的高度
            $('.js-miniMap-slide').css('top',(winHeigh/curentHeight)*140);
        });
    },

    /* pc端事件 */
    pcEvent:function(){
        // 定义滚动条
        var nice = $("html").niceScroll({
            cursorborderradius: 0,
            cursorwidth: "8px",
            cursorfixedheight: 150,
            cursorcolor: "#1f2c5c",
            zindex: 9999,
            cursorborder: 0,
            scrollspeed: 26,
            mousescrollstep: 36,
        });
    },

    /* 其他事件 */
    addEvend: function () {
        var $sectionInfo = $('.lm-section-info');
        var $sectionCheckIn = $('.lm-section-checkIn');
        var $sectionComplete = $('.lm-section-complete');

        var $mask = $('.header-mask,.footer-mask');

        $('.js-search-flight').click(function(event) {
            $sectionInfo.hide();
            $sectionCheckIn.show();
            $mask.show();
        });

        $('.js-prev-btn').click(function(event) {
            $sectionInfo.show();
            $sectionCheckIn.hide();
            $mask.hide();
        });

        $('.js-checkIn-btn').click(function(event) {
            $sectionCheckIn.hide();
            $sectionComplete.show();
            $mask.hide();
        });

        $('.js-continue-checkIn').click(function(event) {
            $sectionInfo.show();
            $sectionComplete.hide();
            $mask.hide();
        });
    },
};

$(document).ready(function ($) {
    lmFlightHotel.init();
});