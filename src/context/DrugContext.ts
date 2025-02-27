import { createContext } from "react";
import { IDrug } from "../components/DrugItem"; // Ensure you have an IDrug type

// Define the shape of the context
interface IDrugContext {
  drugs: IDrug[];
  loading: boolean;
  error: string;
  keyword: string | null;
  setKeyword: (keyword: string | null) => void;
}

// Create the context with a default value of `null`
export const DrugContext = createContext({} as IDrugContext);
