import { useEffect } from "react";
import useSWR from "swr";
import { Login } from "../pages/api/login";

export default function useUser() {
  const fetcher = (...args) =>
    fetch(...(args as [string])).then((res) => res.json());
  const { data: login, mutate: mutateLogin } = useSWR<Login>(
    "/api/user",
    fetcher
  ) as {
    data: Login;
    mutate: any;
  };
  return { login, mutateLogin };
}
