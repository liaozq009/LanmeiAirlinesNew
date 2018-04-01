
var cities = {
    "A": [["Cambodia","Sihanouk ville/KOS/Cambodia","KOS"],["Macao","Macao/MFM/Macao,China","MFM"],["Cambodia","Phnom Penh/PNH/Cambodia","PNH"],["Cambodia","Siem Reap/REP/Cambodia","REP"],["Vietnam","Ho Chi Minh/SGN/Vietnam","SGN"],["Vietnam","Hanoi/HAN/Vietnam","HAN"],["HongKong","HongKong/HKG/Hong Kong,China","HKG"],["Korea","SEOUL/ICN/Korea","ICN"]],
    // "A": [["anshun","安顺","as"]],
    // "B": [['pek','北京','beijing'],["baoding","保定","bd"]],
    // "C": [['csx','长沙','changsha','cs'],['ctu','成都','chengdu','cd'],['ckg','重庆','chongqing','cq']],
    // "F": [['foc','福州','fuzhou','fz']],
    // "G": [['can','广州','guangzhou','gz']],
    // "H": [['hfe','合肥','hefei','hf']],
    // "J": [['tna','济南','jinan','jn']],
    // "L": ["柳州"],
    // "N": ["南宁"],
    // "Q": ["泉州"],
    // "S": [['szx','深圳','shenzhen','sz']],
    // "T": ["太原"],
    // "X": ["西昌","厦门","西安"],
    // "Y": ["玉溪","义乌"],
    // "Z": ["湛江","增城"],
};

