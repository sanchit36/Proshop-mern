import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
  getUserDetails,
  resetSuccessState,
  updateUserDetails,
} from '../../redux/actions/userActions';

const AccountDetails = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const { loading, error, success, userInfo } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (userInfo.name) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    } else {
      dispatch(getUserDetails());
    }
  }, [dispatch, userInfo.email, userInfo.name]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUserDetails('profile', name, email));
  };

  return (
    <>
      <Typography variant='h5' component='h1' gutterBottom>
        UPDATE ACCOUNT DETAILS
      </Typography>
      {!!success && (
        <Message
          severity='success'
          open={!!success}
          onClose={() => dispatch(resetSuccessState())}
        >
          Updated Successfully
        </Message>
      )}
      {!!error && (
        <Message severity='error' open={!!error}>
          {error}
        </Message>
      )}
      {loading && <Loader />}

      <Stack
        component={'form'}
        spacing={2}
        sx={{ mt: 2 }}
        onSubmit={submitHandler}
      >
        <TextField
          sx={{ maxWidth: 350 }}
          margin='dense'
          size='small'
          variant='outlined'
          type='text'
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          sx={{ maxWidth: 350 }}
          margin='dense'
          size='small'
          variant='outlined'
          type='email'
          label='Email Address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          sx={{ maxWidth: 350 }}
          type='submit'
          variant='contained'
          color='warning'
          disabled={loading}
        >
          UPDATE
        </Button>
      </Stack>
    </>
  );
};

export default AccountDetails;
