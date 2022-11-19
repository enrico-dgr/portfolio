import React from 'react';
import { Canvas } from '@react-three/fiber';
import { DoubleSide, PCFSoftShadowMap, Vector3 } from 'three';
import Character from 'entities-l/Character';
import Camera from 'entities-l/Camera';

const Editor = () => {
	return (
		<>
			<Canvas
				camera={{
					fov: 50,
					aspect: window.innerWidth / window.innerHeight,
					near: 1,
					far: 10000,
					position: [0, 15, 15],
				}}
				className="canvas__container"
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
					position: 'fixed',
				}}
			>
				<spotLight
					{...{
						castShadow: true,
						color: 0xffffff,
						intensity: 1,
						position: [0, 20, 40],
					}}
				/>
				<Camera position={new Vector3(0, 4, 15)} />
				<Character />
			</Canvas>
		</>
	);
};

export default Editor;
