import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: '1.5em', 
  },
}));  

function FontAwesomeIcon({ iconClass }) { 

  const classes = useStyles();

  return (
    <i className={clsx(classes.icon, iconClass)} />
  )
}

export default FontAwesomeIcon