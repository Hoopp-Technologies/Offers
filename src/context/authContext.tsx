import usePersistedState from "@/hooks/usePersistedState";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
  useEffect,
} from "react";
import { useGetProfile } from "@/services/profile/queries";
import { toast } from "sonner";

export type AuthContextType = {
  showAuth: boolean;
  setShowAuth: Dispatch<SetStateAction<boolean>>;
  loggedIn: boolean;
  setLoggedIn: (val: boolean) => void;
};

const AuthDefaults: AuthContextType = {
  showAuth: false,
  setShowAuth: () => undefined,
  setLoggedIn: () => undefined,
  loggedIn: false,
};

export const AuthContext = createContext(AuthDefaults);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showAuth, setShowAuth] = useState(false);
  const [loggedIn, setLoggedIn] = usePersistedState({
    key: "loggedIn",
    defaultValue: false,
  });

  // Validate auth status via profile endpoint
  const token = localStorage.getItem("token");
  const { data, isError } = useGetProfile({
    enabled: !!token, // Only run query if token exists
  });

  useEffect(() => {
    if (token) {
      if (data) {
        // Profile loaded successfully, user is logged in
        setLoggedIn(true);
      } else if (isError) {
        // Profile failed to load, token is expired or invalid
        setLoggedIn(false);
        localStorage.removeItem("token");
        toast.error("Login session ended. Please login again");
      }
    } else {
      // No token, user is not logged in
      setLoggedIn(false);
    }
  }, [data, isError, token, setLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ showAuth, setLoggedIn, setShowAuth, loggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
