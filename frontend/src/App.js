import { Box, Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <Box component={'main'} sx={{ py: 3 }}>
        <Container maxWidth='lg'>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
          </Routes>
        </Container>
      </Box>
      <Footer />
    </Router>
  );
};

export default App;
