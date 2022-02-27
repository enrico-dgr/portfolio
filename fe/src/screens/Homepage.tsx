import React, { Component } from "react";

import Routes from "../components/classComponents/SinglePageRouting/Routes";
import Link from "../components/funcComponents/Link";
import ROUTES from "../constants/routes";
import Portfolio from "./Portfolio/Portfolio";
import Presentation from "./Presentation/Presentation";
import AboutMe from "./AboutMe/AboutMe";

class Homepage extends Component {
	render() {
		return (
			<div style={styleContainer}>
				<header style={styleHeader}>
					<Link to={ROUTES.HOMEPAGE.PRESENTATION}>Presentation</Link>
					<Link to={ROUTES.HOMEPAGE.PORTFOLIO}>Portfolio</Link>
					<Link to={ROUTES.HOMEPAGE.ABOUT_ME}>About me</Link>
				</header>
				<div style={{ height: styleHeader?.height }}></div>

				<Routes
					basePath={`${ROUTES.BASE}${ROUTES.HOMEPAGE.SELF}`}
					routes={[
						{
							path: ROUTES.HOMEPAGE.PRESENTATION,
							element: <Presentation />,
						},
						{
							path: ROUTES.HOMEPAGE.PORTFOLIO,
							element: <Portfolio />,
						},
						{
							path: ROUTES.HOMEPAGE.ABOUT_ME,
							element: <AboutMe />,
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
	backgroundColor: "rgba(37, 0, 63,0.95)",
	boxShadow: "1px 1px 18px rgba(37, 0, 63,0.95)",
	display: "flex",
	height: 45,
	justifyContent: "space-around",
	left: 0,
	position: "fixed",
	top: 0,
	width: "100vw",
};

export default Homepage;
