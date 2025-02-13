const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  rating: Number,
  releaseDate: Date,
  duration: Number,
  posterUrl: String
});

module.exports = mongoose.model('Movie', MovieSchema);
