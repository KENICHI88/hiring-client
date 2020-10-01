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
import getDay from 'date-fns/getDay';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//////Form

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
//////

const useStyle = (theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    minHeight: '350px',
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

const ScheduleBusyDetail = (props) => {
  const {
    classes,
    values,
    touched,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    listLeader,
    listCandidate,
    listTeam,
  } = props;
  
  const [startDate, setStartDate] = useState(new Date());
  const isWeekday = date => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  
  return (<Form
    className={classes.container} noValidate autoComplete="off" onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
  >
    <FormControl variant="outlined" className={clsx(classes.formControl, classes.formControlRow)}>
      <DatePicker
        selected={values.dateBusy}
        onChange={date => setFieldValue('dateBusy', date)}
        dateFormat="MMMM d, yyyy"
        name="dateBusy"
        placeholderText="Choose a date"
        showTimeSelect
        timeFormat="HH:mm"
        minTime={setHours(setMinutes(new Date(), 0), 9)}
        maxTime={setHours(setMinutes(new Date(), 30), 18)}
        minDate={(new Date())}
        filterDate={isWeekday}
        className={classes.textFieldCalendar}
      />
    </FormControl>
    
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel shrink htmlFor="role-label-placeholder">
        Leader
      </InputLabel>
    </FormControl>
    
    <Button variant="contained" color="primary" 
        className={classes.button}
        type="submit"
        // disabled={isSubmitting}
      >
        Submit
      </Button>
  </Form>)
}


const ScheduleBusyForm = withFormik({
  mapPropsToValues: (props) => {
    return {
      'dateBusy' : '',
    }
  },
  
  validationSchema: Yup.object().shape({
    dateBusy: Yup.string().required("Required"),
  }),

  handleSubmit: (values, props) => {
    setTimeout(() => {
      props.props.actionSaveScheduleBusy(values);
    }, 500);
  }
})(ScheduleBusyDetail);

const BusyForm = withStyles(useStyle)(ScheduleBusyForm);


const ScheduleBusyCreateModal = (props) => {
  const handleClose = () => {
    props.setStatusScheduleModal(false);
  };
  
  return (
    <Dialog 
      open={props.isOpen} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">Create busy date time</DialogTitle>
      <DialogContent>
        <BusyForm  {...props} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}


export default ScheduleBusyCreateModal;
// export default 
