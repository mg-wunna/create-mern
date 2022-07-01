import { legacy_createStore as createStore, combineReducers } from 'redux';
import appReducer from './stores/app.store';

const store = createStore(
  combineReducers({
    app: appReducer
  })
);

export default store;
