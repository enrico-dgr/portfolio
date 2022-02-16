import { Component, ReactNode } from "react";

export type Props = {
	path: string;
	element: ReactNode;
};

class Route extends Component<Props> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render() {
		return this.props.element;
	}
}

export default Route;
