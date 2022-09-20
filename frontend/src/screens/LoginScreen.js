import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../redux/actions/userActions';
import FormContainer from '../components/FormContainer';
import { TextField, Typography, Button, Stack } from '@mui/material';
import { Box } from '@mui/system';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const navigator = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigator(redirect);
    }
  }, [navigator, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <Typography variant='h4' component='h1' gutterBottom>
        SIGN IN
      </Typography>
      {error && (
        <Message severity='error' open={!!error}>
          {error}
        </Message>
      )}
      {loading && <Loader />}

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
          type='email'
          label='Email Address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin='dense'
          size='small'
          fullWidth
          variant='outlined'
          type='password'
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          type='submit'
          variant='contained'
          color='warning'
          disabled={loading}
        >
          Login
        </Button>
      </Stack>

      <Box sx={{ py: 3 }}>
        <Typography>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Typography>
      </Box>
    </FormContainer>
  );
};

export default LoginScreen;
