// @ts-ignore
import {combineReducers} from 'redux';
import {routerReducer} from "react-router-redux";
import auth from './auth';
import uploads from './uploads';
import dish from './dish';
import documents from './documents';
import payments from './payments';
import chef from './chef';
import cart from './cart';
import order from './order';
import address from './address';

const rootReducer = combineReducers({
    routing: routerReducer,
    auth,
    address,
    uploads,
    dish,
    documents,
    payments,
    chef,
    cart,
    order
});

export default rootReducer


