import React from 'react';
import PropTypes from 'prop-types';

import './WeatherItem.css';

export default class WeatherItem extends React.Component {
  static propTypes = {
    ico: PropTypes.array,
    alt: PropTypes.array,
    temp: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    wind: PropTypes.number,
    date: PropTypes.string,
  }

  render() {
    const { temp, min, max, wind, ico, alt, date } = this.props;
    return (
      <div className="WeatherItem">
        <p>Date: {date}</p>
        {temp && <p>Temp: {temp}&deg;</p>}
        <p>Min: {min}&deg; <br/> Max: {max}</p>
        {wind && <p>Wind: {wind} m/s</p>}
        <p><img src={ico} alt={alt}/></p>
      </div>
    );
  }
}
