import { createContext, useState, useEffect } from "react";
import data from "../stores/data.json";

interface CartContextType {
  cart: { [key: number]: number };
  stock: { [key: number]: number };
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [stock, setStock] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    const storedStock = JSON.parse(localStorage.getItem("stock") || "{}");

    //  Set default stock values only if missing
    const defaultStock = data.reduce((acc, item) => {
      acc[item.id] = storedStock[item.id] ?? 10; // Default stock = 10
      return acc;
    }, {} as { [key: number]: number });

    setCart(storedCart);
    setStock(defaultStock);
  }, []); //  Runs only once on app load

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("stock", JSON.stringify(stock));
  }, [cart, stock]);

  function addToCart(id: number) {
    setStock((prevStock) => {
      if ((prevStock[id] ?? 10) > 0) {
        const updatedStock = { ...prevStock, [id]: (prevStock[id] || 10) - 1 };
        return updatedStock;
      }
      return prevStock;
    });

    setCart((prevCart) => {
      const updatedCart = { ...prevCart, [id]: (prevCart[id] || 0) + 1 };
      return updatedCart;
    });
  }

  function removeFromCart(id: number) {
    setCart((prevCart) => {
      if (prevCart[id] > 0) {
        const updatedCart = { ...prevCart, [id]: prevCart[id] - 1 };
        if (updatedCart[id] === 0) delete updatedCart[id];
        return updatedCart;
      }
      return prevCart;
    });

    setStock((prevStock) => {
      const updatedStock = { ...prevStock, [id]: (prevStock[id] ?? 10) + 1 };
      return updatedStock;
    });
  }

  return (
    <CartContext.Provider value={{ cart, stock, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
