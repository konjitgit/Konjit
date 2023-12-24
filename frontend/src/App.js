import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  HomePage,
  ProductPage,
  ProductDetailsPage,
  CartPage,
  WishlistPage,
  NotFoundPage,
  AboutPage,
  ShopCreatePage,
  ShopLoginPage,
  FaqPage,
  GiftPackagePage,
  ProfilePage,
  CheckoutPage,
  PrivacyPolicyPage,
  PaymentPage,
  FeaturedProductsPage,
  SellerProfilePage,
  ShopHomePage,
  UserInbox,
} from "./routes/Routes.js";

import {
  ShopCreateProduct,
  ShopProducts,
  ShopSettingsPage,
  ShopProfilePage,
  ShopInboxPage,
} from "./routes/ShopRoutes";

import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardProducts,
  AdminDashboardOrders,
  AdminDashboardRequests,
} from "./routes/AdminRoutes";

import { Provider } from "react-redux";
import Store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import { getAllProducts } from "./redux/actions/product";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.js";
import UserProfile from "./pages/UserProfile";
function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
  }, []);
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          <Route path="/products-page" element={<FeaturedProductsPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:name" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/product-create" element={<ShopCreateProduct />} />
          {/* <Route path="/shop-products" element={<ShopProducts />} /> */}
          <Route path="/shop-create" element={<ShopCreatePage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
          <Route path="/shop-home" element={<ShopHomePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/gift-package" element={<GiftPackagePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/seller-profile/:id" element={<SellerProfilePage />} />

          {/* user protected routes */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/inbox" element={<UserInbox />} />
          {/* Shop protected routes */}
          <Route
            path="/shop-message"
            element={
              <SellerProtectedRoute>
                <ShopInboxPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <SellerProtectedRoute>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />
          <Route path="/shop-profile" element={<ShopProfilePage />} />
          <Route
            path="/shop-products"
            element={
              <SellerProtectedRoute>
                <ShopProducts />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-sellers"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardSellers />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-users"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardUsers />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-orders"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardOrders />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-products"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardProducts />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-requests"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardRequests />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
