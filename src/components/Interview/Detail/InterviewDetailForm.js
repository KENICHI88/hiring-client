import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import clsx from  'clsx';

import { withStyles } from '@material-ui/core/styles';

import * as Yup from 'yup';
import {withFormik, Form, Field, ErrorMessage} from 'formik';
import {isEmpty} from 'lodash';

import Grid from '@material-ui/core/Grid';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import getDay from 'date-fns/getDay';

import {Link} from 'react-router-dom';

const useStyles = (theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: '100%',
  },
  formControlSelect: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    minWidth: '100%',
  },
  formControlRow: {
    flexDirection: 'row',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  linkButton: {
    textDecoration: 'none'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
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
    width: '300px',
  },
}));

const InterviewDetail = (props) => {
  const {
    classes,
    values,
    touched,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    listCandidate,
    listMember,
  } = props;
  
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  
  useEffect(()=>{
    setLabelWidth(inputLabel.current.offsetWidth);
  })
  
  const isWeekday = date => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  
  return (<Form
    className={classes.container} noValidate autoComplete="off"
      onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
  >
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} >
        <FormControl error={touched.candidateId && Boolean(errors.candidateId)} variant="outlined" className={classes.formControlSelect}>
          <InputLabel ref={inputLabel} htmlFor="outlined-candidateId">
            Candidate *
          </InputLabel>
          <Select
            native
            value={values.candidateId}
            onChange={handleChange('candidateId')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'candidateId',
              id: 'outlined-candidateId',
            }}
          >
            <option value="" />
            {listCandidate && listCandidate.length ? listCandidate.map(item=> <option key={item._id} value={item._id}>{item.username}</option>) : null}
          </Select>
          {touched.candidateId && Boolean(errors.candidateId) && (<FormHelperText>{errors.candidateId}</FormHelperText>)}
        </FormControl>
        
        <FormControl error={touched.interviewerId && Boolean(errors.interviewerId)} variant="outlined" className={classes.formControlSelect}>
          <InputLabel ref={inputLabel} htmlFor="outlined-interviewerId">
            Interviewer *
          </InputLabel>
          <Select
            native
            value={values.interviewerId}
            onChange={handleChange('interviewerId')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'interviewerId',
              id: 'outlined-interviewerId',
            }}
          >
            <option value="" />
            {listMember && listMember.length ? listMember.map(item=> <option key={item._id} value={item._id}>{item.username}</option>) : null}
          </Select>
          {touched.interviewerId && Boolean(errors.interviewerId) && (<FormHelperText>{errors.interviewerId}</FormHelperText>)}
        </FormControl>
        
        <FormControl error={touched.status && Boolean(errors.status)} variant="outlined" className={classes.formControlSelect}>
          <InputLabel ref={inputLabel} htmlFor="outlined-participaters">
            Status *
          </InputLabel>
          <Select
            native
            value={values.status}
            onChange={handleChange('status')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'status',
              id: 'outlined-status',
            }}
          >
            <option value="" ></option>
            <option value={0} >Pending</option>
            <option value={1} >Accept interview</option>
            <option value={2} >Cancel interview</option>
          </Select>
          {touched.status && Boolean(errors.status) && (<FormHelperText>{errors.status}</FormHelperText>)}
        </FormControl>
        
        <FormControl error={touched.result && Boolean(errors.result)} variant="outlined" className={classes.formControlSelect}>
          <InputLabel ref={inputLabel} htmlFor="outlined-participaters">
            Result *
          </InputLabel>
          <Select
            native
            value={values.result}
            onChange={handleChange('result')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'result',
              id: 'outlined-result',
            }}
          >
            <option value="" ></option>
            <option value={0} >Not yet</option>
            <option value={1} >Pass</option>
            <option value={2} >Fail</option>
          </Select>
          {touched.result && Boolean(errors.result) && (<FormHelperText>{errors.result}</FormHelperText>)}
        </FormControl>
        
        
        <FormControl variant="outlined" className={clsx(classes.formControl, classes.formControlRow)}>
          <DatePicker
            selected={values.dateTime}
            onChange={date => {
              setFieldValue('dateTime', date)}
            }
            showTimeSelect
            dateFormat="MMMM d, yyyy HH:mm:ss"
            timeFormat="HH:mm"
            name="dateTime"
            placeholderText="Choose a date"
            minDate={new Date()}
            minTime={setHours(setMinutes(new Date(), 0), 9)}
            maxTime={setHours(setMinutes(new Date(), 30), 18)}
            filterDate={isWeekday}
            
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
            title={setHours(setMinutes(new Date(), 0), 17)}
            excludeTimes={[
              setHours(setMinutes(new Date(), 0), 17),
            ]}
            className={classes.textFieldCalendar}
          />
          
        </FormControl>

        <TextField
          name="_id"
          type="hidden"
          id="_id"
          value={values._id}
          placeholder="ID"
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        ></TextField>
      </Grid>
    </Grid>
    
    <Grid className={classes.gridContainer} container spacing={1}>
      <Link to={'/interview'} className={classes.linkButton}>
        <Button variant="contained" color="primary" className={classes.button}>
          Back to list
        </Button>
      </Link>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<SaveIcon/>}
        onClick={()=> handleSubmit()}
      >
        Save
      </Button>
    </Grid>
    
  </Form>)
}

const InterviewDetailForm = withFormik({
  mapPropsToValues : (props) => {
    
  var _id = '',
      candidateId = '',
      interviewerId = '',
      // participaters = '',
      status = '0',
      result = '0',
      note = '',
      dateTime = '';
  // status:  //0: pending, 1: accept interview, 2: cancel interview
  // result: // 0: not yet, 1: pass, 2: fail
  if(!isEmpty(props.detail)){
    var {_id, candidateId, interviewerId, participaters, status, result, note, dateTime} = props.detail
    dateTime = new Date(dateTime)
  }
  
   return {
    _id,
    candidateId,
    interviewerId,
    // participaters,
    status,
    result,
    note,
    dateTime,
  }},
  
  handleSubmit: (values, props) => {
    setTimeout(() => {
      props.setSubmitting(false);
      props.props.actionPostDetail(values);
    }, 150);
  },
  
  enableReinitialize : true,
  
  validationSchema: Yup.object().shape({
    _id: Yup.string(''),
    candidateId: Yup.string().required('This field is required'),
    interviewerId: Yup.string().required('This field is required'),
    // participaters: Yup.string(),
    status: Yup.number().required('This field is required'),
    result: Yup.number().required('This field is required'),
    note: Yup.string(),
    dateTime: Yup.string().required('This field is required'),
  })
})(InterviewDetail);

const InterviewDetailFormComponent = (props) => {
  const Component =  withStyles(useStyles)(InterviewDetailForm);
  return <Component
            detail={props.detail}
            listCandidate={props.listCandidate}
            listMember={props.listMember}
            actionPostDetail={props.actionPostDetail}
          />;
}

InterviewDetailFormComponent.propTypes = {
  children: PropTypes.node,
  listCandidate : PropTypes.array.isRequired,
  listMember : PropTypes.array.isRequired,
}

export default InterviewDetailFormComponent
