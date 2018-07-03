const express = require('express');
const router = express.Router();
const config = require('../config');
const Twit = require('twit');
const T = new Twit(config);
const moment = require('moment');
moment.suppressDeprecationWarnings = true;
let myself = {};
const userTweets = [];
const userFriends = [];
const userDirectMessages = [];

// Get YOUR informations
T.get('account/verify_credentials', function(err, data, response)  {
  if(err) {
		console.log(err)
  }  
  myself = {
    name: data.name,
    screen_name: data.screen_name,
    avatar: data.profile_image_url,
    id: data.id
  }
})

// Get the 5 latest tweet
T.get('statuses/user_timeline', {count: 5}, function(err, data, response) {
    if(err) {
      console.log(err)
    }
    data.forEach(function(tweet) {
      const tweetObject = {};
      tweetObject.name = tweet.user.name;
      tweetObject.screen_name = tweet.user.screen_name;
      tweetObject.date = moment(tweet.created_at).startOf('day').fromNow();
      tweetObject.avatar = tweet.user.profile_image_url;
      tweetObject.text = tweet.text;
      tweetObject.retweets = tweet.retweet_count;
      tweetObject.likes = tweet.favorite_count;
      userTweets.push(tweetObject);
  });
});

// Get the 5 latest friends information
T.get('friends/list', {count: 5}, function(err, data, response)  {
  if(err) {
    console.log(err)
  }
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
T.get('direct_messages/events/list', {count: 5}, function(err, data, res) {
    if(err) {
	      console.log(err)
     }
    data.events.forEach(function(message) {
      const directMessagesObject = {};

      directMessagesObject.id = message.message_create.sender_id;
      directMessagesObject.timestamp = moment(parseInt(message.created_timestamp)).fromNow();
      directMessagesObject.text = message.message_create.message_data.text;

      // Get avatar and name with id get from the direct message object
      T.get('users/show', {user_id: directMessagesObject.id}, function(err, data, response) {
        if(err) {
	        console.log(err)
        }
        directMessagesObject.avatar =  data.profile_image_url;
        directMessagesObject.name =  data.name;
      });      
      userDirectMessages.push(directMessagesObject);
    });
  });

// Index route
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Client', myself, userTweets, userFriends, userDirectMessages });
});

module.exports = router;