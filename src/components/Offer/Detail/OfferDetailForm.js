import React, {useEffect} from 'react'

import PropTypes from 'prop-types'
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

const OfferDetail = (props) => {
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
    listCandidate,
    listApprover,
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
        
        <FormControl error={touched.approverId && Boolean(errors.approverId)} variant="outlined" className={classes.formControlSelect}>
          <InputLabel ref={inputLabel} htmlFor="outlined-approverId">
            Approver *
          </InputLabel>
          <Select
            native
            value={values.approverId}
            onChange={handleChange('approverId')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'approverId',
              id: 'outlined-approverId',
            }}
          >
            <option value="" />
            {listApprover && listApprover.length ? listApprover.map(item=> <option key={item._id} value={item._id}>{item.username}</option>) : null}
          </Select>
          {touched.approverId && Boolean(errors.approverId) && (<FormHelperText>{errors.approverId}</FormHelperText>)}
        </FormControl>
        
        <FormControl className={classes.formControl}>
          <TextField
            variant="outlined"
            value={values.note}
            label="Note"
            id="note"
            name="note"
            multiline
            rows="5"
            defaultValue="Take note"
            className={classes.textField}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            helperText={(errors.note && touched.note) && errors.note}
            error={touched.note && Boolean(errors.note)}
          ></TextField>
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
      <Link to={'/offer'} className={classes.linkButton}>
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

const OfferDetailForm = withFormik({
  mapPropsToValues : (props) => {
    
    var _id = '',
        candidateId = '',
        createrId = '',
        approverId = '',
        note = '' ;

    if(!isEmpty(props.detail)){
      var {_id, candidateId, createrId, approverId} = props.detail
    }
    
    return {_id,
            candidateId,
            createrId,
            approverId,
            note,
        };
  },
  
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
    approverId: Yup.string().required('This field is required'),
    note: Yup.string(),
  })
})(OfferDetail);

const OfferDetailFormComponent = (props) => {
  const Component =  withStyles(useStyles)(OfferDetailForm);
  return <Component
            detail={props.detail}
            listCandidate={props.listCandidate}
            listApprover={props.listApprover}
            actionPostDetail={props.actionPostDetail}
          />;
}

OfferDetailFormComponent.propTypes = {
  children: PropTypes.node,
  listCandidate : PropTypes.array.isRequired,
  listApprover : PropTypes.array.isRequired,
}

export default OfferDetailFormComponent
