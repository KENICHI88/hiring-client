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
            InputProps={{
              readOnly: isEdit? true: false,
            }}
            helperText={(errors.name && touched.name) && errors.name}
            error={touched.name && Boolean(errors.name)}
          ></TextField>
        </FormControl>
      
        <FormControl error={touched.leaderId && Boolean(errors.leaderId)} variant="outlined" className={classes.formControlSelect}>
          <InputLabel ref={inputLabel} htmlFor="outlined-leaderId">
            Team Leader *
          </InputLabel>
          <Select
            native
            value={values.leaderId}
            onChange={handleChange('leaderId')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'leaderId',
              id: 'outlined-leaderId',
            }}
          >
            <option value="" />
            {listMember && listMember.length ? listMember.map(item=> <option key={item._id} value={item._id}>{item.username}</option>) : null}
          </Select>
          {touched.leaderId && Boolean(errors.leaderId) && (<FormHelperText>{errors.leaderId}</FormHelperText>)}
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
      <Link to={'/team'} className={classes.linkButton}>
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

const TeamDetailForm = withFormik({
  mapPropsToValues : (props) => {
    
  var _id = '',
      name = '',
      leaderId = '';

  if(!isEmpty(props.detail)){
    var {_id, name, leaderId} = props.detail
  }
  
   return {
    name: name,
    _id: _id,
    leaderId: leaderId,
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
    name: Yup.string().required('This field is required'),
    leaderId: Yup.string().required('This field is required'),
  })
})(TeamDetail);

const TeamDetailFormComponent = (props) => {
  const Component =  withStyles(useStyles)(TeamDetailForm);
  return <Component
            detail={props.detail}
            listMember={props.listMember}
            actionPostDetail={props.actionPostDetail}
          />;
}

export default TeamDetailFormComponent
