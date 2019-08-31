import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap-css-only/css/bootstrap.min.css';
import "./assets/theme.scss";
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
