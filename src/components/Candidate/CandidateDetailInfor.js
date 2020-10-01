import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import DescriptionIconRounded from '@material-ui/icons/DescriptionRounded';

import {actionOpenCV, getArrayFromObjectList} from '../../utils/utils';
import {TEAM_LIST, POSITION_LIST, CANDIDATE_STATUS} from '../../constant/variables';

import {isEmpty} from 'lodash';

const useStyles = makeStyles(theme => ({
  card: {
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CandidateDetailInfor = React.memo((props) => {
  const classes = useStyles();
  const {userInfo} = props;

  const {isSelecting, infor} = props;
  
  const arrayPosition = getArrayFromObjectList(POSITION_LIST);
  const arrayTeam = getArrayFromObjectList(TEAM_LIST);
  const arrayStatus = getArrayFromObjectList(CANDIDATE_STATUS);
  
  if(!props.isSelecting) return null;
  
  const renderLeaderButtons = (item) => {
    if(item.status === '200'){
      return (<CardActions disableSpacing>
        <Button variant="contained" onClick={()=>props.setConfirmCandidate(true)}>Confirm CV</Button>
      </CardActions>)
    }
  }
  
  const openCVFile = () => {
    actionOpenCV(infor.cv_url);
  }
  
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={infor.username}
        subheader={"Status: " + arrayStatus[infor.status].text}
      />
      <CardContent>
        {infor.email? (<Typography variant="body2" color="textSecondary" component="p"><b>Email</b>: <a href="mailto:{infor.email}">{infor.email}</a></Typography>): null}
        {infor.phone? (<Typography variant="body2" color="textSecondary" component="p"><b>Phone</b>: <a href="tel:{infor.phone}">{infor.phone}</a></Typography>): null}
        {infor.age? (<Typography variant="body2" color="textSecondary" component="p"><b>Age</b>: {infor.age}</Typography>): null}
        {infor.address? (<Typography variant="body2" color="textSecondary" component="p"><b>Address</b>: {infor.address}</Typography>): null}
        {infor.position? (<Typography variant="body2" color="textSecondary" component="p"><b>Position</b>: {arrayPosition[infor.position].text}</Typography>): null}
        {infor.team? (<Typography variant="body2" color="textSecondary" component="p"><b>Team</b>: {arrayTeam[infor.team].text}</Typography>): null}
        {infor.ref? (<Typography variant="body2" color="textSecondary" component="p"><b>Reference</b>: {infor.ref}</Typography>): null}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="CV file" onClick={openCVFile} >
          <DescriptionIconRounded />
        </IconButton>
        <Button onClick={() => props.actionSelectCandidate(null)}>Close</Button>
      </CardActions>
      {(userInfo && (userInfo.team == 'hr_team' || userInfo.team == 'admin_team' )) ? 
        (infor.status === '902' || infor.status === '901') ? null :
       (
        <CardActions disableSpacing>
          <Button variant="contained" onClick={()=>props.setCandidateStatusForm(true)}>Update status</Button>
        </CardActions>
      ) : renderLeaderButtons(infor) }
    </Card>
  );
});

export default CandidateDetailInfor;
