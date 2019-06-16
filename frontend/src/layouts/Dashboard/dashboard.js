import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TopBar from '../../components/TopBar/TopBar';
import Header from '../../components/Header/Header';
import { makeStyles } from '@material-ui/core/styles';
import dashboardRoutes from "../../routes/dashboard";
import logo from '../../assets/imgs/logo.png';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: "150px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "80px",
    },
    padding: "25px",
    minHeight: "calc(100vh - 123px)"
  },
})) 

function Dashboard(props) {

  const classes = useStyles();

  const switchRoutes = (
    <Switch>
      {dashboardRoutes.map((prop, key) => {
        if (prop.redirect)
          return <Redirect from={prop.path} to={prop.to} key={key} />;
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  )

  return (
    <div>
      <TopBar routes={dashboardRoutes} logo={logo} {...props} />
      <div className={classes.content}>
        <Header routes={dashboardRoutes} {...props} />
        <div>
          {switchRoutes}
        </div>
      </div>
    </div>
  )

}

export default Dashboard