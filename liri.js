//LIRI will understand the following node arguments:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

var keys = require("./keys.js");
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');

//twitter keys
var consumerKey = keys.twitterKeys.consumer_key;
var consumerSecretKey = keys.twitterKeys.consumer_secret;
var accessToken = keys.twitterKeys.access_token_key;
var accessSecretToken = keys.twitterKeys.access_token_secret;

//spotify keys
var clientId = keys.spotifyKeys.client_id;
var clientSecret = keys.spotifyKeys.client_secret;

var writeToLog = function(data) {
  fs.appendFile("log.txt", '\r\n\r\n');

  fs.appendFile("log.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
}

var getTweets = function() {

var twitter = require('twitter');
 
var client = new twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecretKey,
  access_token_key: accessToken,
  access_token_secret: accessSecretToken
});

var params = {screen_name: 'bebechan_bichon'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      var data = []; 
      for (var i = 0; i < tweets.length; i++) {
        data.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
      }
      console.log(data);
      writeToLog(data);
    }
  });
};

var getMeMovie = function(movieName) {

  if (movieName === undefined) {
    movieName = 'Rush Hour';
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

  request(urlHit, function(error, response, body) {
    console.log('return anything?');
    if (!error && response.statusCode == 200) {
      var data = [];
      var jsonData = JSON.parse(body);

      data.push({
      'Title: ' : jsonData.Title,
      'Year: ' : jsonData.Year,
      'Rated: ' : jsonData.Rated,
      'IMDB Rating: ' : jsonData.imdbRating,
      'Country: ' : jsonData.Country,
      'Language: ' : jsonData.Language,
      'Plot: ' : jsonData.Plot,
      'Actors: ' : jsonData.Actors,
      'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
      'Rotton Tomatoes URL: ' : jsonData.tomatoURL,
  });
      console.log(data);
      writeToLog(data);
    }
  });
}

var getArtistNames = function(artist) {
  return artist.name;
};


var getMeSpotify = function(songName) {

  var spotify = require('node-spotify-api');
 
  var spotify = new spotify({
    id: clientId,
    secret: clientSecret
  });
  
  if (songName === undefined) {
    songName = 'I want it that way';
  };

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }

    var songs = data.tracks.items;
    var data = []; 

    for (var i = 0; i < songs.length; i++) {
      data.push({
        'artist(s)': songs[i].artists.map(getArtistNames),
        'song name: ': songs[i].name,
        'preview song: ': songs[i].preview_url,
        'album: ': songs[i].album.name,
      });
    }
    console.log(data);
    writeToLog(data);
  });
};

var pick = function(caseData, functionData) {
  switch (caseData) {
    case 'my-tweets':
      getTweets();
      break;
    case 'spotify-this-song':
      getMeSpotify(functionData);
      break;
    case 'movie-this':
      getMeMovie(functionData);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log('I do not know this command');
  }
}

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    writeToLog(data);
    var dataArr = data.split(',')

    if (dataArr.length == 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      pick(dataArr[0]);
    }
  });
}

var userInput = process.argv[2]
var movieTitle = process.argv[3]
pick(userInput, movieTitle);




