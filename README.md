# techdegree-project-7
Plan, prepare & perform

 // With twitter REST API:    
    https://developer.twitter.com/en/docs
    //==== Get automatic authenticate access to twitter profile ====//
        ==> twitter api doc:   https://developer.twitter.com/en/docs/basics/authentication/overview/oauth
        ==> npm module to authenticate: https://github.com/ttezel/twit

    //====  Get & display 5 most recent tweets ====//
        ==> https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object
        ==> https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html
        Using tweet object:
         "user": {
             "name": "TwitterDev",
            "screen_name": "TwitterDev",
            "url": "https://dev.twitter.com/",
         },
         reply_count,
         retweet-count,
         favorite_count    


    //==== Get & display 5 most recents friends ====//
        ==> https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/overview

        GET friends/list
         ==> https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-list
        JSON:
            "users": [
                {
                    "profile_image_url": "http://a0.twimg.com/profile_images/2838630046/4b82e286a659fae310012520f4f756bb_normal.png",
                    "name": "Sylvain",
                    "screen_name": "froginthevalley"
                }
            ]

        POST friendships/create
            ==> https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-create

        POST friendships/destroy
            ==> https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-destroy


    //==== Get & display 5 most recent direct messages ====//

        GET direct_messages/events/list
            ==> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/list-events

