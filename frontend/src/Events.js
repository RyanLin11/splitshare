import {
    AppBar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Toolbar,
    Typography
} from '@mui/material';

import AddEvents from './AddEvents';
import { Fragment, useState , useEffect } from 'react';
import { getEvents } from './services/EventService';

export default function Events() {
    const [ events, setEvents ] = useState([]);

    useEffect(() => {
        async function getData() {
            let eventsData = await getEvents();
            setEvents(eventsData);
        }
        getData();
    }, []);

    
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{padding: 2}}>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1}}>
                        Events
                    </Typography>
                    <AddEvents />
                    </Toolbar>
                </AppBar>
            </Box>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                { events.map(event => 
                    <div>
                        <ListItemButton to={`./events/${event._id}`} id={event.id} alignItems="flex-start" sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <ListItemText
                            primary={event.name}
                            />
                            <ListItemText sx={{textAlign:'right', paddingRight:'10px'}}>${Math.round((10) * 100) / 100}</ListItemText>
                        </ListItemButton>
                        <Divider variant="middle" component="li" />
                    </div>
                ) }
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
                    <ListItemText sx={{textAlign:'right', paddingRight:'10px'}}>${Math.round((10.606) * 100) / 100}</ListItemText>
                </ListItem>
            </List>
        </div>
    );
}
