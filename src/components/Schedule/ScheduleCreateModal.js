import React, {useState} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import clsx from  'clsx';

import { withStyles } from '@material-ui/core/styles';
import {withFormik, Form, Field} from 'formik';
import * as Yup from "yup";
//////
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import subHours from 'date-fns/subHours';
import differenceInMinutes from 'date-fns/differenceInMinutes'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//////Form
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import EventBusyIcon from '@material-ui/icons/EventBusy';
//////
import {filterCandidateStatusByCondition, buildFormatDate, parseDateTime} from '../../utils/utils';

const useStyle = (theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
  },
  textFieldCalendar: {
    fontSize: 16,
    borderRadius: 4,
    border: 1,
    borderStyle: 'solid',
    borderColor: '#aeaeae',
    lineHeight: '22px',
    paddingTop: 14,
    paddingRight: 10,
    paddingBottom: 13,
    paddingLeft: 10,
    marginRight: theme.spacing(2),
    width: '200px',
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
  formControlRow: {
    flexDirection: 'row',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
  busyDate: {
    backgroundColor: 'red',
  },
  normalDate: {
    backgroundColor: 'transparent'
  }
}));

const ScheduleDetail = (props) => {
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
    listLeader,
    listCandidate,
    listTeam,
    busyDateList,
  } = props;
   
  const specificListCandidate = filterCandidateStatusByCondition(listCandidate, 'LEADER_REVIEW');
  
  let avaiTeam = listTeam,
      avaiLeader = listLeader,
      chosenLeader = null;
  if(values.candidateId !=='') {
    const candidateInfor = listCandidate.filter(item => item._id === values.candidateId)[0];
    avaiTeam = listTeam.filter(item => item.val === candidateInfor.team);
  }
  if(values.team !==''){
    avaiLeader = listLeader.filter(item=> item.team === values.team);
  }
  if(values.leaderId!==''){
    chosenLeader = listLeader.filter(item => item._id === values.leaderId)[0];
  }
  
  let busyDateByLeader = null;
  if(chosenLeader && busyDateList){
    busyDateByLeader = busyDateList.filter(item=>{
      if(item.userId && item.userId._id === chosenLeader._id){
        return true;
      }
    });
  }
  
  
  let busyMatchWithLeader = null;
  let isConflictBusyDate = false;
  if(values.dateTimeInterview !==''){
    const nextTime = subHours(values.dateTimeInterview, 1);
    if(busyDateByLeader) {
      busyMatchWithLeader = busyDateByLeader.map(item => {
        const curD = new Date(item.dateBusy),
              t1 = differenceInMinutes(nextTime, curD);
        if(0 > t1 && t1 > -90 ){
          isConflictBusyDate = true;
          return true;
        }
        return false;
      });
    }
  }
  
  return (<Form
    className={classes.container} noValidate autoComplete="off" onSubmit={(e) => {
      e.preventDefault();
      if(isConflictBusyDate) {
        alert('Date time is invalid. Please check the date again!');
        return false;
      }
      handleSubmit();
    }}
  >
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel shrink htmlFor="role-label-placeholder">
        Candidate
      </InputLabel>
      
      <Field 
        name="candidateId"
        id="candidateId"
        label="Role"
        className={classes.selectEmpty}
        helperText={(errors.candidateId && touched.candidateId) && errors.candidateId}
        error={touched.candidateId && Boolean(errors.candidateId)}
        render={(field = props.field,
            setFieldValue = props.setFieldValue) => (
          <Select
            native
            value={values.candidateId}
            onChange={handleChange}
            onBlur={handleBlur}
            
            inputProps={{
              name: 'candidateId',
              id: 'candidateId-helper',
            }}
          >
            <option value="" />
            {specificListCandidate ? specificListCandidate.map(item => (<option  key={item._id} value={item._id}>{item.username}</option>)) : null}
          </Select>
        )}
      />
      
    </FormControl>
    
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel shrink htmlFor="role-label-placeholder">
        Team
      </InputLabel>
      
      <Field 
        name="team"
        id="team"
        label="Role"
        className={classes.selectEmpty}
        helperText={(errors.team && touched.team) && errors.team}
        error={touched.team && Boolean(errors.team)}
        render={(field = props.field,
            setFieldValue = props.setFieldValue) => (
          <Select
            native
            value={values.team}
            onChange={(e) => {
              handleChange(e);
            }
            }
            onBlur={handleBlur}
            inputProps={{
              name: 'team',
              id: 'team-helper',
            }}
          >
            <option value="" />
            {avaiTeam ? avaiTeam.map(item => (<option  key={item.val} value={item.val}>{item.text}</option>)) : null}
          </Select>
        )}
      />
      
    </FormControl>
    
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel shrink htmlFor="role-label-placeholder">
        Leader
      </InputLabel>
      
      <Field 
        name="leaderId"
        id="leaderId"
        label="Role"
        className={classes.selectEmpty}
        helperText={touched.leaderId ? errors.leaderId : ""}
        error={touched.leaderId && Boolean(errors.leaderId)}
        
        render={(field = props.field,
            setFieldValue = props.setFieldValue) => (
          <Select
            native
            value={values.leaderId}
            onChange={(e) => {
              handleChange(e);
            }}
            onBlur={handleBlur}
            inputProps={{
              name: 'leaderId',
              id: 'leaderId-helper',
            }}
          >
            <option value="" />
            {avaiLeader ? avaiLeader.map(item => (<option  key={item._id} value={item._id}>{item.username}</option>)) : null}
          </Select>
        )}
      />
      
    </FormControl>
    
    <FormControl variant="outlined" className={clsx(classes.formControl, classes.formControlRow)}>
      <DatePicker
        selected={values.dateTimeInterview}
        onChange={date => {
          setFieldValue('dateTimeInterview', date)}
        }
        showTimeSelect
        dateFormat="MMMM d, yyyy HH:mm:ss"
        timeFormat="HH:mm"
        name="dateTimeInterview"
        placeholderText="Choose a date"
        minDate={new Date()}
        minTime={setHours(setMinutes(new Date(), 0), 9)}
        maxTime={setHours(setMinutes(new Date(), 30), 18)}
        
        popperPlacement="right-end"
        popperModifiers={{
          offset: {
            enabled: true,
            offset: "5px, 10px"
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: "viewport"
          }
        }}
        inline
        title={setHours(setMinutes(new Date(), 0), 17)}
        excludeTimes={[
          setHours(setMinutes(new Date(), 0), 17),
        ]}
        className={classes.textFieldCalendar}
      />
      
      {(chosenLeader && busyDateByLeader) ? (
        <List dense={true}>
          <ListItem>
            <ListItemText
              primary="List busy date time of leader"
            />
          </ListItem>
        {busyDateByLeader && busyDateByLeader.map((item, ind) => {
          const dt = parseDateTime(item.dateBusy);
          const formatDT = buildFormatDate(dt);
          return (<ListItem className={(busyMatchWithLeader && busyMatchWithLeader[ind]) ? classes.busyDate : classes.normalDate } key={item._id}>
            <ListItemIcon>
              <EventBusyIcon />
            </ListItemIcon>
              <ListItemText
                primary={formatDT}
              />
            </ListItem>)
          }
        )}
      </List>
      ) : null}
    </FormControl>
    
    <Button variant="contained" color="primary" 
        className={classes.button}
        type="submit"
        disable="disable"
      >
        Submit
      </Button>
  </Form>)
}

const ScheduleCreateModal = (props) => {
  
  const handleClose = () => {
    props.setStatusScheduleModal(false);
  };
  
  return (
    <Dialog 
      open={props.isOpen} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title"
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Create interview</DialogTitle>
      <DialogContent>
        <InterviewForm  {...props} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}


const ScheduleForm = withFormik({
  mapPropsToValues: (props) => {
    return {
      'candidateId' : '',
      'team' : '',
      'leaderId' : '',
      'dateTimeInterview' : '',
      'timeInterview' : '',
      'comment' : '',
      'status' : '400',
    }
  },
  
  validationSchema: Yup.object().shape({
    candidateId: Yup.string().required("Required"),
    leaderId: Yup.string().required("Required"),
    dateTimeInterview: Yup.string().required("Required"),
    timeInterview: Yup.string(),
    comment: Yup.string(),
    status: Yup.string().required("Required")
  }),

  handleSubmit: (values, props) => {
    setTimeout(() => {
      props.props.actionCreateInterview(values);
    }, 100);
  }
})(ScheduleDetail);

const InterviewForm = withStyles(useStyle)(ScheduleForm);

export default ScheduleCreateModal;
