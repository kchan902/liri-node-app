//Liri takes the following arguments:
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says


var keys = require("./keys.js");
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');


var writeToLog = function(data) {
  fs.appendFile("log.txt", '\r\n\r\n');

  fs.appendFile("log.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
}

function getTweets () {
var client = new twitter(keys) 

var params = {screen_name: 'bebechan_bichon'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

    for (i = 0; i < tweets.length; i++) {
      console.log(tweets[i].created_at);
      console.log(tweets[i].text);
    }
    console.log(tweets);
  }

});

}



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
      console.log('LIRI doesn\'t know that');
  }
}

//user will pass  an argument within the pick function

var userInput = process.argv[2]

var movieTitle = process.argv[3]

pick(userInput, movieTitle);




