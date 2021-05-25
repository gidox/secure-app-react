import { Container, Heading } from "@theme-ui/components";
import { useEffect, useState } from "react";
import Auth from "../Auth/Auth";
import { useAuth } from "../AuthContext";



export default function Courses(): JSX.Element {
  const [courses, setCourses] = useState<{ id: number, title: string }[]>([]);
  const [error, setError] = useState<string>("");
  const auth = useAuth()
  console.log({ auth })
  useEffect(() => {
    const getCourses = () => {
      fetch('/courses', {
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`
        }
      }).then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response is not ok")
      })
        .then((response) => setCourses(response.courses))
        .catch((err) => setError(err.message))
    }
    const getAdminData = () => {
      fetch('/admin', {
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`
        }
      }).then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response is not ok")
      })
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
    }
    getAdminData();
    getCourses();
  }, [auth])
  return (
    <Container>
      <Heading>Courses</Heading>
      <ul>
        {courses.map((course) => {
          return (
            <li key={course.id.toString()}>{course.title}</li>
          )
        })}
      </ul>

    </Container>

  );
}
