import {
  Alert,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { listMyOrders } from '../../redux/actions/orderActions';

const OrderList = () => {
  const dispatch = useDispatch();
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert severity='error'>{error}</Alert>
  ) : (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell>PAID</TableCell>
              <TableCell>DELIVERED</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <CancelIcon color='error' />
                  )}
                </TableCell>
                <TableCell>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <CancelIcon color='error' />
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/order/${order._id}`}
                    color='warning'
                    size='small'
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrderList;
