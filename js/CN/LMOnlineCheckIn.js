
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
        $('.js-search-flight').click(function(event) {
            var $from = $('.js-fromCity-input');
            var $ticket = $('.js-date-input');
            var $name = $('.js-lastName-input');
            var $phone = $('.js-phone-input');

            if($from.val()==''){
                $from.addClass('warnTip');
                $from.focus();
                layer.open({
                  title: '信息'
                  ,content: '请检查您的出发地是否正确'
                });
                return;
            }else{
                $from.removeClass('warnTip');
            }
            if($ticket.val()==''){
                $ticket.addClass('warnTip');
                $ticket.focus();
                layer.open({
                  title: '信息'
                  ,content: '请检查您的票号或护照号是否正确'
                });
                return;
            }else{
                $ticket.removeClass('warnTip');
            }
            if($name.val()==''){
                $name.addClass('warnTip');
                $name.focus();
                layer.open({
                  title: '信息'
                  ,content: '请检查您的姓名是否正确'
                });
                return;
            }else{
                $name.removeClass('warnTip');
            }
            if($phone.val()==''){
                $phone.addClass('warnTip');
                $phone.focus();
                layer.open({
                  title: '信息'
                  ,content: '请检查您的号码是否正确'
                });
                return;
            }else{
                $phone.removeClass('warnTip');
            }
        });
    },

    /* 座位选择 */
    flightCheckIn:function(){
        // 选中座位
        $('.seat-wrap-com>ul>li').click(function(event) {
            if(!$(this).hasClass('seat-sold')){
                $('.seat-wrap-com>ul>li').removeClass('seat-checked');
                $(this).addClass('seat-checked');
            }
        });
    },

    /* 其他事件 */
    addEvend: function () {
        if(this.winWidth<992){
            $('.js-from-input,.js-to-input').attr('readonly',true);
        }

        $('.js-ticketHotel-pay').click(function(event) {
            $('#passengerInfoModal').modal();
        });
    },
};

$(document).ready(function ($) {
    lmFlightHotel.init();
});