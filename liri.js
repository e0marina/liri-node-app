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

//function for getting concert info
function concert() {
  //artist will be user input
  let artist = process.argv[3] + process.argv[4] + process.argv[5]; // this doesn't work if name is shorter or longer...figure out how to handle input of more than one word
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
}
