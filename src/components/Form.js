import React, { Component } from 'react';

class Form extends Component {
  // constructor(props) {
  //   super(props);
  //  this.state = {

  //  };
  //  }

  render() {
    return (
      <>
        <label htmlFor="name-input">
          <input type="text" data-testid="name-input" id="name-input" />
        </label>
        <label htmlFor="description-input">
          <textarea data-testid="description-input" id="description-input" />
        </label>
        <label htmlFor="attr1-input">
          <input type="number" data-testid="attr1-input" id="attr1-input" />
        </label>
        <label htmlFor="attr2-input">
          <input type="number" data-testid="attr2-input" id="attr2-input" />
        </label>
        <label htmlFor="attr3-input">
          <input type="number" data-testid="attr3-input" id="attr3-input" />
        </label>
        <label htmlFor="image-input">
          <input type="text" data-testid="image-input" id="image-input" />
        </label>
        <label htmlFor="rare-input">
          <select data-testid="rare-input" id="rare-input">
            <option value="normal"> Normal</option>
            <option value="raro"> Raro</option>
            <option value="muito raro"> Muito Raro</option>
          </select>
        </label>
        <label htmlFor="trunfo-input">
          <input type="checkbox" data-testid="trunfo-input" id="trunfo-input" />
        </label>
        <button type="submit" data-testid="save-button" id="save-button">
          Salvar
        </button>
      </>
    );
  }
}

export default Form;
