
var LMBaggage = {
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
        this.autoComplete('.js-flightNum-input');

        // 日期选择
        $('.js-date-input').simpleDate({
            single:true,
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
        });
    },
    /* 模糊匹配 */
    autoComplete:function(id){
        var that = this;
        /* 机票模糊匹配 */
        $(id).on('input',function(event) {
            var searchText = $(this).val();
            var currenData;
            var data = $(this).attr('data');

            switch (data) {
                case 'fromcityMenu':
                    currenData=that.cityData
                    break;
                case 'tocityMenu':
                    currenData=that.cityData
                    break;
                case 'flightMenu':
                    currenData=that.fNumberData
                    break;
            }

            var currentVal = searchText.toLowerCase();
            var srdata = [];
            for (var i = 0; i < currenData.length; i++) {
                if (currentVal.trim().length > 0 && currenData[i].toLowerCase().indexOf(currentVal) > -1) {
                    srdata.push(currenData[i]);
                }
            }

            $('.'+data).empty();
            var escapedSearchText,zregex,startpos,text,searchVal;
            $.each(srdata,function(i,val){
                escapedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                zregex = new RegExp(escapedSearchText, 'i');
                startpos = val.search(zregex);
                text = val.substr(0, startpos + searchText.length) + '</span>' + val.substr(startpos + searchText.length);
                searchVal = text.substr(0, startpos) + '<span>' + text.substr(startpos);

                $('.'+data).append('<li title="'+val+'">'+searchVal+'</li>');
            });
            if(srdata.length==0){ 
                $('.'+data).append('<li class="no-result-match">No results match "'+searchText+'"</li>');
            }
            if(currentVal===''){
                $('.'+data).empty();
                $.each(currenData,function(i,val){
                    $('.'+data).append('<li title="'+val+'">'+val+'</li>');
                });
            }
        });
    },
};

$(document).ready(function ($) {
    LMBaggage.init();
});