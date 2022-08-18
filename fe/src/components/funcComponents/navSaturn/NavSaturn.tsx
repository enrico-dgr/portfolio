import { ThreeEvent } from '@react-three/fiber';
import React from 'react';
import { Euler, Group } from 'three';
import NavRing from './NavRing';
import Planet from './Planet';

function NavSaturn() {
	console.log('render');

	const ref = React.useRef<Group>(null);
	const [ringRotation, set] = React.useState(new Euler(3.14 * (110 / 180)));

	const onWheel = React.useCallback((e: ThreeEvent<WheelEvent>) => {
		let angle = 0.07;

		if (e.nativeEvent.deltaY < 0) {
			angle *= -1;
		}

		set(
			ringRotation.set(ringRotation.x, 0, ringRotation.z + angle).clone(),
		);
	}, []);

	return (
		<group onWheel={onWheel} position={[0, 0, 0]} ref={ref}>
			<Planet saturnRadius={4} />
			<NavRing
				ringMinRadius={5.5}
				ringMaxRadius={9.5}
				texts={['School', 'Career', 'Skills']}
				rotation={ringRotation}
			/>
		</group>
	);
}

export default NavSaturn;
