const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../modals/admin.modal");

exports.adminLogin = async (request, response) => {
  // destructor the email and password
  const { email, password } = request.body;

  // check if email and password are present
  if (!email) {
    response.status(400).json({
      message: "Email cannot be null!",
    });
  }
  if (!password) {
    response.status(400).json({
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
    console.log("token", token);
    response.status(200).json({
      token,
      message: "Login Successfull!",
    });
  } catch (err) {
    response.status(400).json(err);
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

    response.status(200).json({
      message: "Admin Created Successfully!",
    });
  } catch (err) {
    response.status(400).json(err);
  }
};
