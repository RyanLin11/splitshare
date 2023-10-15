import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddItems from './AddItems';
import { Link } from "react-router-dom"; 

export default function Event() {
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Link to = "/events" style={{textDecoration:"none", color: 'inherit'}}>
                <ArrowBackIcon/>
            </Link>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center'}}>
                Events
            </Typography>
            <AddItems/>
            </Toolbar>
        </AppBar>
        </Box>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemText primary="Item 1"/>
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemText primary="Item 2"/>
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemText primary="Item 3"/>
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
    </div>
  );
}
