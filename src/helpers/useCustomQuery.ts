import { useQuery } from "@tanstack/react-query";
import { getCoffeeList, setData } from "../model/cofeeStore";
import { useEffect } from "react";
import type { getCoffeeListRequestParams } from "../model/coffeeTypes";

export const useCustomQuery = (params: getCoffeeListRequestParams) => {
  const { data, status } = useQuery({
    queryKey: ["coffeeList", params],
    queryFn: () => getCoffeeList(),
  });

  useEffect(() => {
    setData(data);
  }, [data, status]);
};
