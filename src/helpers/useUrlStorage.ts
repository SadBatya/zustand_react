import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useUrlStorage = <T extends Record<string, string>>(
  params: T,
  setParams: (params: T) => void
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParamsFromUrl = () => {
    const paramsFromUrl = Object.keys(params).reduce((acc, key) => {
      const value = searchParams.get(key);
      if (value) {
        acc[key as keyof T] = value as T[keyof T];
      }

      return acc;
    }, {} as Partial<T>);

    if (paramsFromUrl) {
      setParams(paramsFromUrl as T);
    }
  };

  useEffect(setParamsFromUrl, [searchParams]);

  useEffect(() => {
    const newQueryParams = new URLSearchParams();

    params.text && newQueryParams.set("text", params.text);

    setSearchParams(newQueryParams);
  }, [params]);
};
