import React from 'react';
import { Grid, Typography } from '@mui/material';
import products from '../products';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  return (
    <>
      <Typography variant='h4' component='h1' gutterBottom>
        Latest Products
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </>
  );
};

export default HomeScreen;
