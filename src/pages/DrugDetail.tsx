import { useNavigate, useParams } from "react-router";
import Button from "../components/UI/Button";
import data from "../stores/data.json";

export default function DrugDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const drug = data.find((data) => data.id === Number(id));

  if (!drug) {
    return <div className="text-center text-red-500">Event not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="w-[250px] h-[250px] bg-gray-100 flex-shrink-0">
          <img src={drug.image} alt="" />
        </div>
        <div className="p-4 flex flex-col justify-between items-baseline">
          <h3 className="font-bold dark:text-white">{drug.name}</h3>
          <div className="text-slate-400 mb-4">{drug.description}</div>
          <div className="text-slate-400 mb-4">{drug.price}</div>
          <Button label="Back" onClick={() => navigate(-1)} />
          <Button label="Add to cart" className="bg-blue-500" />
        </div>
      </div>
    </div>
  );
}
