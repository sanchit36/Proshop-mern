import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from '@mui/material';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth='lg'>
          <h1>Welcome to ProShop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