(function ($, win, doc) {
    //默认配置项
    var defaults = {
        propertyName : "value",
        FCity:'出发',
        TCity:'到达',
    };

    var CityPicker = function (el, options) {
        this.el = $(el);
        this.options = $.extend(defaults,options);
        this.cityId = options.cityId;
        this.cities = cities;
        this.pro = null;
        this.city = null;
        this.elType = this.el.is('input');

        this.FCity = this.options.FCity;
        this.TCity = this.options.TCity;

        this.init();
    };
    var p = CityPicker.prototype;

    p.init = function () {
        this.initEvent();
        this.preventPopKeyboard();

    };

    p.preventPopKeyboard = function () {
        if (this.elType) {
            // this.el.prop("readonly", true);
        }
    };

    p.initEvent = function () {
        var that = this;
        this.el.on("focus", function (e) {
            var pickerBox = $("#"+that.cityId+"-box");
            if (pickerBox[0]) {
                pickerBox.fadeIn();
                $('.local-search-box').val('');
                $('.search-box').fadeOut();
                $('.pro-picker').fadeIn();
                $('html,body').addClass('ovfHiden'); //使网页不可滚动
            } else {
                that.create();
                $('.local-search-box').val('');
                $('.search-box').fadeOut();
                $('.pro-picker').fadeIn();
                $('html,body').addClass('ovfHiden'); //使网页不可滚动
            }
        });
    };

    p.create = function () {
        this.createCityPickerBox();
        this.createSearch();
        this.searchKeyup();
        this.createCityList();
        this.cityClick();
        this.createNavBar();
        this.navEvent();
    };

    p.createCityPickerBox = function () {
        var proBox = "<div class='picker-box' id='"+this.cityId+"-box'></div>";
        $("body").append(proBox);
    };

    p.createSearch = function(){
        var that = this;
        var location;
        this.cityId == 'startCity' ? location=this.FCity : location=this.TCity;

        var searchBox = "<div class='picker-topBox' id='"+this.cityId+"-searchBox'><div class='picker-backBox'><img src='libs/mobile-libs/city/back-arrow.png' id='"+this.cityId+"-back' />"+location+"</div><div class='picker-searchBox'><input type='text' name='' class='local-search-box' id='"+this.cityId+"-input' value='' placeholder='' ><img src='libs/mobile-libs/city/city-search.png' id='"+this.cityId+"-search' /><p class='picker-cancel' id='"+this.cityId+"-cancel'>取消</p></div></div>";
        $("#"+this.cityId+"-box").append(searchBox);
        // input动效
        // var width = $(window).width();
        // $("#"+this.cityId+"-input").on('click',function(){
        //     $(this).animate({width:width-100}, 300);
        // });
        // $("#"+this.cityId+"-cancel").on('click',function(){
        //     $(this).siblings('input').animate({width:'100%'}, 300);
        // });

        // 后退
        $("#"+this.cityId+"-back").on('click',function(){
            $("#"+that.cityId+"-box").fadeOut();
            $('html,body').removeClass('ovfHiden'); //使网页恢复可滚
        });
    };

    p.searchKeyup = function(){
        // 创建搜索结果容器
        var searchBox = "<div class='search-box'></div>";
        $('.picker-topBox').after(searchBox);

        //向后台搜索关键词
        var _tick = null;
        $('.local-search-box').on('keyup',function(event) {
            //获取输入的关键词
            var kw = $(this).val();
            if (_tick) clearTimeout(_tick);
            _tick = setTimeout(function() {
                $('.search-box').empty();
                var currentVal =  kw.toLowerCase();

                var srdata = {};

                for(var cityKey in cities){ //获取A B C里面的内容
                    for(var subKey in cities[cityKey]){ //遍历城市数组，获取单个城市数组
                        var cityArray = cities[cityKey][subKey];
                        for(var i=0; i<cityArray.length; i++){ 
                            if (currentVal.trim().length > 0 && cityArray[i].toLowerCase().indexOf(currentVal) > -1 ) {
                                srdata[cityArray[2]] = cityArray[1]; //显示拼音和中文
                            }
                        }
                    }
                }

                if(srdata!=[]){
                     $('.search-box').fadeIn();
                     $('.pro-picker').fadeOut();
                    for(var srdataKey in srdata){
                        var resultCities = "<a href='javascript:void(0)'><span class='u-citytip-word'>"+srdataKey+"</span><span class='u-citytip-name'>"+srdata[srdataKey]+"</span></a>";
                        $('.search-box').append(resultCities);
                    }
                    if(currentVal===''){
                       $('.pro-picker').fadeIn();
                       $('.search-box').fadeOut();
                    }
                }
            }, 1000);
        });

        // 点击搜索结果后执行函数 
        var that = this;
        $('.search-box').on('click','a',function(){
            that.el.val($(this).children('.u-citytip-name').html());
            $('.picker-box').fadeOut();
        });
    };

    p.createCityList = function () {
        var cities = this.cities;
        var proBox;
        var dl = "";
        for (var letterKey in cities) {
            var val = cities[letterKey];
            if (cities.hasOwnProperty(letterKey)) {
                var dt = "<dt id='" + letterKey + "-"+this.cityId+"'>" + letterKey + "</dt>";
                var dd = "";
                for (var proKey in val) {
                    if (val.hasOwnProperty(proKey)) {
                        dd += "<dd data-letter=" + letterKey + ">" + val[proKey][1] + "</dd>";
                    }
                }
                dl += "<dl>" + dt + dd + "</dl>";
            }
        }

        proBox = "<section class='pro-picker' id='"+this.cityId+"-pro'>" + dl + "</section>";

        $("#"+this.cityId+"-box").append(proBox);
    };

    p.cityClick = function () { //选中城市
        var that = this;
        $("#"+this.cityId+"-pro").on("click", function (e) {
            var target = e.target;
            if ($(target).is("dd")) {
                that.pro = $(target).html();
                var letter = $(target).data("letter");
                // that.createCityList(letter, that.pro);
                
                if (that.elType) {
                    that.el.val(that.pro);
                } else {
                    that.el.html(that.pro );
                }

                $("#"+that.cityId+"-box").fadeOut();
                $('html,body').removeClass('ovfHiden'); //使网页恢复可滚
            }
        });
    };

    p.createNavBar = function () { //创建侧边拼音栏
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var arr = str.split("");
        var a = "";
        var that = this;
        arr.forEach(function (item, i) {
            a += '<a href="#' + item + '-'+that.cityId+'">' + item + '</a>';
        });

        var div = '<div class="navbar">' + a + '</div>';

        $("#"+this.cityId+"-box").append(div);
    };

    p.navEvent = function () { //手指拖动拼音栏
        var that = this;
        var navBar = $(".navbar");
        var width = navBar.find("a").width();
        var height = navBar.find("a").height();
        navBar.on("touchstart", function (e) {
            $(this).addClass("active"); //增加灰色半透明背景
            that.createLetterPrompt($(e.target).html());
        });

        // navBar.on("touchmove", function (e) {
        //     e.preventDefault();
        //     var touch = e.originalEvent.touches[0];
        //     var pos = {"x": touch.pageX, "y": touch.pageY};
        //     var x = pos.x, y = pos.y;
        //     $(this).find("a").each(function (i, item) {
        //         var offset = $(item).offset();
        //         var left = offset.left, top = offset.top;
        //         if (x > left && x < (left + width) && y > top && y < (top + height)) {
        //             location.href = item.href;
        //             that.changeLetter($(item).html());
        //         }
        //     });
        // });

        navBar.on("touchend", function () {
            $(this).removeClass("active");
            $(".prompt-"+that.cityId).fadeOut();
        });
    };

    p.createLetterPrompt = function (letter) { //创建提示字母
        var prompt = $(".prompt-"+this.cityId);
        if (prompt[0]) {
            prompt.html(letter);
            prompt.show();
        } else {
            var span = "<span class='prompt prompt-"+this.cityId+"'>" + letter + "</span>";
            $("#"+this.cityId+"-box").append(span);
        }
    };


    p.changeLetter = function (letter) {
        var prompt = $(".prompt-"+this.cityId);
        prompt.html(letter);
    };

    $.fn.CityPicker = function (options) { //在原型中定义方法
        
        return new CityPicker(this, options);
    };
}(window.jQuery,document));