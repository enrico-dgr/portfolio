import React from 'react';
import buildSaturnMesh from './buildSaturnMesh';

// constants
const saturnRadius = 4;
const ringMinRadius = 5.5;
const ringMaxRadius = 9.5;

// meshes
const saturnMesh = buildSaturnMesh(saturnRadius, ringMinRadius, ringMaxRadius);

// Component
function NavSaturn() {
	console.log('render');

	return (
		<group
			position={[0, 0, 0]}
			ref={(cur) => {
				cur?.add(saturnMesh);
			}}
		></group>
	);
}

export default NavSaturn;
