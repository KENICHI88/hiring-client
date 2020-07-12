import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ScheduleAvailableItem from './ScheduleAvailableItem';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
  },
  wrapper: {
    maxHeight: 'calc(100vh - 250px)',
    overflowY: 'auto'
  },
  pagerHeading: {
    padding: '5px 8px',
    backgroundColor: '#424242',
    color: '#fff',
  },
  h3: {
    margin: theme.spacing(1),
  }
}));

const ScheduleAvailableList = React.memo(function(props) {
  
  const classes = useStyles();
  const {rawIntervewList, userInfo, filterTeam, filterStatus} = props;
  if(!rawIntervewList || !rawIntervewList.length) return null;
  
  let filteredList = filterTeam!=='' ? rawIntervewList.filter(item => {
    
    if(item.team === filterTeam){
      return item
    }
  }) : rawIntervewList ;
  if(filterStatus !== '') {
    filteredList = filteredList.filter(item => {
      if(filterStatus ==='410'){ 
        if(item.status === '411' || item.status === '412') {
          return item
        }
      }
      else if(item.status === filterStatus){
        return item;
      }
    })
  }
  
  return (
    <div className="interview-available">
      <Paper className={classes.root}>
        <div className={classes.pagerHeading}>
          <h3 className={classes.h3}>List of interviews this month</h3>
        </div>
        {filteredList.map(item => <ScheduleAvailableItem 
                                      classes={classes.wrapper} 
                                      key={item._id} 
                                      actionConfirmCV={props.actionConfirmCV} 
                                      userInfo={userInfo} 
                                      actionSelectInterview={props.actionSelectInterview}
                                      {...item} 
                                    />)}
      </Paper>
    </div>
  );
})

export default ScheduleAvailableList;
