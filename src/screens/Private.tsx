import { Heading } from "@theme-ui/components";
import { useEffect, useState } from "react";
import Auth from "../Auth/Auth";

type Props = {
  auth: Auth;
};

export default function Private({ auth }: Props): JSX.Element {
  const [message, setMessage] = useState<string>("")
  useEffect(() => {
    const getPrivate = () => {
      fetch('/private', {
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`
        }
      }).then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response is not ok")
      })
        .then((response) => setMessage(response.message))
        .catch((err) => setMessage(err.message))
    }
    getPrivate();
  })
  return (
    <Heading>{message}</Heading>
  );
}
