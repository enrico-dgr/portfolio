import React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

let domContainer = document.getElementById('react');
if (domContainer === null) throw new Error('dom container is null.');

ReactDOM.render(<App />, domContainer);
