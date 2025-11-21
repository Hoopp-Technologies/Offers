import usePersistedState from "@/hooks/usePersistedState";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";

export type AuthContextType = {
  showAuth: boolean;
  setShowAuth: Dispatch<SetStateAction<boolean>>;
  loggedIn: boolean;
  setLoggedIn: (val:boolean) => void;
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
  return (
    <AuthContext.Provider value={{ showAuth, setLoggedIn, setShowAuth, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
