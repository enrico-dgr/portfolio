import React, { Component } from "react";

class Portfolio extends Component {
	render() {
		return <div style={styleContainer}>Portfolio</div>;
	}
}

const styleContainer: React.HTMLAttributes<HTMLDivElement>["style"] = {
	height: 300,
	width: "100%",
};

export default Portfolio;
