import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  // constructor(props) {
  //   super(props);
  //  this.state = {

  //  };
  //  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <>
        <label htmlFor="name-input">
          <input
            type="text"
            data-testid="name-input"
            onChange={ onInputChange }
            value={ cardName }
            id="name-input"
          />
        </label>
        <label htmlFor="description-input">
          <textarea
            data-testid="description-input"
            onChange={ onInputChange }
            value={ cardDescription }
            id="description-input"
          />
        </label>
        <label htmlFor="attr1-input">
          <input
            type="number"
            data-testid="attr1-input"
            onChange={ onInputChange }
            value={ cardAttr1 }
            id="attr1-input"
          />
        </label>
        <label htmlFor="attr2-input">
          <input
            type="number"
            data-testid="attr2-input"
            onChange={ onInputChange }
            value={ cardAttr2 }
            id="attr2-input"
          />
        </label>
        <label htmlFor="attr3-input">
          <input
            type="number"
            data-testid="attr3-input"
            onChange={ onInputChange }
            value={ cardAttr3 }
            id="attr3-input"
          />
        </label>
        <label htmlFor="image-input">
          <input
            type="text"
            data-testid="image-input"
            onChange={ onInputChange }
            value={ cardImage }
            id="image-input"
          />
        </label>
        <label htmlFor="rare-input">
          <select
            data-testid="rare-input"
            onChange={ onInputChange }
            alue={ cardRare }
            id="rare-input"
          >
            <option value="normal"> Normal</option>
            <option selected value="raro"> Raro</option>
            <option value="muito raro"> Muito Raro</option>
          </select>
        </label>
        <label htmlFor="trunfo-input">
          <input
            type="checkbox"
            checked
            data-testid="trunfo-input"
            onChange={ onInputChange }
            value={ cardTrunfo }
            id="trunfo-input"
          />
        </label>
        <button
          type="submit"
          data-testid="save-button"
          onChange={ onInputChange }
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          id="save-button"
        >
          Salvar
        </button>
      </>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
