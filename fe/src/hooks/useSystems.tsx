import React, { useMemo } from 'react';
import { EntityProps, State } from 'types-l/entities/component';
import { System } from 'types-l/systems';

type Props<Entity extends {}, EState extends {}, P extends {}> = {
	systems: System<Entity, EState>[];
	state: State<Entity, EState>;
	props: EntityProps<Entity, EState, P>;
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
							entity={state.entity}
							eState={state.eState}
						/>
				  )),
		[state]
	);

	return systemsHook;
};

export default useSystems;
