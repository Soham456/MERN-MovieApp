import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: { movies: [], loading: false , movie:{} },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMovie: (state, action) => {
      state.movie = action.payload;
    }
  }
});

export const { setMovies, setLoading, setMovie } = movieSlice.actions;
export default movieSlice.reducer;
