import React, { useEffect, useState } from 'react';
import {
  Slider,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  Alert,
  List,
  TextField,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  listProductDetails,
  createProductReview,
} from '../redux/actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/productConstants';
import Comment from '../components/Comment';
import { Stack } from '@mui/system';
import Meta from '../components/Meta';
const imageFluid = {
  maxWidth: '100%',
  height: 'auto',
};

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const navigator = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = useSelector((state) => state.productReviewCreate);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (successProductReview) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      setRating(0);
      setComment('');
    }
    dispatch(listProductDetails(id));
    return () => {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    };
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigator(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <>
      <div>
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
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <>
          {errorProductReview && (
            <Message
              severity='error'
              variant='filled'
              open={!!errorProductReview}
            >
              {errorProductReview}
            </Message>
          )}
          <Meta title={product.name} />

          <Grid container spacing={3}>
            <Grid item md={5}>
              <img src={product.image} alt={product.name} style={imageFluid} />
            </Grid>

            <Grid item md={4}>
              <Typography gutterBottom variant='h4' component='h1'>
                {product.name}
              </Typography>
              <Rating
                readOnly
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

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant='h5' component='h2' gutterBottom>
                Reviews
              </Typography>
              {product.reviews.length === 0 && (
                <Alert variant='filled' severity='info'>
                  No Review
                </Alert>
              )}
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                {product.reviews.map((review) => (
                  <Comment key={review._id} review={review} />
                ))}
              </List>

              <Typography variant='h6' component='h4' gutterBottom>
                Write a review
              </Typography>
              {userInfo ? (
                <Stack component={'form'} spacing={2} onSubmit={submitHandler}>
                  <Rating
                    size='large'
                    value={rating}
                    onRatingChange={(newVal) => setRating(newVal)}
                  />
                  <TextField
                    label='Comment'
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    variant='contained'
                    color='warning'
                    type='submit'
                    disabled={loadingProductReview}
                  >
                    Submit
                  </Button>
                </Stack>
              ) : (
                <Alert severity='info' variant='filled'>
                  Please{' '}
                  <Link to={`/login?redirect=/product/${id}`}>sign in</Link> to
                  write a review.
                </Alert>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ProductScreen;
