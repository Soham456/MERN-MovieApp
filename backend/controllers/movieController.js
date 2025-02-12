const Movie = require('../models/Movie');

const getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

const getSortedMovies = async (req, res) => {
  const { sortBy } = req.query;
  const movies = await Movie.find().sort({ [sortBy]: 1 });
  res.json(movies);
};

const searchMovies = async (req, res) => {
  const { query } = req.query;
  try {
    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMovie = async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(201).json(movie);
};

const updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(movie);
};

const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
};

module.exports = { getMovies, getSortedMovies, searchMovies, addMovie, updateMovie, deleteMovie };
