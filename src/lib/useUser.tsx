import useSWR from "swr";
import { Login } from "../pages/api/login";

export default function useUser() {
  const { data: user, mutate: mutateUser } = useSWR<Login>("/api/user");
  return { user, mutateUser };
}