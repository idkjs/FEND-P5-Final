function getPlaces() {
var localPlaces = [
  {
    name: 'MATELEC',
    latLng: {lat: 18.5157325, lng: -72.2931357},
    accountid: null,
    heading: 'electrical',
    phoneNumber: null,
    website: null
  },

  {
    name: 'Thompson Electronics S.A.',
    latLng: {lat: 18.5140218, lng: -72.2919172},
    accountid: null,
    heading: null,
    phoneNumber: 'Electronics',
    website: null
  },

  {
    name: 'Pages Jaunes Haiti',
    latLng: {lat: 18.511007, lng: -72.2911917},
    accountid: null,
    heading: 'advertising',
    phoneNumber: null,
    website: null
    },

  {
    name: 'Marie de Petion-Ville',
    latLng: {lat: 18.5098571, lng: -72.2882233},
    accountid: null,
    heading: 'government',
    phoneNumber: null,
    website: null
  },

  {
    name: 'La Lorraine Boutique Hotel',
    latLng: {lat: 18.5123482, lng: -72.2918561},
    accountid: null,
    heading: 'hotel',
    phoneNumber: null,
    website: null
      },

  {
    name: 'Maison Acra',
    latLng: {lat: 18.5127402, lng: -72.2886953},
    accountid: null,
    heading: 'clothing',
    phoneNumber: null,
    website: null
      }
]
console.log(localPlaces.length);


// get data from Pages Jaunes Haiti database, push to localPlaces []
var ref = new Firebase("https://crackling-fire-1105.firebaseio.com/business");

getData('https://crackling-fire-1105.firebaseio.com/business', writeData);
var locations = [];
function getData(dataURI, callback) {
  var myData = [];
  var myData = ref.orderByChild("city").equalTo("Pétion-Ville").on("child_added", function(snapshot) {
    if (snapshot.val().hasOwnProperty('name') && snapshot.val().hasOwnProperty('latitude'));
     // {
     //     var place = { accountid: snapshot.val().accountid, name: snapshot.val().name,
     //             latLng: {lat: snapshot.val().latitude, lng: snapshot.val().longitude},
     //             heading: snapshot.val().heading,
     //             address: snapshot.val().address,
     //             city: snapshot.val().city,
     //             phoneNumber: snapshot.val().phonenumber1,
     //             website: snapshot.val().website,
     //          }
        //push data to array localPlaces
        // console.log(place);
        localPlaces.push(place);
        console.log(localPlaces.length);
    }

// Attach an asynchronous callback to read the data at our posts reference
    }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  callback(myData);
  }

  function writeData(myData) {
    return myData.map(function(place) { return { accountid: place.accountid, name: place.name,
                 latLng: {lat: place.latitude, lng: place.longitude},
                 heading: place.heading,
                 address: place.address,
                 city: place.city,
                 phoneNumber: place.phonenumber1,
                 website: place.website
              });
    // localPlaces.push(myData);
    // startApp();
    console.log(myData.map);
  }

  function startApp() {

    google.maps.event.addListenerOnce(map, 'idle', function(){
    // do something only the first time the map is loaded
    app();
    console.log("I'm startApp");
    });
  }
}

// get data from firebase to build markers, infowindows, etc.
function searchbiz() {
ref.orderByChild("city").equalTo("Pétion-Ville").on("child_added", function(snapshot) {
    if (snapshot.val().hasOwnProperty('name') && snapshot.val().hasOwnProperty('latitude')) {
         var place = { accountid: snapshot.val().accountid, name: snapshot.val().name,
                 latLng: {lat: snapshot.val().latitude, lng: snapshot.val().longitude},
                 heading: snapshot.val().heading,
                 address: snapshot.val().address,
                 city: snapshot.val().city,
                 phoneNumber: snapshot.val().phonenumber1,
                 website: snapshot.val().website,
              }
        //push data to array localPlaces
        console.log(place);
        localPlaces.push(place);
        console.log(localPlaces.length);

    }

// Attach an asynchronous callback to read the data at our posts reference
    }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function getData(searchbiz, callback) {
    var dataArray = [123, 456, 789, 012, 345, 678];
    callback(dataArray);
}

function writeData(myData) {
    document.getElementById('output').innerHTML += myData;
}
console.log(localPlaces.length);
console.log(localPlaces);

