var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Client' });
  console.log(TwitConfig.consumer_key);
});

module.exports = router;
