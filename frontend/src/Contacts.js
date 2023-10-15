import {
    AppBar,
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';

import AddContacts from './AddContacts';
import { getContacts } from './services/ContactService';
import { useState, useEffect, Fragment } from 'react';

export default function Contacts() {
    
    const [ contacts, setContacts ] = useState([]);
    let totalAmount = 0;
    
    useEffect(() => {
        async function getData() {
            let contactsData = await getContacts();
            for(let i in contactsData){
                totalAmount += contactsData[i].receivable - contactsData[i].payable;
            }
            setContacts(contactsData);
        }
        getData();
    }, []);
    
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{padding: 2}}>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1}}>
                        Contacts
                    </Typography>
                    <AddContacts />
                    </Toolbar>
                </AppBar>
            </Box>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                { contacts.map(contact => 
                    <div>
                        <ListItemButton id={contact.id} alignItems="flex-start" sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <ListItemAvatar sx={{marginTop: 0}}>
                                <Avatar alt={contact.name} src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={contact.name}
                            />
                            <ListItemText sx={{textAlign:'right', paddingRight:'10px'}}>${Math.round((contact.payable - contact.receivable) * 100) / 100}</ListItemText>
                        </ListItemButton>
                        <Divider variant="middle" component="li" />
                    </div>
                ) }
                <ListItem alignItems="flex-start" sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
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
                    <ListItemText sx={{textAlign:'right', paddingRight:'10px'}}>${Math.round((totalAmount) * 100) / 100}</ListItemText>
                </ListItem>
            </List>
        </div>
    );
}
