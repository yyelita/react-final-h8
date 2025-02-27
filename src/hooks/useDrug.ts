import { useContext } from "react";
import { DrugContext } from "../context/DrugContext";

export default () => {
  return useContext(DrugContext);
};
