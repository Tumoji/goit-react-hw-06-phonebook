import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import { addContact, deleteContact } from '../../redux/contactsSlice';
import { setFilter } from '../../redux/filterSlice';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  const handleSubmit = newContact => {
    dispatch(addContact(newContact));
  };

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const handleClick = e => {
    dispatch(deleteContact(e.target.id));
  };

  return (
    <div className={styles.phonebook}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filterValue={filter} filterFunction={handleFilterChange} />
      <ContactList
        listToSearch={filteredContacts}
        deleteFunction={handleClick}
      />
    </div>
  );
};

export default App;
