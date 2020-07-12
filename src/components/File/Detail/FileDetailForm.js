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
  hiddenField: {
    display: 'none'
  }
}));

const FileDetail = (props) => {
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
  
  // const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  
  useEffect(()=>{
    // setLabelWidth(inputLabel.current.offsetWidth);
  })
  
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
        
        <FormControl error={touched.teamId && Boolean(errors.teamId)}  className={classes.formControl}>
          <input 
            type="file"
            name="file"
            accept=".jpg, .jpeg, .png, .doc, .docx, .pdf"
            id="contained-button-file"
            className={classes.hiddenField}
            onChange={(event) => {
              const fileUpload = event.currentTarget.files[0];
              if(fileUpload) {
                setFieldValue("upload_file", fileUpload);
                setFieldValue("file", fileUpload.name);
              }
            }}
          />
          
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
          
          {touched.file && Boolean(errors.file) && (<FormHelperText>{errors.file}</FormHelperText>)}
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
      <Link to={'/file'} className={classes.linkButton}>
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

const FileDetailForm = withFormik({
  mapPropsToValues : (props) => {
    
  var _id = '',
      name = '',
      file = '',
      isDir = false,
      directory = '/',
      upload_file = '';

  if(!isEmpty(props.detail)){
    var {_id, name, file, upload_file, isDir, directory} = props.detail
  }
  
   return {
    name: name,
    _id: _id,
    file: file,
    isDir: isDir,
    directory: directory,
    upload_file: upload_file,
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
    file: Yup.string().required('This field is required'),
    upload_file: Yup.string().required('This field is required'),
  })
})(FileDetail);

const FileDetailFormComponent = (props) => {
  const Component =  withStyles(useStyles)(FileDetailForm);
  return <Component
            detail={props.detail}
            actionPostDetail={props.actionPostDetail}
          />;
}

export default FileDetailFormComponent
