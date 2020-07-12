import React, {useState} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles, makeStyles } from '@material-ui/core/styles';
//////

import Button from '@material-ui/core/Button';
//////
const useStyle = makeStyles(theme => ({
  pagerHeading: {
    padding: theme.spacing(1,2),
    backgroundColor: '#424242',
    color: '#fff',
  },
}));

const CandidateLeaderConfirmCVModal = (props) => {
  const classes = useStyle();
  
  const handleClose = (value) => {
    props.updateStatusLeaderConfirm(value);
  };
  return (
    <Dialog 
      open={props.isOpen} 
      onClose={()=> props.setConfirmCandidate(false)} 
      aria-labelledby="form-dialog-title"
      maxWidth="md"
    >
      <DialogTitle className={classes.pagerHeading} id="responsive-dialog-title">{"Confirm the candidate information"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          I checked the information of candidate and make sure this candidate is ok for the interview
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={()=> props.setConfirmCandidate(false)}>
          Close popup
        </Button>
        <Button autoFocus onClick={()=> handleClose(false)} color="secondary">
          Ingore CV
        </Button>
        <Button onClick={()=> handleClose(true)} color="primary" autoFocus>
          Accept CV
        </Button>
      </DialogActions>
    </Dialog>
  )
}



export default React.memo(CandidateLeaderConfirmCVModal);
// export default 
