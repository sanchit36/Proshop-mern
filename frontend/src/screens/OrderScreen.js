import React, { useEffect } from 'react';
import { Typography, Box, Divider, Grid, Paper, Alert } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { getOrderDetails } from '../redux/actions/orderActions';

const OrderScreen = () => {
  const orderId = useParams().id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

            {error && (
              <Alert severity='error' sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderScreen;
