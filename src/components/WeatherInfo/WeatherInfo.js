import React from 'react';
import PropTypes from 'prop-types';

export default class WeatherInfo extends React.Component {
  static propTypes = {
    city: PropTypes.string,
  }

  render() {
    const { city } = this.props;

    return (
      <div className="weatherInfo">Weather in: {city}</div>
    );
  }
}
