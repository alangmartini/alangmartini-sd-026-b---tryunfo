import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: '',
      cardTrunfo: '',
      hasTrunfo: false,
      isSaveButtonDisabled: true,

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
    console.log(this.state);
    const { target } = event;
    console.log(target.name);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [target.name]: value }, () => {
      this.validateButton();
    });
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
          onSaveButtonClick={ cardName }
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
        />
      </div>
    );
  }
}

export default App;
