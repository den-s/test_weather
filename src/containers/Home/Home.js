import React from 'react';
import { connect } from 'react-redux';

import {
  loadCurrent as getCurrentWeather,
  loadDaily as getDailyWeather
} from '../../redux/reducers/weather';

import WeatherItem from '../../components/WeatherItem/WeatherItem';
import WeatherInfo from '../../components/WeatherInfo/WeatherInfo';

import './Home.css';

import moment from 'moment';


class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      lat: null,
      lng: null
    }
    this.icoUrl= 'http://openweathermap.org/img/w/';
  }

  componentDidMount() {
    this._getLocation();
  }

  _getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords: {longitude, latitude} } = position;
        this.props.getCurrentWeather(latitude, longitude);
        this.setState({lat: latitude, lng: longitude});
      });
    }
  }

  _renderInfo = (item) => {
    return <WeatherInfo city={item.name}/>
  }

  _renderWeather = () => {
    const {weather: {item}} = this.props;
    if (item && parseInt(item.cod) === 200) {
      if (item.name) {
        return this._renderNow(item);
      } else {
        return this._renderDaily(item);
      }
    }
    return <div>Loading...</div>;
  }

  _renderDaily = (item) => {
    const date = (ts) => moment.unix(ts).format('DD.MM.YYYY');
    return <div className="weatherBlock">
      {this._renderInfo(item.city)}
      <div className="items">
        {item.list.map((item, index) => <WeatherItem
          date={date(item.dt)}
          key={index}
          max={item.temp.max}
          min={item.temp.min}
          ico={item.weather.map(item => `${this.icoUrl}${item.icon}.png`)}
          alt={item.weather.map(item => item.main)}
        />)}
      </div>
    </div>
  }

  _renderNow = (item) => {
    const date = (ts) => moment.unix(ts).format('DD.MM.YYYY');
    return <div className="weatherBlock">
      {this._renderInfo(item)}
      <div className="items">
        <WeatherItem
          date={date(item.dt)}
          temp={item.main.temp}
          max={item.main.temp_max}
          min={item.main.temp_min}
          wind={item.wind.speed}
          ico={item.weather.map(item => `${this.icoUrl}${item.icon}.png`)}
          alt={item.weather.map(item => item.main)}
        />
      </div>
    </div>
  }

  handleChangePeriod = (e) => {
    const { getCurrentWeather, getDailyWeather } = this.props;
    const { lat, lng } = this.state;

    const val = e.target.value;
    if (val === 'now') {
      getCurrentWeather(lat, lng);
    } else {
      getDailyWeather(lat, lng, val);
    }
  }

  render() {
    const {lat, lng} = this.state;
    return (
      <div className="content">
        {(lat && lng) && <select onChange={this.handleChangePeriod} defaultValue={"now"}>
          <option value="now">Now</option>
          <option value="7">1 week</option>
          <option value="14">2 weeks</option>
        </select>}
        {this._renderWeather()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentWeather: (lat, lng) => dispatch(getCurrentWeather(lat, lng)),
    getDailyWeather: (lat, lng, cnt) => dispatch(getDailyWeather(lat, lng, cnt)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
