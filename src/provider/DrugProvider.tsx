import { ReactNode, useEffect, useState } from "react";
import { DrugContext } from "../context/DrugContext";

import drugData from "../stores/data.json";
import { IDrug } from "../components/DrugItem";

export default function ProductProvider({ children }: { children: ReactNode }) {
  const [drugs, setDrugs] = useState<IDrug[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState<string | null>("");

  useEffect(() => {
    if (keyword === null) return;
    setLoading(true);
    try {
      const filteredProducts = drugData.filter((drug) =>
        drug.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setDrugs(filteredProducts);
      setError("");
    } catch (error) {
      setError((error as Error).message);
    }
    setLoading(false);
  }, [keyword]);

  return (
    <DrugContext.Provider
      value={{ drugs, loading, error, keyword, setKeyword }}
    >
      {children}
    </DrugContext.Provider>
  );
}
