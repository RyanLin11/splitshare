import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

const AddItems = () => {
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
          <AddIcon />
      </IconButton>
      {/* Add your contact list here */}
      
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="itemName"
            label="Item Name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="itemCost"
            label="Item Cost"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            id="friends"
            label="Friends"
            type="text"
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

export default AddItems;
