import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HotItems from './components/HotItems';
import PromoBanner from './components/PromoBanner';
import WhoWeAre from './components/WhoWeAre';
import ProcessSteps from './components/ProcessSteps';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Login from './pages/Login';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import OrderSuccess from './pages/OrderSuccess';
import ProtectedRoute from './components/ProtectedRoute';
import GoluChatbot from './components/Chatbot';

const Home = () => (
  <>
    <Hero />
    <HotItems />
    <PromoBanner />
    <WhoWeAre />
    <ProcessSteps />
    <Testimonials />
    <GoluChatbot />
  </>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />

            <Route path="/admin/*" element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/order-success" element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
