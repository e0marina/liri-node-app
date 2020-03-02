# liri-node-app

LIRI is Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. LIRI can take the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`
   
1. concert-this returns data from the Bands in Town Events API, simply type in to your bash terminal: node liri.js concert-this and then the name of a band or artist. You will get back:
     * Name of the venue

     * Venue location

     * Date of the Event 

2. spotify-this-song returns data from spotify's API, type in to your bash terminal: node liri.js spotify-this-song and then the name of a song. 
It will return: 

      * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

     * If no song is typed in by the user then the program will default to "The Sign" by Ace of Base.

3. movie-this returns data from OMDB's API. Type in to your bash terminal: node liri.j movie-this and then the name of a movie. It will return: 

       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
       * If no movie is typed in by the user, the progam will default to Mr. Nobody

4. do-what-it-says uses the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     * It also runs with concert-this and movie-this, try it out! Just follow the format: movie-this, the avengers (for              example) in place of the text that's already in the file. 
   
I created this app for UCLA bootcamp. 
   

4. Include screenshots, gifs or videos of the app functioning

List of technologies used in the app
* JavaScript
* Axios
* Node.js
* Bash
* Moment.js
* APIs: Spotify, OMDB, Bands In Town Events



   
   
