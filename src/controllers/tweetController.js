const axios = require("axios");
const Tweet = require("../modals/tweet.modal");
const Users = require("../modals/user.modal");

// controller to get all tweets
exports.getAllTweets = (_, response) => {
  // the below function returns a promise.
  try {
    Tweet.find()
      .populate({ path: "userId", select: ["imageUrl", "userName"] })
      .then((tweet) => response.status(200).json(tweet))
      .catch((err) => response.status(500).json(err));
  } catch (err) {
    response.status(400).json(err);
  }
};

exports.addNewTweet = async (request, response) => {
  try {
    // destructure the request body like username, tweetcontent, tweetimages
    const { tweetContent, tweetImage, userName } = request.body;

    // check if the username exisit in the user database
    const userAlreadyExists = await Users.findOne({
      userName,
    });

    // if no then create a user
    if (!userAlreadyExists) {
      const user = new Users({
        userName,
        isApproved: false,
        imageUrl: "",
        rejectReason: "",
      });
      user.save().then(() => {
        // create a new tweet object with tweetcontnet, tweetimage, and username
        // push it in the database
        Tweet({
          tweetContent,
          tweetImage,
          userId: user?._id,
          userName,
        }).save();
        // return success message
        response.status(200).json({ status: 200, message: "Tweet Added" });
      });
    }
  } catch (err) {
    response.status(400).json(err);
  }
};
