import React, { useEffect, useState } from 'react';
import movieApi from '../api/movieApi';
import MovieCard from '../components/MovieCard';
import { Button, Card, CardContent, Pagination, Stack, TextField, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies, setLoading, setMovie } from '../redux/movieSlice';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);
  const [query, setQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 5;

  // Fetch all movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(setLoading(true));
      const response = await movieApi.getAllMovies();
      dispatch(setMovies(response.data));
      dispatch(setLoading(false));
    };
    fetchMovies();
  }, [dispatch]);

  // Filter movies based on query and reset to page 1 on query change
  useEffect(() => {
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
    setPage(1); 
  }, [query, movies]);

  // Paginate filtered movies
  const paginatedMovies = filteredMovies.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  // Handle movie deletion
  const handleDelete = async (movieId) => {
    const token = localStorage.getItem('token');
    await movieApi.deleteMovie(movieId, token);
    dispatch(setMovies(movies.filter((movie) => movie._id !== movieId))); 
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom >
            Admin Page
          </Typography>
          <Button color="error" variant="outlined" sx={{ position: 'absolute', right: 24 }} onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <TextField
          fullWidth
          style={{ maxWidth: 400 }}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or description"
          value={query}
          label="Movie Search"
          variant="outlined"
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, mt: -10 }}>
          <Button color="success" variant="contained" onClick={() => navigate('/add-movie')}>
            Add Movie +
          </Button>
        </Box>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
          {paginatedMovies.map((movie) => (
            <Card
              key={movie._id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 400,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: 8,
                position: 'relative',
              }}
            >
              <CardContent
                style={{
                  textAlign: 'center',
                  flex: 1,
                  overflowY: 'auto',
                  maxHeight: '300px',
                }}
              >
                <MovieCard movie={movie} />
              </CardContent>

              {/* Button Section */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  padding: 2,
                  backgroundColor: '#f4f4f4',
                  borderRadius: '0 0 8px 8px',
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    dispatch(setMovie(movie));
                    navigate('/add-movie');
                  }}
                >
                  Edit
                </Button>
                <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(movie._id)}>
                  Delete
                </Button>
              </Box>
            </Card>
          ))}
        </div>

        <Stack spacing={2} direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            variant="outlined"
            size="large"
          />
        </Stack>
      </Box>
    </>
  );
};

export default AdminPage;
