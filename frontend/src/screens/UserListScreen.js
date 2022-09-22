import React, { useEffect } from 'react';
import {
  Alert,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser, getUserList } from '../redux/actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserListScreen = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, error: errorDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      navigator('/login');
    }
  }, [dispatch, navigator, userInfo]);

  const deleteHandler = (id) => () => {
    dispatch(deleteUser(id));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert severity='error'>{error}</Alert>
  ) : (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {errorDelete && (
        <Message severity='error' open={!!errorDelete}>
          {errorDelete}
        </Message>
      )}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>IS ADMIN</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </TableCell>
                <TableCell>
                  {user.isAdmin ? (
                    <CheckCircleIcon color='success' />
                  ) : (
                    <CancelIcon color='error' />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    component={Link}
                    to={`/user/${user._id}/edit`}
                    color='info'
                    size='small'
                    disabled={loadingDelete}
                  >
                    <EditIcon fontSize='inherit' />
                  </IconButton>
                  <IconButton
                    color='error'
                    size='small'
                    disabled={loadingDelete}
                    onClick={deleteHandler(user._id)}
                  >
                    <DeleteIcon fontSize='inherit' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserListScreen;
