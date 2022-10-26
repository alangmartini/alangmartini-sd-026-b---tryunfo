import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Card extends Component {
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
      isPreview,
      handleDeleteCard,
    } = this.props;

    const showTrunfo = (bool) => {
      if (bool) {
        return <p data-testid="trunfo-card">Super Trunfo</p>;
      }
    };

    return (
      <div id="coolId">
        { showTrunfo(cardTrunfo) }
        <p
          data-testid="name-card"
          id="name-card"
        >
          { cardName }
        </p>
        <img src={ cardImage } alt={ cardName } data-testid="image-card" />
        <p
          data-testid="description-card"
          id="description-card"
        >
          { cardDescription }
        </p>

        <p
          type="number"
          data-testid="attr1-card"
          id="attr1-card"
        >
          { cardAttr1 }
        </p>

        <p
          type="number"
          data-testid="attr2-card"
          id="attr2-card"
        >
          { cardAttr2 }
        </p>

        <p
          type="number"
          data-testid="attr3-card"
          id="attr3-card"
        >
          { cardAttr3 }
        </p>

        <p
          data-testid="rare-card"
          id="rare-card"
        >
          { cardRare }
        </p>

        { !isPreview && (
          <button
            type="submit"
            data-testid="delete-button"
            onClick={ () => handleDeleteCard(cardName) }
          >
            Excluir
          </button>)}

      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool.isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
};

export default Card;
