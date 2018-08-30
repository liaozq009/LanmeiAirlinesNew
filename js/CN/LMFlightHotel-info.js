
var lmFlightHotel = {
    winWidth: $(window).width(),
    init: function () {
        this.isPc();
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

    /* 其他事件 */
    addEvend: function () {
        // 生日选择
        $(".js-birthday").jeDate({
            isinitVal: false,
            festival: false,
            ishmsVal: false,
            minDate: '1900-06-16',
            maxDate: $.nowDate({
                DD: 0
            }),
            format: "YYYY-MM-DD",
            zIndex: 3000,
        });

        //护照有效期
        $(".js-validity").jeDate({
            isinitVal: false,
            festival: false,
            ishmsVal: false,
            format: "YYYY-MM-DD",
            zIndex: 3000,
        });

        //下拉选择
        $('.js-sex-input,.js-nation-input,.js-code-input').click(function(e) {
            e.stopPropagation();
            $(this).siblings('.js-dropdown-menu').show();
        });
        $('.js-dropdown-menu>li>a').click(function(e) {
            $(this).parents('.js-dropdown-menu').siblings('input').val($(this).html());
        });
        $('html').click(function(event) {
            $('.js-dropdown-menu').hide();
        });

        // 选择支付方式
        $('.js-pay-select>a').click(function(event) {
            $(this).addClass('active').siblings('a').removeClass('active');
            var dataPay = $(this).attr('data-pay');
            $('.js-pay-method').val(dataPay);
        });
    },
};

$(document).ready(function ($) {
    lmFlightHotel.init();
});