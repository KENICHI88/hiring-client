import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

import {
  Link,
  useRouteMatch,
} from "react-router-dom";

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
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    backgroundColor: '#fff'
  },
  fab: {
    margin: theme.spacing(1),
  },
  paddingCell: {
    padding: '6px 16px',
  },
}));

function UserListTable(props) {
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
        </Grid>
        <Grid item sm={12}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Index</StyledTableCell>
                <StyledTableCell align="left">Username</StyledTableCell>
                <StyledTableCell align="left">Is member/candidate</StyledTableCell>
                <StyledTableCell align="left">Role</StyledTableCell>
                <StyledTableCell align="left">Team</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { dataList ? dataList.map((row, index) => (
                <StyledTableRow className={classes.rowTable} key={row._id}>
                  <StyledTableCell className={classes.paddingCell}  component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell className={classes.paddingCell} align="left">{row.username}</StyledTableCell>
                  <StyledTableCell className={classes.paddingCell} align="left">{row.type}</StyledTableCell>
                  <StyledTableCell className={classes.paddingCell} align="left">{row.roleId.name}</StyledTableCell>
                  <StyledTableCell className={classes.paddingCell} align="left">{row.teamId && row.teamId.name}</StyledTableCell>
                  <StyledTableCell className={classes.paddingCell} align="center">
                    <Link className={classes.linkButton} to={`${url}/detail/${row._id}`}>
                      <Fab title="Edit" size="small" color="secondary" aria-label="edit" >
                        <EditIcon />
                      </Fab>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              )) : null }
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
}

export default UserListTable;
