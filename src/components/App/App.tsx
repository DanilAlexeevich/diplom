import { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../protected-route";

import type { RootState, AppDispatch } from "@/services/store";
import { login } from "@/services/slices/AuthSlice";
import { CartProvider } from "@/context/CartContext";
import { getStoredUser, getToken } from "@/utils/auth";

import { Footer } from "../Footer/Footer";
import { Header } from "../Header";
import ProfilePage from "@/pages/profile-page";

import { Toaster } from "react-hot-toast";

const CatalogPage = lazy(() => import("@/pages/catalog-page"));
const LoginPage = lazy(() => import("@/pages/login-page"));
const RegisterPage = lazy(() => import("@/pages/register-page"));
const CartPage = lazy(() => import("@/pages/cart-page"));

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const isLogin = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = getToken();
    const storedUser = getStoredUser();
    if (token && storedUser) {
      dispatch(login(storedUser));
    }
  }, [dispatch]);

  const headerUser = authUser
    ? { name: authUser.name, avatar: authUser.userAvatar }
    : undefined;

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }}
      />
      <BrowserRouter>
        <CartProvider>
          <div className="app">
            <Header isLogin={isLogin} user={headerUser} />
            <main className="main">
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<CatalogPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<ProfilePage />} />
                  </Route>
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}
