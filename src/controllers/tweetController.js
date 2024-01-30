const axios = require("axios");
const Tweet = require("../modals/tweet.modal");
const Users = require("../modals/user.modal");

// controller to get all tweets
exports.getAllTweets = (_, response) => {
  // the below function returns a promise.
  Tweet.find()
    .then((tweet) => response.status(200).json(tweet))
    .catch((err) => response.status(500).json(err));
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
      console.log("Adding a new user as it is not present in the database");
      axios
        .post(`${process.env.CLIENT_BASE_URL}/users/add-new-user`, {
          userName,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    // create a new tweet object with tweetcontnet, tweetimage, and username
    // push it in the database
    Tweet({
        tweetContent,
        tweetImage,
        userName
    }).save();
    // return success message
    response.status(200).json({ status: 200, message: "Tweet Added" });
  } catch (err) {
    response.status(400).json(err);
  }
};
