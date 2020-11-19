import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'reducers';
import rootSaga from 'sagas';


const bindMiddlewares = middlewares => {
  if (process.env.NODE_ENV !== 'production') {
    const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
    return composeWithDevTools(applyMiddleware(...middlewares));
  }
  return applyMiddleware(...middlewares);
  // for the production mode to prevent users see the state
};

const makeConfiguredStore = (reducer, initialState, middlewares) => createStore(reducer, initialState, bindMiddlewares(middlewares));

export const initStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewaresArray = process.env.NODE_ENV !== 'production' ? [sagaMiddleware] : [sagaMiddleware];
  const store = makeConfiguredStore(rootReducer, initialState, middlewaresArray);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
