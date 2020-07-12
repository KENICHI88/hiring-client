import React, {useEffect} from 'react'

import { withStyles } from '@material-ui/core/styles';

import * as Yup from 'yup';
import {withFormik, Form, Field, ErrorMessage} from 'formik';
import {isEmpty} from 'lodash';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
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

const RoleDetail = (props) => {
  const {
    classes,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
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
            value={values.name}
            label="Name"
            id="name"
            name="name"
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            helperText={(errors.name && touched.name) && errors.name}
            error={touched.name && Boolean(errors.name)}
          ></TextField>
        </FormControl>
        
        <FormControl className={classes.formControl}>
          <TextField
            variant="outlined"
            value={values.route}
            label="Route"
            id="route"
            name="route"
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            helperText={(errors.route && touched.route) && errors.route}
            error={touched.route && Boolean(errors.route)}
          ></TextField>
        </FormControl>
        
        <FormControl error={touched.status && Boolean(errors.status)} variant="outlined" className={classes.formControlSelect}>
          <InputLabel ref={inputLabel} htmlFor="outlined-status">
           Status
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
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
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
      <Link to={'/permission'} className={classes.linkButton}>
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

const RoleDetailForm = withFormik({
  mapPropsToValues : (props) => {
    var _id = '',
        name = '',
        route = ''
        status = true;
    if(!isEmpty(props.detail)){
      var {_id, name, route, status} = props.detail;
    }
    const obj = {
      _id,
      name,
      route,
      status,
    };
   return obj;
  },
  
  validationSchema: Yup.object().shape({
    _id: Yup.string(''),
    name: Yup.string().min(6).required('This field is required'),
    route: Yup.string().required('This field is required'),
    status: Yup.boolean().required('This field is required'),
  }),
  
  enableReinitialize : true,
  
  handleSubmit: (values, props) => {
    setTimeout(() => {
      props.setSubmitting(false);
      props.props.actionPostDetail(values);
    }, 150);
  },
  
})(RoleDetail);

const RoleDetailFormComponent = (props) => {
  const Component =  withStyles(useStyles)(RoleDetailForm);
  return <Component
            detail={props.detail}
            actionPostDetail={props.actionPostDetail}
          />;
}

export default RoleDetailFormComponent
