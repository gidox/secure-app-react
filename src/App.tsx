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
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Nav />
        <Container>
          <Route path="/" exact component={Home} />
          <Route path="/public" exact component={Public} />
          <Route path="/private" exact component={Private} />
          <PrivateRoute
            path="/profile"
            exact
            component={Profile}
          />
          <PrivateRoute
            path="/courses"
            exact
            component={Courses}
          />
          <Route path="/callback" component={Callback} />
        </Container>
      </ThemeProvider>
    </AuthProvider>

  );
}

export default App;
