import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Lefe from './pages/demo/Life';
import Admin from './admin';
// import Router from './pages/router_demo/router3/router'
import Router from './router'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
