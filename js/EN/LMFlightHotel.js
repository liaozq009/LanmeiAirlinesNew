
var lmFlightHotel = {
    cityData: LMComData.cityData,
    fNumberData: LMComData.fNumberData,
    winHeight: $(window).height(),
    init: function () {
        this.thSelect();
        this.addEvend();
    },

    /* 机票酒店选择 */
    thSelect:function(){

    },

    /* 其他事件 */
    addEvend: function () {
        $('.js-lm-section').height(this.winHeight-60);
    },
};

$(document).ready(function ($) {
    lmFlightHotel.init();
});