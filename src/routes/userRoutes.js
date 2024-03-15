const router = require("express").Router();
const UserController = require("../controllers/userController");

// route to get all users
router.get('/get-all-users', UserController.getAllUsers);

// route to get user details
router.get('/:userId/get-user-details', UserController.getUserDetailsById);

// route to add a new user
router.post("/add-new-user", UserController.addNewUser);

// get all tweets of the user
router.get("/:userId/get-all-tweets", UserController.getAllTweets);

module.exports = router;