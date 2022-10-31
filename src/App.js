import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  initialState = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    filterName: '',
    filterRarity: '',
    filterTrunfo: false,
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
    if (filterRarity === 'todas') return storedCards;
    let applyFilter;
    if (filterName) {
      applyFilter = storedCards
        .filter((card) => card.cardName.split(' ').includes(filterName));
    }
    if (filterRarity) {
      applyFilter = storedCards
        .filter((card) => card.cardRare === filterRarity);
    }
    return applyFilter;
  };

  filterTrunfo = () => {
    const { storedCards } = this.state;
    return storedCards.filter((card) => card.cardTrunfo);
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
      filterTrunfo,
    } = this.state;

    const arrayToRender = () => {
      if (filterTrunfo) return this.filterTrunfo();
      if (filterName || filterRarity) return this.filterCards();
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
          onChange={ this.onInputChange }
          disabled={ filterTrunfo }
        />
        <select
          data-testid="rare-filter"
          onChange={ this.onInputChange }
          value={ filterRarity }
          name="filterRarity"
          disabled={ filterTrunfo }
        >
          <option value="normal"> Normal</option>
          <option value="raro"> Raro</option>
          <option value="muito raro"> Muito Raro</option>
          <option value="todas"> Todas</option>
        </select>
        <label htmlFor="trunfo-input">
          <input
            type="checkbox"
            data-testid="trunfo-filter"
            onChange={ this.onInputChange }
            name="filterTrunfo"
            checked={ filterTrunfo }
          />
        </label>
        {
          arrayToRender().map((carta) => (
            <Card
              key={ carta.cardName }
              { ...carta }
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
