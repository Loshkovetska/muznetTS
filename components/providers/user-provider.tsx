import { QUERY_TAGS } from "@/lib/constants";
import AuthService from "@/lib/services/auth";
import { UserType } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext<{
  user: UserType | null;
  isMusician: boolean;
  updateUser: () => void;
  logOut: () => void;
}>({
  user: null,
  isMusician: false,
  updateUser: () => {},
  logOut: () => {},
});

export const useUser = () => useContext(UserContext);

export default function UserProvider(props: React.PropsWithChildren) {
  const [userId, setUserId] = useState<string | null>(null);

  const { data: user = null, refetch } = useQuery({
    queryKey: [QUERY_TAGS.USER],
    queryFn: () => AuthService.getUser(userId as string),
    enabled: !!userId,
  });

  const logOut = useCallback(() => {
    AsyncStorage.clear()
      .then(() => router.navigate("/sign-in"))
      .catch((e) => console.log(e));
  }, []);

  const updateUser = useCallback(() => {
    AsyncStorage.getItem("user").then((r) => {
      setUserId(r);
      refetch();
    });
  }, [refetch]);

  useEffect(() => {
    AsyncStorage.getItem("user").then((r) => setUserId(r));
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isMusician: user?.user_type === "musician",
        logOut,
        updateUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
