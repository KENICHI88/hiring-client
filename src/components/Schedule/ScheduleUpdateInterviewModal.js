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
import getHours from "date-fns/getHours";
import setMinutes from "date-fns/setMinutes";
import addHours from 'date-fns/addHours';
import parseISO from 'date-fns/parseISO';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//////Form

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
//////
import {filterCandidateStatusByCondition} from '../../utils/utils';

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
}));

const InterviewDetail = (props) => {
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
  } = props;
   
  const specificListCandidate = filterCandidateStatusByCondition(listCandidate, 'HR');
  
  const [activeBusyDates, setActiveBusyDates] = useState([]);
  const [selectedLeader, selectLeader] = useState({});
  
  return (<Form
    className={classes.container} noValidate autoComplete="off" onSubmit={(e) => {
      e.preventDefault();
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
            {listTeam ? listTeam.map(item => (<option  key={item.val} value={item.val}>{item.text}</option>)) : null}
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
              console.log(e.target.value);
              let busyDate = listLeader.filter(item => item._id === e.target.value);
              if(busyDate.length) {
                busyDate = busyDate[0] && busyDate[0].busyDate;
                if(busyDate.length) {
                  busyDate = busyDate.map(item => {
                    console.log(item);
                    return getHours(parseISO(item.dateBusy));
                  })
                }
              }
              console.log(busyDate);
              handleChange(e);
            }}
            onBlur={handleBlur}
            
            inputProps={{
              name: 'leaderId',
              id: 'leaderId-helper',
            }}
          >
            <option value="" />
            {listLeader ? listLeader.map(item => (<option  key={item._id} value={item._id}>{item.username}</option>)) : null}
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
      
      <DatePicker
        selected={values.timeInterview}
        onChange={date => {
          console.log(date);
          setFieldValue('timeInterview', date)}
        }
        dateFormat="MMMM d, yyyy HH:mm:ss"
        timeFormat="HH:mm"
        name="timeInterview"
        placeholderText="Choose a time"
        showTimeSelect
        showTimeSelectOnly
        minDate={new Date()}
        
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
    </FormControl>
    
    <Button variant="contained" color="primary" 
        className={classes.button}
        type="submit"
      >
        Submit
      </Button>
  </Form>)
}

const ScheduleUpdateInterviewModal = (props) => {
  
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
      'interviewId' : '',
      'candidateId' : '',
      'status' : '',
      'comment' : '',
    }
  },
  
  validationSchema: Yup.object().shape({
    interviewId: Yup.string().required("Required"),
    candidateId: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    comment: Yup.string(),
  }),

  handleSubmit: (values, props) => {
    setTimeout(() => {
      props.props.actionCreateInterview(values);
    }, 100);
  }
})(InterviewDetail);

const InterviewForm = withStyles(useStyle)(ScheduleForm);

export default ScheduleUpdateInterviewModal;
// export default 
