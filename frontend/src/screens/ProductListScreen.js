import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { deleteProduct, listProducts } from '../redux/actions/productActions';

const ProductListScreen = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete } = productDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigator('/login');
    }
  }, [dispatch, navigator, userInfo]);

  const deleteHandler = (id) => () => {
    dispatch(deleteProduct(id));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert severity='error'>{error}</Alert>
  ) : (
    <>
      {errorDelete && (
        <Message severity='error' open={!!errorDelete}>
          {errorDelete}
        </Message>
      )}
      <Stack direction='row' justifyContent='space-between' sx={{ mb: 3 }}>
        <Typography variant='h4' component='h1'>
          PRODUCTS
        </Typography>
        <Button
          variant='contained'
          color='warning'
          size='small'
          startIcon={<AddIcon />}
        >
          CREATE PRODUCT
        </Button>
      </Stack>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader size='small'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>CATEGORY</TableCell>
                <TableCell>BRAND</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product._id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>
                    <IconButton
                      component={Link}
                      to={`/admin/product/${product._id}/edit`}
                      color='info'
                      size='small'
                      disabled={loadingDelete}
                    >
                      <EditIcon fontSize='inherit' />
                    </IconButton>
                    <IconButton
                      color='error'
                      size='small'
                      onClick={deleteHandler(product._id)}
                      disabled={loadingDelete}
                    >
                      <DeleteIcon fontSize='inherit' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default ProductListScreen;
