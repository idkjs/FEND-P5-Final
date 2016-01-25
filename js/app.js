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



var viewModel = function () {

	var self = this;

	// non-observable array to show objects coming from Firebase DB.
	self.placeArray = [];

	// observable data object to make objects show object coming from Firebase
	self.placeList = ko.observableArray();

	// get data from Pages Jaunes Haiti database, push to placeArray []
	var ref = new Firebase("https://crackling-fire-1105.firebaseio.com/business");

getData(ref, writeData);

function getData(dataURI, callback) {
  var locations = ref.orderByChild("city").equalTo("Pétion-Ville").on("child_added", function(snapshot) {
    	if (snapshot.val().hasOwnProperty('name') && snapshot.val().hasOwnProperty('latitude'));
  		});
	callback(locations);
}

function writeData(locations) {
	for
	self.placeArray.push({ accountid: snapshot.val().accountid, name: snapshot.val().name,
                 latLng: {lat: snapshot.val().latitude, lng: snapshot.val().longitude},
                 heading: snapshot.val().heading,
                 address: snapshot.val().address,
                 city: snapshot.val().city,
                 phoneNumber: snapshot.val().phonenumber1,
                 website: snapshot.val().website,
              });
}

//     {
//     	// return myData;
//     	// console.log(snapshot.key());
//     	localPlaces.push({ accountid: snapshot.val().accountid, name: snapshot.val().name,
//                  latLng: {lat: snapshot.val().latitude, lng: snapshot.val().longitude},
//                  heading: snapshot.val().heading,
//                  address: snapshot.val().address,
//                  city: snapshot.val().city,
//                  phoneNumber: snapshot.val().phonenumber1,
//                  website: snapshot.val().website,
//               });
//     	// console.log(localPlaces.length);

//         // localPlaces.push(place);
//         // console.log(localPlaces.length);
//     }

// // Attach an asynchronous callback to read the data at our posts reference
//     }, function (errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   });


  // function writeData(localPlaces) {
  //   self.placeList.push(localPlaces);
  //   // localPlaces.push(myData);
  //   // startApp();
  //   console.log(self.placeList.length);
  // }

//   function startApp() {

//     google.maps.event.addListenerOnce(map, 'idle', function(){
//     // do something only the first time the map is loaded
//     app();
//     console.log("I'm startApp");
//     });
//   }
// }
	// get data from firebase to build markers, infowindows, etc.
// 	function searchbiz() {
// 	ref.orderByChild("city").equalTo("Pétion-Ville").on("child_added", function(snapshot) {
// 			if (snapshot.val().hasOwnProperty('name') && snapshot.val().hasOwnProperty('latitude')) {
// 					 var place = { accountid: snapshot.val().accountid, name: snapshot.val().name,
// 									 latLng: {lat: snapshot.val().latitude, lng: snapshot.val().longitude},
// 									 heading: snapshot.val().heading,
// 									 address: snapshot.val().address,
// 									 city: snapshot.val().city,
// 									 phoneNumber: snapshot.val().phonenumber1,
// 									 website: snapshot.val().website,
// 								}
// 					//push data to array placeArray
// 					self.placeArray.push(place);
// 					//push data to observable array placeList
// 					// self.placeList.push(place);
// 					console.log(placeArray.length);
// 					console.log(place);
// 			}

// 	// Attach an asynchronous callback to read the data at our posts reference
// 		}, function (errorObject) {
// 		console.log("The read failed: " + errorObject.code);
// 		});
// 	// function loadLocalData() {
// 		localPlaces.forEach(function(place){
// 			var place = {
// 			name: place.name,
// 			latLng: place.latLng,
// 			accountid: place.accountid,
// 			heading: place.heading,
// 			phoneNumber: place.phoneNumber,
// 			website: place.website
// 		 }
// 		self.placeArray.push(place);
// 		// self.placeList.push(place);
// 		console.log(self.placeArray.length);
// 		})
// 	// }
// 	console.log(self.placeArray.length);

// }
// searchbiz();

	// Create a marker for each Place via the google maps api. The call takes a latlng and map id property at least.
	// Adds click event listener, animation and infowindow data
	// https://developers.google.com/maps/documentation/javascript/markers

self.setMarkers = function () {
	// creating the LatLngBounds object
  var bounds = new google.maps.LatLngBounds();

    // create new marker objects, and hence setting them on the map
  self.placeArray.forEach(function(place) {

    // create new marker object
    place.marker = new google.maps.Marker({
      map: self.map,
      position: new google.maps.LatLng(place.latLng),
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

		//This creates content for location infowindows and control infowindow action.
		var contentString = '<div><strong>' + place.name + '</strong><br>' + place.heading + '<br>' + place.address + '<br>'+ place.city + '<br>'+ place.phoneNumber + '<br>' + '<a href="'+place.website+'">' + place.website + '</a></div>';
		google.maps.event.addListener(place.marker, 'click', function() {
			infowindow.setContent(contentString);
			infowindow.open(map, this);
			place.marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function(){place.marker.setAnimation(null);}, 1450);
		});
    // extend the bounds/rectangle of the map with each added marker
    bounds.extend(marker.getPosition());

    console.log(place.marker);
  });
  // center and zoom the map according to the current bounds object
  self.map.fitBounds(bounds);
};



 // function Marker(place) {

	// 	place.marker = new google.maps.Marker({
	// 		accountid: place.accountid,
	// 		map: map,
	// 		name: place.name,
	// 		position: place.latLng,
	// 		animation: google.maps.Animation.DROP,
	// 		// icon:  function () {
	// 		// if (heading == 'Hotels') {
	// 		//   return '/img/Hotel.png';
	// 		// } else
	// 		// if(heading == 'Restaurants') {
	// 		//   return '/img/Restaurant.png';
	// 		//   }
	// 		// else
	// 		//   return '/img/FF4D00-0.png' //transparent png.
	// 		// }
	// 	});

	// 	// listens for click to make location marker bounce.
	// 	place.marker.addListener('click', toggleBounce);
	// 	function toggleBounce() {
	// 		if (place.marker.getAnimation() !== null) {
	// 		place.marker.setAnimation(null);
	// 		} else {
	// 		place.marker.setAnimation(google.maps.Animation.BOUNCE);
	// 		}
	// 	}

	// 	//This creates content for location infowindows and control infowindow action.
	// 	var contentString = '<div><strong>' + place.name + '</strong><br>' + place.heading + '<br>' + place.address + '<br>'+ place.city + '<br>'+ place.phoneNumber + '<br>' + '<a href="'+place.website+'">' + place.website + '</a></div>';
	// 	google.maps.event.addListener(place.marker, 'click', function() {
	// 		infowindow.setContent(contentString);
	// 		infowindow.open(map, this);
	// 		place.marker.setAnimation(google.maps.Animation.BOUNCE);
	// 		setTimeout(function(){place.marker.setAnimation(null);}, 1450);
	// 	});
	// 	return place.marker;
	// }

	//this tracks search field input
	self.userInput = ko.observable('');

	//this function searchs location names and categories for search terms
	self.search = function() {

	// remove all the current locations, which removes them from the view
	// set results of search to variable and make lowercase so that
	// it can be used to search the array. Be sure to use the
	// KO () indicator after it since userInput is an observable array.
		var searchInput = self.userInput().toLowerCase();

		self.placeList.removeAll();
		self.placeList().forEach(function(place)  {
			infowindow.close(map, this);
		});
		self.placeArray.forEach(function(place) {
			place.marker.setVisible(false);
			var headingIndex = place.heading.toLowerCase().indexOf(searchInput);
			var nameIndex = place.name.toLowerCase().indexOf(searchInput);

			if(headingIndex >= 0) {
				self.placeList.push(place);

			} else

			if(nameIndex >= 0) {
				self.placeList.push(place);
			}
		});

		self.placeList().forEach(function(place) {
			place.marker.setVisible(true);
		});
	};

	// this function creates each individual place from the firebase location data
	function Place(data) {
		this.accountid = data.accountid;
		this.name = data.name;
		this.latLng = data.latLng;
		this.marker = null;
		this.heading = data.heading;
		this.phoneNumber = data.phonenumber1;
		this.website = data.website;
	}

	// this binds the list results to their map markers.
	bounceUp = function(place) {
			google.maps.event.trigger(place.marker, 'click');
			console.log(place.marker);
	};

	// this a quick search function to show all hotels.
	showHotels = function () {
		getInfoWindowEvent();
		self.userInput('hotel');
		self.search();
		self.userInput('');
	};

	// this a quick search function to show all restaurants.
	showRestaurants = function () {
		getInfoWindowEvent();
		self.userInput('restaurants');
		self.search();
		self.userInput('');
	};

};

vm = new viewModel();

ko.applyBindings(vm);
}



