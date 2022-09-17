import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';

import ProductCard from '../components/ProductCard';
import { listProducts } from '../redux/actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Typography variant='h4' component='h1' gutterBottom>
        Latest Products
      </Typography>
      {loading ? (
        <Typography variant='h6' component='p'>
          Loading....
        </Typography>
      ) : error ? (
        <Typography variant='h6' component='p'>
          {error}
        </Typography>
      ) : (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default HomeScreen;
