import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
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

    const showTrunfo = (bool) => {
      if (!bool) {
        return (
          <label htmlFor="trunfo-input">
            <input
              type="checkbox"
              data-testid="trunfo-input"
              onChange={ onInputChange }
              value={ cardTrunfo }
              id="trunfo-input"
              name="cardTrunfo"
              checked={ cardTrunfo }
            />
          </label>
        );
      }
      return <p data-testid="trunfo-input">Você já tem um Super Trunfo em seu baralho</p>;
    };
    return (
      <>
        <label htmlFor="name-input">
          <input
            type="text"
            data-testid="name-input"
            onChange={ onInputChange }
            value={ cardName }
            id="name-input"
            name="cardName"
          />
        </label>
        <label htmlFor="description-input">
          <textarea
            data-testid="description-input"
            onChange={ onInputChange }
            value={ cardDescription }
            id="description-input"
            name="cardDescription"
          />
        </label>
        <label htmlFor="attr1-input">
          <input
            type="number"
            data-testid="attr1-input"
            onChange={ onInputChange }
            value={ cardAttr1 }
            id="attr1-input"
            name="cardAttr1"
          />
        </label>
        <label htmlFor="attr2-input">
          <input
            type="number"
            data-testid="attr2-input"
            onChange={ onInputChange }
            value={ cardAttr2 }
            id="attr2-input"
            name="cardAttr2"
          />
        </label>
        <label htmlFor="attr3-input">
          <input
            type="number"
            data-testid="attr3-input"
            onChange={ onInputChange }
            value={ cardAttr3 }
            id="attr3-input"
            name="cardAttr3"
          />
        </label>
        <label htmlFor="image-input">
          <input
            type="text"
            data-testid="image-input"
            onChange={ onInputChange }
            value={ cardImage }
            id="image-input"
            name="cardImage"
          />
        </label>
        <label htmlFor="rare-input">
          <select
            data-testid="rare-input"
            onChange={ onInputChange }
            value={ cardRare }
            id="rare-input"
            name="cardRare"
          >
            <option value="normal"> Normal</option>
            <option selected value="raro"> Raro</option>
            <option value="muito raro"> Muito Raro</option>
          </select>
        </label>
        { showTrunfo(hasTrunfo) }
        <button
          type="submit"
          disabled={ isSaveButtonDisabled }
          data-testid="save-button"
          onChange={ onInputChange }
          onClick={ onSaveButtonClick }
          id="save-button"
          name="save-button"
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
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
