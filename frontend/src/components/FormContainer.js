import { Container, Grid } from '@mui/material';
import React from 'react';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Grid container sx={{ p: 2 }} justifyContent='center'>
        <Grid item xs={12} md={4}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormContainer;
