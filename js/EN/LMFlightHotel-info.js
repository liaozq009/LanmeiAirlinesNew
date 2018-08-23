
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
        
    },
};

$(document).ready(function ($) {
    lmFlightHotel.init();
});