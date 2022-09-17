import React, { useEffect, useState } from 'react';
import { Slider, Button, Card, Divider, Grid, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  const [qty, setQty] = useState(1);

  const navigator = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigator(`/cart/${id}?qty=${qty}`);
  };

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

              <Grid container sx={{ mt: 2 }} spacing={1}>
                {product.countInStock > 0 && (
                  <Grid item xs={12}>
                    <Slider
                      color='secondary'
                      valueLabelDisplay='auto'
                      step={1}
                      marks
                      defaultValue={1}
                      min={1}
                      max={product.countInStock}
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    onClick={addToCartHandler}
                    variant='contained'
                    color='warning'
                    disabled={product.countInStock === 0}
                    fullWidth
                  >
                    Add To Cart
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProductScreen;
