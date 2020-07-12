import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

import {TEAM_LIST} from '../../constant/variables';

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
  
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Index</StyledTableCell>
            <StyledTableCell align="left">Username</StyledTableCell>
            <StyledTableCell align="left">Position</StyledTableCell>
            <StyledTableCell align="left">Team</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { props.userList ? props.userList.map((item, index) => (
            <StyledTableRow className={classes.rowTable} key={item._id}>
              <StyledTableCell className={classes.paddingCell}  component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell className={classes.paddingCell} align="left">{item.username}</StyledTableCell>
              <StyledTableCell className={classes.paddingCell} align="left">{item.roleId.name}</StyledTableCell>
              <StyledTableCell className={classes.paddingCell} align="left">{TEAM_LIST.filter(team => team.val ===item.team)[0].text}</StyledTableCell>
              <StyledTableCell className={classes.paddingCell} align="left">{item.email}</StyledTableCell>
              <StyledTableCell className={classes.paddingCell} align="center">
                <Fab size="small" color="secondary" aria-label="edit" className={classes.fab}>
                  <EditIcon onClick={() => props.setStatusUserModal(true, item._id)} />
                </Fab>
              </StyledTableCell>
            </StyledTableRow>
          )) : null }
        </TableBody>
      </Table>
    </Paper>
  );
}

export default UserListTable;
