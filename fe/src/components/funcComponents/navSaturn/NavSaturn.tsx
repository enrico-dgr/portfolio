import React from 'react';
import { Vector3 } from 'three';
import buildNavRing from './buildNavRing';
import buildSaturnMesh from './buildPlanet';

// constants
const saturnRadius = 4;
const ringMinRadius = 5.5;
const ringMaxRadius = 9.5;

// meshes
const saturnMesh = buildSaturnMesh(saturnRadius);
const navRing = buildNavRing(
	['School', 'Career', 'Skills'],
	ringMinRadius,
	ringMaxRadius,
);

// Component
function NavSaturn() {
	console.log('render');

	return (
		<group
			onWheel={(e) => {
				let angle = 0.07;

				if (e.nativeEvent.deltaY < 0) {
					angle *= -1;
				}
				navRing.rotateOnAxis(new Vector3(0, 0, 1), angle);
			}}
			position={[0, 0, 0]}
			ref={(cur) => {
				cur?.add(saturnMesh);
				cur?.add(navRing);
			}}
		></group>
	);
}

export default NavSaturn;
