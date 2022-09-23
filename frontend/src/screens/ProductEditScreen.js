import React, { useEffect, useState } from 'react';
import { TextField, Typography, Button, Stack, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import {
  listProductDetails,
  updateProduct,
} from '../redux/actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../redux/constants/productConstants';
import axios from 'axios';

const ProductEditScreen = () => {
  const productId = useParams().id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigator('/admin/product-list');
    } else {
      if (!product || !product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigator, product, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <div>
      <Button
        component={Link}
        to='/admin/product-list'
        variant='outlined'
        color='warning'
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Go Back
      </Button>
      <FormContainer>
        <Typography variant='h4' component='h1' gutterBottom>
          Edit Product
        </Typography>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <Message severity='error' open={!!errorUpdate}>
            {errorUpdate}
          </Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert severity='error' open={!!error}>
            {error}
          </Alert>
        ) : (
          <Stack
            component={'form'}
            spacing={2}
            onSubmit={submitHandler}
            sx={{ mt: 2 }}
          >
            <TextField
              margin='dense'
              size='small'
              fullWidth
              variant='outlined'
              type='text'
              label='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin='dense'
              size='small'
              fullWidth
              variant='outlined'
              type='number'
              label='Price'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              margin='dense'
              size='small'
              fullWidth
              variant='outlined'
              type='text'
              label='Image'
              placeholder='Enter image url'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <TextField
              margin='dense'
              size='small'
              fullWidth
              variant='outlined'
              type='file'
              onChange={uploadFileHandler}
              disabled={uploading}
            />
            {uploading && <Loader />}
            <TextField
              margin='dense'
              size='small'
              fullWidth
              variant='outlined'
              type='text'
              label='Brand'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <TextField
              margin='dense'
              size='small'
              fullWidth
              variant='outlined'
              type='number'
              label='CountInStock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
            <TextField
              margin='dense'
              size='small'
              fullWidth
              variant='outlined'
              type='text'
              label='Category'
              placeholder='Enter category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <TextField
              margin='dense'
              size='small'
              fullWidth
              variant='outlined'
              type='text'
              label='Description'
              placeholder='Enter Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              fullWidth
              type='submit'
              variant='contained'
              color='warning'
              disabled={loading}
            >
              Update Product
            </Button>
          </Stack>
        )}
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
