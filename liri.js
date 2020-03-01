//Ryan recommended this for looking at api objects that are returned:
// console.log(util.inspect(obj, {depth: null}));

require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require("node-spotify-api");

const axios = require("axios");

const moment = require("moment");
const util = require("util");

const spotify = new Spotify(keys.spotify);

const fs = require("fs");

let action = process.argv[2];

//switch statement for each action/process.argv[2]
switch (action) {
  case "concert-this":
    concert();
    break;
  case "spotify-this-song":
    spotifyFunc();
    break;
  case "movie-this":
    omdbFunc();
    break;
  case "do-what-it-says":
    randomFunc();
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
    // console.log("___________________________");
    // console.log("artist(s) that sing this song: Ace of Base");
    // console.log("name of the song: The Sign");
    // console.log(
    //   "url for this song on spotify: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE"
    // );
    // console.log("the album the song is on: The Sign (US Album) [Remastered]");
    // console.log("___________________________");

    userInput = "The Sign";
    // console.log(userInput);
    spotifySearchFunc();

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
  function spotifySearchFunc() {
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
  spotifySearchFunc();
}

//function for the OMDB portion of the app
function omdbFunc() {
  // Create an empty variable for holding users input
  var userInput = "";

  if (process.argv[3] === undefined) {
    console.log("___________________________");
    console.log("Movie title: Mr. Nobody");
    console.log("Release Year: 2009");
    console.log("IMDB Rating: 7.8");
    console.log("Rotten Tomatoes Rating: 67%");
    console.log(
      "Production Country: Belgium, Germany, Canada, France, UK, Luxembourg"
    );
    console.log("Language: English, Mohawk");
    console.log(
      "Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible."
    );
    console.log(
      "Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham"
    );

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
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl =
    "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

  axios
    .get(queryUrl)
    .then(function(response) {
      // console.log(response);
      console.log("___________________________");
      console.log("Movie title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Production Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);

      console.log("___________________________");
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

function randomFunc() {
  // The code will store the contents of the reading inside the variable "data"
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);
  });
}
