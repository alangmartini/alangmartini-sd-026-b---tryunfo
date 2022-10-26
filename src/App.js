import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  initialState = {
    cardName: '',
    cardDescription: '',
    cardAttr1: 0,
    cardAttr2: 0,
    cardAttr3: 0,
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
  };

  constructor() {
    super();

    this.state = {
      ...this.initialState,
      storedCards: [],
    };
  }

  validateButtonText = () => {
    const { cardName, cardDescription, cardImage, cardRare } = this.state;
    return !(!cardName.length
      || !cardDescription.length
      || !cardImage.length
      || !cardRare.length
    );
  };

  validateButtonAttr = () => {
    let { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    cardAttr1 = Number(cardAttr1);
    cardAttr2 = Number(cardAttr2);
    cardAttr3 = Number(cardAttr3);
    const sumAttrLimit = 210;
    if (cardAttr1 + cardAttr2 + cardAttr3 > sumAttrLimit) return false;

    const singleAttrLimit = 90;
    if (cardAttr1 > singleAttrLimit
      || cardAttr2 > singleAttrLimit
      || cardAttr3 > singleAttrLimit) return false;

    return !(cardAttr1 < 0
        || cardAttr2 < 0
        || cardAttr3 < 0);
  };

  validateButton = () => {
    if (!this.validateButtonAttr() || !this.validateButtonText()) {
      this.setState({ isSaveButtonDisabled: true });
      return;
    }
    this.setState({ isSaveButtonDisabled: false });
  };

  onInputChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [target.name]: value }, () => {
      this.validateButton();
    });
  };

  isSuperTrunfoPresent = () => {
    const { storedCards } = this.state;
    this.setState({ hasTrunfo: storedCards.some((card) => card.cardTrunfo) });
  };

  onSaveButtonClick = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      storedCards,
    } = this.state;

    const card = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    this.setState({
      ...this.initialState,
      storedCards: [...storedCards, card],
    }, () => {
      this.isSuperTrunfoPresent();
    });
  };

  handleDeleteCard = (cardName) => {
    const { storedCards } = this.state;
    const filteredStoredCards = storedCards
      .filter((card) => card.cardName !== cardName);
    this.setState(
      { storedCards: filteredStoredCards },
      () => this.isSuperTrunfoPresent(),
    );
  };

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
      storedCards,
    } = this.state;
    return (
      <div>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isPreview
        />
        {
          storedCards.map((carta) => (
            <Card
              key={ carta.cardName }
              cardName={ carta.cardName }
              cardDescription={ carta.cardDescription }
              cardAttr1={ carta.cardAttr1 }
              cardAttr2={ carta.cardAttr2 }
              cardAttr3={ carta.cardAttr3 }
              cardImage={ carta.cardImage }
              cardRare={ carta.cardRare }
              cardTrunfo={ carta.cardTrunfo }
              isPreview={ false }
              handleDeleteCard={ this.handleDeleteCard }
            />
          ))
        }
      </div>
    );
  }
}

export default App;
