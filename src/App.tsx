import { Route, Routes, BrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import DrugList from "./pages/DrugList";
import DrugDetail from "./pages/DrugDetail";
import Register from "./pages/Register";
import { LoginPage } from "./pages/LoginForm";
import Cart from "./pages/Cart";
import { CartProvider } from "./provider/CartProvider";
import ProductProvider from "./provider/DrugProvider";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout>
                  <ProtectedRoute />
                </MainLayout>
              }
            >
              <Route path="/cart" element={<Cart />} />
              <Route path="/home" element={<DrugList />} />
              <Route path="/drugs/:id" element={<DrugDetail />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  );
}
