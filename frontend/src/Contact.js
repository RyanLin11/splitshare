import {
    AppBar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material'
import {
    useParams 
} from "react-router-dom";
import { 
    useState,
    useEffect, 
    Fragment 
} from 'react';
import { getContact } from './services/ContactService';

export default function Contact() {
    const params = useParams();
    let [contact, setContact] = useState();

    useEffect(async () => {
        let contactData = await getContact(params.id);
        setContact(contactData);
    }, []);

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
                        {contact.name}
                    </Typography>
                </Toolbar>
            </AppBar>
            </Box>
            {/* display all items that the current user owes this user, and this user owes the current user */}
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {['hello'].map((item) => (
                    <Fragment>
                        <ListItem alignItems="flex-start">
                            
                        </ListItem>
                        <Divider variant="middle" component="li" />
                    </Fragment>
                ))}
                <ListItem alignItems="flex-start">
                    <ListItemText
                    primary={
                        <Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h5"
                            color="text.primary"
                        >
                            Total
                        </Typography>
                        </Fragment>
                    }
                    />
                </ListItem>
            </List>
        </div>
    );
}
