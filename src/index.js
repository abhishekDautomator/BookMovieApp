import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';
import Login from './screens/login/Login';
import Header from './common/header/Header';

ReactDOM.render(<Login/>, document.getElementById('root'));
registerServiceWorker();
