import React, {Component} from 'react';
import { createBrowserHistory } from 'history';
import {Provider} from 'react-redux';
import createStore from './redux/create-store';
import Main from './Main';
import './index.css';

const history = createBrowserHistory();
const store = createStore(history, (window as any).__INITIAL_STATE__);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Main history={history}/>
            </Provider>
        );
    }
}

export default App;
