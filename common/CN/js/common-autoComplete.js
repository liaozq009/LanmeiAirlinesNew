
//检测此前是否已经引入了jquery.js
if(!window.jQuery){
	throw new Error("本函数库必须依赖于jQuery");
}

;(function($,window,document,undefined){
	//需要设置为直接的名字
	var pluginName = "autoComplete";
	//默认配置项
	var defaults = {
		
	};
	//插件类
	function Plugin(element,options){
		//拿到dom元素，获得对应jq对象，要$(element)
		this.element = $(element);
		//覆盖默认配置项
		this.options = $.extend({},defaults,options);
		
		//调用初始函数
		this.init();
	}
	Plugin.prototype.init = function(){
		this.element.on('input',function(event) {
		    var searchText = $(this).val();
		    var currenData;
		    var data = $(this).attr('data');

		    switch (data) {
		        case 'fromcityMenu':
		            currenData=LMComData.cityData
		            break;
		        case 'tocityMenu':
		            currenData=LMComData.cityData
		            break;
		        case 'flightMenu':
		            currenData=LMComData.fNumberData
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
	};
	
	//fn就是prototype
	$.fn[pluginName] = function(options){
		//each表示对多个元素调用，用return 是为了返回this，进行链式调用
		return this.each(function(){
			//判断有没有插件名字 如果你不愿意加if 直接new就好了
			if(!$.data(this,'plugin_'+pluginName)){
				//生成插件类实例。
				$.data(this,'plugin_'+pluginName,new Plugin(this,options));
			}
		});
	};
})(jQuery,window,document);