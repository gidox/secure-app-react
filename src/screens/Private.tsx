import { Heading } from "@theme-ui/components";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export default function Private(): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const auth = useAuth();
  useEffect(() => {
    const getPrivate = () => {
      fetch('/private', {
        headers: {
          Authorization: `Bearer ${auth.getAccessToken}`
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
