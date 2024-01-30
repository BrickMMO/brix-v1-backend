const router = require("express").Router();
const TweetsController = require("../controllers/tweetController");

// routes for getting all tweets.
router.get("/get-all-tweets", TweetsController.getAllTweets);

// route to add a new tweet
router.post("/add-new-tweet", TweetsController.addNewTweet);

module.exports = router;