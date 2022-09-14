import React from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Typography, Stack } from '@mui/material';

const Star = ({ value, index }) => {
  return (
    <span>
      {value >= index ? (
        <StarRateIcon fontSize='small' />
      ) : value >= index - 0.5 ? (
        <StarHalfIcon fontSize='small' />
      ) : (
        <StarOutlineIcon fontSize='small' />
      )}
    </span>
  );
};

const Rating = ({ value, text }) => {
  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <div>
        {[1, 2, 3, 4, 5].map((index) => (
          <Star key={index} value={value} index={index} />
        ))}
      </div>
      {text && <Typography variant='caption'>{text}</Typography>}
    </Stack>
  );
};

export default Rating;
