import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { ListItemButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom"; 

export default function ContactIndividual({ contactName = 'Generic Contact'}) {
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 0 }}
                >
                    <ArrowBackIcon/>
                </IconButton>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    {contactName}
                </Typography>
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
