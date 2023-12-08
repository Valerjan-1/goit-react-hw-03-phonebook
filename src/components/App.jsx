import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import FormContact from './FormContact/FormContact';
import ListContact from './ListContact/ListContact';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  onNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  onNumberChange = e => {
    this.setState({
      number: e.target.value,
    });
  };

  addContact = () => {
    const { name, contacts, number } = this.state;

    if (!name.trim() || !number.trim()) return;

    const nameCheck = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (nameCheck) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    const newContacts = [...contacts, newContact];

    localStorage.setItem('contacts', JSON.stringify(newContacts));

    this.setState({
      contacts: newContacts,
      name: '',
      number: '',
    });
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  removeContact = id => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );

    localStorage.setItem('contacts', JSON.stringify(updatedContacts));

    this.setState({
      contacts: updatedContacts,
    });
  };

  filteredContacts = () =>
    this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <FormContact
          name={this.state.name}
          number={this.state.number}
          onNameChange={this.onNameChange}
          onNumberChange={this.onNumberChange}
          addContact={this.addContact}
        />
        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          handleFilterChange={this.handleFilterChange}
        />
        <ListContact
          contacts={this.filteredContacts()}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;
