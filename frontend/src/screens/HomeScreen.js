import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ProductCard from '../components/ProductCard';
import { listProducts } from '../redux/actions/productActions';
import Loader from '../components/Loader';
import { Link, useSearchParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

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
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
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
      )}

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
