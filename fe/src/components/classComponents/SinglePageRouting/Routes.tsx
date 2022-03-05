import React, { Component } from "react";
import Route from "./Route";

import ExtractComponentProps from "../../../types/ExtractComponentProps";
import { animateScroll } from "./animateScroll";
import { addListener, removeListener } from "./scroll";

type PropsRoute = ExtractComponentProps<typeof Route>;

type Props = {
	basePath: string;
	routes: PropsRoute[];
};

type State = {
	absolutePath: string;
	mappedRoutes: { absolutePath: string; div: HTMLDivElement }[];
};

class Routes extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.refScrollableContainer = React.createRef<HTMLDivElement>();

		this.state = {
			absolutePath: this.props.basePath,
			mappedRoutes: [],
		};
	}

	refScrollableContainer;

	scrollToPathname = (pathname: string) => {
		// find element to scroll to
		const div = this.state.mappedRoutes.find((r) =>
			r.absolutePath.includes(pathname)
		)?.div;

		if (!!div && !!this.refScrollableContainer.current) {
			animateScroll({
				targetElement: div,
				containerElement: this.refScrollableContainer.current,
				duration: 1000,
			});
		}
	};

	componentDidMount = () => {
		addListener(this.scrollToPathname);
	};

	shouldComponentUpdate = () => {
		return false;
	};

	addRouteToState = (path: string) => (div: HTMLDivElement) => {
		const newRoute = {
			absolutePath: `${this.props.basePath}/${path}`,
			div,
		};

		this.setState((ps) => ({
			mappedRoutes: [...ps.mappedRoutes, newRoute],
		}));
	};

	componentWillUnmount = () => {
		removeListener(this.scrollToPathname);
	};

	render() {
		return (
			<div style={styleContainer} ref={this.refScrollableContainer}>
				<div style={styleList}>{this.props.routes.map(this.mapRoutes)}</div>
			</div>
		);
	}

	mapRoutes = (route: PropsRoute, i: number) => (
		<Route
			key={this.props.basePath + i + route.path}
			{...route}
			componentDidMount={this.addRouteToState(route.path)}
		/>
	);
}

const styleContainer: React.HTMLAttributes<HTMLDivElement>["style"] = {
	border: 0,
	height: "100%",
	margin: 0,
	overflowY: "auto",
	padding: 0,
	width: "100%",
};

const styleList: React.HTMLAttributes<HTMLDivElement>["style"] = {
	display: "flex",
	flexDirection: "column",
	height: "min-content",
};

export default Routes;
