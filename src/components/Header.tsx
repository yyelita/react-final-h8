import { useNavigate } from "react-router";

import useDrug from "../hooks/useDrug";
import Input from "./UI/Input";

export default function Header() {
  const navigate = useNavigate();
  const { setKeyword } = useDrug();

  function logout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/login");
  }

  function handleCart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    navigate("/cart");
  }

  return (
    <header className="bg-emerald-700  h-12 text-xl px-7 py-2 flex justify-between">
      <h1
        onClick={() => navigate("/home")}
        className="text-white items-start font-arial font-bold cursor-pointer"
      >
        Easy Pharmacy
      </h1>
      <Input
        onChange={(value: string) => setKeyword(value)}
        className="appearance-none flex w-1/2 sm:text-sm px-3"
        placeholder="search product.."
      />
      <div>
        <button
          onClick={handleCart}
          className="border border-white rounded py-1 px-3 cursor-pointer text-white mx-1.5"
        >
          <div className="text-sm text-center">Cart</div>
        </button>
        <button
          onClick={logout}
          className="border bg-emerald-900 border-white rounded py-1 px-3 cursor-pointer text-white"
        >
          <div className="text-sm font-bold text-center">Log Out</div>
        </button>
      </div>
    </header>
  );
}
