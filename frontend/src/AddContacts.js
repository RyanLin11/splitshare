import React, { useState } from 'react';
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
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { addContact } from './services/ContactService';

export default function AddContacts() {
  const [openDialog, setOpenDialog] = useState(false);
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    let contact = await addContact(email, alias);
    console.log(contact);
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
        <PersonAddIcon />
      </IconButton>
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
            value={alias}
            onChange={e => setAlias(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
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
