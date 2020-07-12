import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
import * as Yup from 'yup';

import {TEAM_LIST, POSITION_LIST} from '../../constant/variables';

import Grid from '@material-ui/core/Grid';

import {withFormik, Form, ErrorMessage} from 'formik';

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
    margin: theme.spacing(0),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CandidateDetail = (props) => {
  const {
    classes,
    values,
    touched,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    isEdit,
    userInfo
  } = props;
  
  return (<Form
    className={classes.container} noValidate autoComplete="off" 
      encryptype="multipart/form-data"
      onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
  >
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} >
        <FormControl className={classes.formControl}>
          <TextField
            value={values.username}
            label="Candidate name"
            id="username"
            name="username"
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: isEdit? true: false,
            }}
            helperText={(errors.username && touched.username) && errors.username}
            error={touched.username && Boolean(errors.username)}
          ></TextField>
        </FormControl>
      
        <FormControl className={classes.formControl}>
          <TextField
            label="Age"
            className={classes.textField}
            id="age"
            name="age"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            error={touched.age && Boolean(errors.age)}
            helperText={(errors.age && touched.age) && errors.age}
          ></TextField>
        </FormControl>
      
        <FormControl className={classes.formControl}>
          <TextField
            label="Email"
            InputLabelProps={{
              shrink: true,
            }}
            name="email"
            id="email"
            value={values.email}
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            error={touched.email && Boolean(errors.email)}
            helperText={(errors.email && touched.email) && errors.email}
            InputProps={{
              readOnly: isEdit? true: false,
            }}
          ></TextField>
        </FormControl>
        
        <FormControl className={classes.formControl}>
          <TextField
            name="phone"
            label="Phone"
            InputLabelProps={{
              shrink: true,
            }}
            id="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            error={touched.phone && Boolean(errors.phone)}
            helperText={(errors.phone && touched.phone) && errors.phone}
          ></TextField>
        </FormControl>
        
        <FormControl className={classes.formControl}>
          <TextField
            label="Address"
            InputLabelProps={{
              shrink: true,
            }}
            name="address"
            id="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            error={touched.address && Boolean(errors.address)}
            helperText={(errors.address && touched.address) && errors.address}
          ></TextField>
        </FormControl>
        
        <FormControl className={classes.formControl}>
          <TextField
            select
            id="team"
            label="Team"
            InputLabelProps={{
              shrink: true,
            }}
            value={values.team}
            onChange={handleChange("team")}
            helperText={touched.team ? errors.team : ""}
            error={touched.team && Boolean(errors.team)}
            margin="normal"
            fullWidth
          >
            {TEAM_LIST.map(option => (
              <MenuItem key={option.val} value={option.val}>
                {option.text}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        
        <FormControl className={classes.formControl}>
          
          <TextField
            select
            label="Position"
            InputLabelProps={{
              shrink: true,
            }}
            id="position"
            label="Position"
            value={values.position}
            onChange={handleChange("position")}
            helperText={touched.position ? errors.position : ""}
            error={touched.position && Boolean(errors.position)}
            margin="normal"
            fullWidth
          >
            {POSITION_LIST.map(option => (
              <MenuItem key={option.val} value={option.val}>
                {option.text}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        
        <FormControl className={classes.formControl}>
          <TextField
            name="reference"
            id="reference"
            label="Reference"
            InputLabelProps={{
              shrink: true,
            }}
            value={values.reference}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            error={touched.reference && Boolean(errors.reference)}
            helperText={(errors.reference && touched.reference) && errors.reference} 
          ></TextField>
        </FormControl>
        
        <FormControl className={classes.formControl}>
          <label forhtml="cv">Upload CV file</label>
          <input 
            type="file"
            name="cv"
            id="cv"
            onChange={(event) => {
              const fileUpload = event.currentTarget.files[0];
              if(fileUpload) {
                setFieldValue("cv_file", fileUpload);
                setFieldValue("cv", fileUpload.name);
              }
            }}
          />
          <ErrorMessage name="cv" />
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
    {(userInfo && (userInfo.team == 'hr_team' || userInfo.team == 'admin_team' )) ? (
      <Button variant="contained" color="primary" 
      className={classes.button}
      type="submit"
      // disabled={isSubmitting}
    >
      Submit
    </Button>
    ) : null}
    
    <Button varient="normal" className={classes.button}
      onClick={()=> props.actionSetStatusEditPanel(false)}
    >Close</Button>
  </Form>)
}

const CandidateForm = withFormik({
  mapPropsToValues : (props) => {
    
  var username = '',
    age = '',
    phone = '',
    email = '',
    address = '',
    status = '001',
    team = '',
    position = '',
    reference = '',
    cv = '',
    _id = '';
  if(props.selectedCandidate) {
    var {username , age, phone, email, address, status, team, position, reference, cv, _id} = props.selectedCandidate;
  }

   return {
    username: username,
    age: age,
    phone: phone,
    email: email,
    address: address,
    status: status,
    team: team,
    position: position,
    reference: reference,
    cv: cv,
    _id: _id,
  }},
  
  handleSubmit: (values, props) => {
    setTimeout(() => {
      props.setSubmitting(false);
      props.props.saveCandidate(values, props.resetForm);
    }, 300);
  },
  
  enableReinitialize : true,
  
  validationSchema: Yup.object().shape({
    _id: Yup.string(''),
    username: Yup.string().required('This field is required'),
    age: Yup.number().positive().required('This field is required'),
    email: Yup.string().email('The email is invalid'),
    phone: Yup.string().length(10, 'The phone length is 10'),
    address: Yup.string(),
    status: Yup.number().default(-1),
    team: Yup.string().required('This field is required'),
    position: Yup.string().required('This field is required'),
    reference: Yup.string().required('This field is required'),
    cv: Yup.string().when('_id', {
      is: false,
      then: Yup.string().required('This field is required')
    }),
    cv_file: Yup.mixed().when('_id', {
      is: false,
      then: Yup.string().required('This field is required')
    }),
  })
})(CandidateDetail);

export default  withStyles(useStyle)(CandidateForm);
