import { Dropdown, Button, type MenuProps } from "antd";
import { CoffeeCategory } from "../model/coffeeTypes";
import { useCoffeeStore } from "../model/cofeeStore";

const menuItems: MenuProps["items"] = [
  {
    label: "Капучино",
    key: "1",
  },
];

const handleMenuClick: MenuProps["onClick"] = (e) => {
  console.log(e);
};

const menuProps = {
  items: menuItems,
  onClick: handleMenuClick,
};

export const Category = () => {
  const { params, setParams } = useCoffeeStore();

  return (
    <div menu={menuProps} placement="bottom">
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
