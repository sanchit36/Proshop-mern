import { Container, Stack } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <Container sx={{ p: 2 }}>
        <Stack direction='row' justifyContent='center'>
          Copyright &copy; ProShop
        </Stack>
      </Container>
    </footer>
  );
};

export default Footer;
