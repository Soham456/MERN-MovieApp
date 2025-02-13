import React, { useEffect, useState } from 'react';
import movieApi from '../api/movieApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMovie } from '../redux/movieSlice';
import { Button, TextField, Box, Typography, Paper, Grid, CardMedia } from '@mui/material';

const AddMoviePage = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [duration, setDuration] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [isMovie, setIsMovie] = useState(false);
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movie);

  useEffect(() => {
    if (movie && Object.keys(movie).length > 0) {
      setIsMovie(true);
      setId(movie._id || '');
      setTitle(movie.title || '');
      setDescription(movie.description || '');
      setDuration(movie.duration || '');
      setReleaseDate(movie.releaseDate || '');
      setRating(movie.rating || '');
      setPosterUrl(movie.posterUrl || '');
    }
  }, [movie]);

  const handleAddMovie = async () => {
    const token = localStorage.getItem('token');
    const movieData = {
      title,
      description,
      rating: parseFloat(rating),
      releaseDate,
      duration: parseInt(duration),
      posterUrl,
    };

    try {
      if (!isMovie) {
        await movieApi.addMovie(movieData, token);
        alert('Movie added successfully!');
      } else {
        await movieApi.editMovie(id, movieData, token);
        alert('Movie details updated successfully!');
      }
      dispatch(setMovie({}));
    } catch (error) {
      alert('Failed to add movie. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f6f8',
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, width: '100%', maxWidth: 800, borderRadius: 4 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {isMovie ? 'Update Movie Details' : 'Add Movie'}
        </Typography>

        <Grid container spacing={2} alignItems="flex-start">
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Rating (0-10)"
              variant="outlined"
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Release Date"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Duration (minutes)"
              variant="outlined"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Poster URL"
              variant="outlined"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMovie}
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                textTransform: 'none',
                borderRadius: '8px',
              }}
            >
              {isMovie ? 'Update Movie Details' : 'Add Movie'}
            </Button>
          </Grid>

          {/* Poster Preview Section */}
          <Grid item xs={12} md={6}>
            {posterUrl && (
              <CardMedia
                component="img"
                height="400"
                image={posterUrl}
                alt="Movie Poster"
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  objectFit: 'contain',
                  width: '100%',
                }}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AddMoviePage;
