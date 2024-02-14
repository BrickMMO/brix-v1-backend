const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../modals/admin.modal");
const Users = require("../modals/user.modal");

exports.adminLogin = async (request, response) => {
  // destructor the email and password
  const { email, password } = request.body;

  // check if email and password are present
  if (!email) {
    return response.status(400).json({
      message: "Email cannot be null!",
    });
  }
  if (!password) {
    return response.status(400).json({
      message: "Password cannot be null!",
    });
  }

  try {
    // check if the user exists
    const admin = await Admin.findOne({ email });

    // check if email is present or not
    if (!admin)
      return response.status(400).json({
        message: "No user found",
      });

    // check if the password hash matches or not
    if (!bcrypt.compareSync(password, admin.password))
    return response.status(400).json({
        message: "Email or password is incorrect!",
      });

    // create a token to share it to frontend
    const token = jwt.sign({ id: request.body._id }, process.env.TOKEN_SECRET);
    return response.status(200).json({
      token,
      data: admin,
      message: "Login Successfull!",
    });
  } catch (err) {
    return  response.status(400).json(err);
  }
};

exports.createAdmin = async (request, response) => {
  // destructure the request body
  const { name, email, password } = request.body;

  // check if the user is present or not
  const user = await Admin.findOne({ email });
  if (user)
  return response.status(400).json({
      message: "Email already exists! Try login instead",
    });

  try {
    let hashedPassword;
    // hash the password here
    await bcrypt
      .hash(password, 12)
      .then((password) => (hashedPassword = password))
      .catch((err) => console.log(err));

    // Create a new user and save in the DB
    Admin({
      name,
      email,
      password: hashedPassword,
    }).save();

    return response.status(200).json({
      message: "Admin Created Successfully!",
    });
  } catch (err) {
    return response.status(400).json(err);
  }
};

exports.updateUser = async (request, response) => {
  // destructor the email and password
  const { userId, isApproved, rejectReason = "" } = request.body;
  try {
    // check if email and password are present
    if (!userId) {
      return response.status(400).json({
        message: "Please specify the user you want to update!",
      });
    }
    if (isApproved === null) {
      return response.status(400).json({
        message: "Please specify the action!",
      });
    }

    if (isApproved === false && rejectReason === "") {
      return response.status(400).json({
        message: "Please specify the reject reason!",
      });
    }
    // check if the user exists
    let user = await Users.findById(userId);

    // check if email is present or not
    if (!user)
    return response.status(400).json({
        message: "No user found",
      });

    // check if the user is already approved or disapproved
    if (user.isApproved === isApproved) {
      return response.status(400).json({
        message: `You cannot ${isApproved ? "Approve" : "Disapprove"} ${
          user.isApproved ? "an approved" : "a disapproved"
        } user`,
      });
    }
    
    // change the isApproved flag for that user
    user.rejectReason = rejectReason;
    user.isApproved = isApproved;

    user.save();

    return response.status(200).json({ message: "User updated successfully!", data: user });
  } catch (err) {
    return response.status(400).json(err);
  }
};
