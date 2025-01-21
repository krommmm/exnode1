const Movie = require("../models/movie");

exports.addOne = (req, res, next) => {
    const movieObj = new Movie({
        name: req.body.name,
        author: req.body.author,
        imgUrl: req.file ? req.file.filename : "undefined"
    })
    movieObj.save()
        .then(() => res.status(201).json({ msg: "Movie created" }))
        .catch((err) => res.status(401).json({ err }))
};