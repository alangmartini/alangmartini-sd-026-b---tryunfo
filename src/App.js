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
    filterName: '',
    filterRarity: '',
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
    return value;
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

  filterCards = () => {
    const { storedCards, filterName, filterRarity } = this.state;
    const arrayOfFilters = [];
    if (filterName) arrayOfFilters.push(filterName);
    if (filterRarity) arrayOfFilters.push(filterRarity);
    const applyFilter = storedCards
      .filter((card) => {
        const toCompare = card.cardName.split(' ');
        return toCompare.some((word) => arrayOfFilters.includes(word));
      });
    console.log(applyFilter);
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
      filterName,
      filterRarity,
    } = this.state;

    const arrayToRender = () => {
      const filteredStoredCards = this.filterCards();
      if (filterName || filterRarity) return filteredStoredCards;
      return storedCards;
    };

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
        <input
          type="text"
          data-testid="name-filter"
          name="filterName"
          value={ filterName }
          onChange={ this.filterCards }
        />
        <select
          data-testid="rare-input"
          onChange={ this.onInputChange }
          value={ filterRarity }
          name="filterRarity"
        >
          <option value="normal"> Normal</option>
          <option selected value="raro"> Raro</option>
          <option value="muito raro"> Muito Raro</option>
        </select>
        {
          arrayToRender().map((carta) => (
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
