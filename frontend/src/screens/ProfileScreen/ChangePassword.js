import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Typography variant='h5' component='h1' gutterBottom>
        CHANGE PASSWORD
      </Typography>
      {message && <Message severity='error'>{message}</Message>}
      {error && <Message severity='error'>{error}</Message>}
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
          type='password'
          label='Old Password'
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          sx={{ maxWidth: 350 }}
          margin='dense'
          size='small'
          variant='outlined'
          type='password'
          label='New Password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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

export default ChangePassword;
