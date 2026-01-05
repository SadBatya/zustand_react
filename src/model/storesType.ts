import type {
  OrderItem,
  getCoffeeListRequestParams,
  CoffeeType,
} from "./coffeeTypes";

export type ListState = {
  coffeeList?: CoffeeType[];
  controller?: AbortController;
  params: getCoffeeListRequestParams;
};

export type ListActions = {
  getCoffeeList: (params?: getCoffeeListRequestParams) => Promise<CoffeeType[]>;
  setParams: (params: getCoffeeListRequestParams) => void;
};

export type CartState = {
  cart?: OrderItem[];
  address?: string;
};

export type CartActions = {
  setAddress: (text: string) => void;
  addCoffeeToCart: (item: CoffeeType) => void;
  clearCart: () => void;
  orderCoffee: () => void;
};
