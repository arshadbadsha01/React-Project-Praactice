const express = require("express");
const authUser = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  getMeController,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/get-me", authUser, getMeController);

module.exports = router;
