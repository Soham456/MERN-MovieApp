import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import movieApi from '../api/movieApi';
import { setMovies, setLoading } from '../redux/movieSlice';
import MovieCard from '../components/MovieCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box, MenuItem, Select, TextField, Typography } from '@mui/material';

const HomePage = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);
  const [query, setQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('title');
  const itemsPerPage = 6;

  // Fetch movies sorted by the selected option
  useEffect(() => {
    const fetchSortedMovies = async () => {
      try {
        dispatch(setLoading(true));
        const response = await movieApi.sortedMovies(sortBy);
        dispatch(setMovies(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        console.error('Error fetching sorted movies:', error);
      }
    };
    fetchSortedMovies();
  }, [sortBy, dispatch]);

  // Filter movies based on the query
  useEffect(() => {
    let filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
    setPage(1); 
  }, [query, movies]);

  // Paginate filtered movies
  const paginatedMovies = filteredMovies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          All Movies
        </Typography>

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

        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <MenuItem value="duration">Duration</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="title">Name</MenuItem>
          <MenuItem value="releaseDate">Date</MenuItem>
        </Select>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
          {paginatedMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>

        <Stack spacing={4} justifySelf="center" padding={2}>
          <Pagination
            count={Math.ceil(filteredMovies.length / itemsPerPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            variant="outlined"
          />
        </Stack>
      </Box>
    </div>
  );
};

export default HomePage;
