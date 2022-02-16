import React, { Component } from "react";

class Presentation extends Component {
	render() {
		return <div style={styleContainer}>Presentation</div>;
	}
}

const styleContainer: React.HTMLAttributes<HTMLDivElement>["style"] = {
	height: 400,
	width: "100%",
};

export default Presentation;
