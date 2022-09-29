import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Grid, Typography } from '@mui/material';

import ProductCard from '../components/ProductCard';
import { listProducts } from '../redux/actions/productActions';
import Loader from '../components/Loader';
import { useSearchParams } from 'react-router-dom';
import Paginate from '../components/Paginate';

const HomeScreen = () => {
  const [params] = useSearchParams();
  const keyword = params.get('search') || '';
  const page = params.get('page') || 1;

  const dispatch = useDispatch();
  const { loading, error, products, pages } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword, page));
  }, [dispatch, keyword, page]);

  return (
    <>
      <Typography variant='h4' component='h1' gutterBottom>
        Latest Products
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Grid>

          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
