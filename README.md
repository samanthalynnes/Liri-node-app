# Liri-node-app (Liri-BOT)

LIRI is a command line node app that takes in parameters and gives you back data. You can choose from 4 different parameters to search with:

movie-this / pulls data from the OMDB API
Spotify-this-song / pulls data from the Spotify API
concert-this / pulls data from the Bands In Town API
do-what-it-says / pulls from a log.txt file to run the command and data specified

# How to Use LIRI:

Clone this repo and the run it in your command line. 

### movie-this
Type 'node liri.js movie-this *movie name of your choice*. Ex: 'node liri.js movie-this Step Brothers'
It will return:
Movie title
Year Released
IMDB Rating
Rotten Tomatoes Rating
Production Country
Language
Plot
Actors

![movie image]("./screenshots/moviethis.png")


### spotify-this-song
Type 'node liri.js spotify-this-song *song of your choice*.
Ex: 'node liri.js spotify-this-song American Girl
It will return:
Artist
Song Name
Preview Link to Song
Album Title

![spotify image]("./screenshots/spotifythissong.png")

### concert-this
Type 'node liri.js concert-this *artist/band name of your choice*.
Ex: 'node liri.js concert-this Lumineers'
It will return:
Venue Name
Venue Location
Date of Event

![concert image]("./screenshots/concertthis.png")

### do-what-it-says

Type 'node liri.js do-what-it-says'
This will pull any commands entered into the random.text file. It is set up right now to run spotify-this-song I Want it That Way

![do it image]("./screenshots/dowhatitsays.png")







