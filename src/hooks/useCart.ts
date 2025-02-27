import { useContext } from "react";
import { CartContext } from "../provider/CartProvider";

export default function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context; // This ensures stock, addToCart, and removeFromCart available
}
