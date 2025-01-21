const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    favorites: {
        type: [
            {
                movieId: String,
                text: String
            }
        ]
    },
});

module.exports = mongoose.model("user", userSchema);