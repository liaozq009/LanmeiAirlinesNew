
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
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        touchMove:true,
                    }
                }
            ],
        });
        $('.js-catering-prev').click(function(event) {
            $cateringSlick.slick('slickPrev');
        });
        $('.js-catering-next').click(function(event) {
            $cateringSlick.slick('slickNext');
        });

        // 展开购物车
        var $shopMask = $('.js-shopping-mask');
        var $bigCart = $('.js-big-cart');
        var $smallCart = $('.js-small-cart');
        $smallCart.click(function(){
            $shopMask.fadeIn();
            $bigCart.animate({right:"0"},300);
            $(this).animate({right:"-90px"},300).children('.small-cart-num').animate({right:"-66px"},800);
            // $('html,body').addClass('ovfHiden'); //使网页不可滚动
        });

        // 点击遮罩
        var winWidth = $(window).width();
        $shopMask.click(function(event) {
            $(this).fadeOut();
            $bigCart.animate({right:"-255px"},300);
            if(winWidth>767){
                $smallCart.animate({right:"0px"},300).children('.small-cart-num').animate({right:"66px"},800);
            }else{
                $smallCart.animate({right:"0px"},300).children('.small-cart-num').animate({right:"20px"},800);
            }
            // $('html,body').removeClass('ovfHiden'); //使网页可滚动
        });

        // 加入购物车
        var catering_num = 0;
        var $shopping_con = $('.js-shopping-content');
        var cart_arr = [];
        $('.js-add-catering').click(function(event) {
            catering_num = $(this).siblings('span').html();
            catering_num++;
            $(this).siblings('span').html(catering_num);
            $(this).siblings('a').removeClass('off-sub-operation');
            var price = $(this).parent().siblings('.js-catering-price').children('span').html();
            var name = $(this).parents('.catering-price-wrap').siblings('h2').html();
            var data_name = $(this).parents('.catering-price-wrap').siblings('h2').attr('id');

            var $child = '<div class="shopping-list-wrap '+data_name+'" data-name="'+data_name+'">'+
                            '<h3 class="shopping-list-title">'+name+'</h3>'+
                            '<p class="shopping-list-content">'+
                                '$ <span class="shopping-list-price">'+price+'</span> x <span class="shopping-list-num">1</span>'+
                                '<b class="delete-catering js-delete-catering">×</b>'+
                            '</p>'+
                        '</div>';
            $shopping_con.append($child);

            // 计算商品数量和价格
            checkout();

        });
        $('.js-sub-catering').click(function(event) {
            catering_num = $(this).siblings('span').html();
            if(catering_num>0){
                catering_num--;
                $(this).siblings('span').html(catering_num);
            }else{
                $(this).addClass('off-sub-operation');
                return;
            }
            var price = $(this).parent().siblings('.js-catering-price').children('span').html();
            var name = $(this).parents('.catering-price-wrap').siblings('h2').html();
            var data_name = $(this).parents('.catering-price-wrap').siblings('h2').attr('id');
            $('.'+data_name)[0].remove();

            // 计算商品数量和价格
            checkout();
        });

        // 计算商品数量和价格
        var checkout = function(){
            var totle_num = $shopping_con.children('div').length;
            $('.js-cart-num').html(totle_num);

            var $child = $shopping_con.children('div').find('.shopping-list-price');
            var totle_price = 0;
            $.each($child,function(i,v){
                totle_price += Number($(v).html());
            });
            $('.js-shopping-pay span').html(totle_price.toFixed(2));
        };

        // 删除物品
        $shopping_con.on('click','.js-delete-catering',function(event) {
            var $wrap = $(this).parents('.shopping-list-wrap');
            $wrap.remove();
            var data_name = $wrap.attr('data-name');

            var $num = $('#'+data_name).siblings('div').find('.js-catering-num');
            var curVal = $num.html();
            $num.html(curVal-1);

            // 计算商品数量和价格
            checkout();
        });
    },
};

$(document).ready(function ($) {
    LMCatering.init();
});