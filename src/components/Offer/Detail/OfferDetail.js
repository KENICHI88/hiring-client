import React, {useState} from 'react';
import {useEffectAsync} from '../../../utils/utils';
import offerController from '../../../controllers/offerController';
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

import OfferDetailForm from './OfferDetailForm';
  
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

const OfferDetailComponent = props => {
  
  const classes = useStyles();
  
  let history = useHistory();
  let { idDetail } = useParams();
  
  const [detail, setDetail] = useState({});
  
  useEffectAsync(() => {
    if(idDetail !=='new' ) {
      const detail = offerController.getDetail(idDetail, (result) => {
        setDetail(result.result);
      });
    }
    
  }, []);
  
  const actionPostDetail = (formData) => {
    offerController.postDetail(formData, (data) => {
      if(data.status==='OK') {
        props.actionGetList();
        history.push('/offer');
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
              <Link to={`/offer`} >
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Back to list
              </Button>
            </Link></>) : (
                <OfferDetailForm 
                  detail={detail}
                  listCandidate={props.listCandidate}
                  listApprover={props.listApprover}
                  actionPostDetail={actionPostDetail}
                />)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default OfferDetailComponent
