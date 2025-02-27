import { useNavigate } from "react-router";
import useCart from "../hooks/useCart";
import { memo } from "react";

export interface IDrug {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  rate: number;
  des: string;
}

function Drug({ drug }: { drug: IDrug }) {
  const navigate = useNavigate();
  const { stock, addToCart } = useCart();
  const currentStock = stock[drug.id] ?? 10; // Prevents NaN

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    navigate(`/drugs/${drug.id}`);
  }

  return (
    <div className="border-transparent p-4 rounded-lg shadow-lg">
      <img
        src={drug.image}
        alt={drug.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-bold text-white mt-2">{drug.name}</h3>
      <p className="text-slate-50 font-light">{drug.des}</p>
      <span className="inline-block bg-white text-emerald-600 font-semibold text-sm px-3 py-1 rounded-full mt-2">
        {drug.price}
      </span>
      <p className="text-black mt-2">Stock: {currentStock}</p>

      <div className="mt-2 flex items-center justify-between">
        <a onClick={handleClick} href="#" className="text-white underline">
          Details
        </a>
        <button
          onClick={() => addToCart(drug.id)}
          className={`bg-emerald-900 rounded-full text-white py-1 px-4 transition-transform transform hover:scale-105 ${
            currentStock === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentStock === 0}
        >
          Add +
        </button>
      </div>
    </div>
  );
}

export default memo(Drug);
