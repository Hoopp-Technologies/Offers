import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";

import Footer from "./components/layouts/Footer";
import ProductDetailsPage from "./features/products/pages/ProductDetailsPage";
import { Home } from "./features/home";
import ScrollToTop from "./components/layouts/ScrollToTop";
import Wishlist from "./features/wishlist";
import CartPage from "./features/cart";
import { Toaster } from "./components/ui/sonner";
import Auth from "./features/auth";
import CheckoutPage from "./features/checkout";
import ProfilePage from "./features/profile";
import PurchaseHistory from "./features/purchase-history";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster />
      <Auth />
      <div className="bg-[#FAFAFA]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />

          {/* Add other routes here as we build more pages */}
          <Route
            path="/categories"
            element={
              <h1 className="text-4xl font-bold text-blue-600">
                Categories Page
              </h1>
            }
          />

          <Route
            path="/profile"
            element={
              <h1 className="text-4xl font-bold text-blue-600">
                My Profile Page
              </h1>
            }
          />
          <Route
            path="/sell"
            element={
              <h1 className="text-4xl font-bold text-blue-600">Sell Page</h1>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
