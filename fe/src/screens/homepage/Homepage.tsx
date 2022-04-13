import React, { Component } from "react";

import { Routes } from "../../components/classComponents/SinglePageRouting";
import Link from "../../components/funcComponents/Link";
import ROUTES from "../../constants/routes";
import Portfolio from "../Portfolio/Portfolio";
import Presentation from "../Presentation/Presentation";
import AboutMe from "../AboutMe/AboutMe";
import style from "./style";

class Homepage extends Component {
	render() {
		return (
			<div style={style.container}>
				<header style={style.header}>
					<Link to={ROUTES.HOMEPAGE.PRESENTATION}>Presentation</Link>
					<Link to={ROUTES.HOMEPAGE.PORTFOLIO}>Portfolio</Link>
					<Link to={ROUTES.HOMEPAGE.ABOUT_ME}>About me</Link>
				</header>
				<div style={{ height: style.header?.height }}></div>

				<Routes
					basePath={`${ROUTES.BASE}${ROUTES.HOMEPAGE.SELF}`}
					classNameContainer={"no-scrollbar"}
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

export default Homepage;
