import './App.css';
import { Redirect, Route, RouterProps, useHistory } from 'react-router';
import { Container, ThemeProvider } from 'theme-ui'
import Home from './screens/Home';
import Profile from './screens/Profile';
import Public from './screens/Public';
import theme from './theme'
import { Nav } from './components';
import Auth from './Auth/Auth';
import Callback from './screens/Callback';
import Private from './screens/Private';
import Courses from './screens/Courses';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';


function App() {
  const history = useHistory();
  const auth = new Auth(history);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Nav auth={auth} />

        <Container>
          <Route path="/" exact component={Home} />
          <Route path="/profile" render={(props: RouterProps) => auth.isAuthenticated() ? <Profile auth={auth} {...props} /> : <Redirect to="/" />} />
          <Route path="/public" exact render={(props: RouterProps) => <Public auth={auth} {...props} />} />
          <Route path="/private" exact render={(props: RouterProps) => <Private auth={auth} {...props} />} />

          <PrivateRoute
            path="/courses"
            exact
            component={Courses}
          />

          <Route path="/callback" render={(props: RouterProps) => <Callback auth={auth} {...props} />} />

        </Container>
      </ThemeProvider>
    </AuthProvider>

  );
}

export default App;
