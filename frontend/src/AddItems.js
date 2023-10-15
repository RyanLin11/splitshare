import { useState, useEffect } from 'react';
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
  Add as AddIcon,
} from '@mui/icons-material';
import { getContacts } from './services/ContactService';

export default function AddItems() {
  const [openDialog, setOpenDialog] = useState(false);
  const [contacts, setContacts] = useState([]);

  async function handleSubmit() {
    // add the item to the server
    handleCloseDialog();
  }

  useEffect(() => {
    async function getData() {
      const contactsData = await getContacts();
      setContacts(contactsData);
    }
    getData();
  }, []);

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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Item</DialogTitle>
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
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
