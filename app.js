var Firebase = require('firebase');
var algoliasearch = require('algoliasearch');
var client = algoliasearch('SJWIWJF0XG', '30fb309f4d320daf160e346b3edcd560');
var index = client.initIndex('test_Fend-P5-Final');

// Connect to  Firebase Fend-P5-Final data
var fendP5Final = new Firebase("https://crackling-fire-5653.firebaseIO.com/");

var ref = new Firebase("https://crackling-fire-5653.firebaseio.com");
ref.authWithOAuthPopup("facebook", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});

ref.child("result/2975/city").on("value", function(snapshot) {
  alert(snapshot.val());  // Alerts "San Francisco"
});

// Get all data from Firebase
fb.on('value', initIndex);

function initIndex(dataSnapshot) {
  // Array of data to index
  var objectsToIndex = [];

  // Get all objects
  var values = dataSnapshot.val();

  // Process each Firebase ojbect
  for (var key in values) {
    if (values.hasOwnProperty(key)) {
      // Get current Firebase object
      var firebaseObject = values[key];

      // Specify Algolia's objectID using the Firebase object key
      firebaseObject.objectID = key;

      // Add object for indexing
      objectsToIndex.push(firebaseObject);
    }
  }

  // Add or update new objects
  index.saveObjects(objectsToIndex, function(err, content) {
    if (err) {
      throw err;
    }

    console.log('Firebase<>Algolia import done');
  });
}