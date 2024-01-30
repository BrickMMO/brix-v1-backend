const router = require("express").Router();
const UserController = require("../controllers/userController");

// route to add a new user
router.post("/add-new-user", UserController.addNewUser);

module.exports = router;