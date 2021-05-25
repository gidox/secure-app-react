import { Heading } from "@theme-ui/components";
import { useEffect, useState } from "react";

export default function Public(): JSX.Element {
  const [message, setMessage] = useState<string>("")
  useEffect(() => {
    const getPublic = () => {
      fetch('/public').then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response is not ok")
      })
        .then((response) => setMessage(response.message))
        .catch((err) => setMessage(err.message))
    }
    getPublic();
  })
  return (
    <Heading>{message}</Heading>
  );
}
