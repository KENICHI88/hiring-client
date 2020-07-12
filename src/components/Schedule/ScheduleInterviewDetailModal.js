import React, {useState} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import {isEmpty} from 'lodash';
//////
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableContainer } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
//////
import {actionOpenCV, getArrayFromObjectList, parseDateTime, buildFormatDate} from '../../utils/utils';
import {TEAM_LIST, POSITION_LIST, TEAM_COLOR, CANDIDATE_STATUS} from '../../constant/variables';
//////

import Button from '@material-ui/core/Button';
//////

const useStyle = makeStyles(theme => ({
  pagerHeading: {
    padding: theme.spacing(1,2),
    backgroundColor: '#424242',
    color: '#fff',
  },
  marginTop: {
    marginTop: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
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
    fontSize: '14px',
  },
  labelSpan : {
    fontWeight: '600'
  },
}));

const ScheduleInterviewDetailModal = React.memo((props) => {
  if(isEmpty(props.infoInterview)) return null;
  
  const classes = useStyle();
  const {candidateInfo, leaderInfo} = props.infoInterview;
  const {userInfo} = props;
  const candidateInfoDetail = candidateInfo[0];
  const leaderInfoDetail = leaderInfo[0];
  
  if(isEmpty(candidateInfoDetail) || isEmpty(leaderInfoDetail)) return null;
  
  const handleClose = () => {
    props.setStatusModalInterviewDetail(false);
  };
  
  const arrayTeam = getArrayFromObjectList(TEAM_LIST);
  const arrayPosition = getArrayFromObjectList(POSITION_LIST);
  const arrayStatus = getArrayFromObjectList(CANDIDATE_STATUS);
  
  const actionCallModalConfirm = () => {
    let formData = {};
    formData.interviewId = props.infoInterview._id;
    formData.candidateId = candidateInfoDetail._id;
    formData.leaderId = leaderInfoDetail._id;
    props.actionCallModalConfirm(formData);
  }
  
  const openCVFile = () => {
    actionOpenCV(candidateInfoDetail.cv_url);
  }
  
  return (
    <Dialog 
      open={props.isOpen} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle className={classes.pagerHeading} id="form-dialog-title">Interview detail information</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">Date time: </TableCell>
                <TableCell align="left">{buildFormatDate(parseDateTime(props.infoInterview.dateTimeInterview))}</TableCell>
              </TableRow> 
            {candidateInfoDetail.username ? 
              <TableRow>
                <TableCell component="th" scope="row">Fullname</TableCell>
                <TableCell align="left">{candidateInfoDetail.username}</TableCell>
              </TableRow> : null}
            
            <TableRow>
              <TableCell component="th" scope="row">CV file</TableCell>
              <TableCell align="left"><Button onClick={openCVFile} >Click here</Button> </TableCell>
            </TableRow>
            {candidateInfoDetail.age ? 
              <TableRow>
                <TableCell component="th" scope="row">Age</TableCell>
                <TableCell align="left">{candidateInfoDetail.age}</TableCell>
              </TableRow> : null}
              
              {candidateInfoDetail.position ? 
              <TableRow>
                <TableCell component="th" scope="row">Position</TableCell>
                <TableCell align="left">{arrayPosition[candidateInfoDetail.position].text}</TableCell>
              </TableRow> : null}
              
              {candidateInfoDetail.email ? 
               <TableRow>
                <TableCell component="th" scope="row">Email</TableCell>
                <TableCell align="left"> <a href="mailto:{candidateInfoDetail.email}">{candidateInfoDetail.email}</a></TableCell>
              </TableRow> : null }
              
              {candidateInfoDetail.phone ?
              <TableRow>
                <TableCell component="th" scope="row">Phone</TableCell>
                <TableCell align="left"> <a href="tel:{candidateInfoDetail.phone}">{candidateInfoDetail.phone}</a></TableCell>
              </TableRow> : null }
              
              {leaderInfoDetail.fullname ? 
              <TableRow>
                <TableCell component="th" scope="row">Leader</TableCell>
                <TableCell align="left"> {leaderInfoDetail.username}</TableCell>
              </TableRow> : null}
              
              {props.infoInterview.comment && props.infoInterview.comment!=='' ? 
              <TableRow>
                <TableCell component="th" scope="row">Comment</TableCell>
                <TableCell align="left"> {props.infoInterview.comment}</TableCell>
              </TableRow> : null}
              
            </TableBody>
          </Table>
        </TableContainer>
        
        
        
        
      </DialogContent>
      <DialogActions>
        
      {(userInfo.team === candidateInfoDetail.team) ? 
          (candidateInfoDetail.status==='400') ? (<Button variant="contained" size="small" color="primary" onClick={actionCallModalConfirm}>Confirm interview result</Button>) : null : null}
        
        <Button variant="contained" onClick={handleClose} size="small" color="primary">
          Close modal
        </Button>
      </DialogActions>
    </Dialog>
  )
})


export default ScheduleInterviewDetailModal;
// export default 
