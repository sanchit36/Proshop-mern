import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper, Alert, Typography } from '@mui/material';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts } from '../redux/actions/productActions';

const imageFluid = {
  maxWidth: '100%',
  height: '350px',
  margin: '40px',
  borderRadius: '50%',
};

const captionStyle = {
  position: 'absolute',
  top: 16,
  left: 0,
  right: 0,
  textAlign: 'center',
};

function Item({ item }) {
  return (
    <Paper sx={{ minHeight: 350, p: 4, textAlign: 'center' }}>
      <Link to={`/product/${item._id}`}>
        <img src={item.image} alt={item.name} style={imageFluid} />
        <Typography variant='h5' sx={captionStyle}>
          {item.name} (${item.price})
        </Typography>
      </Link>
    </Paper>
  );
}

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert severity='error' variant='filled'>
      {error}
    </Alert>
  ) : (
    <Carousel navButtonsAlwaysVisible>
      {products.map((product) => (
        <Item key={product._id} item={product} />
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
