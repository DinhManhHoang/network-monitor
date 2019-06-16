import React, { useState } from 'react';
import { 
  AppBar, Typography, Toolbar, Tab, Tabs, IconButton, Slide, Icon, Avatar,
  Hidden, ListItem, ListItemText, List, ListItemIcon, Drawer, Select, MenuItem, 
} from '@material-ui/core';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AuthMenu from '../AuthMenu/AuthMenu';
import PopupMenu from '../PopupMenu/PopupMenu';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import withGetAllCities from "../../withs/withGetAllCities";
import withChangeCity from '../../withs/withChangeCity';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: 'white',
  },
  bar: {
    paddingLeft: '30px',
    paddingRight: '30px', 
  },
  grow: {
    flexGrow: 1,
  },
  tabs:{
    width: '100%',
  },
  logo: {
    marginRight: '20px',
  },
  active: {
    color: `${theme.palette.primary.main}`,
  }
}))

function _QueryBuilder({ getAllCitiesState, getAllCitiesAction, changeCityState, changeCityAction }) {
  
  const { cities } = getAllCitiesState
  const { getAllCities } = getAllCitiesAction
  const { city } = changeCityState
  const { changeCity } = changeCityAction

  React.useEffect(() => {
    getAllCities({})
  }, [])

  React.useEffect(() => {
    changeCity(0)
  }, [cities])

  function handleChange(event) {
    changeCity(event.target.value)
  }

  if (getAllCitiesState.loading === true) {
    return <Typography variant='body1'>Đang tải</Typography>
  }

  if (getAllCitiesState.error != null) {
    return <Typography variant='body1'>Đã xảy ra lỗi</Typography>
  }

  return (
    <Select
      value={city}
      onChange={handleChange}
      inputProps={{
        name: 'city',
        id: 'city-picker',
      }}
    >
      {cities.map((city, key) => (<MenuItem value={key} key={key}>{city.name}</MenuItem>))}
    </Select>
  )
}

const QueryBuilder = withGetAllCities(withChangeCity(_QueryBuilder))

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({ threshold: 70 });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}  
    </Slide>
  );
}

function TopBar(props) {

  const [side, setSide] = useState(false);
  const classes = useStyles();
  const { routes, location, logo } = props;
  
  let active = 0 
  routes.forEach((route, key) => {
    if ((!route.redirect) && (location.pathname.includes(route.path))) {
      active = key
    }
  })

  const [tab, setTab] = useState(active);

  function handleChange(event, newValue) {
    setTab(newValue);
  }

  function handleSideBarChange(newValue) {
    return function(event) {
      setSide(false);
      setTab(newValue);
    }
  }

  function handleSideBarOpen(open) {
    return function(event) {
      setSide(open)
    }
  }

  const sideBar = (
    <List>
      {routes.map((route, key) => {
        if (!route.redirect) {
          const icon = <Icon>{route.icon}</Icon>
          return (
            <ListItem className={tab === key ? classes.active : null} button 
              key={key} component={Link} to={route.path}
              onClick={handleSideBarChange(key)}
            >
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText>
                {route.name}
              </ListItemText>
            </ListItem>
          )
        } else {
          return null
        }
      })}
    </List>
  );

  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar} color='default'>
          <Toolbar className={classes.bar}>
            <Avatar alt='logo' src={logo} className={classes.logo} />
            <Hidden smDown>
              <Typography variant="h5" color="primary">C500 - Dashboard</Typography>
            </Hidden>
            <div className={classes.grow} />
            <QueryBuilder />
            <AuthMenu />
            <PopupMenu />
            <Hidden mdUp>
              <IconButton size='medium' edge='end' color='primary' onClick={handleSideBarOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Toolbar>
          <Hidden smDown>
            <Toolbar className={classes.bar}>
              <Tabs
                centered
                value={tab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                className={classes.tabs}
              >
                {routes.map((route, key) => {
                  if (!route.redirect) {
                    const icon = <Icon>{route.icon}</Icon>
                    return <Tab label={route.name} icon={icon} key={key} component={Link} to={route.path} />
                  } else {
                    return null
                  }
                })}
              </Tabs>
            </Toolbar>
          </Hidden>
        </AppBar>
      </HideOnScroll>
      <Drawer anchor="right" open={side} onClose={handleSideBarOpen(false)}>
        {sideBar}
      </Drawer>
    </React.Fragment>
  );
}

export default TopBar