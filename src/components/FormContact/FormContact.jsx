import { Component } from 'react';

class FormContact extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addContact();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={this.props.name}
            onChange={this.props.onNameChange}
            required
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            value={this.props.number}
            onChange={this.props.onNumberChange}
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default FormContact;
