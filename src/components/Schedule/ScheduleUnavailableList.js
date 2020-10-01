import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ScheduleUnavailableItem from './ScheduleUnavailableItem';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
  },
  pagerHeading: {
    padding: '5px 8px',
    backgroundColor: '#424242',
    color: '#fff',
  },
  h3: {
    margin: theme.spacing(1),
  },
  wrapper: {
    maxHeight: 'calc(100vh - 250px)',
    overflowY: 'auto'
  }
}));

const ScheduleUnavailableList = React.memo( (props) => {
  
  const classes = useStyles();
  
  const {rawIntervewList} = props;
  if(!rawIntervewList || !rawIntervewList.length || rawIntervewList === undefined){
    return null;
  }
  return (
    <div className="interview-unavailable">
      <Paper className={classes.root}>
        <div className={classes.pagerHeading}>
          
          <h3 className={classes.h3}>List busy date in month:</h3>
        </div>
        <List className={classes.wrapper}>{rawIntervewList.map(item => <ScheduleUnavailableItem key={item._id} {...props} {...item} />)}</List>
      </Paper>
    </div>
  );
})

export default ScheduleUnavailableList;
