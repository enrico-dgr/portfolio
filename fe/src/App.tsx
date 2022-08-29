import React from 'react';

// drei stats
import { Stats } from '@react-three/drei';

// routing
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';

// seo
import { Helmet } from 'react-helmet';

// style
import logo from './assets/logo.png';

// global state
import { Provider } from 'react-redux';
import store from './store';

function App() {
  console.log('App render');
  
	return (
		<Provider store={store.store}>
			<Stats showPanel={0} />
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
