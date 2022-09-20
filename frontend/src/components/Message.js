import React, { useState } from 'react';
import { Snackbar } from '@mui/material';

const Message = ({
  open: propOpen,
  severity,
  children,
  autoHideDuration,
  vertical,
  horizontal,
}) => {
  const [open, setOpen] = useState(propOpen);

  return (
    <Snackbar
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={autoHideDuration}
      message={children}
      severity={severity}
    />
  );
};

Message.defaultProps = {
  open: false,
  severity: 'info',
  variant: 'filled',
  autoHideDuration: 1000,
  vertical: 'top',
  horizontal: 'center',
};

export default Message;
