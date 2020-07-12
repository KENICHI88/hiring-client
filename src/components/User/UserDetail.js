import React, { useEffect, useState} from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";

import {TEAM_LIST} from '../../constant/variables';

import * as Yup from 'yup';

import {withFormik, Form, Field} from 'formik';

const useStyles = ((theme) => ({
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

const UserDetail = (props) => {
  
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;
  
  
  const [roleList, setRoleList] = useState([])
  
  useEffect(() => {
    setRoleList(props.roleList)
  }, [props.roleList])

  return (
    <Form className={classes.container} noValidate autoComplete="off" onSubmit={(e) => {
      e.preventDefault();
      props.handleSubmit(values, props);
    }}>
      
      <FormControl className={classes.formControl}>
        <TextField
          id="username"
          label="Username"
          className={classes.textField}
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          margin="none"
          InputLabelProps={{
            shrink: true,
          }}
          helperText={(errors.username && touched.username) && errors.username}
          error={touched.username && Boolean(errors.username)}
        />
      </FormControl>
      
      <FormControl className={classes.formControl}>
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          margin="none"
          InputLabelProps={{
            shrink: true,
          }}
          helperText={(errors.email && touched.email) && errors.email}
          error={touched.email && Boolean(errors.email)}
        />
      </FormControl>
      
      <FormControl className={classes.formControl}>
        <TextField
          id="phone"
          label="Phone"
          className={classes.textField}
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          margin="none"
          InputLabelProps={{
            shrink: true,
          }}
          helperText={(errors.phone && touched.phone) && errors.phone}
          error={touched.phone && Boolean(errors.phone)}
        />
      </FormControl>
      
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="team-label-placeholder">
          Team
        </InputLabel>
        
        <Field 
          name="team"
          id="team"
          label="Team"
          className={classes.selectEmpty}
          
          helperText={(errors.team && touched.team) && errors.team}
          error={touched.team && Boolean(errors.team)}
          render={(field = props.field,
              setFieldValue = props.setFieldValue) => (
            <Select
              native
              value={values.team}
              onChange={handleChange}
              onBlur={handleBlur}
              
              inputProps={{
                name: 'team',
                id: 'team-helper',
              }}
            >
              <option value="" />
              {TEAM_LIST ? TEAM_LIST.map(option => (<option  key={option.val} value={option.val} >{option.text}</option>)) : null}
            </Select>
          )}
        />
        
      </FormControl>
    
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="role-label-placeholder">
          Role
        </InputLabel>
        
        <Field 
          name="roleId"
          id="roleId"
          label="Role"
          className={classes.selectEmpty}
          
          helperText={(errors.roleId && touched.roleId) && errors.roleId}
          error={touched.roleId && Boolean(errors.roleId)}
          render={(field = props.field,
              setFieldValue = props.setFieldValue) => (
            <Select
              native
              value={values.roleId}
              onChange={handleChange}
              onBlur={handleBlur}
              
              inputProps={{
                name: 'roleId',
                id: 'roleId-helper',
              }}
            >
              <option value="" />
              {roleList ? roleList.map(item => (<option  key={item._id} value={item._id}>{item.name}</option>)) : null}
            </Select>
          )}
        />
        
      </FormControl>
      
      <FormControl className={classes.formControl}>
        
        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          margin="none"
          InputLabelProps={{
            shrink: true,
          }}
          helperText={(errors.password && touched.password) && errors.password}
          error={touched.password && Boolean(errors.password)}
        />
      </FormControl>
      
      <Button variant="contained" color="primary" 
        className={classes.button}
        type="submit"
        // disabled={isSubmitting}
      >
        Submit
      </Button>
    </Form>
  )
}

const UserDetailForm = withFormik({
  mapPropsToValues: () => ({
    'fullname' : '',
    'username' : '',
    'email' : '',
    'phone' : '',
    'roleId' : '',
    'team' : '',
    'password' : '',
  }),
  
  handleSubmit: (values, props) => {
    
    setTimeout(() => {
      props.setSubmitting(false);
      props.props.actionSaveMember(values, props.resetForm);
    }, 300);
  },
  
  validationSchema : Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    email: Yup
          .string()
          .email()
          .required('Required'),
    roleId: Yup.string('This field type is string').required('This field is required'),
    phone: Yup.string('This field type is string').required('This field is required'),
    team: Yup.string().required('This field is required'),
  })
  
})(UserDetail);

export default withStyles(useStyles)(UserDetailForm);
