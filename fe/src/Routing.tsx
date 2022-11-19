import { Navigate, useRoutes } from "react-router-dom";
import ROUTES from "./constants/routes";
import React from "react";
import Homepage from "./screens/homepage/Homepage";
import Home from "./screens/home/Home";
import Editor from "./screens/Editor";

const Routing = () =>
	useRoutes([
		{
			path: `${ROUTES.BASE}`,
			element: <Navigate to={`${ROUTES.HOME.SELF}`} />,
		},
		{ path: `${ROUTES.HOME.SELF}/*`, element: <Home /> },
		{ path: `${ROUTES.EDITOR.SELF}/*`, element: <Editor /> },
		{ path: `${ROUTES.BASE}${ROUTES.HOMEPAGE.SELF}/*`, element: <Homepage /> },
	]);

export default React.memo(Routing);
