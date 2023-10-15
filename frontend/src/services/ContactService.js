import axios from './BaseService';

export const getContacts = async () => {
    //let contacts = await axios.get('/contacts');
    let contacts = [ { id: 'a2u3445', name: 'Edward', payable: 5.23, receivable: 2.34 }];
    return contacts;
};

export const addContact = async (email, alias) => {
    let contactUser;
    try {
        contactUser = await axios.get(`/contacts?email=${email}`);
    } catch (e) {
        throw Error('not found');
    }
    let newContact = await axios.post('/contacts', { contactId: contactUser._id, alias });
    return newContact.data;
};

export const getContact = async (id) => {
    //let contact = await axios.get(`/contacts/${id}`);
    //return contact.data;
    let contact = { 
        name: 'Ryan', 
        payables: [
            { name: 'McDonald\'s', amount: 12.45 }
        ],
        receivables: [
            { name: 'Wendy\'s', amount: 6.45 }
        ]
    };
    return contact;
};

export const editContact = async (id, alias) => {
    let updatedContact = await axios.put(`/contacts/${id}`, { alias });
    return updatedContact.data;
};

export const deleteContact = async (id) => {
    await axios.delete(`/contacts/${id}`)
};