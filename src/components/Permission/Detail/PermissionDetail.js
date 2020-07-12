import React, {useState} from 'react';
import {useEffectAsync} from '../../../utils/utils';
import permissionController from '../../../controllers/permissionController';
import {isEmpty} from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { grey } from '@material-ui/core/colors';
import {Link, useParams,useHistory} from 'react-router-dom';

import PermissionDetailForm from './PermissionDetailForm';
  
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginRight: 5
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gridContainer: {
    marginBottom: 15
  },
  linkButton: {
    textDecoration: 'none'
  },
  headingBlock: {
    backgroundColor: grey['700'],
    color: '#FFF',
    textAlign: 'left',
    textTransform: 'uppercase',
    fontWeight: '500'
  },
  contentBlock: {
    textAlign: 'left'
  }
}));

const PermissionDetailComponent = props => {
  
  const classes = useStyles();
  
  let history = useHistory();
  let { idDetail } = useParams();
  
  const [detail, setDetail] = useState({});
  
  useEffectAsync(() => {
    if(idDetail !=='new' ) {
      const detail = permissionController.getDetail(idDetail, (result) => {
        setDetail(result.result);
      });
    }
    
  }, []);
  
  const actionPostDetail = (formData) => {
    permissionController.postDetail(formData, (data) => {
      if(data.status==='OK') {
        props.actionGetList();
        history.push('/permission');
      }
    });
  }
  
  return (
    <div className={classes.root}>
      <Grid className={classes.gridContainer} container spacing={3}>
        <Grid item sm={12}>
          <Card className={classes.card}>
            <CardHeader
              className={clsx(classes.headingBlock)}
              title="Detail information"
            />
            <CardContent >
              {idDetail !=='new' && isEmpty(detail) ? (<><h3>Oops, It seems that this is not exist !Please check again</h3>
              <Link to={`/permission`} >
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Back to list
              </Button>
            </Link></>) : (
                <PermissionDetailForm 
                  detail={detail}
                  actionPostDetail={actionPostDetail}
                />)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default PermissionDetailComponent
