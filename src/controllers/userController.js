const User = require("../modals/user.modal");

exports.addNewUser = async (request, response) => {
  try {
    // destructor the request body here.
    const { userName } = request.body;

    // add a new entry in the users table with username
    const newUser = new User({
      userName,
      isApproved: false,
      rejectReason: "",
      userKeyHash: userName,
    });
    newUser.save();
    response.json({"message":"User Added Successfully", "userToken": newUser.userKeyHash});
  } catch (err) {
    response.status(400).json(err);
  }
};
