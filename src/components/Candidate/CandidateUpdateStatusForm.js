import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
import * as Yup from 'yup';
import {isEmpty} from 'lodash';

import {CANDIDATE_STATUS, STATUS_PAIR, STATUS_PAIR_MESSAGE} from '../../constant/variables';
import {getArrayFromObjectList} from '../../utils/utils';

import Grid from '@material-ui/core/Grid';

import {withFormik, Form} from 'formik';

const useStyle = (theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CandidateStatus = (props) => {
  const {
    classes,
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    candidateInfo
  } = props;
  
  let availableStatus = (CANDIDATE_STATUS),
      fullStatusList = getArrayFromObjectList(CANDIDATE_STATUS),
      messagePair = (STATUS_PAIR_MESSAGE);
  
  const childrenStatus = STATUS_PAIR[candidateInfo.status];
  
  if(childrenStatus.length) {
    availableStatus = availableStatus.filter(item => {
      if(childrenStatus.indexOf(item.key) > -1) {
        return item
      }
    })
  }
  
  console.log(STATUS_PAIR[candidateInfo.status], availableStatus);
  
  return (<Form
    className={classes.container} noValidate autoComplete="off" 
      onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
  >
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} >
      <Typography variant="h6" gutterBottom>
        Current status: {fullStatusList[candidateInfo.status].text}
      </Typography>
      <Typography variant="body1" gutterBottom>=> {messagePair[candidateInfo.status]}</Typography>
        
        <FormControl className={classes.formControl}>
          
          <TextField
            select
            id="status"
            label="Status"
            value={values.status}
            onChange={handleChange("status")}
            helperText={touched.status ? errors.status : ""}
            error={touched.status && Boolean(errors.status)}
            margin="normal"
            fullWidth
          >
            {availableStatus && availableStatus.map(option => (
              <MenuItem key={option.val} value={option.key}>
                {option.text}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        
    </Grid>
    
    
    
    <Button variant="contained" color="primary" 
        className={classes.button}
        type="submit"
      >
        Submit
      </Button>
      </Grid>
  </Form>)
}

const CandidateStatusForm = withFormik({
  mapPropsToValues : () => ({
    status: '',
  }),
  
  handleSubmit: (values, props) => {
    setTimeout(() => {
      props.setSubmitting(false);
      props.props.updateStatusCandidate(values, props.resetForm);
    }, 300);
  },
  
  validationSchema: Yup.object().shape({
    status: Yup.string().required('This field is required'),
  })
})(CandidateStatus);

const StatusForm = withStyles(useStyle)(CandidateStatusForm);


const CandidateStatusFormModal = (props) => {
  
  if(isEmpty(props.candidateInfo)) {
    return null;
  }
  
  const handleClose = () => {
    props.setCandidateStatusForm(false);
  };
  
  return (
    <Dialog 
      open={props.isOpen} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogContent>
        <StatusForm  {...props} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CandidateStatusFormModal;
