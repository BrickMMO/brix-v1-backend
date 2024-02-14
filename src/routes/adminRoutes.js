const router = require("express").Router();
const AdminController = require("../controllers/adminController");

// login for admin
router.post("/login", AdminController.adminLogin);

// login for admin
router.post("/create", AdminController.createAdmin);

// update a user
router.post("/update-user", AdminController.updateUser);

module.exports = router;