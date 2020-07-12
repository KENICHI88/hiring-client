import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { red , green, grey} from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CardContent from '@material-ui/core/CardContent';
/////////////////////
import {getArrayFromObjectList, parseDateTime, buildFormatDate} from '../../utils/utils';
import {TEAM_LIST, POSITION_LIST, TEAM_COLOR, CANDIDATE_STATUS} from '../../constant/variables';
/////////////////////
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
/////////////////////

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '100%',
    marginBottom: '5px',
    padding: theme.spacing(0),
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  cardContent: {
    padding: '0 16px',
    paddingBottom: '12px!important',
  },
  nameText: {
    fontSize: '18px',
    fontWeight: '500',
  },
  statusIcon: {
    float: 'right'
  },
  borderRadius: {
    borderRadius: '2px',
    marginRight: '3px',
  },
  statusInterview: {
    backgroundColor: grey[500],
  },
  statusSuccess: {
    color: green[500],
  },
  statusIgnore: {
    color: red[500],
  },
  labelSpan : {
    fontWeight: '600'
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
  labelTeam: {
    borderRadius: '4px 10px',
    fontSize: '14px'
  },
}));

function ScheduleAvailableItem(props) {
  const classes = useStyles();
  
  const {dateTimeInterview, team, candidateInfo, leaderInfo, userInfo, status} = props;
  const candidateInfoDetail = candidateInfo[0];
  const leaderInfoDetail = leaderInfo[0];
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const handleCOpenCVFile = ()=>{
    console.log(candidateInfoDetail);
  }
  
  const actionConfirm = (status) => {
    let formData = {};
    formData.interviewId = props._id;
    formData.candidateId = props.candidateId;
    formData.leaderId = props.leaderId;
    props.actionConfirmCV(formData, status);
  }
  
  const actionConfirmCV=(interview)=>{
    const info = {candidateInfo}
    props.actionConfirmCV(info);
  }
  
  const actionSelectInterview = () => {
    const data = collectInfoInterview();
    props.actionSelectInterview(data);
  }
  
  const collectInfoInterview = () => {
    let data = {};
    const {_id, comment, status, candidateId, team, leaderId, dateTimeInterview, createdAt, updatedAt, candidateInfo, leaderInfo} = props;
    data = {_id, comment, status, candidateId, team, leaderId, dateTimeInterview, createdAt, updatedAt, candidateInfo, leaderInfo};
    return data;
  }
  
  const dateTime = parseDateTime(dateTimeInterview);
  const fullDayTime = buildFormatDate(dateTime);
  
  const arrayTeam = getArrayFromObjectList(TEAM_LIST);
  const arrayPosition = getArrayFromObjectList(POSITION_LIST);
  const arrayStatus = getArrayFromObjectList(CANDIDATE_STATUS);
  
  return (
    <>{(userInfo.team === candidateInfoDetail.team) || (userInfo.team === 'admin_team' || userInfo.team === 'hr_team') ? (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          action={
            <>
              <IconButton
                className={clsx(classes.expand)}
                onClick={actionSelectInterview}
                aria-expanded={expanded}
                aria-label="Read CV file"
                title="Read CV file"
              >
                <AssignmentIcon />
              </IconButton>
            </>
          }
          title={<><span className={classes.nameText}>{candidateInfoDetail.username}</span> <Chip size="small" className={clsx(classes.labelTeam, classes[team])} label={arrayTeam[team].text} /></>}
        />
        <CardContent className={classes.cardContent}>
          <Chip size="small" className={clsx(classes.borderRadius)} label={fullDayTime} /> 
          <Chip size="small" className={clsx(classes.statusInterview, classes.borderRadius)} label={arrayStatus[candidateInfoDetail.status].text} />
          {(status==='411') ? (<ThumbUpIcon className={clsx(classes.statusIcon, classes.statusSuccess)} />) : null}
          {(status==='412') ? (<ThumbDownIcon className={clsx(classes.statusIcon, classes.statusIgnore)} />) : null}
        </CardContent>
      </Card>
    ) : null}
      
    </>
  )
}

export default React.memo(ScheduleAvailableItem);
