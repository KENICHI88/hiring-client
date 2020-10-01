import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function UserUpdateModal(props) {
  
  const { userInfo } = props;

  const handleClose = () => {
    props.setStatusUserModal(false);
  };
  
  return (
    <Dialog 
      open={props.isOpen} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title"
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">User information</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="username"
          value={userInfo && userInfo.username ? userInfo.username : ''}
          label="Username"
          type="text"
          fullWidth
          readOnly
        />
        
        <TextField
          margin="dense"
          id="email"
          value={userInfo && userInfo.email ? userInfo.email : ''}
          label="Email"
          type="text"
          fullWidth
        />
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserUpdateModal
