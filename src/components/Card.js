import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ShowP from './ShowP';

class Card extends Component {
  render() {
    const returnAsNameDashCard = (nameValue) => {
      const nameSplitted = nameValue.split(/([A-Z])/);
      nameSplitted.push(nameSplitted.shift());
      const end = `-${nameSplitted.pop()}`;
      const dataName = nameSplitted.join('').toLocaleLowerCase() + end;
      return dataName;
    };

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

    const toRender = {
      cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardRare };

    return (
      <div id="coolId">
        { cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p> }

        {
          Object.values(toRender).map((e, index) => {
            const name = Object.keys(toRender)[index];
            const nameAsInfoCard = returnAsNameDashCard(name);
            return <ShowP key={ nameAsInfoCard } dataId={ nameAsInfoCard } text={ e } />;
          })
        }

        <img src={ cardImage } alt={ cardName } data-testid="image-card" />

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
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool.isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
};

export default Card;
