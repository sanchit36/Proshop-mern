import { Container } from '@mui/material';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ condition, component, redirectURL }) => {
  return condition ? component : <Navigate to={redirectURL} replace />;
};

const App = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  return (
    <Router>
      <Header />
      <Container
        maxWidth='lg'
        component={'main'}
        sx={{ mt: 8, py: 3, display: 'flex', flexDirection: 'column' }}
      >
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/cart/:id' element={<CartScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                component={<ProfileScreen />}
                condition={userInfo}
                redirectURL='/login?redirect=/profile'
              />
            }
          />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
