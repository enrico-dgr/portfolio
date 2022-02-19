import React, { Component, ReactNode } from "react";

type RouteProps = typeof Route.defaultProps & {
	componentDidMount: (_div: HTMLDivElement) => void;
	element: ReactNode;
	path: string;
};

class Route extends Component<RouteProps, {}> {
	constructor(props: RouteProps) {
		super(props);

		this.myRef = React.createRef<HTMLDivElement>();
		this.state = {};
	}

	static defaultProps = {
		componentDidMount: (_div: HTMLDivElement) => {},
	};

	myRef;

	componentDidMount = () => {
		if (!!this.myRef.current) {
			this.props.componentDidMount(this.myRef.current);
		}
	};

	render() {
		return <div ref={this.myRef}>{this.props.element}</div>;
	}
}

export default Route;
