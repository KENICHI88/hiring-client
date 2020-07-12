import React, {useState} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import { withStyles, makeStyles } from '@material-ui/core/styles';
//////
import {withFormik, Form, Field} from 'formik';
import * as Yup from "yup";
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
//////

const useStyle = (theme => ({
  pagerHeading: {
    padding: '5px 5px',
    backgroundColor: '#424242',
    color: '#fff',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  row: {
    width: '100%'
  },
  textField: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
    width: '100%',
  },
  formControlRow: {
    flexDirection: 'row',
  },
  w100: {
    width: '100%'
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const InterviewResultDetail = ((props) => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    setFieldValue,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  console.log(props);
  return (<Form
    className={classes.container} noValidate autoComplete="off" onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
  >
      <TextField
          id="status"
          select
          label="Leader's confirmation"
          value={values.status}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your result"
          variant="outlined"
          className={classes.formControl}
        >
          <option key="interview_status_empty" value="" />
          <option key="interview_status_411" value="411">Accept</option>
          <option key="interview_status_412" value="412">Ignore</option>
        </TextField>
      
    
    <div className={classes.formControl}>
      <TextField
        className={classes.w100}
        name="comment"
        id="comment"
        label="Leader's comment"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        value={values.comment}
        onChange={handleChange}
        onBlur={handleBlur}
        margin="normal"
        multiline
        rows="4"
        error={touched.comment && Boolean(errors.comment)}
        helperText={(errors.comment && touched.comment) && errors.comment} 
      ></TextField>
      
    </div>
    
    <div className={classes.formControl}>
      <Button variant="contained" color="primary" 
          className={classes.button}
          type="submit"
        >
          Submit
        </Button>
      <Button variant="contained" color="default" type="button"
        className={classes.button}
        onClick={()=>props.updateStatusLeaderConfirmModal(false)}>
          Close
        </Button>
    </div>
  </Form>)
  
});

const ScheduleLeaderConfirmInterviewModal = (props) => {
  const handleClose = () => {
    props.updateStatusLeaderConfirmModal(false);
  };
  
  return (
    <Dialog 
      open={props.isOpen}
      onClose={handleClose} 
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
    >
      <DialogTitle className={''} id="responsive-dialog-title">{"Confirm the candidate information"}</DialogTitle>
      <DialogContent>
        <InterviewResultForm {...props} />
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose}>
          Close popup
        </Button> */}
        {/* <Button autoFocus onClick={()=> props.updateLeaderConfirmModal(false)} color="primary">
          Disagree
        </Button>
        <Button onClick={()=> props.updateLeaderConfirmModal(true)} color="secondary" autoFocus>
          Agree
        </Button> */}
      </DialogActions>
    </Dialog>
  )
}

const InterviewResulFormWrapper = withFormik({
  mapPropsToValues: (props) => {
    return {
      'status' : '',
      'comment' : '',
    }
  },
  
  validationSchema: Yup.object().shape({
    status: Yup.string().required("Required"),
    comment: Yup.string(),
  }),

  handleSubmit: (values, props) => {
    setTimeout(() => {
      // props.props.updateStatusLeaderConfirmModal(false);
      props.props.updateLeaderConfirmModal(values);
    }, 100);
  }
})(InterviewResultDetail);

const InterviewResultForm = withStyles(useStyle)(InterviewResulFormWrapper);

export default (ScheduleLeaderConfirmInterviewModal);
// export default 
