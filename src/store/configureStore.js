import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../redux/reducers'
import logger from 'redux-logger'
import clientMiddleware from '../redux/middleware/clientMiddleware'
import client from '../helpers/apiClient.js';


export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(clientMiddleware(client), logger))

  if (module.hot) {
    module.hot.accept('../redux/reducers', () => {
      const nextRootReducer = require('../redux/reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
