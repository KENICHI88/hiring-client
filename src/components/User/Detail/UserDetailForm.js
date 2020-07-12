import React, {useEffect} from 'react'

import { withStyles } from '@material-ui/core/styles';

import * as Yup from 'yup';
import {withFormik, Form, Field, ErrorMessage} from 'formik';
import {isEmpty} from 'lodash';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  linkButton: {
    textDecoration: 'none'
  },
}));

const TeamDetail = (props) => {
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
    listMember,
    listTeam,
    listRole,
  } = props;
  
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  
  useEffect(()=>{
    setLabelWidth(inputLabel.current.offsetWidth);
  })
  
  return (<Form
    className={classes.container} noValidate autoComplete="off"
      onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
  >
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} >
        <FormControl className={classes.formControl}>
          <TextField
            variant="outlined"
            value={values.username}
            label="Username *"
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
      </Grid>
      <Grid item xs={4} >
        <FormControl className={classes.formControl}>
          <TextField
            variant="outlined"
            value={values.firstname}
            label="First name *"
            id="firstname"
            name="firstname"
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            helperText={(errors.firstname && touched.firstname) && errors.firstname}
            error={touched.firstname && Boolean(errors.firstname)}
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item xs={4} >
        <FormControl className={classes.formControl}>
          <TextField
            variant="outlined"
            value={values.lastname}
            label="Last name *"
            id="lastname"
            name="lastname"
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            helperText={(errors.lastname && touched.lastname) && errors.lastname}
            error={touched.lastname && Boolean(errors.lastname)}
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item xs={4} >
        <FormControl className={classes.formControl}>
          <TextField
            variant="outlined"
            value={values.age}
            label="Age"
            id="age"
            name="age"
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            helperText={(errors.age && touched.age) && errors.age}
            error={touched.age && Boolean(errors.age)}
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12} >
        <FormControl className={classes.formControl}>
          <TextField
            variant="outlined"
            value={values.email}
            label="Email *"
            id="email"
            name="email"
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            helperText={(errors.email && touched.email) && errors.email}
            error={touched.email && Boolean(errors.email)}
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item xs={4} >
        <FormControl className={classes.formControl}>
          <TextField
            variant="outlined"
            value={values.phone}
            label="Phone"
            id="phone"
            name="phone"
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            helperText={(errors.phone && touched.phone) && errors.phone}
            error={touched.phone && Boolean(errors.phone)}
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item xs={4} >
        <FormControl className={classes.formControl}>
          <TextField
            variant="outlined"
            value={values.address}
            label="Address"
            id="address"
            name="address"
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            helperText={(errors.address && touched.address) && errors.address}
            error={touched.address && Boolean(errors.address)}
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item xs={4} >
        <FormControl className={classes.formControl}>
          <TextField
            variant="outlined"
            value={values.reference}
            label="Reference"
            id="reference"
            name="reference"
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            helperText={(errors.reference && touched.reference) && errors.reference}
            error={touched.reference && Boolean(errors.reference)}
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12} >
        <FormControl error={touched.teamId && Boolean(errors.teamId)} variant="outlined" className={classes.formControlSelect}>
          <InputLabel ref={inputLabel} htmlFor="outlined-teamId">
            Team
          </InputLabel>
          <Select
            native
            value={values.teamId}
            onChange={handleChange('teamId')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'teamId',
              id: 'outlined-teamId',
            }}
          >
            <option value="" />
            {listTeam && listTeam.length ? listTeam.map(item=> <option key={item._id} value={item._id}>{item.name}</option>) : null}
          </Select>
          {touched.teamId && Boolean(errors.teamId) && (<FormHelperText>{errors.teamId}</FormHelperText>)}
        </FormControl>
        
        <FormControl error={touched.roleId && Boolean(errors.roleId)} variant="outlined" className={classes.formControlSelect}>
          <InputLabel ref={inputLabel} htmlFor="outlined-roleId">
            Role *
          </InputLabel>
          <Select
            native
            value={values.roleId}
            onChange={handleChange('roleId')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'roleId',
              id: 'outlined-roleId',
            }}
          >
            <option value="" />
            {listRole && listRole.length ? listRole.map(item=> <option key={item._id} value={item._id}>{item.name}</option>) : null}
          </Select>
          {touched.roleId && Boolean(errors.roleId) && (<FormHelperText>{errors.roleId}</FormHelperText>)}
        </FormControl>
        
        <FormControl error={touched.type && Boolean(errors.type)} variant="outlined" className={classes.formControlSelect}>
          <InputLabel ref={inputLabel} htmlFor="outlined-status">
            Type *
          </InputLabel>
          <Select
            native
            value={values.type}
            onChange={handleChange('type')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'type',
              id: 'outlined-type',
            }}
          >
            <option value="" />
            <option value="isMember">isMember</option>
            <option value="isCandidate">isCandidate</option>
          </Select>
          {touched.type && Boolean(errors.type) && (<FormHelperText>{errors.type}</FormHelperText>)}
        </FormControl>
        
        <FormControl error={touched.status && Boolean(errors.status)} variant="outlined" className={classes.formControlSelect}>
          <InputLabel ref={inputLabel} htmlFor="outlined-status">
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
            <option value="" />
            <option value={1}>Active</option>
            <option value={2}>Inactive</option>
            <option value={3}>Other</option>
          </Select>
          {touched.status && Boolean(errors.status) && (<FormHelperText>{errors.status}</FormHelperText>)}
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
      <Link to={'/user'} className={classes.linkButton}>
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

const UserDetailForm = withFormik({
  mapPropsToValues : (props) => {
    
  var _id = '',
      username = '',
      firstname = '',
      lastname = '',
      age = '',
      email = '',
      phone = '',
      address = '',
      teamId = '',
      roleId = '',
      type = '',
      reference = '',
      status = ''
      ;

  if(!isEmpty(props.detail)){
    var { _id,
          username,
          firstname,
          lastname,
          age,
          email,
          phone,
          address,
          teamId,
          roleId,
          type,
          reference,
          status,
        } = props.detail
  }
  
   return {
    _id,
    username,
    firstname,
    lastname,
    age,
    email,
    phone,
    address,
    teamId,
    roleId,
    type,
    reference,
    status,
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
    username: Yup.string().trim().lowercase().required('This field is required'),
    firstname: Yup.string().trim().required('This field is required'),
    lastname: Yup.string().required('This field is required'),
    age: Yup.number(),
    email: Yup.string().email().required('This field is required'),
    status: Yup.number().required('This field is required'),
    // teamId: Yup.string().required('This field is required'),
    roleId: Yup.string().required('This field is required'),
    type: Yup.string().required('This field is required'),
  })
})(TeamDetail);

const UserDetaimFormComponent = (props) => {
  const Component =  withStyles(useStyles)(UserDetailForm);
  return <Component
            detail={props.detail}
            actionPostDetail={props.actionPostDetail}
            listRole={props.listRole}
            listTeam={props.listTeam}
          />;
}

export default UserDetaimFormComponent
