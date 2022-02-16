import React, { Component } from "react";

class SelfDescription extends Component {
	render() {
		return <div style={styleContainer}>SelfDescription</div>;
	}
}

const styleContainer: React.HTMLAttributes<HTMLDivElement>["style"] = {
	height: 300,
	width: "100%",
};

export default SelfDescription;
