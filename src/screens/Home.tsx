import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";


export default function Home(): React.ReactElement {
  const auth = useAuth();
  const { isAuthenticated, login } = auth;
  return (
    <>
      <h1>Home Screen</h1>
      {isAuthenticated ? (
        <Link to="/profile">View Profile</Link>
      ) : (
        <button onClick={() => login()}>Log me in!</button>
      )}
    </>
  );
}
