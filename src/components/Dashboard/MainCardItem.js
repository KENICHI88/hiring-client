import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import PropTypes from 'prop-types';
import StatisticItem from './StatisticItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  numberWrapper: {
    width: '100%',
    display: 'flex'
  }
}));

const MainCardItem = (props) => {
  
  const classes = useStyles();
  
  const {statistic} = props;
  
  return (
    <Card className={classes.cardWrapper}>
      <CardHeader
        title={props.mainTitle}
      />
      <CardContent>
        <div className={classes.numberWrapper}>
          {statistic && statistic.length ? (statistic.map((item, index) => (<StatisticItem 
            key={`dashboard-statistic-${index}`}
            number={item.number}
            desc={item.desc}
          />))) : null}
          
        </div>
      </CardContent>
    </Card>
  )
}

MainCardItem.defaultProps = {
  number: 0
}

MainCardItem.propTypes = {
  children: PropTypes.node,
  mainTitle: PropTypes.string.isRequired,
  statistic: PropTypes.array.isRequired,
};

export default MainCardItem
