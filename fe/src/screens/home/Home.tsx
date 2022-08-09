import { Html, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { DoubleSide, PCFSoftShadowMap } from 'three';
import NavSaturn from '../../components/funcComponents/navSaturn/NavSaturn';
import screenStyles from '../../styles/screenStyles';

const Home = () => {
	return (
		<Canvas
			camera={{
				position: [-20, 40, 150],
				isPerspectiveCamera: true,
				aspect: window.innerWidth / window.innerHeight,
				fov: 10,
			}}
			gl={{
				antialias: true,
				shadowMap: {
					type: PCFSoftShadowMap,
					autoUpdate: true,
					enabled: true,
					needsUpdate: true,
					render: () => undefined,
					cullFace: DoubleSide,
				},
			}}
			shadows
			style={screenStyles.styleContainer}
		>
			<Suspense fallback={<Html center>Loading...</Html>}></Suspense>
			<OrbitControls />
			<directionalLight
				castShadow={true}
				color={0xffffff}
				intensity={1}
				position={[80, 10, 100]}
				ref={(cur) => {
					if (!!cur?.shadow) {
						cur.shadow.camera.far = 1000;
						// cur.shadow.mapSize.set(4096, 2048);
						cur.shadow.camera.top = 200;
						cur.shadow.camera.bottom = -200;
						cur.shadow.camera.right = 200;
						cur.shadow.camera.left = -200;
						cur.shadow.blurSamples = 32;
					}
				}}
			/>
			<NavSaturn />
		</Canvas>
	);
};

export default React.memo(Home);
