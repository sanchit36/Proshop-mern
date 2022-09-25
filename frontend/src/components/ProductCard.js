import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const flexColumn = {
  display: 'flex',
  flexDirection: 'column',
};

const ProductCard = ({ product }) => {
  return (
    <Grid item xs={12} sm={6} lg={4} xl={3}>
      <Card
        sx={{
          borderRadius: 2,
          height: '100%',
          ...flexColumn,
        }}
      >
        <Link to={`/product/${product._id}`}>
          <CardMedia component='img' image={product.image} alt={product.name} />
        </Link>
        <CardContent sx={{ p: 3, flex: 1, ...flexColumn }}>
          <Typography gutterBottom variant='subtitle1' component='div'>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </Typography>

          <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
            <Rating
              readOnly
              value={product.rating}
              text={`${product.numReviews} review${
                product.numReviews > 1 ? 's' : ''
              }`}
            />
          </Box>

          <Typography variant='h4' component='h3'>
            $ {product.price}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;
