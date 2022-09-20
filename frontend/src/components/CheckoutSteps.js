import React from 'react';

import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Stack direction='row' justifyContent='center' spacing={2} sx={{ mb: 4 }}>
      {step1 ? <Button>Sign In</Button> : <Button disabled>Sign In</Button>}

      {step2 ? (
        <Button as={Link} to='/shipping'>
          Shipping
        </Button>
      ) : (
        <Button disabled>Shipping</Button>
      )}

      {step3 ? (
        <Button as={Link} to='/payment'>
          Payment
        </Button>
      ) : (
        <Button disabled>Payment</Button>
      )}

      {step4 ? (
        <Button as={Link} to='/place-order'>
          Place Order
        </Button>
      ) : (
        <Button disabled>Place Order</Button>
      )}
    </Stack>
  );
};

export default CheckoutSteps;
