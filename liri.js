require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require("node-spotify-api");

const axios = require("axios");

const moment = require("moment");
const util = require("util");

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
  // Create an empty variable for holding users input
  var userInput = "";

  if (process.argv[3] === undefined) {
    console.log("___________________________");
    console.log("artist(s) that sing this song: Ace of Base");
    console.log("name of the song: The Sign");
    console.log(
      "url for this song on spotify: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE"
    );
    console.log("the album the song is on: The Sign (US Album) [Remastered]");
    console.log("___________________________");

    return;
  } else {
    //starting at index 3, loop through the node args
    for (var i = 3; i < process.argv.length; i++) {
      if (i > 3 && i < process.argv.length) {
        userInput = userInput + "+" + process.argv[i];
      } else {
        userInput += process.argv[i];
      }
    }
  }

  spotify
    .search({ type: "track", query: userInput })
    .then(function(response) {
      for (let i = 0; i < response.tracks.items.length; i++) {
        console.log("___________________________");
        console.log(
          "artist(s) that sing this song: " +
            response.tracks.items[i].artists[0].name
        );
        console.log("name of the song: " + response.tracks.items[i].name);
        //preview link of the song from Spotify
        console.log(
          "url for this song on spotify: " +
            response.tracks.items[i].external_urls.spotify
        );
        //album song is from
        console.log(
          "the album the song is on: " + response.tracks.items[i].album.name
        );
        console.log("___________________________");
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

// console.log(util.inspect(obj, {depth: null}));
