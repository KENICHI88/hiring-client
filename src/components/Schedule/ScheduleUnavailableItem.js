import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
/////////////////////
import clsx from 'clsx';
/////////////////////
import {getArrayFromObjectList, parseDateTime, buildFormatDate} from '../../utils/utils';
import {TEAM_LIST, POSITION_LIST, TEAM_COLOR} from '../../constant/variables';
/////////////////////
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
/////////////////////

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 1),
  },
  admin_team: {
    backgroundColor: TEAM_COLOR.admin_team,
    color: '#fff',
  },
  fe_team: {
    backgroundColor: TEAM_COLOR.fe_team,
    color: '#fff',
  },
  php_team: {
    backgroundColor: TEAM_COLOR.php_team,
    color: '#fff',
  },
  dotnet_team: {
    backgroundColor: TEAM_COLOR.dotnet_team,
    color: '#fff',
  },
  java_team: {
    backgroundColor: TEAM_COLOR.java_team,
    color: '#fff',
  },
  qa_team: {
    backgroundColor: TEAM_COLOR.qa_team,
    color: '#fff',
  },
  it_team: {
    backgroundColor: TEAM_COLOR.it_team,
    color: '#fff',
  },
  hr_team: {
    backgroundColor: TEAM_COLOR.hr_team,
    color: '#fff',
  },
  dotSpan: {
    display: 'inline-block',
    width: '14px',
    height: '14px',
    borderRadius: '14px',
    marginTop: '10px',
    marginRight: '10px',
    alignSelf: 'flex-start',
    boxShadow: '0 0 2px #000',
  }
}));

function ScheduleUnavailableItem(props) {
  const classes = useStyles();
  
  const {team, dateBusy, userId : userInfo} = props;
  
  const dateTime = parseDateTime(dateBusy);
  const fullDayTime = buildFormatDate(dateTime);
  console.log(team);
  const arrayTeam = getArrayFromObjectList(TEAM_LIST);
  const arrayPosition = getArrayFromObjectList(POSITION_LIST);
  return (
    <>
    <ListItem className={classes.root} button>
      <span className={clsx(classes.dotSpan, classes[userInfo.team])}></span>  
      <ListItemText primary={`${userInfo.team.replace(/_team/ig,' ').toUpperCase()} : ${userInfo.username}`} secondary={`Date time: ` +fullDayTime} />
      </ListItem>
    </>
  )
}

export default React.memo(ScheduleUnavailableItem);
