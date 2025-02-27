import { useNavigate } from "react-router";
import Button from "./UI/Button";

export interface IDrug {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  rate: number;
  des: string;
}

export default function Drug({ drug }: { drug: IDrug }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/drugs/${drug.id}`);
  }
  return (
    <>
      <img src={drug.image} alt="" />
      <div className="p-4 flex flex-col items-baseline">
        <h3 className="font-bold dark:text-white">{drug.name}</h3>
        <div className="text-slate-400 mb-4" title={drug.description}>
          {`${drug.description.slice(0, 100)}${
            drug.description.length > 30 ? "..." : ""
          }`}
        </div>
        <div className="text-slate-400 mb-4">{drug.price}</div>
        <div className="items-center mb-2">
          <a
            onClick={handleClick}
            href=""
            className="text-blue-500 underline mx-2"
          >
            details
          </a>
          <Button label="Add to cart" className="bg-blue-500" />
        </div>
      </div>
    </>
  );
}
