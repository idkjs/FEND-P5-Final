// build google map object. infowindow is function that shows data you want shown when clicking a map marker.

function initialize() {
	var mapCanvas = document.getElementById('map');
    var mapOptions = {
    	center: new google.maps.LatLng(18.5128958, -72.2939841),
    	zoom: 15,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    infowindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var input = (document.getElementById('test-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  	var list = (document.getElementById('list-view'));
  	map.controls[google.maps.ControlPosition.TOP_LEFT].push(list);
}
google.maps.event.addDomListener(window, 'load', initialize);

function Marker(place) {
    place.marker = new google.maps.Marker({
      accountid: place.accountid,
      setMap: map,
      name: place.name,
      position: place.latLng,
      animation: google.maps.Animation.DROP
    });

    place.marker.addListener('click', toggleBounce);
    function toggleBounce() {
      if (place.marker.getAnimation() !== null) {
      place.marker.setAnimation(null);
      } else {
      place.marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
     
    var contentString = '<div>' + place.name + '</div>';
    google.maps.event.addListener(place.marker, 'click', function() {      
      infowindow.setContent(contentString);      
      infowindow.open(map, this);
      place.marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){place.marker.setAnimation(null);}, 1450);
    });
    return place.marker;
};