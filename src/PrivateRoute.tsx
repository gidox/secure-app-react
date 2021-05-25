import { useEffect } from 'react';
import { Route, RouteProps } from 'react-router';
import { useAuth } from './AuthContext';

type PrivateRouteProps = {
  component: React.ComponentClass | React.FunctionComponent;
} & RouteProps;

export default function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isAuthenticated) return <Login />;
        return <Component {...props} />
      }}

    />
  )
}
function Login(): React.ReactElement {
  const auth = useAuth();
  useEffect(() => {
    auth.login()
  }, [auth])
  return <div />
}