const {
  registerController,
  loginController,
  accountVerifyController,
  // forgotPasswordController,
  // changePassword,
  // verifyCodeController,
  // creatNewPasswordController,
} = require("../controllers/authController");

const router = require("express").Router();

// registration route
router.post("/register", registerController);

// account verify
router.post("/account-verify", accountVerifyController);

// login route
router.post("/login", loginController);

// // change password
// router.patch("/change-password/:userId", changePassword);

// // forgot password route
// router.post("/forgot-password", forgotPasswordController);

// // verify code route
// router.post("/forgot-password/verify-code", verifyCodeController);

// // create new password route
// router.post("/forgot-password/create-new-password", creatNewPasswordController);

module.exports = router;
