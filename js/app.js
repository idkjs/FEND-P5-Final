function app(){
var vm;

var localPlaces = [
  {
    name: 'MATELEC',
    latLng: {lat: 18.5157325, lng: -72.2931357},
    accountid: null,
    heading: 'Electronics',
    phoneNumber: null,
    website: null
  },

  {
    name: 'Thompson Electronics S.A.',
    latLng: {lat: 18.5140218, lng: -72.2919172},
    accountid: null,
    heading: 'Electronics',
    phoneNumber: null,
    website: null
  },

  {
    name: 'Pages Jaunes Haiti',
    latLng: {lat: 18.511007, lng: -72.2911917},
    accountid: null,
    heading: 'Electronics',
    phoneNumber: null,
    website: null
    },

  {
    name: 'Marie de Petion-Ville',
    latLng: {lat: 18.5098571, lng: -72.2882233},
    accountid: null,
    heading: 'Electronics',
    phoneNumber: null,
    website: null
  },

  {
    name: 'La Lorraine Boutique Hotel',
    latLng: {lat: 18.5123482, lng: -72.2918561},
    accountid: null,
    heading: 'Electronics',
    phoneNumber: null,
    website: null
      },

  {
    name: 'Maison Acra',
    latLng: {lat: 18.5127402, lng: -72.2886953},
    accountid: null,
    heading: 'Electronics',
    phoneNumber: null,
    website: null
      }
]

var locations = [];
// Get Data from FIREBASE
var fb = new Firebase("https://crackling-fire-1105.firebaseio.com/business");

// Retrieve relevant data
fb.orderByChild("city").equalTo("Pétion-Ville").on("child_added", function(snapshot) {
  var place = snapshot.val();
  if (place.hasOwnProperty('name') && place.hasOwnProperty('latitude'))
    {
    // Marker(place);
    locations.push( new Place(place));
    console.log(place);
    console.log(locations.length);
    // viewModel();
    };
  localPlaces.forEach(function(place) {
      locations.push(place);
    });
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// this function creates each individual place from the firebase location data
function Place(place) {
  this.accountid = place.accountid;
  this.name = place.name;
  this.latLng = place.latLng;
  this.marker = Marker(place);
  this.heading = place.heading;
  this.phoneNumber = place.phonenumber1;
  this.website = place.website;
}

  // Create a marker for each Place via the google maps api. The call takes a latlng and map id property at least.
  // Adds click event listener, animation and infowindow data
  // https://developers.google.com/maps/documentation/javascript/markers

function Marker(place) {
  place.marker = new google.maps.Marker({
    accountid: place.accountid,
    map: map,
    name: place.name,
    position: place.latLng,
    animation: google.maps.Animation.DROP
  });
  // console.log(map);

  // listens for click to make location marker bounce.
  place.marker.addListener('click', toggleBounce);
  function toggleBounce() {
    if (place.marker.getAnimation() !== null) {
    place.marker.setAnimation(null);
    } else {
    place.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  //This creates content for location infowindows and control infowindow action.
  var contentString = '<div><strong>' + place.name + '</strong><br>' + place.heading + '<br>' + place.address + '<br>'+ place.city + '<br>'+ place.phoneNumber + '<br>' + '<a href="'+place.website+'">' + place.website + '</a></div>';
  google.maps.event.addListener(place.marker, 'click', function() {
    infowindow.setContent(contentString);
    infowindow.open(map, this);
    place.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){place.marker.setAnimation(null);}, 1450);
  });
  // console.log(place.marker);
}

var viewModel = function () {

  var self = this;

  // observable data object to make objects show object coming from Firebase
  self.placeList = ko.observable();

  locations.forEach(function(place) {
    self.placeList.push(place);

  });
  console.log(self.placeList());
  //this tracks search field input
  self.userInput = ko.observable('');

  //this function searchs location names and categories for search terms
  self.search = function() {

    var searchInput = self.userInput().toLowerCase();

    locations.forEach(function(place) {
      var headingIndex = place.heading.toLowerCase().indexOf(searchInput);
      var nameIndex = place.name.toLowerCase().indexOf(searchInput);

      if(headingIndex >= 0 || nameIndex >= 0) {
        if (place.marker.setVisible !== true) {
        place.marker.setVisible(true);
        }
        self.placeList.push(place);
        }
          // console.log('self.placeList now has %d items', self.placeList().length);

    })
  }

  // this binds the list results to their map markers.
  bounceUp = function(place) {
      google.maps.event.trigger(place.marker, 'click');
      console.log(place.marker);
  }

  // this a quick search function to show all hotels.
  showHotels = function () {
    getInfoWindowEvent();
    self.userInput('hotel');
    self.search();
    self.userInput('');
  }

  // this a quick search function to show all restaurants.
  showRestaurants = function () {
    getInfoWindowEvent();
    self.userInput('restaurants');
    self.search();
    self.userInput('');
  }

};

vm = new viewModel();

ko.applyBindings(vm);
}



