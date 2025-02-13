import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const MovieCard = ({ movie }) => {
  const formattedDate = new Date(movie.releaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <Card style={{ margin: 10, width: 200 }}>
      
      <CardMedia
        component="img"
        height="300"
        image={movie.posterUrl || "https://via.placeholder.com/200x300?text=Movie+Poster"}
        alt={movie.title}
      />
      <CardContent>
        <Typography 
          variant="h6" 
          noWrap 
          title={movie.title} 
        >
          {movie.title}
        </Typography>

        <Typography 
          variant="body2" 
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 3, 
            maxHeight: '4.5em', 
          }}
         
          title={movie.description}
        >
          {movie.description}
        </Typography>

        <Typography variant="caption">
          Rating: {movie.rating}
        </Typography> <br />
        
        <Typography variant="caption">
          Release Date: {formattedDate}
        </Typography> <br />
        
        <Typography variant="caption">
          Duration: {movie.duration}
        </Typography> <br />
      </CardContent>
    </Card>
  );
};

export default MovieCard;
