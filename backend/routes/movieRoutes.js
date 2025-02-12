const express = require('express');
const { getMovies, getSortedMovies, searchMovies, addMovie, updateMovie, deleteMovie } = require('../controllers/movieController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getMovies);
router.get('/sorted', getSortedMovies);
router.get('/search', searchMovies);
router.post('/', protect, adminOnly, addMovie);
router.put('/:id', protect, adminOnly, updateMovie);
router.delete('/:id', protect, adminOnly, deleteMovie);

module.exports = router;
