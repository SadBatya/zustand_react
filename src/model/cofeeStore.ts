import { create } from "zustand";
import type { getCoffeeListRequestParams } from "./coffeeTypes";
import { devtools, persist } from "zustand/middleware";
import type {
  CartActions,
  CartState,
  ListActions,
  ListState,
} from "./storesType";
import { listSlice } from "./ListSlice";
import { cartSlice } from "./cartSlice";

export const useCoffeeStore = create<
  CartActions & CartState & ListActions & ListState
>()(
  devtools(
    persist((...args) => ({ ...listSlice(...args), ...cartSlice(...args) }), {
      name: "coffeeStore",
      partialize: (state) => ({ cart: state.cart, address: state.address }),
    }),
    { name: "coffeeStore" }
  )
);

export const getCoffeeList = (params?: getCoffeeListRequestParams) =>
  useCoffeeStore.getState().getCoffeeList(params);
