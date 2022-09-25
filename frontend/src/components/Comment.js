import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import Rating from './Rating';

const Comment = ({ review }) => {
  return (
    <ListItem alignItems='flex-start' sx={{ p: 0 }}>
      <ListItemAvatar>
        <Avatar>{review.name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        component={'div'}
        primary={review.name}
        secondaryTypographyProps={{
          component: 'div',
        }}
        secondary={
          <React.Fragment>
            <Rating value={review.rating} readOnly />
            <Typography variant='caption' gutterBottom component='p'>
              {review.createdAt.substring(0, 10)}
            </Typography>
            <Typography variant='body2'>{review.comment}</Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default Comment;
