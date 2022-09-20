import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import {
  Alert,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';

const CartScreen = () => {
  const navigator = useNavigate();
  const params = useParams();
  const location = useLocation();

  const productId = params.id;
  const qty = location.search ? location.search.split('=')[1] : 1;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigator('/login?redirect=/shipping');
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <Typography variant='h4' component='h1' sx={{ mb: 3 }}>
            Shopping Cart
          </Typography>
          {cartItems.length === 0 ? (
            <Alert>
              Your cart is empty, <Link to='/'>Go Back</Link>
            </Alert>
          ) : (
            <Box>
              <Divider sx={{ mb: 1 }} />
              {cartItems.map((item) => (
                <div key={item.product}>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item md={2}>
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
                    <Grid item md={4}>
                      <Typography variant='subtitle1'>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Typography>
                    </Grid>
                    <Grid item md={2}>
                      <Typography variant='body1'>${item.price}</Typography>
                    </Grid>
                    <Grid item md={2}>
                      <Select
                        size='small'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <MenuItem key={x} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item md={2}>
                      <IconButton
                        edge='end'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1 }} />
                </div>
              ))}
            </Box>
          )}
        </Grid>
        <Grid item md={4}>
          <Card sx={{ p: 2 }}>
            <Grid container spacing={0.5}>
              <Grid item xs={12}>
                <Typography variant='h5'>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) Items
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant='contained'
                  color='warning'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  fullWidth
                >
                  Proceed To Checkout
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CartScreen;
