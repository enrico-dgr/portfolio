import { Navigate, useRoutes } from "react-router-dom";
import ROUTES from "./constants/routes";
import React from "react";
import Homepage from "./screens/Homepage";

const Routing = () =>
	useRoutes([
		{
			path: `${ROUTES.BASE}`,
			element: <Navigate to={`${ROUTES.BASE}${ROUTES.HOMEPAGE.SELF}`} />,
		},
		{ path: `${ROUTES.BASE}${ROUTES.HOMEPAGE.SELF}/*`, element: <Homepage /> },
	]);

export default Routing;
