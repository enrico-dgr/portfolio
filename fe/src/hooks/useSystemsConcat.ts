import { useMemo } from 'react';
import { EntityProps } from 'types-l/entities/component';
import { System } from 'types-l/systems';

type Props<Entity extends {}, EState extends {}, P extends {}> = {
	systems: System<Entity, EState>[];
	props: EntityProps<Entity, EState, P>;
};

const useSystemsConcat = <Entity extends {}, EState extends {}, P extends {}>({
	systems,
	props,
}: Props<Entity, EState, P>) => {
	const systemsHook = useMemo(
		() => [...systems, ...(props.systems ?? [])],
		[]
	);

	return systemsHook;
};

export default useSystemsConcat;
