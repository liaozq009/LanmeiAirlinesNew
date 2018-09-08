
var lmFlightHotel = {
    cityData: LMComData.cityData,
    fNumberData: LMComData.fNumberData,
    winWidth: $(window).width(),
    init: function () {
        this.initVal();
        this.hotelSelect();
        this.thSelect();
        this.selectThPeople();
        this.hotelModal();
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
            this.ticketSelect();
           
        }else{
            this.mobileEvent();
        }
    },

    /* 赋值 */
    initVal:function(){
        // 模糊匹配
        $('.js-from-input,.js-to-input').autoComplete();
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

        $('body').click(function(event) {
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

        //酒店日期选择
        $('.js-hotelDate-result').simpleDate({
            single:false,
            canlendarSingle:false,
            // startTimeVal:'2018-09-27',
            // endTimeVal:'2018-09-30',
            todaySelect:false,
            showTotleDay:true,
            outClickHide: false,
            container:'.js-hotelDate-container',
        },function(){
            setTimeout(function(){
                $('.js-people-result').click();
            },510);
        });

        // 航班日期选择
        function ticketDate(single){
            $('.js-date-result').simpleDate({
                single:single,
                canlendarSingle:false,
                // startTimeVal:'2018-08-28',
                // endTimeVal:'2018-08-29',
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

        // 酒店人数选择
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
            // e.stopPropagation();
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

    /* 机票+酒店人数选择 */
    selectThPeople:function(){
        var $roomResult = $('.js-p-ticketHotelRooms>span');
        var $adultResult = $('.js-p-ticketHotelAdult>span');
        var $childResult = $('.js-p-ticketHotelChild>span');

        $roomResult.html(1);
        $adultResult.html(1);
        $childResult.html(0);

        var $peopleCon = $('.js-child-container');

        function childAge(num){
            var ageStr = '<div class="age-rooms-com rooms-content-com js-thAge-1">'+
                '<div class="hotel-age-wrap people-number">'+
                '<span class="age-result js-thAge-result">'+num+'</span>'+
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
                '</div>';

            $peopleCon.append(ageStr);
        };

        $('.js-child-container').on('click','.js-thAge-result',function(e){
            e.stopPropagation();
            $('.js-thAge-box').hide();
            $(this).siblings('.js-thAge-box').show();
        });
        $peopleCon.on('click','.js-thAge-menu>li',function(){
            var text = $(this).html();
            $(this).parents('.js-thAge-box').siblings('span').html(text);
            $('.js-thAge-box').hide();
        });
        $('.js-ticketHotelPopup-people').click(function(event) {
            $('.js-thAge-box').hide();
        });

        // 动态改变房间数
        var resultNum;
        function changeRooms(adultNum,childNum){
            var totalNum = Math.ceil((parseInt(childNum)+parseInt(adultNum))/3);
            var singleNum = Math.ceil(parseInt(adultNum)/2);
            totalNum > singleNum ? resultNum=totalNum : resultNum=singleNum;
            $('.js-s-thRoom .rooms-num').html(resultNum);
        };

        // 房间
        var rooms = function(){
            $('.js-thRooms-add').click(function(){
                $(this).siblings('.sub-people').removeClass('off-sub-operation');
                var roomNum = $(this).siblings('span').html();
                if(parseInt(roomNum)<8){
                    roomNum++;
                    $(this).siblings('span').html(roomNum);
                    $roomResult.html(roomNum); //动态赋值
                    roomNum==8 && $(this).addClass('off-add-operation');
                }
            });

            $('.js-thRooms-sub').click(function(){
                $(this).siblings('.add-people').removeClass('off-add-operation');
                var roomNum = $(this).siblings('span').html();

                if(roomNum>resultNum){
                    roomNum--;
                    $(this).siblings('span').html(roomNum);
                    $roomResult.html(roomNum); //动态赋值
                    roomNum==resultNum && $(this).addClass('off-sub-operation');
                }
            });
        };

        // 成人
        var adult = function(){
            $('.js-thAdult-add').click(function(){
                $(this).siblings('.sub-people').removeClass('off-sub-operation');
                var childNum = $(this).parents('.js-s-thAdult').siblings('.js-s-thChild').find('.child-num').html();//获取小孩人数
                var adultNum = $(this).siblings('span').html();;//获取成人人数

                if(parseInt(childNum)+parseInt(adultNum)<8){
                    adultNum++;
                    $(this).siblings('span').html(adultNum);
                    $adultResult.html(adultNum); //动态赋值
                    // adultNum==2 && $(this).addClass('off-add-operation');

                    // 动态修改房间数
                   changeRooms(adultNum,childNum);
                }
            });
            $('.js-thAdult-sub').click(function(){
                $(this).siblings('.add-people').removeClass('off-add-operation');
                $(this).parents('.js-s-thAdult').siblings('.js-s-thChild').find('.child-num').html(0);//小孩人数归0
                $(this).parents('.js-s-thAdult').siblings('.js-s-thChild').find('.people-number').addClass('disable');
                $peopleCon.css('display','none');
                $('.js-child-container>div').remove();

                var adultNum = $(this).siblings('span').html();;//获取成人人数
                var childNum = $(this).parents('.js-s-thAdult').siblings('.js-s-thChild').find('.child-num').html();

                if(adultNum>1){
                    adultNum--;
                    $(this).siblings('span').html(adultNum);
                    $adultResult.html(adultNum); //动态赋值
                    // adultNum==1 && $(this).addClass('off-sub-operation');

                    // 动态修改房间数
                    changeRooms(adultNum,childNum);
                }
            });
        };

        // 小孩
        var child = function(){
            $('.js-thChild-add').click(function(){
                $(this).siblings('.sub-people').removeClass('off-sub-operation');
                var adultNum = $(this).parents('.js-s-thChild').siblings('.js-s-thAdult').find('.adult-num').html();
                var childNum = $(this).siblings('span').html();;//获取成人人数
                // if(parseInt(childNum)+parseInt(adultNum)<8){
                if(parseInt(childNum)<parseInt(adultNum)*2 && parseInt(childNum)+parseInt(adultNum)<8){
                    childNum++;
                    $peopleCon.css('display','inline-block');
                    $(this).siblings('span').html(childNum);
                    $childResult.html(childNum); //动态赋值
                    childAge(1);

                    // 动态修改房间数
                    changeRooms(adultNum,childNum);
                }else{
                    // $(this).addClass('off-add-operation');
                }

                if(childNum==1){
                    // $(this).siblings('.sub-people').removeClass('off-sub-operation');
                    $(this).parent().removeClass('disable');
                }
            });
            $('.js-thChild-sub').click(function(){
                $(this).siblings('.add-people').removeClass('off-add-operation');
                var childNum = $(this).siblings('span').html();;//获取成人人数
                var adultNum = $(this).parents('.js-s-thChild').siblings('.js-s-thAdult').find('.adult-num').html();
                childNum--;
                $('.js-child-container>div:last-child').remove();
                if(childNum<1){
                    childNum=0;
                    $peopleCon.css('display','none');
                    // $(this).addClass('off-sub-operation');
                    $(this).parent().addClass('disable');
                }
                $(this).siblings('span').html(childNum);
                $childResult.html(childNum); //动态赋值

                // 动态修改房间数
                changeRooms(adultNum,childNum);
            });
        };

        rooms();
        adult();
        child();

        /* 人数提示 */
        var showAdultTip = 0;
        var showChildTip = 0;
        var showInfantTip = 0;
        var screenWidth = window.screen.width;
        var tipFn = function(className,content,showTip){
            $(className).mouseenter(function(event) {
                if(screenWidth>767){
                    showTip = layer.tips(content, className,{
                        tips: [2, '#8ec060'],
                        time: 0
                    });
                }else{
                    showTip = layer.tips(content, className,{
                        tips: [3, '#8ec060'],
                        time: 0
                    });
                }
            }).mouseleave(function(event) {
                layer.close(showTip);
            });
        };
        tipFn('.thAdult-tip','Adult',showAdultTip);
        tipFn('.thChild-tip','Passengers who have not reached their 12th birthday by the date of the last flight are considered child passengers Children 7 years old and older can travel alone with the consent of their parents.',showChildTip);
    },

    /* 酒店模态框 */
    hotelModal:function(){
        // 谷歌地图
        function initMap(lat,lng){
            var coordinate = {lat: lat, lng: lng};
            var mapProp = {
                center: coordinate,
                zoom:8,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            var map=new google.maps.Map(document.getElementById("hotelMap"), mapProp);

            // 添加标记
            var marker = new google.maps.Marker({
                position: coordinate,
                map: map
            });

        };
        // 酒店详情弹出模态框
        $('.js-hotel-content').on('click','.js-hotel-title',function(e){
            e.preventDefault();e.stopPropagation();
            $('#hotelModal').modal();
            initMap(39.91,116.39);
        });

        // 酒店图片展示
        $('.js-hotelImg-wrap').viewer({
            url: 'data-original',
            title:false,
            tooltip:false,
            rotatable:false,
            scalable:false,
            zoomable:false,
        });
    },

    /* 移动端事件 */
    mobileEvent:function(){
        var that = this;
        var $dropdownMenu = $('.cityMenu-wrap');
        var $mask = $('.js-mobile-mask');
        var $result = $('.mobile-hotel-result');

        function ovfHiden(){
            $mask.show();
            $dropdownMenu.hide();
            $result.css('opacity','0');
            $('html,body').addClass('ovfHiden'); //使网页不可滚动
        };

        function remOvfHiden(){
            $mask.hide();
            $('html,body').removeClass('ovfHiden'); //使网页可滚动
            $dropdownMenu.hide();
            $result.css('opacity','1');
        };

        function cityFn(){
            $('.fromcityMenu,.tocityMenu').empty();
            $.each(that.cityData,function(i,val){
                $('.fromcityMenu,.tocityMenu').append('<li title="'+val+'">'+val+'</li>');
            });
        };

        $('.js-mobileMask-close').click(function(e) {
            remOvfHiden();
        });
        
        var cityFlag1 = true;
        var cityFlag2 = true;
        $('.js-from-input,.js-to-input').click(function(event) {
            event.stopPropagation();
            if(!cityFlag1){return};
            cityFlag1 = false;
            cityFlag2 = false;

            ovfHiden();
            cityFn();

            var that = this;
            $(this).siblings('.cityMenu-wrap').show();
            setTimeout(function(){
                cityFlag1 = true;
                cityFlag2 = true;
            }, 500);
        });

        $('.js-fromcityMenu,.js-tocityMenu').on('click','>li',function(){
            if(!cityFlag2){return};
            cityFlag1 = false;
            cityFlag2 = false;

            remOvfHiden();

            if($(this).parent('ul').hasClass('js-fromcityMenu')){
                setTimeout(function(){
                    $('.js-to-input').click();
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
            $box.siblings('input').val(text2[0]+'/'+text2[1]).attr('data-city',text2[1]); 
            setTimeout(function(){
               cityFlag1 = true;
               cityFlag2 = true;
            }, 500);
        });

        // 单程往返切换
        $('.js-select-way>a').click(function(event) {
            event.stopPropagation();
            $(this).addClass('active').siblings('a').removeClass('active');
            var data = $(this).attr('data-way');
            switch (data) {
                case 'round':
                    ticketDate(false);
                    $('#tripType').val('RT');
                break;
                case 'one':
                    ticketDate(true);
                    $('#tripType').val('OW');
                break;
            }
        });

        //酒店日期选择
        $('.js-hotelDate-result').simpleDate({
            single:false,
            canlendarSingle:true,
            todaySelect:false,
            showTotleDay:true,
            outClickHide: false,
            container:'.js-hotelDate-container',
        },function(){
            remOvfHiden();
            setTimeout(function(){
                $('.js-people-result').click();
            },510);
        });

        // 航班日期选择
        function ticketDate(single){
            $('.js-date-result').simpleDate({
                single:single,
                canlendarSingle:true,
                todaySelect:true,
                outClickHide: false,
                container:'.js-date-container',
            },function(){
                remOvfHiden();
                setTimeout(function(){
                    $('.js-hotelDate-result').click();
                },510);
            });
        };
        ticketDate(false);

        // 航班日期选择
        var dateFlag = true;
        $('.js-date-result,.js-hotelDate-result').click(function(event) {
            if(!dateFlag){return};
            dateFlag = false;
            event.stopPropagation();
            ovfHiden();
            $(this).siblings('.cityMenu-wrap').show();
            var that = this;
            setTimeout(function(){
               dateFlag = true;
            }, 500);
        });

        // 酒店人数选择
        var hotelFlag = true;
        $('.js-people-result').click(function(event) {
            if(!hotelFlag){return};
            hotelFlag = false;
            event.stopPropagation();
            ovfHiden();
            $(this).siblings('.cityMenu-wrap').show();
            var that = this;
            setTimeout(function(){
               hotelFlag = true;
            }, 500);
        });
    },

    /* 其他事件 */
    addEvend: function () {
        if(this.winWidth<992){
            $('.js-from-input,.js-to-input').attr('readonly',true);
        }

        //退改签规则
        $('.js-open-rules').click(function(event) {
            $('#ruleModal').modal();
        });
    },
};

$(document).ready(function ($) {
    lmFlightHotel.init();
});