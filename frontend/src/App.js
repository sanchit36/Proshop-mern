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
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import Meta from './components/Meta';

const ProtectedRoute = ({ condition, component, redirectURL }) => {
  return condition ? component : <Navigate to={redirectURL} replace />;
};

const App = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  return (
    <Router>
      <Meta />
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
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/place-order' element={<PlaceOrderScreen />} />
          <Route
            path='/order/:id'
            element={
              <ProtectedRoute
                component={<OrderScreen />}
                condition={userInfo}
                redirectURL='/login'
              />
            }
          />
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
          <Route
            path='/admin/user-list'
            element={
              <ProtectedRoute
                component={<UserListScreen />}
                condition={userInfo && userInfo.isAdmin}
                redirectURL='/login'
              />
            }
          />
          <Route
            path='/admin/user/:id/edit'
            element={
              <ProtectedRoute
                component={<UserEditScreen />}
                condition={userInfo && userInfo.isAdmin}
                redirectURL='/login'
              />
            }
          />
          <Route
            path='/admin/product-list'
            element={
              <ProtectedRoute
                component={<ProductListScreen />}
                condition={userInfo && userInfo.isAdmin}
                redirectURL='/login'
              />
            }
          />
          <Route
            path='/admin/product/:id/edit'
            element={
              <ProtectedRoute
                component={<ProductEditScreen />}
                condition={userInfo && userInfo.isAdmin}
                redirectURL='/login'
              />
            }
          />
          <Route
            path='/admin/order-list'
            element={
              <ProtectedRoute
                component={<OrderListScreen />}
                condition={userInfo && userInfo.isAdmin}
                redirectURL='/login'
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
