import React from 'react';
import { Canvas } from '@react-three/fiber';
import { DoubleSide, PCFSoftShadowMap, Vector3 } from 'three';
import Character from 'entities-l/Character';
import Camera from 'entities-l/Camera';
import Dropdown from 'gui-l/Dropdown';

const Editor = () => {
	return (
		<>
			<Dropdown
				sections={[
					{
						title: 'First',
						elements: [
							<div>Ciau</div>,
							<div>ASD</div>,
							<div>LOFOL</div>,
						],
					},
				]}
				style={{ minWidth: 150, position: 'fixed', top: 10, right: 0 }}
				uniqueTitle="Test"
			/>
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
