// three
import { MeshProps } from '@react-three/fiber';
import React from 'react';
import {
	MeshStandardMaterial,
	SphereGeometry,
	sRGBEncoding,
	TextureLoader,
} from 'three';

// assets
import saturn from '../../../assets/textures/saturnmap.jpg';

export type PlanetProps = {
	saturnRadius: number;
} & MeshProps;

const Planet = ({ saturnRadius, ...props }: PlanetProps) => {
  console.log('Render: Planet')

	const material = React.useMemo(() => {
		const texture = new TextureLoader().load(saturn);
		texture.encoding = sRGBEncoding;

		return new MeshStandardMaterial({
			transparent: true,
			map: texture,
		});
	}, []);

	const geometry = React.useMemo(() => new SphereGeometry(saturnRadius), []);

	return (
		<mesh
			castShadow
			receiveShadow
			material={material}
			geometry={geometry}
			{...props}
		/>
	);
};

export default React.memo(Planet, () => false);
