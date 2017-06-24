var fs = require ('fs');
var keys = require ('./keys.js');
var request = require ('request');
var inquirer = require ('inquirer');
var Twitter = require ('twitter');
var moment = require ('moment');
var Spotify = require('node-spotify-api');





var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});
 
// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });


// *******************************

var spotify = new Spotify ({
	id: keys.spotifyKeys.client_id,
	secret: keys.spotifyKeys.client_secret
})





// *************************************

// var movieName = process.argv[3];

// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";



// ***************************************

inquirer.prompt([

{
	type: 'list',
	name: 'commands',
	message: 'What would you like to do?',
	choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'] 
}

]).then(function(user) {

	if (user.commands === 'my-tweets') {


		console.log('View your last 20 tweets:');



		var params = {
			screen_name: 'nottherealkz',
			count: '20'};

		client.get('statuses/user_timeline', params, function(error, tweets, response) {
  			
  			if (!error) {

    		 for(var i=0;i<tweets.length;i++){
			      console.log(tweets[i].text);
			      console.log(tweets[i].created_at);
			      console.log(' ');
  				}
  			}

  			else {
  				console.log(error);
  			}
			});


	}

	else if (user.commands === 'spotify-this-song') {

		console.log('Choose your song:');


		spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  			if (err) {
    			return console.log('Error occurred: ' + err);
  				}
 
		console.log(data); 
		});


	}

	else if (user.commands === 'movie-this') {

		console.log('Choose your movie:');



		var nodeArgs = process.argv;

		var movieName = ""


		for (var i = 2; i < nodeArgs.length; i++) {
  			if (i > 2 && i < nodeArgs.length) {
   			 movieName = movieName + "+" + nodeArgs[i];
  				}
  			else {
    		 movieName += nodeArgs[i];
  			}

  		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

  		request(queryUrl, function(error, response, body) {

  			if (!error && response.statusCode === 200) {

  				console.log("Title: " + JSON.parse(body).Title);
  				console.log("Release Year: " + JSON.parse(body).Year);
  			}
  		})
}


	}

	else if (user.commands === 'do-what-it-says') {

		fs.readFile("random.txt", "utf8", function(error, data) {
			if (error)	{
				return console.log(error);
			}

			// console.log(data);

			var dataArr = data.split(",");

			console.log(dataArr);
		

		})


	}

	else	{

		console.log("That is not a valid choice, fool!");
	}


});