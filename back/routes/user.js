const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");

router.get('/isUserAdmin', auth, userCtrl.isUserAdmin);
router.post("/signup", userCtrl.signUp); 
router.post("/login", userCtrl.logIn);

module.exports = router;

