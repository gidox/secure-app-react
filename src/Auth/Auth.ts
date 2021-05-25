import auth0 from "auth0-js";
import { History } from "history";

const clientID = process.env.REACT_APP_AUTH0_CLIENTID ?? "";
const REDIRECT_ON_LOGIN = "redirect_on_login";

let _idToken: string;
let _accessToken: string;
let _scopes: string;
let _expiresAt: number;

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
      _expiresAt = expiresIn * 1000 + new Date().getTime();
      _scopes = authResult.scope || this.requestedScopes || "";
      _accessToken = authResult.accessToken;
      _idToken = authResult.idToken;
    }
  };

  isAuthenticated() {
    const expiresAt = _expiresAt;
    if (expiresAt) {
      return new Date().getTime() < _expiresAt;
    }
    return false;
  }

  logout = () => {
    this.auth0.logout({
      clientID,
      returnTo: "http://localhost:3000",
    });
  };

  getAccessToken = () => {
    if (_accessToken) {
      return _accessToken;
    }
    return "";
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
    if (_scopes) {
      const grantScopes = (_scopes || "").split(" ");
      return scopes.every((sco: string) => grantScopes.includes(sco));
    }
  }

  renewAccessToken(
    cb?: (err: auth0.Auth0Error | null, result: auth0.Auth0Result) => void
  ) {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(`Error ${err.error} - ${err.errorDescription}`);
      } else {
        this.setSession(result);
      }
      if (cb) cb(err, result);
    });
  }
  scheduleTokenRenewal() {
    const delay = _expiresAt - Date.now();
    if (delay > 0) setTimeout(() => this.renewAccessToken(), delay);
  }
}
