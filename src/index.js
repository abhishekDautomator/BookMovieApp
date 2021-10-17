import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';
import Login from './screens/login/Login';
import Header from './common/header/Header';
import etails from './screens/home/Home';
import Details from './screens/details/Details';

ReactDOM.render(<Details/>, document.getElementById('root'));
registerServiceWorker();
