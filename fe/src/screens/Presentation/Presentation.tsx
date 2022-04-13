import React, { Component, Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import { Html as DreiHtml } from "@react-three/drei";
import screenStyles from "../../styles/screenStyles";
import Html from "./Html";
import Background from "./Background";
import CursorAnimation from "./CursorAnimation";

class Presentation extends Component {
	constructor(props: {}) {
		super(props);
	}

	render() {
		return (
			<Canvas
				style={screenStyles.styleContainer}
				camera={{ position: [0, 0, 3] }}
				gl={{
					powerPreference: "high-performance",
					alpha: false,
					antialias: false,
					stencil: false,
					depth: false,
				}}
			>
				<ambientLight intensity={0.1} />
				<directionalLight color="red" position={[0, 0, 5]} />
				<Suspense fallback={<DreiHtml center>Loading...</DreiHtml>}>
					<Html />
					<Background />
					<CursorAnimation />
				</Suspense>
			</Canvas>
		);
	}
}

export default Presentation;
