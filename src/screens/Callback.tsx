import { Heading } from "@theme-ui/components";
import { useEffect } from "react";
import { useLocation } from "react-router";
import Auth from "../Auth/Auth";

type CallbackProps = {
  auth: Auth
}
export default function Callback({ auth }: CallbackProps): React.ReactElement {
  const location = useLocation();

  useEffect(() => {
    const checkToken = () => {
      if (/access_token|id_token|error/.test(location.hash)) {
        return auth.handleAuthentication();
      }
      throw new Error("Invalid callback URL")
    }
    checkToken()
  }, [auth, location.hash])
  return (
    <Heading>Loading...{location.hash}</Heading>
  );
}
