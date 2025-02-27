import { Route, Routes, BrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import DrugList from "./pages/DrugList";
import DrugProvider from "./provider/DrugProvider";
import DrugDetail from "./pages/DrugDetail";
import Register from "./pages/Register";
import { LoginPage } from "./pages/LoginForm";
import Cart from "./pages/Cart";
import { CartProvider } from "./provider/CartProvider"; // ✅ Import CartProvider

export default function App() {
  return (
    <BrowserRouter>
      <DrugProvider>
        <CartProvider>
          {" "}
          {/* ✅ Wrap all routes inside CartProvider */}
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<DrugList />} />
              <Route path="/drugs/:id" element={<DrugDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </CartProvider>
      </DrugProvider>
    </BrowserRouter>
  );
}
