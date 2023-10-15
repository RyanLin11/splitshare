
import './App.css';
import { 
  Link, 
  Outlet 
} from 'react-router-dom';
import { Fragment } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import {
  EventNote as EventNoteIcon,
  People as PeopleIcon
} from '@mui/icons-material';

function App() {
  const sections = [
    { label: 'Contacts', to: '/contacts', icon: <PeopleIcon /> },
    { label: 'Events', to: '/events', icon: <EventNoteIcon /> }
  ];

  return (
    <Fragment>
      <Outlet />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels>
          { sections.map(section => <BottomNavigationAction key={section.label} label={section.label} icon={section.icon} component={Link} to={section.to} />) }
        </BottomNavigation>
      </Paper>
    </Fragment>
  );
}

export default App;