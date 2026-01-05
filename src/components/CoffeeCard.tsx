import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Button, Tag, Rate } from "antd";
import type { CoffeeType } from "../model/coffeeTypes";
import { useCoffeeStore } from "../model/cofeeStore";

export const CoffeeCard = ({ coffee }: { coffee: CoffeeType }) => {
  const { addCoffeeToCart } = useCoffeeStore();
  const { image, id, name, subTitle, rating, price, type } = coffee;
  
  return (
    <Card
      cover={<img src={image} alt={name} />}
      actions={[
        <Button
          icon={<ShoppingCartOutlined />}
          onClick={() =>
            addCoffeeToCart({
              id,
              name,
              type: "L",
              subTitle,
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
      <Card.Meta title={name} description={subTitle} />
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
  );
};
