import React, { useMemo } from 'react';
import { EntityProps, Entity } from 'types-l/entities/component';
import { System } from 'types-l/systems';

type Props<EObjects extends {}, EState extends {}, P extends {}> = {
	systems: System<EObjects, EState>[];
	state: Entity<EObjects, EState>;
	props: EntityProps<EObjects, EState, P>;
};

const useSystems = <Entity extends {}, EState extends {}, P extends {}>({
	state,
	systems,
	props,
}: Props<Entity, EState, P>) => {
	const systemsHook = useMemo(
		() =>
			!state
				? []
				: [...systems, ...(props.systems ?? [])].map((ESystem) => (
						<ESystem
							key={ESystem.name}
							objects={state.objects}
							state={state.state}
						/>
				  )),
		[state]
	);

	return systemsHook;
};

export default useSystems;
