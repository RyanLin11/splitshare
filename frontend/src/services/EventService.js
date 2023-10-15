import axios from './BaseService';

export const getEvents = async () => {
    let events = await axios.get('/events');
    return events.data;
};

export const addEvent = async (name) => {
    let newEvent = await axios.post('/events', { name });
    return newEvent.data;
};

export const getEvent = async (id) => {
    let event = await axios.get(`/events/${id}`);
    return event.data;
};

export const editEvent = async (id, name) => {
    let event = await axios.put(`/events/${id}`, { name });
    return event.data;
};

export const deleteEvent = async (id) => {
    await axios.delete(`/events/${id}`);
};