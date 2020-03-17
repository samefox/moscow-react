import { combineReducers, createStore } from 'redux';
import clients from './clients/reducers';

export default createStore(combineReducers({
    clients
}));
