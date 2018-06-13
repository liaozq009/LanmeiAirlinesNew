
var LMCatering = {
    fNumberData: LMComData.fNumberData,
    init: function () {
        var $dropdownMenu = $('.dropdownMenu-wrap');
        // 航班号
        $.each(this.fNumberData,function(i,val){
            $('.flightMenu').append('<li title="'+val+'">'+val+'</li>');
        });
        $('.js-flightNum-input').click(function(event) {
           event.stopPropagation();
           $dropdownMenu.hide();
           $(this).siblings('.dropdownMenu-wrap').show();
        });

        // 点击下拉框选项后
       $dropdownMenu.on('click','.menu-com li',function(e){
            var val = $(this).attr('title');
            $(this).parents('.dropdownMenu-wrap').hide().siblings('input').val(val);
            $('.js-date-input').click(); //自动点击日期控件

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

        // 餐食滑动选择 
        var $cateringSlick = $(".js-catering-slick");
        $cateringSlick.slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: true,
            arrows:false,
            touchMove:false,
        });
        $('.js-catering-prev').click(function(event) {
            $cateringSlick.slick('slickPrev');
        });
        $('.js-catering-next').click(function(event) {
            $cateringSlick.slick('slickNext');
        });

        // 展开购物车
        var $shopMask = $('.js-shopping-mask');
        $('.js-small-cart').click(function(){
            // 遮罩显示
            // $shopMask.show();

            $('.js-big-cart').animate({right:"0"},300);
            $(this).animate({right:"-90px"},300).children('.small-cart-num').animate({right:"-66px"},800);
        });

    },
};

$(document).ready(function ($) {
    LMCatering.init();
});