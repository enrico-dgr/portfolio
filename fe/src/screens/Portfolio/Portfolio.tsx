import { Html, OrthographicCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Component, Suspense } from "react";
import screenStyles from "../../styles/screenStyles";
import Background from "./Background/Background";
import DirectionalLight from "./DirectionalLight";

import TextBlock from "./TextBlock";

class Portfolio extends Component {
	render() {
		return (
			<Canvas
				style={screenStyles.styleContainer}
				gl={{
					powerPreference: "high-performance",
					alpha: false,
					antialias: false,
					stencil: false,
					depth: false,
				}}
			>
				<Stats
					showPanel={0} // Start-up panel (default=0)
				/>
				<OrthographicCamera position={[0, 0, 4]} />
				<ambientLight color={"white"} />
				<DirectionalLight />
				<Suspense fallback={<Html center>Loading...</Html>}>
					<Background position={[0, 0, -0.2]} renderOrder={0} />
					<TextBlock position={[-4, 0, 0]} renderOrder={10} />
				</Suspense>
			</Canvas>
		);
	}
}

export default Portfolio;
