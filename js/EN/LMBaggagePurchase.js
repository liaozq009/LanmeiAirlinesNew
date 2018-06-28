
var LMBaggage = {
    fNumberData: LMComData.fNumberData,
    init: function () {
        var $dropdownMenu = $('.dropdownMenu-wrap');
        // 航班号
        $.each(this.fNumberData,function(i,val){
            $('.flightMenu').append('<li title="'+val+'">'+val+'</li>');
        });
        $('.js-flightNum-input,.js-nationalBaggage-input').click(function(event) {
           event.stopPropagation();
           $dropdownMenu.hide();
           $(this).siblings('.dropdownMenu-wrap').show();
        });

        // 点击下拉框选项后
       $dropdownMenu.on('click','.menu-com li',function(e){
            var val = $(this).attr('title');
            $(this).parents('.dropdownMenu-wrap').hide().siblings('input').val(val);
            if($(this).parent().attr('data')=='flight-menu'){
                $('.js-date-input').click(); //自动点击日期控件
            }
        });

        // 模糊匹配
        $('.js-flightNum-input').autoComplete();

        // 日期选择
        $('.js-date-input').simpleDate({
            single:true,
            todaySelect:false,
            container:'.js-flightDate-container',
        });
        $('.js-date-input').click(function(event) {
           event.stopPropagation();
           $dropdownMenu.hide();
           $(this).siblings('.dropdownMenu-wrap').show();
        });

        // 点击空白隐藏
        $('html').click(function(){
            $dropdownMenu.hide();
        });
        $dropdownMenu.click(function(e){
            e.stopPropagation();
        });

        // 输入行李
        var hideImg = function(){
            $('.lm-select-baggage>img').hide();
        };
        var _tick = null;
        $('.js-baggage-input').on('input',function(event) {
            //获取输入的关键词
            this.value=this.value.replace(/^[0]+[0-9]*$/gi,"");
            this.value=this.value.replace(/\D/g,"");
            var that = this;
            if (_tick) clearTimeout(_tick);
            _tick = setTimeout(function() {
                var kw = Number($(that).val());
                if(kw>15){
                    hideImg();
                    $('.baggagePurchase-4').show();
                }else if(kw>10){
                   hideImg();
                   $('.baggagePurchase-3').show();
                }else if(kw>5){
                   hideImg();
                   $('.baggagePurchase-2').show();
                }else{
                    hideImg();
                    $('.baggagePurchase-1').show();
                }
            }, 1000);
        });

        // 选择支付方式
        $('.js-pay-select>a').click(function(event) {
            $(this).addClass('active').siblings('a').removeClass('active');
            var dataPay = $(this).attr('data-pay');
            $('.js-pay-method').val(dataPay);
        });

        // 计算价格
        $('.js-cal-price').click(function(event) {
            var agreeClause = $(".js-agree-checkbox").is(':checked'); //是否同意条款 true为同意，false为不同意
            if($('.js-passport-input').val()==''){
                $('.js-passport-input').addClass('active-input').focus();
            }
        });
    },
};

$(document).ready(function ($) {
    LMBaggage.init();
});