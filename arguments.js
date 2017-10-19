//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says

//these add other programs to this one
var dataKeys = require("./keys.js");
var fs = require('fs'); //file system
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

//Creates a function for finding artist name from spotify
var getArtistNames = function(artist) {
  return artist.name;
};

//Function for finding songs on Spotify
var getMeSpotify = function(songName) {
  //If it doesn't find a song, find Blink 182's What's my age again
  if (songName === undefined) {
    songName = 'What\'s my age again';
  };

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }

    var songs = data.tracks.items;
    var data = []; //empty array to hold data

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


var getTweets = function() {
  var client = new twitter(dataKeys.twitterKeys);

  var params = { screen_name: 'bebechan_bichon', count: 10 };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      var data = []; //empty array to hold data
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
    movieName = 'Mr Nobody';
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";

  request(urlHit, function(error, response, body) {
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

//run this on load of js file
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);










//Make it so liri.js can take in one of the following commands:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

var Twitter = require('twitter');
// var Request = require('request');
// var Spotify = require('spotify');
// var omdb = require('omdb');
 

var keys = require("./keys.js"); 




//write a function that takes in the command line argument
//based on the command, execute a specific task

function getTweets () {
var client = new Twitter(keys) 

var params = {screen_name: 'bebechan_bichon'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

    for (i = 0; i < tweets.length; i++) {
      console.log(tweets[i].created_at);
      console.log(tweets[i].text);
    }
    //console.log(tweets);
  }

});

}


//create a function for finding artist name from spotify
var getArtistNames = function(artist) {
  return artist.name;
};

//fnuction for finding songs on Spotify
var getMeSpotify = function(songName) {
  //If it doesn't find a song, find a specified song 
  if (songName === undefined) {
    songName = 'I want it that way';
  };

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }

    var songs = data.tracks.items;
    var data = []; //empty array to hold data

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


  var pickAPI = function(caseData) {
  switch (caseData) {
    case 'my-tweets':
      getTweets();
      break;
    case 'spotify-this-song':
      getSpotify();
      break;
    case 'movie-this':
      getMovie();
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log('LIRI doesnt know that');
  }
}


















