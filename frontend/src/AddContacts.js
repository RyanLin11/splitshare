import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const AddContacts = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 0 }}
          onClick={handleOpenDialog}
      >
          <PersonAddIcon />
      </IconButton>
      {/* Add your contact list here */}
      
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddContacts;
