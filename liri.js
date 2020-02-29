require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require("node-spotify-api");

const axios = require("axios");

const moment = require("moment");

const spotify = new Spotify(keys.spotify);

let action = process.argv[2];

//switch statement
switch (action) {
  case "concert-this":
    concert();
    break;
  case "spotify-this-song":
    spotifyFunc();
    break;
}

//function for getting concert info
function concert() {
  //user will be inputting more than one word for artists, movies, etc., so we need to push the process.argvs into an array
  // Store all of the arguments in an array
  var nodeArgs = process.argv;
  // console.log(nodeArgs);

  // Create an empty variable for holding users input
  var userInput = "";
  // console.log(userInput);

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      userInput = userInput + "+" + nodeArgs[i];
    } else {
      userInput += nodeArgs[i];
    }
  }
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        userInput +
        "/events?app_id=codingbootcamp"
    )
    .then(resp => {
      // console.log(resp.data[0].venue);
      //can loop through it bc it's an array!
      for (let i = 0; i < resp.data.length; i++) {
        console.log(resp.data[i].venue.name);
        console.log(resp.data[i].venue.city);
        console.log(resp.data[i].venue.country);
        console.log(moment(resp.data[i].datetime).format("LLL"));
        console.log("___________________________");
      }

      if (resp.data === []) {
        console.log(
          "please search for another artist, this one doesn't have shows coming up"
        );
      }
    });
}
//function for spotify portion of the app
function spotifyFunc() {
  var nodeArgs = process.argv;
  // console.log(nodeArgs);

  // Create an empty variable for holding users input
  var userInput = "";
  // console.log(userInput);

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      userInput = userInput + "+" + nodeArgs[i];
    } else {
      userInput += nodeArgs[i];
    }
  }

  spotify
    .search({ type: "track", query: userInput })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
}
