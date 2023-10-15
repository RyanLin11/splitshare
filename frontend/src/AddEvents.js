import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField
} from '@mui/material';
import {
  Add as AddIcon
} from '@mui/icons-material';
import { addEvent } from './services/EventService';

export default function AddEvents() {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    let event = await addEvent(name);
    console.log(event);
    handleCloseDialog();
  }

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
          <AddIcon/>
      </IconButton>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="eventName"
            label="Event Name"
            type="text"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
