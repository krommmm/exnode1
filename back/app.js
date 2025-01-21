require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");

app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.USERR}:${process.env.PASSWORD}@cluster0.fb2d6.mongodb.net/`)
    .then(() => console.log("Connection à mongoDB réussie"))
    .catch(() => console.log("Connection à mongoDB échouée"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Accept,Content,Content-Type,Authorization,Origin, X-requrested-With");
    next();
});

app.use("/api/auth", userRoutes);
app.use("/api/movie", movieRoutes);

module.exports = app;