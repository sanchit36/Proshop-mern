import React, { useState } from 'react';
import {
  Typography,
  Button,
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../redux/actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  const navigator = useNavigate();
  if (!shippingAddress) navigator('/shipping', { replace: true });

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigator('/place-order');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Typography variant='h4' component='h1' gutterBottom>
        PAYMENT METHOD
      </Typography>
      <Stack
        component={'form'}
        spacing={2}
        onSubmit={submitHandler}
        sx={{ mt: 2 }}
      >
        <FormControl>
          <RadioGroup
            value={paymentMethod}
            name='paymentMethod'
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value='PayPal'
              control={<Radio />}
              label='PayPal'
            />
          </RadioGroup>
        </FormControl>
        <Button fullWidth type='submit' variant='contained' color='warning'>
          Continue
        </Button>
      </Stack>
    </FormContainer>
  );
};

export default PaymentScreen;
