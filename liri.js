require("dotenv").config();

const keys = require("./keys.js");
const Spotify = require("node-spotify-api");

const axios = require("axios");

const spotify = new Spotify(keys.spotify);

let action = process.argv[2];
//switch statement
switch (action) {
  case "concert-this":
    concert();
    break;
}

//user will be inputting more than one word for artists, movies, etc., so we need to push the process.argvs into an array
// Store all of the arguments in an array
var nodeArgs = process.argv;
console.log(nodeArgs);

// Create an empty variable for holding users input
var userInput = "";
console.log(userInput);

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    userInput = userInput + "+" + nodeArgs[i];
  } else {
    userInput += nodeArgs[i];
  }
}

//function for getting concert info
function concert() {
  axios

    .get(
      "https://rest.bandsintown.com/artists/" +
        userInput +
        "/events?app_id=codingbootcamp"
    )
    .then(resp => {
      console.log(userInput);

      console.log(resp.data); //will come back as an empty array if there are no shows coming up for the artist
      if (resp.data === []) {
        console.log(
          "please search for another artist, this one doesn't have shows coming up"
        );
      }
    });
}
