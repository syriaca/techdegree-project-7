const express = require('express');
const router = express.Router();
const config = require('../config');
const Twit = require('twit');
const T = new Twit(config);
const moment = require('moment');
let userInfo = {};
const userTweets = [];
const userFriends = [];
const userDirectMessages = [];

// get user information
T.get('account/verify_credentials', function(err, data, response)  {
  userInfo = {
    name: data.name,
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
      tweetObject.date = moment(tweet.created_at).startOf('day').fromNow();
      tweetObject.avatar = tweet.user.profile_image_url;
      tweetObject.text = tweet.text;
      tweetObject.retweets = tweet.retweet_count;
      tweetObject.likes = tweet.favorite_count;
      userTweets.push(tweetObject);
      console.log(userTweets);
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
// T.get('direct_messages/events/list', {count: 1},
//   function(err, data, response) {
//     data.events.forEach(function(message) {
//       let recipientAvatar;
//       let recipientName;
//       let recipientObject = {};
//       const directMessagesObject = {};
//       let userId = message.message_create.sender_id;      
//       T.get('users/show', {user_id: userId}, function(err, data, response) {
//         console.log(data);
//         if(data.id != userInfo.id) {
//           recipientAvatar =  data.profile_image_url;
//           recipientName = data.name;
//           console.log(recipientAvatar);
//           console.log(recipientName);
//           // return recipientObject = {
//           //   recipient_name: recipientAvatar,
//           //   recipient_avata: recipientName
//           // }
//         } else {
//           recipientAvatar =  userInfo.namer;
//           recipientName = userInfo.avatar;
//           // return recipientObject = {
//           //   recipient_name: recipientAvatar,
//           //   recipient_avata: recipientName
//           // }
//         }        
//       });
//       directMessagesObject.recipient = recipientObject.recipient_name;
//       directMessagesObject.avatar = recipientObject.recipient_avatar;
//       directMessagesObject.timestamp = message.created_timestamp;
//       directMessagesObject.text = message.message_create.message_data;
//       userDirectMessages.push(directMessagesObject);
//     });
//   });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
    { title: 'Twitter Client', userInfo, userTweets, userFriends, userDirectMessages }
  );
});

module.exports = router;