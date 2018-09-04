
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
        $('.js-group-edit').on('click','.js-pas-edit',function(e) {
            e.stopPropagation();
            $(this).attr('class','js-pas-ok').html('确定');
            $(this).parent('.form-group').siblings('.form-group').find('input').addClass('input-edit').attr('readonly',false);
        });
        $('.js-group-edit').on('click','.js-pas-ok',function(e) {
            console.log(333);
            e.stopPropagation();
            $(this).attr('class','js-pas-edit').html('编辑');
            $(this).parent('.form-group').siblings('.form-group').find('input').removeClass('input-edit').attr('readonly',true);
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