import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import tabReducer from './tabReducer';

export default combineReducers({
    account: accountReducer,
    tab: tabReducer,
});