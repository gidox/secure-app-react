
import { Link } from 'react-router-dom';
import { NavLink, Flex } from 'theme-ui'
import Auth from '../Auth/Auth';

export function Nav({ auth }: { auth: Auth }): React.ReactElement {
  const { isAuthenticated, userHasScopes, login, logout } = auth;
  return (
    <Flex as="header" variant="header">
      <Link to="/">
        <NavLink href="#!" p={2}>
          Home
        </NavLink>
      </Link>

      <Link to="/public">
        <NavLink href="#!" p={2}>
          Public
        </NavLink>
      </Link>
      <Link to="/private">
        <NavLink href="#!" p={2}>
          Private
        </NavLink>
      </Link>
      {isAuthenticated() && userHasScopes(["read:courses"]) && (
        <Link to="/courses">
          <NavLink href="#!" p={2}>
            Courses
          </NavLink>
        </Link>
      )}
      {isAuthenticated() ? (
        <NavLink href="#!" p={2} onClick={() => logout()}>
          Logout
        </NavLink>

      ) : (
        <NavLink href="#!" p={2} onClick={() => login()}>
          Login
        </NavLink>
      )}
    </Flex >
  );
}
