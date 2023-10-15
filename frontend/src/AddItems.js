import { useState, useEffect, Fragment } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import { getContacts } from './services/ContactService';
import { addItem } from './services/ItemService';

export default function AddItems({ eventId }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [itemName, setItemName] = useState("");
    const [itemCost, setItemCost] = useState(0);
    const [selectedContacts, setSelectedContacts] = useState([]);

    useEffect(() => {
        async function getData() {
            const contactsData = await getContacts();
            setContacts(contactsData);
        }
        getData();
    }, []);

    function handleChange(event) {
        const value = event.target.value;
        setSelectedContacts(
            typeof value === 'string' ? value.split(',') : value
        );
        console.log(selectedContacts);
    }

    async function handleSubmit(e) {
        // add the item to the server
        let payables = selectedContacts.map(contact => ({
            payeeId: contact.id,
            fraction: 1.0 / selectedContacts.length
        }));
        console.log(eventId);
        await addItem(itemName, itemCost, eventId, payables);
        handleCloseDialog();
    }

    function handleOpenDialog() {
        setOpenDialog(true);
    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    return (
        <Fragment>
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
                value={itemName}
                onChange={e => setItemName(e.target.value)}
            />
            <TextField
                margin="dense"
                id="itemCost"
                label="Item Cost"
                type="number"
                fullWidth
                value={itemCost}
                onChange={e => setItemCost(e.target.value)}
            />
            <FormControl fullWidth>
                <InputLabel id="contacts"> Contacts </InputLabel>
                <Select
                labelId="contacts"
                id="contacts"
                multiple
                value={selectedContacts}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selectedContacts) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedContacts.map((contact) => (
                        <Chip key={contact.id} label={contact.alias} />
                    ))}
                    </Box>
                )}>
                { contacts.map((contact) => (
                    <MenuItem
                    key={contact.alias}
                    value={contact}
                    >
                    {contact.alias}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
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
        </Fragment>
    );
};
