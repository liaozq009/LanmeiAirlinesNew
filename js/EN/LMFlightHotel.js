
var lmFlightHotel = {
    cityData: LMComData.cityData,
    fNumberData: LMComData.fNumberData,
    winHeight: $(window).height(),
    init: function () {
        this.initVal();
        this.ticketSelect();
        this.hotelSelect();
        this.thSelect();
        this.selectThRooms();
        this.addEvend();
    },

    /* 赋值 */
    initVal:function(){
        // 模糊匹配
        $('.js-from-input,.js-to-input').autoComplete();

        //酒店日期选择
        $('.js-hotelDate-result').simpleDate({
            single:false,
            canlendarSingle:false,
            todaySelect:false,
            showTotleDay:true,
            outClickHide: false,
            container:'.js-hotelDate-container',
        },function(){
            setTimeout(function(){
                $('.js-people-result').click();
            },510);
        });
    },

    /* 机票选择 */
    ticketSelect:function(){
        var that = this;
        function cityFn(){
            $('.fromcityMenu,.tocityMenu').empty();
            $.each(that.cityData,function(i,val){
                $('.fromcityMenu,.tocityMenu').append('<li title="'+val+'">'+val+'</li>');
            });
        };

        function cityVisble(){
            $('.js-from-city,.js-to-city').css('visibility','visible');
            $('.js-from-input,.js-to-input').css('visibility','hidden');
        };

        var $dropdownMenu = $('.cityMenu-wrap');

        $('html').click(function(event) {
            $dropdownMenu.hide();
            cityVisble();
        });
        $dropdownMenu.click(function(e) {
            e.stopPropagation();
        });
        $('.js-from-input,.js-to-input').click(function(e) {
           e.stopPropagation();
        });

        //出发地和目的地选择
        var cityFlag1 = true;
        var cityFlag2 = true;
        $('.js-from-city,.js-to-city').click(function(event) {
            event.stopPropagation();event.preventDefault();
            if(!cityFlag1){return};
            cityFlag1 = false;
            cityFlag2 = false;

            cityFn();

            $dropdownMenu.hide();
            $(this).siblings('.cityMenu-wrap').show();

            var that = this;
            var val = $(this).text();
            $(this).parents('.city-wrap-com').siblings('.city-wrap-com').find('.city-com>input').css('visibility','hidden').siblings('a').css('visibility','visible');
            $(this).addClass('animated2 moveOutLeft').css('visibility','hidden').siblings('.cityMenu-wrap').addClass('animated2 moveInUp').show();
            $(this).siblings('input').addClass('animated2 moveInRight').css('visibility','visible').focus().val(val);
            setTimeout(function(){
                $(that).removeClass('moveOutLeft').siblings('.cityMenu-wrap').removeClass('moveInUp');
                $(that).siblings('input').removeClass('moveInRight');
                cityFlag1 = true;
                cityFlag2 = true;
            }, 500);
        });

        $('.js-fromcityMenu,.js-tocityMenu').on('click','>li',function(){
            if(!cityFlag2){return};
            cityFlag1 = false;
            cityFlag2 = false;

            if($(this).parent('ul').hasClass('js-fromcityMenu')){
                setTimeout(function(){
                    $('.js-to-city').click();
                },510);
            }else{
                setTimeout(function(){
                    $('.js-date-result').click();
                },510);
            }

            var text1 = $(this).attr('title');
            var text2 = text1.split('/');
            var $box = $(this).parents('.cityMenu-wrap');
            $box.hide();
            $box.siblings('input').addClass('moveOutLeft').css('visibility','hidden').val(text2[0]+'/'+text2[1]).attr('data-city',text2[1]); 
            $box.siblings('a').addClass('moveInRight').css('visibility','visible').text(text2[0]);
            $(this).parents('.city-com').siblings('.three-code').text(text2[1]);
            setTimeout(function(){
               $box.siblings('input').removeClass('moveOutLeft');
               $box.siblings('a').show().removeClass('moveInRight');
               cityFlag1 = true;
               cityFlag2 = true;
            }, 500);
        });

        // 日期选择
        function ticketDate(single){
            $('.js-date-result').simpleDate({
                single:single,
                canlendarSingle:false,
                todaySelect:true,
                outClickHide: false,
                container:'.js-date-container',
            },function(){
                setTimeout(function(){
                    $('.js-hotelDate-result').click();
                },510);
            });
        };
        ticketDate(false);

        // 单程往返切换
        $('.js-select-way>a').click(function(event) {
            event.stopPropagation();
            $(this).addClass('active').siblings('a').removeClass('active');
            var data = $(this).attr('data-way');
            switch (data) {
                case 'round':
                    ticketDate(false);
                    $('.js-dataMenu-wrap').hide();
                    // $('#tripType').val('RT');
                break;
                case 'one':
                    ticketDate(true);
                    $('.js-dataMenu-wrap').hide();
                    // $('#tripType').val('OW');
                break;
            }
        });

        // 航班日期选择
        var dateFlag = true;
        $('.js-date-result,.js-hotelDate-result').click(function(event) {
            if(!dateFlag){return};
            dateFlag = false;
            event.stopPropagation();
            cityVisble();
            $dropdownMenu.hide();
            $(this).siblings('.cityMenu-wrap').addClass('animated2 moveInUp').show();
            var that = this;
            setTimeout(function(){
               $(that).siblings('.cityMenu-wrap').removeClass('moveInUp');
               dateFlag = true;
            }, 500);
        });

        // 酒店日期选择
        var hotelFlag = true;
        $('.js-people-result').click(function(event) {
            if(!hotelFlag){return};
            hotelFlag = false;
            event.stopPropagation();
            cityVisble();
            $dropdownMenu.hide();
            $(this).siblings('.cityMenu-wrap').addClass('animated2 moveInUp').show();
            var that = this;
            setTimeout(function(){
               $(that).siblings('.cityMenu-wrap').removeClass('moveInUp');
               hotelFlag = true;
            }, 500);
        });
    },

    /* 酒店选择 */
    hotelSelect:function(){
        var $rooms = $('.js-rooms-type');
        var $view = $('.js-view-room');
        var $close = $('.js-close-room');
        var $roomsUl = $('.js-rooms-type>ul');
        $roomsUl.click(function(e) {
            e.stopPropagation();
            $(this).parent().removeClass('room-type-slideDown');
            $(this).slideDown().addClass('active').siblings('ul').slideUp().removeClass('active');
            $(this).parents('.hotel-roomType-wrap').siblings('.hotel-viewOther-wrap').children('.js-view-room').show();
            $(this).parents('.hotel-roomType-wrap').siblings('.hotel-viewOther-wrap').children('.js-close-room').hide();
        });
        $view.click(function(e) {
            e.stopPropagation();
            $(this).hide().siblings('a').show();
            $(this).parent('.hotel-viewOther-wrap').siblings('.hotel-roomType-wrap').children('.js-rooms-type').addClass('room-type-slideDown');
            $(this).parent('.hotel-viewOther-wrap').siblings('.hotel-roomType-wrap').find('.room-type-content>ul').slideDown();
        });
        $close.click(function(e) {
            e.stopPropagation();
            $(this).hide().siblings('a').show();
            $(this).parent('.hotel-viewOther-wrap').siblings('.hotel-roomType-wrap').children('.js-rooms-type').removeClass('room-type-slideDown');
            $(this).parent('.hotel-viewOther-wrap').siblings('.hotel-roomType-wrap').find('.room-type-content>ul').not('.active').slideUp();
        });

        $('.js-hotel-content').on('click','.js-content-inner',function(event) {
            $(this).addClass('hotel-select-active').siblings('.hotel-content-inner').removeClass('hotel-select-active');
        });

        $('.js-hotel-title').click(function(e) {
            e.stopPropagation();
        });
    },

    /* 机票和酒店切换 */
    thSelect:function(){
        var flag = true;
        $('.js-flight-next').click(function(){
            if(!flag){return};
            flag = false;
            $('.js-flight-wrap').removeClass('bounceInLeft').addClass('animated bounceOutLeft');
            setTimeout(function(){
                $('.js-hotel-wrap').show().removeClass('bounceOutRight').addClass('animated bounceInRight');
                $('.js-flight-wrap').hide();
                flag = true;
            }, 1000);
        });
        $('.js-hotel-previous').click(function(event) {
            $('.js-hotel-wrap').removeClass('bounceInRight').addClass('animated bounceOutRight');
            setTimeout(function(){
                $('.js-flight-wrap').show().removeClass('bounceOutLeft').addClass('animated bounceInLeft');
                $('.js-hotel-wrap').hide();
                flag = true;
            }, 1000);
        });
    },

    /* 机票+酒店房间和人数选择 */
    selectThRooms:function(){
        /* 年龄选择 */
        var $that = this;
        var $thPopup = $('.js-ticketHotelPopup-people');
        $thPopup.on('click','.js-thAge-result',function(e){
            e.stopPropagation();
            $(this).siblings('.js-thAge-box').show();
        });
        $thPopup.on('click','.js-thAge-menu>li',function(){
            var text = $(this).html();
            $(this).parents('.js-thAge-box').siblings('span').html(text);
        });
        $thPopup.click(function(event) {
            $('.js-thAge-box').slideUp();
        });

        /* 增减房间数 */
        var $adultResult = $('.js-p-hotelAdult>span');
        var $childResult = $('.js-p-hotelChild>span');
        var $roomsResult = $('.js-p-hotelRooms>span');
        $childResult.text(0);
        // 增加房间
        var roomsNum = 1;
        $('.js-add-thRooms').click(function(event) {
            if(roomsNum<=2){
                roomsNum++;
                roomsStr(roomsNum);
            }
        });

        function roomsStr(roomsNum){
            var $roomStr = '<div class="s-room-'+roomsNum+' s-room-com s-people-com animated fadeInUp" id="js-thRoom'+roomsNum+'-inner">'+
                                '<p class="rooms-title js-thRooms-title">Room '+roomsNum+'</p>'+
                                '<div class="adult-rooms-content rooms-content-com js-thAdultRooms-content">'+
                                    '<div class="hotel-people-prompt people-prompt">'+
                                        '<p class="p1">Adult</p>'+
                                    '</div>'+
                                    '<div class="hotel-people-number people-number">'+
                                        '<a href="javascript:;" class="sub-people off-sub-operation js-ticketHotelAdult-sub"></a>'+
                                        '<span class="adult-num js-ticketHotelAdult-num">1</span>'+
                                        '<a href="javascript:;" class="add-people js-ticketHotelAdult-add"></a>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="child-rooms-content rooms-content-com js-thChildRooms-content">'+
                                    '<div class="hotel-people-prompt people-prompt">'+
                                        '<p class="p1">Child</p>'+
                                    '</div>'+
                                    '<div class="hotel-people-number people-number disable">'+
                                        '<a href="javascript:;" class="sub-people off-sub-operation js-ticketHotelChild-sub"></a>'+
                                        '<span class="adult-num js-ticketHotelChild-num">0</span>'+
                                        '<a href="javascript:;" class="add-people js-ticketHotelChild-add"></a>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="age-rooms-com rooms-content-com animated fadeInUp js-thAge-1">'+
                                    '<div class="hotel-people-prompt people-prompt">'+
                                        '<p class="p1">Age/1</p>'+
                                    '</div>'+
                                    '<div class="hotel-age-wrap people-number">'+
                                        '<span class="age-result js-thAge-result">1</span>'+
                                    '<div class="age-menu-box js-thAge-box">'+
                                        '<ul class="hotel-age-menu js-thAge-menu">'+
                                            '<li title="Age < 1 year old">&lt; 1</li>'+
                                            '<li>2</li>'+
                                            '<li>3</li>'+
                                            '<li>4</li>'+
                                            '<li>5</li>'+
                                            '<li>6</li>'+
                                            '<li>7</li>'+
                                            '<li>8</li>'+
                                            '<li>9</li>'+
                                            '<li>10</li>'+
                                            '<li>11</li>'+
                                            '<li>12</li>'+
                                        '</ul>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';

            var $roomTab = '<p class="" data-room="js-thRoom'+roomsNum+'-inner"><span>Room '+roomsNum+'</span><b>×</b></p>';

            $('.js-thRooms-container').append($roomStr);
            $('.js-add-thRoomsTab').append($roomTab);

            var adultNum = $adultResult.html();
            $adultResult.html(Number(adultNum)+1);

            var roomsTotletNum = $roomsResult.html();
            roomsTotletNum++;
            $roomsResult.html(roomsTotletNum);
        };
        roomsStr(1);
        
        // 删减房间
        $('.js-add-thRoomsTab').on('click','b',function(){
            roomsNum--;
            var id = $(this).parent('p').attr('data-room');

            // 动态修改成人人数统计值
            var adultNum = $adultResult.html();
            var html = $('#'+id).find('.js-ticketHotelAdult-num').html();
            adultNum-=Number(html);
            $adultResult.html(adultNum);

            // 动态修改小孩人数统计值
            var childNum = $childResult.html();
            var html = $('#'+id).find('.js-ticketHotelChild-num').html();
            childNum-=Number(html);
            $childResult.html(childNum);

            // 动态修改房间数统计值
            var roomsTotletNum = $roomsResult.html();
            roomsTotletNum--;
            $roomsResult.html(roomsTotletNum);

            $('#'+id).remove();
            $(this).parent('p').remove();

            if(Number($childResult.text())==0){
                $('.js-ticketHotelPopup-people').css('width',750);
            }

            // 动态修改房间数值
            $('.js-thRooms-container>div:first').attr('id','js-thRoom1-inner'); //第一个
            $('.js-thRooms-container>div:first').children('.js-thRooms-title').html('Room 1'); //第一个
            $('.js-thRooms-container>div').eq(1).attr('id','js-thRoom2-inner'); //第二个
            $('.js-thRooms-container>div').eq(1).children('.js-thRooms-title').html('Room 2'); //第二个

            $('.js-add-thRoomsTab>p:first').attr('data-room','js-thRoom1-inner'); //第一个tab
            $('.js-add-thRoomsTab>p:first').children('span').html('Room 1'); //第一个tab的值
            $('.js-add-thRoomsTab>p').eq(1).attr('data-room','js-thRoom2-inner'); //第二个tab
            $('.js-add-thRoomsTab>p').eq(1).children('span').html('Room 2'); //第二个tab的值
        });

        /* 增减人数 */
        // 成人
        var adult = function(){
            $thPopup.on('click','.js-ticketHotelAdult-add',function(e){
                var adultNum = $(this).siblings('span').html();
                adultNum++;
                $(this).siblings('.sub-people').removeClass('off-sub-operation');
                adultNum==2 && $(this).addClass('off-add-operation');
                if(adultNum>2){
                    return;
                };
                $(this).siblings('span').html(adultNum);

                //动态赋值
                var spanVal = 0;
                var spanArray = $('.js-ticketHotelAdult-num');
                $.each(spanArray,function(idx, val) {
                    spanVal+=Number($(val).html());
                });
                $adultResult.html(spanVal); 
            });
            $thPopup.on('click','.js-ticketHotelAdult-sub',function(e){
                var adultNum = $(this).siblings('span').html();
                adultNum--;
                $(this).siblings('.add-people').removeClass('off-add-operation');
                adultNum==1 && $(this).addClass('off-sub-operation');
                if(adultNum<=1){
                   return;
                }
                $(this).siblings('span').html(adultNum);
                
                //动态赋值
                var spanVal = 0;
                var spanArray = $('.js-ticketHotelAdult-num');
                $.each(spanArray,function(idx, val) {
                    spanVal+=Number($(val).html());
                });
                $adultResult.html(spanVal); 
            });
        };

        // 小孩
        var child = function(){
            // 动态增减年龄
            var changeAge = function(that,childNum){
                var $age1 = that.parents('.js-thChildRooms-content').siblings('.js-thAge-1');
                $age1.show();
            };

            $thPopup.on('click','.js-ticketHotelChild-add',function(e){
                var childNum = $(this).siblings('span').html();
                childNum++;
                $(this).siblings('.sub-people').removeClass('off-sub-operation');

                if(childNum==1){
                    $(this).addClass('off-add-operation');
                    $(this).siblings('.sub-people').removeClass('off-sub-operation');
                    $(this).parent().removeClass('disable');
                    $('.js-ticketHotelPopup-people').css('width',950);
                }
                if(childNum>1){
                    return;
                };
                
                $(this).siblings('span').html(childNum);

                //动态赋值
                var spanVal = 0;
                var spanArray = $('.js-ticketHotelChild-num');
                $.each(spanArray,function(idx, val) {
                    spanVal+=Number($(val).html());
                });
                $childResult.html(spanVal); 

                // 动态增减年龄
                var that = this;
                setTimeout(function(){
                    $(that).parents('.js-thChildRooms-content').siblings('.js-thAge-1').show();
                },500);
            });

            $thPopup.on('click','.js-ticketHotelChild-sub',function(e){
                var childNum = $(this).siblings('span').html();
                childNum--;
                if(childNum<1){
                    childNum=0;
                    $(this).addClass('off-sub-operation');
                    $(this).parent().addClass('disable');
                }
                $(this).siblings('.add-people').removeClass('off-add-operation');
                $(this).siblings('span').html(childNum);
                
                var spanVal = 0;
                var spanArray = $('.js-ticketHotelChild-num');
                $.each(spanArray,function(idx, val) {
                    spanVal+=Number($(val).html());
                });
                $childResult.html(spanVal); 

                if(Number($childResult.text())==0){
                    $('.js-ticketHotelPopup-people').css('width',750);
                }

                // 动态增减年龄
                $(this).parents('.js-thChildRooms-content').siblings('.js-thAge-1').hide();
            });
        };

        adult();
        child();
    },

    /* 其他事件 */
    addEvend: function () {
        // $('.js-lm-section').height(this.winHeight-60);
    },
};

$(document).ready(function ($) {
    lmFlightHotel.init();
});