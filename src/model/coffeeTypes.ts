export const CoffeeCategory = {
  capuccino: "capuccino",
  latte: "latte",
  macchiato: "macchiato",
  americano: "americano",
} as const;

export type CoffeeType = {
  id: number;
  name: string;
  subtitle: string;
  type: string;
  price: string;
  image: string;
  rating: number;
};

export type getCoffeeListRequestParams = {
  text?: string;
  type?: (typeof CoffeeCategory)[keyof typeof CoffeeCategory];
};

export type OrderItem = {
  id: number;
  name: string;
  size: "L";
  quantity: number;
};

export type OrderCoffeeReq = {
  address: string;
  orderItems: OrderItem[];
};

export type OrderCoffeeRes = {
  message: string;
  success: boolean;
};
