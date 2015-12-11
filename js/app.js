var vm;
var map = document.getElementById ('map')

var localPlaces = [
  {
    locationName: 'MATELEC',
    latLng: {lat: 18.515732, lng: -72.293135},
  },
  
  {
    locationName: 'Thompson Electronics S.A.',
    latLng: {lat: 18.5140218, lng: -72.2919172}
  },
  
  {
    locationName: 'Pages Jaunes Haiti',
    latLng: {lat: 18.511007, lng: -72.2911917}
  },

  {
    locationName: 'Marie de Petion-Ville',
    latLng: {lat: 18.5098571, lng: -72.2882233},
  },
  
  {
    locationName: 'La Lorraine Boutique Hotel',
    latLng: {lat: 18.5123482, lng: -72.2918561}
  },
  
  {
    locationName: 'Maison Acra',
    latLng: {lat: 18.5127402, lng: -72.2886953},
  }
];

var markers = [];
var viewModel = function () {
      
  var self = this;

  // build google map object, store in reference var
  // var pv = {lat: 18.5128958, lng: -72.2939841};

  self.googleMap = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 18.5128958, lng: -72.2939841},
    zoom: 15
    });

  infowindow = new google.maps.InfoWindow();

  // custom data object to make objects out of data in localPlaces and add data to it.
  self.placeArray = [];

  localPlaces.forEach(function(place) {
    self.placeArray.push(new Place(place));
  });

  self.placeArray.forEach(function(place) {
    var markerOptions = {
      map: self.googleMap,
      position: place.latLng
    }

    place.marker = new google.maps.Marker(markerOptions);

    google.maps.event.trigger(place.marker, 'click');

  });

  self.placeList = ko.observableArray();

  self.placeArray.forEach(function(place)  {
    self.placeList.push(place);
  });
  // // Create a marker for each Place via the google maps api. The call takes a latlng and map id property at least.
  // // https://developers.google.com/maps/documentation/javascript/markers

  self.userInput = ko.observable(''); 

  self.search = function() {
  // remove all the current locations, which removes them from the view
  // set results of search to variable and make lowercase so that
  // it can be used to search the array. Be sure to use the 
  // KO () indicator after it since userInput is an observable array.
    var searchInput = self.userInput().toLowerCase();

    self.placeList.removeAll();

    self.placeArray.forEach(function(place) {
      place.marker.setVisible(false);
    
      if(place.locationName.toLowerCase().indexOf(searchInput) >= 0) {
        self.placeList.push(place);
      }
    });
     
    self.placeList().forEach(function(place) {
      place.marker.setVisible(true);
    });
      
  };

  function Place(data) {
    this.locationName = data.locationName;
    this.latLng = data.latLng;
    this.contentString = '<div><strong>' + this.locationName + '</strong></div>';
  // setting this market to null here. When we create a marker later, 
  // we will save it to the this.marker variable for each Place.
  }
}
// // Sets the map on all markers in the array.
//   function setMapOnAll(map) {
//     markers.forEach(function(marker) {
//       marker.setMap(map);
//     });
//   }

//   function clearMarkers() {
//     setMapOnAll(null);
//   }


vm = new viewModel();

ko.applyBindings(vm);




