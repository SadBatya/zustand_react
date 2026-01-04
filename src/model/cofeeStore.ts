import { create, type StateCreator } from "zustand";
import type {
  CoffeeType,
  getCoffeeListRequestParams,
  OrderCoffeeRes,
  OrderItem,
} from "./coffeeTypes";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";

const BASE_URL = "https://purpleschool.ru/coffee-api/";

type CoffeeState = {
  coffeeList?: CoffeeType[];
  cart?: OrderItem[];
  address?: string;
  controller?: AbortController;
  params: getCoffeeListRequestParams;
};

type CoffeeActions = {
  getCoffeeList: (params?: getCoffeeListRequestParams) => void;
  addCoffeeToCart: (item: CoffeeType) => void;
  clearCart: () => void;
  orderCoffee: () => void;
  setAddress: (text: string) => void;
  setParams: (params: getCoffeeListRequestParams) => void;
};

const coffeeSlice: StateCreator<
  CoffeeActions & CoffeeState,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set, get) => ({
  coffeeList: undefined,
  controller: undefined,
  cart: undefined,
  adress: undefined,
  params: {
    text: undefined,
  },
  setParams: (newParams) => {
    const { getCoffeeList, params } = get();
    set({ params: { ...params, ...newParams } }, false, "setParams");
    getCoffeeList(params);
  },
  getCoffeeList: async (params) => {
    const { controller } = get();
    if (controller) {
      controller.abort();
    }

    const newController = new AbortController();
    set({ controller: newController });
    const { signal } = newController;

    try {
      const { data } = await axios.get(BASE_URL, { params, signal });
      set({ coffeeList: data });
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      console.log(error);
    }
  },
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
  setAddress: (address: string) => {
    set({ address });
  },
  clearCart: () => {
    set({ cart: undefined });
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
});

export const useCoffeeStore = create<CoffeeActions & CoffeeState>()(
  devtools(
    persist(coffeeSlice, {
      name: "coffee",
      partialize: (state) => ({ cart: state.cart, address: state.address }),
    }),
    { name: "coffeeStore" }
  )
);

export const getCoffeeList = (params?: getCoffeeListRequestParams) =>
  useCoffeeStore.getState().getCoffeeList(params);
