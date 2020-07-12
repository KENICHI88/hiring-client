import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';

import * as Yup from 'yup';

import { withStyles } from '@material-ui/styles';
import {withFormik, Form} from 'formik';
import Grid from '@material-ui/core/Grid';
////////
////////

const useStyle = (theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: `0 auto`,
    maxWidth: '500px'
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

const LoginDetail = (props) => {
  const {
    classes,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;
  
  return (<Form
    className={classes.container} noValidate autoComplete="off" onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
  >
    <Grid container className={classes.root} spacing={2}>
      
      <Grid item xs={12} >
      <h1>Login</h1>
        <FormControl className={classes.formControl}>
          <TextField
            value={values.username}
            placeholder="Fullname"
            id="username"
            name="username"
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            helperText={(errors.username && touched.username) && errors.username}
            error={touched.username && Boolean(errors.username)}
          ></TextField>
        </FormControl>
      
        <FormControl className={classes.formControl}>
          <TextField
            value={values.password}
            placeholder="Password"
            id="password"
            name="password"
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              type: 'password'
            }}
            helperText={(errors.password && touched.password) && errors.password}
            error={touched.password && Boolean(errors.password)}
          ></TextField>
        </FormControl>
        
        <Button variant="contained" color="primary" 
            className={classes.button}
            type="submit"
          >
        Submit
      </Button>
    </Grid>
</Grid>



</Form>)
}

const LoginForm = withFormik({
  mapPropsToValues : () => ({
    username: '',
    password: '',
  }),

  handleSubmit: (values, props) => {
    setTimeout(() => {
      props.setSubmitting(false);
      props.props.actionLogin(values);
    }, 100);
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required'),
  })
})(LoginDetail);

export default  withStyles(useStyle)(LoginForm);
