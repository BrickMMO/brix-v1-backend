const axios = require("axios");
const Tweet = require("../modals/tweet.modal");
const Users = require("../modals/user.modal");

// controller to get all tweets
exports.getAllTweets = async (_, response) => {
  // the below function returns a promise.
  try {
    const tweets = await Tweet.find().populate({ path: "userId", select: ["imageUrl", "userName", "isApproved"] });

    return response.status(200).json(tweets.filter((t) => t.userId.isApproved));
  } catch (err) {
    return response.status(400).json(err);
  }
};

exports.addNewTweet = async (request, response) => {
  try {
    // destructure the request body like username, tweetcontent, tweetimages
    const { tweetContent, tweetImage, userName } = request.body;

    // check if the username exisit in the user database
    let user = await Users.findOne({
      userName,
    });

    // if no then create a user
    if (!user) {
      user = new Users({
        userName,
        isApproved: false,
        imageUrl: "",
        rejectReason: "",
      });
      user.save();
    }

    // create a new tweet object with tweetcontnet, tweetimage, and username
    // push it in the database
    const tweet = new Tweet({
      tweetContent,
      tweetImage,
      userId: user?._id,
      userName,
    });

    tweet.save();
    // return success message
    return response.status(200).json({ status: 200, message: "Tweet Added" });
  } catch (err) {
    return response.status(400).json(err);
  }
};
