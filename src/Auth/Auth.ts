import auth0 from "auth0-js";
import { History } from "history";

const clientID = process.env.REACT_APP_AUTH0_CLIENTID ?? "";
const REDIRECT_ON_LOGIN = "redirect_on_login";
export default class Auth {
  userProfile: auth0.Auth0UserProfile | null = null;
  requestedScopes = "openid profile email read:courses";
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN ?? "",
    clientID,
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
    audience: process.env.REACT_APP_API_AUDENCIE ?? "",
    responseType: "token id_token",
    scope: this.requestedScopes,
  });

  constructor(private history: History) {}

  login = () => {
    localStorage.setItem(
      REDIRECT_ON_LOGIN,
      JSON.stringify(this.history.location)
    );
    this.auth0.authorize();
  };
  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult?.idToken) {
        this.setSession(authResult);
        const redirectLocation =
          localStorage.getItem(REDIRECT_ON_LOGIN) &&
          localStorage.getItem(REDIRECT_ON_LOGIN) === undefined
            ? "/"
            : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN) || "{}");
        this.history.push(redirectLocation);
      } else if (err) {
        this.history.push("/");
        alert("Error ");
        console.log(err);
      }
      localStorage.removeItem(REDIRECT_ON_LOGIN);
    });
  };

  setSession = (authResult: auth0.Auth0DecodedHash) => {
    if (
      authResult &&
      authResult.expiresIn &&
      authResult.accessToken &&
      authResult.idToken
    ) {
      const expiresIn = authResult.expiresIn;
      const expiresAt = (expiresIn * 1000 + new Date().getTime()).toString();
      const scopes = authResult.scope || this.requestedScopes || "";
      localStorage.setItem("access_token", authResult.accessToken);
      localStorage.setItem("id_token", authResult.idToken);
      localStorage.setItem("expires_at", expiresAt);
      localStorage.setItem("scopes", JSON.stringify(scopes));
    }
  };

  isAuthenticated() {
    const expiresAt = localStorage.getItem("expires_at");
    if (expiresAt) {
      const expires = JSON.parse(expiresAt);
      return new Date().getTime() < expires;
    }
    return false;
  }

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.auth0.logout({
      clientID,
      returnTo: "http://localhost:3000",
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      return "";
    }
    return accessToken;
  };

  getProfile = (
    cb: (
      userProfile: auth0.Auth0UserProfile,
      err?: auth0.Auth0Error | null
    ) => void
  ) => {
    if (this.userProfile) {
      return cb(this.userProfile);
    }
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  };

  userHasScopes(scopes: string[]) {
    const scope = localStorage.getItem("scopes");
    if (scope) {
      const grantScopes = (JSON.parse(scope) || "").split(" ");
      return scopes.every((sco: string) => grantScopes.includes(sco));
    }
  }
}
