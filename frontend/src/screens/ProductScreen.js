import React, { useEffect } from 'react';
import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../redux/actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const imageFluid = {
  maxWidth: '100%',
  height: 'auto',
};

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <Button
        component={Link}
        to='/'
        variant='outlined'
        color='warning'
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <Grid container spacing={3}>
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
      )}
    </>
  );
};

export default ProductScreen;
