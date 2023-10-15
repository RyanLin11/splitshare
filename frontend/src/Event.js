import {
    AppBar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Fragment, useEffect, useState } from 'react';
import AddItems from './AddItems';
import { Link, useParams } from "react-router-dom"; 
import { getEvent } from './services/EventService';

export default function Event() {
    let params = useParams();

    const [event, setEvent] = useState({});
    
    useEffect(() => {
        async function getData() {
            let eventData = await getEvent(params.eventId);
            console.log(eventData);
            setEvent(eventData);
        }
        getData();
    }, []);

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
                <AddItems eventId={params.eventId} />
                </Toolbar>
            </AppBar>
            </Box>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                { 
                    Array.isArray(event.items) && event.items.map(item => (
                        <Fragment>
                            <ListItem alignItems="flex-start">
                                <ListItemText primary={item.name} />
                            </ListItem>
                            <Divider variant="middle" component="li" />
                        </Fragment>
                    ))
                }
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
