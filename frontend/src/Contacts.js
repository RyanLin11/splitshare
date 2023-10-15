import * as React from 'react';

import {
    AppBar,
    Avatar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';

import {
    EventNote as EventNoteIcon,
    People as PeopleIcon,
} from '@mui/icons-material';

import AddContacts from './AddContacts';

import { Link } from "react-router-dom"; 
import { getContacts } from './services/ContactService';
import { useState, useEffect } from 'react';

export default function Contacts() {
    
    const [ contacts, setContacts ] = useState([]);

    useEffect(() => {
        async function getData() {
            let contactsData = await getContacts();
            setContacts(contactsData);
        }
        getData();
    }, []);
    
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Contacts
                    </Typography>
                    <AddContacts />
                    </Toolbar>
                </AppBar>
            </Box>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                { contacts.map(contact => 
                    <div>
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt={contact.name} src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary={contact.name}
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                    </div>
                ) }
                <ListItem alignItems="flex-start">
                    <ListItemText
                    primary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h5"
                            color="text.primary"
                        >
                            Total
                        </Typography>
                        </React.Fragment>
                    }
                    />
                </ListItem>
            </List>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <Link to="/contacts">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 0 }}
                            >
                            <PeopleIcon/>
                            <div>Contacts</div>

                        </IconButton>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Link to="/events">
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 0 }}
                            >
                            <div>Events</div>
                            <EventNoteIcon/>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}
