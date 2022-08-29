import { Navigate, useRoutes } from "react-router-dom";
import ROUTES from "./constants/routes";
import React from "react";
import Homepage from "./screens/homepage/Homepage";
import Home from "./screens/home/Home";

const Routing = () =>
	useRoutes([
		{
			path: `${ROUTES.BASE}`,
			element: <Navigate to={`${ROUTES.BASE}${ROUTES.HOME.SELF}`} />,
		},
		{ path: `${ROUTES.BASE}${ROUTES.HOME.SELF}/*`, element: <Home /> },
		{ path: `${ROUTES.BASE}${ROUTES.HOMEPAGE.SELF}/*`, element: <Homepage /> },
	]);

export default React.memo(Routing);
