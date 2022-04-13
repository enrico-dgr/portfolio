import React, { Component, ReactNode } from "react";

enum Selectors {
	"hover",
}

type Props = typeof Span.defaultProps & {
	children: ReactNode;
	selectors: {
		selector: keyof typeof Selectors;
		style: React.CSSProperties;
	}[];
	style: React.CSSProperties;
};

type State = {
	selectors: { [key in keyof typeof Selectors]: boolean };
	style: React.CSSProperties;
};

class Span extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			selectors: { hover: false },
			style: this.props.style,
		};
	}

	static defaultProps = {
		selectors: {},
		style: {},
	};

	applyStyle = () => {
		let style: React.CSSProperties = this.props.style;
		const selectors = this.props.selectors;

		for (let i = 0; i < selectors.length; i++) {
			const selector = selectors[i].selector;

			if (this.state.selectors[selector]) {
				style = { ...style, ...selectors[i].style };
			}
		}

		this.setState({ style });
	};

	componentDidUpdate = (_prevProps: Props, prevState: State) => {
		if (this.state.selectors !== prevState.selectors) {
			this.applyStyle();
		}
	};

	onMouseEnter = () => {
		this.setState({ selectors: { ...this.state.selectors, hover: true } });
	};
	onMouseLeave = () => {
		this.setState({ selectors: { ...this.state.selectors, hover: false } });
	};

	render() {
		return (
			<span
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				style={this.state.style}
			>
				{this.props.children}
			</span>
		);
	}
}

export default Span;
