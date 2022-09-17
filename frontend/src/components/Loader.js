import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <CircularProgress
      sx={{ width: '100px', height: '100px', m: 'auto', display: 'block' }}
    />
  );
};

export default Loader;
