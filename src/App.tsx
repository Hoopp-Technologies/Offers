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
import UserPreferences from "./features/preferences";
import CheckoutPage from "./features/checkout";
import ProfilePage from "./features/profile";
import PurchaseHistory from "./features/purchase/partials/purchase-history";
import { Products } from "./features/home/category";
import PurchaseSuccess from "./features/purchase/partials/purchase-success";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster />
      <Auth />
      <UserPreferences />
      <div className="bg-[#FAFAFA]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/purchase-success" element={<PurchaseSuccess />} />

          {/* Add other routes here as we build more pages */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
