import React from 'react';
import buildNavRing from './buildNavRing';
import buildSaturnMesh from './buildSaturnMesh';

// constants
const saturnRadius = 4;
const ringMinRadius = 5.5;
const ringMaxRadius = 9.5;

// meshes
const saturnMesh = buildSaturnMesh(saturnRadius, ringMinRadius, ringMaxRadius);
const navRing = buildNavRing('Ciao');

// Component
function NavSaturn() {
	console.log('render');

	return (
		<group
			position={[0, 0, 0]}
			ref={(cur) => {
        saturnMesh.rotation.set(0.2, 0.2, 0)
				cur?.add(saturnMesh);
				cur?.add(navRing);
			}}
		></group>
	);
}

export default NavSaturn;
