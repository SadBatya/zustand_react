import { Button } from "antd";
import { CoffeeCategory } from "../model/coffeeTypes";
import { useCoffeeStore } from "../model/cofeeStore";

export const Category = () => {
  const { params, setParams } = useCoffeeStore();

  return (
    <div>
      {Object.keys(CoffeeCategory).map((key) => (
        <Button
          danger={params.type === key}
          onClick={() =>
            setParams({
              type: CoffeeCategory[key as keyof typeof CoffeeCategory],
            })
          }
          key={key}
        >
          {key}
        </Button>
      ))}
    </div>
  );
};
