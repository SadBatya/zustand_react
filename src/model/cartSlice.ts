import type { StateCreator } from "zustand";
import type {
  CartActions,
  CartState,
  ListActions,
  ListState,
} from "./storesType";
import axios from "axios";

import type { OrderItem, OrderCoffeeRes } from "./coffeeTypes";
import { BASE_URL } from "./apiUrl";

export const cartSlice: StateCreator<
  CartActions & CartState & ListActions & ListState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  CartActions & CartState
> = (set, get) => ({
  cart: undefined,
  address: undefined,
  addCoffeeToCart: (item) => {
    const { cart } = get();
    const { id, name, subtitle } = item;
    const prepearedItem: OrderItem = {
      id,
      name: `${name} ${subtitle}`,
      size: "L",
      quantity: 1,
    };

    set(
      { cart: cart ? [...cart, prepearedItem] : [prepearedItem] },
      false,
      "Добавить кофе в корзину"
    );
  },
  orderCoffee: async () => {
    const { cart, address, clearCart } = get();

    try {
      const { data } = await axios.post<OrderCoffeeRes>(BASE_URL + "order", {
        address,
        orderItems: cart,
      });

      if (data.success) {
        alert(data.message);
        clearCart();
      }
    } catch (error) {
      console.log(error);
    }
  },
  setAddress: (address: string) => {
    set({ address });
  },
  clearCart: () => {
    set({ cart: undefined });
  },
});
