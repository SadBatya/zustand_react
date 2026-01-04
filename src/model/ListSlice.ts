import type { StateCreator } from "zustand";
import type {
  CartActions,
  CartState,
  ListActions,
  ListState,
} from "./storesType";
import axios from "axios";
import { BASE_URL } from "./apiUrl";

export const listSlice: StateCreator<
  CartActions & CartState & ListActions & ListState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  ListActions & ListState
> = (set, get) => ({
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
});
