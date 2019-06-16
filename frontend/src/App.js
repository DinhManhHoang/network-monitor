import React from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import indexRoutes from './routes';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Auth from './layouts/Auth';
import withAuthentication from './withs/withAuthentication';
import socket from './socket';
import { BROADCAST } from './socket/accounts';

const theme = createMuiTheme({
  palette: {
    primary: { 
      main: `#18832f`,
    },
    secondary: { 
      main: `#be3311`,
    }
  },
  typography: {
    fontFamily: [
      '"Lato"',
      'sans-serif',
    ].join(','),
    useNextVariants: true,
  },
});

const hist = createBrowserHistory();

function App({ authenticationState, authenticationAction }) {

  const { auth } = authenticationState

  const [isAuth, setIsAuth] = React.useState(auth)

  React.useEffect(() => {
    setIsAuth(auth)
    socket.on(BROADCAST, () => {
      if (auth !== null)
      authenticationAction.login({
        username: auth.username,
        password: auth.password,
      })
    })
  }, [auth])

  return (
    <MuiThemeProvider theme={theme}>
      <Router history={hist}>
        {isAuth === null && 
          <Switch>
            <Route path={'/auth'} component={Auth} />
            <Redirect to={'/auth'} />
          </Switch>}
        {isAuth !== null && 
          <Switch>
            {indexRoutes.map((prop, key) => {
              return <Route path={prop.path} component={prop.component} key={key} />
            })}
          </Switch>}
      </Router>
    </MuiThemeProvider>
  );
}

export default withAuthentication(App)
