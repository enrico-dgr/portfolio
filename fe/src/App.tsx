import React from 'react';

// routing
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';

// seo
import { Helmet } from 'react-helmet';

// style
import logo from 'assets-l/logo.png';

// global state
import { Provider } from 'react-redux';
import store from './store';

function App() {
  console.log('App render');
  
	return (
		<Provider store={store.store}>
			<Helmet>
				<link rel="icon" href={logo} />
				<meta name="description" content="Personal site" />
			</Helmet>
			<BrowserRouter>
				<Routing />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
