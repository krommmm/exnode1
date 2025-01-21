const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String },
    imgUrl: { type: String },
});

module.exports = mongoose.model("movie", movieSchema);