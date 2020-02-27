require("dotenv").config();

const keys = require("./keys.js");
const Spotify = require("node-spotify-api");

const axios = require("axios");

const spotify = new Spotify(keys.spotify);

//artist will be user input
let artist = process.argv[2] + process.argv[3] + process.argv[4];

axios

  .get(
    "https://rest.bandsintown.com/artists/" +
      artist +
      "/events?app_id=codingbootcamp"
  )
  .then(resp => {
    console.log(artist);

    console.log(resp.data); //will come back as an empty array if there are no shows coming up for the artist
  });
