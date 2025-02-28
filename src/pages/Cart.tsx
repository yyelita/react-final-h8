import useCart from "../hooks/useCart";
import { NavLink } from "react-router";
import data from "../stores/data.json";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center font-calibri"> Cart </h2>

      {Object.keys(cart).length === 0 ? (
        <div className="flex flex-col justify-center items-center my-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0NFDkRbiBU3YN6StTz4TbcNYdrYTY-ZZoyw&s"
            alt="Empty Cart"
            className="w-40 h-40 object-contain"
          />
          <p className="font-medium mt-4">
            Your cart is empty, let's{" "}
            <NavLink to="/home" className="text-emerald-500 underline">
              shop!
            </NavLink>
          </p>
        </div>
      ) : (
        <ul>
          {Object.entries(cart).map(([id, quantity]) => {
            const product = data.find((p) => p.id === Number(id));

            if (!product) return null; //  Prevents errors when product is missing

            return (
              <li
                key={id}
                className="flex justify-between items-center border-b p-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <span className="text-lg font-semibold text-black">
                    {product.name} - {quantity} pcs
                  </span>
                </div>
                <button
                  onClick={() => removeFromCart(Number(id))}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
