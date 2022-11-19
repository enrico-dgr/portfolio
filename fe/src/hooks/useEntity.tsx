import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useState } from 'react';
import { Clock } from 'three';
import { ThreeDataPrimitive, Entity } from 'common-types/entities';
import { InputSystem } from 'types-l/entities';

const useEntity = <ThreeData extends ThreeDataPrimitive, State extends {}>({
	entityPromise,
	children,
	inputSystems = [],
}: {
	entityPromise: (clock: Clock) => Promise<Entity<ThreeData, State>>;
	children?: React.ReactNode;
	inputSystems?: InputSystem<State>[];
}) => {
	const clock = useThree((s) => s.clock);

	const [entity, setEntity] = useState<Entity<ThreeData, State>>();
	const update = useMemo(() => (entity ? entity.update : () => {}), [entity]);
	const inputSystemsJSX = useMemo(
		() =>
			entity ? inputSystems.map((IS) => <IS state={entity.state} />) : [],
		[entity]
	);

	useEffect(() => {
		entityPromise(clock).then((entity_) => {
			setEntity(entity_);
		});
	}, []);

	useFrame((_, delta) => {
		update(delta);
	});

	return (
		<>
			{entity && (
				<primitive object={entity.threeData.object}>
					{children}
					{inputSystemsJSX}
				</primitive>
			)}
		</>
	);
};

export default useEntity;
