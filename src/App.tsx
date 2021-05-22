import './App.css';
import { Route, RouterProps, useHistory } from 'react-router';
import { Container, ThemeProvider } from 'theme-ui'
import Home from './screens/Home';
import Profile from './screens/Profile';
import theme from './theme'
import { Nav } from './components';
import Auth from './Auth/Auth';

function App() {
  const history = useHistory();
  const auth = new Auth(history)
  return (
    <>
      <ThemeProvider theme={theme}>
        <Nav />

        <Container>
          <Route path="/" exact render={(props: RouterProps) => <Home auth={auth} {...props} />} />
          <Route path="/profile" component={Profile} />

        </Container>
      </ThemeProvider>
    </>

  );
}

export default App;
