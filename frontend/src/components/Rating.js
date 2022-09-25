import MuiRating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from 'react';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Rating = ({ value, text, onRatingChange, ...props }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    setRating(value);
  }, [value]);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
        my: 0.5,
      }}
    >
      <MuiRating
        size='small'
        name='hover-feedback'
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setRating(newValue);
          onRatingChange(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
        {...props}
      />
      {rating !== null && !props.readOnly && (
        <Box sx={{ ml: 1 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
      {text && <Box sx={{ ml: 1 }}>{text}</Box>}
    </Box>
  );
};

export default Rating;
