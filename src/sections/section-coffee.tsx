import { Button, Card, Rate, Tag, Input } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { useCoffeeStore } from "../model/cofeeStore";
import { useEffect, useState } from "react";

export const SectionCoffee = () => {
  const { getCoffeeList, coffeeList } = useCoffeeStore();
  const [search, setSearch] = useState<string | undefined>();

  const handleSearch = (text: string) => {
    getCoffeeList({ text });
    setSearch(text);
  };

  useEffect(() => {
    getCoffeeList();
  }, []);

  return (
    <div className="section_coffee">
      <Input
        placeholder="Поиск"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="cards_container">
        {coffeeList &&
          coffeeList.map(
            ({ name, type, subtitle, rating, image, price }, index) => (
              <Card
                key={index}
                cover={<img src={image} alt={name} />}
                actions={[
                  <Button icon={<ShoppingCartOutlined />}>{price}</Button>,
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
    </div>
  );
};
