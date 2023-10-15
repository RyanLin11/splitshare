import axios from './BaseService';

export const getContacts = async () => {
    //let contacts = await axios.get('/contacts');
    let contacts = [ { id: 'a2u3445', name: 'Edward', payable: 5.23, receivable: 2.34 }];
    return contacts;
};

export const addContact = async (contactId, alias) => {
    let newContact = await axios.post('/contacts', { body: {contactId, alias} });
    return newContact.data;
};

export const getContact = async (id) => {
    let contact = await axios.get(`/contacts/${id}`);
    return contact.data;
};

export const editContact = async (id, alias) => {
    let updatedContact = await axios.put(`/contacts/${id}`, { body: {alias} });
    return updatedContact.data;
};

export const deleteContact = async (id) => {
    await axios.delete(`/contacts/${id}`)
};