import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const Message = ({
  open: propOpen,
  variant,
  severity,
  children,
  autoHideDuration,
  vertical,
  horizontal,
}) => {
  const [open, setOpen] = useState(propOpen);
  const handleClose = () => setOpen(false);
  return (
    <Snackbar
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={autoHideDuration}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant={variant}
        sx={{ width: '100%' }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

Message.defaultProps = {
  open: false,
  severity: 'info',
  variant: 'filled',
  autoHideDuration: 3000,
  vertical: 'top',
  horizontal: 'center',
};

export default Message;
