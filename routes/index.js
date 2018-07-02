var express = require('express');
var router = express.Router();
const config = require('../config');
const Twit = require('twit');
const bodyParser = require('body-parser');
const T = new Twit(config);
let userInfo = {};
const userTweets = [];
const userFriends = [];

// get friend
T.get('friends/list', {count: 1}, function(err, data, response)  {
  const friends = JSON.parse(data);
  // for(var i = 0; i <  friends.length; i++) {
  //   console.log(i);
  //   const friendsObject = {};
  //   friendsObject.name = friend.name;
  //   friendsObject.screen_name = friend.screen_name; 
  //   friendsObject.avatar = friend.profile_image_url;
  //   friendsObject.following = friend.following;
  //   console.log(friendsObject); 
  // }
});

// get user information
T.get('account/verify_credentials', function(err, data, response)  {
  userInfo = {
    screen_name: data.screen_name,
    profile_image: data.profile_image_url
  }
})

// get 5 latest tweet
T.get('statuses/user_timeline', {count: 5},
  function(err, data, response) {
    data.forEach(function(tweet) {
      const tweetObject = {};
      tweetObject.text = tweet.text;
      tweetObject.date = tweet.created_at;
      tweetObject.retweets = tweet.retweet_count;
      tweetObject.likes = tweet.favorite_count;
      userTweets.push(tweetObject);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
    { title: 'Twitter Client', userTweets, userInfo }
  );
});

module.exports = router;
