const Tweet = require("../modals/tweet.modal");
const User = require("../modals/user.modal");

exports.getAllUsers = async (request, response) => {
  try {
    const users = await User.find({});
    return response.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    return response.status(500).json(err);
  }
};

exports.addNewUser = async (request, response) => {
  try {
    // destructor the request body here.
    const { userName } = request.body;

    // add a new entry in the users table with username
    const newUser = new User({
      userName,
      isApproved: false,
      imageUrl: "",
      rejectReason: "",
    });
    newUser.save();
    return response.json({ message: "User Added Successfully", data: newUser });
  } catch (err) {
    return response.status(400).json(err);
  }
};

exports.getAllTweets = async (request, response) => {
  // get userId from query params
  const { userId } = request.params;
  // check if the user id is present in the query params
  if (!userId) {
    return response.status(400).json({
      message: "Please specify the user you want to get the tweets",
    });
  }

  // check if the user exist in the database
  const user = await User.findById(userId);

  if (!user) {
    return response.status(400).json({
      message: "No User found!",
    });
  }

  try {
    // get all the tweets from the tweets collection with a specific userID
    const tweets = await Tweet.find({
      userId,
    });

    return response.status(200).json({
      message: "Tweets Fetched Successfully!",
      data: tweets,
    });
  } catch (err) {
    return response.status(500).json(err);
  }
};
