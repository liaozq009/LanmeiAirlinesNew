
var poly;
var map;
var markers = [];

function initMap() {
	/* 初始化map */
	map = new google.maps.Map(document.getElementById('hotelMap'), {
		zoom:7,
		center: {lat: 23.15, lng: 113.25},
		mapTypeControl: false,
    	streetViewControl:false, //街景
	});

	/* 清空标签和路线 */
	function deleteMarkers() {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
			poly.setMap(null); //删除连线
		}
		markers = [];
	}

	/* 新路线 */
	function newRoutes(locations) {
		
		deleteMarkers();//清空所有标签连线

		/* 虚线 */
		// var lineSymbol = {
		//   	path: 'M 0,-1 0,1',
		//   	strokeOpacity: 1,
		//   	scale: 3
		// };
		poly = new google.maps.Polyline({
		  	strokeColor: '#81E5FE',
		  	strokeOpacity: 1,
		  	strokeWeight: 3,
		  	// icons: [{
		  	// 	icon: lineSymbol,
		  	// 	offset: '0',
		  	// 	repeat: '16px'
		  	// }],
		});
		poly.setMap(map);

		// 标签和文字
		var marker, i;
		var iwarray = [];
		var infoWindow;
		var latlngbounds = new google.maps.LatLngBounds();
		for (i = 0; i < locations.length; i++) {
			var loc = [];
			loc.push(locations[i][1]);
			loc.push(locations[i][2]);
			var path = poly.getPath();    //获取线条的坐标
			path.push(new google.maps.LatLng(loc[0], loc[1]));

			var latlng = new google.maps.LatLng(locations[i][1], locations[i][2]);
			latlngbounds.extend(latlng);

			// 序号
			var num = String(i+1);

			// 添加标签
			// var image = '../../images/EN/google-marker.png';
			var image = {
			  url: '../../images/EN/google-marker.png',
			  size: new google.maps.Size(50, 50),
			  origin: new google.maps.Point(0, 0),
			  anchor: new google.maps.Point(25, 25),
			  scaledSize: new google.maps.Size(50, 50),
			  cornercolor:'red',
			};
			marker = new google.maps.Marker({
				position: latlng,
				map: map,
				label: num,
				icon: image,
			});
			markers.push(marker);


			// 显示内容
			var iw = '<div style="font-size: 12px;word-wrap:break-word;word-break:break-all;"><strong><font color="#000000">' + locations[i][0] + '<font></strong><div>';

			iwarray[i] = iw;
			google.maps.event.addListener(marker, 'mouseover', (function(marker,i){
				return function(){
					infoWindow = new google.maps.InfoWindow({
						content: iwarray[i],
						maxWidth: 200,
						pixelOffset: new google.maps.Size(0, 0)
					});
					infoWindow.open(map, marker);
				}
			})(marker,i));

			google.maps.event.addListener(marker, 'mouseout', function() {
				infoWindow.close();
			});
		}

		map.fitBounds(latlngbounds);
	}

	/* 添加经纬度 */
	function latLng(){
		var locations = [];
		var $spans = $('.p-path-wrap .p-path-inner>span');
		$.each($spans,function(index, el){
			var lat = parseFloat($(el).attr('data-lat'));
			var lng = parseFloat($(el).attr('data-lng'));
			var val = $(el).attr('data-val');

			locations.push([val,lat,lng]);
		});

  		newRoutes(locations);

  		//如果没有添加景点时，居中，暂时默认为广州
  		if(locations.length == 0){
  			var getCenter = new google.maps.LatLng(23.15, 113.25);
  			map.setCenter(getCenter);
  		}
	}

	/* 单独景点添加 */
	$('.p-scenic-inner').on('click','.p-scenic-box .p-add',function(){
		// 添加小标签
		var title = $(this).siblings('h2').html();
		var lat = $(this).attr('data-lat');
		var lng = $(this).attr('data-lng');
		var val = $(this).attr('data-val');

		var $child = '<div class="p-path-inner">'+
						'<span data-lat="'+lat+'" data-lng="'+lng+'" data-val="'+val+'">'+title+'</span><img src="../../images/EN/p-direction.png"><b>×</b>'+
					'</div>';
		$('.p-path-wrap').append($child);

		//添加地图
		latLng();
	});

	/* 多个景点添加 */
	$('.s-route-inner').on('click','.s-route-add',function(){
		var that = this;
		var wrapHtml = $('.p-path-wrap').html();

		// 添加路线
		var layerPath = function(){
			$('.p-path-wrap').empty();

			var $a = $(that).siblings('div').children('a');
			
			$.each($a,function(index, el) {
				var title = $(el).html();
				var lat = $(el).attr('data-lat');
				var lng = $(el).attr('data-lng');
				var val = $(el).attr('data-val');

				var $child = '<div class="p-path-inner">'+
								'<span data-lat="'+lat+'" data-lng="'+lng+'" data-val="'+val+'">'+title+'</span><img src="../../images/EN/p-direction.png"><b>×</b>'+
							'</div>';
				$('.p-path-wrap').append($child);		
			});

			// 添加地图
			latLng();
		}

		// 如果已经有路线
		if(wrapHtml !=''){
			layer.confirm('Are you sure you want to cover the route?', {
			  title: false, //不显示标题
			  btn: ['OK','Cancel'] //按钮
			}, function(){
		      layerPath();
			  layer.msg('Covering the success!', {icon: 1});
			});
		}else{
			layerPath();
		}
	});

	/* 删除景点 */
	$('.p-path-wrap').on('click','.p-path-inner>b',function(){
		$(this).parent().remove();

		// 添加地图
		latLng();
	});

	/* 添加天数 */
	function addDays(){
		$('.p-section-left .add-day').click(function(event) {
			var dataNum = Number($('.p-section-left>ul>li:last').attr('data-day').slice(3))+1;

			$('.p-section-left>ul').append('<li data-day="day'+dataNum+'"><span>Day '+dataNum+'</span><b>×</b></li>');
		});

		$('.p-section-left').on('click','ul>li',function(){
			if(!$(this).hasClass('add-day')){
				$(this).addClass('active').siblings('li').removeClass('active');
			}
		});

		$('.p-section-left').on('click','li>b',function(){
			$(this).parent().remove();
		});
	}
	addDays();

	/* 预览路线 */
	var previewRoutes = function(){
		$('.p-toolbar-right .p-preview').click(function(){
			$('#js-previewModal').modal();
		});
	}
	previewRoutes();

}

$(document).ready(function($) {
	initMap();
});