import axios from './BaseService';

export const getItems = async () => {
    let items = await axios.get('/items');
    return items.data;
};

export const addItem = async (name, cost, eventId) => {
    let item = await axios.post('/items', { name, cost, eventId });
    return item.data;
};

export const getItem = async (id) => {
    let item = await axios.get(`/items/${id}`);
    return item.data;
};

export const editItem = async (id, updates) => {
    let editUser = await axios.put(`/items/${id}`, updates );
    return editUser.data;
};

export const deleteItem = async (id) => {
    await axios.delete(`/items/${id}`);
};