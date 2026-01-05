import { Input } from "antd";

import { useCoffeeStore } from "../model/cofeeStore";
import { useEffect } from "react";
import { useUrlStorage } from "../helpers/useUrlStorage";
import { CoffeeCard } from "../components/CoffeeCard";
import { Cart } from "../components/Cart";
import { Category } from "../components/Category";
import { useCustomQuery } from "../helpers/useCustomQuery";

export const SectionCoffee = () => {
  const { getCoffeeList, coffeeList, params, setParams } = useCoffeeStore();
  useUrlStorage(params, setParams);

  useEffect(() => {
    getCoffeeList(params);
  }, []);

  useCustomQuery(params);

  return (
    <div className="section_coffee">
      <Category />
      <Input
        placeholder="Поиск"
        value={params.text}
        onChange={(e) => setParams({ text: e.target.value })}
      />
      <div className="cards_container">
        {coffeeList &&
          coffeeList.map((coffee, index) => (
            <CoffeeCard coffee={coffee} key={index} />
          ))}
      </div>
      <Cart />
    </div>
  );
};
