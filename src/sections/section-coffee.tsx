import { Button, Card, Rate, Tag, Input } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSearchStore } from "../model/searchStore";

import { useCoffeeStore } from "../model/cofeeStore";
import { useEffect } from "react";

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
  } = useCoffeeStore();

  useEffect(() => {
    getCoffeeList();
  }, []);

  return (
    <div className="section_coffee">
      <Input
        placeholder="Поиск"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="cards_container">
        {coffeeList &&
          coffeeList.map(
            ({ id, name, subtitle, type, rating, image, price }, index) => (
              <Card
                key={index}
                cover={<img src={image} alt={name} />}
                actions={[
                  <Button
                    icon={<ShoppingCartOutlined />}
                    onClick={() =>
                      addCoffeeToCart({
                        id,
                        name,
                        type: "L",
                        subtitle,
                        rating,
                        image,
                        price,
                      })
                    }
                  >
                    {price}
                  </Button>,
                ]}
              >
                <Card.Meta title={name} description={subtitle} />
                <Tag color="purple" style={{ marginTop: 12 }}>
                  {type}
                </Tag>
                <Rate
                  defaultValue={rating}
                  disabled
                  allowHalf
                  style={{ marginTop: 12 }}
                />
              </Card>
            )
          )}
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
