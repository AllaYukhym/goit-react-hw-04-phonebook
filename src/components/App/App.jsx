import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Container, Title, Subtitle } from './App.styled';
import { Form } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { useEffect } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    const { name, number } = data;
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState => [...prevState, contact]);
  };

  const changeFilter = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const removeContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContacts = getFilteredContacts();

  return (
    <>
      <Container>
        <Title>Phonebook</Title>
        <Form onSubmit={formSubmitHandler} contacts={contacts} />
        <Subtitle>Contacts</Subtitle>
        <Filter onChange={changeFilter} value={filter} />
        <ContactList
          removeContact={removeContact}
          filteredContacts={visibleContacts}
          contacts={contacts}
          value={filter}
        />
      </Container>
    </>
  );
}
