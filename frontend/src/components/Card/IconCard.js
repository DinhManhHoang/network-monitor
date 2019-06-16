import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 150,
    height: '100%',
  },

  cardContent: {
    height: '100%',
    display: 'flex',
  },

  cardRight: {
    height: '100%',
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'right',
    justifyContent: 'center',
  },

  cardLeft: {
    height: '100%',
    width: '25%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    backgroundColor: `${theme.palette.primary.main}`,
    color: `${theme.palette.primary.contrastText}`,
  },

  title: {
    fontSize: 14,
  },
}));

function IconCard({ title, content, smallContent, icon }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CssBaseline />
      <CardContent className={classes.cardContent}>
        <div className={classes.cardLeft}>
          {icon}
        </div>
        <div className={classes.cardRight}>
          <Typography className={classes.title} color='primary' align='right'>
            {title}
          </Typography>
          <Typography variant={smallContent === true ? 'body2' : 'h6'} component='h3'  align='right'>
            {content}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default IconCard;