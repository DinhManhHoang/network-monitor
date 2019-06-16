import React from "react";
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  header: {
    marginLeft: '30px',
  },
  hr: {
    marginBottom: '20px',
    border: 'none',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  }
}))

function Header(props) {
  
  const classes = useStyles();
  const { routes, location } = props;
  
  let active = ''
  routes.forEach(route => {
    if ((!route.redirect) && (location.pathname.includes(route.path))) {
      active = route.name
    }
  })

  return (
    <div>
      <div className={classes.header}>
        <Typography variant='h6' color='primary'>
          {active}
        </Typography>
      </div>
      <hr className={classes.hr} />
    </div>
  )
}


export default Header;