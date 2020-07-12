import React from 'react'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';

import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles({
  wrapper: {
    textAlign: 'center'
  },
  textDesc: {
    color: grey[600]
  }
});

function StatisticItem(props) {
  
  const classes = useStyles();
  
  const color = '#f00';
  
  return (
    <Grid item xs className={clsx(classes.wrapper, color)}>
      <Typography variant="h3" className={clsx(color)}>{props.number}</Typography>
      <Typography className={classes.textDesc} variant="body1">{props.desc}</Typography>
    </Grid>
  )
}

StatisticItem.defaultProps = {
  number: 0
}

StatisticItem.propTypes = {
  number: PropTypes.number.isRequired,
  desc: PropTypes.string
}

export default StatisticItem
