import React from "react";
import * as ReactDOM from "react-dom";

// drei stats
// import { Stats } from "@react-three/drei";

// routing
import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing";

// seo
import { Helmet } from "react-helmet";

// style
import logo from "./assets/logo.png";

// global state
import { Provider } from "react-redux";
import store from "./store";

let domContainer = document.getElementById("react");
if (domContainer === null) throw new Error("dom container is null.");

ReactDOM.render(
	<Provider store={store.store}>
		{/* <Stats showPanel={0} /> */}
		<Helmet>
			<link rel="icon" href={logo} />
			<meta name="description" content="Personal site" />
		</Helmet>
		<BrowserRouter>
			<Routing />
		</BrowserRouter>
	</Provider>,
	domContainer
);
