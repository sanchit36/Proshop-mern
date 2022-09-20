import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { changePassword } from '../../redux/actions/userActions';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.user);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
  };

  useEffect(() => {
    if (success) {
      setOldPassword('');
      setNewPassword('');
    }
  }, [success]);

  return (
    <>
      <Typography variant='h5' component='h1' gutterBottom>
        CHANGE PASSWORD
      </Typography>
      {success && (
        <Message severity='success' open={success}>
          Password changed Successfully
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
