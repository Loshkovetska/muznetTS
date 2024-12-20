import { UserType } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [user, setUser] = useState<UserType | null>(null);

  const logOut = useCallback(() => {
    AsyncStorage.clear()
      .then(() => router.navigate("/sign-in"))
      .catch((e) => console.log(e));
  }, []);

  const updateUser = useCallback(() => {
    AsyncStorage.getItem("user").then((res) => {
      setUser(JSON.parse(res || "null"));
    });
  }, []);

  useEffect(() => {
    updateUser();
  }, [updateUser]);

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
