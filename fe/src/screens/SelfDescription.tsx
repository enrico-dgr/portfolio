import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Component, Suspense } from "react";
import screenStyles from "../styles/screenStyles";

class SelfDescription extends Component {
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
				<Suspense fallback={<Html>Loading...</Html>}>
					<Html
						fullscreen
						style={{
							alignItems: "start",
							color: "white",
							display: "flex",
							flexDirection: "column",
							fontWeight: "bold",
							justifyContent: "flex-start",
						}}
					>
						<div style={{ fontSize: 20, paddingLeft: 50, paddingTop: 30 }}>
							<p>Currently improving my skills in web development</p>
							<p>at React Academy in Beije.</p>
							<p>Inscribed to the Faculty of Physics in Catania,</p>
							<p>but passionate in web development.</p>
							<p>Before Beije Academy, I studied as a self-taught,</p>
							<p>learning basics of both back-end and front-end.</p>
							<p>Now I'm focusing on front-end.</p>
						</div>
						<div
							style={{
								alignItems: "end",
								display: "flex",
								flexDirection: "column",
								fontSize: 18,
								justifyContent: "start",
								marginTop: 40,
								width: "100%",
							}}
						>
							<div style={{ paddingRight: 40, textAlign: "right" }}>
								<p style={{ fontSize: 20 }}>
									If you're curious about the technologies used for this site,
								</p>
								<p>for now it is highly dependent on...</p>
								<p>Typescript -- React (.tsx) -- react-router-dom</p>
								<p>@react-three/fiber -- @react-spring/three</p>
							</div>
						</div>
					</Html>
				</Suspense>
			</Canvas>
		);
	}
}

export default SelfDescription;
