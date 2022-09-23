import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../redux/actions/userActions';
import FormContainer from '../components/FormContainer';
import { TextField, Typography, Button, Stack } from '@mui/material';
import { Box } from '@mui/system';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

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
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
    } else {
      setMessage(null);
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <Typography variant='h4' component='h1' gutterBottom>
        SIGN UP
      </Typography>
      {message && (
        <Message
          severity='error'
          open={!!message}
          onClose={() => {
            setMessage('');
          }}
        >
          {message}
        </Message>
      )}
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
        <TextField
          margin='dense'
          size='small'
          fullWidth
          variant='outlined'
          type='password'
          label='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          fullWidth
          type='submit'
          variant='contained'
          color='warning'
          disabled={loading}
        >
          Register
        </Button>
      </Stack>

      <Box sx={{ py: 3 }}>
        <Typography>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Typography>
      </Box>
    </FormContainer>
  );
};

export default RegisterScreen;
