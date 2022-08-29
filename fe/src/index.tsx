import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

let domContainer = document.getElementById('react');
if (domContainer === null) throw new Error('dom container is null.');

const root = createRoot(domContainer);
root.render(<App />);
