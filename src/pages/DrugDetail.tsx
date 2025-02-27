import { useNavigate, useParams } from "react-router";
import useCart from "../hooks/useCart";
import data from "../stores/data.json";
import Button from "../components/UI/Button";

export default function DrugDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToCart, stock } = useCart();
  const drug = data.find((item) => item.id === Number(id));

  if (!drug) {
    return <p className="text-black text-center">Drug not found</p>;
  }

  const currentStock = stock[drug.id] ?? 10; //  Uses stock from CartProvider

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <Button
          label="Back"
          className="mx-auto rounded-ee-2xl px-4 py-2 text-xs underline hover:bg-emerald-400"
          onClick={() => navigate(-1)}
        />

        <div className="w-[250px] h-[250px] bg-gray-100 flex-shrink-0">
          <img
            src={drug.image}
            alt={drug.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-4 flex flex-col justify-between items-baseline">
          <h3 className="font-bold text-xl dark:text-black">{drug.name}</h3>
          <div className="text-slate-500 mb-4">{drug.description}</div>
          <div className="text-emerald-600 font-semibold text-lg mb-1">
            {drug.price}
          </div>
          <p className="text-black mb-4">Stock: {currentStock}</p>{" "}
          {/* Stock persists */}
          <button
            onClick={() => addToCart(drug.id)}
            className={`bg-emerald-700 rounded-full text-white py-2 px-6 transition-transform transform hover:scale-105 ${
              currentStock === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentStock === 0}
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}
