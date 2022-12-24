import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Divider,
  Grid,
  Paper,
  Alert,
  Button,
} from '@mui/material';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../redux/actions/orderActions';
import axios from '../axios';
import {
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../redux/constants/orderConstants';

const OrderScreen = () => {
  const orderId = useParams().id;

  const [sdkReady, setSkdReady] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading && !error) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    return () => {
      dispatch({ type: ORDER_DETAILS_RESET });
    };
  }, [dispatch, orderId]);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSkdReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSkdReady(true);
      }
    }
  }, [dispatch, order, orderId, successDeliver, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert severity='error'>{error}</Alert>
  ) : (
    <>
      <Typography variant='h5' component='h1' gutterBottom>
        ORDER {order._id}
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={8}>
          <Box sx={{ mb: 2 }}>
            <Typography variant='h6' component='h1' gutterBottom>
              Shipping
            </Typography>
            <Typography variant='body1' component='p' gutterBottom>
              <strong>Name: </strong>
              {order.user.name}
            </Typography>
            <Typography variant='body1' component='p' gutterBottom>
              <strong>Email: </strong>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </Typography>
            <Typography variant='body1' component='p' gutterBottom>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
              {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </Typography>
            {order.isDelivered ? (
              <Alert severity='success' variant='filled'>
                Delivered on {order.deliveredAt}
              </Alert>
            ) : (
              <Alert severity='error' variant='filled'>
                Not Delivered
              </Alert>
            )}
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant='h6' component='h1' gutterBottom>
              Payment Method
            </Typography>
            <Typography variant='body1' component='p' gutterBottom>
              <strong>Method: </strong>
              {order.paymentMethod}
            </Typography>
            {order.isPaid ? (
              <Alert severity='success' variant='filled'>
                Paid on {order.paidAt}
              </Alert>
            ) : (
              <Alert severity='error' variant='filled'>
                Not Paid
              </Alert>
            )}
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant='h6' component='h1' gutterBottom>
              Order Items
            </Typography>
            <Divider sx={{ mb: 1 }} />
            {order.orderItems.map((item) => (
              <div key={item.product}>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item sm={1.5}>
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
                  <Grid item sm={4.5}>
                    <Typography variant='subtitle1'>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Typography>
                  </Grid>
                  <Grid item sm={2}>
                    <Typography variant='body1'>${item.price}</Typography>
                  </Grid>
                  <Grid item sm={2}>
                    <Typography variant='body1'>QTY: {item.qty}</Typography>
                  </Grid>
                  <Grid item sm={2}>
                    ${(Number(item.price) * Number(item.qty)).toFixed(2)}
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1 }} />
              </div>
            ))}
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
                <Typography>${order.itemsPrice}</Typography>
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
                <Typography>${order.shippingPrice}</Typography>
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
                <Typography>${order.taxPrice}</Typography>
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
                <Typography>${order.totalPrice}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 3 }} />

            {!order.isPaid && (
              <>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </>
            )}

            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <Button
                  onClick={deliverHandler}
                  fullWidth
                  color='warning'
                  variant='contained'
                  disabled={loadingDeliver}
                >
                  Mark as Delivered
                </Button>
              )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderScreen;
