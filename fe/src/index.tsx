import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing";

import store from "./store";

let domContainer = document.getElementById("react");
if (domContainer === null) throw new Error("dom container is null.");

ReactDOM.render(
	<Provider store={store.store}>
		<BrowserRouter basename="/">
			<Routing />
		</BrowserRouter>
	</Provider>,
	domContainer
);
