// import React from "react";
import { Route, Routes, BrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import DrugList from "./pages/DrugList";
import DrugProvider from "./provider/DrugProvider";
import DrugDetail from "./pages/DrugDetail";
import Register from "./pages/Register";
import { LoginPage } from "./pages/LoginForm";

export default function App() {
  return (
    <BrowserRouter>
      <DrugProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DrugList />} />
            <Route path="/drugs/:id" element={<DrugDetail />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </DrugProvider>
    </BrowserRouter>
  );
}
