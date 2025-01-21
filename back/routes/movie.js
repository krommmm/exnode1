const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");
const movieCtrl = require("../controllers/movie");

router.post("/", auth, multer, movieCtrl.addOne);

module.exports = router;

