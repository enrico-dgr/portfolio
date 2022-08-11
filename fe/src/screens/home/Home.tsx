import React, { Suspense } from 'react';

// three
import { Html, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { DoubleSide, PCFSoftShadowMap, Vector3 } from 'three';

// dat.gui
import datGui from '../../utils/dat-gui';

// components
import NavSaturn from '../../components/funcComponents/navSaturn/NavSaturn';

// style
import screenStyles from '../../styles/screenStyles';

const configs = {
	castShadow: true,
	color: 0xffffff,
	intensity: 1,
	position: new Vector3(80, -5, 100),
};

const Home = () => {
	return (
		<Canvas
			camera={{
				position: [0, 0, 150],
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
			<spotLight
				{...configs}
				ref={(cur) => {
					if (cur) {
						cur.shadow.blurSamples = 32;
						datGui((gui) => {
							const folder = gui.addFolder('Home');
							folder
								.add(configs, 'intensity', 0, 1)
								.onChange((v) => (cur.intensity = v));
							folder
								.addColor(configs, 'color')
								.onChange((v) => cur.color.set(v));

							const positionFolder = folder.addFolder('position');
							positionFolder
								.add(configs.position, 'x', -200, 200)
								.onChange((v) => cur.position.setX(v));
							positionFolder
								.add(configs.position, 'y', -200, 200)
								.onChange((v) => cur.position.setY(v));
							positionFolder
								.add(configs.position, 'z', -200, 200)
								.onChange((v) => cur.position.setZ(v));
						});
					}
				}}
			/>
			<NavSaturn />
		</Canvas>
	);
};

export default React.memo(Home);
