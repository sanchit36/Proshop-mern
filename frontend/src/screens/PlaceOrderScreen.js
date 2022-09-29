import React, { useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  Divider,
  Grid,
  Paper,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../redux/actions/orderActions';
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants';

const PlaceOrderScreen = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigator(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigator, success]);

  const placeOrderHandler = (event) => {
    event.preventDefault();
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Grid container spacing={4}>
        <Grid item md={8}>
          <Typography variant='h4' component='h1' gutterBottom>
            ORDER SUMMARY
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant='h5' component='h1' gutterBottom>
              Order Items
            </Typography>
            <Divider sx={{ mb: 1 }} />
            {cartItems.map((item) => (
              <div key={item.product}>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item md={1.5}>
                    <img
                      alt={item.name}
                      src={item.image}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: 8,
                      }}
                    />
                  </Grid>
                  <Grid item md={4.5}>
                    <Typography variant='subtitle1'>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Typography>
                  </Grid>
                  <Grid item md={2}>
                    <Typography variant='body1'>${item.price}</Typography>
                  </Grid>
                  <Grid item md={2}>
                    <Typography variant='body1'>QTY: {item.qty}</Typography>
                  </Grid>
                  <Grid item md={2}>
                    ${(Number(item.price) * Number(item.qty)).toFixed(2)}
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1 }} />
              </div>
            ))}
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant='h5' component='h1' gutterBottom>
              Shipping Address
            </Typography>
            <Typography>
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city},{' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant='h5' component='h1' gutterBottom>
              Payment Method
            </Typography>
            <Typography>{paymentMethod}</Typography>
          </Box>
        </Grid>

        <Grid item md={4}>
          <Paper sx={{ p: 1.5 }}>
            <Grid container spacing={2} alignItems='center' sx={{ p: 1 }}>
              <Grid item md={6}>
                <Typography>
                  <strong>Items</strong>
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>${cart.itemsPrice}</Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} alignItems='center' sx={{ p: 1 }}>
              <Grid item md={6}>
                <Typography>
                  <strong>Shipping</strong>
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>${cart.shippingPrice}</Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} alignItems='center' sx={{ p: 1 }}>
              <Grid item md={6}>
                <Typography>
                  <strong>Tax</strong>
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>${cart.taxPrice}</Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} alignItems='center' sx={{ p: 1 }}>
              <Grid item md={6}>
                <Typography>
                  <strong>Total</strong>
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>${cart.totalPrice}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 3 }} />

            {error && (
              <Alert severity='error' sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              type='submit'
              variant='contained'
              color='warning'
              disabled={cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrderScreen;
