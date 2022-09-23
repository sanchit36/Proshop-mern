import React, { useEffect, useState } from 'react';
import {
  TextField,
  Typography,
  Button,
  Stack,
  Alert,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../redux/actions/userActions';
import { USER_UPDATE_RESET } from '../redux/constants/userConstants';

const UserEditScreen = () => {
  const userId = useParams().id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigator('/admin/user-list');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate, navigator]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <div>
      <Button
        component={Link}
        to='/'
        variant='outlined'
        color='warning'
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Go Back
      </Button>
      <FormContainer>
        <Typography variant='h4' component='h1' gutterBottom>
          Edit User
        </Typography>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <Message severity='error' open={!!errorUpdate}>
            {errorUpdate}
          </Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert severity='error' open={!!error}>
            {error}
          </Alert>
        ) : (
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
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                }
                label='Is Admin'
              />
            </FormGroup>

            <Button
              fullWidth
              type='submit'
              variant='contained'
              color='warning'
              disabled={loading}
            >
              Update User
            </Button>
          </Stack>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEditScreen;
