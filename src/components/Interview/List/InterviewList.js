import React from 'react'
import PropTypes from 'prop-types'

import {
  Link,
  useRouteMatch,
} from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
///////
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';

import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BlockIcon from '@material-ui/icons/Block';
///////
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
///////
import moment from 'moment';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700,
  },
  linkButton: {
    color: '#fff',
    lineHeight: 1
  },
  button: {
    margin: theme.spacing(1),
  },
  colorStatusPending: {
    color: orange['700'],
    marginRight: 5,
  },
  colorStatusPass: {
    color: green['500'],
    marginRight: 5,
  },
  colorStatusFail: {
    color: grey['500'],
    marginRight: 5,
  },
}));


const InterviewListComponent = props => {
  
  const classes = useStyles();
  
  let { path, url } = useRouteMatch();
  const {dataList} = props;
  
  return (
    <>
      <Grid container spacing={1}>
        <Grid item sm={12}>
          <Link to={`${path}detail/new`} >
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<AddIcon>send</AddIcon>}
            >
              Create
            </Button>
          </Link>
          <Chip
            className={classes.colorStatusPending}
            size="small"
            avatar={<PauseCircleFilledIcon  title="PENDING" />}
            label="Pending"
          />
          <Chip
            size="small"
            className={classes.colorStatusFail}
            avatar={<BlockIcon  title="FAIL" />}
            label="Fail"
          />
          <Chip
            size="small"
            className={classes.colorStatusPass}
            avatar={<CheckCircleIcon  title="PASS" />}
            label="Pass"
          />
        </Grid>
        <Grid item sm={12}>
          <TableContainer component={Paper}>
            <Table size="small" className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell align="left">Candidate</StyledTableCell>
                  <StyledTableCell align="left">Interviewer</StyledTableCell>
                  <StyledTableCell align="left">Date Time</StyledTableCell>
                  <StyledTableCell align="left">Result</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList.map((row, index) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {index+1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">{row.candidateId.username}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{row.interviewerId.username}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{moment(row.dateTime).format('DD/MM/YYYY  HH:mm')}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{row.result === 0 ? <PauseCircleFilledIcon className={classes.colorStatusPending} title="PENDING" /> : row.result === 1 ? <CheckCircleIcon className={classes.colorStatusPass} title="PASS" /> : <BlockIcon className={classes.colorStatusFail} title="FAIL" />}</StyledTableCell>
                    <StyledTableCell className={classes.paddingCell} align="center">
                      <Link className={classes.linkButton} to={`${url}/detail/${row._id}`}>
                        <Fab title="Edit" size="small" color="secondary" aria-label="edit" >
                          <EditIcon />
                        </Fab>
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  )
}

InterviewListComponent.propTypes = {
  children: PropTypes.node,
  dataList : PropTypes.array.isRequired,
}

export default InterviewListComponent;
