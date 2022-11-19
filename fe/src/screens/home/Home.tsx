import React, { Suspense } from 'react';

// drei stats
import { Stats } from '@react-three/drei';

// three
import { Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { DoubleSide, PCFSoftShadowMap, Vector3 } from 'three';

// dat.gui
// import datGui from '../../utils/dat-gui';

// components
import NavSaturn from 'entities-l/navSaturn/NavSaturn';

// style
import screenStyles from '../../styles/screenStyles';
import Player from 'entities-l/Player';
import Menu from 'entities-l/Menu';
import PLController from 'controllers-l/PointerLockController';

const lightConfigs = {
	castShadow: true,
	color: 0xffffff,
	intensity: 1,
	position: new Vector3(80, -5, 100),
};

const Home = () => {
	console.log('Home render');
	return (
		<>
			<Stats showPanel={0} />
			<Menu />
			<Canvas
				camera={{
					fov: 50,
					aspect: window.innerWidth / window.innerHeight,
					near: 1,
					far: 10000,
				}}
				gl={{
					antialias: true,
					pixelRatio: 1.1,
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
				style={{
					...screenStyles.styleContainer,
					position: 'fixed',
					top: 0,
					left: 0,
				}}
			>
				<Suspense fallback={<Html center>Loading...</Html>}>
					<spotLight
						{...lightConfigs}
						ref={(cur) => {
							if (cur) {
								cur.shadow.blurSamples = 32;
								// datGui.develop((gui) => {
								// 	const folder = gui.addFolder('Home');
								// 	folder
								// 		.add(lightConfigs, 'intensity', 0, 1)
								// 		.onChange((v) => (cur.intensity = v));
								// 	folder
								// 		.addColor(lightConfigs, 'color')
								// 		.onChange((v) => cur.color.set(v));

								// 	const positionFolder =
								// 		folder.addFolder('position');
								// 	positionFolder
								// 		.add(
								// 			lightConfigs.position,
								// 			'x',
								// 			-200,
								// 			200,
								// 		)
								// 		.onChange((v) => cur.position.setX(v));
								// 	positionFolder
								// 		.add(
								// 			lightConfigs.position,
								// 			'y',
								// 			-200,
								// 			200,
								// 		)
								// 		.onChange((v) => cur.position.setY(v));
								// 	positionFolder
								// 		.add(
								// 			lightConfigs.position,
								// 			'z',
								// 			-200,
								// 			200,
								// 		)
								// 		.onChange((v) => cur.position.setZ(v));
								// });
							}
						}}
					/>
					<NavSaturn />
					<PLController />
					<Player />
				</Suspense>
			</Canvas>
		</>
	);
};

export default React.memo(Home);
