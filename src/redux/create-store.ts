// @ts-ignore
import {applyMiddleware, createStore as _createStore} from "redux";
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import reducer from './index';

const createStore = (history: any, data: any): any => {
    const reduxRouterMiddleware = routerMiddleware(history);
    const middleware = [thunk, reduxRouterMiddleware];

    const finalCreateStore = applyMiddleware(...middleware)(_createStore);

    const store = finalCreateStore(reducer, data);
    return store;

};

export default createStore;
