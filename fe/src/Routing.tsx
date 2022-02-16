import { Route, Routes } from "react-router-dom";

import React from "react";
import Homepage from "./screens/Homepage";

const Routing = () => {
	return (
		<Routes>
			<Route path="" element={<Homepage />} />
		</Routes>
	);
};

export default Routing;
