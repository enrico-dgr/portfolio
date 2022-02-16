import React, { Component } from "react";

import Routes from "../components/classComponents/SinglePageRouting/Routes";
import Link from "../components/funcComponents/Link";
import ROUTES from "../constants/routes";
import Portfolio from "./Portfolio";
import Presentation from "./Presentation";
import SelfDescription from "./SelfDescription";

class Homepage extends Component {
	render() {
		return (
			<div style={styleContainer}>
				<header style={styleHeader}>
					<Link to={""}>Home</Link>
					<Link to={"presentation"}>Presentation</Link>
					<Link to={"portfolio"}>Portfolio</Link>
				</header>
				<div style={{ height: styleHeader?.height }}></div>

				<Routes
					basePath={`${ROUTES.BASE}${ROUTES.HOMEPAGE}`}
					path={location.pathname}
					routes={[
						{
							path: "presentation",
							element: <Presentation />,
						},
						{
							path: "portfolio",
							element: <Portfolio />,
						},
						{
							path: "self-description",
							element: <SelfDescription />,
						},
					]}
				/>
			</div>
		);
	}
}

const styleContainer: React.HTMLAttributes<HTMLDivElement>["style"] = {
	height: "100vh",
	left: 0,
	position: "fixed",
	top: 0,
	width: "100vw",
};

const styleHeader: React.HTMLAttributes<HTMLHeadingElement>["style"] = {
	alignItems: "center",
	backgroundColor: "darkblue",
	display: "flex",
	height: 45,
	justifyContent: "space-around",
	left: 0,
	position: "fixed",
	top: 0,
	width: "100vw",
};

export default Homepage;
