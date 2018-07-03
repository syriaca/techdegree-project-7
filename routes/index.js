var express = require('express');
var router = express.Router();
const config = require('../config');
const Twit = require('twit');
const Moment = require('moment');
const T = new Twit(config);
let userInfo = {};
const userTweets = [];
const userFriends = [];
const userDirectMessages = [];

// get user information
T.get('account/verify_credentials', function(err, data, response)  {
  userInfo = {
    screen_name: data.screen_name,
    avatar: data.profile_image_url,
    id: data.id
  }  
})

// get 5 latest tweet
T.get('statuses/user_timeline', {count: 5},
  function(err, data, response) {
    data.forEach(function(tweet) {
      const tweetObject = {};
      tweetObject.name = tweet.user.name;
      tweetObject.screen_name = tweet.user.screen_name;
      tweetObject.date = tweet.created_at;
      tweetObject.avatar = tweet.user.profile_image_url;
      tweetObject.text = tweet.text;
      tweetObject.retweets = tweet.retweet_count;
      tweetObject.likes = tweet.favorite_count;
      userTweets.push(tweetObject);
  });
});

// get 5 latest friends information
T.get('friends/list', {count: 5}, function(err, data, response)  {
  data.users.forEach(function(friend) {    
    const friendsObject = {};
    friendsObject.name = friend.name;
    friendsObject.screen_name = friend.screen_name;
    friendsObject.avatar = friend.profile_image_url;
    friendsObject.following = friend.following;
    userFriends.push(friendsObject);
  });
});


// Get & display 5 most recent direct messages
T.get('direct_messages/events/list', {count: 5},
  function(err, data, response) {
    const directMessagesObject = {};
    data.events.forEach(function(message) {    
      const directMessagesObject = {};
      let userId = message.message_create.sender_id;
      let recipient_name;
      T.get('users/show', {user_id: userId}, function(err, data, response) {
        if(data.id != userInfo.id) {
          recipient_name = data.name;
        }        
      });
      directMessagesObject.recipient_name = recipient_name;
      userDirectMessages.push(directMessagesObject);      
    });
  });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
    { title: 'Twitter Client', userInfo, userTweets, userFriends, userDirectMessages }
  );
});

module.exports = router;