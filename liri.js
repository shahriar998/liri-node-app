//Code to read and set any environment variables with the dotenv package
require("dotenv").config();

//Variables
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');

moment().format();
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var liriCommand = process.argv[2];
var liriInsertedValue = process.argv[3];

gameOn(liriCommand, liriInsertedValue);

function gameOn(liriCommand, liriInsertedValue) {
    switch (liriCommand) {

        case "spotify-this-song":
            //console.log("Do Spotify staff!!!");
            showSpotifyStaff(liriInsertedValue);
            break;

        case "movie-this":
            //console.log("Do moive staff!!!")
            movieStaff(liriInsertedValue)
            break;
        case "concert-this":
            //console.log("Do concert staff!!!")
            showConcertInfo(liriInsertedValue);
            break;
        case "do-what-it-says":
            //console.log("do-what-it-says")
            noCommand();
            break;
        default:
            console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")

    }
}


function showConcertInfo(artist) {

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function (response) {
            //console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                //console.log(response.data[i]);
                console.log("\n---------------Event Information No: " + i + "---------------");
                console.log("\nName of the venue: " + response.data[i].venue.name + "\n");
                console.log("Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\n");

                var momentTime = moment(response.data[i].datetime).format('MM/DD/YYYY');
                console.log("Concert Date: " + momentTime + "\n");
                console.log("---------------Event Information---------------");

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

function showSpotifyStaff(playlist) {
    if (playlist === undefined) {
        playlist ="the sign Ace of Base";
    }

    spotify.search({ type: 'track', query: playlist }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log("This is the first console log " + data.tracks); 
        //console.log(data.tracks.items[0]);
        //console.log(data.tracks.items[0])
        console.log("---------------Spotify Information---------------");
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("The song's name: " + data.tracks.items[0].name);
        console.log("A preview link of the song from Spotify: " + data.tracks.items[0].href);
        console.log("The album that the song is from: " + data.tracks.items[0].album.name);
        console.log("---------------Spotify Information---------------");

    });
}

//showSpotifyStaff()

function movieStaff(movieName) {
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(
        function (response) {

            console.log("\n---------------Movie Information---------------"); 
            console.log("Title of the movie: " + response.data.Title);
            console.log("Year the movie came out: " + response.data.Released);
            console.log("IMDB Rating of the movie: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            console.log("Country where the movie was produced: " + response.data.Country);
            console.log("Language of the movie: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors);
            console.log("---------------Movie Information---------------\n");

        })
}
function noCommand() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.



        if (dataArr[0] === "spotify-this-song") {
            showSpotifyStaff(dataArr[1]);
        }
        else if (dataArr[0] === "movie-this") {

            movieStaff(dataArr[1]);
        }
        else if (dataArr[0] === "concert-this") {
            showConcertInfo(dataArr[1]);
        }
        else {
            console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
        }

    });
}
//Bonuse portion
function logRecords() {
    var textInput = process.argv[2];
    var textInputTwo = process.argv[3];

    var record = "node liri.js " + textInput + " " + textInputTwo + ", ";


    // Next, we append the text into the "sample.txt" file.
    // If the file didn't exist, then it gets created on the fly.
    fs.appendFile("log.txt", record, function (err) {

        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }

        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
            console.log("Content Added!");
        }

    });
}
//movieStaff("Batman Begins");
//showSpotifyStaff("Senorita");
logRecords();
