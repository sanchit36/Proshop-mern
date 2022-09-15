import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Rating from '../components/Rating';
import products from '../products';

const imageFluid = {
  maxWidth: '100%',
  height: 'auto',
};

const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);

  return (
    <>
      <Button
        component={Link}
        to='/'
        variant='outlined'
        color='warning'
        startIcon={<ArrowBackIcon />}
      >
        Go Back
      </Button>

      <Grid container spacing={3} sx={{ my: 2 }}>
        <Grid item md={5}>
          <img src={product.image} alt={product.name} style={imageFluid} />
        </Grid>

        <Grid item md={4}>
          <Typography gutterBottom variant='h4' component='h1'>
            {product.name}
          </Typography>
          <Rating
            value={product.rating}
            text={`${product.numReviews} review${
              product.numReviews > 1 ? 's' : ''
            }`}
          />
          <Divider />
          <Typography variant='h6' component='p'>
            ${product.price}
          </Typography>
          <Divider />
          <Typography variant='body1' component='p'>
            {product.description}
          </Typography>
        </Grid>

        <Grid item md={3}>
          <Card sx={{ p: 2 }}>
            <Grid container spacing={0.5}>
              <Grid item xs={6}>
                Price:
              </Grid>
              <Grid item xs={6}>
                <Typography>${product.price}</Typography>
              </Grid>
              <Grid item xs={6}>
                Status:
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Button
                variant='contained'
                color='warning'
                disabled={product.countInStock === 0}
                fullWidth
              >
                Add To Cart
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductScreen;
