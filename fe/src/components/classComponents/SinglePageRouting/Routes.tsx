import React, { Component } from "react";
import Route, { Props as RouteProps } from "./Route";

type Props = {
	basePath: string;
	path: string;
	routes: RouteProps[];
};

class Routes extends Component<Props> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div style={styleContainer}>
				<div style={styleList}>{this.props.routes.map(this.mapRoutes)}</div>
			</div>
		);
	}

	mapRoutes = (route: RouteProps, i: number) => (
		<Route key={this.props.basePath + i + route.path} {...route} />
	);
}

const styleContainer: React.HTMLAttributes<HTMLDivElement>["style"] = {
	height: "100%",
	overflowY: "auto",
	width: "100%",
};

const styleList: React.HTMLAttributes<HTMLDivElement>["style"] = {
	display: "flex",
	flexDirection: "column",
	height: "min-content",
};

export default Routes;
