import React, { Component } from "react";

// 3js
import { Canvas } from "@react-three/fiber";

// style
import style from "./style";
import Presentation from "../Presentation/Presentation";

class Homepage extends Component {
	render() {
		return (
			<Canvas camera={{ position: [0, 0, 3] }} style={style.container}>
				<Presentation />
			</Canvas>
		);
	}
}

export default Homepage;
