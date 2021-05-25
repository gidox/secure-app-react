import { useContext, createContext, useState, useEffect } from "react";
import auth0 from "auth0-js";
import { useHistory } from "react-router";
import Auth from "./Auth/Auth";

type AuthContextProps = {
  login: () => void;
  logout: () => void;
  handleAuthentication: () => void;
  getProfile: (cb: (userProfile: auth0.Auth0UserProfile, err?: auth0.Auth0Error | null | undefined) => void) => void;
  getAccessToken: () => void;
  isAuthenticated: boolean;
  canReadCourses?: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  login: () => null,
  logout: () => null,
  handleAuthentication: () => null,
  getProfile: () => null,
  getAccessToken: () => null,
  isAuthenticated: false,
  canReadCourses: false,
});
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const history = useHistory();
  const [tokenRenewalComplete, setRenew] = useState<boolean>(false);
  const auth = new Auth(history);

  return (
    <AuthContext.Provider
      value={{
        login: auth.login,
        logout: auth.logout,
        handleAuthentication: auth.handleAuthentication,
        getProfile: auth.getProfile,
        getAccessToken: auth.getAccessToken,
        isAuthenticated: auth.isAuthenticated(),
        canReadCourses: auth.userHasScopes(["read:courses"]),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};
