import config from '../../config/index.js';

const LOAD = 'weather/LOAD';
const LOAD_SUCCESS = 'weather/LOAD_SUCCESS';
const LOAD_FAIL = 'weather/LOAD_FAIL';


const CURRENT = 'weather';
const DAILY = 'forecast/daily';

const initialState = {
  loaded: false,
  loading: false,
  item: null,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function loadCurrent(lat, lng) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`${CURRENT}?units=metric&lat=${lat}&lon=${lng}&appid=${config.API_KEY}`)
  };
}

export function loadDaily(lat, lng, cnt) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`${DAILY}?units=metric&lat=${lat}&lon=${lng}&cnt=${cnt}&appid=${config.API_KEY}`)
  };
}
