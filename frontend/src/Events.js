import * as React from 'react';

import {
    AppBar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';

import {
    EventNote as EventNoteIcon,
    People as PeopleIcon
} from '@mui/icons-material';

import AddEvents from './AddEvents';
import { Link } from "react-router-dom"; 

export default function Events() {
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                Events
            </Typography>
            <AddEvents/>
            </Toolbar>
        </AppBar>
        </Box>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemText
                primary="Brunch this weekend?"
                />
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemText
                primary="Summer BBQ"
                />
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemText primary="Oui Oui"/>
            </ListItem>
            <Divider variant="middle" component="li" />
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
