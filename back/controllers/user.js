require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ msg: "User created" }))
                .catch((err) => res.status(401).json({ msg: "Error while trying to create a user", err: err }));
        })
        .catch((err) => res.status(500).json({ msg: "error with the hash", err: err }));
};

exports.logIn = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ msg: "Password uncorrect" });
                    }
                    res.status(200).json({
                        msg:"User connected",
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id, isAdmin: user.isAdmin },
                            `${process.env.SECRET_KEY}`,
                            { expiresIn: "24h" }
                        )
                    })
                })
        })
        .catch((err) => res.status(500).json({ msg: "Can't find user", err: err }));
};


exports.isUserAdmin = (req, res, next) => {
    const isAdmin = req.auth.isAdmin;
    res.status(200).json({ isAdmin: isAdmin });
};
