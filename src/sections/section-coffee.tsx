import { Button, Card, Rate, Tag, Input } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSearchStore } from "../model/searchStore";

import { useCoffeeStore } from "../model/cofeeStore";
import { useEffect } from "react";
import { useUrlStorage } from "../helpers/useUrlStorage";
import { CoffeeCard } from "../components/CoffeeCard";

export const SectionCoffee = () => {
  const { setText, text } = useSearchStore();

  const {
    getCoffeeList,
    coffeeList,
    addCoffeeToCart,
    clearCart,
    orderCoffee,
    address,
    setAddress,
    cart,
    params,
    setParams,
  } = useCoffeeStore();
  useUrlStorage(params, setParams);

  useEffect(() => {
    getCoffeeList(params);
  }, []);

  return (
    <div className="section_coffee">
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
      <div className="cart">
        <h1>Заказ</h1>
        {cart && cart.length > 0 ? (
          <>
            {cart.map(({ name }, index) => (
              <span key={index}>{name}</span>
            ))}
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Адрес доставки"
            />
            <Button onClick={orderCoffee} type="primary">
              Сделать заказ
            </Button>
            <Button onClick={clearCart}>Очистить корзину</Button>
          </>
        ) : (
          <span>Добавьте напитки</span>
        )}
      </div>
    </div>
  );
};
