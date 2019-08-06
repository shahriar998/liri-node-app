//Code to read and set any environment variables with the dotenv package
require("dotenv").config();

//Variables
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
var axios = require("axios");

var liriCommand = process.argv[2];
var liriSecondCommand = process.argv[3];
console.log(liriCommand);
switch (liriCommand) {

    case "spotify":
        console.log("Do Spotify staff!!!")
    
    case "movie":
        console.log("Do moive staff!!!")
    case "concerts":
        console.log("Do concert staff!!!")
        showConcertInfo(liriSecondCommand);
}


function showConcertInfo(artist) {

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function (response) {
            //console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name);
            }
        })
        .catch(function (error) {
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

 //showConcertInfo("CLAIRO");

 function showSpotifyStaff(playlist){
    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify({
      id: process.env.SPOTIFY_ID,
      secret: process.env.SPOTIFY_SECRET
    });
     
    spotify.search({ type: 'track', query: playlist }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    console.log(data.tracks.items[0].name); 
    //console.log(data.tracks.items[0]);
    console.log(data.tracks.items[0]).album.artists;
    // * Artist(s)

    // * The song's name

    // * A preview link of the song from Spotify

    // * The album that the song is from
    });
 }

 //showSpotifyStaff()

 function movieStaff(movieName){
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(
        function (response) {
            console.log(response.data.Title);
            console.log(response.data.Released);
            console.log(response.data.imdbRating);
            console.log(response.data.Ratings[1].Value);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
            
        })
 }

 //movieStaff("Batman Begins");
 showSpotifyStaff("Eye of the Tiger");
