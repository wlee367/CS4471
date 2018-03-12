import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import Base from './Base'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Base />, document.getElementById('root'));
registerServiceWorker();

