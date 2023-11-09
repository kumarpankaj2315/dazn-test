const express = require("express");
const router = express.Router();

const movieSchema = require("../model/lobby");

router.get("/movies", async (req, res) => {
  try {
    let movieList = await movieSchema.find();
    console.log("movieList", movieList);
    res.status(200).send({ movieList: movieList });
  } catch (error) {
    console.log("error in movie fetch", error);
    res.status(400).send({ message: "opps something went wrong" });
  }
});

router.get("/search", async (req, res) => {
  console.log(req.query.title, req.query.genre);

  let movieListTitle = await movieSchema.find({ title: req.query.q });
  let movieListgenre = await movieSchema.find({ genre: req.query.q });

  let result = [];
  if (movieListTitle && movieListTitle.length) {
    result = [...movieListTitle];
  }

  if (movieListgenre && movieListgenre.length) {
    result = [...movieListgenre];
  }

  res.status(200).send({ movieList: result });
});

router.post("/movies", async (req, res) => {
  try {
    let movie = new movieSchema(req.body);
    movie = await movie.save();
    res.status(201).send({ data: movie });
  } catch (error) {
    console.log("error in post movie", error);
    res.status(400).send({ message: "Something went wrong" });
  }
});

router.put("/movies/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    let movieKey = ["title", "genre", "rating", "streaming_link"];
    let body = req.body;
    let updateData = {};
    movieKey.forEach((key) => {
      if (body[key]) {
        updateData[key] = body[key];
      }
    });
    let updatedData = await movieSchema.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    res.status(200).send({ updatedData: updatedData });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ message: "Somthing went wrong" });
  }
});

router.delete("/movies/:id", async (req, res) => {
  try {
    let movieId = req.params.id;

    let deletedMovie = await movieSchema.findByIdAndDelete(movieId);
    console.log("deletedMovie", deletedMovie);
    if (!deletedMovie) {
      res.status(400).send({ message: "Movie doesn't exist", data: null });
    }
    res
      .status(400)
      .send({ message: "Movie deleted Successfully", data: deletedMovie });
    res.status(200).send({ deletedMovie: deletedMovie });
  } catch (error) {
    console.log("error while deleting movie", error);
  }
});

module.exports = router;
