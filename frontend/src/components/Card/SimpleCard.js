import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    minWidth: 150,
    height: '100%',
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function SimpleCard({ title, content, caption }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CssBaseline />
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title} variant='h6' color='primary'>
          {title}
        </Typography>
        {content}
        <Typography className={classes.pos} color="textSecondary">
          {caption}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SimpleCard;