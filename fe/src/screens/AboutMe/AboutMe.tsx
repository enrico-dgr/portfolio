import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import screenStyles from "../../styles/screenStyles";
import Text from "./Text";

const AboutMe = () => {
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
			<Suspense fallback={<Html>Loading...</Html>}>
				<Text />
			</Suspense>
		</Canvas>
	);
};

export default AboutMe;
