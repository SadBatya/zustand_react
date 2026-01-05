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
import { produce } from "immer";

export const cartSlice: StateCreator<
  CartActions & CartState & ListActions & ListState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  CartActions & CartState
> = (set, get) => ({
  cart: undefined,
  address: undefined,
  addCoffeeToCart: (item) => {
    const { id, name, subTitle } = item;
    const prepearedItem: OrderItem = {
      id,
      name: `${name} ${subTitle}`,
      size: "L",
      quantity: 1,
    };

    set(
      produce<CartState>((draft) => {
        if (!draft.cart) {
          draft.cart = [];
        }
        const itemIndex = draft.cart.findIndex(
          (item) => item.id === prepearedItem.id
        );
        if (itemIndex !== -1) {
          draft.cart[itemIndex].quantity += 1;
          return;
        }

        draft.cart.push(prepearedItem);
      })
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
