import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ShowP extends Component {
  render() {
    const { dataId, text } = this.props;
    return (
      <p data-testid={ dataId }>{text}</p>
    );
  }
}

ShowP.defaultProps = {
  text: PropTypes.string,
};

ShowP.propTypes = {
  dataId: PropTypes.string.isRequired,
  text: PropTypes.string || PropTypes.number,
};

export default ShowP;
