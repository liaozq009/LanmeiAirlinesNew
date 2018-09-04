function initMap(){
	var coordinate = {lat: 39.91, lng: 116.39};
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

}

$(document).ready(function($) {
	// initMap();
});