import auth0 from "auth0-js";
import { History } from "history";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN ?? "",
    clientID: process.env.REACT_APP_AUTH0_CLIENTID ?? "",
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
    responseType: "token id_token",
    scope: "openid profile email",
  });

  constructor(private history: History) {}

  login = () => {
    this.auth0.authorize();
  };
}
