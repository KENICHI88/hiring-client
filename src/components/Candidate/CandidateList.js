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
import Chip from '@material-ui/core/Chip';

import {getArrayFromObjectList} from '../../utils/utils';
import {CANDIDATE_STATUS, TEAM_LIST, TEAM_COLOR, POSITION_LIST, LEVEL_COLOR} from '../../constant/variables';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
  fe_team: {
    backgroundColor: TEAM_COLOR.fe_team,
    color: '#fff',
  },
  php_team: {
    backgroundColor: TEAM_COLOR.php_team,
    color: '#fff',
  },
  dotnet_team: {
    backgroundColor: TEAM_COLOR.dotnet_team,
    color: '#fff',
  },
  java_team: {
    backgroundColor: TEAM_COLOR.java_team,
    color: '#fff',
  },
  qa_team: {
    backgroundColor: TEAM_COLOR.qa_team,
    color: '#fff',
  },
  it_team: {
    backgroundColor: TEAM_COLOR.it_team,
    color: '#fff',
  },
  hr_team: {
    backgroundColor: TEAM_COLOR.hr_team,
    color: '#fff',
  },
  
  intership_position: {
    backgroundColor: LEVEL_COLOR.intership_position,
    color: '#fff',
  },
  junior_position: {
    backgroundColor: LEVEL_COLOR.junior_position,
    color: '#fff',
  },
  middle_position: {
    backgroundColor: LEVEL_COLOR.middle_position,
    color: '#fff',
  },
  senior_position: {
    backgroundColor: LEVEL_COLOR.senior_position,
    color: '#fff',
  },
  leader_position: {
    backgroundColor: LEVEL_COLOR.leader_position,
    color: '#fff',
  },
  paddingCell: {
    padding: '6px 16px',
  },
}));

const CandidateList = React.memo((props)=>{
  const classes = useStyles();
  
  const {userInfo} = props;
  const arrayTeam = getArrayFromObjectList(TEAM_LIST);
  const arrayPosition = getArrayFromObjectList(POSITION_LIST);
  const arrayLevelColor = getArrayFromObjectList(LEVEL_COLOR);
  
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">#</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { props.candidateList ? props.candidateList.map((item, index) => {
            const status = CANDIDATE_STATUS.filter(code => code.key === item.status)[0];
            if((userInfo.team !== item.team) && (userInfo.team !== 'hr_team' && userInfo.team !== 'admin_team' )) return null;
            return (
              <StyledTableRow key={item._id}>
                <StyledTableCell className={classes.paddingCell} component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell className={classes.paddingCell} align="left"><p>{item.username}</p>
                  <Chip size="small" className={classes[item.team]} label={arrayTeam[item.team].text} /> 
                  <Chip size="small" className={classes[item.arrayLevelColor]} label={'Level: '+arrayPosition[item.position].text} />
                </StyledTableCell>
                <StyledTableCell className={classes.paddingCell} align="left">{`${status.text} *${status.key}*`}</StyledTableCell>
                <StyledTableCell className={classes.paddingCell} align="center">
                  <Fab title="View detail" size="small" color="secondary" aria-label="edit" className={classes.fab}
                    onClick={() => props.actionSelectCandidate(item._id)} 
                  >
                    <VisibilityIcon />
                  </Fab>
                  {(userInfo && (userInfo.team === 'hr_team' || userInfo.team === 'admin_team' )) ? (<>
                  <Fab title="Edit" size="small" color="secondary" aria-label="edit" className={classes.fab}
                    onClick={() => props.actionEditCandidate(item._id)}
                  >
                    <EditIcon />
                  </Fab>
                  {/* <Fab title="Confirm next phase" size="small" color="secondary" aria-label="edit" className={classes.fab}
                    onClick={() => props.actionSelectCandidateToNextPhase(item._id)}
                  >
                    <NavigateNextIcon />
                  </Fab> */}
                  </>) : null}
                  
                  
                </StyledTableCell>
              </StyledTableRow>
            )
          }) : null }
        </TableBody>
      </Table>
    </Paper>
  );
});

export default CandidateList
