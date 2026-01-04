import { Input, Button } from "antd";
import { useCoffeeStore } from "../model/cofeeStore";

export const Cart = () => {
  const { cart, address, orderCoffee, setAddress, clearCart } =
    useCoffeeStore();

  return (
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
  );
};
