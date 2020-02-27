require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
//testing out if I can get stuff via Axios
console.log(spotify);

const axios = require("axios");

axios
  .get(
    "https://rest.bandsintown.com/artists/chance+the+rapper/events?app_id=codingbootcamp"
  )
  .then(resp => {
    console.log(resp.data);
  });
