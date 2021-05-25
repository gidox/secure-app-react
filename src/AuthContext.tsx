import { useContext, createContext } from "react";
import { useHistory } from "react-router";
import Auth from "./Auth/Auth";

type AuthContextProps = {
  login: () => void;
  getAccessToken: string;
  isAuthenticated: boolean;
  canReadCourses?: boolean;
}


const authContext = createContext<AuthContextProps>({ login: () => null, getAccessToken: "", isAuthenticated: false, canReadCourses: false });
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const history = useHistory();
  const auth = new Auth(history);
  return <authContext.Provider
    value={{
      login: auth.login,
      getAccessToken: auth.getAccessToken(),
      isAuthenticated: auth.isAuthenticated(),
      canReadCourses: auth.userHasScopes(["read:courses"])
    }}>{children}
  </authContext.Provider>;
}
export const useAuth = () => {
  return useContext(authContext);
};
