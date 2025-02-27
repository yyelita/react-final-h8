import { createContext, useContext, useState, useEffect } from "react";

interface CartContextType {
  cart: { [key: number]: number };
  stock: { [key: number]: number };
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [stock, setStock] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    const storedStock = JSON.parse(localStorage.getItem("stock") || "{}");

    setCart(storedCart);
    setStock(storedStock || {});
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("stock", JSON.stringify(stock));
  }, [cart, stock]);

  function addToCart(id: number) {
    if (stock[id] > 0) {
      setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      setStock((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    }
  }

  function removeFromCart(id: number) {
    if (cart[id] > 0) {
      setCart((prev) => {
        const updatedCart = { ...prev, [id]: prev[id] - 1 };
        if (updatedCart[id] === 0) delete updatedCart[id];
        return updatedCart;
      });

      setStock((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
  }

  return (
    <CartContext.Provider value={{ cart, stock, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
