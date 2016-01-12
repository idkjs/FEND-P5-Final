// build google map object. infowindow is function that shows data you want shown when clicking a map marker.
// I had a hard time getting the markers to show. I ended up defining "map" globally by taking out
// 'var' before map in initialize() so it would be available globally. I dont know what problems this might create later.

function initMap() {
	var mapCanvas = document.getElementById('map');
    var mapOptions = {
    	center: new google.maps.LatLng(18.5128958, -72.2939841),
    	zoom: 15,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(mapCanvas, mapOptions);
}
// google.maps.event.addDomListener(window, 'load', initialize);
function errorHandling() {
      alert("Google map fail to load!");
}
// creating function to close all open infowindows. The purpose is to address that when you 
// open and infowindow, then use one of the preset filters, the infowindow was not closing.
// By calling getInfoWindowEvent() within the click-binding in the filter button, it closes any open infowindows;
// source: http://stackoverflow.com/questions/2966744/closing-any-open-info-windows-in-google-maps-api-v3
function getInfoWindowEvent(marker) {
    infowindow.close()
}