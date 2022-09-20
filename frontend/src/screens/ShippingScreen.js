import React, { useState } from 'react';
import { TextField, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../redux/actions/cartActions';

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  const [state, setState] = useState({
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || '',
  });

  const navigator = useNavigate();
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setState((pState) => ({ ...pState, [name]: value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(state);
    dispatch(saveShippingAddress(state));
    navigator('/payment');
  };

  return (
    <FormContainer>
      <Typography variant='h4' component='h1' gutterBottom>
        SHIPPING
      </Typography>

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
          label='Address'
          name='address'
          required
          value={state.address}
          onChange={changeHandler}
        />
        <TextField
          margin='dense'
          size='small'
          fullWidth
          variant='outlined'
          type='text'
          label='City'
          name='city'
          required
          value={state.city}
          onChange={changeHandler}
        />
        <TextField
          margin='dense'
          size='small'
          fullWidth
          variant='outlined'
          type='text'
          label='Postal Code'
          name='postalCode'
          required
          value={state.postalCode}
          onChange={changeHandler}
        />
        <TextField
          margin='dense'
          size='small'
          fullWidth
          variant='outlined'
          type='text'
          label='Country'
          name='country'
          required
          value={state.country}
          onChange={changeHandler}
        />

        <Button fullWidth type='submit' variant='contained' color='warning'>
          Continue
        </Button>
      </Stack>
    </FormContainer>
  );
};

export default ShippingScreen;
