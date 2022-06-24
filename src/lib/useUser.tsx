import { useEffect } from "react";
import useSWR from "swr";
import { Login } from "../pages/api/login";

export default function useUser() {
  const fetcher = (...args) => fetch(...args as [string]).then(res => res.json())
  const { data: user, mutate: mutateUser } = useSWR<Login>("/api/user", fetcher);
  return { user, mutateUser };
}