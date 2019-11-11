require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var userInput = process.argv.slice(3).join(" ");

var command = process.argv[2];

function switchStatement() {
    switch (command) {
        case "movie-this":
            findMovie();
            break;
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            getSong();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Enter correct command");
    }
}

// OMDB Search

var movie = userInput.trim().replace(" ", "+").replace(".", "");
if (!movie) {
    movie = 'Mr. Nobody';
} else {
    movie;
}
var movieURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
var divider = "\n------------------------------------------------------------\n\n";

var findMovie = () => {

    axios.get(movieURL).then(function (response) {
        var jsonData = response.data;
        var movieData = [
            "Movie title: " + jsonData.Title,
            "Year Released: " + jsonData.Year,
            "IMDB Rating: " + jsonData.Ratings[0].Value,
            "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
            "Produced in: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Actors: " + jsonData.Actors
        ].join("\n\n");
        fs.appendFile("log.txt", movieData + divider, function (err) {
            if (err) throw err;
            console.log(movieData);
        })
    });
};


// Bands in Town

var concertThis = () => {
    var artist = userInput.trim().replace(" ", "+");
    var bandURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(bandURL).then(function (response) {
        var eventData = response.data
        for (i = 0; i < 3; i++) {

            var bandData = [
                "Venue Name: " + eventData[i].venue.name,
                "Venue Location: " + eventData[i].venue.city + ", " + eventData[i].venue.country,
                "Date of Event: " + eventData[i].datetime
            ].join("\n\n");

            fs.appendFile("log.txt", bandData + divider, function (err) {
                if (err) throw err;
                console.log(bandData);
            });
        }
    });
};




// Spotify Song

var Spotify = require("node-spotify-api");

function getSong() {
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    var song = userInput.trim();

    if (!song) {
        song = "The Sign Ace of Base";
    } else {
        song;
    }

    spotify.search({ type: 'track', query: song, limit: 1 }, function (error, data) {
        if (error) {
            return console.log("Error: " + error);
        }
        var artist = data.tracks.items[0].artists[0].name;
        var name = data.tracks.items[0].name;
        var preview = data.tracks.items[0].preview_url;
        var album = data.tracks.items[0].album.name;

        var songData = [
            "Artist: " + artist,
            "Name: " + name,
            "Preview link: " + preview,
            "Album: " + album
        ].join("\n\n");

        fs.appendFile("log.txt", songData + divider, function (err) {
            if (err) throw err;
            console.log(songData);
        });
    });
}

// Do What It Says

function doWhatItSays() {

    fs.readFile("random.text", "utf8", function (error, data) {
        if (error) {
            return console.log("Error" + error);
        } else {
            var inputArray = data.split(',');
            console.log(inputArray);
            command = inputArray[0].trim();
            userInput = inputArray[1].trim();
            switchStatement();
        }
    });
}

switchStatement();