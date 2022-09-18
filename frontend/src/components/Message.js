import React from 'react';
import { Alert } from '@mui/material';

const Message = ({ severity, variant, children }) => {
  return (
    <Alert severity={severity} variant={variant} sx={{ my: 1 }}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  severity: 'info',
  variant: 'filled',
};

export default Message;
