// import { useEffect, useState } from "react";
// import drugs from "../stores/drugs.json";
// import { useSearchParams } from "react-router";
// import Input from "../components/UI/Input";
import Drug from "../components/DrugItem";
import useDrug from "../hooks/useDrug";

export default function DrugList() {
  const { drugs } = useDrug();

  return (
    <>
      <div className="flex gap-2 justify-center my-8"></div>
      <ul className="max-w-[1024px] m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {drugs.map((drug) => {
          return (
            <li className="border border-slate-300 rounded-lg" key={drug.id}>
              <div className="p-4">
                <Drug drug={drug} />
              </div>
            </li>
          );
        })}
        {drugs.length === 0 && (
          <li className="text-center font w-full  col-span-full">
            Sorry, no product found :(
          </li>
        )}
      </ul>
    </>
  );
}
