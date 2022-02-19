import React, { Component } from "react";
import Route from "./Route";

import ExtractComponentProps from "../../../types/ExtractComponentProps";

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
			absolutePath: location.pathname,
			mappedRoutes: [],
		};
	}

	refScrollableContainer;

	shouldComponentUpdate = () => {
		if (this.state.absolutePath !== location.pathname) {
			return true;
		}

		return false;
	};

	componentDidUpdate = (_prevProps: Props, _prevState: State) => {
		// changed location.pathname
		if (
			this.state.absolutePath !== location.pathname &&
			!!this.refScrollableContainer.current
		) {
			const div = this.state.mappedRoutes.find(
				(r) => r.absolutePath === location.pathname
			)?.div;

			if (!!div) {
				div.scrollIntoView({ behavior: "smooth", inline: "start" });

				this.setState({ absolutePath: location.pathname });
			}
		}
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