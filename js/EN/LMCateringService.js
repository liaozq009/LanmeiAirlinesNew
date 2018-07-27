
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
        var hideShopping = function(){
            $bigCart.animate({right:"-255px"},300);
            if(winWidth>767){
                $smallCart.animate({right:"0px"},300).children('.small-cart-num').animate({right:"66px"},800);
            }else{
                $smallCart.animate({right:"0px"},300).children('.small-cart-num').animate({right:"20px"},800);
            }
        };
        $shopMask.click(function(event) {
            $(this).fadeOut();
            hideShopping();
        });

        // 加入购物车
        var catering_num = 0;
        var $shopping_con = $('.js-shopping-content');
        var cart_arr = [];
        $('.js-catering-container').on('click','.js-add-catering',function(event) {
            catering_num = $(this).siblings('span').html();
            catering_num++;
            var $parents = $(this).parents('.js-cateringPrice-wrap');
            $parents.find('.js-catering-num').html(catering_num);
            $parents.find('.js-sub-catering').removeClass('off-sub-operation');
            var price = $parents.find('.js-catering-price').children('span').html();
            var name = $parents.siblings('h2').html();
            var data_id = $parents.siblings('h2').attr('id');

            var _sourceImg = $parents.siblings('.catering-img');
            var _back=function(){};
            var _target=$(".js-small-cart");

            // ie兼容性判断
            if (document.all && document.addEventListener && !window.atob) {
                // alert('IE9');
            }else if (document.all && document.querySelector && !document.addEventListener) {
                // alert('IE8');
            }else{
                 objectFlyIn(_sourceImg,_target,_back);
            }

            var $child = '<div class="shopping-list-wrap '+data_id+'" data-id="'+data_id+'">'+
                            '<h3 class="shopping-list-title">'+name+'</h3>'+
                            '<p class="shopping-list-content">'+
                                '$ <span class="shopping-list-price">'+price+'</span>'+
                            '</p>'+
                            '<div class="catering-num-wrap">'+
                                '<a href="javascript:;" class="sub-catering js-sub-catering"></a>'+
                                '<span class="catering-num js-catering-num">1</span>'+
                                '<a href="javascript:;" class="add-catering js-add-catering"></a>'+
                            '</div>'+
                        '</div>';

            var $shopping_list = $shopping_con.children('div');
           
            var toggle = 0; //0代表没有相同产品，1代表有相同产品
            $.each($shopping_list,function(i,v){
                if($(v).attr('data-id')==data_id){
                    $('.'+data_id).find('.js-catering-num').html(catering_num);
                    toggle = 1;
                    return;
                }
            });
            if(toggle == 0){
                $shopping_con.append($child);
            }

            // 计算商品数量和价格
            checkout();
        });

        // 商品飞起来
        function objectFlyIn(_sourceImg,_target, _back) {
            var addOffset =_target.offset();
            var scrollTop = $(window).scrollTop(); //卷去的高度
            var scrollLeft = $(window).scrollLeft(); //卷去的宽度

            var img = _sourceImg;
            var flyer = $('<img style="display: block;width: 50px;height: 50px;border-radius: 50%;" src="' + img.attr('src') + '">');
            var X,Y;

            if(img.offset()){
                X = img.offset().left - scrollLeft;
                Y = img.offset().top - scrollTop;
            }
            console.log(img.width());
            flyer.fly({
                start: {
                    left: X + img.width() / 2 - 25, //开始位置（必填）
                    top: Y + img.height() / 2 - 25 //开始位置（必填）
                },
                end: {
                    left: addOffset.left + 10, //结束位置（必填）
                    top: addOffset.top - scrollTop, //结束位置（必填）
                    width: 10, //结束时宽度
                    height: 10 //结束时高度
                },
                onEnd: function () { //结束回调
                    this.destroy(); //移除dom
                    _back();
                }
            });
        };

        $('.js-cateringPrice-wrap').on('click','.js-sub-catering',function(event) {
            var $parents = $(this).parents('.js-cateringPrice-wrap');
            var data_id = $parents.siblings('h2').attr('id');

            catering_num = $(this).siblings('span').html();
            if(catering_num>0){
                catering_num--;
                $(this).siblings('span').html(catering_num);
            }else{
                $(this).addClass('off-sub-operation');
                return;
            }
           
            var $shopping_list = $shopping_con.children('div');
            
            var toggle = 0; //0代表没有相同产品，1代表有相同产品
            $.each($shopping_list,function(i,v){
                if($(v).attr('data-id')==data_id){
                    if(catering_num==0){
                        $('.'+data_id).remove();
                    }
                    $('.'+data_id).find('.js-catering-num').html(catering_num);
                    return;
                }
            });

            // 计算商品数量和价格
            checkout();
        });

        // 购物车里面加减商品 
        var shopping_num = 0;
        $('.js-shopping-content').on('click','.js-add-catering',function(event) {
            shopping_num = $(this).siblings('span').html();
            shopping_num++;
            $(this).siblings('.js-catering-num').html(shopping_num);
            var data_id = $(this).parents('.shopping-list-wrap').attr('data-id');
            $(this).siblings('.js-sub-catering').removeClass('off-sub-operation');
            $('#'+data_id).siblings('.js-cateringPrice-wrap').find('.js-catering-num').html(shopping_num);

            // 计算商品数量和价格
            checkout();
        });
        $('.js-shopping-content').on('click','.js-sub-catering',function(event) {
            shopping_num = $(this).siblings('span').html();
            shopping_num--;

            $(this).siblings('.js-catering-num').html(shopping_num);
            var data_id = $(this).parents('.shopping-list-wrap').attr('data-id');
            $('#'+data_id).siblings('.js-cateringPrice-wrap').find('.js-catering-num').html(shopping_num);

            if(shopping_num==0){
                $('.'+data_id).remove();
                $('#'+data_id).siblings('.js-cateringPrice-wrap').find('.js-sub-catering').addClass('off-sub-operation');
            }

            // 计算商品数量和价格
            checkout();
        });

        // 计算商品数量和价格
        var checkout = function(){
            var totle_num = $shopping_con.children('div').length;
            $('.js-cart-num').html(totle_num);

            var $child = $shopping_con.children('div');
            var totle_price = 0;
            $.each($child,function(i,v){ 
                totle_price += (Number($(v).find('.shopping-list-price').html()) * Number($(v).find('.js-catering-num').html()) );
            });
            $('.js-shopping-pay span').html(totle_price.toFixed(2));
        };

        // 选择支付方式
        $('.js-pay-select>a').click(function(event) {
            $(this).addClass('active').siblings('a').removeClass('active');
            var dataPay = $(this).attr('data-pay');
            $('.js-pay-method').val(dataPay);
        });

        // 支付
        $('.js-shopping-pay').click(function(event) {
            $('#payModal').modal();
            $shopMask.fadeOut();
            hideShopping();
        });

        $('.js-catering-img').click(function(event) {
            var data = $(this).attr('data');
            layer.open({
                area: ['auto', 'auto'],
                type: 1,
                shadeClose: true,
                title: false, //不显示标题
                content: '餐食成分...'
            });
        });
    },
};

$(document).ready(function ($) {
    LMCatering.init();
});