const movie = require("../models/movie");
const Movie = require("../models/movie");
const fs = require("fs");

exports.addOne = (req, res, next) => {

    if (!req.body.name || !req.body.author || req.body.name.trim() === "" || req.body.author.trim() === "") {
        return res.status(400).json({ error: "Name and author are required" });
    }
    const movieObj = new Movie({
        name: req.body.name,
        author: req.body.author,
        imgUrl: req.file ? req.file.filename : "undefined",
        posterId: req.auth.userId,
    })
    movieObj.save()
        .then(() => res.status(201).json({ success: true, msg: "Movie created", movie: movieObj }))
        .catch((err) => res.status(400).json({ err }))
};

exports.getMovies = (req, res, next) => {
    Movie.find()
        .then((movies) => {

            const resultat = movies.map(movie => {
                const { posterId, ...rest } = movie.toObject(); // On simplifie l'objet pour retirer toutes les propriétés internes de Mongoose.
                return rest;
            });

            res.status(200).json({ success: true, msg: "tableau des movies", movies: resultat });
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json({ err });
        });
};


exports.deleteMovie = (req, res, next) => {
    Movie.findOne({ _id: req.params.id })
        .then((movie) => {
            if (req.auth.userId === movie.posterId || req.auth.isAdmin === true) {
                fs.unlink(`images/${movie.imgUrl}`, () => {
                    movie.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ success: true, msg: "movie supprimée" }))
                })
            } else {
                return res.status(400).json({ msg: "Not authorized" });
            }
        })
        .catch((err) => res.status(500).json({ err }));
}

exports.updateMovie = (req, res, next) => {
    Movie.findOne({ _id: req.params.id })
        .then((movie) => {
            const movieObj = {
                name: req.body.name || movie.name,
                author: req.body.author || movie.author,
                imgUrl: req.file ? req.file.filename : movie.imgUrl,
                _id: movie._id
            }
            if (req.auth.userId === movie.posterId || req.auth.isAdmin === true) {
                if (req.file) {
                    fs.unlink(`images/${movie.imgUrl}`, () => {
                        Movie.updateOne(
                            { _id: req.params.id },
                            { ...movieObj, _id: req.params.id }
                        )
                            .then(() => res.status(200).json({ success: true, msg: "Movie updated", updatedMovie: movieObj }))
                            .catch((err) => res.status(400).json({ err }));
                    });
                } else {
                    Movie.updateOne(
                        { _id: req.params.id },
                        { ...movieObj, _id: req.params.id }
                    )
                        .then(() => res.status(200).json({ success: true, msg: "Movie updated", updatedMovie: movieObj }))
                        .catch((err) => res.status(400).json({ err }));
                }

            } else {
                return res.status(400).json({ msg: "Not authorized" });
            }
        })
        .catch((err) => res.status(400).json({ err }));
}